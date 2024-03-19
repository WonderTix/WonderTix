/* eslint-disable camelcase */
import {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {InvalidInputError} from './eventInstanceController.service';

const prisma = extendPrismaClient();
export const seasonTicketTypePriceDefaultController = Router();

interface SeasonTicketTypePriceDefaultRequestItem {
  tickettypeid_fk: number;
  price: number;
  fee: number;
}

/**
 * @swagger
 * /2/season-ticket-type-price-default/{seasonid}:
 *   get:
 *     summary: get season ticket type prices for a given season
 *     tags:
 *     - Season Ticket Type Price Default API
 *     parameters:
 *     - $ref: '#/components/parameters/seasonid'
 *     responses:
 *       200:
 *         description: array of updated season ticket type prices
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/SeasonTicketTypePriceDefault'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
seasonTicketTypePriceDefaultController.get('/:seasonid', async (req: Request, res: Response) => {
  try {
    const {seasonid} = req.params;
    const toSend = await prisma.seasontickettypepricedefault.findMany({
      where: {
        seasonid_fk: +seasonid,
      },
      include: {
        tickettype: {
          select: {
            description: true,
          },
        },
      },
    });
    return res.json(
        toSend
            .map((defaultTicketType) => ({
              id: defaultTicketType.id,
              seasonid_fk: defaultTicketType.seasonid_fk,
              tickettypeid_fk: defaultTicketType.tickettypeid_fk,
              price: defaultTicketType.price,
              fee: defaultTicketType.fee,
              description: defaultTicketType.tickettype.description,
            })),
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).send({error: error.message});
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).send({error: error.message});
    }
    return res.status(500).send({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/season-ticket-type-price-default/events/{seasonid}:
 *   get:
 *     summary: get season ticket types in the format needed by the events page
 *     tags:
 *     - Season Ticket Type Price Default API
 *     parameters:
 *     - $ref: '#/components/parameters/seasonid'
 *     responses:
 *       200:
 *         description: array of  season ticket types
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/SeasonTicketTypePriceDefault'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
seasonTicketTypePriceDefaultController.get('/events/:seasonid', async (req: Request, res: Response) => {
  try {
    const {seasonid} = req.params;
    let seasonResult:any[]= [];
    const ticketResult = await prisma.tickettype.findMany({
      where: {
        deprecated: false,
        seasontickettypepricedefaults: {
          every: {
            seasonid_fk: {not: +seasonid},
          },
        },
      },
    });
    if (+seasonid>0) {
      seasonResult = await prisma.seasontickettypepricedefault.findMany({
        where: {
          seasonid_fk: +seasonid,
        },
        include: {
          tickettype: true,
        },
      });
    }
    const toSend = ticketResult.map((type) => ({
      fee: type.fee,
      price: type.price,
      tickettypeid_fk: type.tickettypeid,
      description: type.description,
    })).concat(seasonResult.map((type) => {
      return {
        fee: type.fee,
        price: type.price,
        tickettypeid_fk: type.tickettypeid_fk,
        description: type.tickettype.description,
      };
    }));
    return res.json(toSend);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).send({error: error.message});
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).send({error: error.message});
    }
    return res.status(500).send({error: 'Internal Server Error'});
  }
});

// All further routes require appropriate authentication
seasonTicketTypePriceDefaultController.use(checkJwt);
seasonTicketTypePriceDefaultController.use(checkScopes);

/**
 * @swagger
 * /2/season-ticket-type-price-default/{seasonid}:
 *   put:
 *     summary: update season ticket type prices to match the array in the request body for a given season.
 *     tags:
 *     - Season Ticket Type Price Default API
 *     parameters:
 *     - $ref: '#/components/parameters/seasonid'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: array of season ticket type prices (run examples in order)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SeasonTicketTypePriceDefault'
 *           examples:
 *             Example 1 - Add two ticket type prices to season:
 *              value:
 *                - tickettypeid_fk: 1
 *                  price: 10.00
 *                  fee: 10.00
 *                - tickettypeid_fk: 2
 *                  price: 10.00
 *                  fee: 11.92
 *             Example 2 - Delete ticket type 1 price from season:
 *              value:
 *                - tickettypeid_fk: 2
 *                  price: 10.00
 *                  fee: 11.92
 *             Example 3 - Update ticket type 2 prices for season:
 *              value:
 *                - tickettypeid_fk: 2
 *                  price: 0
 *                  fee: 0
 *     responses:
 *       200:
 *         description: array of updated season ticket type prices
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/SeasonTicketTypePriceDefault'
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
seasonTicketTypePriceDefaultController.put('/:seasonid', async (req: Request, res: Response) => {
  try {
    const {seasonid} = req.params;
    const toUpdate: Map<number, SeasonTicketTypePriceDefaultRequestItem> = new Map(
        req.body.ticketTypes?.map((item: SeasonTicketTypePriceDefaultRequestItem) => [+item.tickettypeid_fk,
          {
            ...item,
            price: +item.price,
            fee: +item.fee,
          }]),
    );
    const ticketRestrictions = await prisma.ticketrestrictions.findMany({
      where: {
        eventinstance: {
          event: {
            seasonid_fk: +seasonid,
          },
        },
      },
    });
    const ticketResMap = new Map<number, number[]>();
    ticketRestrictions.forEach((res) => {
      const current = ticketResMap.get(res.tickettypeid_fk);
      if (!current) {
        ticketResMap.set(res.tickettypeid_fk, [res.ticketrestrictionsid]);
        return;
      }
      current.push(res.ticketrestrictionsid);
    });
    const current = await prisma.seasontickettypepricedefault.findMany({
      where: {
        seasonid_fk: +seasonid,
      },
      include: {
        ticketrestrictions: true,
      },
    });
    await prisma.$transaction(current.map((item) => {
      const update = toUpdate.get(item.tickettypeid_fk);
      toUpdate.delete(item.tickettypeid_fk);
      if (!update) {
        return prisma.seasontickettypepricedefault.delete({
          where: {
            id: item.id,
          },
        });
      } else if (update.price < 0 || update.fee < 0 ) {
        throw new InvalidInputError(422, 'Price can not be negative');
      }
      return prisma.seasontickettypepricedefault.update({
        where: {
          id: item.id,
        },
        data: {
          price: !item.tickettypeid_fk? 0: update.price,
          fee: update.fee,
          ticketrestrictions: {
            updateMany: {
              where: {
                seasontickettypepricedefaultid_fk: item.id,
              },
              data: {
                ...(item.tickettypeid_fk && +item.price !== update.price && {price: update.price}),
                ...(+item.fee !== update.fee && {fee: update.fee}),
              },
            },
          },
        },
      });
    }).concat([...toUpdate.values()].map(
        ({
          tickettypeid_fk,
          price,
          fee,
        }) : any[] => {
          if (price < 0 || fee < 0) {
            throw new InvalidInputError(422, `Price can not be negative`);
          }
          return [prisma.seasontickettypepricedefault.create({
            data: {
              seasonid_fk: +seasonid,
              tickettypeid_fk: +tickettypeid_fk,
              price: +tickettypeid_fk === 0 ? 0 : +price,
              fee: +fee,
              ticketrestrictions: {
                connect: ticketResMap.get(+tickettypeid_fk)?.map((id) => ({
                  ticketrestrictionsid: id,
                })),
              },
            },
          }), prisma.ticketrestrictions.updateMany({
            where: {
              tickettypeid_fk: +tickettypeid_fk,
              eventinstance: {
                event: {
                  seasonid_fk: +seasonid,
                },
              },
            },
            data: {
              price: +tickettypeid_fk === 0 ? 0 : +price,
              fee: +fee,
            },
          })];
        })
        .flat(1),
    ));
    const toSend = await prisma.seasontickettypepricedefault.findMany({
      where: {
        seasonid_fk: +seasonid,
      },
      include: {
        tickettype: {
          select: {
            description: true,
          },
        },
      },
    });
    return res.json(
        toSend
            .map((defaultTicketType) => ({
              id: defaultTicketType.id,
              seasonid_fk: defaultTicketType.seasonid_fk,
              tickettypeid_fk: defaultTicketType.tickettypeid_fk,
              price: defaultTicketType.price,
              fee: defaultTicketType.fee,
              description: defaultTicketType.tickettype.description,
            })),
    );
  } catch (error) {
    if (error instanceof InvalidInputError) {
      return res.status(error.code).send({error: error.message});
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).send({error: error.message});
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).send({error: error.message});
    }
    return res.status(500).send({error: 'Internal Server Error'});
  }
});

