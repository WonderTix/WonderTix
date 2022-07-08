/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {InputAdornment, makeStyles, Paper, TextField, Typography} from '@material-ui/core';
import {appSelector} from '../app/hooks';
import {selectDonation} from '../v1/donationSlice';
import {useState} from 'react';
import CompleteOrderForm, {CheckoutFormInfo} from './CompleteOrderForm';
import {useHistory} from 'react-router';
import {loadStripe} from '@stripe/stripe-js';

const useStyles = makeStyles({
  donationBox: {
    marginBottom: '30px',
  },
  paper: {
    padding: '30px',
    maxWidth: '75%',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default function OnlyDonationPage() {
  const donation = appSelector(selectDonation);
  const [amount, setAmount] = useState(donation);
  const classes = useStyles();
  const history = useHistory();
  const stripePromise = loadStripe('pk_test_51J5bpwGEweatMRnmGFUKgE6Q3wn7GmOJDAJ3Zag8DIhZjh324DdDUCFiEOLa0HQZFonkf2pc6lAOpPuheQs9N8AC00zNa4xALV');

  const doCheckout = async (formData: CheckoutFormInfo) => {
    const stripe = await stripePromise;
    if (!stripe) return;
    const response = await fetch('/api/events/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cartItems: [], formData, donation: amount}),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error.message);
    }
  };

  return <div className={classes.root}>
    <Paper variant="outlined" className={classes.paper}>
      <Typography variant="h3" gutterBottom>Thank you for donating</Typography>
      <TextField
        className={classes.donationBox}
        label="donation amount"
        onChange={(e) => setAmount(+e.target.value)}
        type="number"
        value={amount || null}
        fullWidth
        variant="outlined"
        InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
      />
      <CompleteOrderForm
        onSubmit={doCheckout}
        onBack={history.goBack}
        disabled={amount < 1}
        donationForm
      />
    </Paper>
  </div>;
}
