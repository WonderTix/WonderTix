import express from 'express';
import Stripe from 'stripe';
import CartItem from '../../interfaces/CartItem';
import Showing from '../../interfaces/Showing';
import {pool} from '../db';
import eventUtils from './event.service';
import {checkJwt, checkScopes} from '../../auth';
export const eventRouter = express.Router();

const stripeKey = process.env.PRIVATE_STRIPE_KEY ?
  process.env.PRIVATE_STRIPE_KEY : '';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2020-08-27',
});


// Endpoint to get event id
// Event route
// GET /api/events/search?eventName={eventName}
eventRouter.get('/search', async (req, res) => {
  try {
    const values = [req.query.eventName];
    // let values =['united']
    const ids = await pool.query(
        'select id, eventname from events where eventname = $1',
        values,
    );
    if (ids.rowCount === 0) res.status(404).json('No event was found.');
    else res.json(ids.rows);
  } catch (error) {
    console.error(error);
  }
});

// Endpoint to get event by ID
eventRouter.get('/:id', async (req, res) => {
  try {
    const query = `
                  SELECT
                    events.id,
                    seasonid,
                    eventname title,
                    events.eventdescription description,
                    events.active,
                    events.image_url
                  FROM events
                  WHERE id = $1;
                  `;
    const data = await pool.query(query, [req.params.id]);
    res.json(data.rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Endpoint to get the list of all event instances that are currently active
// Even route
eventRouter.get('/list/active', async (req, res) => {
  try {
    const query = `
                    SELECT 
                      ei.id,
                      ei.eventid,
                      events.eventname,
                      events.eventdescription,
                      events.image_url,
                      ei.eventdate, ei.starttime,
                      ei.totalseats,
                      ei.availableseats
                    FROM event_instances as ei 
                    JOIN events on ei.eventid = events.id 
                    WHERE events.active = true AND ei.salestatus = true
                  `;
    const events = await pool.query(query);
    console.log(events.rows);
    const responseData = {
      data: events.rows,
      status: {
        success: true,
        message: `${events.rowCount} rows retrieved`,
      },
    };
    res.status(200).send(responseData);
  } catch (err: any) {
    console.error(err.message);
    const responseData = {
      data: {},
      status: {
        success: false,
        message: `${err.message}`,
      },
    };
    res.status(500).send(responseData);
  }
});

// GOING TO REPLACE THIS
// Stripe Utility folder endpoint refactor
// TODO: when we add confirmation emails we can do it like this:
// https://stripe.com/docs/payments/checkout/custom-success-page
eventRouter.post('/checkout', async (req, res) => {
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
  const optIn = req.body.formData['opt-in'];
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
eventRouter.put('/checkin', checkJwt, checkScopes, async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const querystring = `UPDATE tickets SET checkedin=$1 WHERE ticketno=$2`;
    const values = [req.body.isCheckedIn, req.body.ticketID];
    const queryRes = await pool.query(querystring, values);
    res.json(queryRes.rows);
  } catch (err: any) {
    console.error(err.message);
    throw new Error('check in failed');
  }
});

// End point to create a new event
eventRouter.post('/', checkJwt, checkScopes, async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const {eventName, eventDesc, imageUrl} = req.body;
    const query = `
                    INSERT INTO events 
                      (seasonid, eventname, eventdescription, active, image_url)
                    VALUES (0, $1, $2, true, $3)
                    RETURNING *
                  `;
    const {rows} = await pool.query(query, [
      eventName,
      eventDesc,
      imageUrl,
    ]);
    res.json({rows});
  } catch (error: any) {
    console.error(error);
  }
});

// PRIVATE
// End point to create a new showing
// req body: array of {eventid, eventdate, starttime, totalseats, tickettype}
eventRouter.post('/instances', checkJwt, checkScopes, async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  const {instances} = req.body;
  let newInstances;
  console.log(instances);
  try {
    newInstances = await eventUtils.insertAllShowings(instances);
    // Link showtime to ticket type
    const linkingdata = newInstances.map((s) => ({
      id: s.id,
      tickettype: s.tickettype,
    }));
    const query2 =
      `INSERT INTO linkedtickets (event_instance_id, ticket_type) 
        VALUES ($1, $2)`;
    for (const sh of linkingdata) {
      const {id, tickettype} = sh;
      await pool.query(query2, [id, tickettype]);
    }
    res.json({newInstances});
  } catch (err) {
    console.error(err);
    res.status(400);
    res.send(err);
  }
});

// PRIVATE ROUTE
eventRouter.put('/', checkJwt, checkScopes, async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  const query = `UPDATE events
                SET (seasonid, eventname, eventdescription, active, image_url)
                = ($1, $2, $3, $4, $5)
                WHERE id=$6
                RETURNING *;`;

  try {
    const queryResult = await pool.query(query, [
      req.body.seasonid,
      req.body.eventname,
      req.body.eventdescription,
      req.body.active,
      req.body.image_url,
      req.body.id]);

    res.json(queryResult.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500);
    res.send('Edit event failed: ' + err.message);
  }
});

// PRIVATE ROUTE
eventRouter.put('/instances/:id', checkJwt, checkScopes, async (req, res) => {
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
eventRouter.delete('/:id', checkJwt, checkScopes, async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    // playid
    const id = req.params.id;
    if (id === undefined) {
      throw new Error('No event id provided');
    }
    const archivePlay = 'UPDATE events SET active=false WHERE id=$1;';
    const archiveShowtimes =
      'UPDATE event_instances SET salestatus=false WHERE eventid=$1;';

    const archivedPlay = await pool.query(archivePlay, [id]);
    const archivedShowtimes = await pool.query(archiveShowtimes, [id]);
    res.json({rows: [...archivedPlay.rows, ...archivedShowtimes.rows]});
  } catch (error) {
    console.error(error);
    res.status(400);
    res.send(error);
  }
});

eventRouter.get('/', async (req, res) => {
  try {
    // query to retrieve all active events, and the number of showings for each
    const querystring = `
                        SELECT events.id,
                        seasonid,
                        eventname title,
                        events.eventdescription description,
                        events.active,
                        events.image_url,
                        count(event_instances.id) as numShows
                        FROM events 
                        JOIN event_instances 
                        ON events.id = event_instances.eventid 
                        GROUP BY events.id,
                        events.seasonid,
                        events.eventname,
                        events.eventdescription,
                        events.active,
                        events.image_url
                        HAVING active = true;
                        `;
    const data = await pool.query(querystring);
    data.rows.forEach((row) => row.id = row.id.toString());
    res.json(data.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});
