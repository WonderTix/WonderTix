import { Request, Response, Router } from "express";
import { checkJwt, checkScopes } from "../auth";
import { Prisma } from "@prisma/client";
import { extendPrismaClient } from "./PrismaClient/GetExtendedPrismaClient";

const prisma = extendPrismaClient();


export const ticketTypeController = Router();


/**
 * @swagger
 * /2/ticket-type/valid:
 *   get:
 *     summary: get all valid Ticket Types
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
ticketTypeController.get('/valid', async (req: Request, res: Response) => {
  try {
    const ticketTypes = await prisma.tickettype.findMany({
      where: {
        deprecated: false,
      },
    });
    return res.json(ticketTypes.map((type) => ({...type, id: type.tickettypeid})));
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
 * /2/ticket-type/editable:
 *   get:
 *     summary: get editable Ticket Types
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
ticketTypeController.get('/editable', async (req: Request, res: Response) => {
  try {
    const ticketTypes = await prisma.tickettype.findMany({
      where: {
        tickettypeid: {not: 0},
        deprecated: false,
      },
      orderBy: {
        tickettypeid: 'asc',
      },
    });
    return res.json(ticketTypes.map((type) => ({...type, id: type.tickettypeid})));
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
 * /2/ticket-type/all:
 *   get:
 *     summary: get all valid and deprecated Ticket Types
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
ticketTypeController.get('/all', async (req: Request, res: Response) => {
  try {
    const ticketTypes = await prisma.tickettype.findMany({});
    return res.json(ticketTypes.map((type) => ({...type, id: type.tickettypeid})));
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
        deprecated: false,
      },
    });
    if (!ticketTypeExists) {
      return res.status(404).json({error: 'Ticket Type not found'});
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

ticketTypeController.use(checkJwt);
ticketTypeController.use(checkScopes);

/**
 * @swagger
 * /2/ticket-type:
 *   post:
 *     summary: Create a Ticket Type
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
    const {price, fee, description} = req.body;
    if (price === undefined || +price < 0 || fee === undefined || +fee < 0) {
      return res.status(400).json({error: 'Neither price nor fee can be negative'});
    } else if (!description || description === '') {
      return res.status(400).json({error: 'Ticket type description is required'});
    }

    const ticketType = await prisma.tickettype.create({
      data: {
        description,
        price: +price,
        fee: +fee,
        deprecated: false,
      },
    });

    return res.status(201).json(ticketType);
  } catch (error) {
    console.error(error);
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
 *     - bearerAuth: []
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
    const {description, price, fee} = req.body;

    if (price === undefined || +price < 0 || fee === undefined || +fee < 0) {
      return res.status(400).json({error: 'Neither price nor fee can be negative'});
    } else if (!description|| description === '') {
      return res.status(400).json({error: 'Ticket type description is required'});
    }

    const ticketType = await prisma.tickettype.findUnique({
      where: {
        tickettypeid: +id,
      },
    });

    if (!ticketType) {
      return res.status(400).json({error: 'Ticket type does not exist'});
    }

    const updatedType = await prisma.tickettype.update({
      where: {
        tickettypeid: +id,
      },
      data: {
        description,
        price: !id? 0: +price,
        fee: +fee,
        ticketrestrictions: {
          updateMany: {
            where: {
              tickettypeid_fk: +id,
            },
            data: {
              ...(ticketType.tickettypeid && +ticketType.price !== +price && {price: +price}),
              ...(+ticketType.fee !== +fee && {fee: +fee}),
            },
          },
        },
        seasontickettypepricedefaults: {
          updateMany: {
            where: {
              tickettypeid_fk: +id,
            },
            data: {
              ...(ticketType.tickettypeid && +ticketType.price !== +price && {price: +price}),
              ...(+ticketType.fee !== +fee && {fee: +fee}),
            },
          },
        },
      },
    });
    return res.status(200).json(updatedType);
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
 *     - bearerAuth: []
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
      return res.status(400).json({error: 'Ticket type not found'});
    } else if (ticketTypeExists.tickettypeid === 0 || ticketTypeExists.tickettypeid === 1) {
      return res.status(400). json({error: `Cannot delete reserved ticket type: ${ticketTypeExists.description}`});
    } else if (ticketTypeExists.ticketrestrictions.length !== 0) {
      const updatedTicketType = await prisma.tickettype.update({
        where: {
          tickettypeid: Number(id),
        },
        data: {
          deprecated: true,
        },
      });
      return res.status(200).json(updatedTicketType);
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
