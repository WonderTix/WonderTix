/* eslint-disable camelcase */
import {
  getDate,
  InvalidInputError,
  LoadedTicketRestriction,
  reservedTicketItemsFilter,
} from './eventInstanceController.service';
import TicketCartItem, {SubscriptionCartItem} from '../interfaces/CartItem';
import {JsonObject} from 'swagger-ui-express';
import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {freq, orders, Prisma, purchase_source, state} from '@prisma/client';
import {Request, Response} from 'express';
import {orderFulfillment, updateCanceledOrder} from './orderController.service';
import {PurchaseSource} from '../interfaces/PurchaseSource';

const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const stripe = require('stripe')(stripeKey);

export interface LineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      description: string;
    };
    unit_amount: number;
  };
  quantity: number;
}

/**
 * The primary logic that handles the checkout process.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {PurchaseSource} purchaseSource - Where the order is coming from (eg. online_ticketing)
 * @param {ExtendedPrismaClient} prisma
 * @return {Promise<Response>} - The response for the API to immediately return
 */
export const checkout = async (
  req: Request,
  res: Response,
  purchaseSource: PurchaseSource,
  prisma: ExtendedPrismaClient,
): Promise<Response> => {
  const {
    ticketCartItems = [],
    subscriptionCartItems = [],
    formData,
    donation = 0,
    discount,
  } = req.body;
  let checkoutSessionId: string | undefined;
  let order: orders | undefined;
  try {
    if (!ticketCartItems.length && !donation && !subscriptionCartItems.length) {
      return res.status(400).json({error: 'Cart is empty'});
    }

    const validatedContact = validateContact(formData);

    const {ticketCartRows, orderTicketItems, ticketTotal, feeTotal, eventInstanceQueries} =
      await getTicketItems(ticketCartItems, purchaseSource, prisma);

    const {subscriptionCartRows, orderSubscriptionItems, subscriptionTotal} =
      await getSubscriptionItems(prisma, subscriptionCartItems);

    const {donationItem, donationCartRow, donationTotal} = getDonationItem(donation);

    const {feeCartRow} = getFeeItem(feeTotal);

    let cartRows = ticketCartRows.concat(subscriptionCartRows);
    if (donationCartRow) {
      cartRows = cartRows.concat([donationCartRow]);
    }
    if (feeCartRow) {
      cartRows = cartRows.concat([feeCartRow]);
    }

    const {discountTotal, discountId} = await getDiscountAmount(
      prisma,
      discount,
      ticketTotal,
      ticketCartItems,
    );
    const orderSubtotal = ticketTotal + subscriptionTotal + donationTotal;

    if (orderSubtotal + feeTotal - discountTotal > 0.49) {
      checkoutSessionId = await createStripeCheckoutSession(validatedContact, cartRows, {
        ...discount,
        amountOff: discountTotal,
      });
    } else if (orderSubtotal + feeTotal - discountTotal > 0) {
      return res
        .status(400)
        .json({error: 'Cart Total must either be $0.00 USD or greater than $0.49 USD'});
    }

    order = await orderFulfillment(prisma, {
      orderStatus: checkoutSessionId ? state.in_progress : state.completed,
      orderSource: purchase_source[purchaseSource as keyof typeof purchase_source],
      checkoutSession: checkoutSessionId,
      discountId,
      orderSubtotal,
      discountTotal,
      feeTotal,
      orderTicketItems,
      donationItem,
      orderSubscriptionItems,
      eventInstanceQueries,
      ...(!checkoutSessionId && (await updateContact(prisma, validatedContact))),
    });

    return res.json({id: checkoutSessionId ?? 'comp'});
  } catch (error) {
    console.error(error);
    if (order) await updateCanceledOrder(prisma, order);
    if (checkoutSessionId) await expireCheckoutSession(checkoutSessionId);
    if (error instanceof InvalidInputError) {
      return res.status(error.code).json(error.message);
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientValidationError
    ) {
      return res.status(400).json(error.message);
    }
    return res.status(500).json(error);
  }
};

