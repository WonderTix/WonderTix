import {
  PrismaClient,
  ticketrestrictions,
} from '@prisma/client';

interface TicketingMetaData {
  sessionType: string;
  primaryTicketIDs: string;
  secondaryTicketIDs: string;
  custid: number;
  orderID: number;
  donation: number;
  discountCode: string | null; // when discounts are implemented should be discount foreign key.
}
export const ticketingWebhook = async (
    prisma: PrismaClient,
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
      await orderCancel(
          prisma,
          order.orderid,
      );
      break;
  }
};
export const orderFulfillment = async (
    prisma: PrismaClient,
    orderItems: any[],
    contactid: number,
    ordertotal: number,
    eventInstanceQueries: any[],
    sessionID: string,
    discount?: number,
) => {
  const result = await prisma.$transaction([
    prisma.orders.create({
      data: {
        ...getOrderDateAndTime(),
        checkout_sessions: sessionID,
        contactid_fk: contactid,
        ordertotal,
        discountid_fk: discount,
        orderitems: {
          create: orderItems,
        },
      },
    }),
    ...eventInstanceQueries,
  ]);
  return result[0].orderid;
};
export const orderCancel = async (
    prisma: PrismaClient,
    orderID: number,
) => {
  const queriesToBatch :any[] = [];
  await prisma.orders.delete({
    where: {
      orderid: Number(orderID),
    },
  });

  const eventInstances = await prisma.eventinstances.findMany({
    include: {
      eventtickets: true,
    },
  });

  eventInstances.forEach((instance) => {
    const ticketsSold = new Map<number, number>();

    instance.eventtickets.forEach((ticket) => {
      if (!ticket.singleticket_fk) return;

      const count = ticketsSold.get(ticket.tickettypeid_fk??1) ?? 0;
      ticketsSold.set(ticket.tickettypeid_fk??1, count+1);
    });
    const updatedAvailable = instance.totalseats??0 -(ticketsSold.get(1)??0);

    if (updatedAvailable === instance.availableseats) return;

    queriesToBatch.push(prisma.eventinstances.update({
      where: {
        eventinstanceid: instance.eventinstanceid,
      },
      data: {
        availableseats: instance.totalseats??0 - (ticketsSold.get(1) ?? 0),
      },
    }));
    for (const entry of ticketsSold) {
      if (entry[0] === 1) continue;
      queriesToBatch.push(
          prisma.ticketrestrictions.updateMany({
            where: {
              tickettypeid_fk: entry[0],
              eventinstanceid_fk: instance.eventinstanceid,
            },
            data: {
              ticketssold: entry[1],
            },
          }),
      );
    }
  });

  await prisma.$transaction(queriesToBatch);
  return;
};
const getOrderDateAndTime = () => {
  const date = new Date();

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return {
    orderdate: year * 10000 + month * 100 + day,
    ordertime: date.toISOString(),
  };
};
