import {Router, Response, Request} from 'express';
import CartItem from '../../interfaces/CartItem';
import {pool} from '../db';
import {checkIn,
  getEventById,
  getEventByName,
  getActiveEventsAndInstances,
  createEvent,
  createShowing,
  updateEvent,
  archivePlays,
  getActiveEvents,
  updateInstances,
  getInstanceById,
} from './event.service';
import {checkJwt, checkScopes} from '../../auth';
import {JsonObject} from 'swagger-ui-express';
export const eventRouter = Router();

const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const stripe = require('stripe')(stripeKey);

const bodyParser = require('body-parser');


/**
 * @swagger
 * /1/events/search:
 *   get:
 *     summary: Search events by name
 *     description: Returns a list of event IDs and event names matching the provided event name
 *     parameters:
 *       - in: query
 *         name: event_name
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of event IDs and names matching the provided event name
 *       '404':
 *         description: No events were found matching the provided name
 *       '500':
 *         description: An error occurred while processing the request
 *     tags:
 *      - Event
 */
eventRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const ids = await getEventByName(req.query);
    const code = ids.status.success ? 200 : 404;
    res.status(code).send(ids);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 * /1/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     description: Returns an event with the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: An event was found with the provided ID
 *       '404':
 *         description: No event was found with the provided ID
 *       '500':
 *         description: An error occurred while processing the request
 *     tags:
 *       - Event
 */
// Endpoint to get event by ID
eventRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await getEventById(req.params);
    let code = data.status.success ? 200 : 404;
    if (code === 200 && data.data.length === 0) {
      code = 404;
      data.status.success = false;
    }
    res.status(code).send(data);
  } catch (error) {
    res.sendStatus(500);
  }
});

/**
 * @swagger
 * /1/events/instances/{id}:
 *   get:
 *     summary: Get instance by ID
 *     description: Returns an instance with the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: An instance was found with the provided ID
 *       '404':
 *         description: No instance was found with the provided ID
 *       '500':
 *         description: An error occurred while processing the request
 *     tags:
 *       - Event
 */
