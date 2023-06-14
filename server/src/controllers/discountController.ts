import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const discountController = Router();

/**
 * @swagger
 * /2/discount:
 *   post:
 *     summary: Create a discount
 *     tags:
 *     - New Discount
 *     requestBody:
 *       description: Updated discount information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/discount'
 *     responses:
 *       201:
 *         description: discount updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/discount'
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
    const discount = prisma.discounts.create({
      data: {
        code: req.body.code,
        amount: req.body.amount,
        percent: req.body.percent,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        tickettypeid_fk: req.body.tickettype,
        createdby_fk: req.body.createdby,
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

discountController.use(checkJwt);
discountController.use(checkScopes);

/**
 * @swagger
 * /2/discount:
 *   get:
 *     summary: get all discounts
 *     tags:
 *     - New Discount
 *     responses:
 *       200:
 *         description: discount updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/discount'
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
    if (req.params.code) {
      filters.code = {
        equals: req.params.code,
      };
    }
    if (req.params.startdate) {
      filters.startdate = {
        equals: req.params.startdate,
      };
    }
    if (req.params.enddate) {
      filters.enddate = {
        equals: req.params.enddate,
      };
    }
    if (req.params.tickettype) {
      filters.tickettypeid_fk = {
        equals: req.params.tickettype,
      };
    }

    if (Object.keys(filters).length > 0) {
      const discounts = await prisma.discounts.findMany({
        where: filters,
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
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: discount updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/discount'
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
    const discountExists = await prisma.discounts.findUnique({
      where: {
        discountid: Number(id),
      },
    });
    if (!discountExists) {
      res.status(404).json({error: 'discount not found'});

      return;
    }
    const discount = await prisma.discounts.findUnique({
      where: {
        discountid: Number(id),
      },
    });
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
 *             $ref: '#/components/requestBodies/discount'
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
    const discount = prisma.discounts.update({
      where: {
        discountid: Number(id),
      },
      data: {
        code: req.body.code,
        amount: req.body.amount,
        percent: req.body.percent,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        tickettypeid_fk: req.body.tickettype,
        createdby_fk: req.body.createdby,
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
 *         description: discount updated successfully.
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
    const discount = prisma.discounts.delete({
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
