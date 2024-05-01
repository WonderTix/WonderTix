/* eslint camelcase: 0 */
import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {
  orders,
  ticketitems,
  donations,
  ticketrestrictions,
  orderticketitems,
  subscriptions,
  subscriptionticketitems,
  state,
  purchase_source,
} from '@prisma/client';
import WebSocket from 'ws';
import {reservedTicketItemsFilter} from './eventInstanceController.service';
import {updateContact} from './eventController.service';

const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const stripe = require('stripe')(stripeKey);

export const ticketingWebhook = async (
  prisma: ExtendedPrismaClient,
  eventType: string,
  paymentIntent: string,
  sessionID: string,
  contact: string,
) => {
  const order = await prisma.orders.findFirst({
    where: {
      checkout_sessions: sessionID,
    },
  });

  if (!order) return;

  switch (eventType) {
  case 'checkout.session.completed': {
    const {contactid} = await updateContact(prisma, JSON.parse(contact));
    await prisma.orders.update({
      where: {
        orderid: order.orderid,
      },
      data: {
        payment_intent: paymentIntent,
        contactid_fk: contactid,
        order_status: state.completed,
      },
    });
    break;
  }
  case 'checkout.session.expired':
    await updateCanceledOrder(prisma, order);
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
    await abortPaymentIntent(prisma, paymentIntent);
    break;
  case 'payment_intent.requires_action':
    break;
  case 'payment_intent.succeeded':
    await updateOrderStatus(prisma, state.completed, {payment_intent: paymentIntent});
    break;
  }
};


export const updateOrderStatus = async (
  prisma: ExtendedPrismaClient,
  status: state,
  details: {payment_intent: string } | {orderid: number},
) => {
  return prisma.orders.update({
    where: details,
    data: {
      order_status: status,
    },
  });
};

export const updateRefundStatus = async (
  prisma: ExtendedPrismaClient,
  paymentIntent: string,
) => {
  const refunds = await prisma.refunds.findMany({
    where: {
      order: {
        payment_intent: paymentIntent,
      },
    },
    select: {
      id: true,
      refund_intent: true,
    },
  });

  const queries = await Promise.allSettled(refunds.map(async (refund) => {
    const refundObject = await stripe.refunds.retrieve(refund.refund_intent);
    return {
      where: {
        id: refund.id,
      },
      data: {
        refund_status: getRefundStatus(refundObject.status),
      },
    };
  }));

  await prisma.$transaction(queries
    .filter((query): query is PromiseFulfilledResult<any> => query.status === 'fulfilled')
    .map((query) => prisma.refunds.update(query.value)));
};

export const getRefundStatus = (refundStatus?: string) => {
  switch (refundStatus) {
  case 'succeeded':
    return state.completed;
  case 'pending':
    return state.in_progress;
  default:
    return state.failed;
  }
};


export interface OrderFulfillmentData {
  orderStatus: state;
  orderSource: purchase_source | undefined;
  orderSubtotal: number;
  discountTotal: number;
  feeTotal: number;
  orderTicketItems?: any[];
  donationItem?: any;
  orderSubscriptionItems?: any[];
  eventInstanceQueries?: any[];
  paymentIntent?: string;
  checkoutSession?: string;
  discountId?: number;
  contactid?: number;
}

export const orderFulfillment = async (
  prisma: ExtendedPrismaClient,
  {
    orderStatus,
    orderSource,
    orderSubtotal,
    discountTotal = 0,
    feeTotal = 0,
    donationItem,
    orderTicketItems = [],
    orderSubscriptionItems = [],
    eventInstanceQueries = [],
    paymentIntent,
    checkoutSession,
    discountId,
    contactid,
  }: OrderFulfillmentData,
) => {
  const result = await prisma.$transaction([
    prisma.orders.create({
      data: {
        contactid_fk: contactid,
        discountid_fk: discountId,
        ordersubtotal: orderSubtotal,
        discounttotal: discountTotal,
        feetotal: feeTotal,
        orderticketitems: {create: orderTicketItems},
        donation: {create: donationItem},
        subscriptions: {create: orderSubscriptionItems},
        order_status: orderStatus,
        order_source: orderSource,
        checkout_sessions: checkoutSession,
        payment_intent: paymentIntent,
      },
    }),
    ...eventInstanceQueries,
  ]);

  if (orderSubtotal + feeTotal - discountTotal === 0) {
    await prisma.orders.update({
      where: {
        orderid: result[0].orderid,
      },
      data: {
        payment_intent: `comp-${result[0].orderid}`,
        checkout_sessions: `comp-${result[0].orderid}`,
      },
    });
  }
  return result[0];
};


