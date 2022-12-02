
import {response, buildResponse, pool} from '../db';
const Stripe = require('stripe');
const stripeKey = process.env.PRIVATE_STRIPE_KEY;
/**
 * query: Initiate refund
 *
 * @type {Promise<response>}
 */
const stripe = Stripe(stripeKey);

export const initRefund = async(mode:number, id:string, amount:number): Promise<response> => {
      //Pass donation/order, donationid/orderid, amount/ordertotal (default 0.0 -> full refund)
  let query = {
    text: ``,
    values: [id],
  };
  //Retrieve payment intent from respective table
  let dbTable;
  //Mode 0 -> donation refund
  if(mode === 0){
    query.text = `SELECT payment_intent FROM donations WHERE donationid = $1;`;
    dbTable = `donations`;
  //Mode 1 -> order refund
  } else if(mode === 1){
    query.text = `SELECT payment_intent FROM orders WHERE orderid = $1;`;
    dbTable =  `orders`;
  } else { //fails
    throw new Error('Invalid refund mode');
  }

  let paymentIntent = await pool.query(query.text,query.values);
  let refund;
  paymentIntent = paymentIntent.rows[0].payment_intent; //may need 2 layers of array peeling; Only using one
  console.log('Payment Intent ' + paymentIntent);
  try{
    if(amount === 0.0){ //Full refund
      console.log("Full Refund");
      refund = await stripe.refunds.create({payment_intent: paymentIntent});
    } else { //Partial refund
      console.log("Partial Refund");
      refund = await stripe.refunds.create({payment_intent: paymentIntent, amount: amount * 100}); //assumes amount is in dollars
    }
  }catch(err: any){
    throw new Error('Refund construction error');
  }

  let refQuery = {
    text: `UPDATE ` + dbTable + ` 
            SET refund_intent = $1
            WHERE payment_intent = $2;`,
    values: [refund.id, paymentIntent],
  };
  return buildResponse(refQuery, 'PUT');
};