export const createStripeCheckoutSession = async (
  contact: ContactInput,
  lineItems: LineItem[],
  discount: any,
) => {
  const expire = Math.round((new Date().getTime() + 1799990) / 1000);
  const checkoutObject: JsonObject = {
    payment_method_types: ['card'],
    expires_at: expire,
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    customer_creation: 'always',
    customer_email: contact.email,
    metadata: {
      sessionType: '__ticketing',
      contact: JSON.stringify(contact),
    },
    ...(discount.code != '' && discount.amountOff && {discounts: [{coupon: (await createStripeCoupon(discount)).id}]}),
  };

  const session = await stripe.checkout.sessions.create(checkoutObject);
  return session.id;
};

export const expireCheckoutSession = async (
  id: string,
) => stripe.checkout.sessions.expire(id);

export const createStripeCoupon = async (discount: any) => {
  return stripe.coupons.create({
    ['amount_off']: discount.amountOff*100,
    duration: 'once',
    name: discount.code,
    currency: 'usd',
  });
};

export const getDonationItem = (donationCartItem: number) => {
  if (donationCartItem < 0 ) {
    throw new Error('Amount of donation can not be negative');
  }

  if (!donationCartItem) {
    return {
      donationTotal: 0,
    };
  }

  return {
    donationItem: {
      amount: donationCartItem,
      frequency: freq.one_time,
    },
    donationCartRow: getCartRow('Donation', 'A generous donation', donationCartItem*100, 1),
    donationTotal: donationCartItem,
  };
};


interface SubscriptionItemsReturn {
    orderSubscriptionItems: any[];
    subscriptionCartRows: LineItem[];
    subscriptionTotal: number;
}

export const getSubscriptionItems = async (
  prisma: ExtendedPrismaClient,
  subscriptionCartItems: SubscriptionCartItem[]) => {
  const seasonSubscriptionTypes = await prisma.seasonsubscriptiontypes.findMany({
    where: {
      seasonid_fk: {in: subscriptionCartItems.map((item) => item.seasonid_fk)},
      subscriptiontypeid_fk: {in: subscriptionCartItems.map((item) => item.subscriptiontypeid_fk)},
      deletedat: null,
    },
    include: {
      subscriptiontype: true,
      subscriptions: {
        where: {
          refund: null,
        },
      },
    },
  });

  const seasonSubscriptionTypeMap = new Map(seasonSubscriptionTypes.map((item) => [`${item.seasonid_fk}-${item.subscriptiontypeid_fk}`,
    {
      ...item,
      available: item.subscriptionlimit - item.subscriptions.length,
    }]));

  return subscriptionCartItems.reduce<SubscriptionItemsReturn>((acc, item) => {
    const type = seasonSubscriptionTypeMap.get(`${item.seasonid_fk}-${item.subscriptiontypeid_fk}`);
    if (!type) {
      throw new InvalidInputError(422, `${item.name} (${item.desc}) does not exist`);
    } else if (+item.price !== +type.price) {
      throw new InvalidInputError(422, `${item.name} (${item.desc}) price ($${item.price}) is invalid`);
    } else if ((type.available-=item.qty) < 0) {
      throw new InvalidInputError(422, `${item.name} (${item.desc}) quantity exceeds available`);
    }
    acc.subscriptionCartRows = acc.subscriptionCartRows.concat(getCartRow(
      item.name,
      item.desc,
      item.price*100,
      item.qty,
    ));
    acc.orderSubscriptionItems = acc.orderSubscriptionItems.concat(Array(item.qty).fill({
      subscriptiontypeid_fk: type.subscriptiontypeid_fk,
      seasonid_fk: type.seasonid_fk,
      price: item.price,
    }));
    acc.subscriptionTotal += +type.price * +item.qty;
    return acc;
  }, {subscriptionCartRows: [], orderSubscriptionItems: [], subscriptionTotal: 0});
};

