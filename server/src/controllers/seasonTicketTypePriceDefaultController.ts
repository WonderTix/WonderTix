/* eslint-disable camelcase */
import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {InvalidInputError} from './eventInstanceController.service';

const prisma = extendPrismaClient();
export const seasonTicketTypePriceDefaultController = Router();

// All further routes require appropriate authentication
seasonTicketTypePriceDefaultController.use(checkJwt);
seasonTicketTypePriceDefaultController.use(checkScopes);

interface SeasonTicketTypePriceDefaultRequestItem {
    tickettypeid_fk: number;
    price: number;
    concessionprice: number;
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
 *     security:
 *       - bearerAuth: []
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
    });
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
 *             Example 1 - Create two ticket type prices to season:
 *              value:
 *                - tickettypeid_fk: 1
 *                  price: 10.00
 *                  concessionprice: 10.00
 *                - tickettypeid_fk: 2
 *                  price: 10.00
 *                  concessionprice: 11.92
 *             Example 2 - Delete ticket type 1 price from season:
 *              value:
 *                - tickettypeid_fk: 2
 *                  price: 10.00
 *                  concessionprice: 11.92
 *             Example 3 - Update ticket type 2 prices for season:
 *              value:
 *                - tickettypeid_fk: 2
 *                  price: 0
 *                  concessionprice: 0
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
    const toUpdate: Map<number, SeasonTicketTypePriceDefaultRequestItem> = new Map(req.body?.map((item: SeasonTicketTypePriceDefaultRequestItem) => [+item.tickettypeid_fk, item]));
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
      } else if (update.price < 0 || update.concessionprice < 0 ) {
        throw new InvalidInputError(422, `Price can not be negative`);
      }
      return prisma.seasontickettypepricedefault.update({
        where: {
          id: item.id,
        },
        data: {
          price: !item.tickettypeid_fk? 0: +update.price,
          concessionprice: +update.concessionprice,
          ticketrestrictions: {
            updateMany: {
              where: {
                seasontickettypepricedefaultid_fk: item.id,
              },
              data: {
                ...(item.tickettypeid_fk && +item.price !== +update.price && {price: +update.price}),
                ...(+item.concessionprice !== +update.concessionprice && {concessionprice: +update.concessionprice}),
              },
            },
          },
        },
      });
    }).concat([...toUpdate.values()].map(
        ({
          tickettypeid_fk,
          price,
          concessionprice,
        }) => {
          if (price < 0 || concessionprice < 0 ) {
            throw new InvalidInputError(422, `Price can not be negative`);
          }
          return prisma.seasontickettypepricedefault.create({
            data: {
              seasonid_fk: +seasonid,
              tickettypeid_fk: +tickettypeid_fk,
              price: +tickettypeid_fk === 0? 0: +price,
              concessionprice: +concessionprice,
            },
          });
        })));
    return res.json(await prisma.seasontickettypepricedefault.findMany({where: {seasonid_fk: +seasonid}}));
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
