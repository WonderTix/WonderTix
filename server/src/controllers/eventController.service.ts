import {InvalidInputError} from './eventInstanceController.service';
import CartItem from '../interfaces/CartItem';
import {JsonObject} from 'swagger-ui-express';
import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
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
    prisma: ExtendedPrismaClient,
): Promise<{
  orderItems: any[];
  cartRows: LineItem[];
  orderTotal: number;
  eventInstanceQueries: any[];
}> => {
  let orderItems: any[] = [];
  const cartRows: LineItem[] = [];
  const eventInstanceQueries = [];
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
      eventInstances.map((instance) => {
        const ticketTypeMap = new Map<number, number[]>();
        instance.eventtickets.forEach((ticket) => {
          ticketTypeMap.set(ticket.tickettypeid_fk ?? 1, [
            ticket.eventticketid,
            ...(ticketTypeMap.get(ticket.tickettypeid_fk ?? 1) ?? []),
          ]);
        });
        return [
          instance.eventinstanceid,
          {
            ...instance,
            ticketTypeMap,
          },
        ];
      }),
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

    // Pay What You Can tickets are a single price for the entire cart row so the order
    // of ticket must show up as a single price for 1 item in Stripe
    if (item.payWhatCan && item.payWhatPrice) {
      if (item.payWhatPrice < 0) {
        throw new InvalidInputError(
            422,
            `Ticket Price ${item.payWhatPrice} for showing ${item.product_id} of ${item.name} is invalid`,
        );
      }

      orderItems = orderItems.concat(
          getTickets(
              prisma,
              eventInstance.ticketTypeMap,
              item.typeID,
              item.qty,
              item.payWhatPrice / item.qty,
          ),
      );

      cartRows.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: eventInstance.events.eventname,
            description: `${item.desc}, Qty ${item.qty}`,
          },
          unit_amount: item.payWhatPrice * 100,
        },
        quantity: 1,
      });

      orderTotal += item.payWhatPrice;
    } else {
      if (item.price < 0) {
        throw new InvalidInputError(
            422,
            `Ticket Price ${item.price} for showing ${item.product_id} of ${item.name} is invalid`,
        );
      }

      orderItems = orderItems.concat(
          getTickets(
              prisma,
              eventInstance.ticketTypeMap,
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

      orderTotal += item.price * item.qty;
    }
  }

  for (const [, instance] of eventInstanceMap) {
    eventInstanceQueries.push(
        prisma.eventinstances.update({
          where: {
            eventinstanceid: instance.eventinstanceid,
          },
          data: {
            availableseats: (instance.ticketTypeMap.get(1) ?? []).length,
            ticketrestrictions: {
              update: instance.ticketrestrictions.map((restriction) => ({
                where: {
                  ticketrestrictionsid: restriction.ticketrestrictionsid,
                },
                data: {
                  ticketssold:
                  restriction.ticketlimit -
                  (
                    instance.ticketTypeMap.get(restriction.tickettypeid_fk) ??
                    []
                  ).length,
                },
              })),
            },
          },
        }),
    );
  }

  return {
    cartRows,
    orderItems,
    orderTotal,
    eventInstanceQueries,
  };
};

const getTickets = (
    prisma: ExtendedPrismaClient,
    availableTickets: Map<number, number[]>,
    typeID: number,
    quantity: number,
    price: number,
) => {
  const ticketsForType = availableTickets.get(typeID) ?? [];
  const ticketsForGA = availableTickets.get(1) ?? [];
  if (
    ticketsForType.length < quantity ||
    (typeID !== 1 && ticketsForGA.length < quantity)
  ) {
    throw new InvalidInputError(422, `Requested Tickets no longer available`);
  }

  const ticketsToSellForType = ticketsForType.splice(0, quantity);
  const ticketsToSellForGA =
    typeID != 1 ? ticketsForGA.splice(0, quantity) : [];

  return ticketsToSellForType.map((ticketID, index) => ({
    price,
    singletickets: {
      create: {
        eventtickets: {
          connect: [
            {
              eventticketid: ticketID,
            },
          ].concat(
            typeID != 1 ? [{eventticketid: ticketsToSellForGA[index]}] : [],
          ),
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

const validateContact = (formData: checkOutForm) => {
  return {
    firstname: validateName(formData.firstName, 'First Name'),
    lastname: validateName(formData.lastName, 'Last Name'),
    email: validateWithRegex(
        formData.email,
        `Email: ${formData.email} is invalid`,
        new RegExp('.+\\@.+\\..+'),
    ),
    address: validateWithRegex(
        formData.streetAddress,
        `Street Address: ${formData.streetAddress} is invalid`,
        new RegExp('.*'),
    ),
    phone: validateWithRegex(
        formData.phone,
        `Phone Number: ${formData.phone} is invalid`,
        new RegExp('^(\\+\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'),
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
