import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();

export const orderItemController = Router();

/**
 * @swagger
 * /2/order-item:
 *   post:
 *     summary: Create an order item
 *     tags:
 *     - New order item
 *     requestBody:
 *       description: Updated order item information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/OrderItem'
 *     responses:
 *       201:
 *         description: order item updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
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
orderItemController.post('/', async (req: Request, res: Response) => {
  try {
    const orderItem = prisma.orderitems.create({
      data: {
        orderid_fk: req.body.order,
        price: req.body.price,
      },
    });
    res.status(201).json(orderItem);

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

orderItemController.use(checkJwt);
orderItemController.use(checkScopes);

/**
 * @swagger
 * /2/order-item:
 *   get:
 *     summary: get all order items
 *     tags:
 *     - New order items
 *     responses:
 *       200:
 *         description: order item updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/OrderItem'
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
orderItemController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.order) {
      filters.order = {
        equals: req.params.order,
      };
    }
    if (req.params.price) {
      filters.price = {
        equals: req.params.price,
      };
    }

    if (Object.keys(filters).length > 0) {
      const orderItems = await prisma.orderitems.findMany({
        where: filters,
      });
      res.status(200).json(orderItems);

      return;
    }

    const orderItems = await prisma.orderitems.findMany();
    res.status(200).json(orderItems);

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
 * /2/order-item/{id}:
 *   get:
 *     summary: get an order item
 *     tags:
 *     - New order item
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: order item updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderItemController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const orderItemExists = await prisma.orderitems.findUnique({
      where: {
        orderitemid: Number(id),
      },
    });
    if (!orderItemExists) {
      res.status(404).json({error: 'order item not found'});

      return;
    }
    const orderItem = await prisma.orderitems.findUnique({
      where: {
        orderitemid: Number(id),
      },
    });
    res.status(200).json(orderItem);

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
 * /2/order-item/{id}:
 *   put:
 *     summary: update an order item
 *     tags:
 *     - New order item
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated order item information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/OrderItem'
 *     responses:
 *       204:
 *         description: order item updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderItemController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const orderItem = prisma.orderitems.update({
      where: {
        orderitemid: Number(id),
      },
      data: {
        orderid_fk: req.body.order,
        price: req.body.price,
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
 * /2/order-item/{id}:
 *   delete:
 *     summary: delete an order item
 *     tags:
 *     - New order item
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: order item updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: order item not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderItemController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const orderItemExists = await prisma.orderitems.findUnique({
      where: {
        orderitemid: Number(id),
      },
    });
    if (!orderItemExists) {
      res.status(404).json({error: 'order item not found'});

      return;
    }
    const orderItem = prisma.orderitems.delete({
      where: {
        orderitemid: Number(id),
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
