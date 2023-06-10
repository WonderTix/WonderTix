import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const contactController = Router();

/**
 * @swagger
 * /api2/contact:
 *   post:
 *     summary: Create a contact
 *     tags:
 *     - Contact
 *     requestBody:
 *       description: Updated contact information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Contact'
 *     responses:
 *       201:
 *         description: Contact updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
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
contactController.post('/', async (req: Request, res: Response) => {
  try {
    const contact = prisma.contacts.create({
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        donorbadge: req.body.donorbadge,
        seatingaccom: req.body.seatingaccom,
        vip: req.body.vip,
        volunteerlist: req.body.volunteerlist,
        newsletter: req.body.newsletter,
      },
    });
    res.status(201).json(contact);

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

contactController.use(checkJwt);
contactController.use(checkScopes);

/**
 * @swagger
 * /api2/contact:
 *   get:
 *     summary: get all contacts
 *     tags:
 *     - Contact
 *     responses:
 *       200:
 *         description: Contact updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Contact'
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
contactController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.firstname) {
      filters.firstname = {
        contains: req.params.firstname,
      };
    }
    if (req.params.lastname) {
      filters.lastname = {
        contains: req.params.lastname,
      };
    }
    if (req.params.email) {
      filters.email = {
        contains: req.params.email,
      };
    }
    if (req.params.address) {
      filters.address = {
        contains: req.params.address,
      };
    }
    if (req.params.phone) {
      filters.phone = {
        contains: req.params.phone,
      };
    }
    if (req.params.donorbadge) {
      filters.donorbadge = {
        equals: req.params.donorbadge,
      };
    }
    if (req.params.seatingaccom) {
      filters.seatingaccom = {
        equals: req.params.seatingaccom,
      };
    }
    if (req.params.vip) {
      filters.vip = {
        equals: req.params.vip,
      };
    }
    if (req.params.volunteerlist) {
      filters.volunteerlist = {
        equals: req.params.volunteerlist,
      };
    }
    if (req.params.newsletter) {
      filters.newsletter = {
        equals: req.params.newsletter,
      };
    }

    if (Object.keys(filters).length > 0) {
      const contacts = await prisma.contacts.findMany({
        where: filters,
      });
      res.status(200).json(contacts);

      return;
    }

    const contacts = await prisma.contacts.findMany();
    res.status(200).json(contacts);

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
 * /contact/{id}:
 *   get:
 *     summary: get a contact
 *     tags:
 *     - New Contact
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
contactController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const contactExists = await prisma.contacts.findUnique({
      where: {
        contactid: Number(id),
      },
    });
    if (!contactExists) {
      res.status(404).json({error: 'Contact not found'});

      return;
    }
    const contact = await prisma.contacts.findUnique({
      where: {
        contactid: Number(id),
      },
    });
    res.status(200).json(contact);

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
 * /contact/{id}:
 *   put:
 *     summary: update a contact
 *     tags:
 *     - New Contact
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated contact information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Contact'
 *     responses:
 *       204:
 *         description: Contact updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
contactController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const contact = prisma.contacts.update({
      where: {
        contactid: Number(id),
      },
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        donorbadge: req.body.donorbadge,
        seatingaccom: req.body.seatingaccom,
        vip: req.body.vip,
        volunteerlist: req.body.volunteerlist,
        newsletter: req.body.newsletter,
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
 * /contact/{id}:
 *   delete:
 *     summary: delete a contact
 *     tags:
 *     - New Contact
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Contact updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
contactController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const contactExists = await prisma.contacts.findUnique({
      where: {
        contactid: Number(id),
      },
    });
    if (!contactExists) {
      res.status(404).json({error: 'Contact not found'});

      return;
    }
    const contact = prisma.contacts.delete({
      where: {
        contactid: Number(id),
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
