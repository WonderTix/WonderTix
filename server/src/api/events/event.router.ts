import {Router, Response, Request} from 'express';
import Stripe from 'stripe';
import CartItem from '../../interfaces/CartItem';
import Showing from '../../interfaces/Showing';
import {pool} from '../db';
import eventUtils, {checkIn, getEventById, getActiveEventsAndInstances, createEvent, createShowing, updateEvent, archivePlays, getActiveEvents} from './event.service';
import {checkJwt, checkScopes} from '../../auth';
export const eventRouter = Router();

const stripeKey = process.env.PRIVATE_STRIPE_KEY ?
  process.env.PRIVATE_STRIPE_KEY : '';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2020-08-27',
});


// Endpoint to get event id
// Event route
// GET /api/events/search?eventName={eventName}
eventRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const ids = await getEventById(req.query);
    let code = ids.status.success ? 200 : 404;
    res.status(code).send(ids);
  } catch (error: any) {
    res.status(500).send(error.message)
  }
});

// Endpoint to get the list of all event instances that are currently active
// Even route
eventRouter.get('/list/active', async (_req: Request, res: Response) => {
  try {
    const events = await getActiveEventsAndInstances();
    let code = events.status.success ? 200 : 404;
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
  // TODO: NOT DO IT THIS WAY!!!
  // right now it gets the price info from the request made by the client.
  // THIS IS WRONG it needs to look up the price in the database given
  // the id of the show/event/whatever. PRICES CANNOT COME FROM CLIENTS!!
  const data: CartItem[] = req.body.cartItems;

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
        'SELECT COUNT(*) FROM customers WHERE email = $1',
        [req.body.formData.email],
    );
    emailExists = +emails.rows[0].count > 0;
  } catch (error: any) {
    console.error(error.message);
    // Todo(jesse): Handle error cases
  }
  if (emailExists === false) {
    try {
      const query = `
                      INSERT INTO customers (
                          custname, 
                          email, 
                          phone, 
                          custaddress, 
                          newsletter, 
                          donorbadge, 
                          seatingaccom
                      )
                      VALUES ($1, $2, $3, $4, $5, $6, $7)
                    `;
      await pool.query(
          query,
          [
            firstName +
            ' ' +
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
        firstName + ' ' + lastName,
        phone,
        streetAddress,
        optIn,
        seatingAcc,
      ];
      const query = `
                      UPDATE public.customers
                      SET 
                        custname=$2,
                        phone=$3, 
                        custaddress=$4,
                        newsletter=$5,
                        seatingaccom=$6
                      WHERE email=$1;
                    `;
      await pool.query(query, values);
    } catch (error: any) {
      console.log(error);
    }
  }
  // storing the customer id for later processing on succesful payments.
  // if we cant find the custid something went wrong
  let customerID = null;

  try {
    const query = `SELECT id FROM customers WHERE custname = $1`;
    customerID = await pool.query(
        query,
        [firstName + ' ' + lastName],
    );
    customerID = customerID.rows[0].id;
    // const formData: CheckoutFormInfo = req.body.formData;
    const donation: number = req.body.donation;
    const donationItem = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Donation',
          description: 'A generous donation',
        },
        // the price here needs to be fetched from the DB instead
        unit_amount: donation * 100,
      },
      quantity: 1,
    };

    const orders = req.body.cartItems.map((item: any) => ({
      id: item.product_id,
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // this is the offending area
      // all this stuff needs to be replaced by info from DB based on event ID
      line_items: data
          .map((item) => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                description: item.desc,
              },
              // the price here needs to be fetched from the DB instead
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
          custid: customerID,
          donation: donation,
        },
      },
      metadata: {
        orders: JSON.stringify(orders),
        custid: customerID,
      },
    });
    console.log(session);
    res.json({id: session.id});
  } catch (err: any) {
    console.error(err.message);
    throw new Error('Customer not found');
  }
});

// PRIVATE ROUTE
// TODO: Check that provided ticket ID is valid
eventRouter.put('/checkin', checkJwt, checkScopes, async (req: Request, res: Response) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const queryRes = await checkIn(req.body);
    let code = queryRes.status.success ? 200 : 404;
    res.status(code).send(queryRes);
  } catch (error: any) {
    res.status(500).send(error.message)
  }
});

// End point to create a new event
eventRouter.post('/', checkJwt, checkScopes, async (req: Request, res: Response) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const newEvent = await createEvent(req.body);
    let code = newEvent.status.success ? 200 : 404;
    res.status(code).send(newEvent);
  } catch (error: any) {
    res.status(500).send(error.message)
  }
});

// PRIVATE
// End point to create a new showing
// req body: array of {eventid, eventdate, starttime, totalseats, tickettype}
eventRouter.post('/instances', checkJwt, checkScopes, async (req: Request, res: Response) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const showings = await createShowing(req.body);
    let code = showings.status.success ? 200 : 404;
    res.status(code).send(showings);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// PRIVATE ROUTE
eventRouter.put('/', checkJwt, checkScopes, async (req: Request, res: Response) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function

  try {
    const queryResult = await updateEvent(req.body);
    let code = queryResult.status.success ? 200 : 404;
    res.status(code).send(queryResult);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// PRIVATE ROUTE
eventRouter.put('/instances/:id', checkJwt, checkScopes, async (req: Request, res: Response) => {
  try {
    const instances: Showing[] = req.body;

    // get existing showings for this event
    const currentShowings = await eventUtils.getShowingsById(req.params.id);

    // see which showings are not present in the updated showings
    const instancesSet = new Set(instances.map((show) => show.id));

    const rowsToDelete = currentShowings.filter(
        (show: Showing) => !instancesSet.has(show.id),
    ).map((show) => show.id);

    // delete them
    const rowsDeleted = await eventUtils.deleteShowings(rowsToDelete);

    // update existing showings
    const rowsToUpdate = instances.filter((show: Showing) => show.id !== 0);

    const rowsUpdated = await eventUtils.updateShowings(rowsToUpdate);

    // insert new showings
    // showings with id = 0 have not yet been added to the table
    const rowsToInsert = instances.filter((show: Showing) => show.id === 0);
    rowsToInsert.forEach((show: Showing) => show.tickettype = 0);

    const rowsInserted = (await eventUtils.insertAllShowings(rowsToInsert));

    const responseData = {
      data: {
        numRowsUpdated: rowsUpdated,
        numRowsDeleted: rowsDeleted,
        numRowsInserted: rowsInserted.length,
      },
      status: {
        success: true,
        message: `${rowsUpdated} rows updated, `+
          `${rowsDeleted} rows deleted, ${rowsInserted.length} rows inserted`,
      },
    };
    res.status(200).send(responseData);
  } catch (error: any) {
    console.error(error);
    const responseData = {
      data: {},
      status: {
        success: false,
        message: error.message,
      },
    };
    res.status(500).send(responseData);
  }
});

// PRIVATE ROUTE
// Updates salestatus in showtimes table
// and active flag in plays table when given a play id
eventRouter.delete('/:id', checkJwt, checkScopes, async (req: Request, res: Response) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    // playid
    const plays = await archivePlays(req.params);
    let code = plays.status.success ? 200 : 404;
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
    let code = data.status.success ? 200 : 404;
    res.status(code).send(data);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
