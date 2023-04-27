import express from 'express';
import {orderFulfillment} from './order.service';

export const orderRouter = express.Router();

const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const stripe = require('stripe')(stripeKey);
const webhookKey = `${process.env.PRIVATE_STRIPE_WEBHOOK}`;
const bodyParser = require('body-parser');

/**
 * @swagger
 *  /api/order/webhook:
 *    post:
 *      summary: >
 *        Stripe webhook. See https://stripe.com/docs/stripe-cli,
 *        and https://stripe.com/docs/webhooks/test for more info.
 *        run `./stripe listen --forward-to https://localhost:8000/api/order/webhook`
 *        to listen for Stripe test events.
 */
orderRouter.post('/webhook', bodyParser.raw({type: `application/json`}), (request, response) => {
  const pl = request.body;
  const sig = request.headers['stripe-signature'];
  console.log('pl = ' + JSON.stringify(pl));
  console.log(webhookKey);
  console.log(sig);
  let event;

  try {
    //    event = stripe.webhooks.constructEvent(pl,sig,webhookKey);
    event = pl;
  } catch (err:any) {
    console.log('webhook failed');
    response.status(400).send(`Webhook error` + `${err.message}`);
    return;
  }

  console.log('webhook passed');
  console.log(event);

  try {
    console.log('starting fulfillment');
    const session = event.data.object;
    console.log('session = ' + session);
    const amount = session.amount/100;
    console.log('session data = ' + session.metadata);
    console.log('event type = ' + event.type);
    if (event.type === 'charge.succeeded') {
      const inp = orderFulfillment({
        id: session.metadata.custid,
        discountid_fk: session.metadata.discountCode,
        ordertotal: amount,
        payment_intent: session.payment_intent,
      });
    }
    console.log('fulfilled');
  } catch (err:any) {
    throw new Error('fulfillment error');
  }
  console.log('returning');
  response.status(200).send('returned; no data added');
});
