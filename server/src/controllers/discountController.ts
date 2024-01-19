import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();
export const discountController = Router();

/**
 * @swagger
 * /2/discount/code/{code}:
 *   get:
 *     summary: get a discount
 *     tags:
 *     - New Discount
 *     parameters:
 *     - $ref: '#/components/parameters/code'
 *     responses:
 *       200:
 *         description: discount acquired successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
discountController.get('/code/:code', async (req: Request, res: Response) => {
  try {
    const code = req.params.code;
    const filters: any = {
      code: code,
    };

    if (req.query.active) {
      filters.active = {
        equals: Boolean(req.query.active),
      };
    }

    const discount = await prisma.discounts.findUnique({
      where: filters,
    });

    if (!discount) {
      res.status(404).json({error: 'discount not found'});
      return;
    }

    res.status(200).json(discount);
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

discountController.use(checkJwt);
discountController.use(checkScopes);

/**
 * @swagger
 * /2/discount:
 *   get:
 *     summary: get all discounts
 *     tags:
 *     - New Discount
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: discounts acquired successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Discount'
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
discountController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};

    if (req.query.code) {
      filters.code = {
        equals: req.query.code,
      };
    }
    if (req.query.active) {
      filters.active = {
        equals: Boolean(req.query.active),
      };
    }
    if (req.query.tickettype) {
      filters.tickettypeid_fk = {
        equals: req.query.tickettype,
      };
    }

    if (Object.keys(filters).length > 0) {
      const discounts = await prisma.discounts.findMany({
        where: filters,
        orderBy: {
          discountid: 'desc',
        },
      });
      res.status(200).json(discounts);
      return;
    }

    const discounts = await prisma.discounts.findMany();
    res.status(200).json(discounts);
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
 * /2/discount/{id}:
 *   get:
 *     summary: get a discount
 *     tags:
 *     - New Discount
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: discount acquired successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
discountController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const discount = await prisma.discounts.findUnique({
      where: {
        discountid: Number(id),
      },
    });

    if (!discount) {
      res.status(404).json({error: 'discount not found'});
      return;
    }

    res.status(200).json(discount);
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
 * /2/discount:
 *   post:
 *     summary: Create a discount
 *     tags:
 *     - New Discount
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       description: Create discount information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Discount'
 *     responses:
 *       201:
 *         description: discount created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
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
discountController.post('/', async (req: Request, res: Response) => {
  try {
    const discount = await prisma.discounts.create({
      data: {
        code: req.body.code,
        active: req.body.active,
        amount: req.body.amount,
        percent: req.body.percent,
        tickettypeid_fk: req.body.tickettype,
        usagelimit: req.body.usagelimit,
        min_events: req.body.min_events,
        min_tickets: req.body.min_tickets,
      },
    });

    res.status(201).json(discount);
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
 * /2/discount/{id}:
 *   put:
 *     summary: update a discount
 *     tags:
 *     - New Discount
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated discount information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Discount'
 *     responses:
 *       204:
 *         description: discount updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
discountController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.discounts.update({
      where: {
        discountid: Number(id),
      },
      data: {
        code: req.body.code,
        active: req.body.active,
        amount: req.body.amount,
        percent: req.body.percent,
        tickettypeid_fk: req.body.tickettype,
        usagelimit: req.body.usagelimit,
        min_events: req.body.min_events,
        min_tickets: req.body.min_tickets,
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
 * /2/discount/{id}:
 *   delete:
 *     summary: delete a discount
 *     tags:
 *     - New Discount
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: discount deleted successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: discount not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
discountController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const discountExists = await prisma.discounts.findUnique({
      where: {
        discountid: Number(id),
      },
    });
    if (!discountExists) {
      res.status(404).json({error: 'discount not found'});
      return;
    }
    await prisma.discounts.delete({
      where: {
        discountid: Number(id),
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
