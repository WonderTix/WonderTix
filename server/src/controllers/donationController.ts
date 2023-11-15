import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const stripe = require('stripe')(process.env.PRIVATE_STRIPE_KEY);
const endpointSecret = process.env.PRIVATE_STRIPE_WEBHOOK;
const prisma = extendPrismaClient();

export const donationController = Router();

/**
 * @swagger
 * /2/donation/webhook:
 *   post:
 *     summary: Stripe webhook endpoint
 *     tags:
 *     - Donation
 *     requestBody:
 *       description: Stripe webhook event
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StripeWebhook'
 *     responses:
 *       200:
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
donationController.post('/webhook', async (req: Request, res: Response) => {
  try {
    let event = req.body;
    if (endpointSecret) {
      const signature = req.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            endpointSecret,
        );
      } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
      }
    }
    switch (event.type) {
      case 'payment_intent.created':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!');
        console.log(paymentIntent);
        break;
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        console.log('PaymentIntent was successful!');
        console.log(paymentIntentSucceeded);
        break;
      case 'charge.succeeded':
        const charge = event.data.object;
        console.log('Charge was successful!');
        console.log(charge);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log('PaymentMethod was attached to a Customer!');
        console.log(paymentMethod);
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }
    res.json({received: true});
  } catch (err: any) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

/**
 * @swagger
 * /2/donation:
 *   post:
 *     summary: Create a donation
 *     tags:
 *     - Donation
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
 *     - Donation
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
 *     summary: search for donations
 *     tags:
 *     - Donation
 *     parameters:
 *       - in: query
 *         name: donationId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: contactId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: isAnonymous
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: frequency
 *         schema:
 *           type: string
 *       - in: query
 *         name: comments
 *         schema:
 *           type: string
 *       - in: query
 *         name: paymentIntent
 *         schema:
 *           type: string
 *       - in: query
 *         name: refundIntent
 *         schema:
 *           type: string
 *       - in: query
 *         name: donationDate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: donation(s) found successfully.
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
donationController.get('/search', async (req: Request, res: Response) => {
  const {
    donationId,
    contactId,
    isAnonymous,
    amount,
    name,
    // frequency,
    comments,
    // paymentIntent,
    // refundIntent,
    donationDate,
  } = req.query;

  try {
    const donations = await prisma.donations.findMany({
      where: {
        donationid: donationId ? parseInt(donationId as string) : undefined,
        contactid_fk: contactId ? parseInt(contactId as string) : undefined,
        isanonymous: isAnonymous ? isAnonymous === 'true' : undefined,
        amount: amount ? parseFloat(amount as string) : undefined,
        donorname: name ? name as string : undefined,
        // frequency: frequency ? frequency as string : undefined,
        comments: comments ? comments as string : undefined,
        // payment_intent: paymentIntent ? paymentIntent as string : undefined,
        // refund_intent: refundIntent ? refundIntent as string : undefined,
        donationdate: donationDate ? parseInt(donationDate as string) : undefined,
      },
    });

    res.status(200).json(donations);
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
 *     - Donation
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
 *     - Donation
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
 *     - Donation
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
 *     - Donation
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

