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
          orderBy: [{
            orderdate: 'desc',
          }, {
            ordertime: 'desc',
          }],
          select: {
            orderid: true,
            orderdate: true,
            ordertime: true,
            refund_intent: true,
            ordertotal: true,
            orderitems: {
              select: {
                price: true,
                singletickets: {
                  select: {
                    ticketwasswapped: true,
                    eventtickets: {
                      select: {
                        ticketrestrictions: {
                          select: {
                            tickettype: {
                              select: {
                                description: true,
                              },
                            },
                          },
                        },
                        eventinstances: {
                          select: {
                            eventdate: true,
                            eventtime: true,
                            events: {
                              select: {
                                eventname: true,
                                seasons: {
                                  select: {
                                    name: true,
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
              },
            },
          },
        },
        donations: {
          orderBy: {
            donationdate: 'desc',
          },
          select: {
            donationid: true,
            donationdate: true,
            frequency: true,
            refund_intent: true,
            amount: true,
          },
        },
      },
    });

    if (!contact) {
      res.status(404).json({error: 'Contact not found'});
      return;
    }

    const {orders, donations, ...remainderOfContact} = contact;

    const flattenedOrders = contact.orders.map((order) => {
      const orderItems = order.orderitems.map((item) => {
        const singleTickets = item.singletickets.filter((ticket) => !ticket.ticketwasswapped);
        const quantity = singleTickets.length;
        const ticketInfo = singleTickets.map((ticket) => {
          if (!ticket.eventtickets.length) return null;
          return {
            description: ticket.eventtickets[0].eventinstances.events.eventname,
            eventdate: ticket.eventtickets[0].eventinstances.eventdate,
            eventtime: ticket.eventtickets[0].eventinstances.eventtime,
            eventname: ticket.eventtickets[0].eventinstances.events.eventname,
            seasonname: ticket.eventtickets[0].eventinstances.events.seasons?.name,
            tickettype: ticket.eventtickets[0].ticketrestrictions?.tickettype.description,
          };
        }).filter((ticket) => ticket !== null);

        if (!ticketInfo[0]) return null;
        return {
          price: item.price,
          quantity: quantity,
          description: ticketInfo[0].description,
          eventdate: ticketInfo[0].eventdate,
          eventtime: ticketInfo[0].eventtime,
          eventname: ticketInfo[0].eventname,
          seasonname: ticketInfo[0].seasonname,
          tickettype: ticketInfo[0].tickettype,
        };
      }).filter((item) => item !== null);

      return {
        orderid: order.orderid,
        orderdate: `${order.orderdate.toString().slice(0, 4)}-${order.orderdate.toString().slice(4, 6)}-${order.orderdate.toString().slice(6, 8)}`,
        ordertime: order.ordertime,
        refund_intent: order.refund_intent,
        ordertotal: order.ordertotal,
        orderitems: orderItems,
      };
    });

    const formattedDonations = donations.map((donation) => {
      const {donationdate, ...restOfDonation} = donation;
      if (!donationdate) return null;
      return {
        donationdate: `${donationdate.toString().slice(0, 4)}-${donationdate.toString().slice(4, 6)}-${donationdate.toString().slice(6, 8)}`,
        ...restOfDonation,
      };
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
    const contact = await prisma.contacts.update({
      where: {
        contactid: Number(id),
      },
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
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
