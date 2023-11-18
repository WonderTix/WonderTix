import {InvalidInputError, LoadedTicketRestriction} from './eventInstanceController.service';
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
      ticketrestrictions: {
        include: {
          eventtickets: {
            where: {
              singleticket_fk: null,
            },
          },
        },
      },
      events: true,
    },
  });
  const eventInstanceMap = new Map(
      eventInstances.map((instance) => {
        const ticketRestrictionMap = new Map<number, LoadedTicketRestriction>();
        instance
            .ticketrestrictions
            .forEach((restriction) => {
              ticketRestrictionMap.set(restriction.tickettypeid_fk, restriction);
            });
        return [
          instance.eventinstanceid,
          {
            ...instance,
            ticketRestrictionMap,
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
    if (item.price < 0) {
      throw new InvalidInputError(
          422,
          `Ticket Price ${item.price} for showing ${item.product_id} of ${item.name} is invalid`,
      );
    }
    orderItems = orderItems.concat(
        getTickets(
            eventInstance.ticketRestrictionMap.get(item.typeID),
            eventInstance.ticketRestrictionMap.get(eventInstance.defaulttickettype ?? 1),
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
  for (const [, instance] of eventInstanceMap) {
    eventInstanceQueries.push(
        prisma.eventinstances.update({
          where: {
            eventinstanceid: instance.eventinstanceid,
          },
          data: {
            availableseats: (instance.ticketRestrictionMap.get(instance.defaulttickettype??1)?.eventtickets ?? []).length,
          },
        },
        ));
  }
  return {
    cartRows,
    orderItems,
    orderTotal,
    eventInstanceQueries,
  };
};

const getTickets = (
    ticketRestriction: LoadedTicketRestriction | undefined,
    defaultTicketRestriction: LoadedTicketRestriction | undefined,
    quantity: number,
    price: number,
) => {
  if (!ticketRestriction || !defaultTicketRestriction) {
    throw new InvalidInputError(422, `Requested tickets no longer available`);
  }

  if (
    ticketRestriction.eventtickets.length < quantity ||
    (defaultTicketRestriction !== ticketRestriction && defaultTicketRestriction.eventtickets.length < quantity)
  ) {
    throw new InvalidInputError(422, `Requested tickets no longer available`);
  }

  const ticketsToSellForType = ticketRestriction.eventtickets.splice(0, quantity).map((ticket) => ticket.eventticketid);
  const ticketsToSellForGA = ticketRestriction !== defaultTicketRestriction?
      defaultTicketRestriction.eventtickets
          .splice(0, quantity)
          .map((ticket) => ticket.eventticketid):
      [];

  return ticketsToSellForType.map((ticketID, index) => ({
    price,
    singletickets: {
      create: {
        eventtickets: {
          connect: [
            {
              eventticketid: ticketID,
            },
            ...(ticketRestriction !== defaultTicketRestriction? [{eventticketid: ticketsToSellForGA[index]}]:[]),
          ],
        },
      },
    },
  }));
};

interface checkoutForm {
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
    ...(formData.phone && {
      phone: validateWithRegex(
          formData.phone,
          `Phone Number: ${formData.phone} is invalid`,
          new RegExp('^(\\+?\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'),
      ),
    }),
    ...(formData.seatingAcc && {seatingaccom: formData.seatingAcc}),
    ...(formData.optIn && {newsletter: formData.optIn}),
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
