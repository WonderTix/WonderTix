/* eslint-disable camelcase*/
import express, {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {Prisma, state} from '@prisma/client';
import {
  createOrder,
  deleteOrderAndTempStore,
  ticketingWebhook,
  updateRefund,
  updateRefundByPaymentIntent,
  readerWebhook,
  discoverReaders,
  abortPaymentIntent,
} from './orderController.service';
import {PurchaseSource} from '../interfaces/PurchaseSource';

const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const webhookKey = `${process.env.PRIVATE_STRIPE_WEBHOOK}`;
const stripe = require('stripe')(stripeKey);
const prisma = extendPrismaClient();

export const orderController = Router();

orderController.post(
  '/webhook',
  express.raw({type: 'application/json'}),
  async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];
    try {
      const event = await stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookKey,
      );

      const object = event.data.object;
      const metaData = object.metadata;
      const action = object.action;

      // Handle in-person payments
      if (metaData?.sessionType === '__reader' ||
            event.type === 'terminal.reader.action_failed' ||
            event.type === 'terminal.reader.action.succeeded') { // terminal events don't carry our __reader metadata
        await readerWebhook(
          prisma,
          event.type,
          action ? action.failure_message : 'no error',
          object,
        );
      } else if (metaData?.sessionType === '__ticketing') {
        await ticketingWebhook(
          prisma,
          event.type,
          object,
        );
      } else if (event.type === 'charge.refunded') {
        await updateRefundByPaymentIntent(prisma, object.payment_intent);
      } else if (event.type === 'charge.refund.updated') {
        await updateRefund(prisma, object);
      }

      return res.send();
    } catch (error) {
      console.error(error);
      return res.status(400).send();
    }
  },
);

orderController.use(express.json());
orderController.use(checkJwt);
orderController.use(checkScopes);

