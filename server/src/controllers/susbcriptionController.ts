/* eslint-disable camelcase */
import {Request, Response, Router} from 'express';
import {eventinstances, Prisma} from '@prisma/client';
import {
  getUpdatedSubscription,
  LoadedTicketRestriction,
  SeasonSubscriptionType,
  validateSeasonSubscriptionType,
  validateSubscriptionType,
} from './subscriptionController.service';
import {updateAvailableSeats} from './orderController.service';
import {InvalidInputError, reservedTicketItemsFilter} from './eventInstanceController.service';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {checkJwt, checkScopes} from '../auth';

const prisma = extendPrismaClient();
export const subscriptionController = Router();


export const getFormattedDate = (date: Date): number =>
  date.getFullYear() * (date.getMonth() < 9 ? 10000 : 100000) +
  (date.getMonth() + 1) * 100 +
  date.getDate();

/**
 * @swagger
 * /2/subscription-types/:
 *   get:
 *     summary: get all subscription types
 *     tags:
 *     - Subscription API
 *     responses:
 *       200:
 *         description: array of subscription types
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/SubscriptionTypes'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
subscriptionController.get('/', async (_, res: Response) => {
  try {
    return res.send((await prisma.subscriptiontypes.findMany({
      where: {
        deletedat: null,
      },
    })).map(({
      deletedat,
      ...rest
    }) => ({
      ...rest,
      price: Number(rest.price),
    })));
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
 * /2/subscription-types/season/{seasonid}:
 *   get:
 *     summary: get all season subscription types
 *     tags:
 *     - Subscription API
 *     parameters:
 *     - $ref: '#/components/parameters/seasonid'
 *     responses:
 *       200:
 *         description: array of season subscription types
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/SeasonSubscriptionTypes'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
subscriptionController.get('/season/:id', async (req, res: Response) => {
  try {
    const id = +req.params.id;

    const toSend = await prisma.seasonsubscriptiontypes.findMany({
      where: {
        seasonid_fk: id,
        deletedat: null,
      },
      include: {
        subscriptiontype: true,
        subscriptions: {
          where: {
            refund: null,
          },
        },
      },
    });

    return res
        .json(
            toSend
                .map(
                    ({subscriptiontype,
                      seasonid_fk,
                      deletedat,
                      subscriptions,
                      ...rest}) =>
                      ({
                        ...rest,
                        price: Number(rest.price),
                        name: subscriptiontype.name,
                        subscriptionssold: subscriptions.length,
                      })));
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
 * /2/subscription-types/season/subscriptions/available:
 *   get:
 *     summary: get list of current seasons with available subscriptions
 *     tags:
 *     - Subscription API
 *     responses:
 *       200:
 *         description: seasons successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Season'
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
subscriptionController.get('/season/subscriptions/available', async (_, res: Response) => {
  try {
    const seasons = await prisma.seasons.findMany({
      where: {
        deletedat: null,
        seasonsubscriptiontypes: {
          some: {
            deletedat: null,
          },
        },
        enddate: {gte: getFormattedDate(new Date())},
        events: {
          some: {
            subscriptioneligible: true,
            deletedat: null,
          },
        },
      },
    });
    return res.json(seasons);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({error: error.message});
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({error: error.message});
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/subscription-types/active-subscriptions/{seasonid}:
 *   get:
 *     summary: get season including all events and available subscriptions
 *     tags:
 *     - Subscription API
 *     parameters:
 *     - $ref: '#/components/parameters/seasonid'
 *     responses:
 *       200:
 *         description: season successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Season'
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
 *       404:
 *         description: season not found
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
subscriptionController.get('/active-subscriptions/:seasonid', async (req: Request, res: Response) => {
  try {
    const seasonid = +req.params.seasonid;

    const season = await prisma.seasons.findUnique({
      where: {
        seasonid: seasonid,
        deletedat: null,
      },
      include: {
        seasonsubscriptiontypes: {
          where: {
            deletedat: null,
          },
          include: {
            subscriptiontype: true,
            subscriptions: {
              where: {
                refund: null,
              },
            },
          },
        },
        events: {
          where: {
            deletedat: null,
          },
          include: {
            eventinstances: {
              where: {
                deletedat: null,
              },
              orderBy: {
                eventdate: 'asc',
              },
            },
          },
        },
      },
    });

    if (!season) {
      return res.status(404).json({error: 'Season does not exist'});
    }

    const {deletedat, ...toReturn} = season;
    return res.json({
      ...toReturn,
      events: toReturn.events
          .map(({eventinstances, deletedat, ...rest}) => ({
            ...rest,
            eventinstances,
            startdate: eventinstances[0]?.eventdate,
            enddate: eventinstances[Math.max(eventinstances.length-1, 0)]?.eventdate,
          })),
      seasonsubscriptiontypes: season
          .seasonsubscriptiontypes
          .map(({
            deletedat,
            subscriptions,
            subscriptiontype
            , ...rest
          }) => ({
            ...rest,
            price: Number(subscriptiontype.price),
            description: subscriptiontype.description,
            name: subscriptiontype.name,
            subscriptionssold: subscriptions.length,
          })),
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({error: error.message});
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({error: error.message});
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

// All further routes require appropriate authentication
subscriptionController.use(checkJwt);
subscriptionController.use(checkScopes);

/**
 * @swagger
 * /2/subscription-types/season/{seasonid}:
 *   put:
 *     summary: update season subscription types
 *     tags:
 *     - Subscription API
 *     parameters:
 *     - $ref: '#/components/parameters/seasonid'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: array of season subscription types
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SeasonSubscriptionTypes'
 *     responses:
 *       200:
 *         description: array of updated season subscription types
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/SeasonSubscriptionTypes'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       422:
 *         description: invalid input
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
subscriptionController.put('/season/:seasonid', async (req: Request, res: Response) => {
  try {
    const seasonId = +req.params.seasonid;
    const toUpdate = new Map<number, SeasonSubscriptionType>(req.body?.subscriptionTypes?.map((update: any) =>
      [
        +update.subscriptiontypeid_fk,
        {
          subscriptiontypeid_fk: +update.subscriptiontypeid_fk,
          price: +update.price,
          ticketlimit: +update.ticketlimit,
          subscriptionlimit: +update.subscriptionlimit,
        },
      ],
    ));

    const current = await prisma.seasonsubscriptiontypes.findMany({
      where: {
        seasonid_fk: seasonId,
        deletedat: null,
      },
      include: {
        subscriptions: {
          include: {
            subscriptionticketitems: true,
            refund: true,
          },
        },
      },
    });

    await prisma.$transaction([
      ...current.map((type) => {
        const update = toUpdate.get(type.subscriptiontypeid_fk);
        toUpdate.delete(type.subscriptiontypeid_fk);

        if (!update && !type.subscriptions.length) {
          return prisma.seasonsubscriptiontypes.delete({
            where: {
              seasonid_fk_subscriptiontypeid_fk: {
                seasonid_fk: seasonId,
                subscriptiontypeid_fk: type.subscriptiontypeid_fk,
              },
            },
          });
        } else if (!update && !type.subscriptions.some((sub) => !sub.refund)) {
          return prisma.seasonsubscriptiontypes.update({
            where: {
              seasonid_fk_subscriptiontypeid_fk: {
                seasonid_fk: seasonId,
                subscriptiontypeid_fk: type.subscriptiontypeid_fk,
              },
            },
            data: {
              deletedat: new Date(),
            },
          });
        } else if (!update) {
          throw new InvalidInputError(
              422,
              `Can not delete a subscription type for which subscriptions have already been sold`,
          );
        }


        return prisma.seasonsubscriptiontypes.update({
          where: {
            seasonid_fk_subscriptiontypeid_fk: {
              seasonid_fk: seasonId,
              subscriptiontypeid_fk: type.subscriptiontypeid_fk,
            },
          },
          data: {
            ...validateSeasonSubscriptionType(update, type.subscriptions.length, type.ticketlimit),
          },
        });
      }),
      ...[...toUpdate.values()].map((newType) => {
        const subscription = validateSeasonSubscriptionType(newType);

        return prisma.seasonsubscriptiontypes.upsert({
          where: {
            seasonid_fk_subscriptiontypeid_fk: {
              seasonid_fk: seasonId,
              subscriptiontypeid_fk: newType.subscriptiontypeid_fk,
            },
          },
          update: {
            ...subscription,
            deletedat: null,
          },
          create: {
            seasonid_fk: seasonId,
            subscriptiontypeid_fk: newType.subscriptiontypeid_fk,
            ...subscription,
          },
        });
      })]);

    return res.json((await prisma.seasonsubscriptiontypes.findMany({
      where: {
        seasonid_fk: seasonId,
        deletedat: null,
      },
      include: {
        subscriptiontype: true,
        subscriptions: {
          where: {
            refund: null,
          },
        },
      },
    })).map(({
      subscriptiontype,
      seasonid_fk,
      deletedat,
      subscriptions,
      ...rest}) => ({
      ...rest,
      price: Number(rest.price),
      name: subscriptiontype.name,
      subscriptionssold: subscriptions.length,
    })));
  } catch (error) {
    if (error instanceof InvalidInputError) {
      return res.status(error.code).json({error: error.message});
    }
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
 * /2/subscription-types/:
 *   post:
 *     summary: create subscription type
 *     tags:
 *     - Subscription API
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: subscription type
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SubscriptionType'
 *     responses:
 *       200:
 *         description: updated subscription type
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/SubscriptionType'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       422:
 *         description: invalid input
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
subscriptionController.post('/', async (req: Request, res: Response) => {
  try {
    const subscriptionType = req.body;
    const created = await prisma.subscriptiontypes.create({
      data: {
        ...validateSubscriptionType(subscriptionType),
      },
    });
    const {deletedat, price, ...toReturn} = created;
    return res.json({price: Number(price), ...toReturn});
  } catch (error) {
    if (error instanceof InvalidInputError) {
      return res.status(error.code).json({error: error.message});
    }
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
 * /2/subscription-types/{subscriptiontypeid}:
 *   put:
 *     summary: update subscription type
 *     tags:
 *     - Subscription API
 *     parameters:
 *     - $ref: '#/components/parameters/subscriptiontypeid'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: subscription type
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SubscriptionType'
 *     responses:
 *       200:
 *         description: updated subscription type
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/SubscriptionType'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       422:
 *         description: invalid input
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
subscriptionController.put('/:subscriptiontypeid', async (req: Request, res: Response) => {
  try {
    const subscriptionTypeId = +req.params.subscriptiontypeid;
    const subscriptionType = validateSubscriptionType(req.body);

    const originalType = await prisma.subscriptiontypes.findUnique({
      where: {
        id: subscriptionTypeId,
        deletedat: null,
      },
    });

    if (!originalType) {
      return res.status(400).json({error: `Subscription Type does not exist`});
    }

    const type = await prisma.subscriptiontypes.update({
      where: {
        id: subscriptionTypeId,
      },
      data: {
        ...subscriptionType,
        seasonsubscriptiontypes: {
          updateMany: {
            where: {},
            data: {
              ...(Number(originalType.price) !== subscriptionType.price && {price: subscriptionType.price}),
            },
          },
        },
      },
    });
    const {deletedat, price, ...toReturn} = type;
    return res.json({price: Number(price), ...toReturn});
  } catch (error) {
    if (error instanceof InvalidInputError) {
      return res.status(error.code).json({error: error.message});
    }
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
 * /2/subscription-types/{subscriptiontypeid}:
 *   delete:
 *     summary: delete subscription type
 *     tags:
 *     - Subscription API
 *     parameters:
 *     - $ref: '#/components/parameters/subscriptiontypeid'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: subscription type successfully deleted
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
subscriptionController.delete('/:subscriptiontypeid', async (req: Request, res: Response) => {
  try {
    const subscriptionTypeId= +req.params.subscriptiontypeid;

    const type = await prisma.subscriptiontypes.findUnique({
      where: {
        id: subscriptionTypeId,
      },
      include: {
        seasonsubscriptiontypes: {
          include: {
            subscriptions: true,
          },
        },
      },
    });

    if (!type) {
      return res.status(400).json({error: `Subscription Type does not exist`});
    }

    if (type.seasonsubscriptiontypes.find((season) => season.subscriptions.length)) {
      await prisma.subscriptiontypes.update({
        where: {
          id: subscriptionTypeId,
        },
        data: {
          deletedat: new Date(),
          seasonsubscriptiontypes: {
            updateMany: {
              where: {
                deletedat: null,
              },
              data: {
                deletedat: new Date(),
              },
            },
          },
        },
      });
    } else {
      await prisma.subscriptiontypes.delete({
        where: {
          id: subscriptionTypeId,
        },
      });
    }

    return res.status(204).json('Subscription type deleted');
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
 * /2/subscription-types/subscriptions/search:
 *   get:
 *     summary: search for subscriptions matching supplied query parameters
 *     tags:
 *     - Subscription API
 *     parameters:
 *     - $ref: '#/components/parameters/queryseasonid'
 *     - $ref: '#/components/parameters/customername'
 *     - $ref: '#/components/parameters/email'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: subscriptions successfully fetched
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
subscriptionController.get(
    '/subscriptions/search',
    async (req: Request, res: Response) => {
      try {
        const {seasonid= [], name = [], email} = req.query;
        const seasonIdsFormatted= (Array.isArray(seasonid) ? seasonid: [seasonid]).map((id) => +id);
        const nameFormatted = (Array.isArray(name) ? name: [name]
        ).flatMap((name) =>
          ['firstname', 'lastname'].map((key) => ({
            [key]: {contains: String(name), mode: 'insensitive'},
          })));

        const contactFilter = [
          ...nameFormatted,
          ...(email? [{email: {contains: String(email), mode: 'insensitive'}}]: []),
        ];

        const toReturn = await prisma.subscriptions.findMany({
          where: {
            seasonid_fk: {in: seasonIdsFormatted},
            order: {
              payment_intent: {not: null},
              ...(contactFilter.length && {
                contacts: {
                  OR: contactFilter,
                },
              }),
            },
            refund: null,
          },
          include: {
            seasonsubscriptiontype: {
              include: {
                subscriptiontype: true,
                season: true,
              },
            },
            order: {
              include: {
                contacts: true,
              },
            },
            subscriptionticketitems: true,
          },
        });

        return res.json(
            toReturn.map(({order, seasonsubscriptiontype, subscriptionticketitems, ...sub}) => ({
              ...sub,
              previewonly: seasonsubscriptiontype.subscriptiontype.previewonly,
              firstname: order.contacts?.firstname,
              lastname: order.contacts?.lastname,
              email: order.contacts?.email,
              name: seasonsubscriptiontype.subscriptiontype.name,
              ticketlimit: seasonsubscriptiontype.ticketlimit,
              seasonName: seasonsubscriptiontype.season.name,
              ticketsredeemed: subscriptionticketitems.length,
            })),
        );
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(400).json({error: error.message});
        }
        if (error instanceof Prisma.PrismaClientValidationError) {
          return res.status(400).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
      }
    },
);

/**
 * @swagger
 * /2/subscription-types/subscriptions/redemption/{subscriptionid}:
 *   get:
 *     summary: get subscription and related events in format required for redemption
 *     tags:
 *     - Subscription API
 *     parameters:
 *     - $ref: '#/components/parameters/subscriptionid'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: subscription and events successfully fetched
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
subscriptionController.get(
    '/subscriptions/redemption/:subscriptionid',
    async (req: Request, res: Response) => {
      try {
        const subscriptionId = +req.params.subscriptionid;
        const subscription = await prisma.subscriptions.findUnique({
          where: {
            id: subscriptionId,
            order: {
              payment_intent: {not: null},
            },
            refund: null,
          },
          include: {
            seasonsubscriptiontype: {
              include: {
                subscriptiontype: true,
              },
            },
            subscriptionticketitems: {
              include: {
                ticketitem: {
                  include: {
                    ticketrestriction: {
                      include: {
                        eventinstance: {
                          include: {
                            event: true,
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

        if (!subscription) {
          return res
              .status(400)
              .json({error: `Subscription Id (${subscriptionId}) is invalid`});
        }

        const {
          seasonsubscriptiontype,
          subscriptionticketitems,
          ...rest
        } = subscription;

        const eventInstanceSet = new Set<number>();
        const ticketRestrictionSet = new Set<number>();

        const formattedSubscription = {
          ...rest,
          previewonly: seasonsubscriptiontype.subscriptiontype.previewonly,
          ticketlimit: seasonsubscriptiontype.ticketlimit,
          subscriptionticketitems: subscriptionticketitems.map(
              ({ticketitem, id}) => {
                if (ticketitem) {
                  eventInstanceSet.add(
                      ticketitem.ticketrestriction.eventinstanceid_fk,
                  );
                  ticketRestrictionSet.add(
                      ticketitem.ticketrestriction.ticketrestrictionsid,
                  );
                }
                return {
                  id,
                  donated: ticketitem?.donated,
                  redeemed: ticketitem?.redeemed,
                  ticketrestrictionid: ticketitem?.ticketrestrictionid_fk,
                  eventinstanceid: ticketitem?.ticketrestriction.eventinstanceid_fk,
                  eventid: ticketitem?.ticketrestriction.eventinstance.eventid_fk,
                };
              },
          ),
        };

        const events = await prisma.events.findMany({
          where: {
            seasons: {
              seasonid: subscription.seasonid_fk,
            },
            subscriptioneligible: true,
          },
          include: {
            eventinstances: {
              where: {
                OR: [
                  {
                    ...(formattedSubscription.previewonly && {ispreview: true}),
                    availableseats: {gt: 0},
                    deletedat: null,
                  },
                  {
                    eventinstanceid: {in: Array.from(eventInstanceSet)},
                  },
                ],
              },
              include: {
                ticketrestrictions: {
                  where: {
                    deletedat: null,
                  },
                  include: {
                    tickettype: true,
                    ticketitems: {
                      ...reservedTicketItemsFilter,
                    },
                  },
                },
              },
              orderBy: {
                eventdate: 'asc',
              },
            },
          },
        });

        const formattedEvents = events
            .map(({eventinstances, deletedat, ...event}) => ({
              ...event,
              eventinstances: eventinstances
                  .map(({ticketrestrictions, deletedat, ...instance}) => ({
                    ...instance,
                    ticketrestrictions: ticketrestrictions
                        .map(({ticketitems, deletedat, tickettype, ...res}) => ({
                          ...res,
                          description: tickettype.description,
                          availabletickets: res.ticketlimit - ticketitems.length,
                        }))
                        .filter(
                            (res) => res.availabletickets > 0 || ticketRestrictionSet.has(res.ticketrestrictionsid),
                        ),
                  }))
                  .filter(
                      (instance) => instance.ticketrestrictions.length,
                  ),
            }))
            .filter((event) => event.eventinstances.length);

        return res.json({
          events: formattedEvents,
          subscription: formattedSubscription,
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(400).json({error: error.message});
        }
        if (error instanceof Prisma.PrismaClientValidationError) {
          return res.status(400).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
      }
    },
);


interface SubscriptionTicketItemRequest {
  subscriptionticketitems: {
    eventid: number
    eventinstanceid: number
    ticketrestrictionid: number
  }[];
}

/**
 * @swagger
 * /2/subscription-types/subscriptions/redemption/{subscriptionid}:
 *   put:
 *     summary: redeem tickets for a subscription
 *     tags:
 *     - Subscription API
 *     parameters:
 *     - $ref: '#/components/parameters/subscriptionid'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: subscription redemption successful
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
subscriptionController.put(
    '/subscriptions/redemption/:subscriptionid',
    async (req: Request<{subscriptionid: number}, {}, SubscriptionTicketItemRequest>, res: Response) => {
      try {
        const subscriptionId = +req.params.subscriptionid;
        const subscriptionTicketItemMap =
        req.body.subscriptionticketitems?.reduce<Map<number, number>>(
            (acc, item) =>
              acc.set(
                  +item.ticketrestrictionid,
                  1 + (acc.get(+item.ticketrestrictionid) ?? 0),
              ),
            new Map(),
        );

        const subscription = await prisma.subscriptions.findUnique({
          where: {
            id: subscriptionId,
            order: {
              payment_intent: {not: null},
            },
            refund: null,
          },
          include: {
            seasonsubscriptiontype: {
              include: {
                subscriptiontype: true,
              },
            },
            subscriptionticketitems: {
              include: {
                ticketitem: {
                  include: {
                    ticketrestriction: true,
                  },
                },
              },
            },
          },
        });

        if (!subscription) {
          return res.status(422).json({error: `Subscription (${subscriptionId}) does not exist`});
        } else if (req.body.subscriptionticketitems.length > subscription.seasonsubscriptiontype.ticketlimit) {
          return res.status(422).json({
            error: 'Can not redeem more tickets than included in subscription',
          });
        }

        const eventInstances = await prisma.eventinstances.findMany({
          where: {
            event: {
              seasons: {
                seasonid: subscription.seasonid_fk,
              },
              subscriptioneligible: true,
            },
          },
          include: {
            ticketrestrictions: {
              where: {
                deletedat: null,
              },
              include: {
                ticketitems: {
                  ...reservedTicketItemsFilter,
                },
              },
            },
          }});

        const [ticketRestrictionsMap, eventInstanceMap] =
          eventInstances.reduce<[Map<number, LoadedTicketRestriction>, Map<number, eventinstances>]>(
              (acc, instance) => {
                return [
                  instance
                      .ticketrestrictions
                      .reduce<Map<number, LoadedTicketRestriction>>((acc, res) =>
                        acc.set(res.ticketrestrictionsid, {
                          ...res,
                          availabletickets: res.ticketlimit - res.ticketitems.length,
                        }),
                      acc[0],
                      ),
                  acc[1].set(instance.eventinstanceid, instance),
                ];
              },
              [new Map(), new Map()],
          );

        const {
          eventInstanceIds,
          subscriptionTicketItemsToDelete,
          subscriptionTicketItemsToCreate,
        } = getUpdatedSubscription(subscription, ticketRestrictionsMap, eventInstanceMap, subscriptionTicketItemMap);

        const updatedSubscription = await prisma.subscriptions.update({
          where: {
            id: subscriptionId,
          },
          data: {
            subscriptionticketitems: {
              delete: subscriptionTicketItemsToDelete,
              create: subscriptionTicketItemsToCreate,
            },
          },
          include: {
            seasonsubscriptiontype: {
              include: {
                subscriptiontype: true,
                season: true,
              },
            },
            order: {
              include: {
                contacts: true,
              },
            },
            subscriptionticketitems: true,
          },
        });

        await updateAvailableSeats(prisma, eventInstanceIds);

        const {order, seasonsubscriptiontype, subscriptionticketitems, ...rest} =
        updatedSubscription;

        return res.json({
          ...rest,
          previewonly: seasonsubscriptiontype.subscriptiontype.previewonly,
          firstname: order.contacts?.firstname,
          lastname: order.contacts?.lastname,
          email: order.contacts?.email,
          name: seasonsubscriptiontype.subscriptiontype.name,
          ticketlimit: seasonsubscriptiontype.ticketlimit,
          seasonName: seasonsubscriptiontype.season.name,
          ticketsredeemed: subscriptionticketitems.length,
        });
      } catch (error) {
        if (error instanceof InvalidInputError) {
          return res.status(error.code).json({error: error.message});
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(400).json({error: error.message});
        }
        if (error instanceof Prisma.PrismaClientValidationError) {
          return res.status(400).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
      }
    },
);
