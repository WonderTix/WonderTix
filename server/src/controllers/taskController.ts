import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const taskController = Router();

/**
 * @swagger
 * /2/task:
 *   post:
 *     summary: Create a task
 *     tags:
 *     - New task
 *     requestBody:
 *       description: Updated task information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/task'
 *     responses:
 *       201:
 *         description: task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/task'
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
taskController.post('/', async (req: Request, res: Response) => {
  try {
    const task = prisma.task.create({
      data: {
        parentid_fk: req.body.parent,
        assignto_fk: req.body.assignto,
        reportto_fk: req.body.reportto,
        subject: req.body.subject,
        description: req.body.description,
        status: req.body.status,
        datecreated: req.body.datecreated,
        dateassigned: req.body.dateassigned,
        datedue: req.body.datedue,
        ref_contact: req.body.contact,
        ref_donation: req.body.donation,
      },
    });
    res.status(201).json(task);

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

taskController.use(checkJwt);
taskController.use(checkScopes);

/**
 * @swagger
 * /2/task:
 *   get:
 *     summary: get all task
 *     tags:
 *     - New Task
 *     responses:
 *       200:
 *         description: task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/task'
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
taskController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.assignto) {
      filters.assignto_fk = {
        contains: req.params.assignto,
      };
    }
    if (req.params.reportto) {
      filters.reportto_fk = {
        contains: req.params.reportto,
      };
    }
    if (req.params.subject) {
      filters.subject = {
        contains: req.params.subject,
      };
    }
    if (req.params.status) {
      filters.status = {
        contains: req.params.status,
      };
    }

    if (Object.keys(filters).length > 0) {
      const tasks = await prisma.task.findMany({
        where: filters,
      });
      res.status(200).json(tasks);

      return;
    }

    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);

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
 * /2/task/{id}:
 *   get:
 *     summary: get a task
 *     tags:
 *     - New Task
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/task'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
taskController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const taskExists = await prisma.task.findUnique({
      where: {
        taskid: Number(id),
      },
    });
    if (!taskExists) {
      res.status(404).json({error: 'Task not found'});

      return;
    }
    const task = await prisma.task.findUnique({
      where: {
        taskid: Number(id),
      },
    });
    res.status(200).json(task);

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
 * /2/task/{id}:
 *   put:
 *     summary: update a task
 *     tags:
 *     - New Task
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated Task information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/task'
 *     responses:
 *       204:
 *         description: task updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
taskController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const task = prisma.task.update({
      where: {
        taskid: Number(id),
      },
      data: {
        parentid_fk: req.body.parent,
        assignto_fk: req.body.assignto,
        reportto_fk: req.body.reportto,
        subject: req.body.subject,
        description: req.body.description,
        status: req.body.status,
        datecreated: req.body.datecreated,
        dateassigned: req.body.dateassigned,
        datedue: req.body.datedue,
        ref_contact: req.body.contact,
        ref_donation: req.body.donation,
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
 * /2/task/{id}:
 *   delete:
 *     summary: delete a task
 *     tags:
 *     - New Task
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: task updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: task not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
taskController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const taskExists = await prisma.task.findUnique({
      where: {
        taskid: Number(id),
      },
    });
    if (!taskExists) {
      res.status(404).json({error: 'Task not found'});

      return;
    }
    const task = prisma.task.delete({
      where: {
        taskid: Number(id),
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
