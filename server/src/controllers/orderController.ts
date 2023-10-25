import express, {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma, PrismaClient} from '@prisma/client';
import {orderCancel, ticketingWebhook} from './orderController.service';
const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const webhookKey = `${process.env.PRIVATE_STRIPE_WEBHOOK}`;
const stripe = require('stripe')(stripeKey);
const prisma = new PrismaClient();

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
 *     summary: get all orders
 *     tags:
 *     - New Order
 *     responses:
 *       200:
 *         description: order updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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
orderController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.ordername) {
      filters.ordername = {
        contains: req.params.ordername,
      };
    }
    if (req.params.auth0_id) {
      filters.auth0_id = {
        contains: req.params.auth0_id,
      };
    }

    if (Object.keys(filters).length > 0) {
      const orders = await prisma.orders.findMany({
        where: filters,
      });
      res.status(200).json(orders);

      return;
    }

    const orders = await prisma.orders.findMany();
    res.status(200).json(orders);

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


orderController.get('/active', async (req: Request, res: Response) => {
  try {
    const orders = prisma.orders.findMany({
      where: {
        refund_intent: null,
        payment_intent: {not: null},
      },
      include: {
        contacts: true,
      },
    });

    if (!orders) {
      return res.status(400).json({error: 'No refundable orders'});
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
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
