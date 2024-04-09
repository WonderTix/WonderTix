import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

const prisma = extendPrismaClient();

export const contactController = Router();

/**
 * @swagger
 * /2/contact:
 *   post:
 *     summary: Create a contact
 *     tags:
 *     - New Contact
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
    const contact = await prisma.contacts.create({
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        visitsource: req.body.visitsource,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        postalcode: req.body.postalcode,
        donorbadge: req.body.donorbadge,
        seatingaccom: req.body.seatingaccom,
        comments: req.body.comments,
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
    return;
  }
});

contactController.use(checkJwt);
contactController.use(checkScopes);

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
    const filters: any = [];
    if (req.query.firstname) {
      filters.push({
        firstname: {
          equals: req.query.firstname,
          mode: 'insensitive',
        },
      });
    }
    if (req.query.lastname) {
      filters.push({
        lastname: {
          equals: req.query.lastname,
          mode: 'insensitive',
        },
      });
    }
    if (req.query.email) {
      filters.push({
        email: {
          equals: req.query.email,
          mode: 'insensitive',
        },
      });
    }
    if (req.query.address) {
      filters.push({
        address: {
          equals: req.query.address,
          mode: 'insensitive',
        },
      });
    }
    if (req.query.city) {
      filters.push({
        city: {
          equals: req.query.city,
          mode: 'insensitive',
        },
      });
    }
    if (req.query.state) {
      filters.push({
        state: {
          equals: req.query.state,
          mode: 'insensitive',
        },
      });
    }
    if (req.query.country) {
      filters.push({
        country: {
          equals: req.query.country,
          mode: 'insensitive',
        },
      });
    }
    if (req.query.postalcode) {
      filters.push({
        postalcode: {
          equals: req.query.postalcode,
        },
      });
    }
    if (req.query.phone) {
      filters.push({
        phone: {
          equals: req.query.phone,
        },
      });
    }

    if (req.query.visitSource) {
      filters.push({
        visitSource: {
          equals: req.query.visitSource,
        },
      });
    }

    if (req.query.seatingaccom) {
      filters.push({
        seatingaccom: {
          contains: req.query.seatingaccom,
          mode: 'insensitive',
        },
      });

    }
    if (req.query.donorbadge) {
      filters.push({
        donorbadge: {
          equals: (req.query.donorbadge === 'true'),
        },
      });
    }
    if (req.query.vip) {
      filters.push({
        vip: {
          equals: (req.query.vip === 'true'),
        },
      });
    }
    if (req.query.volunteerlist) {
      filters.push({
        volunteerlist: {
          equals: (req.query.volunteerlist === 'true'),
        },
      });
    }
    if (req.query.newsletter) {
      filters.push({
        newsletter: {
          equals: (req.query.newsletter === 'true'),
        },
      });
    }

    if (filters.length > 0) {
      const contacts = await prisma.contacts.findMany({
        where: {
          OR: filters,
        },
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
            payment_intent: {not: null},
          },
          orderBy: {
            orderdatetime: 'desc',
          },
          include: {
            orderticketitems: {
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
              },
            },
            subscriptions: {
              include: {
                refund: true,
                seasonsubscriptiontype: {
                  include: {
                    subscriptiontype: true,
                    season: true,
                  },
                },
                subscriptionticketitems: {
                  include: {
                    ticketitem: true,
                  },
                },
              },
            },
            donation: {
              include: {
                refund: true,
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
      const orderItemsMap = new Map<string, any>();
      const
        ticketItemsRefunded = order
            .orderticketitems
            .reduce<boolean>((acc, ticket) => {
              if (!ticket.ticketitem) return acc;
              const key = `${ticket.price}T${ticket.ticketitem.ticketrestriction.eventinstanceid_fk}T${ticket.ticketitem.ticketrestriction.tickettypeid_fk}`;
              const item = orderItemsMap.get(key);
              if (item) {
                item.quantity += 1;
              } else {
                orderItemsMap.set(key,
                    {
                      price: ticket.price,
                      fee: ticket.fee,
                      refunded: ticket.refund !== null,
                      redeemed: ticket.ticketitem.redeemed,
                      donated: ticket.ticketitem.donated,
                      description: ticket.ticketitem.ticketrestriction.eventinstance.event.eventdescription,
                      eventdate: ticket.ticketitem.ticketrestriction.eventinstance.eventdate,
                      eventtime: ticket.ticketitem.ticketrestriction.eventinstance.eventtime,
                      eventname: ticket.ticketitem.ticketrestriction.eventinstance.event.eventname,
                      detail: ticket.ticketitem.ticketrestriction.eventinstance.detail,
                      seasonname: ticket.ticketitem.ticketrestriction.eventinstance.event.seasons?.name,
                      tickettype: ticket.ticketitem.ticketrestriction.tickettype.description,
                      quantity: 1,
                    });
              }
              return acc && ticket.refund !== null;
            }, true);

      const subscriptionItemsRefunded = order.subscriptions.reduce<boolean>(
          (acc, sub) => {
            const key = `${sub.price}S${sub.subscriptiontypeid_fk}S${sub.seasonid_fk}`;
            const item = orderItemsMap.get(key);
            if (item) {
              item.quantity += 1;
            } else {
              orderItemsMap.set(key, {
                id: sub.id,
                price: sub.price,
                refunded: sub.refund !== null,
                subscriptionType: sub.seasonsubscriptiontype.subscriptiontype.name,
                seasonName: sub.seasonsubscriptiontype.season.name,
                ticketlimit: sub.seasonsubscriptiontype.ticketlimit,
                quantity: 1,
              });
            }
            return acc && sub.refund !== null;
          },
          true,
      );

      const flattenedDonation = {
        donationid: order.donation?.donationid,
        anonymous: order.donation?.anonymous,
        amount: order.donation?.amount,
        frequency: order.donation?.frequency,
        comments: order.donation?.comments,
        refunded: order.donation?.refund !== null,
      };

      flattenedOrders.push({
        orderid: order.orderid,
        orderdatetime: order.orderdatetime,
        ordertotal: Number(order.ordersubtotal) + Number(order.feetotal) - Number(order.discounttotal),
        feetotal: order.feetotal,
        discounttotal: order.discounttotal,
        refunded: ticketItemsRefunded && subscriptionItemsRefunded,
        orderitems: [...orderItemsMap.values()],
        donation: order.donation ? flattenedDonation : null,
      });
    });

    const toReturn = {
      ...remainderOfContact,
      orders: flattenedOrders,
    };

    res.status(200).json(toReturn);
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
    await prisma.contacts.update({
      where: {
        contactid: Number(id),
      },
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        visitsource: req.body.visitsource,
        city: req.body.city,
        state: req.body.state,
        postalcode: req.body.postalcode,
        country: req.body.country,
        donorbadge: req.body.donorbadge,
        seatingaccom: req.body.seatingaccom,
        comments: req.body.comments,
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
