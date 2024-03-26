import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();

export const seasonController = Router();
/**
 * @swagger
 * /2/season:
 *   get:
 *     summary: get all seasons
 *     tags:
 *     - New season
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
seasonController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {
      deletedat: null,
    };
    if (req.query.current) {
      const today = new Date();
      const formattedDate =
        today.getFullYear() * (today.getMonth() < 9 ? 10000 : 100000) +
        (today.getMonth() + 1) * 100 +
        today.getDate();
      filters.enddate = {
        gte: formattedDate,
      };
    }
    if (req.query.name) {
      filters.name = {
        contains: req.query.name,
      };
    }
    const seasons = await prisma.seasons.findMany({
      where: filters,
    });
    return res.status(200).json(seasons);
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
 * /2/season:
 *   post:
 *     summary: Create a season
 *     tags:
 *     - New season
 *     requestBody:
 *       description: Updated season information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Season'
 *     responses:
 *       201:
 *         description: season updated successfully.
 *         content:
 *           application/json:
 *             schema:
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
seasonController.post('/', async (req: Request, res: Response) => {
  try {
    const season = await prisma.seasons.create({
      data: {
        name: req.body.name,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        imageurl: req.body.imageurl,
      },
    });
    res.status(201).json(season);

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

seasonController.use(checkJwt);
seasonController.use(checkScopes);

/**
 * Retrieves a list of seasons with their associated events.
 *
 * @swagger
* /2/season/list:
 *   get:
 *     summary: Get all seasons with events
 *     tags:
 *     - New season
 *     responses:
 *       200:
 *         description: Successful response with an array of seasons and their events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/events'
 *       400:
 *         description: Bad request. Invalid input parameters.
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
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with an array of seasons and their events.
 */
seasonController.get('/list', async (req: Request, res: Response) => {
  try {
    const events = await prisma.seasons.findMany({
      where: {
        deletedat: null,
      },
      include: {
        events: true,
      },
    });

    return res.json(events);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});
    } else {
      return res.status(500).json({error: 'Internal Server Error'});
    }
  }
});
/**
 * @swagger
 * /2/season/{id}:
 *   get:
 *     summary: get a season
 *     tags:
 *     - New season
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: season updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Season'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
seasonController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const seasonExists = await prisma.seasons.findUnique({
      where: {
        seasonid: Number(id),
        deletedat: null,
      },
    });
    if (!seasonExists) {
      res.status(404).json({error: 'season not found'});

      return;
    }
    const season = await prisma.seasons.findUnique({
      where: {
        seasonid: Number(id),
      },
    });
    res.status(200).json(season);

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
 * /2/season/{id}:
 *   put:
 *     summary: update a season
 *     tags:
 *     - New season
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated season information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Season'
 *     responses:
 *       204:
 *         description: season updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
seasonController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const season = await prisma.seasons.update({
      where: {
        seasonid: Number(id),
        deletedat: null,
      },
      data: {
        name: req.body.name,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        imageurl: req.body.imageurl,
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

/**
 * @swagger
 * /2/season/{id}:
 *   delete:
 *     summary: delete a season
 *     tags:
 *     - New season
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: season updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: season not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
seasonController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const season = await prisma.seasons.findUnique({
      where: {
        seasonid: id,
        deletedat: null,
      },
      include: {
        seasonsubscriptiontypes: {
          include: {
            subscriptions: true,
          },
        },
      },
    });

    if (!season) {
      return res.status(400).json({error: 'season not found'});
    }

    if (
      season.seasonsubscriptiontypes.reduce<number>(
          (acc, sub) => acc + sub.subscriptions.length,
          0,
      )
    ) {
      await prisma.seasons.update({
        where: {
          seasonid: season.seasonid,
        },
        data: {
          deletedat: new Date(),
          events: {
            set: [],
          },
          seasontickettypepricedefaults: {
            deleteMany: {},
          },
        },
      });
    } else {
      await prisma.seasons.delete({
        where: {
          seasonid: season.seasonid,
        },
      });
    }
    return res.status(204).json();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({error: error.message});
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({error: error.message});
    }
    res.status(500).json({error: 'Internal Server Error'});
  }
});
