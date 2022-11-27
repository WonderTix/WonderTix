
import {response, buildResponse} from '../db';
import Stripe from 'stripe';
const Stripe = require('stripe');
const stripeKey = process.env.PRIVATE_STRIPE_KEY ?
  process.env.PRIVATE_STRIPE_KEY : '';
/**
 * query: Initiate refund
 *
 * @type {Promise<response>}
 */
const stripe = Stripe(stripeKey);

export const initRefund = async initRefund(mode, id, amount): Promise<response> => {
      //Pass donation/order, donationid/orderid, amount/ordertotal (default 0.0 -> full refund)
  let query = {
    text: ``,
    values: [],
  };
  //Retrieve payment intent from respective table
  let dbTable;
  if(mode === 0){//Mode 0 -> donation refund
    query.text = `SELECT payment_intent FROM donatons WHERE donationid = $1`;
    query.values = [id];
    dbTable = orders;
  } else if(mode === 1){//Mode 1 -> order refund
    query.text = `SELECT payment_intent FROM payment WHERE oderid = $1`;
    query.values = [id];
    dbTable = donations;
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
    values: [dbtable, refund.id, paymentIntent],
  };
  return buildResponse(refQuery, 'PUT');
};
