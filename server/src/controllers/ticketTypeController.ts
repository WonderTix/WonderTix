import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();

export const ticketTypeController = Router();

/**
 * @swagger
 * /2/ticket-type:
 *   post:
 *     summary: Create a ticketType
 *     tags:
 *     - New ticketType
 *     requestBody:
 *       description: Updated ticketType information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/TicketType'
 *     responses:
 *       201:
 *         description: ticketType updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketType'
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
ticketTypeController.post('/', async (req: Request, res: Response) => {
  try {
    const ticketType = prisma.tickettype.create({
      data: {
        description: req.body.description,
        price: req.body.price,
        concessions: req.body.concessions,
        deprecated: req.body.deprecated,
      },
    });
    res.status(201).json(ticketType);

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
 * /2/ticket-type:
 *   get:
 *     summary: get all ticketTypes
 *     tags:
 *     - New ticketType
 *     responses:
 *       200:
 *         description: ticketType updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/TicketType'
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
ticketTypeController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.description) {
      filters.description = {
        contains: req.params.description,
      };
    }
    if (req.params.deprecated) {
      filters.deprecated = {
        equals: req.params.deprecated,
      };
    }

    if (Object.keys(filters).length > 0) {
      const ticketTypes = await prisma.tickettype.findMany({
        where: filters,
      });
      res.status(200).json(ticketTypes);

      return;
    }

    const ticketTypes = await prisma.tickettype.findMany();
    res.status(200).json(ticketTypes);

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

ticketTypeController.use(checkJwt);
ticketTypeController.use(checkScopes);

/**
 * @swagger
 * /2/ticket-type/{id}:
 *   get:
 *     summary: get a ticketType
 *     tags:
 *     - New ticketType
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ticketType updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketType'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
ticketTypeController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const ticketTypeExists = await prisma.tickettype.findUnique({
      where: {
        tickettypeid: Number(id),
      },
    });
    if (!ticketTypeExists) {
      res.status(404).json({error: 'ticketType not found'});

      return;
    }
    const ticketType = await prisma.tickettype.findUnique({
      where: {
        tickettypeid: Number(id),
      },
    });
    res.status(200).json(ticketType);

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
 * /2/ticket-type/{id}:
 *   put:
 *     summary: update a ticketType
 *     tags:
 *     - New ticketType
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated ticketType information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/TicketType'
 *     responses:
 *       204:
 *         description: ticketType updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
ticketTypeController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const ticketType = prisma.tickettype.update({
      where: {
        tickettypeid: Number(id),
      },
      data: {
        description: req.body.description,
        price: req.body.price,
        concessions: req.body.concessions,
        deprecated: req.body.deprecated,
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
 * /2/ticket-type/{id}:
 *   delete:
 *     summary: delete a ticketType
 *     tags:
 *     - New ticketType
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: ticketType updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: ticketType not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
ticketTypeController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const ticketTypeExists = await prisma.tickettype.findUnique({
      where: {
        tickettypeid: Number(id),
      },
    });
    if (!ticketTypeExists) {
      res.status(404).json({error: 'ticketType not found'});

      return;
    }
    const ticketType = prisma.tickettype.delete({
      where: {
        tickettypeid: Number(id),
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
