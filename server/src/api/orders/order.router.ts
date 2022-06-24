import { fulfillOrder, refundOrder } from "../../../utilities/stripeUtils";
import { app } from "../../server";

app.post("/webhook", async (req, res) => {
  // TESTING WIHT SOME SIGNATURE VERIFICATION
  // const payload = req.body;
  // console.log("PAYLOAD:   ");
  // console.log(payload);
  // const signature = req.headers['stripe-signature'];
  // console.log("SIGNATURE:   ");
  // console.log(signature);
  // let event;
  // try {
  //     event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  // } catch (error) {
  //     console.log(error);
  //     return;
  // }
  const event = req.body;

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful");

      fulfillOrder(event);
      break;
    case "charge.refunded":
      refundOrder(event);
      console.log("refund created");
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});
