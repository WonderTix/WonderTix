import express, {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {Prisma} from '@prisma/client';
import {
  createRefundedOrder,
  ticketingWebhook,
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

        if (metaData.sessionType === '__ticketing') {
          await ticketingWebhook(
              prisma,
              event.type,
              object.payment_intent,
              object.id,
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
        order_ticketitems: {
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
        donations: true,
      },
    });

    const toReturn = orders.map((order) => {
      const {
        contacts,
        // eslint-disable-next-line camelcase
        order_ticketitems,
        donations,
        orderdateandtime,
        ...remainderOfOrder
      } = order;
      const orderItems = new Map<string, number>();
      // eslint-disable-next-line camelcase
      const ticketTotal = order_ticketitems.reduce<number>((acc, item) => {
        const key = `${item.ticketitem.ticketrestriction.eventinstance.event.eventname} - ${item.ticketitem.ticketrestriction.tickettype.description}`;
        orderItems.set(key, (orderItems.get(key) ?? 0)+1);
        return acc+Number(item.price);
      }, 0);
      return {
        price: ticketTotal,
        email: contacts.email,
        name: `${contacts.firstname} ${contacts.lastname}`,
        orderdate: orderdateandtime.toISOString(),
        ...remainderOfOrder,
        items: Array.from(orderItems),
        donation: donations.reduce<number>((acc, donation) => Number(donation.amount)+acc, 0),
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
 * /2/order/refund/{id}:
 *   put:
 *     summary: refund an order based on order id (adds refund intent to any associated donations)
 *     tags:
 *     - New Order
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: orders refunded successfully
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
        order_ticketitems: {
          where: {
            refundid_fk: null,
          },
          include: {
            ticketitem: {
              include: {
                ticketrestriction: true,
              },
            },
          },
        },
        donations: {
          where: {
            refundid_fk: null,
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
    if (!order.donations.length && !order.order_ticketitems.length) {
      return res.status(400).json({error: `Order ${orderID} has already been fully refunded`});
    }

    let refundIntent;
    if (order.payment_intent.includes('comp')) refundIntent = `refund-comp-${order.orderid}`;
    else {
      const refund = await stripe.refunds.create({
        payment_intent: order.payment_intent,
      });
      if (refund.status !== 'succeeded') {
        throw new Error(`Refund failed`);
      }
      refundIntent = refund.id;
    }
    await createRefundedOrder(prisma, order, order.order_ticketitems, order.donations, refundIntent);
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
