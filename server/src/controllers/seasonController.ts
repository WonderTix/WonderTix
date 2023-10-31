import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();

export const seasonController = Router();

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
 * @swagger
 * /2/season:
 *   get:
 *     summary: get all seasons
 *     tags:
 *     - New season
 *     responses:
 *       200:
 *         description: season updated successfully.
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
    const filters: any = {};
    if (req.params.seasonname) {
      filters.seasonname = {
        contains: req.params.seasonname,
      };
    }
    if (req.params.auth0_id) {
      filters.auth0_id = {
        contains: req.params.auth0_id,
      };
    }

    if (Object.keys(filters).length > 0) {
      const seasons = await prisma.seasons.findMany({
        where: filters,
      });
      res.status(200).json(seasons);

      return;
    }

    const seasons = await prisma.seasons.findMany();
    res.status(200).json(seasons);

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
    const id = req.params.id;
    const seasonExists = await prisma.seasons.findUnique({
      where: {
        seasonid: Number(id),
      },
    });
    if (!seasonExists) {
      res.status(404).json({error: 'season not found'});

      return;
    }
    const season = await prisma.seasons.delete({
      where: {
        seasonid: Number(id),
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
