import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {
  orders,
  ticketitems,
  donations,
  ticketrestrictions,
  orderticketitems,
  state,
} from '@prisma/client';


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
      await updateCanceledOrder(prisma, order);
      break;
  }
};

export const updateRefundStatus = async (
  prisma: ExtendedPrismaClient,
  paymentIntent: string,
  refundStatus: string,
) => {
  let refundStatusState : state;
  switch(refundStatus) {
    case 'succeeded':
      refundStatusState = state.completed;
      break;
    case 'pending':
      refundStatusState = state.in_progress;
      break;
    default:
      refundStatusState = state.failed;
      break;
  }
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
    console.error('received refund for order that does not exist with PaymentIntent ' + paymentIntent);
    return;
  }

  await prisma.refunds.updateMany({
    where: {
      orderid_fk: order.orderid
    },
    data: {
      refund_status: refundStatusState,
    },
  });
};

export const orderFulfillment = async (
    prisma: ExtendedPrismaClient,
    contactid: number,
    eventInstanceQueries: any[],
    checkoutSession: string,
    orderSubtotal: number,
    discountTotal: number,
    orderItems: {
        orderTicketItems?: any[],
        donationItem?: any,
    },
    discountId?: number,
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
      },
    }),
    ...eventInstanceQueries,
  ]);
  return result[0];
};


export const updateCanceledOrder = async (
    prisma: ExtendedPrismaClient,
    order: orders,
) => {
  if (order.payment_intent) {
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


