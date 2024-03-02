import {InvalidInputError, LoadedTicketRestriction} from './eventInstanceController.service';
import CartItem from '../interfaces/CartItem';
import {JsonObject} from 'swagger-ui-express';
import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {freq} from '@prisma/client';
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

export const createStripeCheckoutSession = async (
    contactID: number,
    contactEmail: string,
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
    customer_email: contactEmail,
    metadata: {
      sessionType: '__ticketing',
      contactID,
      discountCode: null,
    },
    ...(discount.code != '' && discount.amountOff && {discounts: [{coupon: (await createStripeCoupon(discount)).id}]}),
  };

  const session = await stripe.checkout.sessions.create(checkoutObject);
  return {id: session.id};
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

interface TicketItemsReturn {
  orderTicketItems: any[];
  ticketCartRows: LineItem[];
  ticketTotal: number;
  eventInstanceQueries: any[];
}

export const getTicketItems = async (
    cartItems: CartItem[],
    prisma: ExtendedPrismaClient,
): Promise<TicketItemsReturn> => {
  const toReturn: TicketItemsReturn = {
    orderTicketItems: [],
    ticketCartRows: [],
    eventInstanceQueries: [],
    ticketTotal: 0,
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
            where: {
              orderticketitem: {
                refund: null,
              },
            },
            include: {
              orderticketitem: true,
            },
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
                availabletickets: res.ticketlimit- res.ticketitems.length,
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
    if (item.payWhatCan && (item.payWhatPrice ?? -1) < 0 || item.price < 0) {
      throw new InvalidInputError(
          422,
          `Ticket Price ${item.payWhatCan? item.payWhatPrice: item.price} for showing ${item.product_id} of ${item.name} is invalid`,
      );
    }
    toReturn.orderTicketItems.push(
        ...getTickets(
            eventInstance.ticketRestrictionMap.get(item.typeID),
            eventInstance,
            item.qty,
            item.payWhatCan? (item.payWhatPrice ?? 0)/item.qty : item.price,
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
    ticketRestriction: LoadedTicketRestriction | undefined,
    eventInstance: any,
    quantity: number,
    price: number,
) => {
  if (!ticketRestriction) {
    throw new InvalidInputError(422, `Requested tickets no longer available`);
  }

  if ((ticketRestriction.availabletickets-=quantity) < 0 || (eventInstance.availableseats-=quantity) < 0) {
    throw new InvalidInputError(422, `Requested tickets no longer available`);
  }

  return Array(quantity)
      .fill({
        price: price,
        ticketitem: {
          create: {
            ticketrestrictionid_fk: ticketRestriction.ticketrestrictionsid,
          },
        },
      });
};

export const getDiscountAmount = (discount: any, orderTotal: number) => {
  if (discount.amount && discount.percent) {
    return Math.min((+discount.percent / 100) * orderTotal, discount.amount);
  }
  if (discount.amount) {
    return Math.min(discount.amount, orderTotal);
  }
  if (discount.percent) {
    return orderTotal*(+discount.percent)/100;
  }
  throw new Error(`Invalid discount`);
};

interface checkoutForm {
  firstName: string;
  lastName: string;
  streetAddress: string;
  postalCode: string;
  city: string,
  state: string;
  country: string;
  phone: string;
  email: string;
  visitSource: string;
  seatingAcc: string;
  comments: string;
  optIn: boolean;
}

export const updateContact = async (
    formData: checkoutForm,
    prisma: ExtendedPrismaClient,
) => {
  const existingContact = await prisma.contacts.findFirst({
    where: {
      email: formData.email,
    },
    select: {
      contactid: true,
    },
  });

  let updatedContact: { contactid: number } | null;
  if (!existingContact) {
    updatedContact = await prisma.contacts.create({
      data: {
        ...validateContact(formData),
      },
      select: {
        contactid: true,
      },
    });
  } else {
    updatedContact = await prisma.contacts.update({
      where: {
        contactid: existingContact.contactid,
      },
      data: {
        ...validateContact(formData),
      },
      select: {
        contactid: true,
      },
    });
  }
  return updatedContact;
};

const validateContact = (formData: checkoutForm) => {
  return {
    firstname: validateName(formData.firstName, 'First Name'),
    lastname: validateName(formData.lastName, 'Last Name'),
    email: validateWithRegex(
        formData.email,
        `Email: ${formData.email} is invalid`,
        new RegExp('.+@.+\\..+'),
    ),
    // Only include or validate the following if provided
    ...(formData.streetAddress && {address: formData.streetAddress}),
    ...(formData.city && {city: formData.city}),
    ...(formData.state && {state: formData.state}),
    ...(formData.postalCode && {postalcode: formData.postalCode}),
    ...(formData.country && {country: formData.country}),
    ...(formData.phone && {
      phone: validateWithRegex(
          formData.phone,
          `Phone Number: ${formData.phone} is invalid`,
          new RegExp('^(\\+?\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'),
      ),
    }),
    ...(formData.seatingAcc && {seatingaccom: formData.seatingAcc}),
    ...(formData.comments && {comments: formData.comments}),
    ...(formData.optIn && {newsletter: formData.optIn}),
  };
};

export const validateDiscount = async (discount: any, cartItems: CartItem[], prisma: ExtendedPrismaClient) => {
  const eventIds = new Set<number>();
  cartItems.forEach((item) => eventIds.add(item.eventId));
  const numEventsInCart = eventIds.size;

  const totalCartTicketCount = cartItems.reduce((tot, item) => {
    return tot + item.qty;
  }, 0);

  const existingDiscount = await prisma.discounts.findFirst({
    where: {
      code: discount.code,
      active: true,
    },
  });
  if (!existingDiscount) {
    throw new InvalidInputError(422, 'Invalid discount code');
  }
  if (existingDiscount.min_events && existingDiscount.min_events > numEventsInCart) {
    throw new InvalidInputError(422, `Not enough events in cart for discount code ${discount.code}`);
  }
  if (existingDiscount.min_tickets && existingDiscount.min_tickets > totalCartTicketCount) {
    throw new InvalidInputError(422, `Not enough tickets in cart for discount code ${discount.code}`);
  }
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
