import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const eventController = Router();

/**
 * @swagger
 * /2/event:
 *   post:
 *     summary: Create an event
 *     tags:
 *     - New Event
 *     requestBody:
 *       description: Updated event information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Event'
 *     responses:
 *       201:
 *         description: event updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
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
eventController.post('/', async (req: Request, res: Response) => {
  try {
    const event = prisma.events.create({
      data: {
        seasonid_fk: req.body.season,
        eventname: req.body.eventname,
        eventdescription: req.body.eventdescription,
        active: req.body.active,
        seasonticketeligible: req.body.seasonticketeligible,
        imageurl: req.body.imageurl,
      },
    });
    res.status(201).json(event);

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

eventController.use(checkJwt);
eventController.use(checkScopes);

/**
 * @swagger
 * /2/event:
 *   get:
 *     summary: get all events
 *     tags:
 *     - New Event
 *     responses:
 *       200:
 *         description: event updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Event'
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
eventController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.eventname) {
      filters.eventname = {
        contains: req.params.eventname,
      };
    }
    if (req.params.eventdescription) {
      filters.eventdescription = {
        contains: req.params.eventdescription,
      };
    }
    if (req.params.season) {
      filters.seasonid_fk = {
        equals: req.params.season,
      };
    }
    if (req.params.active) {
      filters.active = {
        equals: req.params.active,
      };
    }
    if (req.params.seasonticketeligible) {
      filters.seasonticketeligible = {
        equals: req.params.seasonticketeligible,
      };
    }

    if (Object.keys(filters).length > 0) {
      const events = await prisma.events.findMany({
        where: filters,
      });
      res.status(200).json(events);

      return;
    }

    const events = await prisma.events.findMany();
    res.status(200).json(events);

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
 * /2/event/{id}:
 *   get:
 *     summary: get an event
 *     tags:
 *     - New Event
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const eventExists = await prisma.events.findUnique({
      where: {
        eventid: Number(id),
      },
    });
    if (!eventExists) {
      res.status(404).json({error: 'event not found'});

      return;
    }
    const event = await prisma.events.findUnique({
      where: {
        eventid: Number(id),
      },
    });
    res.status(200).json(event);

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
 * /2/event/{id}:
 *   put:
 *     summary: update an event
 *     tags:
 *     - New Event
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated event information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Event'
 *     responses:
 *       204:
 *         description: event updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const event = prisma.events.update({
      where: {
        eventid: Number(id),
      },
      data: {
        seasonid_fk: req.body.season,
        eventname: req.body.eventname,
        eventdescription: req.body.eventdescription,
        active: req.body.active,
        seasonticketeligible: req.body.seasonticketeligible,
        imageurl: req.body.imageurl,
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
 * /2/event/{id}:
 *   delete:
 *     summary: delete an event
 *     tags:
 *     - New Event
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: event updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: event not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const eventExists = await prisma.events.findUnique({
      where: {
        eventid: Number(id),
      },
    });
    if (!eventExists) {
      res.status(404).json({error: 'event not found'});

      return;
    }
    const event = prisma.events.delete({
      where: {
        eventid: Number(id),
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
