import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();

export const seasonTicketController = Router();

/**
 * @swagger
 * /2/season-ticket:
 *   post:
 *     summary: Create a season ticket
 *     tags:
 *     - New Season Ticket
 *     requestBody:
 *       description: Updated season ticket information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SeasonTicket'
 *     responses:
 *       201:
 *         description: season ticket updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeasonTicket'
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
seasonTicketController.post('/', async (req: Request, res: Response) => {
  try {
    const seasonTicket = prisma.seasontickets.create({
      data: {
        orderitemid_fk: req.body.orderitem,
        eventticketid_fk: req.body.eventticket,
        eventid_fk: req.body.event,
        seasontickettypeid_fk: req.body.seasontickettype,
        ticketwasswapped: req.body.ticketwasswapped,
      },
    });
    res.status(201).json(seasonTicket);

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

seasonTicketController.use(checkJwt);
seasonTicketController.use(checkScopes);

/**
 * @swagger
 * /2/season-ticket:
 *   get:
 *     summary: get all season ticket
 *     tags:
 *     - New Season Ticket
 *     responses:
 *       200:
 *         description: season ticket updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/SeasonTicket'
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
seasonTicketController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.orderitem) {
      filters.orderitemid_fk = {
        equals: req.params.orderitem,
      };
    }
    if (req.params.eventticket) {
      filters.eventticketid_fk = {
        equals: req.params.eventticket,
      };
    }
    if (req.params.event) {
      filters.eventid_fk = {
        equals: req.params.event,
      };
    }
    if (req.params.seasontickettype) {
      filters.seasontickettypeid_fk = {
        equals: req.params.seasontickettype,
      };
    }
    if (req.params.ticketwasswapped) {
      filters.ticketwasswapped = {
        equals: req.params.ticketwasswapped,
      };
    }

    if (Object.keys(filters).length > 0) {
      const seasonTickets = await prisma.seasontickets.findMany({
        where: filters,
      });
      res.status(200).json(seasonTickets);

      return;
    }

    const seasonTickets = await prisma.seasontickets.findMany();
    res.status(200).json(seasonTickets);

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
 * /2/season-ticket/{id}:
 *   get:
 *     summary: get a season ticket
 *     tags:
 *     - New Season Ticket
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: season ticket updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeasonTicket'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
seasonTicketController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const seasonTicketExists = await prisma.seasontickets.findUnique({
      where: {
        seasonticketid: Number(id),
      },
    });
    if (!seasonTicketExists) {
      res.status(404).json({error: 'season ticket not found'});

      return;
    }
    const seasonTicket = await prisma.seasontickets.findUnique({
      where: {
        seasonticketid: Number(id),
      },
    });
    res.status(200).json(seasonTicket);

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
 * /2/season-ticket/{id}:
 *   put:
 *     summary: update a season ticket
 *     tags:
 *     - New Season Ticket
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated season ticket information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SeasonTicket'
 *     responses:
 *       204:
 *         description: season ticket updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
seasonTicketController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const seasonTicket = prisma.seasontickets.update({
      where: {
        seasonticketid: Number(id),
      },
      data: {
        orderitemid_fk: req.body.orderitem,
        eventticketid_fk: req.body.eventticket,
        eventid_fk: req.body.event,
        seasontickettypeid_fk: req.body.seasontickettype,
        ticketwasswapped: req.body.ticketwasswapped,
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
 * /2/season-ticket/{id}:
 *   delete:
 *     summary: delete a season ticket
 *     tags:
 *     - New Season Ticket
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: season ticket updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: season ticket not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
seasonTicketController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userExists = await prisma.seasontickets.findUnique({
      where: {
        seasonticketid: Number(id),
      },
    });
    if (!userExists) {
      res.status(404).json({error: 'season ticket not found'});

      return;
    }
    const user = prisma.seasontickets.delete({
      where: {
        seasonticketid: Number(id),
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