export const getFeeItem = (feeTotal: number) => {
  const feeCartRow = feeTotal > 0 ? getCartRow(
    'Processing Fee',
    'Covers the cost of our online payment processor',
    feeTotal * 100,
    1,
  ) : undefined;

  return {
    feeCartRow: feeCartRow,
  };
};

interface TicketItemsReturn {
  orderTicketItems: any[];
  ticketCartRows: LineItem[];
  ticketTotal: number;
  feeTotal: number;
  eventInstanceQueries: any[];
}

export const createStripePaymentIntent = async (
  orderTotal: number,
) => {
  const intentObject: JsonObject = {
    currency: 'usd',
    payment_method_types: ['card_present'],
    capture_method: 'automatic',
    confirmation_method: 'automatic',
    amount: orderTotal,
    metadata: {
      sessionType: '__reader',
    },
  };
  const intent = await stripe.paymentIntents.create(intentObject);

  return {id: intent.id, secret: intent.client_secret};
};

export const requestStripeReaderPayment = async (
  readerID: string,
  paymentIntentID: string,
) => stripe.terminal.readers.processPaymentIntent(
  readerID,
  {payment_intent: paymentIntentID},
);

export const testPayReader = async (
  readerID: string,
) => {
  const pay = await stripe.testHelpers.terminal.readers.presentPaymentMethod(readerID);
  return pay;
};

export const getTicketItems = async (
  cartItems: TicketCartItem[],
  purchaseSource: PurchaseSource,
  prisma: ExtendedPrismaClient,
): Promise<TicketItemsReturn> => {
  const toReturn: TicketItemsReturn = {
    orderTicketItems: [],
    ticketCartRows: [],
    eventInstanceQueries: [],
    ticketTotal: 0,
    feeTotal: 0,
  };

  const eventInstances = await prisma.eventinstances.findMany({
    where: {
      eventinstanceid: {in: cartItems.map((item) => Number(item.product_id))},
    },
    include: {
      ticketrestrictions: {
        where: {
          deletedat: null,
        },
        include: {
          ticketitems: {
            ...reservedTicketItemsFilter,
          },
        },
      },
      event: true,
    },
  });
  const eventInstanceMap = new Map(
    eventInstances.map((instance) => {
      return [
        instance.eventinstanceid,
        {
          ...instance,
          ticketRestrictionMap: new Map(instance.ticketrestrictions.map((res) => {
            return [res.tickettypeid_fk, {
              ...res,
              availabletickets: res.ticketlimit - res.ticketitems.length,
            }];
          })),
        },
      ];
    }));

  for (const item of cartItems) {
    const eventInstance = eventInstanceMap.get(item.product_id);
    if (!eventInstance) {
      throw new InvalidInputError(
        422,
        `Showing ${item.product_id} for ${item.name} does not exist`,
      );
    }

    if (purchaseSource === PurchaseSource.online_ticketing) {
      const now = new Date().toISOString();
      const eventInstanceDateTime = getDate(eventInstance.eventtime.toISOString(), eventInstance.eventdate);

      if (now >= eventInstanceDateTime) {
        throw new InvalidInputError(422, 'Showing is no longer on sale');
      }
    }

    const ticketRestriction = eventInstance.ticketRestrictionMap.get(item.typeID);
    if (!ticketRestriction) {
      throw new InvalidInputError(422, 'Requested tickets no longer available');
    }

    if (item.payWhatCan && (item.payWhatPrice ?? -1) < 0 || item.price < 0) {
      throw new InvalidInputError(
        422,
        `Ticket Price ${item.payWhatCan? item.payWhatPrice: item.price} for showing ${item.product_id} of ${item.name} is invalid`,
      );
    }
    toReturn.orderTicketItems.push(
      ...getTickets(
        ticketRestriction,
        eventInstance,
        item.qty,
        ((item.payWhatCan && item.payWhatPrice ? item.payWhatPrice : item.price) > 0) ? Number(ticketRestriction.fee) : 0,
        item.payWhatCan? (item.payWhatPrice ?? 0)/item.qty : item.price,
        item.department ? item.department : undefined,
      ),
    );
    toReturn.ticketCartRows.push(
      getCartRow(
        eventInstance.event.eventname,
        item.payWhatCan && item.qty !== 1 ? `${item.desc}, Qty ${item.qty}`: item.desc,
        (item.payWhatPrice? item.payWhatPrice: item.price) * 100,
        item.payWhatPrice? 1: item.qty,
      ));

    toReturn.ticketTotal += item.payWhatCan && item.payWhatPrice? item.payWhatPrice: item.price * item.qty;
    if ((item.payWhatCan && item.payWhatPrice ? item.payWhatPrice : item.price) > 0) {
      // Only add a fee if the item's price is not 0
      toReturn.feeTotal += Number(ticketRestriction.fee) * item.qty;
    }
  }

  eventInstanceMap.forEach(({eventinstanceid, availableseats}) =>
    toReturn.eventInstanceQueries.push(getUpdateAvailableSeatsQuery(prisma, eventinstanceid, availableseats)));

  return toReturn;
};

