/* eslint camelcase: 0 */
import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {
  orders,
  state,
  purchase_source,
  contacts,
  temporarystore,
} from '@prisma/client';
import WebSocket from 'ws';
import {InvalidInputError, reservedTicketItemsFilter} from './eventInstanceController.service';
import {
  ContactInput, createStripeCheckoutSession, createStripePaymentIntent, expireCheckoutSession,
  getDiscount,
  getDonationItem,
  getFeeItem, getRefundIntent,
  getRefundItems,
  getSubscriptionItems,
  getTicketItems,
  updateContact,
} from './eventController.service';
import TicketCartItem, {RefundCartItem, SubscriptionCartItem} from '../interfaces/CartItem';
import {PurchaseSource} from '../interfaces/PurchaseSource';

const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const stripe = require('stripe')(stripeKey);

export const ticketingWebhook = async (
  prisma: ExtendedPrismaClient,
  eventType: string,
  checkoutSessionObject: any,
) => {
  const {id, amount_total, payment_intent} = checkoutSessionObject;

  switch (eventType) {
  case 'checkout.session.completed': {
    await completeOrder(
      prisma,
      id,
      {
        amount: amount_total/100,
        payment_intent: {
          create: {
            payment_intent,
            amount: amount_total/100,
            status: state.completed,
            checkout_sessions: id,
          },
        },
      },
    );
    break;
  }
  case 'checkout.session.expired':
    await deleteOrderAndTempStore(prisma, id);
    break;
  }
};

export const readerWebhook = async (
  prisma: ExtendedPrismaClient,
  eventType: string,
  errMsg: string,
  paymentIntentObject: any,
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
    ws.send(JSON.stringify({messageType, paymentIntent: paymentIntentObject.id, eventType, errMsg}));
    ws.close();
  });

  switch (eventType) {
  case 'payment_intent.payment_failed':
    await abortPaymentIntent(paymentIntentObject.id);
    await deleteOrderAndTempStore(prisma, paymentIntentObject.id);
    break;
  case 'payment_intent.requires_action':
    break;
  case 'payment_intent.succeeded':
    await completeOrder(
      prisma,
      paymentIntentObject.id,
      {
        amount: paymentIntentObject.amount/100,
        payment_intent: {
          create: {
            payment_intent: paymentIntentObject.id,
            amount: paymentIntentObject.amount / 100,
            status: state.completed,
          },
        },
      },
    );
    break;
  }
};


export const completeOrder = async (
  prisma: ExtendedPrismaClient,
  key: string,
  paymentIntentQuery: {
    amount: number;
    payment_intent: {
      create: {
          payment_intent: string;
          amount: number;
          status: state;
          checkout_sessions?: string;
        },
      },
    },
) => {
  const {
    queries,
    contact,
    orderid,
  } = await getAndDeleteStore(prisma, key) as any;
  const {contactid} = contact? await updateContact(prisma, contact): {contactid: undefined};

  await prisma.$transaction([
    prisma.orders.update({
      where: {
        orderid,
      },
      data: {
        order_status: state.completed,
        contactid_fk: contactid,
        payment_intents: {
          create: paymentIntentQuery,
        },
      },
    }),
    ...buildPrismaQueries(prisma, queries),
  ]);
};

export const buildPrismaQueries = (prisma:ExtendedPrismaClient, queries: {table: string, func: string, query: any}[]) =>
// @ts-ignore
  queries.map(({table, func, query}) => prisma[table][func](query));

export const updateRefundByPaymentIntent = async (
  prisma: ExtendedPrismaClient,
  paymentIntent: string,
) => {
  const refunds = [];
  let refundListObject = await stripe.refunds.list({
    payment_intent: paymentIntent,
    limit: 100,
  });

  refunds.push(...refundListObject.data);

  while (refundListObject.has_more) {
    refundListObject = await stripe.refunds.list({
      payment_intent: paymentIntent,
      limit: 100,
      starting_after: refunds.at(-1)?.id,
    });
    refunds.push(...refundListObject.data);
  }

  const refundQueries = refunds.map((refund) => prisma.refund_intents.update({
    where: {
      refund_intent: refund.id,
    },
    data: {
      status: getRefundStatus(refund.status),
    },
  }));

  await prisma.$transaction(refundQueries);
};


export const updateRefund = async (prisma: ExtendedPrismaClient, refund: any) =>
  prisma.refund_intents.update({
    where: {
      refund_intent: refund.id,
    },
    data: {
      status: getRefundStatus(refund.status),
    },
  });

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
  refundTotal?: number;
  discountTotal: number;
  feeTotal: number;
  orderTicketItems?: any[];
  orderRefundItems?: any[];
  donationItem?: any;
  orderSubscriptionItems?: any[];
  orderPaymentIntents?: any[];
  eventInstances?: number[];
  discountId?: number;
  contactid?: number;
  subscriptionQuery?: any;
  paymentIntentQueries?: any[];
}

