/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import YourOrder from '../cart/YourOrder';
import {selectCartContents} from '../ticketingmanager/ticketing/ticketingSlice';
import {useAppSelector} from '../app/hooks';
import {loadStripe} from '@stripe/stripe-js';
import {ReactElement, useState} from 'react';
import DonationPage from '../donation/DonationPage';
import CompleteOrderForm, {CheckoutFormInfo} from './CompleteOrderForm';
import {selectDonation} from '../ticketingmanager/donationSlice';
import {useNavigate} from 'react-router-dom';

// const pk = `${process.env.PUBLIC_STRIPE_KEY}`;
const pk = `pk_test_51LYvt2L95zqXUSVMjbBbBmIeGvvFTrq6p1zwj3RmMGQ0zgKOGcqeUCNFsgLAt7bcn01fnzz3rnwehrLBSfSFQUb300J5jCAfOE`;
// const pk = `pk_live_51LarKnLnmVGBW71PE5iZvRz1YyozIa1DggXkHwUB6xoVwaEhohEZKsestQwUtx0jAl98f3As5T7wIJ7MGDsvHPik000tLSC9xC`;
const stripePromise = loadStripe(pk);

/**
 * Displays Checkout Page
 *
 * @returns {ReactElement}
 */
export default function CheckoutPage(): ReactElement {
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartContents);
  const donation = useAppSelector(selectDonation);
  const [checkoutStep, setCheckoutStep] = useState<'donation' | 'form'>('donation');
  const doCheckout = async (formData: CheckoutFormInfo) => {
    const stripe = await stripePromise;
    if (!stripe) return;
    const response = await fetch(process.env.REACT_APP_ROOT_URL + `/api/events/checkout`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cartItems, formData, donation}),
    });
    const session = await response.json();
    console.log(session.id);
    console.log(pk);
    const paymentIntent = session.payment_intent;
    const result = await(stripe.redirectToCheckout({sessionId: session.id}));
    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <div className='w-full h-screen'>
      <div className='w-full h-screen bg-zinc-200'>
        <div className='flex flex-col md:flex-col sm:flex-col
         sm:items-center w-full h-full p-20 overflow-y-scroll'>
          <div className='w-full flex flex-row mb-5'>
            <button onClick={() => navigate('/')} className='bg-blue-500 mt-10 hover:bg-blue-600 px-3 py-2 rounded-xl flex flex-row items-center text-zinc-100'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              back to Events</button>
          </div>
          <div className='flex flex-row items-center mt-2 text-zinc-800'>
            <div className='text-4xl font-bold mt-2 mb-5'>Checkout</div>
          </div>
          <div className='flex flex-col md:flex-row sm:flex-col
         sm:items-center w-full h-full'>
            <div className='w-full h-full md:mt-20 sm:mt-20 bg-zinc-100 p-9 flex flex-col gap-5 items-start rounded-xl'>
              <div className='flex flex-col items-center h-full w-full'>
                <div className='text-5xl font-bold mb-9'>Complete Order</div>
                {checkoutStep === 'donation' && <DonationPage onNext={() => setCheckoutStep('form')}/>}
                {checkoutStep === 'form' && <CompleteOrderForm disabled={cartItems.length === 0} onSubmit={doCheckout} onBack={() => setCheckoutStep('donation')}/>}
              </div>
            </div>
            <div className='md:w-[30rem] sm:w-full sm:mt-10
               md:ml-5 h-full md:mt-20 bg-zinc-900 p-9 flex
                flex-col items-center rounded-xl justify-between'>
              <YourOrder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
