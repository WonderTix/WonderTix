import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();


export const ticketTypeController = Router();

ticketTypeController.use(checkJwt);
ticketTypeController.use(checkScopes);

/**
 * @swagger
 * /2/ticket-type:
 *   post:
 *     summary: Create a ticketType
 *     tags:
 *     - New Ticket Type
 *     requestBody:
 *       description:  New Ticket Type information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/TicketType'
 *     responses:
 *       201:
 *         description: ticketType updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketType'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
ticketTypeController.post('/', async (req: Request, res: Response) => {
  try {
    const {price, concessions, description} = req.body;

    if (!price || price < 0 || !concessions || concessions < 0) {
      return res.status(400).json({error: `Neither price nor concession price can be negative`});
    } else if (!description || description === '') {
      return res.status(400).json({error: `Ticket type description is required`});
    }

    const ticketType = prisma.tickettype.create({
      data: {
        description,
        price: +price,
        concessions: +concessions,
        deprecated: false,
      },
    });
    return res.status(201).json(ticketType);
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

/**
 * @swagger
 * /2/ticket-type:
 *   get:
 *     summary: get Ticket Types
 *     tags:
 *     - New Ticket Type
 *     responses:
 *       200:
 *         description: Ticket Type fetch successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/TicketType'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
ticketTypeController.get('/', async (req: Request, res: Response) => {
  try {
    const description= req.query.description? String(req.query.description): undefined;
    const ticketTypes = await prisma.tickettype.findMany({
      where: {
        ...(description && {description: description}),
      },
    });
    return res.json(ticketTypes);
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

/**
 * @swagger
 * /2/ticket-type/{id}:
 *   get:
 *     summary: get a Ticket Type
 *     tags:
 *     - New Ticket Type
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ticket Type fetch successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketType'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
ticketTypeController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const ticketTypeExists = await prisma.tickettype.findUnique({
      where: {
        tickettypeid: +id,
      },
    });
    if (!ticketTypeExists) {
      return res.status(404).json({error: 'ticketType not found'});
    }
    return res.status(200).json(ticketTypeExists);
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

/**
 * @swagger
 * /2/ticket-type/{id}:
 *   put:
 *     summary: update a Ticket Type
 *     tags:
 *     - New Ticket Type
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated Ticket Type information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/TicketType'
 *     responses:
 *       200:
 *         description: ticketType updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketType'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
ticketTypeController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {description, price, concessions} = req.body;

    if (!price || price < 0 || !concessions || concessions < 0) {
      return res.status(400).json({error: `Neither price nor concession price can be negative`});
    } else if (!description || description === '') {
      return res.status(400).json({error: `Ticket type description is required`});
    }

    const ticketType = await prisma.tickettype.findUnique({
      where: {
        tickettypeid: +id,
      },
    });

    if (!ticketType) {
      return res.status(400).json({error: `Ticket type does not exist`});
    }

    await prisma.tickettype.update({
      where: {
        tickettypeid: +id,
      },
      data: {
        description,
        price: !id? 0: +price,
        concessions: +concessions,
        ticketrestrictions: {
          updateMany: {
            where: {
              tickettypeid_fk: +id,
            },
            data: {
              ...(ticketType.tickettypeid && +ticketType.price !== +price && {price: +price}),
              ...(+ticketType.concessions !== +concessions && {concessionprice: +concessions}),
            },
          },
        },
      },
    });
    return res.status(200).json();
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

/**
 * @swagger
 * /2/ticket-type/{id}:
 *   delete:
 *     summary: delete a Ticket Type
 *     tags:
 *     - New Ticket Type
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: ticketType deleted successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
ticketTypeController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const ticketTypeExists = await prisma.tickettype.findUnique({
      where: {
        tickettypeid: +id,
      },
      include: {
        ticketrestrictions: true,
      },
    });

    if (!ticketTypeExists) {
      return res.status(400).json({error: 'ticketType not found'});
    } else if (ticketTypeExists.tickettypeid === 0 || ticketTypeExists.tickettypeid === 1) {
      return res.status(400). json({error: `Can not delete reserved Ticket Type: ${ticketTypeExists.description}`});
    } else if (ticketTypeExists.ticketrestrictions.length !== 0) {
      return res.status(400). json({error: `Can no delete Ticket Type with outstanding tickets: ${ticketTypeExists.description}`});
    }

    await prisma.tickettype.delete({
      where: {
        tickettypeid: Number(id),
      },
    });

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
