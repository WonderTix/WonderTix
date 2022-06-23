import Stripe from "stripe";
import CartItem from "../../interfaces/CartItem";
import Delta from "../../interfaces/Delta";
import { CheckoutFormInfo } from "../../src/components/CompleteOrderForm";
import { pool } from "../db";
import { app } from "../server";
import eventUtils from "../utilities/eventUtils";

let stripe = new Stripe(process.env.PRIVATE_STRIPE_KEY, {
  apiVersion: "2020-08-27",
});

//Endpont to get list of events
//Event list route
app.get("/api/event-list", async (req, res) => {
  try {
    const events = await pool.query(
      "select id, eventname from events where active = true"
    );
    res.json(events.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//Endpoint to get event id
//Event route
app.get("/api/event-id", async (req, res) => {
  try {
    const values = [req.body.eventname];
    // let values =['united']
    const ids = await pool.query(
      "select id, eventname from events where eventname = $1",
      values
    );
    if (ids.rowCount === 0) res.status(404).json("No event was found.");
    else res.json(ids.rows);
  } catch (error) {
    console.error(error);
  }
});

// Endpoint to get the list of all event instances that are currently active
//Even route
app.get("/api/active-event-instance-list", async (req, res) => {
  try {
    const events = await pool.query(
      `select ei.id, ei.eventid, events.eventname, events.eventdescription, events.image_url,
          ei.eventdate, ei.starttime, ei.totalseats, ei.availableseats
          from event_instances as ei join events on ei.eventid = events.id 
          where events.active = true and ei.salestatus = true`
    );
    res.json(events.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// GOING TO REPLACE THIS
//Stripe Utility folder endpoint refactor
// TODO: when we add confirmation emails we can do it like this:
// https://stripe.com/docs/payments/checkout/custom-success-page
app.post("/api/checkout", async (req, res) => {
  // TODO: NOT DO IT THIS WAY!!!
  // right now it gets the price info from the request made by the client.
  // THIS IS WRONG it needs to look up the price in the database given
  // the id of the show/event/whatever. PRICES CANNOT COME FROM CLIENTS!!
  const data: CartItem[] = req.body.cartItems;

  var email_exists = false;
  try {
    const emails = await pool.query(
      "SELECT COUNT(*) FROM customers WHERE email = $1",
      [req.body.formData.email]
    );
    email_exists = +emails.rows[0].count > 0;
  } catch (error) {
    console.error(error.message);
    // Todo(jesse): Handle error cases
  }
  if (email_exists === false) {
    try {
      const addedCust = await pool.query(
        `INSERT INTO customers (custname, email, phone, custaddress, newsletter, donorbadge, seatingaccom) 
              values ($1, $2, $3, $4, $5, $6, $7)`,
        [
          req.body.formData["first-name"] +
            " " +
            req.body.formData["last-name"],
          req.body.formData.email,
          req.body.formData.phone,
          req.body.formData["street-address"],
          req.body.formData["opt-in"],
          false,
          req.body.formData["seating-accommodation"],
        ]
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      var body = req.body;
      var values = [
        body.formData.email,
        body.formData["first-name"] + " " + body.formData["last-name"],
        body.formData.phone,
        body.formData["street-address"],
        body.formData["opt-in"],
        body.formData["seating-accommodation"],
      ];
      const rows = await pool.query(
        `UPDATE public.customers
              SET custname=$2, phone=$3, custaddress=$4, newsletter=$5, seatingaccom=$6
              WHERE email=$1;`,
        values
      );
    } catch (error) {
      console.log(error);
    }
  }
  // storing the customer id for later processing on succesful payments.
  // if we cant find the custid something went wrong
  var customerID = null;

  try {
    customerID = await pool.query(
      `SELECT id
              FROM customers
              WHERE custname = $1`,
      [req.body.formData["first-name"] + " " + req.body.formData["last-name"]]
    );
  } catch (error) {
    console.log(error);
  }
  customerID = customerID.rows[0].id;
  const formData: CheckoutFormInfo = req.body.formData;
  const donation: number = req.body.donation;
  const donationItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Donation",
        description: "A generous donation",
      },
      // the price here needs to be fetched from the DB instead
      unit_amount: donation * 100,
    },
    quantity: 1,
  };

  let orders = req.body.cartItems.map((item) => ({
    id: item.product_id,
    quantity: item.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    //this is the offending area all this stuff needs to be replaced by info from DB based on event ID or something
    line_items: data
      .map((item) => ({
        price_data: {
          currency: "usd",
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
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000",
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
  res.json({ id: session.id });
});

// TODO: Check that provided ticket ID is valid
app.put("/api/checkin", async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const querystring = `UPDATE tickets SET checkedin=$1 WHERE ticketno=$2`;
    const values = [req.body.isCheckedIn, req.body.ticketID];
    const queryRes = await pool.query(querystring, values);
    res.json(queryRes.rows);
  } catch (err) {
    console.error(err.message);
    throw new Error("check in failed");
  }
});

//End point to create a new event
app.post("/api/create-event", async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const { eventname, eventdescription, image_url } = req.body;
    const query = `INSERT INTO events (seasonid, eventname, eventdescription, active, image_url)
              values (0, $1, $2, true, $3) RETURNING *`;
    const { rows } = await pool.query(query, [
      eventname,
      eventdescription,
      image_url,
    ]);
    res.json({ rows });
  } catch (error) {
    console.error(error);
  }
});

// End point to create a new showing
app.post("/api/create-event-instances", async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  const { instances } = req.body;
  let newInstances;
  try {
    newInstances = await eventUtils.insertAllShowings(instances);
    // Link showtime to ticket type
    const linkingdata = newInstances.map((s) => ({
      id: s.id,
      tickettype: s.tickettype,
    }));
    const query2 =
      "INSERT INTO linkedtickets (event_instance_id, ticket_type) VALUES ($1, $2)";
    for (const sh of linkingdata) {
      const { id, tickettype } = sh;
      await pool.query(query2, [id, tickettype]);
    }
    res.json({ newInstances });
  } catch (err) {
    console.error(err);
    res.status(400);
    res.send(err);
  }
});

app.put("/api/edit-event", async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  const { eventid, deltas }: { eventid: string; deltas: Delta[] } = req.body;
  if (eventid === undefined || deltas === undefined || deltas.length === 0) {
    res.status(400);
    res.send("No edits or event ID provided");
  }
  const eventChanges = deltas.filter(eventUtils.isEventChange);
  const showingChanges = deltas.filter(eventUtils.isShowingChange);

  try {
    let results = [];
    if (eventChanges.length > 0) {
      const result = await eventUtils.updateEvent(eventid, eventChanges);
      results.push(result);
    }
    if (showingChanges.length > 0) {
      console.log("TODO: edit showings");
    }

    res.json({ rows: results });
  } catch (err) {
    console.error(err.message);
    res.status(500);
    res.send("Edit event failed: " + err.message);
  }
});

// Updates salestatus in showtimes table and active flag in plays table when given a play id
app.post("/api/delete-event", async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const { id } = req.body; // playid
    if (id === undefined) {
      throw new Error("No even id provided");
    }
    const archivePlay = "UPDATE events SET active=false WHERE id=$1;";
    const archiveShowtimes =
      "UPDATE event_instances SET salestatus=false WHERE eventid=$1;";

    const archivedPlay = await pool.query(archivePlay, [id]);
    const archivedShowtimes = await pool.query(archiveShowtimes, [id]);
    res.json({ rows: [...archivedPlay.rows, ...archivedShowtimes.rows] });
  } catch (error) {
    console.error(error);
    res.status(400);
    res.send(error);
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const querystring = `
              SELECT id, eventname title, eventdescription description, image_url
              FROM events
              WHERE active=true;`;
    const data = await pool.query(querystring);
    const events = data.rows.map(eventUtils.propToString("id"));
    res.json(events);
  } catch (err) {
    console.error(err.message);
  }
});
