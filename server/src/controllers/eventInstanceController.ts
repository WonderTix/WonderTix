import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const eventInstanceController = Router();

/**
 * @swagger
 * /2/event-instance:
 *   post:
 *     summary: Create an event instance
 *     tags:
 *     - New event instance
 *     requestBody:
 *       description: Updated event instance information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/event-instance'
 *     responses:
 *       201:
 *         description: event instance updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/event-instance'
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
eventInstanceController.post('/', async (req: Request, res: Response) => {
  try {
    const eventInstance = prisma.eventinstances.create({
      data: {
        eventid_fk: req.body.event_id,
        eventdate: req.body.date,
        eventtime: req.body.time,
        salestatus: req.body.sale_status,
        totalseats: req.body.total_seats,
        availableseats: req.body.available_seats,
        purchaseuri: req.body.purchase_uri,
        ispreview: req.body.is_preview,
        defaulttickettype: req.body.default_ticket_type,
      },
    });
    res.status(201).json(eventInstance);

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

eventInstanceController.use(checkJwt);
eventInstanceController.use(checkScopes);

/**
 * @swagger
 * /2/event-instance:
 *   get:
 *     summary: get all event instances
 *     tags:
 *     - New event instances
 *     responses:
 *       200:
 *         description: event instance updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/event-instance'
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
eventInstanceController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.event) {
      filters.eventid_fk = {
        equals: req.params.event,
      };
    }
    if (req.params.date) {
      filters.eventdate = {
        equals: req.params.date,
      };
    }
    if (req.params.sales_status) {
      filters.salestatus = {
        equals: req.params.sales_status,
      };
    }
    if (req.params.purchase_uri) {
      filters.purchaseuri = {
        contains: req.params.purchase_uri,
      };
    }
    if (req.params.is_preview) {
      filters.ispreview = {
        equals: req.params.is_preview,
      };
    }

    if (Object.keys(filters).length > 0) {
      const eventInstances = await prisma.eventinstances.findMany({
        where: filters,
      });
      res.status(200).json(eventInstances);

      return;
    }

    const eventInstances = await prisma.eventinstances.findMany();
    res.status(200).json(eventInstances);

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
 * /2/event-instance/{id}:
 *   get:
 *     summary: get an event instance
 *     tags:
 *     - New event instance
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event instance updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/event-instance'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventInstanceController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const eventInstanceExists = await prisma.eventinstances.findUnique({
      where: {
        eventinstanceid: Number(id),
      },
    });
    if (!eventInstanceExists) {
      res.status(404).json({error: 'event instance not found'});

      return;
    }
    const eventInstance = await prisma.eventinstances.findUnique({
      where: {
        eventinstanceid: Number(id),
      },
    });
    res.status(200).json(eventInstance);

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
 * /2/event-instance/{id}:
 *   put:
 *     summary: update an event instance
 *     tags:
 *     - New event instance
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated event instance information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/event-instance'
 *     responses:
 *       204:
 *         description: event instance updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventInstanceController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const eventInstance = prisma.eventinstances.update({
      where: {
        eventinstanceid: Number(id),
      },
      data: {
        eventid_fk: req.body.event_id,
        eventdate: req.body.date,
        eventtime: req.body.time,
        salestatus: req.body.sale_status,
        totalseats: req.body.total_seats,
        availableseats: req.body.available_seats,
        purchaseuri: req.body.purchase_uri,
        ispreview: req.body.is_preview,
        defaulttickettype: req.body.default_ticket_type,
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
 * /2/event-instance/{id}:
 *   delete:
 *     summary: delete an event instance
 *     tags:
 *     - New event instance
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: event instance updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: event instance not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventInstanceController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const eventInstanceExists = await prisma.eventinstances.findUnique({
      where: {
        eventinstanceid: Number(id),
      },
    });
    if (!eventInstanceExists) {
      res.status(404).json({error: 'event instance not found'});

      return;
    }
    const eventInstance = prisma.eventinstances.delete({
      where: {
        eventinstanceid: Number(id),
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