/**
 * @swagger
 * /2/order/refund:
 *   get:
 *     summary: get all orders with email
 *     tags:
 *     - New Order
 *     parameters:
 *     - in: query
 *       name: search
 *       description: Search query to look for
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: orders fetched successfully
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
orderController.get('/refund', async (req: Request, res: Response) => {
  try {
    const {search} = req.query;
    if (!search || typeof search !== 'string' || search.trim().length === 0) {
      return res.status(400).send('Search String Required');
    }

    const searchTokens = search.trim().split(' ').filter((token) => token.length !== 0);
    const isSingleSearchTerm = searchTokens.length === 1;

    const orders = await prisma.orders.findMany({
      where: {
        order_status: state.completed,
        orderitems: {
          some: {
            refund: null,
          },
        },
        AND:
          isSingleSearchTerm ? {
            OR: [
              {
                contacts: {
                  firstname: {
                    contains: searchTokens[0],
                    mode: 'insensitive',
                  },
                },
              },
              {
                contacts: {
                  lastname: {
                    contains: searchTokens[0],
                    mode: 'insensitive',
                  },
                },
              },
              {
                contacts: {
                  email: {
                    contains: searchTokens[0],
                    mode: 'insensitive',
                  },
                },
              },
            ],
          } : [
            {
              contacts: {
                firstname: {
                  contains: searchTokens[0],
                  mode: 'insensitive',
                },
              },
            },
            {
              contacts: {
                lastname: {
                  contains: searchTokens[1],
                  mode: 'insensitive',
                },
              },
            },
          ],
      },
      include: {
        contacts: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        orderitems: {
          where: {
            refund: null,
          },
          include: {
            ticketitem: {
              include: {
                ticketrestriction: {
                  include: {
                    eventinstance: {
                      include: {
                        event: true,
                      },
                    },
                    tickettype: true,
                  },
                },
              },
            },
            subscription: {
              include: {
                seasonsubscriptiontype: {
                  include: {
                    season: true,
                    subscriptiontype: true,
                  },
                },
              },
            },
            donation: true,
          },
        },
      },
      orderBy: {
        orderdatetime: 'desc',
      },
    });

    const toReturn = orders.map((order) => {
      const {
        contacts,
        orderitems,
        orderdatetime,
        ...remainderOfOrder
      } = order;

      if (!contacts) return;

      const orderItems = new Map<string, any>();
      let donation = 0;

      const orderTotal = orderitems.reduce<number>((acc, item) => {
        if (item.ticketitem) {
          const key = `${item.ticketitem.ticketrestriction.ticketrestrictionsid}`;
          const current = orderItems.get(key);

          if (current) {
            current.quantity += 1;
            current.price += Number(item.price);
          } else {
            orderItems.set(key, {
              type: item.ticketitem.ticketrestriction.tickettype.description,
              description: item.ticketitem.ticketrestriction.eventinstance.event.eventname,
              quantity: 1,
              price: +item.price,
            });
          }

        } else if (item.subscription) {
          const key = `${item.subscription.seasonsubscriptiontype.season.seasonid}-${item.subscription.seasonsubscriptiontype.season.seasonid}`;
          const current = orderItems.get(key);

          if (current) {
            current.quantity+=1;
            current.price+=Number(item.price);
          } else {
            orderItems.set(key, {
              type: `${item.subscription.seasonsubscriptiontype.subscriptiontype.name} Subscription`,
              description: item.subscription.seasonsubscriptiontype.season.name,
              quantity: 1,
              price: +item.price,
            });
          }

        } else if (item.donation) {
          donation = Number(item.price);
        }
        return acc+Number(item.price);
      }, 0);
      return {
        price: orderTotal - Number(order.discounttotal) + Number(order.feetotal),
        email: contacts.email,
        name: `${contacts.firstname} ${contacts.lastname}`,
        orderdate: orderdatetime,
        ...remainderOfOrder,
        orderitems: [...orderItems.values()],
        donation,
      };
    });
    return res.json(toReturn);
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
 * /2/order/refund/{id}:
 *   put:
 *     summary: begin refund process for an order based on order id (adds refund intent to any associated donations)
 *     tags:
 *     - New Order
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: refund process started
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
orderController.put('/refund/:id', async (req, res) => {
  try {
    const orderID = req.params.id;
    const order = await prisma.orders.findUnique({
      where: {
        orderid: Number(orderID),
      },
      include: {
        contacts: true,
        orderitems: {
          where: {
            refund: null,
          },
        },
      },
    });

    if (!order) {
      return res.status(400).json({error: `Order ${orderID} does not exist`});
    }
    if (order.order_status !== state.completed) {
      return res.status(400).json({error: `Order ${orderID} is still processing`});
    }
    if (!order.orderitems.length) {
      return res.status(400).json({error: `Order ${orderID} has already been fully refunded`});
    }

    const refundCartItems = order.orderitems.map((item) => ({
      orderItemId: item.id,
      refundFee: true,
    }));

    const response = await createOrder({
      prisma,
      refundCartItems,
      orderSource: PurchaseSource.admin_ticketing,
      contact: order.contacts ?? undefined,
    });

    return res.send(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

/**
 * @swagger
 * /2/order/readers:
 *   get:
 *     summary: get all terminal readers
 *     tags:
 *     - New Order
 *     responses:
 *       200:
 *         description: readers fetched successfully
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.get('/readers', async (req: Request, res: Response) => {
  try {
    const toReturn = await discoverReaders();
    return res.status(200).json(toReturn);
  } catch (error) {
    res.status(500).json({error});
  }
});

/**
 * @swagger
 * /2/order/reader-cancel:
 *   post:
 *     summary: Cancel payment intent and cancel order in prisma
 *     tags:
 *     - New Order
 *     responses:
 *       200:
 *         description: readers order successfully cancelled
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.post('/reader-cancel', async (req: Request, res: Response) => {
  const {paymentIntentID} = req.body;
  try {
    await abortPaymentIntent(paymentIntentID);
    await deleteOrderAndTempStore(prisma, paymentIntentID);
    return res.status(200).json('Reader order successfully cancelled');
  } catch (error) {
    console.log(error);
   res.status(500).json({error: 'Internal Server Error'});
  }
});

/**
 * @swagger
 * /2/order/{id}:
 *   get:
 *     summary: get an order
 *     tags:
 *     - New Order
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: order updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const orderExists = await prisma.orders.findUnique({
      where: {
        orderid: Number(id),
      },
    });
    if (!orderExists) {
      res.status(404).json({error: 'order not found'});

      return;
    }
    const order = await prisma.orders.findUnique({
      where: {
        orderid: Number(id),
      },
    });
    res.status(200).json(order);

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
 * /2/order/refundable-orders/{id}:
 *   get:
 *     summary: get all orders and orderitems that are available for refund for a given contact
 *     tags:
 *     - New Order
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: order updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
orderController.get('/refundable-orders/:id', async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    if (!id || isNaN(+id)) {
      return res.status(400).json({error: `Customer Id(${id}) is invalid`});
    }

    const customerOrders = await prisma.orders.findMany({
      where: {
        contactid_fk: +id,
        order_status: state.completed,
        orderitems: {
          some: {
            refund: null,
          },
        },
      },
      orderBy: {
        orderdatetime: 'desc',
      },
      include: {
        orderitems: {
          where: {
            refund: null,
          },
          include: {
            subscription: {
              include: {
                seasonsubscriptiontype: {
                  include: {
                    season: true,
                    subscriptiontype: true,
                  },
                },
              },
            },
            ticketitem: {
              include: {
                ticketrestriction: {
                  include: {
                    tickettype: true,
                    eventinstance: {
                      include: {
                        event: true,
                      },
                    },
                  },
                },
              },
            },
            donation: true,
          },
        },
      },
    });

    return res.json(customerOrders);
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
