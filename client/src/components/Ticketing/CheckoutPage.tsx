/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {Paper, makeStyles, Typography} from '@material-ui/core';
import YourOrder from '../v1/ticketing/cart/YourOrder';
import {selectCartContents} from '../v1/ticketing/ticketingSlice';
import {appSelector} from '../app/hooks';
import {loadStripe} from '@stripe/stripe-js';
import {useState} from 'react';
import DonationPage from './DonationPage';
import CompleteOrderForm, {CheckoutFormInfo} from './CompleteOrderForm';
import {selectDonation} from '../v1/donationSlice';

// FYI this is ok to stay here; it's the public key so other people can't do anything with it anyway.
const stripePromise = loadStripe('pk_test_51J5bpwGEweatMRnmGFUKgE6Q3wn7GmOJDAJ3Zag8DIhZjh324DdDUCFiEOLa0HQZFonkf2pc6lAOpPuheQs9N8AC00zNa4xALV');

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    left: 0,
    minHeight: '90%',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px',
  },
  paper: {
    width: '50%',
    padding: '30px',
  },
  pageTitle: {
    marginBottom: '0.5em',
  },
});

export default function CheckoutPage() {
  const cartItems = appSelector(selectCartContents);
  const donation = appSelector(selectDonation);
  const [checkoutStep, setCheckoutStep] = useState<'donation' | 'form'>('donation');
  const classes = useStyles();

  const doCheckout = async (formData: CheckoutFormInfo) => {
    const stripe = await stripePromise;
    if (!stripe) return;
    const response = await fetch('/api/events/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cartItems, formData, donation}),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <div className={classes.root}>
      <YourOrder />
      <Paper className={classes.paper} variant="outlined">
        <Typography variant="h3" className={classes.pageTitle}>Complete Order</Typography>
        {checkoutStep === 'donation' && <DonationPage onNext={() => setCheckoutStep('form')}/>}
        {checkoutStep === 'form' && <CompleteOrderForm disabled={cartItems.length === 0} onSubmit={doCheckout} onBack={() => setCheckoutStep('donation')}/>}
      </Paper>
    </div>
  );
}
