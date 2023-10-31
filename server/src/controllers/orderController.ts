import express, {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {Prisma} from '@prisma/client';
import {orderCancel, ticketingWebhook} from './orderController.service';
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
        // handle donation amount in metadata (will be a donation team task?)
        } else if (metaData.sessionType === '__donation') {
        // donation is handled
        }
        res.status(200).send();
        return;
      } catch (error) {
        console.error(error);
        return res.status(400).send();
      }
    },
);

orderController.use(express.json());
/**
 * @swagger
 * /2/order:
 *   post:
 *     summary: Create an order
 *     tags:
 *     - New Order
 *     requestBody:
 *       description: Updated order information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Order'
 *     responses:
 *       201:
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
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message from the server.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.post('/', async (req: Request, res: Response) => {
  try {
    const order = prisma.orders.create({
      data: {
        contactid_fk: req.body.contact,
        orderdate: req.body.orderdate,
        ordertime: req.body.ordertime,
        discountid_fk: req.body.discount,
        payment_intent: req.body.payment_intent,
        refund_intent: req.body.refund_intent,
        ordertotal: req.body.ordertotal,
      },
    });
    res.status(201).json(order);

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

orderController.use(checkJwt);
orderController.use(checkScopes);

/**
 * @swagger
 * /2/order:
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
orderController.get('/', async (req: Request, res: Response) => {
  try {
    const {email} = req.query;
    if (!email || typeof email !== 'string') {
      return res.status(400).send('Email Required');
    }
    const orders = await prisma.orders.findMany({
      where: {
        payment_intent: {not: null},
        refund_intent: null,
        ordertotal: {not: 0},
        contacts: {
          email: {contains: email},
        },
      },
      select: {
        orderid: true,
        ordertotal: true,
        contacts: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        orderdate: true,
        ordertime: true,
        orderitems: {
          select: {
            singletickets: {
              select: {
                ticketwasswapped: true,
                eventtickets: {
                  select: {
                    eventinstances: {
                      select: {
                        events: {
                          select: {
                            eventname: true,
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
    const toReturn = orders.map((order) => {
      const {
        contacts,
        orderitems,
        ordertotal,
        orderdate,
        ...evenythingElse
      } = order;
      const names = orderitems.map((item) =>
        item.singletickets
            .filter((ticket) => !ticket.ticketwasswapped)
            .map((ticket) => {
              if (!ticket.eventtickets.length) return null;
              console.log(ticket.eventtickets[0].eventinstances.events.eventname);
              return ticket.eventtickets[0].eventinstances.events.eventname;
            }),
      ).flat()
          .filter((name, index, array) => name && array.indexOf(name)=== index);

      return {
        price: ordertotal,
        email: contacts.email,
        name: `${contacts.firstname} ${contacts.lastname}`,
        orderdate: `${orderdate.toString().slice(4, 6)}/${orderdate.toString().slice(6, 8)}/${orderdate.toString().slice(0, 4)}`,
        ...evenythingElse,
        showings: names,
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


orderController.put('/refund/:id', async (req, res) => {
  try {
    const orderID = req.params.id;
    const order = await prisma.orders.findUnique({
      where: {
        orderid: Number(orderID),
      },
    });
    if (!order) {
      return res.status(400).json({error: `Order ${orderID} does not exist`});
    }
    if (!order.payment_intent) {
      return res.status(400).json({error: `Order ${orderID} is still processing`});
    }
    if (order.refund_intent) {
      return res.status(400).json({error: `Order ${orderID} has already been refunded`});
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
    await orderCancel(prisma, order.orderid, refundIntent);
    return res.send(refundIntent);
  } catch (error) {
    console.log(error);
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
 *       - bearerAuth: []
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

/**
 * @swagger
 * /2/order/{id}:
 *   put:
 *     summary: update an order
 *     tags:
 *     - New Order
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated order information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Order'
 *     responses:
 *       204:
 *         description: order updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order = prisma.orders.update({
      where: {
        orderid: Number(id),
      },
      data: {
        contactid_fk: req.body.contact,
        orderdate: req.body.orderdate,
        ordertime: req.body.ordertime,
        discountid_fk: req.body.discount,
        payment_intent: req.body.payment_intent,
        refund_intent: req.body.refund_intent,
        ordertotal: req.body.ordertotal,
      },
    });
    res.status(204).json();

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

/**
 * @swagger
 * /2/order/{id}:
 *   delete:
 *     summary: delete an order
 *     tags:
 *     - New Order
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: order updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: order not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.delete('/:id', async (req: Request, res: Response) => {
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
    const order = prisma.orders.delete({
      where: {
        orderid: Number(id),
      },
    });
    res.status(204).json();

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
