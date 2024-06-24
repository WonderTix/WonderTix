import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma, state} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {updateContact, validateContact} from './eventController.service';

const prisma = extendPrismaClient();

export const contactController = Router();


contactController.use(checkJwt);
contactController.use(checkScopes);

/**
 * @swagger
 * /2/contact:
 *   post:
 *     summary: Create a contact
 *     tags:
 *     - New Contact
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Create contact
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/Contact'
 *     responses:
 *       201:
 *         description: Contact created successfully.
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
    const validatedContact = validateContact({
      ...req.body,
      newsletter: !!req.body.newsletter,
    });

    const contact = await updateContact(prisma, validatedContact, 'does_not_exist');

    return res.status(201).json({...contact, newsletter: !!contact.newsletter});
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({error: error.message});
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({error: error.message});
    }

    if (error instanceof Error) {
      return res.status(400).json({error: error.message});
    }

    return res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/contact:
 *   get:
 *     summary: get all contacts
 *     tags:
 *     - New Contact
 *     parameters:
 *     - in: query
 *       name: firstname
 *       schema:
 *         type: string
 *     - in: query
 *       name: lastname
 *       schema:
 *         type: string
 *     - in: query
 *       name: email
 *       schema:
 *         type: string
 *     - in: query
 *       name: address
 *       schema:
 *         type: string
 *     - in: query
 *       name: city
 *       schema:
 *         type: string
 *     - in: query
 *       name: state
 *       schema:
 *         type: string
 *     - in: query
 *       name: country
 *       schema:
 *         type: string
 *     - in: query
 *       name: postalcode
 *       schema:
 *         type: string
 *     - in: query
 *       name: phone
 *       schema:
 *         type: string
 *     - in: query
 *       name: seatingaccom
 *       schema:
 *         type: string
 *     - in: query
 *       name: donorbadge
 *       schema:
 *         type: boolean
 *     - in: query
 *       name: vip
 *       schema:
 *         type: boolean
 *     - in: query
 *       name: volunteerlist
 *       schema:
 *         type: boolean
 *     - in: query
 *       name: newsletter
 *       schema:
 *         type: boolean
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contacts received successfully.
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
    if (req.query.phone) {
      req.query.phone = Array.isArray(req.query.phone) ?
        req.query.phone.map((num) => num.toString().replace(/\D/g, '')):
        [req.query.phone.toString().replace(/\D/g, '')];
    }

    if (req.query.contactid) {
      // @ts-ignore
      req.query.contactid = Array.isArray(req.query.contactid) ?
        req.query.contactid.map((id) => parseInt(id.toString())):
        [Number.parseInt(req.query.contactid.toString())];
    }

    const filters = Object.keys(req.query).flatMap((key) => {
      const currentParameter = Array.isArray(req.query[key])?
        req.query[key] as Array<string | number>:
        [req.query[key]];

      return currentParameter
        .map((param) => ({
          [key]: {
            ...(typeof param === 'string'?
              {contains: param, mode: 'insensitive'}:
              {equals: param}
            ),
          }}));
    });

    const contacts = await prisma.contacts.findMany({
      where: {
        ...(filters.length && {OR: filters}),
      },
      orderBy: [
        {
          firstname: 'asc',
        },
        {
          lastname: 'asc',
        },
      ],
    });

    return res.status(200).json(contacts);
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
 * /2/contact/{id}:
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
    const contact = await prisma.contacts.findUnique({
      where: {
        contactid: Number(id),
      },
    });

    if (!contact) {
      res.status(404).json({error: 'Contact not found'});
      return;
    }

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
 * /2/contact/orders/{id}:
 *   get:
 *     summary: get a contact including orders and donations
 *     tags:
 *     - New Contact
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact got successfully.
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
contactController.get('/orders/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const contact = await prisma.contacts.findUnique({
      where: {
        contactid: Number(id),
      },
      include: {
        orders: {
          where: {
            order_status: state.completed,
            orderitems: {
              some: {},
            },
          },
          orderBy: {
            orderdatetime: 'desc',
          },
          include: {
            orderitems: {
              include: {
                refund: true,
                ticketitem: {
                  include: {
                    ticketrestriction: {
                      include: {
                        tickettype: true,
                        eventinstance: {
                          include: {
                            event: {
                              include: {
                                seasons: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                subscription: {
                  include: {
                    seasonsubscriptiontype: {
                      include: {
                        subscriptiontype: true,
                        season: true,
                      },
                    },
                  },
                },
                donation: true,
              },
            },
          },
        },
      },
    });

    if (!contact) {
      res.status(404).json({error: 'Contact not found'});
      return;
    }

    const {orders, ...remainderOfContact} = contact;
    const flattenedOrders : any[] = [];
    contact.orders.forEach((order) => {
      let flattenedDonation;
      const orderItemsMap = new Map<string, any>();
      const
        completeRefund = order
          .orderitems
          .reduce<boolean>((acc, item) => {
            if (item.ticketitem) {
              const key = `${item.price}T${item.ticketitem.ticketrestriction.eventinstanceid_fk}T${item.ticketitem.ticketrestriction.tickettypeid_fk}T${item.department}`;
              const current = orderItemsMap.get(key);
              if (current) {
                current.quantity += 1;
                current.refunded += item.refund? 1: 0;
              } else {
                orderItemsMap.set(key,
                  {
                    price: item.price,
                    fee: item.fee,
                    refunded: item.refund? 1: 0,
                    redeemed: item.ticketitem.redeemed,
                    donated: item.ticketitem.donated,
                    description: item.ticketitem.ticketrestriction.eventinstance.event.eventdescription,
                    department: item.department,
                    eventdate: item.ticketitem.ticketrestriction.eventinstance.eventdate,
                    eventtime: item.ticketitem.ticketrestriction.eventinstance.eventtime,
                    eventname: item.ticketitem.ticketrestriction.eventinstance.event.eventname,
                    detail: item.ticketitem.ticketrestriction.eventinstance.detail,
                    seasonname: item.ticketitem.ticketrestriction.eventinstance.event.seasons?.name,
                    tickettype: item.ticketitem.ticketrestriction.tickettype.description,
                    quantity: 1,
                  });
              }
            } else if (item.subscription) {
              const key = `${item.price}S${item.subscription.subscriptiontypeid_fk}S${item.subscription.seasonid_fk}S${item.department}`;
              const current = orderItemsMap.get(key);
              if (current) {
                current.quantity += 1;
                current.refunded += item.refund? 1: 0;
              } else {
                orderItemsMap.set(key, {
                  id: item.id,
                  price: item.price,
                  refunded: item.refund? 1: 0,
                  subscriptionType: item.subscription.seasonsubscriptiontype.subscriptiontype.name,
                  seasonName: item.subscription.seasonsubscriptiontype.season.name,
                  ticketlimit: item.subscription.seasonsubscriptiontype.ticketlimit,
                  quantity: 1,
                });
              }
            } else if (item.donation) {
              flattenedDonation = {
                donationid: item.donation.donationid,
                anonymous: item.donation.anonymous,
                amount: item.price,
                frequency: item.donation.frequency,
                comments: item.donation.comments,
                refunded: !!item.refund,
              };
            }
            return acc && item.refund !== null;
          }, true);

      flattenedOrders.push({
        orderid: order.orderid,
        orderdatetime: order.orderdatetime,
        order_source: order.order_source,
        ordertotal: Number(order.ordersubtotal) + Number(order.feetotal) - Number(order.discounttotal),
        feetotal: order.feetotal,
        discounttotal: order.discounttotal,
        refunded: completeRefund,
        orderitems: [...orderItemsMap.values()],
        donation: flattenedDonation,
      });
    });

    const toReturn = {
      ...remainderOfContact,
      orders: flattenedOrders,
    };

    return res.status(200).json(toReturn);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({error: error.message});
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({error: error.message});
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/contact/{id}:
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
    const validatedContact= validateContact({
      ...req.body,
      newsletter: !!req.body.newsletter,
    });

    await updateContact(prisma, validatedContact, 'exists', +id);

    return res.status(204).json();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({error: error.message});
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({error: error.message});
    }

    if (error instanceof Error) {
      return res.status(400).json({error: error.message});
    }

    return res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/contact/{id}:
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

    await prisma.contacts.delete({
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
