import {pool} from '../db';

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
              FROM customers
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
           `UPDATE event_instances SET availableseats = availableseats - $1
                 WHERE id = $2`,
           [
             temp[counter].quantity,
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

export {refundOrder, fulfillOrder};

