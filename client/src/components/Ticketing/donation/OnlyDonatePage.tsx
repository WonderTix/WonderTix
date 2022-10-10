/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {useAppSelector} from '../app/hooks';
import {selectDonation} from '../ticketingmanager/donationSlice';
import React, {ReactElement, useState} from 'react';
import CompleteOrderForm, {CheckoutFormInfo} from '../checkout/CompleteOrderForm';
import {useNavigate} from 'react-router';
import {loadStripe} from '@stripe/stripe-js';

/**
 * Renders the Donations page without checkout
 * @return {ReactElement}
 */
export default function OnlyDonationPage(): ReactElement {
  const donation = useAppSelector(selectDonation);
  const [amount, setAmount] = useState(donation);
  const history = useNavigate();

  // Replace this with your stripe public key
  const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_KEY);

  const doCheckout = async (formData: CheckoutFormInfo) => {
    const stripe = await stripePromise;
    if (!stripe) return;
    const response = await fetch(process.env.REACT_APP_ROOT_URL + '/api/events/checkout', {
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

  return (
    <div className='w-full p-40 flex flex-col items-center'>
      <div className='w-full flex flex-row mb-8'>
        <button onClick={() => history('/')} className='bg-blue-500 mt-10 hover:bg-blue-600 px-3 py-2 rounded-xl flex flex-row items-center text-zinc-100'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
              back to Events</button>
      </div>

      <div className='text-3xl text-black font-bold mb-12'>Thank you for donating</div>
      <div className='flex flex-col w-full items-start'>
        <div className='text-sm text-zinc-600 ml-2'>Donation Amount $</div>
        <input
          placeholder="Donation Amount"
          onChange={(e) => setAmount(+e.target.value)}
          type="number"
          className='w-full mb-7 bg-zinc-200 text-black p-5 rounded-xl'
          value={amount || null}
        />
      </div>

      <CompleteOrderForm
        onSubmit={doCheckout}
        onBack={() => history(-1)}
        disabled={amount < 1}
        donationForm
      />
    </div>
  );
}
