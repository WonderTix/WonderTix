import {
  eventinstances,
  PrismaClient,
  ticketrestrictions,
} from '@prisma/client';
import {OrderItem} from './eventController.service';

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
    orderData: TicketingMetaData,
    paymentIntent: string,
) => {
  const {
    orderID,
    custid,
    primaryTicketIDs,
    secondaryTicketIDs,
    donation,
  } = orderData;

  switch (eventType) {
    case 'payment_intent.succeeded': {
      await prisma.orders.update({
        where: {
          orderid: Number(orderID),
        },
        data: {
          payment_intent: paymentIntent,
        },
      });
      break;
    }
    case 'payment_intent.canceled':
      await orderCancel(
          prisma,
          Number(orderID),
          JSON.parse(primaryTicketIDs),
          JSON.parse(secondaryTicketIDs),
      );
      break;
  }
};
export const orderFulfillment = async (
    prisma: PrismaClient,
    orderItems: OrderItem[],
    contactid: number,
    ordertotal: number,
    eventInstanceQueries: any[],
    discount?: number,
) => {
  const result = await prisma.$transaction([
    prisma.orders.create({
      data: {
        ...getOrderDateAndTime(),
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
    primaryTicketIDs: number[],
    secondaryTicketIDs: number[],
) => {
  const primaryEventTickets = await prisma.eventtickets.findMany({
    where: {
      eventticketid: {in: primaryTicketIDs.map((id) => Number(id))},
    },
    include: {
      eventinstances: {
        include: {
          ticketrestrictions: true,
        },
      },
    },
  });

  const eventInstances = new Map<
    [number, number],
    { instance: any; ticketQuantity: number }
  >();

  primaryEventTickets.forEach((ticket) => {
    const entry = eventInstances.get([
      ticket.eventinstanceid_fk,
      ticket.tickettypeid_fk ?? 1,
    ]);
    if (!entry) {
      eventInstances.set(
          [ticket.eventinstanceid_fk, ticket.tickettypeid_fk ?? 1],
          {instance: ticket.eventinstances, ticketQuantity: 1},
      );
      return;
    }
    entry.ticketQuantity += 1;
  });

  const queriesToBatch: any[] = [];

  for (const [
    [, ticketTypeID],
    {instance, ticketQuantity},
  ] of eventInstances) {
    const ticketRest = instance.ticketrestrictions.find(
        (restriction: ticketrestrictions) =>
          ticketTypeID === restriction.tickettypeid_fk,
    );

    if (!ticketRest) {
      throw new Error('ticket type does not exist');
    }
    queriesToBatch.push(
        prisma.eventinstances.update({
          where: {
            eventinstanceid: instance.eventinstanceid,
          },
          data: {
            availableseats: (instance.availableseats ?? 0) + ticketQuantity,
            ticketrestrictions: {
              update: {
                where: {
                  ticketrestrictionsid: ticketRest.tickettypeid_fk,
                },
                data: {
                  ticketssold:
                  (ticketRest.ticketssold ?? ticketQuantity) - ticketQuantity,
                },
              },
            },
          },
        }),
    );
  }
  await prisma.$transaction([
    prisma.orders.delete({
      where: {
        orderid: orderID,
      },
    }),
    ...queriesToBatch,
    prisma.eventtickets.updateMany({
      where: {
        eventticketid: {in: [...primaryTicketIDs, ...secondaryTicketIDs]},
      },
      data: {
        purchased: false,
      },
    }),
  ]);
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
