import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {InvalidInputError} from './eventInstanceController.service';

const prisma = extendPrismaClient();

export const creditCardReconciliationController = Router();

/**
 * @swagger
 * /2/salesoverview/events:
 *   get:
 *     summary: use this report to reconcile with credit card proccessor 
 *     tags:
 *     - Credit Card Reconcilliation API
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event fetch successful
 *         application/json:
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */

 creditCardReconciliationController.get('/events', async (req: Request, res: Response) => {
    try {
        const events = await prisma.events.findMany({
            include: {
              eventinstances: {
                include: {
                  ticketrestrictions: {
                    where: {
                      deletedat: null,
                    },
                  },
                },
              },
            },
        });
        return res.json(events);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({error: error.message});
        return;
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        res.status(400).json({error: error.message});
        return;
      }
      return res.status(500).json({error: 'Internal Server Error'});
    }
  });