import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
const stripe = require('stripe')(process.env.PRIVATE_STRIPE_KEY);
const prisma = extendPrismaClient();

export const donationController = Router();

/**
 * Donation checkout through Stripe
 */
donationController.post('/checkout', async (req: Request, res: Response) => {
  const customer = await prisma.contacts.findFirst({
    where: {
      email: req.body.formData.email,
    },
  });
  let customerID: number;
  if (!customer) {
    const newCustomer = await prisma.contacts.create({
      data: {
        firstname: req.body.formData.firstName,
        lastname: req.body.formData.lastName,
        email: req.body.formData.email,
        address: req.body.formData.streetAddress + ' ' + req.body.formData.postalCode,
        phone: req.body.formData.phone,
        seatingaccom: req.body.formData.seatingAcc,
        newsletter: req.body.formData.newsletter,
      },
      select: {
        contactid: true,
      },
    });
    customerID = newCustomer.contactid;
  } else {
    const updatedCustomer = await prisma.contacts.update({
      where: {
        contactid: customer.contactid,
      },
      data: {
        firstname: req.body.formData.firstName,
        lastname: req.body.formData.lastName,
        email: req.body.formData.email,
        address: req.body.formData.streetAddress + ' ' + req.body.formData.postalCode,
        phone: req.body.formData.phone,
        seatingaccom: req.body.formData.seatingAcc,
        newsletter: req.body.formData.newsletter,
      },
      select: {
        contactid: true,
      },
    });
    customerID = updatedCustomer.contactid;
  }
  const lineItems = [
    {
      price_data: {
        unit_amount: req.body.donation * 100,
        currency: 'usd',
        product_data: {
          name: 'Donation',
        },
      },
      quantity: 1,
    },
  ];
  const expire = Math.round((new Date().getTime() + 1799990) / 1000);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    expires_at: expire,
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    metadata: {
      sessionType: '__donation',
      contactID: Number(customerID),
      donation: req.body.donation,
      anonymous: req.body.formData.anonymous,
      comments: req.body.formData.comments,
      firstName: req.body.formData.firstName,
      lastName: req.body.formData.lastName,
    },
  });
  res.status(200).json({id: session.id});
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
    // frequency,
    comments,
    // paymentIntent,
    // refundIntent,
  } = req.query;

  try {
    const donations = await prisma.donations.findMany({
      where: {
        donationid: donationId ? parseInt(donationId as string) : undefined,
        order: {
          contactid_fk: contactId? Number(contactId): undefined,
        },
        anonymous: isAnonymous ? isAnonymous === 'true' : undefined,
        amount: amount ? parseFloat(amount as string) : undefined,
        // frequency: frequency ? frequency as string : undefined,
        comments: comments ? comments as string : undefined,
        // payment_intent: paymentIntent ? paymentIntent as string : undefined,
        // refund_intent: refundIntent ? refundIntent as string : undefined,
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


