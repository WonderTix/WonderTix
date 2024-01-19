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

interface ToReturn {
  orderItems: any[];
  cartRows: LineItem[];
  orderTotal: number;
  eventInstanceQueries: any[];
};
export const getOrderItems = async (
    cartItems: CartItem[],
    prisma: ExtendedPrismaClient,
): Promise<ToReturn> => {
  const toReturn: ToReturn = {
    orderItems: [],
    cartRows: [],
    eventInstanceQueries: [],
    orderTotal: 0,
  };

  const eventInstances = await prisma.eventinstances.findMany({
    where: {
      eventinstanceid: {in: cartItems.map((item) => Number(item.product_id))},
    },
    include: {
      ticketrestrictions: {
        include: {
          eventtickets: {
            where: {
              singleticketid_fk: null,
            },
          },
        },
      },
      events: true,
    },
  });
  const eventInstanceMap = new Map(
      eventInstances.map((instance) => {
        return [
          instance.eventinstanceid,
          {
            ...instance,
            ticketRestrictionMap: new Map(instance.ticketrestrictions.map((res) => {
              return [res.tickettypeid_fk, res];
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
    toReturn.orderItems.push(
        getTickets(
            eventInstance.ticketRestrictionMap.get(item.typeID),
            eventInstance,
            item.qty,
            item.payWhatCan? (item.payWhatPrice ?? 0)/item.qty : item.price,
        ),
    );
    toReturn.cartRows.push(
        getCartRow(
            eventInstance.events.eventname,
        item.payWhatCan && item.qty !== 1 ? `${item.desc}, Qty ${item.qty}`: item.desc,
        (item.payWhatPrice? item.payWhatPrice: item.price) * 100,
        item.payWhatPrice? 1: item.qty,
        ));

    toReturn.orderTotal += item.payWhatCan && item.payWhatPrice? item.payWhatPrice: item.price * item.qty;
  }

  eventInstanceMap.forEach(({eventinstanceid, availableseats}) =>
    toReturn.eventInstanceQueries.push(updateAvailableSeats(prisma, eventinstanceid, availableseats ?? 0)));

  return {...toReturn, orderItems: toReturn.orderItems.flat(1)};
};

const updateAvailableSeats =
    (prisma: ExtendedPrismaClient, instanceId: number, availablSeats: number) => prisma.eventinstances.update({
      where: {eventinstanceid: instanceId},
      data: {availableseats: availablSeats},
    });

const getCartRow = (name: string, description: string, unitAmount: number, quantity: number): LineItem => ({
  price_data: {
    currency: 'usd',
    product_data: {
      name,
      description,
    },
    unit_amount: unitAmount,
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

  if (
    ticketRestriction.eventtickets.length < quantity || (eventInstance.availableseats-=quantity) < 0) {
    throw new InvalidInputError(422, `Requested tickets no longer available`);
  }

  return ticketRestriction
      .eventtickets
      .splice(0, quantity)
      .map((ticket) => ({
        price,
        singletickets: {
          create: {
            eventticket: {
              connect: {
                eventticketid: ticket.eventticketid,
              },
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
