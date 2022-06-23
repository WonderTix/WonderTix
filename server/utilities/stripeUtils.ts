import { pool } from "../db";

const fulfillOrder = async (session) => {
  // TODO: fill me in
  // TODO: fill me in
  // gather the data from the session object and send it off to db
  // make this async function
  // added_stuff by Ad
  var custName;
  try {
    custName = await pool.query(
      `SELECT custname
              FROM customers
              WHERE id = $1`,
      [session.data.object.metadata.custid]
    );
  } catch (error) {
    console.log(error);
  }
  if (session.data.object.metadata.donation > 0) {
    try {
      const addedDonation = await pool.query(
        `INSERT INTO donations (donorid, isanonymous, amount, dononame, payment_intent)
              values ($1,$2,$3,$4,$5)`,
        [
          session.data.object.metadata.custid,
          false,
          session.data.object.metadata.donation,
          custName.rows[0].custname,
          session.data.object.id,
        ]
      );
    } catch (error) {
      console.log(error);
    }
  }
  const stripe_meta_data = JSON.parse(session.data.object.metadata.orders);
  const temp = [];
  var counter = 0;
  while (counter < stripe_meta_data.length) {
    temp[counter] = stripe_meta_data[counter];
    counter = counter + 1;
  }
  counter = 0;

  while (counter < temp.length) {
    var other_counter = 0;
    while (other_counter < temp[counter].quantity) {
      try {
        const addedTicket = await pool.query(
          `INSERT INTO tickets (eventinstanceid, custid, paid, payment_intent) 
                  values ($1, $2, $3, $4)`,
          [
            temp[counter].id,
            session.data.object.metadata.custid,
            true,
            session.data.object.id,
          ]
        );
      } catch (error) {
        console.log(error);
        other_counter = other_counter - 1;
      }
      other_counter = other_counter + 1;
    }
    counter = counter + 1;
  }
};

const refundOrder = async (session) => {
  try {
    const refundedTicket = await pool.query(
      `DELETE from tickets
              WHERE payment_intent = $1`,
      [session.data.object.payment_intent]
    );
  } catch (error) {
    console.log(error);
  }
  try {
    const refundedDonation = await pool.query(
      `DELETE from donations
              WHERE payment_intent = $1`,
      [session.data.object.payment_intent]
    );
  } catch (error) {
    console.log(error);
  }
};

export { refundOrder, fulfillOrder };