export const orderFulfillment = async (
  prisma: ExtendedPrismaClient,
  {
    orderStatus,
    orderSource,
    orderSubtotal,
    refundTotal = 0,
    discountTotal = 0,
    feeTotal = 0,
    donationItem,
    orderTicketItems = [],
    orderRefundItems = [],
    orderSubscriptionItems = [],
    orderPaymentIntents = [],
    discountId,
    contactid,
    eventInstances,
  }: OrderFulfillmentData,
) => {
  const result = await prisma.orders.create({
    data: {
      contactid_fk: contactid,
      discountid_fk: discountId,
      ordersubtotal: orderSubtotal,
      refundtotal: refundTotal,
      discounttotal: discountTotal,
      feetotal: feeTotal,
      refunditems: {
        create: orderRefundItems,
      },
      payment_intents: {
        create: orderPaymentIntents,
      },
      orderitems: {
        create: [
          ...orderTicketItems,
          ...orderSubscriptionItems,
          ...(donationItem? [donationItem]:[]),
        ],
      },
      order_status: orderStatus,
      order_source: orderSource,
    },
  });
  if (eventInstances) {
    await updateAvailableSeats(prisma, eventInstances);
  }
  return result;
};


export const deleteOrderAndTempStore = async (prisma: ExtendedPrismaClient, id: string) => {
  const {orderid} = await getAndDeleteStore(prisma, id) as any;
  const order = await prisma.orders.findUnique({where: {orderid}});
  if (!order) return;
  await deleteOrder(prisma, order);
};

