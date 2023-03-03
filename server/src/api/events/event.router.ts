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


// Endpoint to get event id
// Event route
// GET /api/events/search?eventName={eventName}
eventRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const ids = await getEventByName(req.query);
    const code = ids.status.success ? 200 : 404;
    res.status(code).send(ids);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

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

// Endpoint to get event instance by ID
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
// req body: array of {eventid, eventdate, starttime, totalseats, tickettype}
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

// PRIVATE ROUTE
/**
 * @swagger
 *  /events/
 *    put:
 *      summary: Update the details for an event
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id: integer
 *                seasonid: integer
 *                eventname: string
 *                eventdescription: string
 *                active: boolean
 *                image_url: string
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
 *                    id: integer
 *                    seasonid: integer
 *                    eventname: string
 *                    eventdescription: string
 *                    active: boolean
 *                    image_url: string
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

// PRIVATE ROUTE
/**
 * @swagger
 *  /events/instances/:id
 *    put:
 *      summary: Updates the list of showings for a given event
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The ID of the event
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id: integer
 *                  eventdate: string
 *                  starttime: string
 *                  salestatus: boolean
 *                  totalseats: integer
 *                  availableseats: integer
 *                  purchaseuri: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  numRowsUpdated: integer
 *                  numRowsDeleted: integer
 *                  numRowsInserted: integer
 *          404:
 *            description: An error occured querying the database
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

// PRIVATE ROUTE
// Updates salestatus in showtimes table
// and active flag in plays table when given a play id
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
