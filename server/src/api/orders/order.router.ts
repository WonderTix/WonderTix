import express from 'express';
import {fulfillOrder, refundOrder, orderFulfillment} from './order.service';

export const orderRouter = express.Router();

const stripeKey = `${process.env.PRIVATE_STRIPE_KEY}`;
const stripe = require('stripe')(stripeKey);
const webhookKey = `${process.env.PRIVATE_STRIPE_WEBHOOK}`;
const bodyParser = require('body-parser');
/* This route serves as a webhook to fulfill orders successfully processed by
*  Stripe. See https://stripe.com/docs/api/events/retrieve for details on the request body
*/
orderRouter.post('/', async (req, res) => {
  // TESTING WIHT SOME SIGNATURE VERIFICATION
  // const payload = req.body;
  // console.log("PAYLOAD:   ");
  // console.log(payload);
  // const signature = req.headers['stripe-signature'];
  // console.log("SIGNATURE:   ");
  // console.log(signature);
  // let event;
  // try {
  // event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  // } catch (error) {
  //     console.log(error);
  //     return;
  // }
  const event = req.body;

  switch (event.type) {
    case 'payment_intent.succeeded':
      // const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful');

      fulfillOrder(event);
      break;
    case 'charge.refunded':
      refundOrder(event);
      console.log('refund created');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({received: true});
});

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
