import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export const donationController = Router();

/**
 * @swagger
 * /2/donation:
 *   post:
 *     summary: Create a donation
 *     tags:
 *     - New donation
 *     requestBody:
 *       description: Updated donation information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Donation'
 *     responses:
 *       201:
 *         description: donation updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donation'
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
donationController.post('/', async (req: Request, res: Response) => {
  try {
    const donation = prisma.donations.create({
      data: {
        contactid_fk: req.body.contact,
        isanonymous: req.body.isanonymous,
        amount: req.body.amount,
        donorname: req.body.donorname,
        frequency: req.body.frequency,
        comments: req.body.comments,
        payment_intent: req.body.payment_intent,
        refund_intent: req.body.refund_intent,
        donationdate: req.body.donationdate,
      },
    });
    res.status(201).json(donation);

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

donationController.use(checkJwt);
donationController.use(checkScopes);

/**
 * @swagger
 * /2/donation:
 *   get:
 *     summary: get all donations
 *     tags:
 *     - New donation
 *     responses:
 *       200:
 *         description: donation updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Donation'
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
donationController.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.params.contact) {
      filters.contactid_fk = {
        equals: req.params.contact,
      };
    }
    if (req.params.isanonymous) {
      filters.isanonymous = {
        equals: req.params.isanonymous,
      };
    }
    if (req.params.donorname) {
      filters.donorname = {
        contains: req.params.donorname,
      };
    }
    if (req.params.frequency) {
      filters.frequency = {
        contains: req.params.frequency,
      };
    }
    if (req.params.comments) {
      filters.comments = {
        contains: req.params.comments,
      };
    }
    if (req.params.payment_intent) {
      filters.payment_intent = {
        contains: req.params.payment_intent,
      };
    }
    if (req.params.refund_intent) {
      filters.refund_intent = {
        contains: req.params.refund_intent,
      };
    }
    if (req.params.donationdate) {
      filters.donationdate = {
        contains: req.params.donationdate,
      };
    }

    if (Object.keys(filters).length > 0) {
      const donations = await prisma.donations.findMany({
        where: filters,
      });
      res.status(200).json(donations);

      return;
    }

    const donations = await prisma.donations.findMany();
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

/**
 * @swagger
 * /2/donation/search:
 *   get:
 *     summary: Search for donations by donor name
 *     description: Retrieve donation info based on donor name
 *     parameters:
 *       - in: query
 *         name: donorname
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the donor to search for
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The donation info for the donor name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Donation'
 *       404:
 *         description: The donation was not found for the given donor name
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 *     tags:
 *      - Donation
 */
donationController.get('/search', async (req: Request, res: Response) => {
  try {
    const donorname = req.query.donorname as string;
    const donations = await prisma.donations.findMany({
      where: {
        donorname: {
          contains: donorname,
        },
      },
    });
    if (donations.length > 0) {
      res.status(200).json(donations);

      return;
    }

    res.status(404).json({error: 'Not Found'});

    return;
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/donation/{id}:
 *   get:
 *     summary: get a donation
 *     tags:
 *     - New donation
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: donation updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donation'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
donationController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.donationid;
    const donationExists = await prisma.donations.findUnique({
      where: {
        donationid: Number(id),
      },
    });
    if (!donationExists) {
      res.status(404).json({error: 'donation not found'});

      return;
    }
    const donation = await prisma.donations.findUnique({
      where: {
        donationid: Number(id),
      },
    });
    res.status(200).json(donation);

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
 * /2/donation/{donationdate}:
 *   get:
 *     summary: Get a donation by donation date.
 *     description: Retrieve a donation based on the date it was made.
 *     parameters:
 *       - in: path
 *         name: donationDate
 *         schema:
 *           type: integer
 *         required: true
 *         description: The donation date of the donation to search for
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *      description: The donation info for the donation date
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                  message:
 *                    type: string
 *              data:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Donation'
 *    404:
 *      description: The donation was not found for the given donation date
 *    500:
 *      description: Internal Server Error. An error occurred while processing the request.
 * tags:
 *   - Donation
 */
donationController.get(
    '/:donationdate',
    async (req: Request, res: Response) => {
      try {
        const donationDate = req.params.donationdate;
        const donationID = res.locals.donationid;
        const donation = await prisma.donations.findUnique({
          where: {
            donationdate: Number(donationDate),
            donationid: Number(donationID),
          },
        });
        if (!donation) {
          res.status(404).json({error: 'Not Found'});

          return;
        }

        res.status(200).json(donation);

        return;
      } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
      }
    },
);

/**
 * @swagger
 *   delete:
 *     summary: delete a donation by ID
 *     description: delete a single donation based on the provided id
 *     parameters:
 *       - in: path
 *         name: donationId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The donation id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The donation was deleted
 *       404:
 *         description: The donation was not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 *     tags:
 *       - Donations
 */
donationController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const donationExists = await prisma.donations.findUnique({
      where: {
        donationid: Number(id),
      },
    });
    if (!donationExists) {
      res.status(404).json({error: 'donation not found'});

      return;
    }
    await prisma.donations.delete({
      where: {
        donationid: Number(id),
      },
    });
    res.status(200).json({success: 'donation deleted'});

    return;
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/donation/{id}:
 *   put:
 *     summary: update a donation
 *     tags:
 *     - New donation
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated donation information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Donation'
 *     responses:
 *       204:
 *         description: donation updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
donationController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const donation = prisma.donations.update({
      where: {
        donationid: Number(id),
      },
      data: {
        contactid_fk: req.body.contact,
        isanonymous: req.body.isanonymous,
        amount: req.body.amount,
        donorname: req.body.donorname,
        frequency: req.body.frequency,
        comments: req.body.comments,
        payment_intent: req.body.payment_intent,
        refund_intent: req.body.refund_intent,
        donationdate: req.body.donationdate,
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
 * /2/donation/{id}:
 *   delete:
 *     summary: delete a donation
 *     tags:
 *     - New donation
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: donation updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: donation not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
donationController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const donationExists = await prisma.donations.findUnique({
      where: {
        donationid: Number(id),
      },
    });
    if (!donationExists) {
      res.status(404).json({error: 'donation not found'});

      return;
    }
    const donation = prisma.donations.delete({
      where: {
        donationid: Number(id),
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
