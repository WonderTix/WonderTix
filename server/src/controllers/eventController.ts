import {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {orders, Prisma} from '@prisma/client';
import {InvalidInputError} from './eventInstanceController.service';
import {
  createStripeCheckoutSession,
  expireCheckoutSession,
  getDonationItem,
  getTicketItems,
  getDiscountAmount,
  updateContact,
  validateDiscount,
  validateWithRegex,
} from './eventController.service';
import {updateCanceledOrder, orderFulfillment} from './orderController.service';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {isBooleanString} from 'class-validator';
const prisma = extendPrismaClient();

import multer from 'multer';
import {Storage} from '@google-cloud/storage';

const upload = multer();

const storage = new Storage({keyFilename: `./wondertix-app-8073f86fc7d4.json`});
const imgBucket = storage.bucket(`image-upload-wondertix-local`);

export const eventController = Router();

/**
 * @swagger
 * /2/events/checkout:
 *   post:
 *     summary: Update contact information, create order, create Stripe checkout session
 *     tags:
 *     - New Event API
 *     requestBody:
 *       description: Checkout information
 *     responses:
 *       200:
 *         description: Contact, order, and Stripe session successfully created.
 *         content:
 *           application/json:
 *             schema: {id: number}
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
 *       422:
 *          description: invalid input
 *          content:
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
eventController.post('/checkout', async (req: Request, res: Response) => {
  const {cartItems = [], formData, donation = 0, discount} = req.body;
  let order :orders | null = null;
  let toSend = {id: 'comp'};
  try {
    if (!cartItems.length && !donation) {
      return res.status(400).json({error: 'Cart is empty'});
    }

    if (discount.code != '') {
      await validateDiscount(discount, cartItems, prisma);
    }

    const {contactid} = await updateContact(formData, prisma);

    const {
      ticketCartRows,
      orderTicketItems,
      ticketTotal,
      eventInstanceQueries,
    } = await getTicketItems(cartItems, prisma);

    const {
      donationItem,
      donationCartRow,
      donationTotal,
    } = getDonationItem(donation);

    const discountAmount = discount.code != ''? getDiscountAmount(discount, ticketTotal): 0;

    if (ticketTotal + donationTotal - discountAmount > .49) {
      toSend = await createStripeCheckoutSession(
          contactid,
          formData.email,
          donationCartRow? ticketCartRows.concat([donationCartRow]): ticketCartRows,
          {...discount, amountOff: discountAmount},
      );
    } else if (ticketTotal + donationTotal - discountAmount > 0) {
      return res.status(400).json({error: 'Cart Total must either be $0.00 USD or greater than $0.49 USD'});
    }

    order = await orderFulfillment(
        prisma,
        contactid,
        eventInstanceQueries,
        toSend.id,
        ticketTotal+donationTotal,
        discountAmount,
        {
          orderTicketItems,
          donationItem,
        },
        discount.code != '' ? discount.discountid : null,
    );

    if (toSend.id === 'comp') {
      await prisma.orders.update({
        where: {
          orderid: order.orderid,
        },
        data: {
          checkout_sessions: `comp-${order.orderid}`,
          payment_intent: `comp-${order.orderid}`,
        },
      });
    }

    res.json(toSend);
  } catch (error) {
    console.error(error);
    if (order) await updateCanceledOrder(prisma, order);
    if (toSend.id !== 'comp') await expireCheckoutSession(toSend.id);
    if (error instanceof InvalidInputError) {
      res.status(error.code).json(error.message);
      return;
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientValidationError
    ) {
      res.status(400).json(error.message);
      return;
    }
    res.status(500).json(error);
  }
});

/**
 * @swagger
 * /2/events/image-upload:
 *   post:
 *     summary: Upload image to google cloud storage, make public, return link
 *     tags:
 *     - New Event API
  *     requestBody:
 *       description: Image File
 *     responses:
 *       200:
 *         description: Image successfully uploaded.
 *         content:
 *           application/json:
 *             schema: {url: string}
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

eventController.post('/image-upload', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file passed to request!');
  }

  try {
    validateWithRegex(
      req.file.mimetype,
      'Invalid input, not a valid image filetype!', 
      new RegExp('^(image\/(jpe?g|png))')
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  const file = imgBucket.file(req.file.originalname);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
    resumable: false,
  });

  stream.on('error', (err) => {
    console.log(err);
    return res.status(500).send('Upload failed!');
  })

  stream.on('finish', async () => {
    await file.makePublic();
    const url = `https://storage.googleapis.com/image-upload-wondertix-local/${file.name}`;
    return res.status(200).send({url});
  })

  stream.end(req.file.buffer);
});

/**
 * @swagger
 * /2/events/showings:
 *   get:
 *     summary: get all events including showings
 *     tags:
 *     - New Event API
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: fetch successful
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.get('/showings', async (req: Request, res: Response) => {
  try {
    const events = await prisma.events.findMany({
      include: {
        eventinstances: {
          include: {
            ticketrestrictions: {
              where: {
                deletedat: null,
              },
            },
          },
        },
        seasons: true,
      },
    });

    return res.json(events);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});
      return;
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/events/slice:
 *   get:
 *     summary: get all active events in form needed by slice
 *     tags:
 *     - New Event API
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event fetch successful
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.get('/slice', async (req: Request, res: Response) => {
  try {
    const events = await prisma.events.findMany({
      where: {
        active: true,
        eventinstances: {
          some: {
            deletedat: null,
            availableseats: {gt: 0},
            salestatus: true,
            ticketrestrictions: {
              some: {
                deletedat: null,
              },
            },
          },
        },
      },
      orderBy: {
        eventid: 'asc',
      },
      include: {
        eventinstances: {
          where: {
            availableseats: {gt: 0},
            salestatus: true,
          },
          include: {
            ticketrestrictions: {
              where: {
                deletedat: null,
              },
              include: {
                ticketitems: {
                  where: {
                    orderticketitem: {
                      refund: null,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return res.json(events
        .filter((event) => event.eventinstances.filter((instance) => instance.ticketrestrictions.filter((res) => res.ticketlimit > res.ticketitems.length).length).length)
        .map((event) => ({
          id: event.eventid,
          seasonid: event.seasonid_fk,
          title: event.eventname,
          description: event.eventdescription,
          active: event.active,
          seasonticketeligible: event.seasonticketeligible,
          imageurl: event.imageurl,
          numShows: event.eventinstances.length.toString(),
        })));
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});
      return;
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/events:
 *   get:
 *     summary: get all events not including showings
 *     tags:
 *     - New Event API
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event fetch successful
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.get('/', async (req: Request, res: Response) => {
  try {
    const events = await prisma.events.findMany({
      include: {
        seasons: true,
      },
    });
    return res.json(events);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});
      return;
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/events/showings/{id}:
 *   get:
 *     summary: get an event include showings
 *     tags:
 *     - New Event API
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.get('/showings/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const eventExists = await prisma.events.findUnique({
      where: {
        eventid: Number(id),
      },
      include: {
        eventinstances: {
          include: {
            ticketrestrictions: {
              where: {
                deletedat: null,
              },
            },
          },
        },
        seasons: true,
      },
    });

    if (!eventExists) {
      return res.status(400).json({error: `Event ${id} not found`});
    }

    res.status(200).json(eventExists);
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
 * /2/events/active:
 *   get:
 *     summary: get all active events not including showings
 *     tags:
 *     - New Event API
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.get('/active', async (req: Request, res: Response) => {
  try {
    const activeEvents = await prisma.events.findMany({
      where: {
        active: true,
      },
      include: {
        seasons: true,
      },
    });
    res.json(activeEvents);
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
 * /2/events/active/showings:
 *   get:
 *     summary: get all active events including showings
 *     tags:
 *     - New Event API
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event fetch successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.get('/active/showings', async (req: Request, res: Response) => {
  try {
    const activeEvents = await prisma.events.findMany({
      where: {
        active: true,
      },
      include: {
        eventinstances: {
          include: {
            ticketrestrictions: {
              where: {
                deletedat: null,
              },
            },
          },
        },
        seasons: true,
      },
    });

    return res.json(activeEvents);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});
      return;
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/events/inactive:
 *   get:
 *     summary: get all inactive events not including showings
 *     tags:
 *     - New Event API
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event fetch successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.get('/inactive', async (req: Request, res: Response) => {
  try {
    const inactiveEvents = await prisma.events.findMany({
      where: {
        active: false,
      },
      include: {
        seasons: true,
      },
    });
    return res.json(inactiveEvents);
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
 * /2/events/inactive/showings:
 *   get:
 *     summary: get all inactive events include showings
 *     tags:
 *     - New Event API
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event fetch successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.get(
    '/inactive/showings',
    async (req: Request, res: Response) => {
      try {
        const inactiveEvents = await prisma.events.findMany({
          where: {
            active: false,
          },
          include: {
            eventinstances: {
              include: {
                ticketrestrictions: {
                  where: {
                    deletedat: null,
                  },
                },
              },
            },
            seasons: true,
          },
        });
        return res.json(inactiveEvents);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          res.status(400).json({error: error.message});
          return;
        }
        if (error instanceof Prisma.PrismaClientValidationError) {
          res.status(400).json({error: error.message});
          return;
        }
        return res.status(500).json({error: 'Internal Server Error'});
      }
    },
);

/**
 * @swagger
 * /2/events/season/{id}:
 *   get:
 *     summary: get all events associated with a season id
 *     tags:
 *     - New Event API
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event fetch successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.get('/season/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const events = await prisma.events.findMany({
      where: {
        seasonid_fk: id,
      },
      include: {
        seasons: true,
      },
    });
    return res.json(events);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});
      return;
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/events/search:
 *   get:
 *     summary: Search events by name
 *     tags:
 *     - New Event API
 *     parameters:
 *       - in: query
 *         name: event_name
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of event IDs and names matching the provided event name
 *       400:
 *         description: bad request
 *       500:
 *         description: An error occurred while processing the request
 */
eventController.get('/search', async (req: Request, res: Response) => {
  try {
    const name = req.query.event_name;
    if (!name || typeof name !== 'string') {
      return res.status(400).send('No Event name provided.');
    }

    const events = await prisma.events.findMany({
      where: {
        eventname: name,
      },
      include: {
        seasons: true,
      },
    });
    return res.json(events);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});
      return;
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/events/{id}:
 *   get:
 *     summary: get an event do not include showings
 *     tags:
 *     - New Event API
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event fetch successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const eventExists = await prisma.events.findUnique({
      where: {
        eventid: Number(id),
      },
      include: {
        seasons: true,
      },
    });
    if (!eventExists) {
      res.status(400).json({error: `Event ${id} not found`});
      return;
    }
    res.status(200).json(eventExists);
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
// All further routes require authentication
eventController.use(checkJwt);
eventController.use(checkScopes);

/**
 * @swagger
 * /2/events:
 *   post:
 *     summary: Create an event
 *     tags:
 *     - New Event API
 *     requestBody:
 *       description: New event information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Event'
 *     responses:
 *       201:
 *         description: event created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
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
 *       422:
 *         description: invalid input
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
eventController.post('/', async (req: Request, res: Response) => {
  try {
    const event = await prisma.events.create({
      data: {
        seasonid_fk: req.body.seasonid_fk === null ? null : Number(req.body.seasonid_fk),
        eventname: req.body.eventname,
        eventdescription: req.body.eventdescription,
        active: req.body.active,
        seasonticketeligible: req.body.seasonticketeligible,
        imageurl: req.body.imageurl,
      },
      include: {
        seasons: true,
      },
    });
    res.status(201).json(event);
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
 * /2/events:
 *   put:
 *     summary: update an event
 *     tags:
 *     - New Event API
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated event information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Event'
 *     responses:
 *       200:
 *         description: event updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       422:
 *         description: invalid input
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.put('/', async (req: Request, res: Response) => {
  try {
    const event = await prisma.events.update({
      where: {
        eventid: Number(req.body.eventid),
      },
      data: {
        seasonid_fk: !req.body.seasonid_fk? null : Number(req.body.seasonid_fk),
        eventname: req.body.eventname,
        eventdescription: req.body.eventdescription,
        active: req.body.active,
        seasonticketeligible: req.body.seasonticketeligible,
        imageurl: req.body.imageurl,
      },
      include: {
        eventinstances: {
          include: {
            ticketrestrictions: true,
          },
        },
        seasons: {
          include: {
            seasontickettypepricedefaults: true,
          },
        },
      },
    });

    if (!event) {
      return res.status(400).json({error: `Event ${req.body.eventid} not found`});
    }

    await prisma.$transaction((event.seasons?.seasontickettypepricedefaults.map((defaultP) =>
      prisma.ticketrestrictions.updateMany({
        where: {
          tickettypeid_fk: defaultP.tickettypeid_fk,
          eventinstance: {
            eventid_fk: +req.body.eventid,
          },
        },
        data: {
          seasontickettypepricedefaultid_fk: defaultP.id,
        },
      }),
    ) ?? []).concat([prisma.ticketrestrictions.updateMany({
      where: {
        tickettypeid_fk: {notIn: event.seasons?.seasontickettypepricedefaults.map((res) => res.tickettypeid_fk)},
        eventinstance: {
          eventid_fk: +req.body.eventid,
        },
      },
      data: {
        seasontickettypepricedefaultid_fk: null,
      },
    })]));

    return res.status(200).json(event);
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
 * /2/events/recover/{id}:
 *   put:
 *     summary: update an event
 *     tags:
 *     - New Event API
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.put('/recover/:id', async (req: Request, res: Response) => {
  try {
    const event = await prisma.events.restore(Number(req.params.id));
    return res.status(200).json(event);
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
 * /2/events/active/{id}/{updatedStatus}:
 *   put:
 *     summary: update an event's active status
 *     tags:
 *     - New Event API
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     - $ref: '#/components/parameters/updatedStatus'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: event updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.put(
    '/active/:id/:updatedStatus',
    async (req: Request, res: Response) => {
      try {
        const {id, updatedStatus} = req.params;

        if (!isBooleanString(updatedStatus)) {
          return res
              .status(422)
              .json({error: `Invalid status: ${updatedStatus}`});
        }

        const updatedEvent = await prisma.events.update({
          where: {
            eventid: Number(id),
          },
          data: {
            active: updatedStatus === 'true',
          },
          include: {
            seasons: true,
          },
        });
        if (!updatedEvent) {
          return res.status(400).json({error: `Event ${id} not found`});
        }
        return res.json(updatedEvent);
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
    },
);

/**
 * @swagger
 * /2/events/{id}:
 *   delete:
 *     summary: delete an event
 *     tags:
 *     - New Event API
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: deleted successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedEvent = await prisma.events.softDelete(Number(id));
    if (!deletedEvent) {
      return res.status(400).json({error: `Event ${id} not found`});
    }
    return res.status(204).json('Event successfully deleted');
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
 * /2/events/checkin:
 *   put:
 *     summary: update eventticket status
 *     tags:
 *     - New Event API
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: event ticket status
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/CheckIn'
 *     responses:
 *       200:
 *         description: event ticket updated successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       422:
 *         description: invalid input
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
eventController.put('/checkin', async (req: Request, res: Response) => {
  try {
    const {instanceId, isCheckedIn, contactId} = req.body;
    if (!instanceId || !contactId) {
      return res.status(400).send('Invalid request');
    }

    await prisma.ticketitems.updateMany({
      where: {
        ticketrestriction: {
          eventinstanceid_fk: +instanceId,
        },
        orderticketitem: {
          refund: null,
          order: {
            contactid_fk: +contactId,
          },
        },
      },
      data: {
        redeemed: isCheckedIn? new Date(): null,
      },
    });

    return res.send();
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
