import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {freq} from '@prisma/client';
const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const stripe = require('stripe')(stripeKey);
import WebSocket from 'ws';

export const ticketingWebhook = async (
    prisma: ExtendedPrismaClient,
    eventType: string,
    paymentIntent: string,
    sessionID: string,
) => {
  const order = await prisma.orders.findFirst({
    where: {
      checkout_sessions: sessionID,
    },
  });
  if (!order) return;

  switch (eventType) {
    // I believe this is here because paymentIntent isn't populated until checkout session is complete
    case 'checkout.session.completed': {
      await prisma.orders.update({
        where: {
          orderid: order.orderid,
        },
        data: {
          payment_intent: paymentIntent,
        },
      });
      break;
    }
    case 'checkout.session.expired':
      await orderCancel(prisma, order.orderid);
      break;
  }
};

export const readerWebhook = async (
  eventType: string,
) => {
  console.log('new websocket');
  const ws = new WebSocket('wss://localhost:8000/wss/reader/');
  ws.on('error', console.error);
  ws.on('open', () => {
    console.log('send message');
    ws.send(`${eventType}`);
    ws.close();
  });
}

export const donationCancel = async (
    prisma: ExtendedPrismaClient,
    paymentIntent: string,
    refundIntent: string,
) => {
  const result = await prisma.donations.updateMany({
    where: {
      payment_intent: paymentIntent,
    },
    data: {
      refund_intent: refundIntent,
    },
  });
  return result.count;
};

export const createDonationRecord = async (
    prisma: ExtendedPrismaClient,
    paymentIntent: string,
    donationAmount: number,
    customerID: number,
    userComments?: string,
    anonymous?: boolean,
    frequency?: freq,
) => {
  const contact = await prisma.contacts.findUnique({where: {contactid: +customerID}});
  if (!contact) {
    throw new Error('Contact does not exist');
  }
  await prisma.donations.create({
    data: {
      contactid_fk: contact.contactid,
      isanonymous: anonymous ?? false,
      amount: donationAmount,
      donorname: `${contact.firstname}  ${contact.lastname}`,
      frequency: frequency ?? 'one_time',
      payment_intent: paymentIntent,
      donationdate: getOrderDateAndTime().orderdate,
      ...(userComments && {comments: userComments}),
    }});
};

export const orderFulfillment = async (
    prisma: ExtendedPrismaClient,
    orderItems: any[],
    contactid: number,
    ordertotal: number,
    eventInstanceQueries: any[],
    sessionID?: string, //reader_id when payment reader purchase
    discount?: number,
    paymentIntent?: string //only needed this early for reader purchase
) => {
  const result = await prisma.$transaction([
    prisma.orders.create({
      data: {
        ...getOrderDateAndTime(),
        checkout_sessions: sessionID,
        contactid_fk: contactid,
        ordertotal,
        discountid_fk: discount,
        payment_intent: paymentIntent,
        orderitems: {
          create: orderItems,
        },
      },
    }),
    ...eventInstanceQueries,
  ]);
  return result[0].orderid;
};

const updateAvailableSeats = async (prisma: ExtendedPrismaClient) => {
  const queriesToBatch: any[] = [];
  const eventInstances = await prisma.eventinstances.findMany({
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
    },
  });
  eventInstances.forEach((instance) => {
    const defaultRestriction = instance.ticketrestrictions.find((res) => res.tickettypeid_fk === instance.defaulttickettype);
    if (defaultRestriction?.eventtickets.length === instance.availableseats) return;
    queriesToBatch.push(
        prisma.eventinstances.update({
          where: {
            eventinstanceid: instance.eventinstanceid,
          },
          data: {
            availableseats: defaultRestriction?.eventtickets.length ?? 0,
          },
        }),
    );
  });
  await prisma.$transaction(queriesToBatch);
  return;
};

export const orderCancel = async (
    prisma: ExtendedPrismaClient,
    orderID: number,
    refundIntent?: string,
) => {
  if (!refundIntent) {
    await prisma.orders.delete({
      where: {
        orderid: Number(orderID),
      },
    });
  } else {
    const updatedOrder = await prisma.orders.update({
      where: {
        orderid: orderID,
      },
      data: {
        refund_intent: refundIntent,
      },
      include: {
        orderitems: {
          include: {
            singletickets: true,
          },
        },
      },
    });
    await prisma.$transaction(
        updatedOrder.orderitems.map((item) =>
          prisma.orderitems.update({
            where: {
              orderitemid: item.orderitemid,
            },
            data: {
              refunded: true,
              singletickets: {
                update: item.singletickets.map((singleticket) => ({
                  where: {
                    singleticketid: singleticket.singleticketid,
                  },
                  data: {
                    eventtickets: {
                      set: [],
                    },
                  },
                })),
              },
            },
          }),
        ),
    );
  }
  await updateAvailableSeats(prisma);
  return;
};
const getOrderDateAndTime = () => {
  const date = new Date();

  const formatDatePart = (part: number) => part.toString().padStart(2, '0');

  const orderdate = parseInt(`${date.getFullYear()}${formatDatePart(date.getMonth() + 1)}${formatDatePart(date.getDate())}`, 10);

  const ordertime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

  return {orderdate, ordertime};
};

export const discoverReaders = async () => {
  //const discoverResult = await stripe.terminal.readers.discoverReaders({simulated: true});
  const discoverResult = await stripe.terminal.readers.list();

  return discoverResult;
}

