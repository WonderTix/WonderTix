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
    custid: number,
    donation: number,
    lineItems: LineItem[],
    primaryTicketIDs: string,
    secondaryTicketIDs: string,
    orderID: number,
    discount: any,
) => {
  const expire = Math.round((new Date().getTime() + 1800000) / 1000);
  const couponID =
    discount.code != '' ? await createStripeCoupon(discount) : null;
  const checkoutObject: JsonObject = {
    payment_method_types: ['card'],
    expires_at: expire,
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    payment_intent_data: {
      metadata: {
        sessionType: '__ticketing',
        orderID,
        primaryTicketIDs,
        secondaryTicketIDs,
        custid,
        donation,
        discountCode: null,
      },
    },
    ...(couponID&&{discounts: [{couponID}]}),
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

export interface OrderItem {
  price: number,
  singletickets: {
    create: {
      eventticketid_fk: number,
    },
  },
}

export const getOrderItems = async (
    cartItems: CartItem[],
    prisma: PrismaClient,
): Promise<{
  orderItems: OrderItem[];
  cartRows: LineItem[];
  orderTotal: number;
  primaryTicketIDs: number[];
  secondaryTicketIDs: number[];
  eventInstanceQueries: any[];
}> => {
  const orderItems: OrderItem[] = [];
  const primaryTicketIDs: number[] = [];
  const secondaryTicketIDs: number[] = [];
  const eventInstanceQueries = [];
  const cartRows: LineItem[] = [];
  const eventInstances = await prisma.eventinstances.findMany({
    where: {
      eventinstanceid: {in: cartItems.map((item) => Number(item.product_id))},
    },
    include: {
      eventtickets: {
        where: {
          purchased: false,
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
    const tickets = getTickets(
        eventInstance.eventtickets,
        item.typeID,
        item.qty,
    );
    const ticketRestriction = eventInstance.ticketrestrictions.find(
        (restriction) => restriction.tickettypeid_fk === item.typeID,
    );

    if (item.typeID !== 1 && !ticketRestriction) {
      throw new Error('Ticket type does not exist');
    }
    if (item.price < 0) {
      throw new Error('Price can not be negative for an item');
    }
    tickets.forEach(([primary, secondary]) => {
      primaryTicketIDs.push(primary);
      if (item.typeID !== 1) {
        secondaryTicketIDs.push(secondary);
      }
      orderItems.push({
        price: item.price,
        singletickets: {
          create: {
            eventticketid_fk: primary,
          },
        },
      });
    });
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
          // how to actually handle availbleseats null case, why would that happen? Availbleseats always set to total at creation can remove null option from schema, same issue with ticketrestictions:ticketssold.
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
            eventtickets: {
              updateMany: {
                where: {
                  eventticketid: {
                    in: [...primaryTicketIDs, ...secondaryTicketIDs],
                  },
                },
                data: {
                  purchased: true,
                },
              },
            },
          },
        }),
    );
    orderTotal += item.price * item.qty;
  }
  return {
    cartRows,
    orderItems,
    primaryTicketIDs,
    secondaryTicketIDs,
    orderTotal,
    eventInstanceQueries,
  };
};

const getTickets = (
    availableTickets: eventtickets[],
    typeID: number,
    quantity: number,
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
    console.log(result[0], result[1]);
    throw new Error('No tickets');
  }

  return result[0]
      .slice(0, quantity)
      .map((ticket, index) => [
        ticket.eventticketid,
      typeID === 1 ? -1 : result[1][index].eventticketid,
      ]);
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
        new RegExp('^(?!\\s*$).+'),
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
