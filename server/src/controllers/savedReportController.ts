import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();

export const savedreportController = Router();

/**
 * @swagger
 * /2/saved-report:
 *   post:
 *     summary: Create a saved report
 *     tags:
 *     - New Saved Report
 *     requestBody:
 *       description: Updated saved report information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SavedReport'
 *     responses:
 *       201:
 *         description: saved report updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SavedReport'
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
savedreportController.post('/', async (req: Request, res: Response) => {
  try {
    const savedReport = prisma.savedreports.create({
      data: {
        tablename: req.body.tablename,
        queryattr: req.body.queryattr,
      },
    });
    res.status(201).json(savedReport);

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

savedreportController.use(checkJwt);
savedreportController.use(checkScopes);

/**
 * @swagger
 * /2/saved-report:
 *   get:
 *     summary: get all saved reports
 *     tags:
 *     - New Saved Report
 *     responses:
 *       200:
 *         description: saved report updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/SavedReport'
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
savedreportController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.tablename) {
      filters.tablename = {
        contains: req.params.tablename,
      };
    }

    if (Object.keys(filters).length > 0) {
      const savedreports = await prisma.savedreports.findMany({
        where: filters,
      });
      res.status(200).json(savedreports);

      return;
    }

    const savedreports = await prisma.savedreports.findMany();
    res.status(200).json(savedreports);

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
 * /2/saved-report/{id}:
 *   get:
 *     summary: get a savedreport
 *     tags:
 *     - New Saved Report
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: savedreport updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SavedReport'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
savedreportController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const savedReportExists = await prisma.savedreports.findUnique({
      where: {
        savedreportid: Number(id),
      },
    });
    if (!savedReportExists) {
      res.status(404).json({error: 'savedreport not found'});

      return;
    }
    const savedReport = await prisma.savedreports.findUnique({
      where: {
        savedreportid: Number(id),
      },
    });
    res.status(200).json(savedReport);

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
 * /2/saved-report/{id}:
 *   put:
 *     summary: update a saved report
 *     tags:
 *     - New Saved Report
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated saved report information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/SavedReport'
 *     responses:
 *       204:
 *         description: saved report updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
savedreportController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const savedreport = prisma.savedreports.update({
      where: {
        savedreportid: Number(id),
      },
      data: {
        tablename: req.body.tablename,
        queryattr: req.body.queryattr,
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
 * /2/saved-report/{id}:
 *   delete:
 *     summary: delete a saved report
 *     tags:
 *     - New Saved Report
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: saved report updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: saved report not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
savedreportController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const savedreportExists = await prisma.savedreports.findUnique({
      where: {
        savedreportid: Number(id),
      },
    });
    if (!savedreportExists) {
      res.status(404).json({error: 'saved report not found'});

      return;
    }
    const savedreport = prisma.savedreports.delete({
      where: {
        savedreportid: Number(id),
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
