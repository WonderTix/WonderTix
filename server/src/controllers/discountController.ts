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
      deletedat: null,
    };

    if (req.query.active) {
      filters.active = {
        equals: Boolean(req.query.active),
      };
    }

    const discountRaw = await prisma.discounts.findUnique({
      where: filters,
    });

    if (!discountRaw) {
      return res.status(404).json({error: 'discount not found'});
    }

    const {deletedat, ...discount} = discountRaw;
    return res.status(200).json(discount);
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
    const filters: any = {
      deletedat: {
        equals: null,
      },
    };

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

    const discounts = await prisma.discounts.findMany({
      ...(filters && {where: filters}),
      orderBy: {
        discountid: 'asc',
      },
    });

    return res.status(200).json(discounts.map(({
      deletedat,
      ...discount
    }) => discount));
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
    const discountRaw = await prisma.discounts.findUnique({
      where: {
        discountid: Number(id),
        deletedat: null,
      },
    });

    if (!discountRaw) {
      return res.status(404).json({error: 'discount not found'});
    }

    const {deletedat, ...discount} = discountRaw;
    return res.status(200).json(discount);
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
    // Validations
    const {amount, percent, usagelimit, min_events, min_tickets} = req.body;
    if (amount && amount <= 0) {
      return res.status(400).json({error: 'Amount cannot be 0 or less'});
    }
    if (percent && percent < 1 || percent > 100) {
      return res.status(400).json({error: 'Percent cannot be less than 0 or greater than 100'});
    }
    if (usagelimit && usagelimit < 1) {
      return res.status(400).json({error: 'Usage limit cannot be 0 or less'});
    }
    if (min_events && min_events < 1) {
      return res.status(400).json({error: 'Min events cannot be 0 or less'});
    }
    if (min_tickets && min_tickets < 1) {
      return res.status(400).json({error: 'Min tickets cannot be 0 or less'});
    }

    // Attempt to create discount
    const discount = await prisma.discounts.create({
      data: {
        code: req.body.code,
        active: req.body.active,
        amount: amount,
        percent: percent,
        tickettypeid_fk: req.body.tickettype,
        usagelimit: usagelimit,
        min_events: min_events,
        min_tickets: min_tickets,
      },
    });

    return res.status(201).json(discount);
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
    const {amount, percent, usagelimit, min_events, min_tickets} = req.body;

    if (amount && amount <= 0) {
      return res.status(400).json({error: 'Amount cannot be 0 or less'});
    }
    if (percent && percent < 1 || percent > 100) {
      return res.status(400).json({error: 'Percent cannot be less than 0 or greater than 100'});
    }
    if (usagelimit && usagelimit < 1) {
      return res.status(400).json({error: 'Usage limit cannot be 0 or less'});
    }
    if (min_events && min_events < 1) {
      return res.status(400).json({error: 'Min events cannot be 0 or less'});
    }
    if (min_tickets && min_tickets < 1) {
      return res.status(400).json({error: 'Min tickets cannot be 0 or less'});
    }

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

    return res.status(204).json();
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
 *         description: discount deleted or soft deleted successfully.
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
    const id = Number(req.params.id);
    const discount = await prisma.discounts.findUnique({
      where: {
        discountid: id,
      },
      include: {
        orders: true,
      },
    });

    if (!discount) {
      return res.status(404).json({error: 'discount not found'});
    }

    if (discount.orders.length > 0) {
      // Soft delete if orders used discount code
      await prisma.discounts.update({
        where: {
          discountid: id,
        },
        data: {
          deletedat: new Date(),
        },
      });
    } else {
      await prisma.discounts.delete({
        where: {
          discountid: id,
        },
      });
    }

    return res.status(204).json();
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
