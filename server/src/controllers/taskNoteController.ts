import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const taskNoteController = Router();

/**
 * @swagger
 * /2/task-note:
 *   post:
 *     summary: Create a task note
 *     tags:
 *     - New Task Note
 *     requestBody:
 *       description: Updated task note information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/task-note'
 *     responses:
 *       201:
 *         description: Task note updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/task-note'
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
taskNoteController.post('/', async (req: Request, res: Response) => {
  try {
    const taskNote = prisma.tasknotes.create({
      data: {
        taskid_fk: req.body.task_id,
        date: req.body.date,
        notes: req.body.notes,
      },
    });
    res.status(201).json(taskNote);

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

taskNoteController.use(checkJwt);
taskNoteController.use(checkScopes);

/**
 * @swagger
 * /2/task-note:
 *   get:
 *     summary: get all Task Notes
 *     tags:
 *     - New Task Notes
 *     responses:
 *       200:
 *         description: task note updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/task-note'
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
taskNoteController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.username) {
      filters.username = {
        contains: req.params.username,
      };
    }
    if (req.params.auth0_id) {
      filters.auth0_id = {
        contains: req.params.auth0_id,
      };
    }

    if (Object.keys(filters).length > 0) {
      const taskNotes = await prisma.tasknotes.findMany({
        where: filters,
      });
      res.status(200).json(taskNotes);

      return;
    }

    const taskNotes = await prisma.tasknotes.findMany();
    res.status(200).json(taskNotes);

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
 * /2/task-note/{id}:
 *   get:
 *     summary: get a Task Note
 *     tags:
 *     - New Task Note
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: task note updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/task-note'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
taskNoteController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const taskNoteExists = await prisma.tasknotes.findUnique({
      where: {
        tasknoteid: Number(id),
      },
    });
    if (!taskNoteExists) {
      res.status(404).json({error: 'Task Note not found'});

      return;
    }
    const taskNote = await prisma.tasknotes.findUnique({
      where: {
        tasknoteid: Number(id),
      },
    });
    res.status(200).json(taskNote);

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
 * /2/task-note/{id}:
 *   put:
 *     summary: update a task note
 *     tags:
 *     - New Task Note
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated task note information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/task-note'
 *     responses:
 *       204:
 *         description: Task note updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
taskNoteController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const taskNote = prisma.tasknotes.update({
      where: {
        tasknoteid: Number(id),
      },
      data: {
        taskid_fk: req.body.task,
        date: req.body.date,
        notes: req.body.notes,
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
 * /2/task-note/{id}:
 *   delete:
 *     summary: delete a Task Note
 *     tags:
 *     - New Task Note
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Task Note updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Task Note not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
taskNoteController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const TaskNoteExists = await prisma.tasknotes.findUnique({
      where: {
        tasknoteid: Number(id),
      },
    });
    if (!TaskNoteExists) {
      res.status(404).json({error: 'Task Note not found'});

      return;
    }
    const taskNote = prisma.tasknotes.delete({
      where: {
        tasknoteid: Number(id),
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