const getUpdateAvailableSeatsQuery =
    (prisma: ExtendedPrismaClient, instanceId: number, availablSeats: number) => prisma.eventinstances.update({
      where: {eventinstanceid: instanceId},
      data: {availableseats: availablSeats},
    });

export const getCartRow = (name: string, description: string, unitAmount: number, quantity: number): LineItem => ({
  price_data: {
    currency: 'usd',
    product_data: {
      name,
      description,
    },
    unit_amount: Math.floor(unitAmount),
  },
  quantity,
});

const getTickets = (
  ticketRestriction: LoadedTicketRestriction,
  eventInstance: any,
  quantity: number,
  fee: number,
  price: number,
  department?: string,
) => {
  if ((ticketRestriction.availabletickets-=quantity) < 0 || (eventInstance.availableseats-=quantity) < 0) {
    throw new InvalidInputError(422, 'Requested tickets no longer available');
  }

  return Array(quantity)
    .fill({
      price: price,
      fee: fee,
      department: department,
      ticketitem: {
        create: {
          ticketrestrictionid_fk: ticketRestriction.ticketrestrictionsid,
        },
      },
    });
};

export const getDiscountAmount = async (prisma: ExtendedPrismaClient, discount: any, orderTotal: number, ticketItems: TicketCartItem[]) => {
  if (!discount || discount.code === '') {
    return {discountTotal: 0};
  }

  const validDiscount = await validateDiscount(discount.code, ticketItems, prisma);

  if (validDiscount.amount && validDiscount.percent) {
    return {discountTotal: Math.min((+validDiscount.percent / 100) * orderTotal, validDiscount.amount), discountId: validDiscount.discountid};
  } else if (validDiscount.amount) {
    return {discountTotal: Math.min(validDiscount.amount, orderTotal), discountId: validDiscount.discountid};
  } else if (validDiscount.percent) {
    return {discountTotal: orderTotal * (+validDiscount.percent)/100, discountId: validDiscount.discountid};
  }

  throw new Error('Invalid discount');
};

export const updateContact = async (
  prisma: ExtendedPrismaClient,
  contact: ContactInput,
  check?: 'exists' | 'does_not_exist',
  contactid?: number,
) => {
  const filter = contactid !== undefined ?
    {contactid: contactid} :
    {email: contact.email};

  const existingContact = await prisma.contacts.findUnique({
    where: {
      ...filter,
    },
  });

  if (check === 'exists' && !existingContact) {
    throw new Error(`Contact "${contactid || contact.email}" does not exist`);
  } else if (check === 'does_not_exist' && existingContact) {
    throw new Error(`Contact "${contactid || contact.email}" already exists`);
  } else if (contactid !== undefined && existingContact && contact.email !== existingContact.email) {
    const currentContact = await prisma.contacts.findUnique({where: {email: contact.email}});
    if (currentContact) {
      throw new Error(`Contact "${contact.email}" already exists`);
    }
  }

  return prisma.contacts.upsert({
    where: {
      ...filter,
    },
    create: {
      ...contact,
      newsletter: contact.newsletter? new Date(): undefined,
    },
    update: {
      ...contact,
      newsletter: contact.newsletter === undefined?
        existingContact?.newsletter:
        !contact.newsletter?
          null:
          existingContact?.newsletter?
            undefined:
            new Date(),
    },
  });
};


