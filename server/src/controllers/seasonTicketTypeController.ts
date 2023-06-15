import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const seasonTicketTypeController = Router();

/**
 * @swagger
 * /2/season-ticket-type:
 *   post:
 *     summary: Create a season ticket type
 *     tags:
 *     - New Season Ticket Type
 *     requestBody:
 *       description: Updated season ticket type information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SeasonTticketType'
 *     responses:
 *       201:
 *         description: Season Ticket Type updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeasonTticketType'
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
seasonTicketTypeController.post('/', async (req: Request, res: Response) => {
  try {
    const seasonTicketType = prisma.seasontickettype.create({
      data: {
        description: req.body.description,
        price: req.body.price,
      },
    });
    res.status(201).json(seasonTicketType);

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

seasonTicketTypeController.use(checkJwt);
seasonTicketTypeController.use(checkScopes);

/**
 * @swagger
 * /2/season-ticket-type:
 *   get:
 *     summary: get all Season Ticket Types
 *     tags:
 *     - New Season Ticket Type
 *     responses:
 *       200:
 *         description: Season Ticket Type updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/SeasonTticketType'
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
seasonTicketTypeController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.description) {
      filters.description = {
        contains: req.params.description,
      };
    }

    if (Object.keys(filters).length > 0) {
      const seasonTicketType = await prisma.seasontickettype.findMany({
        where: filters,
      });
      res.status(200).json(seasonTicketType);

      return;
    }

    const seasonTicketTypes = await prisma.seasontickettype.findMany();
    res.status(200).json(seasonTicketTypes);

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
 * /2/season-ticket-type/{id}:
 *   get:
 *     summary: get a season ticket type
 *     tags:
 *     - New Season Ticket Type
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: season ticket type updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeasonTticketType'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
seasonTicketTypeController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const seasonTicketTypeExists = await prisma.seasontickettype.findUnique({
      where: {
        seasontickettypeid: Number(id),
      },
    });
    if (!seasonTicketTypeExists) {
      res.status(404).json({error: 'season ticket type not found'});

      return;
    }
    const user = await prisma.seasontickettype.findUnique({
      where: {
        seasontickettypeid: Number(id),
      },
    });
    res.status(200).json(user);

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
 * /2/season-ticket-type/{id}:
 *   put:
 *     summary: update a Season Ticket Type
 *     tags:
 *     - New Season Ticket Type
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated season ticket type information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SeasonTticketType'
 *     responses:
 *       204:
 *         description: season ticket type updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
seasonTicketTypeController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const seasonTicketType = prisma.seasontickettype.update({
      where: {
        seasontickettypeid: Number(id),
      },
      data: {
        description: req.body.description,
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
 * /2/season-ticket-type/{id}:
 *   delete:
 *     summary: delete a season ticket type
 *     tags:
 *     - New Season Ticket Type
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: season ticket type updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: season ticket type not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
seasonTicketTypeController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const seasonTicketTypeExists = await prisma.seasontickettype.findUnique({
      where: {
        seasontickettypeid: Number(id),
      },
    });
    if (!seasonTicketTypeExists) {
      res.status(404).json({error: 'user not found'});

      return;
    }
    const seasonTicketType = prisma.seasontickettype.delete({
      where: {
        seasontickettypeid: Number(id),
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
