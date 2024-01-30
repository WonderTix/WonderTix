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
    contactID: number,
    contactEmail: string,
    donation: number,
    lineItems: LineItem[],
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
    customer_creation: 'always',
    customer_email: contactEmail,
    metadata: {
      sessionType: '__ticketing',
      contactID,
      donation,
      discountCode: null,
    },
    ...(couponID && {discounts: [{couponID}]}),
  };
  const session = await stripe.checkout.sessions.create(checkoutObject);
  return {id: session.id};
};

export const createStripePaymentIntent = async (
  orderTotal: number
) => {
  const intentObject: JsonObject = {
    currency: 'usd', // hardcode
    payment_method_types: ['card_present'],
    capture_method: 'automatic',
    amount: orderTotal,
    metadata: {
      sessionType: '__reader',
    },
  }
  const intent = await stripe.paymentIntents.create(intentObject);
  return intent.id;
}

export const requestStripeReaderPayment = async (
  readerID: string,
  paymentIntentID: string
) => {
  console.log('requesting payment');
  const requestPay = await stripe.terminal.readers.processPaymentIntent(
    readerID,
    {
        payment_intent: paymentIntentID
    }
  );
  return requestPay;
}

export const testPayReader = async (
  readerID: string
) => {
  const pay = await stripe.testHelpers.terminal.readers.presentPaymentMethod(readerID);
  return pay;
}

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
      eventInstances.map((instance) => [
        instance.eventinstanceid,
        {
          ...instance,
          ticketRestrictionMap: new Map(instance.ticketrestrictions.map((res) => [res.tickettypeid_fk, res])),
        },
      ]));
  let orderTotal = 0;

  for (const item of cartItems) {
    const eventInstance = eventInstanceMap.get(item.product_id);
    if (!eventInstance) {
      throw new InvalidInputError(
          422,
          `Showing ${item.product_id} for ${item.name} does not exist`,
      );
    }
    if ((item.payWhatCan && item.payWhatPrice && item.payWhatPrice < 0) || item.price < 0) {
      throw new InvalidInputError(
          422,
          `Ticket Price ${item.payWhatCan? item.payWhatPrice: item.price} for showing ${item.product_id} of ${item.name} is invalid`,
      );
    }
    orderItems = orderItems.concat(
        getTickets(
            eventInstance.ticketRestrictionMap.get(item.typeID),
            eventInstance.ticketRestrictionMap.get(eventInstance.defaulttickettype ?? 1),
            item.qty,
            item.payWhatCan? (item.payWhatPrice ?? 0)/item.qty : item.price,
        ),
    );
    cartRows.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: eventInstance.events.eventname,
          description: (item.payWhatCan && item.qty != 1 ? `${item.desc}, Qty ${item.qty}`: item.desc),
        },
        unit_amount: (item.payWhatPrice? item.payWhatPrice: item.price) * 100,
      },
      quantity: item.payWhatPrice? 1: item.qty,
    });

    orderTotal += item.payWhatCan? item.payWhatPrice ?? 0: item.price * item.qty;
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
        }));
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
    ticketRestriction.eventtickets.length < quantity || defaultTicketRestriction.eventtickets.length < quantity) {
    throw new InvalidInputError(422, `Requested tickets no longer available`);
  }

  const ticketsToSellForType = ticketRestriction.eventtickets.splice(0, quantity).map((ticket) => ticket.eventticketid);
  const ticketsToSellForDefault = ticketRestriction !== defaultTicketRestriction?
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
            ...(ticketRestriction !== defaultTicketRestriction? [{eventticketid: ticketsToSellForDefault[index]}]:[]),
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
