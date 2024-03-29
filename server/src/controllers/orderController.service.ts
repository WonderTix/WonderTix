import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {
  orders,
  ticketitems,
  donations,
  ticketrestrictions,
  orderticketitems,
  state,
} from '@prisma/client';
import WebSocket from 'ws';

const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const stripe = require('stripe')(stripeKey);

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
      await updateCanceledOrder(prisma, order, false);
      break;
  }
};

export const readerWebhook = async (
  prisma: ExtendedPrismaClient,
  eventType: string,
  errMsg: string,
  paymentIntent: string,
) => {
  const socketURL = process.env.WEBSOCKET_URL;
  if (socketURL === undefined) {
    console.error('websocket url undefined');
    return;
  }
  const ws = new WebSocket(socketURL);
  ws.on('error', console.error);
  ws.on('open', () => {
    const messageType = 'reader';
    ws.send(JSON.stringify({messageType, paymentIntent, eventType, errMsg}));
    ws.close();
  });

  switch (eventType) {
    case 'payment_intent.payment_failed':
      const order = await prisma.orders.findFirst({
        where: {
          payment_intent: paymentIntent,
        },
      });

      if (!order) return;

      const intent = stripe.paymentIntents.cancel(paymentIntent); // avoid double charge
      await updateCanceledOrder(prisma, order, true);
      break;
    case 'payment_intent.requires_action':
      break;
    case 'payment_intent.succeeded':
      break;
  }
}

export const updateRefundStatus = async (
  prisma: ExtendedPrismaClient,
  paymentIntent: string,
) => {
  const order = await prisma.orders.findUnique({
    where: {
      payment_intent: paymentIntent,
    },
    select: {
      orderid: true,
    }
  });

  if (order === null) {
    // there is no forseeable case where this should happen
    console.error('received refund for order that does not exist with Payment Intent ' + paymentIntent);
    return;
  }

  // Not all refund webhook events come with the correspodning refund object, but they do all contain
  // the payment intent. The WonderTix schema allows multiple partial refunds, meaning a payment intent
  // could have multiple refund intents. Thus, all refund intents connected to the payment intent are retrieved from
  // the database and then have their status's checked by polling Stripe.
  let refunds = await prisma.refunds.findMany({
    where: {
      orderid_fk: order.orderid,
    },
    select: {
      id: true,
      refund_intent: true,
      refund_status: true,
    },
  });

  await Promise.allSettled(refunds.map(async (refund) => {
    const refundObject = await stripe.refunds.retrieve(refund.refund_intent);
    switch(refundObject.status) {
      case 'succeeded':
        refund.refund_status = state.completed;
        break;
      case 'pending':
        refund.refund_status = state.in_progress;
        break;
      default:
        refund.refund_status = state.failed;
        break;
    }
    
    await prisma.refunds.update({
      where: {
        id: refund.id,
      },
      data: {
        refund_status: refund.refund_status,
      }
    });
  }));
};

export const orderFulfillment = async (
    prisma: ExtendedPrismaClient,
    eventInstanceQueries: any[],
    orderSubtotal: number,
    discountTotal: number,
    orderItems: {
        orderTicketItems?: any[],
        donationItem?: any,
    },
    contactid?: number,
    checkoutSession?: string,
    discountId?: number,
    paymentIntent?: string // need this for reader purchase
) => {
  const {orderTicketItems, donationItem} = orderItems;
  const result = await prisma.$transaction([
    prisma.orders.create({
      data: {
        contactid_fk: contactid,
        checkout_sessions: checkoutSession,
        discountid_fk: discountId,
        ordersubtotal: orderSubtotal,
        discounttotal: discountTotal,
        ...(orderTicketItems && {orderticketitems: {create: orderTicketItems}}),
        ...(donationItem && {donation: {create: donationItem}}),
        payment_intent: paymentIntent,
      },
    }),
    ...eventInstanceQueries,
  ]);
  return result[0];
};


export const updateCanceledOrder = async (
    prisma: ExtendedPrismaClient,
    order: orders,
    isReader: boolean,
) => {
  // reader orders will immediately have a payment intent that could be cancelled early if not paid
  // in this case, a payment_intent existing doesn't mean the order has been paid
  if (!isReader && order.payment_intent) {
    throw new Error('Can not delete order that has been processed by Stripe, order must be refunded');
  }

  const deletedOrder = await prisma.orders.delete({
    where: {
      orderid: order.orderid,
    },
    include: {
      orderticketitems: {
        include: {
          ticketitem: {
            include: {
              ticketrestriction: true,
            },
          },
        },
      },
    },
  });

  const eventInstances = new Set(
      deletedOrder
          .orderticketitems
          .map((item) => item.ticketitem?.ticketrestriction.eventinstanceid_fk));
  await updateAvailableSeats(
      prisma,
      // @ts-ignore
      Array.from(eventInstances),
  );
};


interface LoadedOrderTicketItem extends orderticketitems {
    ticketitem: LoadedTicketItem | null;
}

interface LoadedTicketItem extends ticketitems {
    ticketrestriction: ticketrestrictions;
}


export const createRefundedOrder = async (
    prisma: ExtendedPrismaClient,
    order: orders,
    orderTicketItems: LoadedOrderTicketItem[],
    refundIntent: string,
    donations?: donations | null,
) => {
  const eventInstances = new Set<number>();
  const ticketRefundItems = orderTicketItems.map((item) => {
    if (item.ticketitem) eventInstances.add(item.ticketitem.ticketrestriction.eventinstanceid_fk);
    return {
      amount: item.price,
      orderticketitemid_fk: item.id,
    };
  });

  const donationRefundItems = donations? [{
    amount: donations.amount,
    donationid_fk: donations.donationid,
  }]: [];


  await prisma.refunds.create({
    data: {
      orderid_fk: order.orderid,
      refund_intent: refundIntent,
      refund_status: state.in_progress,
      refunditems: {
        create: [
          ...ticketRefundItems,
          ...donationRefundItems,
        ],
      },
    },
  });

  await prisma.orders.update({
    where: {
      orderid: order.orderid,
    },
    data: {
      discountid_fk: null,
    },
  });

  await updateAvailableSeats(
      prisma,
      // @ts-ignore
      Array.from(eventInstances),
  );
};

export const updateAvailableSeats = async (
    prisma: ExtendedPrismaClient,
    instanceIds: number[],
) => {
  const eventInstances = await prisma.eventinstances.findMany({
    where: {
      eventinstanceid: {in: instanceIds},
    },
    include: {
      ticketrestrictions: {
        where: {
          deletedat: null,
        },
        include: {
          ticketitems: {
            where: {
              orderticketitem: {refund: null},
            },
          },
        },
      },
    },
  });
  await prisma.$transaction(eventInstances.map((instance) => prisma.eventinstances.update({
    where: {
      eventinstanceid: instance.eventinstanceid,
    },
    data: {
      availableseats: instance.totalseats - instance.ticketrestrictions.reduce<number>((acc, res) => acc+res.ticketitems.length, 0),
    },
  })),
  );
};



export const discoverReaders = async () => {
  const discoverResult = await stripe.terminal.readers.list();

  return discoverResult;
}

export const abortPaymentIntent = async (
  prisma: ExtendedPrismaClient,
  paymentIntentID: string
) => {
  const order = await prisma.orders.findFirst({
    where: {
      payment_intent: paymentIntentID,
    },
  });

  if (!order) throw new Error('Unable to find order!');

  const intent = stripe.paymentIntents.cancel(paymentIntentID); // avoid double charge

  if (!intent) throw new Error('Unable to find payment Intent!');

  await updateCanceledOrder(prisma, order, true);
}
