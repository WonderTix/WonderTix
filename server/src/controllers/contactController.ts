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
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        postalcode: req.body.postalcode,
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
    if (req.params.city) {
      filters.city = {
        contains: req.params.city,
      };
    }
    if (req.params.state) {
      filters.state = {
        contains: req.params.state,
      };
    }
    if (req.params.country) {
      filters.country = {
        contains: req.params.country,
      };
    }
    if (req.params.postalcode) {
      filters.postalcode = {
        contains: req.params.postalcode,
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
          orderBy: {
            orderdateandtime: 'desc',
          },
          include: {
            order_ticketitems: {
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
            donations: {
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
    const formattedDonations: any[] = [];
    const flattenedOrders : any[] = [];
    contact.orders.forEach((order) => {
      const orderItemsMap = new Map<string, any>();
      const {
        ordertotal,
        refunded,
      } = order
          .order_ticketitems
          .reduce<{ordertotal: number, refunded: boolean}>((acc, ticket) => {
            if (!ticket.ticketitem) return acc;
            const key = `${ticket.ticketitem.ticketrestriction.eventinstanceid_fk}T${ticket.ticketitem.ticketrestriction.tickettypeid_fk}`;
            const item = orderItemsMap.get(key);
            if (item) {
              item['quantity'] = item['quantity']+1;
            } else {
              orderItemsMap.set(key,
                  {
                    price: ticket.price,
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
            return {
              ordertotal: acc.ordertotal+Number(ticket.price),
              refunded: acc.refunded && ticket.refund !== null,
            };
          }, {ordertotal: 0, refunded: true});

      formattedDonations.push(...order.donations.map((donation) => ({
        ...donation,
        refunded: donation.refund !== null,
        donationdate: order.orderdateandtime,
      })));

      if (!orderItemsMap.size) return;

      flattenedOrders.push({
        orderid: order.orderid,
        orderdateandtime: order.orderdateandtime,
        ordertotal,
        refunded,
        orderitems: [...orderItemsMap.values()],
        donationTotal: order.donations.reduce<number>((acc, donation) => acc+Number(donation.amount), 0),
      });
    });

    const toReturn = {
      ...remainderOfContact,
      orders: flattenedOrders,
      donations: formattedDonations,
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
        city: req.body.city,
        state: req.body.state,
        postalcode: req.body.postalcode,
        country: req.body.country,
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
