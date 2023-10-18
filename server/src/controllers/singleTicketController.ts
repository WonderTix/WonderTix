import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const singleTicketController = Router();

/**
 * @swagger
 * /2/single-ticket:
 *   post:
 *     summary: Create a Single Ticket
 *     tags:
 *     - New Single Ticket
 *     requestBody:
 *       description: Updated Single Ticket information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SingleTicket'
 *     responses:
 *       201:
 *         description: Single Ticket updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleTicket'
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
singleTicketController.post('/', async (req: Request, res: Response) => {
  try {
    const singleTicket = prisma.singletickets.create({
      data: {
        orderitemid_fk: req.body.orderitem,
        ticketwasswapped: req.body.ticketwasswapped,
      },
    });
    res.status(201).json(singleTicket);

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

singleTicketController.use(checkJwt);
singleTicketController.use(checkScopes);

/**
 * @swagger
 * /2/single-ticket:
 *   get:
 *     summary: get all Single Ticket
 *     tags:
 *     - New Single Ticket
 *     responses:
 *       200:
 *         description: single ticket updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/SingleTicket'
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
singleTicketController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.eventticket) {
      filters.eventticketid_fk = {
        contains: req.params.eventticket,
      };
    }
    if (req.params.orderitem) {
      filters.orderitemid_fk = {
        contains: req.params.orderitem,
      };
    }
    if (req.params.ticketwasswapped) {
      filters.ticketwasswapped = {
        equals: req.params.ticketwasswapped,
      };
    }

    if (Object.keys(filters).length > 0) {
      const singleTicket = await prisma.singletickets.findMany({
        where: filters,
      });
      res.status(200).json(singleTicket);

      return;
    }

    const singleTickets = await prisma.singletickets.findMany();
    res.status(200).json(singleTickets);

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
 * /2/single-ticket/{id}:
 *   get:
 *     summary: get a single ticket
 *     tags:
 *     - New Single Ticket
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Single Ticket updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleTicket'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
singleTicketController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const singleTicketExists = await prisma.singletickets.findUnique({
      where: {
        singleticketid: Number(id),
      },
    });
    if (!singleTicketExists) {
      res.status(404).json({error: 'Single Ticket not found'});

      return;
    }
    const singleTicket = await prisma.singletickets.findUnique({
      where: {
        singleticketid: Number(id),
      },
    });
    res.status(200).json(singleTicket);

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
 * /2/single-ticket/{id}:
 *   put:
 *     summary: update a Single Ticket
 *     tags:
 *     - New Single Ticket
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated single Ticket information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SingleTicket'
 *     responses:
 *       204:
 *         description: Single Ticket updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
singleTicketController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const singleTicket = prisma.singletickets.update({
      where: {
        singleticketid: Number(id),
      },
      data: {
        orderitemid_fk: req.body.orderitem,
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
 * /2/single-ticket/{id}:
 *   delete:
 *     summary: delete a Single Ticket
 *     tags:
 *     - New Single Ticket
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: single ticket updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Single Ticket not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
singleTicketController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const singleTicketExists = await prisma.singletickets.findUnique({
      where: {
        singleticketid: Number(id),
      },
    });
    if (!singleTicketExists) {
      res.status(404).json({error: 'Single Ticket not found'});

      return;
    }
    const singleTicket = prisma.singletickets.delete({
      where: {
        singleticketid: Number(id),
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
