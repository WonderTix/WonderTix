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


/**
 * @swagger
 *   /api/events/search:
 *   get:
 *     summary: Get event ids by name
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *     - in: query
 *       name: eventName
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: integer
 *       401:
 *         description: Unauthorized
 *       404:
 *        description: Not Found
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
 *  /api/events/{id}:
 *    get:
 *      summary: Get event by id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: id
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  eventid: {type: integer}
 *                  seasonid_fk: {type: integer}
 *                  eventname: {type: string}
 *                  eventdescription: {type: string}
 *                  active: {type: boolean}
 *                  availableseats: {type: integer}
 *                  seasonticketeligible: {type: boolean}
 *                  imageurl: {type: string}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
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
 *  /api/events/instances/{id}:
 *    get:
 *      summary: Get event  instance by id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: id
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  eventid: {type: integer}
 *                  eventdate: {type: string}
 *                  starttime: {type: string}
 *                  salestatus: {type: boolean}
 *                  totalseats: {type: integer}
 *                  availableseats: {type: integer}
 *                  ticketTypeId: {type: array, items: {type: integer}}
 *                  seatsForType: {type: array, items: {type: integer}}
 *                  purchaseuri: {type: string}
 *                  ispreview: {type: boolean}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
eventRouter.get('/instances/:id', async (req: Request, res: Response) => {
  try {
    const data = await getInstanceById(req.params);
    const code = data.status.success ? 200 : 404;
    res.status(code).send(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

/**
 * @swagger
 *  /api/events/list/active:
 *    get:
 *      summary: Get all active events
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    eventinstanceid: {type: integer}
 *                    event: {type: integer}
 *                    eventname: {type: string}
 *                    eventdescription: {type: string}
 *                    imageurl: {type: string}
 *                    eventdate: {type: string}
 *                    starttime: {type: string}
 *                    totalseats: {type: integer}
 *                    availableseats: {type: integer}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
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
/**
 * @swagger
 * /api/events/checkout:
 *   post:
 *     summary: Checkout endpoint for stripe
 */
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
    const costVect = [];
    for (let i = 0; i < data.length; i++) {
      try {
        const priceQueryi = await pool.query(
            'SELECT price FROM orderitems WHERE orderitemid = $1;',
            [data[i].product_id],
        );
        if (priceQueryi.rows[0].price) {
          console.log(priceQueryi);
          console.log(priceQueryi.rows[0].price);
          data[i].price = (Number((priceQueryi.rows[0].price).replace(/[^0-9\.-]+/g, '')));
        } else {
          throw new Error('No price in database');
        }
      } catch (err: any) {
        console.error(err.message);
        throw new Error('Cost Calculation Error');
      };
    };
    console.log(data);


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
 *  /api/events:
 *  post:
 *    summary: Create a new event
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              seasonid: {type: integer}
 *              eventname: {type: string}
 *              eventdescription: {type: string}
 *              active: {type: boolean}
 *              seasonticketeligible: {type: boolean}
 *              image_url: {type: string}
 *          example:
 *            seasonid: 1
 *            eventname: "The Nutcracker"
 *            eventdescription: "A classic holiday ballet"
 *            active: true
 *            seasonticketeligible: true
 *            image_url: "https://www.example.com/image.jpg"
 *
 */
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


/**
 * @swagger
 *  /api/events/instances:
 *    post:
 *      summary: Create a new event instance
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                instances:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      eventid: {type: integer}
 *                      eventdate: {type: string}
 *                      starttime: {type: string}
 *                      salestatus: {type: boolean}
 *                      totalseats: {type: integer}
 *                      availableseats: {type: integer}
 *                      ticketTypeId: {type: array, items: {type: integer}}
 *                      seatsForType: {type: array, items: {type: integer}}
 *                      purchaseuri: {type: string}
 *                      ispreview: {type: boolean}
 *              example:
 *                instances:
 *                  - eventid: 1
 *                    eventdate: 2021-05-01
 *                    starttime: 20:00:00.000000 -08:00
 *                    salestatus: false
 *                    totalseats: 100
 *                    availableseats: 28
 *                    ticketTypeId: [1]
 *                    seatsForType: [28]
 *                    purchaseuri: https://www.eventbrite.com/e/123456789
 *                    ispreview: true
 *      responses:
 *        200:
 *          description: OK
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */
eventRouter.post('/instances', checkJwt, checkScopes, async (
    req: Request,
    res: Response,
) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const showings = await createShowing(req.body);
    const code = showings.status.success ? 200 : 404;
    res.status(code).send(showings);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 *  /api/events:
 *    put:
 *      summary: Update the details for an event
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id: {type: integer}
 *                seasonid: {type: integer}
 *                eventname: {type: string}
 *                eventdescription: {type: string}
 *                active: {type: boolean}
 *                seasonticketeligible: {type: boolean}
 *                image_url: {type: string}
 *            example:
 *              id: 1
 *              seasonid: 1
 *              eventname: "The Nutcracker"
 *              eventdescription: "A classic holiday ballet"
 *              active: true
 *              seasonticketeligible: true
 *              image_url: "https://www.example.com/image.jpg"
 *      responses:
 *        200:
 *          description: OK
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: An error occured querying the database
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

/**
 * @swagger
 *  /api/events/instances/{id}:
 *    PUT:
 *      summary: Update the details for an event instance
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  eventid: {type: integer}
 *                  eventdate: {type: string}
 *                  starttime: {type: string}
 *                  salestatus: {type: boolean}
 *                  totalseats: {type: integer}
 *                  availableseats: {type: integer}
 *                  ticketTypeId: {type: array, items: {type: integer}}
 *                  seatsForType: {type: array, items: {type: integer}}
 *                  purchaseuri: {type: string}
 *                  ispreview: {type: boolean}
 *              example:
 *                - eventid: 1
 *                  eventdate: 2021-05-01
 *                  starttime: 20:00:00.000000 -08:00
 *                  salestatus: false
 *                  totalseats: 100
 *                  availableseats: 28
 *                  ticketTypeId: [1]
 *                  seatsForType: [28]
 *                  purchaseuri: https://www.eventbrite.com/e/123456789
 *                  ispreview: true
 *      responses:
 *        200:
 *          description: OK
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
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
    res.status(500).send(error);
  }
});

/**
 * @swagger
 *  /api/events/{id}:
 *    delete:
 *      summary: soft deletes an event by setting active to false and eventinstances salestatus to false
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *      responses:
 *        200:
 *          description: OK
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
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
 *  /api/events:
 *    get:
 *      summary: get a list of events
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id: {type: integer}
 *                    seasonid: {type: integer}
 *                    title: {type: string}
 *                    description: {type: string}
 *                    active: {type: boolean}
 *                    seasonticketeligible: {type: boolean}
 *                    image_url: {type: string}
 *                    num_shows: {type: integer}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
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
