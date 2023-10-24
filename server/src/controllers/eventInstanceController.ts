import {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {eventInstanceRequest} from '../interfaces/Event';
import {
  InvalidInputError,
  validateDateAndTime,
  validateShowingOnUpdate,
  validateTicketRestrictionsOnUpdate,
} from './eventInstanceController.service';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();

export const eventInstanceController = Router();
eventInstanceController.use(checkJwt);
eventInstanceController.use(checkScopes);

/**
 * @swagger
 * /2/event-instance:
 *   post:
 *     summary: Create an event instance, associated event tickets, and ticket restrictions
 *     tags:
 *     - New event instance
 *     requestBody:
 *       description: New Event Instance information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/EventInstance'
 *     responses:
 *       201:
 *         description: event instance created successfully.
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

    if (
      eventToCreate.instanceTicketTypes.find(
          (type) => type.typeQuantity > eventToCreate.totalseats,
      )
    ) {
      return res.status(422).json({error:
          `No individual ticket type quantity can exceed total ticket quantity`},
      );
    }
    const eventInstance = await prisma.eventinstances.create({
      data: {
        eventid_fk: eventToCreate.eventid_fk,
        ...validateDateAndTime(
            eventToCreate.eventdate,
            eventToCreate.eventtime,
        ),
        salestatus: eventToCreate.salestatus,
        totalseats: eventToCreate.totalseats,
        availableseats: eventToCreate.totalseats,
        purchaseuri: eventToCreate.purchaseuri,
        ispreview: eventToCreate.ispreview,
        defaulttickettype: eventToCreate.defaulttickettype,
        eventtickets: {
          create: [
            ...eventToCreate.instanceTicketTypes
                .map((type) =>
                  Array(type.typeQuantity).fill({
                    tickettypeid_fk: Number(type.typeID),
                    redeemed: false,
                    donated: false,
                  }),
                )
                .flat(),
            ...Array(eventToCreate.totalseats).fill({
              tickettypeid_fk: 1,
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

    res.status(201).send(eventInstance);

    return;
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).send({error: error.message});

      return;
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).send({error: error.message});

      return;
    }
    if (error instanceof InvalidInputError) {
      res.status(error.code).send({error: error.message});
      return;
    }
    res.status(500).send({error: 'Internal Server Error'});
  }
});


/**
 * @swagger
 * /2/event-instance:
 *   get:
 *     summary: get all event instances
 *     tags:
 *     - New event instance
 *     responses:
 *       200:
 *         description: event instance fetch succesful.
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
    const eventinstances = await prisma.eventinstances.findMany({});
    return res.status(200).json(eventinstances);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).send({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).send({error: error.message});
      return;
    }
    res.status(500).send({error: 'Internal Server Error'});
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
 *         description: event instance fetch successful.
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
      return res.status(400).send({error: `Event instance ${id} does not exist`});
    }
    res.status(200).send(eventInstanceExists);
    return;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).send({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).send({error: error.message});
      return;
    }
    res.status(500).send({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/event-instance/event/{id}:
 *   get:
 *     summary: get all event instances related to a event
 *     tags:
 *     - New event instance
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event instance fetch successful.
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
eventInstanceController.get('/event/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const eventInstances = await prisma.eventinstances.findMany({
      where: {
        eventid_fk: Number(id),
      },
      include: {
        ticketrestrictions: true,
      },
    });
    const toReturn = eventInstances.map((instance) => ({
      ...instance,
      ticketrestrictions: instance.ticketrestrictions.map((restiction) => ({
        typeID: restiction.tickettypeid_fk,
        typeQuantity: restiction.ticketlimit,
      })),
    }));
    res.status(200).send(toReturn);
    return;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).send({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).send({error: error.message});
      return;
    }
    res.status(500).send({error: 'Internal Server Error'});
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
 *       422:
 *          description: invalid input.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
// Need to determine how eventtickets should be updated with eventinstance update
eventInstanceController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const requestEventInstance: eventInstanceRequest = req.body;
    const eventInstanceToUpdate = await prisma.eventinstances.findUnique({
      where: {
        eventinstanceid: Number(id),
      },
      include: {
        eventtickets: true,
        ticketrestrictions: true,
      },
    });

    if (!eventInstanceToUpdate) {
      return res.status(400).send(`Showing ${id} does not exist`);
    }

    const {updatedEventInstance, GAEventTicketsUpdate} =
      validateShowingOnUpdate(eventInstanceToUpdate, requestEventInstance);

    const {restrictionsToAdd, restrictionsToRemove, restrictionsToUpdate} =
      validateTicketRestrictionsOnUpdate(
          eventInstanceToUpdate.ticketrestrictions,
          requestEventInstance.instanceTicketTypes,
          updatedEventInstance.availableseats,
          eventInstanceToUpdate.eventtickets.filter(
              (ticket) => !ticket.singleticket_fk,
          ),
      );
    //  update showing
    await prisma.eventinstances.update({
      where: {
        eventinstanceid: Number(id),
      },
      data: {
        ...updatedEventInstance,
      },
    });
    //  update ticket restrictions and eventtickets
    await prisma.$transaction([
      GAEventTicketsUpdate.difference > 0 ?
        prisma.eventtickets.createMany({
          data: Array(GAEventTicketsUpdate.difference).fill({
            eventinstanceid_fk: eventInstanceToUpdate.eventinstanceid,
            tickettypeid_fk: 1,
          }),
        }) :
        prisma.eventtickets.deleteMany({
          where: {
            eventticketid: {in: GAEventTicketsUpdate.ticketsToRemove ?? []},
          },
        }),
      ...restrictionsToRemove
          .map((restriction) => [
            prisma.ticketrestrictions.delete({
              where: {
                ticketrestrictionsid: Number(restriction.ticketrestrictionsid),
              },
            }),
            prisma.eventtickets.deleteMany({
              where: {
                eventinstanceid_fk: Number(eventInstanceToUpdate.eventinstanceid),
                tickettypeid_fk: restriction.tickettypeid_fk,
              },
            }),
          ])
          .flat(),
      ...restrictionsToUpdate
          .map(([restriction, update]) => [
            prisma.ticketrestrictions.update({
              where: {
                ticketrestrictionsid: restriction.ticketrestrictionsid,
              },
              data: {
                ticketlimit: Number(restriction.ticketlimit),
              },
            }),
          update.difference > 0 ?
            prisma.eventtickets.createMany({
              data: Array(update.difference).fill({
                eventinstanceid_fk: eventInstanceToUpdate.eventinstanceid,
                tickettypeid_fk: restriction.tickettypeid_fk,
              }),
            }) :
            prisma.eventtickets.deleteMany({
              where: {
                eventticketid: {in: update.ticketsToRemove ?? []},
              },
            }),
          ])
          .flat(),
      ...restrictionsToAdd
          .map((restriction) => [
            prisma.ticketrestrictions.create({
              data: {
                eventinstanceid_fk: Number(requestEventInstance.eventinstanceid),
                tickettypeid_fk: Number(restriction.typeID),
                ticketlimit: Number(restriction.typeQuantity),
                ticketssold: 0,
              },
            }),
            prisma.eventtickets.createMany({
              data: Array(restriction.typeQuantity).fill({
                eventinstanceid_fk: eventInstanceToUpdate.eventinstanceid,
                tickettypeid_fk: Number(restriction.typeID),
              }),
            }),
          ])
          .flat(),
    ]);

    res.status(204).send('Showing successfully updated');
    return;
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).send({error: error.message});

      return;
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).send({error: error.message});

      return;
    }
    if (error instanceof InvalidInputError) {
      res.status(error.code).send({error: error.message});
      return;
    }
    res.status(500).send({error: 'Internal Server Error'});
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
 *         description: event instance deleted successfully.
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
    const eventInstanceExists = await prisma.eventinstances.softDelete(Number(id));

    if (!eventInstanceExists) {
      res.status(404).send({error: `Event instance ${id} not found`});
      return;
    }
    res.status(204).send('Event Instance Deleted');
    return;
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).send({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).send({error: error.message});
      return;
    }
    res.status(500).send({error: 'Internal Server Error'});
  }
});