// Endpoint to get event instance by ID
eventRouter.get('/instances/:id', async (req: Request, res: Response) => {
  try {
    const data = await getInstanceById(req.params);
    console.log(data);
    const code = data.status.success ? 200 : 404;
    res.status(code).send(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

/**
 * @swagger
 * /1/events/list/active:
 *   get:
 *     summary: Get a list of active events and their instances
 *     description: Returns a list of active events and their instances
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of active events and their instances were found
 *       '404':
 *         description: No active events were found
 *       '500':
 *         description: An error occurred while processing the request
 *     tags:
 *       - Event
 */
// Endpoint to get the list of all event instances that are currently active
// Even route
eventRouter.get('/list/active', async (_req: Request, res: Response) => {
  try {
    const events = await getActiveEventsAndInstances();
    const code = events.status.success ? 200 : 404;
    res.status(code).send(events);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// GOING TO REPLACE THIS
// Stripe Utility folder endpoint refactor
// TODO: when we add confirmation emails we can do it like this:
// https://stripe.com/docs/payments/checkout/custom-success-page
eventRouter.post('/checkout', async (req: Request, res: Response) => {
  // Prices are fetched from db so customers cannot change the price they
  // submit their order. Some data such as itemname and description can be.
  // Should not be an issue becuase this is only stored in stripe, and not used
  // by us
  const data: CartItem[] = req.body.cartItems;
  console.log(data);
  const {
    firstName,
    lastName,
    streetAddress,
    phone,
    email,
    seatingAcc,
  } = req.body.formData;

  const optIn = req.body.formData['optIn'];
  let emailExists = false;
  try {
    const emails = await pool.query(
        'SELECT COUNT(*) FROM contacts WHERE email = $1;',
        [req.body.formData.email],
    );
    emailExists = +emails.rows[0].count > 0;
  } catch (error: any) {
    console.error(error.message);
    throw new Error('optin w/ email failure');
  }
  if (emailExists === false) {
    try {
      const query = `
                    INSERT INTO
                      contacts (
                          firstname,
                          lastname,
                          email,
                          phone,
                          address,
                          newsletter,
                          donorbadge,
                          seatingaccom)
                    VALUES
                      ($1, $2, $3, $4, $5, $6, $7, $8);`;
      await pool.query(
          query,
          [
            firstName,
            lastName,
            email,
            phone,
            streetAddress,
            optIn,
            false,
            seatingAcc,
          ],
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const values = [
        email,
        firstName,
        lastName,
        phone,
        streetAddress,
        optIn,
        seatingAcc,
      ];
      const query = `
                    UPDATE
                      contacts
                    SET
                      firstname = $2,
                      lastname = $3,
                      phone = $4,
                      address = $5,
                      newsletter = $6,
                      seatingaccom = $7
                    WHERE
                      email=$1;`;
      await pool.query(query, values);
    } catch (error: any) {
      console.log(error);
      throw new Error('contact update failure');
    }
  }
  // storing the contact id for later processing on succesful payments.
  // if we cant find the custid something went wrong
  let contactID;

  try {
    // Possible breaking change custname -> firstname, lastname
    const query = {text: `
                  SELECT
                    contactid
                  FROM
                    public.contacts
                  WHERE
                    email = $1;`,
    values: [email],
    };
    contactID = await pool.query(query);
    contactID = contactID.rows[0].contactid;
    console.log('contact ID: ' + contactID);
    // const formData: CheckoutFormInfo = req.body.formData;
    const donation: number = req.body.donation;
    const donationItem = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Donation',
          description: 'A generous donation',
        },
        unit_amount: donation * 100,
      },
      quantity: 1,
    };

    const orders = req.body.cartItems.map((item: any) => ({
      id: item.product_id,
      quantity: item.qty,
    }));


    // Queries the database to get item prices
    // I commented out this 'for' loop as it goes through the tickets
    // in the cart and checks the orderitem based on the produce_id to get the price
    // However, the tickets already have a price stored that is based on the type of ticket,
    // therefore this loop is unnecessary.
    // const costVect = [];
    // for (let i = 0; i < data.length; i++) {
    //   try {
    //     const priceQueryi = await pool.query(
    //         'SELECT price FROM orderitems WHERE orderitemid = $1;',
    //         [data[i].product_id],
    //     );
    //     console.log('data:', data[i]);
    //     console.log('1', priceQueryi);
    //     if (priceQueryi.rows[0].price) {
    //       console.log('1', priceQueryi);
    //       console.log('2',priceQueryi.rows[0].price);
    //       data[i].price = (Number((priceQueryi.rows[0].price).replace(/[^0-9\.-]+/g, '')));
    //     } else {
    //       throw new Error('No price in database');
    //     }
    //   } catch (err: any) {
    //     console.error(err.message);
    //     throw new Error('Cost Calculation Error');
    //   };
    // };
    // console.log(data);


    const stripeCheckoutData: JsonObject = {
      payment_method_types: ['card'],
      // all this stuff needs to be replaced by info from DB based on event ID
      line_items: data
          .map((item) => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                description: item.desc,
              },
              unit_amount: item.price * 100,
            },
            quantity: item.qty,
          }))
          .concat(donationItem),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}`,
      payment_intent_data: {
        metadata: {
          orders: JSON.stringify(orders),
          custid: contactID,
          donation: donation,
          discountCode: null,
        },
      },
      metadata: {
        orders: JSON.stringify(orders),
        custid: contactID,
        donation: donation,
        discountCode: null,
      },
    };

    const discount = req.body.discount;
    let stripeCoupon;
    if (discount.code !== '') {
      if (discount.amount > 0) {
        stripeCoupon = await stripe.coupons.create({
          amount_off: discount.amount * 100,
          duration: 'once',
          name: discount.code,
          currency: 'usd'});
      } else {
        stripeCoupon = await stripe.coupons.create({
          percent_off: discount.percent,
          duration: 'once',
          name: discount.code});
      }
      stripeCheckoutData.discounts = [{coupon: stripeCoupon.id}];
    }

    console.log(stripeCheckoutData);

    const session = await stripe.checkout.sessions.create(stripeCheckoutData);
    const pi =
    console.log(session.id);
    res.json({id: session.id, paymentIntent: pi});
  } catch (err: any) {
    console.error(err.message);
    throw new Error('session creation failure');
  }
});

// PRIVATE ROUTE
/**
 * @swagger
 *  /1/events/checkin:
 *    put:
 *      summary: Check-in to an event
 *      description: Allows authenticated users to check-in to an event
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Successfully checked in to the event
 *        '404':
 *          description: The specified event or event instance was not found
 *        '500':
 *          description: An error occurred while processing the request
 *      tags:
 *        - Event
 */
// TODO: Check that provided ticket ID is valid
eventRouter.put('/checkin', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const queryRes = await checkIn(req.body);
    const code = queryRes.status.success ? 200 : 404;
    res.status(code).send(queryRes);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 * /1/events:
 *   post:
 *     summary: Create a new event
 *     description: Allows authenticated users to create a new event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Request body containing details for the new event
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seasonid_fk:
 *                 type: integer
 *               eventname:
 *                 type: string
 *                 description: The name of the event
 *               eventdescription:
 *                 type: string
 *                 description: The description of the event
 *               active:
 *                 type: boolean
 *               seasonticketelligible:
 *                 type: boolean
 *               imageurl:
 *                 type: string
 *               eventid:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Successfully created a new event
 *       '404':
 *         description: The new event was not created
 *       '500':
 *         description: An error occurred while processing the request
 *     tags:
 *       - Event
 */
// End point to create a new event
eventRouter.post('/', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const newEvent = await createEvent(req.body);
    const code = newEvent.status.success ? 200 : 404;
    res.status(code).send(newEvent);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// PRIVATE
// End point to create a new showing
/**
 * @swagger
 * /1/events/instances:
 *   post:
 *     summary: Create new showings for an event
 *     description: Allows authenticated users to create new showings for an event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Array of objects containing details for each new showing
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 eventid:
 *                   type: integer
 *                 eventdate:
 *                   type: string
 *                   format: integer
 *                 eventtime:
 *                   type: string
 *                   format: time
 *                 totalseats:
 *                   type: integer
 *                   description: The total number of seats available for the showing
 *                 tickettype:
 *                   type: string
 *                   description: The type of ticket for the showing
 *     responses:
 *       '200':
 *         description: Successfully created new showings
 *       '404':
 *         description: The new showings were not created
 *       '500':
 *         description: An error occurred while processing the request
 *     tags:
 *       - Event
 */
// req body: array of {eventid, eventdate, eventtime, totalseats, tickettype}
eventRouter.post('/instances', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    console.log(req.body);
    const showings = await createShowing(req.body);
    const code = showings.status.success ? 200 : 404;
    res.status(code).send(showings);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// PRIVATE ROUTE
/**
 * @swagger
 *  /1/events:
 *    put:
 *      summary: Update the details for an event
 *      description: Allows authenticated users to update the details of an event
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: Request body containing updated details for the event
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: The ID of the event to update
 *                seasonid:
 *                  type: integer
 *                  description: The ID of the season that the event belongs to
 *                eventname:
 *                  type: string
 *                  description: The name of the event
 *                eventdescription:
 *                  type: string
 *                  description: The description of the event
 *                active:
 *                  type: boolean
 *                  description: Whether the event is active or not
 *                imageurl:
 *                  type: string
 *                  description: The URL of the image associated with the event
 *      responses:
 *        '200':
 *          description: The event details were updated successfully
 *        '404':
 *          description: An error occurred while updating the event details
 *      tags:
 *        - Event
 */
eventRouter.put('/', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function

  try {
    const queryResult = await updateEvent(req.body);
    const code = queryResult.status.success ? 200 : 404;
    res.status(code).send(queryResult);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// PRIVATE ROUTE
/**
 * @swagger
 *  /1/events/instances/{id}:
 *    put:
 *      summary: Update the details for an event instance
 *      description: Allows authenticated users to update the details for an event instance
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the event instance to update
 *          schema:
 *            type: integer
 *      requestBody:
 *        description: Request body containing updated details for the event instance
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                eventid:
 *                  type: integer
 *                  description: The ID of the event associated with this instance
 *                eventdate:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time of the event instance
 *                eventtime:
 *                  type: string
 *                  format: time
 *                  description: The start time of the event instance in HH:MM format
 *                totalseats:
 *                  type: integer
 *                  description: The total number of seats available for this instance
 *                tickettype:
 *                  type: string
 *                  description: The type of ticket available for this instance
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Successfully updated the event instance
 *        '404':
 *          description: The event instance was not found or could not be updated
 *        '500':
 *          description: An error occurred while processing the request
 *      tags:
 *        - Event
 */
eventRouter.put('/instances/:id', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
  try {
    const resp = await updateInstances(req.body, req.params);
    let code = resp.status.success ? 200 : 404;
    if (code === 200 && resp.data.length === 0) {
      code = 404;
    }
    res.status(code).send(resp);
  } catch (error: any) {
    console.log('error: ' + error);
    res.status(500).send(error);
  }
});

// PRIVATE ROUTE
// Updates salestatus in showtimes table
// and active flag in plays table when given a play id
/**
 * @swagger
 * /1/events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     description: Allows user to delete an event by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the event to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully deleted the event instance
 *       '404':
 *         description: The event instance was not found or could not be deleted
 *       '500':
 *         description: An error occurred while processing the request
 *     tags:
 *       - Event
 */
eventRouter.delete('/:id', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    // playid
    const plays = await archivePlays(req.params);
    let code = plays.status.success ? 200 : 404;
    if (code === 200 && plays.data.length === 0) {
      code = 404;
      plays.status.success = false;
    }
    res.status(code).send(plays);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 * /1/events:
 *   get:
 *     summary: Retrieve all active events and their showings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active events and coorelated showings
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       seasonid:
 *                         type: string
 *                       eventname:
 *                         type: string
 *                       eventdescription:
 *                         type: string
 *                       active:
 *                         type: boolean
 *                       seasonticketeligible:
 *                         type: boolean
 *                       imageurl:
 *                         type: string
 *                       numShow:
 *                         type: integer
 *       404:
 *         description: An error occurred querying the database
 *       '500':
 *         description: An error occurred while processing the request
 *     tags:
 *       - Event
 */
eventRouter.get('/', async (_req: Request, res: Response) => {
  try {
    // query to retrieve all active events, and the number of showings for each
    const data = await getActiveEvents();
    data.data.forEach((row) => row.id = row.id.toString());
    const code = data.status.success ? 200 : 404;
    res.status(code).send(data);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
