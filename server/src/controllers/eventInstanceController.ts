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
import {parseIntToDate} from '../api/db';

const prisma = extendPrismaClient();

export const eventInstanceController = Router();

const getDate = (time: string, date: number) => {
  const [hour, min] = time.split('T')[1].split(':');
  const newDate = parseIntToDate(date);
  newDate.setHours(+hour, +min);
  return newDate.toJSON();
};

/**
 * @swagger
 * /2/event-instance/tickets:
 *    get:
 *     summary: get list of instances with available seats
 *     tags:
 *     - New event instance
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       byId:
 *                         type: object
 *                         properties:
 *                           ticketid:
 *                             type: object
 *                             properties:
 *                               event_instance_id: {type: integer}
 *                               eventid: {type: integer}
 *                               totalseats: {type: integer}
 *                               availableseats: {type: integer}
 *                               admission_type: {type: string}
 *                               ticket_price: {type: integer}
 *                               concession_price: {type: integer}
 *                               date: {type: string}
 *                       allIds: {type: array, items: {type: integer}}
 *       400:
 *        description: bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *        description: Internal Server Error. An error occurred while processing the request.
 */
eventInstanceController.get('/tickets', async (req: Request, res: Response) => {
  try {
    const tickets = await prisma.eventinstances.findMany({
      where: {
        salestatus: true,
        availableseats: {gt: 0},
        events: {
          active: true,
        },
      },
      include: {
        ticketrestrictions: {
          include: {
            tickettype: true,
          },
        },
      },
    });
    const allIds:number[] = [];
    let byId = {};
    tickets.forEach((ticket) => {
      const defaultRestriction = ticket.ticketrestrictions.find((res) => res.tickettypeid_fk === ticket.defaulttickettype);
      allIds.push(ticket.eventinstanceid);
      byId = {...byId, [ticket.eventinstanceid]: {
        event_instance_id: ticket.eventinstanceid,
        eventid: String(ticket.eventid_fk),
        date: getDate(ticket.eventtime.toISOString(), ticket.eventdate),
        totalseats: ticket.totalseats,
        availableseats: ticket.availableseats,
        admission_type: defaultRestriction?.tickettype.description,
        ticket_price: defaultRestriction?.price,
        concession_price: defaultRestriction?.concessionprice,
      }};
    });
    res.send({data: {allIds, byId}});
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
 * /2/event-instance/list/active:
 *   get:
 *     summary: get all event instance with sales status true
 *     tags:
 *     - New event instance
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event instance fetch successful.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventInstanceController.get(
    '/list/active',
    async (req: Request, res: Response) => {
      try {
        const instances = await prisma.eventinstances.findMany({
          where: {
            salestatus: true,
          },
          select: {
            eventinstanceid: true,
            totalseats: true,
            availableseats: true,
            eventdate: true,
            eventtime: true,
            events: {
              select: {
                eventid: true,
                eventname: true,
                eventdescription: true,
                imageurl: true,
              },
            },
          },
        });

        const toReturn = instances.map((instance) => {
          const {events, ...everythingElse} = instance;
          return {
            ...events,
            ...everythingElse,
          };
        },
        )
        ;
        return res.json(toReturn);
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
    },
);

/**
 * @swagger
 * /2/event-instance/list/allevents:
 *   get:
 *     summary: get all event instances
 *     tags:
 *     - New event instance
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event instance fetch successful.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventInstanceController.get(
    '/list/allevents',
    async (req: Request, res: Response) => {
      try {
        const instances = await prisma.eventinstances.findMany({
          where: {},
          select: {
            eventinstanceid: true,
            totalseats: true,
            availableseats: true,
            eventdate: true,
            eventtime: true,
            events: {
              select: {
                eventid: true,
                eventname: true,
                eventdescription: true,
                imageurl: true,
                active: true,
              },
            },
          },
        });

        const toReturn = instances.map((instance) => {
          const {events, ...everythingElse} = instance;
          return {
            ...events,
            ...everythingElse,
          };
        },
        );

        return res.json(toReturn);
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
    },
);

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
      return res
          .status(400)
          .send({error: `Event instance ${id} does not exist`});
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
eventInstanceController.get(
    '/event/:id',
    async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const eventInstances = await prisma.eventinstances.findMany({
          where: {
            eventid_fk: Number(id),
          },
          include: {
            ticketrestrictions: {
              include: {
                tickettype: true,
              },
            },
          },
        });
        return res.send(eventInstances.map((instance) => ({
          ...instance,
          ticketrestrictions: instance.ticketrestrictions.map((restriction) => ({
            tickettypeid_fk: restriction.tickettypeid_fk,
            seasontickettypepricedefaultid_fk: restriction.seasontickettypepricedefaultid_fk ?? -1,
            price: restriction.price,
            concessionprice: restriction.concessionprice,
            ticketlimit: restriction.ticketlimit,
            description: restriction.tickettype.description,
          })),
        })));
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
    },
);

/**
 * @swagger
 * /2/event-instance:
 *   get:
 *     summary: get all event instances
 *     tags:
 *     - New event instance
 *     responses:
 *       200:
 *         description: event instance fetch successful.
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
    const event = await prisma.events.findUnique({
      where: {eventid: req.body.eventid_fk},
    });

    if (!event) {
      return res
          .status(422)
          .json({error: `Event ${req.body.eventid_fk} does not exist`});
    }

    const eventInstance = await prisma.eventinstances.create({
      data: {
        eventid_fk: eventToCreate.eventid_fk,
        ...validateDateAndTime(
            eventToCreate.eventdate,
            eventToCreate.eventtime,
        ),
        salestatus: eventToCreate.salestatus,
        totalseats: +eventToCreate.totalseats,
        availableseats: +eventToCreate.totalseats,
        purchaseuri: eventToCreate.purchaseuri,
        ispreview: eventToCreate.ispreview,
        defaulttickettype: eventToCreate.defaulttickettype,
      },
      include: {
        events: {
          include: {
            seasons: {
              include: {
                seasontickettypepricedefaults: true,
              },
            },
          },
        },
      },
    });

    const seasonTicketTypePriceDefaults = new Map(eventInstance.events.seasons?.seasontickettypepricedefaults.map((def) => [def.tickettypeid_fk, def.id]));
    await prisma.$transaction(eventToCreate.instanceTicketTypes.map((type) => {
      const tickets = Math.min(eventInstance.totalseats ?? 0, type.ticketlimit);
      return prisma.ticketrestrictions.create({
        data: {
          eventinstanceid_fk: eventInstance.eventinstanceid,
          tickettypeid_fk: +type.tickettypeid_fk,
          ticketlimit: tickets,
          price: type.tickettypeid_fk === 0? 0: +type.price,
          concessionprice: +type.concessionprice,
          seasontickettypepricedefaultid_fk: seasonTicketTypePriceDefaults.get(+type.tickettypeid_fk),
          eventtickets: {
            create: Array(tickets).fill({
              eventinstanceid_fk: eventInstance.eventinstanceid,
            }),
          },
        },
      });
    }));

    return res.send(await prisma.eventinstances.findUnique({
      where: {
        eventinstanceid: eventInstance.eventinstanceid,
      },
      include: {
        ticketrestrictions: true,
      },
    }));
  } catch (error) {
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
eventInstanceController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const requestEventInstance: eventInstanceRequest = req.body;
    const eventInstanceToUpdate = await prisma.eventinstances.findUnique({
      where: {
        eventinstanceid: +id,
      },
      include: {
        ticketrestrictions: {
          include: {
            eventtickets: true,
          },
        },
        events: {
          include: {
            seasons: {
              include: {
                seasontickettypepricedefaults: true,
              },
            },
          },
        },
      },
    });

    if (!eventInstanceToUpdate) {
      return res.status(400).send(`Showing ${id} does not exist`);
    }

    const updatedEventInstance= validateShowingOnUpdate(eventInstanceToUpdate, requestEventInstance);
    const queryBatch =
        validateTicketRestrictionsOnUpdate(
            prisma,
            {...eventInstanceToUpdate, totalseats: updatedEventInstance.totalseats},
            new Map(requestEventInstance.instanceTicketTypes.map((type) => [type.tickettypeid_fk, type])),
        );

    await prisma.$transaction([
      prisma.eventinstances.update({
        where: {
          eventinstanceid: +id,
        },
        data: {
          ...updatedEventInstance,
        },
      }),
      ...queryBatch,
    ]);
    return res.status(204).send('Showing successfully updated');
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
    const eventInstanceExists = await prisma.eventinstances.softDelete(
        Number(id),
    );

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
