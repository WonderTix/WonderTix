import express, {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {Prisma} from '@prisma/client';
import {
  createRefundedOrder,
  ticketingWebhook,
  updateRefundStatus,
  readerWebhook, 
  discoverReaders, 
  abortPaymentIntent,
} from './orderController.service';

const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const webhookKey = `${process.env.PRIVATE_STRIPE_WEBHOOK}`;
const stripe = require('stripe')(stripeKey);
const prisma = extendPrismaClient();

export const orderController = Router();

orderController.post(
    '/webhook',
    express.raw({type: 'application/json'}),
    async (req: Request, res: Response) => {
      const sig = req.headers['stripe-signature'];
      try {
        const event = await stripe.webhooks.constructEvent(
            req.body,
            sig,
            webhookKey,
        );

        const object = event.data.object;
        const metaData = object.metadata;
        const action = object.action;

        // Handle in-person payments
        if (metaData.sessionType === '__reader' || 
            event.type === 'terminal.reader.action_failed' ||
            event.type === 'terminal.reader.action.succeeded') { // terminal events don't carry our __reader metadata
          await readerWebhook(
            prisma,
            event.type,
            action ? action.failure_message : 'no error',
            object.id, // paymentIntent ID if payment_intent event, reader ID if terminal event
          );
        }

        // Handle online payments
        if (metaData.sessionType === '__ticketing') {
          await ticketingWebhook(
              prisma,
              event.type,
              object.payment_intent,
              object.id,
          );
        } else if (event.type === 'charge.refunded' || event.type === 'charge.refund.updated') {
          await updateRefundStatus(
            prisma,
            object.payment_intent,
          );
        }

        return res.send();
      } catch (error) {
        console.error(error);
        return res.status(400).send();
      }
    },
);

orderController.use(express.json());
orderController.use(checkJwt);
orderController.use(checkScopes);

/**
 * @swagger
 * /2/order/refund:
 *   get:
 *     summary: get all orders with email
 *     tags:
 *     - New Order
 *     parameters:
 *     - in: query
 *       name: email
 *       description: Email associated with order
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: orders fetched successfully
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message from the server.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.get('/refund', async (req: Request, res: Response) => {
  try {
    const {email} = req.query;
    if (!email || typeof email !== 'string') {
      return res.status(400).send('Email Required');
    }
    const orders = await prisma.orders.findMany({
      where: {
        payment_intent: {not: null},
        OR: [
          {
            orderticketitems: {
              some: {
                refund: null,
              },
            },
          },
          {
            donation: {
              refund: null,
            },
          },
        ],
        contacts: {
          email: {contains: email},
        },
      },
      include: {
        contacts: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        orderticketitems: {
          where: {
            refund: null,
          },
          include: {
            ticketitem: {
              include: {
                ticketrestriction: {
                  include: {
                    eventinstance: {
                      include: {
                        event: true,
                      },
                    },
                    tickettype: true,
                  },
                },
              },
            },
          },
        },
        donation: {
          where: {
            refund: null,
          },
        },
      },
    });

    const toReturn = orders.map((order) => {
      const {
        contacts,
        orderticketitems,
        donation,
        orderdatetime,
        ...remainderOfOrder
      } = order;

      if (!contacts) return;

      const orderItems = new Map<string, number>();
      const ticketTotal = orderticketitems.reduce<number>((acc, item) => {
        if (!item.ticketitem) return acc;
        const key = `${item.ticketitem.ticketrestriction.eventinstance.event.eventname}`;
        orderItems.set(key, (orderItems.get(key) ?? 0)+1);
        return acc+Number(item.price);
      }, 0);
      return {
        price: ticketTotal,
        email: contacts.email,
        name: `${contacts.firstname} ${contacts.lastname}`,
        orderdate: orderdatetime,
        ...remainderOfOrder,
        items: [...orderItems.entries()].map(([key, value]) => `${value} x ${key}`),
        donation: +(donation?.amount ?? 0),
      };
    });
    return res.json(toReturn);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});
      return;
    }
    res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/order/readers:
 *   get:
 *     summary: get all terminal readers
 *     tags:
 *     - New Order
 *     responses:
 *       200:
 *         description: readers fetched successfully
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.get('/readers', async (req: Request, res: Response) => {
  try {
    const toReturn = await discoverReaders();
    return res.status(200).json(toReturn);
  } catch (error) {
    res.status(500).json({error});
  }
});

/**
 * @swagger
 * /2/order/reader-cancel:
 *   post:
 *     summary: Cancel payment intent and cancel order in prisma
 *     tags:
 *     - New Order
 *     responses:
 *       200:
 *         description: readers order successfully cancelled
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.post('/reader-cancel', async (req: Request, res: Response) => {
  const {paymentIntentID} = req.body;
  try {
    await abortPaymentIntent(prisma, paymentIntentID);
    return res.status(200).json('Reader order successfully cancelled');
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/order/refund/{id}:
 *   put:
 *     summary: begin refund process for an order based on order id (adds refund intent to any associated donations)
 *     tags:
 *     - New Order
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: refund process started
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message from the server.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.put('/refund/:id', async (req, res) => {
  try {
    const orderID = req.params.id;
    const order = await prisma.orders.findUnique({
      where: {
        orderid: Number(orderID),
      },
      include: {
        orderticketitems: {
          where: {
            refund: null,
          },
          include: {
            ticketitem: {
              include: {
                ticketrestriction: true,
              },
            },
          },
        },
        donation: {
          where: {
            refund: null,
          },
        },
      },
    });

    if (!order) {
      return res.status(400).json({error: `Order ${orderID} does not exist`});
    }
    if (!order.payment_intent) {
      return res.status(400).json({error: `Order ${orderID} is still processing`});
    }
    if (!order.donation && !order.orderticketitems.length) {
      return res.status(400).json({error: `Order ${orderID} has already been fully refunded`});
    }

    let refundIntent;
    if (order.payment_intent.includes('comp')) refundIntent = `refund-comp-${order.orderid}`;
    else if (order.payment_intent.includes('seeded-order')) refundIntent = `refund-seeded-order-${order.orderid}`;
    else {
      const refund = await stripe.refunds.create({
        payment_intent: order.payment_intent,
      });
      refundIntent = refund.id;
    }
    await createRefundedOrder(prisma, order, order.orderticketitems, refundIntent, order.donation);
    return res.send(refundIntent);
  } catch (error) {
    return res.status(500).json(error);
  }
});
/**
 * @swagger
 * /2/order/{id}:
 *   get:
 *     summary: get an order
 *     tags:
 *     - New Order
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: order updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const orderExists = await prisma.orders.findUnique({
      where: {
        orderid: Number(id),
      },
    });
    if (!orderExists) {
      res.status(404).json({error: 'order not found'});

      return;
    }
    const order = await prisma.orders.findUnique({
      where: {
        orderid: Number(id),
      },
    });
    res.status(200).json(order);

    return;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({error: error.message});

      return;
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});

      return;
    }

    res.status(500).json({error: 'Internal Server Error'});
  }
});
