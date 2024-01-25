import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {
  orders,
  ticketitems,
  donations,
  ticketrestrictions,
  // eslint-disable-next-line camelcase
  order_ticketitems,
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

export const orderFulfillment = async (
    prisma: ExtendedPrismaClient,
    contactid: number,
    eventInstanceQueries: any[],
    checkoutSession: string,
    orderItems: {
        orderTicketItems?: any[],
        donations?: any[],
    },
    discount?: number,
) => {
  // will later include subscription items
  const {orderTicketItems, donations} = orderItems;
  const result = await prisma.$transaction([
    prisma.orders.create({
      data: {
        contactid_fk: contactid,
        checkout_sessions: checkoutSession,
        discountid_fk: discount,
        ...(orderTicketItems && {order_ticketitems: {create: orderTicketItems}}),
        ...(donations && {donations: {create: donations}}),
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
    throw new Error('Can not delete order that has been processed Stripe, order must be refunded');
  }

  const deletedOrder = await prisma.orders.delete({
    where: {
      orderid: order.orderid,
    },
    include: {
      order_ticketitems: {
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
          .order_ticketitems
          .map((item) => item.ticketitem.ticketrestriction.eventinstanceid_fk));
  await updateAvailableSeats(
      prisma,
      // @ts-ignore
      Array.from(eventInstances),
  );
};


// eslint-disable-next-line camelcase
interface LoadedOrderTicketItem extends order_ticketitems {
    ticketitem: LoadedTicketItem;
}

interface LoadedTicketItem extends ticketitems {
    ticketrestriction: ticketrestrictions;
}


export const createRefundedOrder = async (
    prisma: ExtendedPrismaClient,
    order: orders,
    orderTicketItems: LoadedOrderTicketItem[],
    donations: donations[],
    refundIntent: string,
) => {
  const eventInstances = new Set<number>();
  const ticketRefundItems = orderTicketItems.map((item) => {
    eventInstances.add(item.ticketitem.ticketrestriction.eventinstanceid_fk);
    return {
      ticketitemid_fk: item.ticketitemid_fk,
    };
  });

  const donationRefundItems = donations.map((item) => ({
    donationid: item.donationid,
  }));


  prisma.refunds.create({
    data: {
      orderid_fk: order.orderid,
      refund_intent: refundIntent,
      ...(donationRefundItems.length && {donations: {connect: donationRefundItems}}),
      ...(ticketRefundItems.length && {order_ticketitems: {connect: ticketRefundItems}}),
    },
  });

  await updateAvailableSeats(
      prisma,
      // @ts-ignore
      Array.from(eventInstances),
  );
};

const updateAvailableSeats = async (
    prisma: ExtendedPrismaClient,
    instanceIds: number[],
) => {
  const eventInstances = await prisma.eventinstances.findMany({
    where: {
      eventinstanceid: {in: instanceIds},
    },
    include: {
      ticketrestrictions: {
        include: {
          ticketitems: {
            include: {
              order_ticketitem: {
                where: {refundid_fk: null},
              },
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


