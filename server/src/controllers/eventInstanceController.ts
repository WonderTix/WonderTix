import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';
import {eventInstanceRequest, instanceTicketType, ticketRestriction} from '../interfaces/Event';
import {parseDateToInt} from '../api/db';

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
    const updatedShowing = validateShowing( eventInstanceToUpdate, requestInstance);
    const {restrictionsToAdd, restrictionsToRemove, restrictionsToUpdate} = validateTicketRestrictions(
        eventInstanceToUpdate.ticketrestrictions,
        requestInstance.instanceTicketTypes,
        requestInstance.totalseats);

    console.log(updatedShowing);
    const updatedEventInstance= await prisma.eventinstances.update({
      where: {
        eventinstanceid: Number(id),
      },
      data: {
        ...updatedShowing,
      },
    });

    // for (const restriction of restrictionsToRemove) {
    //   // await prisma.$transaction(async (client) => {
    //   //   await client.eventtickets.deleteMany({
    //   //     where: {
    //   //       tickettypeid_fk: Number(restriction.tickettypeid_fk),
    //   //       eventinstanceid_fk: Number(id),
    //   //     },
    //   //   });

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

const validateTicketRestrictions =
  (oldRestrictions:ticketRestriction[],
      newRestrictions:instanceTicketType[],
      totalseats:number) => {
    if (newRestrictions.
        filter((type) => type.typeQuantity > totalseats).length) {
      throw new Error(`Individual Ticket Type quantity can not exceed Total Ticket quantity`);
    }
    const restrictionsToUpdate:ticketRestriction[]= [];
    const restrictionsToRemove:ticketRestriction[]= [];

    oldRestrictions.forEach((restriction:any) => {
      const type = newRestrictions
          .find((type) => type.typeID === restriction.tickettypeid_fk);
      if (!type) {
        restrictionsToRemove.push(restriction);
        return;
      } else if (restriction.ticketssold && restriction.ticketssold > type.typeQuantity) {
        throw new Error(`Can not reduce individual ticket price quantity below quantity sold to date`);
      } else if (restriction.ticketlimit !== type.typeQuantity) {
        restrictionsToUpdate.push({
          ...restriction,
          ticketlimit: Number(type.typeQuantity),
        });
      }
      newRestrictions.splice(newRestrictions.indexOf(type), 1);
    });

    return {
      restrictionsToUpdate,
      restrictionsToRemove,
      restrictionsToAdd: newRestrictions,
    };
  };
const validateTicketQuantity = (totalseats:number, ticketsSold:number) => {
  if (totalseats < ticketsSold) {
    throw new Error(`Can not reduce total ticket quantity 
        below quantity of tickets sold to date 
        ${ticketsSold}`);
  }
  return {
    totalseats,
    availableseats: totalseats-ticketsSold,
  };
};

const validateDateAndTime = (date:string, time:string) => {
  const toReturn = new Date(`${date} ${time}`);
  if (isNaN(toReturn.getTime())) {
    throw new Error(`Invalid Event Date and time`);
  }
  return {
    eventdate: parseDateToInt(toReturn),
    eventtime: toReturn,
  };
};

const validateShowing = (oldEvent:any, newEvent:eventInstanceRequest) => {
  return {
    ispreview: newEvent.ispreview,
    purchaseuri: newEvent.purchaseuri,
    salestatus: newEvent.salestatus,
    ...validateTicketQuantity(
        newEvent.totalseats,
        oldEvent.eventtickets.length),
    ...validateDateAndTime(newEvent.eventdate, newEvent.eventtime),
  };
};


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