export interface ContactInput {
   firstname: string;
   lastname: string;
   email: string;
   address?: string;
   city?: string;
   state?: string;
   postalcode?: string;
   country?: string;
   phone?: string;
   visitsource?: string;
   seatingaccom?: string;
   comments?: string;
   newsletter?: boolean;
   donorbadge?: boolean;
   vip?: boolean;
   volunteerlist?: boolean;
}

export const validateContact = (formData: ContactInput): ContactInput => {
  return {
    firstname: validateName(formData.firstname, 'First Name'),
    lastname: validateName(formData.lastname, 'Last Name'),
    email: validateWithRegex(
      formData.email,
      `Email: ${formData.email} is invalid`,
      new RegExp('.+@.+\\..+'),
    ),
    // Only include or validate the following if provided
    ...(formData.address && {address: formData.address}),
    ...(formData.city && {city: formData.city}),
    ...(formData.state && {state: formData.state}),
    ...(formData.postalcode && {postalcode: formData.postalcode}),
    ...(formData.country && {country: formData.country}),
    ...(formData.phone && {
      phone: validateWithRegex(
        formData.phone,
        `Phone Number: ${formData.phone} is invalid`,
        new RegExp('^(\\+?\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'),
      ).replace(/\D/g, ''),
    }),
    ...(formData.visitsource && {visitsource: formData.visitsource}),
    ...(formData.seatingaccom && {seatingaccom: formData.seatingaccom}),
    ...(formData.comments && {comments: formData.comments}),
    ...(formData.newsletter !== undefined && {newsletter: formData.newsletter}),
    ...(formData.donorbadge !== undefined && {donorbadge: formData.donorbadge}),
    ...(formData.vip !== undefined && {vip: formData.vip}),
    ...(formData.volunteerlist !== undefined && {volunteerlist: formData.volunteerlist}),
  };
};

export const validateDiscount = async (discountCode: string, cartItems: TicketCartItem[], prisma: ExtendedPrismaClient) => {
  const eventIds = new Set<number>();
  cartItems.forEach((item) => eventIds.add(item.eventId));
  const numEventsInCart = eventIds.size;

  const totalCartTicketCount = cartItems.reduce((tot, item) => {
    return tot + item.qty;
  }, 0);

  const existingDiscount = await prisma.discounts.findFirst({
    where: {
      code: {
        equals: discountCode,
        mode: 'insensitive',
      },
      active: true,
      deletedat: null,
    },
  });

  if (!existingDiscount) {
    throw new InvalidInputError(422, 'Invalid discount code');
  }
  if (existingDiscount.min_events && existingDiscount.min_events > numEventsInCart) {
    throw new InvalidInputError(422, `Not enough events in cart for discount code ${discountCode}`);
  }
  if (existingDiscount.min_tickets && existingDiscount.min_tickets > totalCartTicketCount) {
    throw new InvalidInputError(422, `Not enough tickets in cart for discount code ${discountCode}`);
  }

  return {
    ...existingDiscount,
    ...{amount: existingDiscount.amount ? Number(existingDiscount.amount) : null},
  };
};

const validateName = (name: string, type: string): string => {
  if (!name || !name.length) {
    throw new InvalidInputError(422, `A valid ${type} must be provided`);
  }
  return name;
};

export const validateWithRegex = (
  toValidate: string,
  errorMessage: string,
  regex: RegExp,
): string => {
  if (!toValidate.trim().match(regex)) {
    throw new InvalidInputError(422, errorMessage);
  }
  return toValidate;
};
