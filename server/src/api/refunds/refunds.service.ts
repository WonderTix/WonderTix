
import {response, buildResponse, pool} from '../db';
const Stripe = require('stripe');
const stripeKey = process.env.PRIVATE_STRIPE_KEY;
/**
 * query: Initiate refund
 *
 * @type {Promise<response>}
 */
const stripe = Stripe(stripeKey);

export const initRefund = async(mode:number = 0, id:string = ``, amount:number = 0.0): Promise<response> => {
      //Pass donation/order, donationid/orderid, amount/ordertotal (default 0.0 -> full refund)
  let query = {
    text: ``,
    values: [id],
  };
  //Retrieve payment intent from respective table
  let dbTable;
  //Mode 0 -> donation refund
  if(mode === 0){
    query.text = `SELECT payment_intent FROM donations WHERE donationid = $1`;
    dbTable = `orders`;
  //Mode 1 -> order refund
  } else if(mode === 1){
    query.text = `SELECT payment_intent FROM payment WHERE oderid = $1`;
    dbTable =  `donations`;
  } else { //fails
    throw new Error('Invalid refund mode');
  }

  let paymentIntent = await pool.query(query.text,query.values);
  let refund;
  paymentIntent = paymentIntent.rows[0]; //may need 2 layers of array peeling; Only using one
  try{
    if(amount === 0.0){ //Full refund
      refund = await stripe.refunds.create({payment_inetent: paymentIntent});
    } else { //Partial refund
      refund = await stripe.refunds.create({payment_inetent: paymentIntent, amount: amount * 100}); //assumes amount is in dollars
    }
  }catch(err: any){
    throw new Error('Refund construction error');
  }
  let refQuery = {
    text: `UPDATE $1
            SET refund_id = $2
            WHERE payment_intent = $3`,
    values: [dbTable, refund.id, paymentIntent],
  };
  return buildResponse(refQuery, 'POST');
};
