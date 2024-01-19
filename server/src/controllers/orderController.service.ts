import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {freq, orderitems, orders, singletickets} from '@prisma/client';


interface LoadedOrder extends orders {
  orderitems: LoadedOrderItem[]
}

interface LoadedOrderItem extends orderitems {
  singletickets: singletickets[],
}

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
  return result[0];
};


export const updateCanceledOrder = async (
    prisma: ExtendedPrismaClient,
    order: orders,
) => {
  const deletedOrder = await prisma.orders.delete({
    where: {
      orderid: order.orderid,
    },
    include: {
      orderitems: {
        include: {
          singletickets: {
            include: {
              eventticket: {
                include: {
                  eventinstances: {
                    include: {
                      eventtickets: {
                        where: {
                          singleticketid_fk: {not: null},
                        },
                      },
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

  const eventInstances = new Set(deletedOrder
      .orderitems
      .map((item) => item.singletickets)
      .flat(1)
      .filter((ticket) => ticket.eventticket)
      .map((ticket) => ticket.eventticket?.eventinstances.eventinstanceid));

  await updateAvailableSeats(
      prisma,
      // @ts-ignore
      Array.from(eventInstances),
  );
};

export const updateRefundedOrder = async (
    prisma: ExtendedPrismaClient,
    order: orders,
    refundIntent: string,
) => {
  const updateOrder = await prisma.orders.update({
    where: {
      orderid: order.orderid,
    },
    data: {
      refund_intent: refundIntent,
    },
    include: {
      orderitems: {
        include: {
          singletickets: {
            include: {
              eventticket: {
                include: {
                  eventinstances: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const eventInstances = new Set(updateOrder
      .orderitems
      .map((item) => item.singletickets)
      .flat(1)
      .filter((ticket) => ticket.eventticket)
      .map((ticket) => ticket.eventticket?.eventinstances.eventinstanceid));

  await updateRefundedOrderItems(
      prisma,
      updateOrder.orderitems,
  );

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
      eventtickets: {
        where: {
          singleticketid_fk: {not: null},
        },
      },
    },
  });

  await prisma.$transaction(eventInstances.map((instance) => prisma.eventinstances.update({
    where: {
      eventinstanceid: instance.eventinstanceid,
    },
    data: {
      availableseats: (instance.totalseats ?? 0) - instance.eventtickets.length,
    },
  })),
  );
};

const updateRefundedOrderItems = async (
    prisma: ExtendedPrismaClient,
    orderItems: LoadedOrderItem[],
) => {
  await prisma.orderitems.updateMany({
    where: {orderitemid: {in: orderItems.map((item) => item.orderitemid)}},
    data: {
      refunded: true,
    },
  });

  const singleTicketsToUpdate = orderItems
      .map((item) => item.singletickets)
      .flat(1)
      .filter((ticket) => !ticket.ticketwasswapped)
      .map((ticket) => ticket.singleticketid);

  await prisma.eventtickets.updateMany({
    where: {
      singleticketid_fk: {in: singleTicketsToUpdate},
    },
    data: {
      singleticketid_fk: null,
    },
  });
};

const getOrderDateAndTime = () => {
  const date = new Date();

  const formatDatePart = (part: number) => part.toString().padStart(2, '0');

  const orderdate = parseInt(`${date.getFullYear()}${formatDatePart(date.getMonth() + 1)}${formatDatePart(date.getDate())}`, 10);

  const ordertime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

  return {orderdate, ordertime};
};