export const updateCanceledOrder = async (
  prisma: ExtendedPrismaClient,
  order: orders,
) => {
  if (order.order_status === state.completed) {
    throw new Error('Can not delete an order that has been processed by Stripe, order must be refunded');
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
      subscriptions: {
        include: {
          subscriptionticketitems: {
            include: {
              ticketitem: {
                include: {
                  ticketrestriction: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const eventInstances = new Set(
    deletedOrder.orderticketitems
      .map((item) => item.ticketitem?.ticketrestriction.eventinstanceid_fk)
      .concat(
        deletedOrder.subscriptions
          .flatMap((sub) =>
            sub.subscriptionticketitems.map(
              (ticket) => ticket.ticketitem?.ticketrestriction.eventinstanceid_fk,
            ),
          ),
      ),
  );

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

interface LoadedSubscription extends subscriptions {
  subscriptionticketitems: LoadedSubscriptionTicketItem[];
}

interface LoadedSubscriptionTicketItem extends subscriptionticketitems {
    ticketitem: LoadedTicketItem | null;
}

export const createRefundedOrder = async (
  prisma: ExtendedPrismaClient,
  refundIntent: string,
  order: orders,
  orderTicketItems: LoadedOrderTicketItem[],
  subscriptions: LoadedSubscription[],
  refundState: state,
  donations?: donations | null,
) => {
  const eventInstances = new Set<number>();

  if (order.order_status !== state.completed) {
    throw new Error('Can not refund an order that has not been completely processed');
  }

  const ticketRefundItems = orderTicketItems.map((item) => {
    if (item.ticketitem) eventInstances.add(item.ticketitem.ticketrestriction.eventinstanceid_fk);
    return {
      amount: item.price,
      orderticketitemid_fk: item.id,
    };
  });

  const subscriptionRefundItems = subscriptions.map((item) => {
    item.subscriptionticketitems.forEach((item) => {
      if (item.ticketitem) {
        eventInstances.add(item.ticketitem.ticketrestriction.eventinstanceid_fk);
      }
    });
    return {
      amount: item.price,
      subscriptionid_fk: item.id,
    };
  });

  const donationRefundItems = donations? [{
    amount: donations.amount,
    donationid_fk: donations.donationid,
  }]: [];

  await prisma.$transaction([
    prisma.orders.update({
      where: {
        orderid: order.orderid,
      },
      data: {
        discountid_fk: null,
        refunds: {
          create: {
            refund_intent: refundIntent,
            refund_status: refundState,
            refunditems: {
              create: [
                ...ticketRefundItems,
                ...donationRefundItems,
                ...subscriptionRefundItems,
              ],
            },
          },
        },
      },
    }),
    prisma.subscriptionticketitems.deleteMany({
      where: {
        subscriptionid_fk: {in: subscriptions.map((sub) => sub.id)},
      },
    }),
  ]);

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
            ...reservedTicketItemsFilter,
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


export const discoverReaders = async () => stripe.terminal.readers.list();

export const abortPaymentIntent = async (
  prisma: ExtendedPrismaClient,
  paymentIntentID: string,
) => {
  const order = await prisma.orders.findFirst({
    where: {
      payment_intent: paymentIntentID,
    },
  });

  if (!order) throw new Error('Unable to find order!');

  const intent = stripe.paymentIntents.cancel(paymentIntentID); // avoid double charge

  if (!intent) throw new Error('Unable to find payment Intent!');

  await updateCanceledOrder(prisma, order);
};
