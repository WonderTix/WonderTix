import {InvalidInputError} from './eventInstanceController.service';
import {eventtickets, PrismaClient} from '@prisma/client';
import CartItem from '../interfaces/CartItem';
import {JsonObject} from 'swagger-ui-express';
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
    customerID: number,
    donation: number,
    lineItems: LineItem[],
    orderID: number,
    discount: any,
) => {
  const expire = Math.round((new Date().getTime() + 1799990) / 1000);
  const couponID =
    discount.code != '' ? await createStripeCoupon(discount) : null;
  const checkoutObject: JsonObject = {
    payment_method_types: ['card'],
    expires_at: expire,
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    metadata: {
      sessionType: '__ticketing',
      customerID,
      donation,
      discountCode: null,
    },
    ...(couponID && {discounts: [{couponID}]}),
  };
  const session = await stripe.checkout.sessions.create(checkoutObject);
  return {id: session.id};
};

export const createStripeCoupon = async (discount: any) => {
  const stripeCoupon = await stripe.coupons.create({
    [discount.amount ? 'amount_off' : 'percent_off']: discount.amount ?
      discount.amount * 100 :
      discount.percent,
    duration: 'once',
    name: discount.code,
    currency: 'usd',
  });
  return stripeCoupon.id;
};

export const getOrderItems = async (
    cartItems: CartItem[],
    prisma: PrismaClient,
): Promise<{
  orderItems: any[];
  cartRows: LineItem[];
  orderTotal: number;
  eventInstanceQueries: any[];
}> => {
  let orderItems: any[] = [];
  const eventInstanceQueries = [];
  const cartRows: LineItem[] = [];
  const eventInstances = await prisma.eventinstances.findMany({
    where: {
      eventinstanceid: {in: cartItems.map((item) => Number(item.product_id))},
    },
    include: {
      eventtickets: {
        where: {
          singleticket_fk: null,
        },
      },
      ticketrestrictions: true,
      events: true,
    },
  });
  const eventInstanceMap = new Map(
      eventInstances.map((instance) => [instance.eventinstanceid, instance]),
  );
  let orderTotal = 0;

  for (const item of cartItems) {
    const eventInstance = eventInstanceMap.get(item.product_id);
    if (!eventInstance) {
      throw new InvalidInputError(
          422,
          `Showing ${item.product_id} for ${item.name} does not exist`,
      );
    }
    const ticketRestriction = eventInstance.ticketrestrictions.find(
        (restriction) => restriction.tickettypeid_fk === item.typeID,
    );
    if (item.typeID !== 1 && !ticketRestriction) {
      throw new InvalidInputError(
          422,
          `Ticket Type ${item.typeID} is not available for showing ${item.product_id}`,
      );
    }
    if (item.price < 0) {
      throw new InvalidInputError(
          422,
          `Ticket Price ${item.price} for showing ${item.product_id} of ${item.name} is invalid`,
      );
    }
    orderItems = orderItems.concat(
        getTickets(
            prisma,
            eventInstance.eventtickets,
            item.typeID,
            item.qty,
            item.price,
        ),
    );
    cartRows.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: eventInstance.events.eventname,
          description: item.desc,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    });
    eventInstanceQueries.push(
        prisma.eventinstances.update({
          where: {
            eventinstanceid: eventInstance.eventinstanceid,
          },
          data: {
            availableseats: (eventInstance.availableseats ?? item.qty) - item.qty,
            ...(item.typeID !== 1 && {
              ticketrestrictions: {
                update: {
                  where: {
                    ticketrestrictionsid: ticketRestriction?.ticketrestrictionsid,
                  },
                  data: {
                    ticketssold: (ticketRestriction?.ticketssold ?? 0) + item.qty,
                  },
                },
              },
            }),
          },
        }),
    );
    orderTotal += item.price * item.qty;
  }
  return {
    cartRows,
    orderItems,
    orderTotal,
    eventInstanceQueries,
  };
};

const getTickets = (
    prisma: PrismaClient,
    availableTickets: eventtickets[],
    typeID: number,
    quantity: number,
    price: number,
) => {
  const result = availableTickets.reduce(
      (result: [eventtickets[], eventtickets[]], ticket) => {
        if (ticket.tickettypeid_fk === typeID) {
          result[0].push(ticket);
        } else if (ticket.tickettypeid_fk === 1) {
          result[1].push(ticket);
        }
        return result;
      },
      [[], []],
  );
  // fix error message
  if (
    result[0].length < quantity ||
    (typeID !== 1 && result[1].length < quantity)
  ) {
    throw new Error(`Requested Tickets no longer available`);
  }

  return result[0].slice(0, quantity).map((ticket, index) => ({
    price,
    singletickets: {
      create: {
        eventtickets: {
          connect:
            typeID === 1 ?
              {eventticketid: ticket.eventticketid} :
              [
                {eventticketid: ticket.eventticketid},
                {eventticketid: result[1][index].eventticketid},
              ],
        },
      },
    },
  }));
};

interface checkOutForm {
  firstName: string;
  lastName: string;
  streetAddress: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  visitSource: string;
  seatingAcc: string;
  comments: string;
  optIn: boolean;
}

export const updateContact = async (
    formData: checkOutForm,
    prisma: PrismaClient,
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

const validateContact = (formData: checkOutForm) => {
  return {
    firstname: validateName(formData.firstName, 'First Name'),
    lastname: validateName(formData.lastName, 'Last Name'),
    email: validateWithRegex(
        formData.email,
        `Email: ${formData.email} is invalid`,
        new RegExp('.*'),
    ),
    address: validateWithRegex(
        formData.streetAddress,
        `Street Address: ${formData.streetAddress} is invalid`,
        new RegExp('.*'),
    ),
    phone: validateWithRegex(
        formData.phone,
        `Phone Number: ${formData.phone} is invalid`,
        new RegExp('.*'),
    ),
    seatingaccom: formData.seatingAcc,
    newsletter: formData.optIn,
  };
};

const validateName = (name: string, type: string): string => {
  if (!name || !name.length) {
    throw new InvalidInputError(422, `A valid ${type} must be provided`);
  }
  return name;
};
const validateWithRegex = (
    toValidate: string,
    errorMessage: string,
    regex: RegExp,
): string => {
  if (!toValidate.trim().match(regex)) {
    throw new InvalidInputError(422, errorMessage);
  }
  return toValidate;
};
