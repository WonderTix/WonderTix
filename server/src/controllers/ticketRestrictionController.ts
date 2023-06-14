import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const ticketRestrictionController = Router();

/**
 * @swagger
 * /2/ticket-restriction:
 *   post:
 *     summary: Create a ticket restriction
 *     tags:
 *     - New Ticket Restriction
 *     requestBody:
 *       description: Updated ticket restriction information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/ticket-restriction'
 *     responses:
 *       201:
 *         description: Ticket restriction updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ticket-restriction'
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
ticketRestrictionController.post('/', async (req: Request, res: Response) => {
  try {
    const ticketRestriction = prisma.ticketrestrictions.create({
      data: {
        eventinstanceid_fk: req.body.event_instance,
        tickettypeid_fk: req.body.ticket_type,
        ticketlimit: req.body.ticket_limit,
        ticketssold: req.body.tickets_sold,
      },
    });
    res.status(201).json(ticketRestriction);

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

ticketRestrictionController.use(checkJwt);
ticketRestrictionController.use(checkScopes);

/**
 * @swagger
 * /2/ticket-restriction:
 *   get:
 *     summary: get all Ticket Restrictions
 *     tags:
 *     - New Ticket Restrictions
 *     responses:
 *       200:
 *         description: ticket restriction updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/ticket-restriction'
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
ticketRestrictionController.get('/', async (req: Request, res: Response) => {
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

    if (Object.keys(filters).length > 0) {
      const ticketRestrictions = await prisma.ticketrestrictions.findMany({
        where: filters,
      });
      res.status(200).json(ticketRestrictions);

      return;
    }

    const ticketRestrictions = await prisma.ticketrestrictions.findMany();
    res.status(200).json(ticketRestrictions);

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
 * /2/ticket-restriction/{id}:
 *   get:
 *     summary: get a Ticket Restriction
 *     tags:
 *     - New Ticket Restriction
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ticket restriction updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ticket-restriction'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
ticketRestrictionController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const ticketRestrictionExists = await prisma.ticketrestrictions.findUnique({
      where: {
        ticketrestrictionsid: Number(id),
      },
    });
    if (!ticketRestrictionExists) {
      res.status(404).json({error: 'Ticket Restriction not found'});

      return;
    }
    const ticketRestriction = await prisma.ticketrestrictions.findUnique({
      where: {
        ticketrestrictionsid: Number(id),
      },
    });
    res.status(200).json(ticketRestriction);

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
 * /2/ticket-restriction/{id}:
 *   put:
 *     summary: update a ticket restriction
 *     tags:
 *     - New Ticket Restriction
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated ticket restriction information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/ticket-restriction'
 *     responses:
 *       204:
 *         description: Ticket restriction updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
ticketRestrictionController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const ticketRestriction = prisma.ticketrestrictions.update({
      where: {
        ticketrestrictionsid: Number(id),
      },
      data: {
        eventinstanceid_fk: req.body.event_instance,
        tickettypeid_fk: req.body.ticket_type,
        ticketlimit: req.body.ticket_limit,
        ticketssold: req.body.tickets_sold,
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
 * /2/ticket-restriction/{id}:
 *   delete:
 *     summary: delete a Ticket Restriction
 *     tags:
 *     - New Ticket Restriction
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Ticket Restriction updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Ticket Restriction not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
ticketRestrictionController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const TicketRestrictionExists = await prisma.ticketrestrictions.findUnique({
      where: {
        ticketrestrictionsid: Number(id),
      },
    });
    if (!TicketRestrictionExists) {
      res.status(404).json({error: 'Ticket Restriction not found'});

      return;
    }
    const ticketRestriction = prisma.ticketrestrictions.delete({
      where: {
        ticketrestrictionsid: Number(id),
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
