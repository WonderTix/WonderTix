import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const orderController = Router();

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
