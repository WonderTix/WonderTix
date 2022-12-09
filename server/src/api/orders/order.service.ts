import {pool, response, buildResponse} from '../db';
export {refundOrder, fulfillOrder, orderFulfillment};

const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const stripe = require('stripe')(stripeKey);
const webhookKey = `${process.env.PRIVATE_STRIPE_WEBHOOK}`;
const bodyParser = require('body-parser');

// orderFullfillment is now used instead. Leaving it here for reference but
// could be removed
const fulfillOrder = async (session: any) => {
  // TODO: fill me in
  // TODO: fill me in
  // gather the data from the session object and send it off to db
  // make this async function
  // added_stuff by Ad
  let custName;
  try {
    custName = await pool.query(
        `SELECT custname
              FROM contacts
              WHERE id = $1`,
        [session.data.object.metadata.custid],
    );
    if (session.data.object.metadata.donation > 0) {
      await pool.query(
          `INSERT INTO donations (donorid, isanonymous, amount, ` +
            `dononame, payment_intent) values ($1,$2,$3,$4,$5)`,
          [
            session.data.object.metadata.custid,
            false,
            session.data.object.metadata.donation,
            custName.rows[0].custname,
            session.data.object.id,
          ],
      );
    }
  } catch (error) {
    console.log(error);
  }
  const stripeMetadata = JSON.parse(session.data.object.metadata.orders);
  const temp = [];
  let counter = 0;
  while (counter < stripeMetadata.length) {
    temp[counter] = stripeMetadata[counter];
    counter = counter + 1;
  }
  counter = 0;

  while (counter < temp.length) {
    let otherCounter = 0;
    while (otherCounter < temp[counter].quantity) {
      try {
        await pool.query(
            `INSERT INTO tickets (eventinstanceid, custid, paid, payment_intent)
                  values ($1, $2, $3, $4)`,
            [
              temp[counter].id,
              session.data.object.metadata.custid,
              true,
              session.data.object.id,
            ],
        );
      } catch (error) {
        console.log(error);
        otherCounter = otherCounter - 1;
      }
      try {
        await pool.query(
            `UPDATE event_instances SET availableseats = availableseats - 1
                 WHERE id = $1`,
            [
              temp[counter].id,
            ],
        );
      } catch (error) {
        console.log(error);
      }
      otherCounter = otherCounter + 1;
    }
    counter = counter + 1;
  }
};

// Not used
const refundOrder = async (session: any) => {
  try {
    await pool.query(
        `DELETE from tickets
              WHERE payment_intent = $1`,
        [session.data.object.payment_intent],
    );
  } catch (error) {
    console.log(error);
  }
  try {
    await pool.query(
        `DELETE from donations
              WHERE payment_intent = $1`,
        [session.data.object.payment_intent],
    );
  } catch (error) {
    console.log(error);
  }
};

const orderFulfillment = async (params:any): Promise<response> => {
  const odate = new Date();
  let st = '' + odate.getFullYear();
  if (odate.getMonth() < 10) {
    st = st + '0' + odate.getMonth();
  } else {
    st = st + '' + odate.getMonth();
  }
  if (odate.getDay() < 10) {
    st = st + '0' + odate.getDay();
  } else {
    st = st + '' + odate.getDay();
  }
  const orderdate = Number(st);
  console.log('order date = ' + orderdate);
  const ordertime = odate.getHours() +':'+ odate.getMinutes() +':'+ odate.getSeconds() +'-'+ odate.getTimezoneOffset();
  // Needs discount codes added
  const query = {
    text: `INSERT INTO orders
    (
      contactid_fk,
      orderdate,
      ordertime,
      ordertotal,
      payment_intent
    )
    VALUES($1, $2, $3, $4, $5);`,
    values: [params.id, orderdate, ordertime, params.ordertotal, params.payment_intent],
  };
  return await buildResponse(query, 'POST');
};
