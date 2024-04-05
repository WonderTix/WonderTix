import {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {contacts, state, Prisma} from '@prisma/client';
import {eventInstanceRequest} from '../interfaces/Event';
import {
  getDate,
  InvalidInputError,
  updateShowing,
  validateDateAndTime,
} from './eventInstanceController.service';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();

export const eventInstanceController = Router();

/**
 * @swagger
 * /2/event-instance/tickets:
 *    get:
 *     summary: get list of instances
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
 *                               date: {type: string}
 *                               detail: {type: string}
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
eventInstanceController.get('/tickets', async (_, res: Response) => {
  try {
    const tickets = await prisma.eventinstances.findMany({
      where: {
        salestatus: true,
        ticketrestrictions: {
          some: {
            deletedat: null,
          },
        },
        event: {
          active: true,
        },
      },
      include: {
        ticketrestrictions: {
          where: {
            deletedat: null,
          },
          include: {
            ticketitems: {
              where: {
                orderticketitem: {
                  refund: null,
                },
              },
            },
          },
        },
      },
    });
    const allIds: number[] = [];
    let byId = {};
    tickets
        .forEach((ticket) => {
          allIds.push(ticket.eventinstanceid);
          byId = {...byId, [ticket.eventinstanceid]: {
            event_instance_id: ticket.eventinstanceid,
            eventid: ticket.eventid_fk,
            date: getDate(ticket.eventtime.toISOString(), ticket.eventdate),
            totalseats: ticket.totalseats,
            availableseats: ticket.availableseats,
            detail: ticket.detail,
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
    async (_, res: Response) => {
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
            event: {
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
          const {event, ...everythingElse} = instance;
          return {
            ...event,
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
    async (_, res: Response) => {
      try {
        const instances = await prisma.eventinstances.findMany({
          select: {
            eventinstanceid: true,
            totalseats: true,
            availableseats: true,
            eventdate: true,
            eventtime: true,
            event: {
              select: {
                eventid: true,
                eventname: true,
                eventdescription: true,
                imageurl: true,
                active: true,
              },
            },
          },
          where: {
            deletedat: null,
            event: {
              deletedat: null,
            },
          },
          orderBy: {
            eventinstanceid: 'asc',
          },
        });

        const toReturn = instances.map((instance) => {
          const {event, ...everythingElse} = instance;
          return {
            ...event,
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
 *     summary: get all event instances related to an event
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
              where: {
                deletedat: null,
              },
              include: {
                tickettype: true,
                ticketitems: {
                  where: {
                    orderticketitem: {
                      refund: null,
                    },
                  },
                },
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
            ticketssold: restriction.ticketitems.length,
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
eventInstanceController.get('/', async (_, res: Response) => {
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
 * /2/event-instance/doorlist/{id}:
 *   get:
 *     summary: Get doorlist
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     tags:
 *       - New event instance
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventName: {type: string}
 *                 eventTime: {type: string}
 *                 eventDate: {type: string}
 *                 doorlist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: {type: string}
 *                       firstName: {type: string}
 *                       lastName: {type: string}
 *                       phone: {type: string}
 *                       email: {type: string}
 *                       vip: {type: boolean}
 *                       donorBadge: {type: string}
 *                       accommodations: {type: string}
 *                       address: {type: string}
 *                       num_tickets:
 *                          type: object
 *                          properties:
 *                             ticketTypeCount: {type: integer}
 *                       arrived: {type: boolean}
 *       401:
 *         description: Unauthorized
 */
eventInstanceController.get('/doorlist/:id',
    async (req: Request, res: Response) => {
      try {
        const id = req.params.id;

        if (isNaN(Number(id))) {
          return res.status(400).send({error: `Invalid Showing Id`});
        }

        const eventInstance = await prisma.eventinstances.findUnique({
          where: {
            eventinstanceid: +id,
          },
          include: {
            event: true,
            ticketrestrictions: {
              where: {
                deletedat: null,
              },
              include: {
                tickettype: true,
                ticketitems: {
                  where: {
                    orderticketitem: {
                      refund: null,
                      order: {
                        order_status: state.completed,
                      },
                    },
                  },
                  include: {
                    orderticketitem: {
                      include: {
                        order: {
                          include: {
                            contacts: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });

        if (!eventInstance) {
          return res.status(400).send({error: `Showing ${id} does not exist`});
        }

        const doorlist = new Map();
        const forEachTicket = (description: string, redeemed: Date | null, contact?: contacts | null) => {
          if (!contact) return;
          let row = doorlist.get(contact.contactid);
          if (!row) {
            row = {
              firstName: contact.firstname,
              lastName: contact.lastname,
              email: contact.email,
              phone: contact.phone,
              vip: contact.vip,
              donorBadge: contact.donorbadge,
              accommodations: contact.seatingaccom,
              address: contact.address,
              arrived: true,
              num_tickets: {},
            };
            doorlist.set(contact.contactid, row);
          }
          row.arrived = row.arrived && (redeemed !== null);

          row.num_tickets[description]=(row.num_tickets[description] ?? 0)+1;
        };

        eventInstance.ticketrestrictions.forEach((res) => {
          res.ticketitems.forEach((ticket) =>
            forEachTicket(res.tickettype.description, ticket.redeemed, ticket.orderticketitem?.order.contacts),
          );
        });

        return res.json({
          eventName: eventInstance.event.eventname,
          eventDate: eventInstance.eventdate,
          eventTime: eventInstance.eventtime,
          doorlist: Array
              .from(doorlist)
              .map(([key, value]) => (
                {...value,
                  num_tickets: Object.keys(value.num_tickets).map((key) => `${value.num_tickets[key]} x ${key}`).join(','),
                  id: `${key}-${eventInstance.eventinstanceid}`,
                }),
              ),
        });
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
        detail: eventToCreate.detail,
        ispreview: Boolean(eventToCreate.ispreview),
      },
      include: {
        event: {
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

    const seasonTicketTypePriceDefaults = new Map(eventInstance.event.seasons?.seasontickettypepricedefaults.map((def) => [def.tickettypeid_fk, def.id]));
    await prisma.$transaction(eventToCreate.instanceTicketTypes.map((type) => {
      return prisma.ticketrestrictions.create({
        data: {
          eventinstanceid_fk: eventInstance.eventinstanceid,
          tickettypeid_fk: +type.tickettypeid_fk,
          ticketlimit: Math.min(eventInstance.totalseats, type.ticketlimit),
          price: type.tickettypeid_fk === 0? 0: +type.price,
          concessionprice: +type.concessionprice,
          seasontickettypepricedefaultid_fk: seasonTicketTypePriceDefaults.get(+type.tickettypeid_fk),
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
          where: {
            deletedat: null,
          },
          include: {
            ticketitems: {
              include: {
                orderticketitem: {
                  include: {
                    refund: true,
                  },
                },
              },
            },
          },
        },
        event: {
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

    await updateShowing(
        prisma,
        {
          ...eventInstanceToUpdate,
          ticketrestrictions: eventInstanceToUpdate
              .ticketrestrictions
              .map((res) => ({...res, availabletickets: res.ticketlimit - res.ticketitems.filter((ticket) => !ticket.orderticketitem?.refund).length}))},
        requestEventInstance,
    );
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
      return res.status(404).send({error: `Event instance ${id} not found`});
    }

    return res.status(204).send('Event Instance Deleted');
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
