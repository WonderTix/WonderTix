import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import parseDateTime from '../../prisma/src/parseDateTime';
const prisma = extendPrismaClient();

export const donationOverviewController = Router();

donationOverviewController.use(checkJwt);
donationOverviewController.use(checkScopes);

/**
 * @swagger
 * /2/donation-overview:
 *   get:
 *     summary: get all donations
 *     tags:
 *     - DonationOverview
 *     responses:
 *       200:
 *         description: donation overview updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/DonationOverview'
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
donationOverviewController.get('/', async (req: Request, res: Response) => {
  try {
    const donations = await prisma.donations.findMany({
      include: { 
        order: {
          select: {
            orderdatetime: true
          },
        },
      },
      /*where: {
        order: {
          orderdatetime: {
              gte: new Date(req.params.begindate).toISOString(),
              lte: new Date(req.params.enddate).toISOString(), 
          },
        },
      },*/
    });
    res.status(200).json(donations);
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