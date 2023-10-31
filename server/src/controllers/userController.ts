import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();

export const userController = Router();

/**
 * @swagger
 * /2/user:
 *   post:
 *     summary: Create a user
 *     tags:
 *     - New user
 *     requestBody:
 *       description: Updated user information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/User'
 *     responses:
 *       201:
 *         description: user updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
userController.post('/', async (req: Request, res: Response) => {
  try {
    const user = prisma.users.create({
      data: {
        username: req.body.username,
        is_superadmin: req.body.is_superadmin,
        auth0_id: req.body.auth0_id,
      },
    });
    res.status(201).json(user);

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

userController.use(checkJwt);
userController.use(checkScopes);

/**
 * @swagger
 * /2/user:
 *   get:
 *     summary: get all users
 *     tags:
 *     - New user
 *     responses:
 *       200:
 *         description: user updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/User'
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
userController.get('/', async (req: Request, res: Response) => {
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
      const users = await prisma.users.findMany({
        where: filters,
      });
      res.status(200).json(users);

      return;
    }

    const users = await prisma.users.findMany();
    res.status(200).json(users);

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
 * /2/user/{id}:
 *   get:
 *     summary: get a user
 *     tags:
 *     - New user
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: user updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
userController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userExists = await prisma.users.findUnique({
      where: {
        userid: Number(id),
      },
    });
    if (!userExists) {
      res.status(404).json({error: 'user not found'});

      return;
    }
    const user = await prisma.users.findUnique({
      where: {
        userid: Number(id),
      },
    });
    res.status(200).json(user);

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
 * /2/user/{id}:
 *   put:
 *     summary: update a user
 *     tags:
 *     - New user
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated user information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/User'
 *     responses:
 *       204:
 *         description: user updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
userController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = prisma.users.update({
      where: {
        userid: Number(id),
      },
      data: {
        username: req.body.username,
        auth0_id: req.body.auth0_id,
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
 * /2/user/{id}:
 *   delete:
 *     summary: delete a user
 *     tags:
 *     - New user
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: user updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: user not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
userController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userExists = await prisma.users.findUnique({
      where: {
        userid: Number(id),
      },
    });
    if (!userExists) {
      res.status(404).json({error: 'user not found'});

      return;
    }
    const user = prisma.users.delete({
      where: {
        userid: Number(id),
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
