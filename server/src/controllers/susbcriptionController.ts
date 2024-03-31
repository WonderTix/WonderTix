/* eslint-disable camelcase */
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {Request, Response, Router} from 'express';
import {Prisma} from '@prisma/client';
import {InvalidInputError} from './eventInstanceController.service';
import {validateWithRegex} from './eventController.service';
import {checkJwt, checkScopes} from '../auth';

const prisma = extendPrismaClient();
export const subscriptionController = Router();


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
    const today = new Date();
    const formattedDate = today.getFullYear()*(today.getMonth()<9?10000:100000)+(today.getMonth()+1)*100+today.getDate();
    const seasons = await prisma.seasons.findMany({
      where: {
        deletedat: null,
        seasonsubscriptiontypes: {
          some: {
            deletedat: null,
          },
        },
        enddate: {gte: formattedDate},
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
      return res.status(400).json({error: 'Season does not exist'});
    }

    const {deletedat, ...toReturn} = season;
    return res.json({
      ...toReturn,
      events: toReturn.events
          .map(({eventinstances, deletedat, ...rest}) => ({
            ...rest,
            eventinstances,
            startdate: eventinstances[0]?.eventdate,
            enddate: eventinstances[eventinstances.length-1>=0?eventinstances.length-1: 0]?.eventdate,
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

interface SeasonSubscriptionType {
    price: number;
    ticketlimit: number;
    subscriptionlimit: number;
    subscriptiontypeid_fk: number;
}

const validateSeasonSubscriptionType = ({price, ticketlimit, subscriptionlimit}: SeasonSubscriptionType, subscriptionsSold = 0, currentTicketLimit = 0) => {
  if (isNaN(price) || price < 0) {
    throw new InvalidInputError(422, `Invalid Price (${price})`);
  } else if (isNaN(ticketlimit) || ticketlimit < 0 || (subscriptionsSold && ticketlimit < currentTicketLimit)) {
    throw new InvalidInputError(422, `Invalid Ticket Limit (${ticketlimit})`);
  } else if (isNaN(subscriptionlimit) || subscriptionlimit < subscriptionsSold) {
    throw new InvalidInputError(422, `Invalid Subscription Limit (${+subscriptionlimit})`);
  }

  return {price, ticketlimit, subscriptionlimit};
};

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
        return prisma.seasonsubscriptiontypes.upsert({
          where: {
            seasonid_fk_subscriptiontypeid_fk: {
              seasonid_fk: seasonId,
              subscriptiontypeid_fk: newType.subscriptiontypeid_fk,
            },
          },
          update: {
            ...validateSeasonSubscriptionType(newType),
            deletedat: null,
          },
          create: {
            seasonid_fk: seasonId,
            subscriptiontypeid_fk: newType.subscriptiontypeid_fk,
            ...validateSeasonSubscriptionType(newType),
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

const validateSubscriptionType = (subscriptionType: any) => {
  if (isNaN(+subscriptionType.price) || +subscriptionType.price < 0) {
    throw new InvalidInputError(422, `Invalid Price (${subscriptionType.price})`);
  }
  return {
    name: validateWithRegex(subscriptionType.name, 'Invalid Name', new RegExp('^.{1,255}$')),
    description: validateWithRegex(subscriptionType.description, `Invalid Description`, new RegExp('^.{1,255}$')),
    price: +subscriptionType.price,
    previewonly: Boolean(subscriptionType.previewonly),
  };
};


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

