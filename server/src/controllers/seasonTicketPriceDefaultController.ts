import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma, seasonticketpricedefault} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {InvalidInputError} from './eventInstanceController.service';

const prisma = extendPrismaClient();
export const seasonTicketPriceDefaultController = Router();

// All further routes require appropriate authentication
seasonTicketPriceDefaultController.use(checkJwt);
seasonTicketPriceDefaultController.use(checkScopes);

/**
 * @swagger
 * /2/season-ticket-price-default/{id}:
 *   get:
 *     summary: get season ticket type prices for a given season
 *     tags:
 *     - Season Ticket Type Price Default API
 *     parameters:
 *     - $ref: '#/components/parameters/id'
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
seasonTicketPriceDefaultController.get('/:id', async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const toSend = await prisma.seasonticketpricedefault.findMany({
      where: {
        seasonid_fk: +id,
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
 * /2/season-ticket-price-default/{id}:
 *   put:
 *     summary: update season ticket type prices for a given season
 *     tags:
 *     - Season Ticket Type Price Default API
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: array of season ticket type prices
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SeasonTicketTypePriceDefault'
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
seasonTicketPriceDefaultController.put('/:id', async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const toUpdate: Map<number, seasonticketpricedefault> = new Map(req.body?.map((item: seasonticketpricedefault) => [+item.tickettypeid_fk, item]));
    const current = await prisma.seasonticketpricedefault.findMany({
      where: {
        seasonid_fk: +id,
      },
      include: {
        ticketrestrictions: true,
      },
    });
    const update = await prisma.$transaction(current.map((item) => {
      const update = toUpdate.get(item.tickettypeid_fk);
      toUpdate.delete(item.tickettypeid_fk);
      if (!update && !item.ticketrestrictions.length) {
        return prisma.seasonticketpricedefault.delete({
          where: {
            id: item.id,
          },
        });
      } else if (!update) {
        throw new InvalidInputError(422, `Can not delete season ticket with active restriction`);
      }
      return prisma.seasonticketpricedefault.update({
        where: {
          id: item.id,
        },
        data: {
          price: +update.price,
        },
      });
    }).concat([...toUpdate.values()].map(
        ({
          // eslint-disable-next-line camelcase
          seasonid_fk,
          // eslint-disable-next-line camelcase
          tickettypeid_fk,
          price,
        }) =>
          prisma.seasonticketpricedefault.create({
            data: {
              // eslint-disable-next-line camelcase
              seasonid_fk: +id,
              // eslint-disable-next-line camelcase
              tickettypeid_fk,
              price,
            },
          }),
    )));
    return res.json(await prisma.seasonticketpricedefault.findMany({where: {seasonid_fk: +id}}));
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
