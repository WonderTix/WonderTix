/* eslint-disable camelcase */
import {
  getDate,
  InvalidInputError,
  reservedTicketItemsFilter,
} from './eventInstanceController.service';
import TicketCartItem, {RefundCartItem, SubscriptionCartItem} from '../interfaces/CartItem';
import {JsonObject} from 'swagger-ui-express';
import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {discounts, type} from '@prisma/client';
import {createOrder, Discount} from './orderController.service';
import {Request, Response} from 'express';
import {freq, Prisma, state} from '@prisma/client';
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
    ticketCartItems,
    subscriptionCartItems,
    refundCartItems,
    formData,
    donation,
    discount,
  } = req.body;
  try {
    const contactToUpdate = formData && validateContact(formData);
    const response = await createOrder({
      prisma,
      refundCartItems,
      ticketCartItems,
      subscriptionCartItems,
      donation,
      discount,
      orderSource: purchaseSource,
      contactToUpdate,
    });
    return res.json(response);
  } catch (error) {
    console.error(error);
    if (error instanceof InvalidInputError) {
      return res.status(error.code).json({error: error.message});
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


interface CreateStripeCheckoutSessionArguments {
  lineItems: LineItem[],
  discount: any,
  refundCredit?: number,
  contactEmail?: string | null,
  metadata?: any,
}

export const createStripeCheckoutSession = async ({
  lineItems,
  discount,
  refundCredit,
  contactEmail,
  metadata,
}: CreateStripeCheckoutSessionArguments) => {
  const expire = Math.round((new Date().getTime() + 1799990) / 1000);
  const discounts = [];

  if (discount.code != '' && discount.amountOff) {
    discounts.push({coupon: (await createStripeCoupon(discount)).id});
  }
  if (refundCredit && refundCredit > 0) {
    discounts.push({coupon: (await createStripeCoupon({code: 'refund_credit', amountOff: refundCredit})).id});
  }

  const checkoutObject: JsonObject = {
    payment_method_types: ['card'],
    expires_at: expire,
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    customer_creation: 'always',
    customer_email: contactEmail,
    metadata,
    discounts,
  };

  const session = await stripe.checkout.sessions.create(checkoutObject);
  return session.id;
};

export const getRefundIntent = async (paymentIntent: string, amount: number) =>
  stripe.refunds.create({
    payment_intent: paymentIntent,
    amount: Math.floor(amount * 100),
  });

export const expireCheckoutSession = async (
  id: string,
) => stripe.checkout.sessions.expire(id);

export const createStripeCoupon = async (discount: any) => {
  return stripe.coupons.create({
    ['amount_off']: Math.floor(discount.amountOff*100),
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
      type: type.donation,
      price: donationCartItem,
      donation: {
        create: {
          frequency: freq.one_time,
        },
      },
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
  subscriptionCartItems: SubscriptionCartItem[],
  admin = false,
) => {
  const toReturn: SubscriptionItemsReturn= {
    subscriptionCartRows: [],
    orderSubscriptionItems: [],
    subscriptionTotal: 0,
  };

  if (!subscriptionCartItems.length) return toReturn;

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
          orderitem: {
            refund: null,
          },
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
    const subType = seasonSubscriptionTypeMap.get(`${item.seasonid_fk}-${item.subscriptiontypeid_fk}`);
    if (!subType) {
      throw new InvalidInputError(422, `${item.name} (${item.desc}) does not exist`);
    } else if ((!admin && +subType.price !== item.price) || item.price < 0) {
      throw new InvalidInputError(422, `${item.name} (${item.desc}) price ${item.price} is invalid`);
    } else if ((subType.available-=item.qty) < 0) {
      throw new InvalidInputError(422, `${item.name} (${item.desc}) quantity exceeds available`);
    }
    acc.subscriptionCartRows = acc.subscriptionCartRows.concat(getCartRow(
      item.name,
      item.desc,
      item.price*100,
      item.qty,
    ));
    acc.orderSubscriptionItems = acc.orderSubscriptionItems.concat(Array(item.qty).fill({
      price: item.price,
      department: item.department || undefined,
      type: type.subscription,
      subscription: {
        create: {
          subscriptiontypeid_fk: subType.subscriptiontypeid_fk,
          seasonid_fk: subType.seasonid_fk,
        },
      },
    }));
    acc.subscriptionTotal += item.price * item.qty;
    return acc;
  }, toReturn);
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

interface TicketItemsReturn {
  orderTicketItems: any[];
  ticketCartRows: LineItem[];
  ticketTotal: number;
  feeTotal: number;
  eventInstanceSet: Set<number>;
}

export const getTicketItems = async (
  cartItems: TicketCartItem[],
  admin = false,
  prisma: ExtendedPrismaClient,
): Promise<TicketItemsReturn> => {
  const toReturn: TicketItemsReturn = {
    orderTicketItems: [],
    ticketCartRows: [],
    ticketTotal: 0,
    feeTotal: 0,
    eventInstanceSet: new Set<number>(),
  };

  if (!cartItems.length) return toReturn;

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

    if (!admin) {
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
    } else if (!admin && !item.payWhatCan && item.price !== +ticketRestriction.price) {
      throw new InvalidInputError(
        422,
        `Ticket Price ${item.price} for showing ${item.product_id} of ${item.name} is invalid`,
      );
    } else if (!admin && item.fee !== +ticketRestriction.fee) {
      throw new InvalidInputError(
        422,
        `Ticket fee ${item.fee} for showing ${item.product_id} of ${item.name} is invalid`,
      );
    } else if ((ticketRestriction.availabletickets-=item.qty) < 0 || (eventInstance.availableseats-=item.qty) < 0) {
      throw new InvalidInputError(422, 'Requested tickets no longer available');
    }

    const price = item.payWhatCan && item.payWhatPrice ? item.payWhatPrice/item.qty : item.price;
    const discountPerItem = item.discount? Math.ceil(item.discount/item.qty) : 0;
    const lastItemDiscount = item.discount? item.discount - discountPerItem * (item.qty - 1) : 0;

    const orderTicketItems = Array(item.qty).fill(null).map((_, index) => ({
      price,
      type: type.ticket,
      fee: price > 0 && item.fee? +item.fee : 0,
      discount: index === item.qty - 1? lastItemDiscount/100: discountPerItem/100,
      department: item.department || undefined,
      ticketitem: {
        create: {
          ticketrestrictionid_fk: ticketRestriction.ticketrestrictionsid,
        },
      },
    }));

    toReturn.orderTicketItems.push(...orderTicketItems);

    toReturn.ticketCartRows.push(
      getCartRow(
        eventInstance.event.eventname,
        item.payWhatCan && item.qty !== 1 ? `${item.desc}, Qty ${item.qty}`: item.desc,
        (item.payWhatPrice? item.payWhatPrice: item.price) * 100,
        item.payWhatPrice? 1: item.qty,
      ));

    toReturn.ticketTotal += item.payWhatCan && item.payWhatPrice? item.payWhatPrice: item.price * item.qty;
    if (price > 0 && item.fee) {
      // Only add a fee if the item's price is not 0
      toReturn.feeTotal += Number(item.fee) * item.qty;
    }
  }

  toReturn.eventInstanceSet = new Set<number>(eventInstanceMap.keys());

  return toReturn;
};

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

export const getDiscount = async (
  prisma: ExtendedPrismaClient,
  discount: Discount | undefined,
  ticketItems: TicketCartItem[]) => {
  if (!discount || discount.code === '') {
    return {
      discountTotal: 0,
      discountId: undefined,
      discountMap: undefined,
    };
  }
  const validDiscount = await validateDiscount(discount.code, ticketItems, prisma);
  return getDiscountAmount(validDiscount, ticketItems);
};

const getDiscountAmount = (
  discount: Omit<discounts, 'amount'> & {amount: number | null},
  ticketItems: TicketCartItem[],
) => {
  const orderSubTotal = Math.floor(ticketItems.reduce((acc, item) => item.price*item.qty + acc, 0)*100);
  const amount = discount.amount? Math.min(Math.floor(discount.amount * 100), orderSubTotal): 0;
  const percent = discount.percent? Math.floor(discount.percent/100 * orderSubTotal): 0;
  const discountTotal = discount.amount && discount.percent ?
    Math.min(amount, percent):
    discount.amount ?
      amount :
      percent;
  let discountRemaining = discountTotal;

  ticketItems.forEach((item) => {
    const price = item.payWhatPrice && item.payWhatCan? item.payWhatPrice * 100: item.price * item.qty * 100;
    const discount = Math.min(Math.ceil(price/orderSubTotal * discountTotal), discountRemaining);
    item.discount = discount;
    discountRemaining-=discount;
  });

  return {discountTotal: discountTotal/100, discountId: discount.discountid};
};

export const getRefundItems = async (
  prisma: ExtendedPrismaClient,
  refundCartItems: RefundCartItem[]) => {
  const eventInstanceSet = new Set<number>();
  const subscriptions: number[] = [];
  const paymentIntentMap = new Map<string, number>();
  let refundTotal = 0;

  if (!refundCartItems.length) return {};

  const orderItems = await prisma.orderitems.findMany({
    where: {
      id: {in: refundCartItems.map((item) => item.orderItemId)},
      order: {
        order_status: state.completed,
        orderitems: {
          none: {
            refund: {
              order: {
                order_status: state.in_progress,
              },
            },
          },
        },
      },
      refund: null,
    },
    include: {
      ticketitem: {
        include: {
          ticketrestriction: true,
        },
      },
      subscription: true,
    },
  });

  const orders = await prisma.orders.findMany({
    where: {
      orderid: {in: orderItems.map((item) => item.orderid_fk)},
    },
    include: {
      payment_intents: {
        include: {
          payment_intent: true,
          refunds: true,
        },
      },
    },
  });

  const orderItemMap = new Map(orderItems.map((item) => [item.id, {
    ...item,
    price: Number(item.price),
    discount: Number(item.discount),
    fee: Number(item.fee),
  }]));
  const orderMap = new Map(orders.map((order) => [
    order.orderid,
    {
      ...order,
      piIndex: 0,
      payment_intents: order.payment_intents.reduce((acc, intent) => {
        const amountAvailable = Number(intent.amount) -
          intent.refunds.reduce((acc, refund) => acc + Number(refund.amount), 0);
        if (amountAvailable) {
          acc.push({
            ...intent,
            amount: Number(intent.amount),
            amountAvailable,
          });
        }
        return acc;
      }, Array<any>()),
    }]));

  const orderRefundItems = refundCartItems.map((item) => {
    const orderItem = orderItemMap.get(item.orderItemId);
    const order = orderItem && orderMap.get(orderItem.orderid_fk);
    if (!orderItem) {
      throw new InvalidInputError(422, `Order Item (${item.orderItemId}) is not available for refund`);
    } else if (!order) {
      throw new InvalidInputError(422, 'Order does not exist');
    }

    const refundItemAmount = orderItem.price + orderItem.fee - orderItem.discount;
    let amountRequired = refundItemAmount;


    while (amountRequired > 0 && order.piIndex < order.payment_intents.length) {
      const currentPI = order.payment_intents[order.piIndex];
      const currentAmount = paymentIntentMap.get(currentPI.payment_intent_fk) ?? 0;
      const amountToApply = Math.min(currentPI.amountAvailable, amountRequired);
      amountRequired-=amountToApply;
      currentPI.amountAvailable-=amountToApply;
      currentPI.amount-=amountToApply;
      if (currentPI.amountAvailable === 0) ++order.piIndex;
      paymentIntentMap.set(currentPI.payment_intent_fk, currentAmount + amountToApply);
    }

    if (amountRequired !== 0) {
      throw new InvalidInputError(422, 'Amount required greater than available');
    }

    refundTotal+=refundItemAmount;

    if (orderItem.subscription) {
      subscriptions.push(orderItem.subscription.id);
    } else if (orderItem.ticketitem) {
      eventInstanceSet.add(orderItem.ticketitem.ticketrestriction.eventinstanceid_fk);
    }

    return {
      orderitemid_fk: orderItem.id,
      amount: refundItemAmount,
    };
  });

  const orderPaymentIntents= [...paymentIntentMap.entries()].map(([paymentIntent, amount]) => ({
    payment_intent_fk: paymentIntent,
    amount: amount,
  }));

  const queries = [...orderMap.values()].reduce(
    (acc, order) => {
      order.payment_intents.forEach((intent) => {
        acc.push({
          table: 'order_payment_intents',
          func: 'update',
          query: {
            where: {
              orderid_fk_payment_intent_fk: {
                payment_intent_fk: intent.payment_intent_fk,
                orderid_fk: intent.orderid_fk,
              },
            },
            data: {
              amount: intent.amount,
            },
          }});
      });
      return acc;
    }, Array<any>());

  return {
    refundTotal,
    orderRefundItems,
    orderPaymentIntents,
    eventInstanceSet,
    paymentIntentMap,
    queries,
    subscriptions,
  };
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

export const validateDiscount = async (discountCode: string, cartItems: TicketCartItem[], prisma: ExtendedPrismaClient):
  Promise<Omit<discounts, 'amount'> & {amount: number | null}> => {
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
