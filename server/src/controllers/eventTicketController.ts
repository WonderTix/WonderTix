import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const eventTicketController = Router();

/**
 * @swagger
 * /2/event-ticket:
 *   post:
 *     summary: Create an event ticket
 *     tags:
 *     - New event ticket
 *     requestBody:
 *       description: Updated event ticket information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/EventTicket'
 *     responses:
 *       201:
 *         description: event ticket updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventTicket'
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
eventTicketController.post('/', async (req: Request, res: Response) => {
  try {
    const eventTicket = prisma.eventtickets.create({
      data: {
        eventinstanceid_fk: req.body.event_instance,
        tickettypeid_fk: req.body.ticket_type,
        purchased: req.body.purchased,
        redeemed: req.body.redeemed,
        redeemed_ts: req.body.redeemed_ts,
        donated: req.body.donated,
      },
    });
    res.status(201).json(eventTicket);

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

eventTicketController.use(checkJwt);
eventTicketController.use(checkScopes);

/**
 * @swagger
 * /2/event-ticket:
 *   get:
 *     summary: get all event tickets
 *     tags:
 *     - New event tickets
 *     responses:
 *       200:
 *         description: event ticket updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/EventTicket'
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
eventTicketController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.event_instance) {
      filters.eventinstanceid_fk = {
        equals: req.params.event_instance,
      };
    }
    if (req.params.ticket_type) {
      filters.tickettypeid_fk = {
        equals: req.params.ticket_type,
      };
    }
    if (req.params.purchased) {
      filters.purchased = {
        equals: req.params.purchased,
      };
    }
    if (req.params.redeemed) {
      filters.redeemed = {
        contains: req.params.redeemed,
      };
    }
    if (req.params.donated) {
      filters.donated = {
        equals: req.params.donated,
      };
    }

    if (Object.keys(filters).length > 0) {
      const eventTickets = await prisma.eventtickets.findMany({
        where: filters,
      });
      res.status(200).json(eventTickets);

      return;
    }

    const eventTickets = await prisma.eventtickets.findMany();
    res.status(200).json(eventTickets);

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
 * /2/event-ticket/{id}:
 *   get:
 *     summary: get an event ticket
 *     tags:
 *     - New event ticket
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event ticket updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventTicket'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventTicketController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const eventTicketExists = await prisma.eventtickets.findUnique({
      where: {
        eventticketid: Number(id),
      },
    });
    if (!eventTicketExists) {
      res.status(404).json({error: 'event ticket not found'});

      return;
    }
    const eventTicket = await prisma.eventtickets.findUnique({
      where: {
        eventticketid: Number(id),
      },
    });
    res.status(200).json(eventTicket);

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
 * /2/event-ticket/{id}:
 *   put:
 *     summary: update an event ticket
 *     tags:
 *     - New event ticket
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated event ticket information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/EventTicket'
 *     responses:
 *       204:
 *         description: event ticket updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventTicketController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const eventTicket = prisma.eventtickets.update({
      where: {
        eventticketid: Number(id),
      },
      data: {
        eventinstanceid_fk: req.body.event_instance,
        tickettypeid_fk: req.body.ticket_type,
        purchased: req.body.purchased,
        redeemed: req.body.redeemed,
        redeemed_ts: req.body.redeemed_ts,
        donated: req.body.donated,
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
 * /2/event-ticket/{id}:
 *   delete:
 *     summary: delete an event ticket
 *     tags:
 *     - New event ticket
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: event ticket updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: event ticket not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventTicketController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const eventTicketExists = await prisma.eventtickets.findUnique({
      where: {
        eventticketid: Number(id),
      },
    });
    if (!eventTicketExists) {
      res.status(404).json({error: 'event ticket not found'});

      return;
    }
    const eventTicket = prisma.eventtickets.delete({
      where: {
        eventticketid: Number(id),
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