export const deleteOrder = async (
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
      refunditems: {
        include: {
          orderitem: {
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
      orderitems: {
        include: {
          ticketitem: {
            include: {
              ticketrestriction: true,
            },
          },
          subscription: {
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
      },
    },
  });

  const eventInstances = new Set([
    ...deletedOrder.orderitems
      .flatMap((item) =>
        item.ticketitem?
          [item.ticketitem.ticketrestriction.eventinstanceid_fk]:
          item.subscription ?
            item.subscription.subscriptionticketitems.map((item) => item.ticketitem?.ticketrestriction.eventinstanceid_fk) :
            [],
      ),
    ...deletedOrder.refunditems
      .reduce((acc, refund) =>
        refund.orderitem.ticketitem ?
          [...acc, refund.orderitem.ticketitem.ticketrestriction.eventinstanceid_fk] :
          acc,
      new Array<number>()),
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
export const abortPaymentIntent = async (id: string) => stripe.paymentIntents.cancel(id);

export interface Discount {
 code: string;
 discountid: number;
 percent?: number;
 amount?: number;
}

interface CreateOrderArguments {
  prisma: ExtendedPrismaClient,
  orderSource: purchase_source,
  ticketCartItems?: TicketCartItem[],
  subscriptionCartItems?: SubscriptionCartItem[],
  refundCartItems?: RefundCartItem[],
  donation?: number,
  discount?: Discount,
  contact?: contacts,
  contactToUpdate?: ContactInput,
}
export const createOrder = async ({
  prisma,
  subscriptionCartItems = [],
  ticketCartItems = [],
  donation = 0,
  refundCartItems = [],
  contact,
  contactToUpdate,
  discount,
  orderSource,
}: CreateOrderArguments) => {
  let order: orders | undefined;
  let id: string | undefined;
  let store: temporarystore | undefined;
  try {
    if (!refundCartItems.length && !ticketCartItems.length && !donation && !subscriptionCartItems.length) {
      throw new InvalidInputError(422, 'Cart is empty');
    }

    const {
      discountTotal,
      discountId,
    } = await getDiscount(prisma, discount, ticketCartItems);

    const {
      orderPaymentIntents = [],
      queries = [],
      refundTotal = 0,
      orderRefundItems = [],
      eventInstanceSet = new Set<number>(),
      paymentIntentMap,
    } = await getRefundItems(prisma, refundCartItems);

    const {
      ticketCartRows,
      orderTicketItems,
      ticketTotal,
      feeTotal,
      eventInstanceSet: additionalEventInstanceIds,
    } = await getTicketItems(prisma, ticketCartItems, orderSource !== purchase_source.online_ticketing);

    const {
      subscriptionCartRows,
      orderSubscriptionItems,
      subscriptionTotal,
    } = await getSubscriptionItems(prisma, subscriptionCartItems, orderSource !== purchase_source.online_ticketing);

    const {
      donationItem,
      donationCartRow,
      donationTotal,
    } = getDonationItem(donation);

    const {feeCartRow} = getFeeItem(feeTotal);

    let cartRows = ticketCartRows.concat(subscriptionCartRows);

    if (donationCartRow) {
      cartRows = cartRows.concat([donationCartRow]);
    }
    if (feeCartRow) {
      cartRows = cartRows.concat([feeCartRow]);
    }

    const eventInstances = [...new Set([...eventInstanceSet.keys(), ...additionalEventInstanceIds.keys()])];

    const orderSubtotal = ticketTotal + subscriptionTotal + donationTotal;
    let orderDeficit = orderSubtotal + feeTotal - discountTotal - refundTotal;

    if (orderDeficit > 0 && orderDeficit < .49) {
      throw new InvalidInputError(422, 'Cart Total must either be $0.00 USD or greater than $0.49 USD');
    }

    const contactid = contact ?
      contact.contactid :
      (orderSource !== PurchaseSource.online_ticketing || orderDeficit === 0) && contactToUpdate ?
        (await updateContact(prisma, contactToUpdate)).contactid :
        undefined;

    order = await orderFulfillment(
      prisma,
      {
        orderStatus: orderDeficit <= 0 ? state.completed : state.in_progress,
        orderSource,
        discountId,
        orderSubtotal,
        refundTotal,
        discountTotal,
        feeTotal,
        orderTicketItems,
        orderRefundItems,
        donationItem,
        orderSubscriptionItems,
        orderPaymentIntents,
        contactid,
        eventInstances,
      },
    );

    if (!order) {
      throw new Error('Order failed to process');
    }

    if (orderDeficit === 0) {
      await prisma.$transaction(buildPrismaQueries(prisma, queries));
      await updateAvailableSeats(prisma, eventInstances);
      return {id: 'comp'};
    } else if (orderDeficit < 0 && paymentIntentMap) {
      orderDeficit = Math.abs(orderDeficit);
      const refundIntents = [];
      for (const paymentIntent of paymentIntentMap) {
        if (paymentIntent[1] === 0) continue;

        const amountToRefund = Math.min(orderDeficit, paymentIntent[1]);
        orderDeficit -= amountToRefund;

        const refund = paymentIntent[0].includes('seeded-order') ?
          {id: `refund-intent-${paymentIntent[0]}-${order.orderid}`, status: 'succeeded'}:
          await getRefundIntent(paymentIntent[0], amountToRefund);

        refundIntents.push({
          refund_intent: refund.id,
          orderid_fk: order.orderid,
          payment_intent_fk: paymentIntent[0],
          status: getRefundStatus(refund.status),
          amount: amountToRefund,
        });

        if (orderDeficit === 0) break;
      }

      await prisma.$transaction([
        prisma.refund_intents.createMany({data: refundIntents}),
        ...buildPrismaQueries(prisma, queries),
      ]);

      await updateAvailableSeats(prisma, [
        ...additionalEventInstanceIds.keys(),
        ...eventInstanceSet.keys(),
      ]);
      return {id: 'refund'};
    } else if (orderSource !== purchase_source.card_reader) {
      id = await createStripeCheckoutSession({
        lineItems: cartRows,
        discount: {...discount, amountOff: Number(order.discounttotal)},
        refundCredit: Number(order.refundtotal),
        contactEmail: contact?.email ?? contactToUpdate?.email,
        metaData: {
          sessionType: '__ticketing',
        },
      });
      store = await createStore(prisma, id!, {
        queries,
        ...(contactToUpdate && {contact: contactToUpdate}),
        orderid: order.orderid,
      });
      return {id};
    } else {
      const response = await createStripePaymentIntent(orderDeficit * 100);
      store = await createStore(prisma, response.id, {
        queries,
        ...(contactToUpdate && {contact: contactToUpdate}),
        orderid: order.orderid,
      });

      return response;
    }
  } catch (error) {
    console.error(error);
    if (store) {
      await deleteOrderAndTempStore(prisma, store.id);
    } else if (order) {
      await deleteOrder(prisma, order);
    }

    if (id && orderSource !== purchase_source.card_reader) {
      await expireCheckoutSession(id);
    } else if (id) {
      await abortPaymentIntent(id);
    }
    throw error;
  }
};

export const createStore = async (prisma: ExtendedPrismaClient, id: string, data: any) =>
  prisma.temporarystore.create({
    data: {
      id,
      data,
    },
  });

export const getAndDeleteStore = async (prisma: ExtendedPrismaClient, id: string) => {
  try {
    const store = await prisma.temporarystore.delete({where: {id}});
    return store.data;
  } catch (error) {
    throw Error('Temporary Store has already been deleted');
  }
};

