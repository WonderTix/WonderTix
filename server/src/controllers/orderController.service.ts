import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {freq} from '@prisma/client';
import {validateTicketRestrictionsOnUpdate} from './eventInstanceController.service';
import {inflate} from 'zlib';

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
      await orderCancel(prisma, order.orderid);
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
  return result[0].orderid;
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
        orderitems: {
          updateMany: {
            where: {},
            data: {
              refunded: true,
            },
          },
        },
      },
      include: {
        orderitems: {
          include: {
            singletickets: true,
          },
        },
      },
    });
    await prisma.$transaction(updatedOrder
        .orderitems
        .map((item) => item.singletickets).flat(1)
        .map((ticket) =>
          prisma.singletickets.update({
            where: {
              singleticketid: ticket.singleticketid,
            },
            data: {
              eventticket: {
                disconnect: true,
              },
            },
          }),
        ),
    );
  }
  return;
};

const getOrderDateAndTime = () => {
  const date = new Date();

  const formatDatePart = (part: number) => part.toString().padStart(2, '0');

  const orderdate = parseInt(`${date.getFullYear()}${formatDatePart(date.getMonth() + 1)}${formatDatePart(date.getDate())}`, 10);

  const ordertime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

  return {orderdate, ordertime};
};
