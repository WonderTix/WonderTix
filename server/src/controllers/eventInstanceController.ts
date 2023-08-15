import {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma, PrismaClient} from '@prisma/client';
import {eventInstanceRequest} from '../interfaces/Event';

import {
  validateDateAndTime,
  validateShowingUpdate,
  validateTicketRestrictionsOnUpdate,
} from './eventInstanceController.service';

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
 *             $ref: '#/components/requestBodies/EventInstance'
 *     responses:
 *       201:
 *         description: event instance updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventInstance'
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
    const eventToCreate: eventInstanceRequest = req.body;

    if (eventToCreate.instanceTicketTypes.find((type) => type.typeQuantity>eventToCreate.totalseats)) {
      throw new Error(`No individual ticket type quantity cane exceed total ticket quantity`);
    }
    const eventInstance = await prisma.eventinstances.create({
      data: {
        eventid_fk: eventToCreate.eventid_fk,
        ...validateDateAndTime(eventToCreate.eventdate, eventToCreate.eventtime),
        salestatus: eventToCreate.salestatus,
        totalseats: eventToCreate.totalseats,
        availableseats: eventToCreate.totalseats,
        purchaseuri: eventToCreate.purchaseuri,
        ispreview: eventToCreate.ispreview,
        defaulttickettype: eventToCreate.defaulttickettype,
        eventtickets: {
          create: [...eventToCreate.instanceTicketTypes.map((type) =>
            Array(type.typeQuantity).fill({
              tickettypeid_fk: Number(type.typeID),
              purchased: false,
              redeemed: false,
              donated: false,
            })).flat(),
          ...Array(eventToCreate.totalseats).fill({
            tickettypeid_fk: 1,
            purchased: false,
            redeemed: false,
            donated: false,
          }),
          ],
        },
        ticketrestrictions: {
          create: eventToCreate.instanceTicketTypes.map((type) => {
            return {
              tickettypeid_fk: Number(type.typeID),
              ticketlimit: Number(type.typeQuantity),
              ticketssold: 0,
            };
          }),
        },
      },
      include: {
        eventtickets: true,
        ticketrestrictions: true,
      },
    });

    res.status(201).json(eventInstance);

    return;
  } catch (error) {
    console.log(error);
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
 *               $ref: '#/components/schemas/EventInstance'
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
 *               $ref: '#/components/schemas/EventInstance'
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
 *             $ref: '#/components/requestBodies/EventInstance'
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
    const requestInstance: eventInstanceRequest = req.body;
    const eventInstanceToUpdate= await prisma.eventinstances.findUnique({
      where: {
        eventinstanceid: Number(id),
      },
      include: {
        eventtickets: true,
        ticketrestrictions: true,
      },
    });

    if (!eventInstanceToUpdate) {
      throw new Error(`Showing ${id} does not exist`);
    }

    console.log(eventInstanceToUpdate.eventtickets.length);
    const updatedShowing = validateShowingUpdate( eventInstanceToUpdate, requestInstance);
    // eslint-disable-next-line max-len
    const {restrictionsToAdd, restrictionsToRemove, restrictionsToUpdate} = validateTicketRestrictionsOnUpdate(
        eventInstanceToUpdate.ticketrestrictions,
        requestInstance.instanceTicketTypes,
        requestInstance.totalseats);

    console.log(updatedShowing);
    //  update showing
    const updatedEventInstance= await prisma.eventinstances.update({
      where: {
        eventinstanceid: Number(id),
      },
      data: {
        ...updatedShowing,
      },
    });
    //  update ticket restrictions
    await prisma.$transaction(
        [...restrictionsToRemove.map((restriction) =>
          prisma.ticketrestrictions.delete({
            where: {
              ticketrestrictionsid: restriction.ticketrestrictionsid,
            },
          })), ...restrictionsToUpdate.map((restriction) =>
          prisma.ticketrestrictions.update({
            where: {
              ticketrestrictionsid: restriction.ticketrestrictionsid,
            },
            data: {
              ticketlimit: restriction.ticketlimit,
            },
          })), ...restrictionsToAdd.map((restriction) =>
          prisma.ticketrestrictions.create({
            data: {
              eventinstanceid_fk: Number(requestInstance.eventinstanceid),
              tickettypeid_fk: Number(restriction.typeID),
              ticketlimit: Number(restriction.typeQuantity),
              ticketssold: 0,
            },
          }),
        )],
    );
    //  update eventtickets
    res.status(204).json();
    return;
  } catch (error) {
    console.log(error);
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
      include: {
        eventtickets: true,
      },
    });

    if (!eventInstanceExists) {
      res.status(404).json({error: 'event instance not found'});
      return;
    }
    if (eventInstanceExists.eventtickets.find((ticket:any) => ticket.purchased)) {
      res.status(404).json({error: `Can not delete a showing for which tickets have already been sold`});
      return;
    }

    const eventInstance = await prisma.eventinstances.update({
      where: {
        eventinstanceid: Number(id),
      },
      data: {
        salestatus: false,
      },
    });
    res.status(204).json();
    return;
  } catch (error) {
    console.log(error);
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
