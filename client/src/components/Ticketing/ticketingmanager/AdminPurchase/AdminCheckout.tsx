/* eslint-disable react/react-in-jsx-scope */

import YourOrder from '../../cart/YourOrder';
import {
  selectCartContents,
  selectDiscount,
} from '../../ticketingmanager/ticketing/ticketingSlice';
import {useAppSelector} from '../../app/hooks';
import {loadStripe} from '@stripe/stripe-js';
import {ReactElement, useState} from 'react';
import AdminCompleteOrderForm, {
  CheckoutFormInfo,
} from './AdminCompleteOrderForm';
import {selectDonation} from '../../ticketingmanager/donationSlice';
import {useNavigate, useLocation} from 'react-router-dom';

const pk = `${process.env.REACT_APP_PUBLIC_STRIPE_KEY}`;
const stripePromise = loadStripe(pk);

/**
 * Displays Checkout Page
 *
 * @returns {ReactElement}
 */
export default function CheckoutPage(): ReactElement {
  const location = useLocation();
  const ticketData = location.state;
  console.log('Ticket Data:, ticketData');
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartContents);
  const discount = useAppSelector(selectDiscount);
  const donation = useAppSelector(selectDonation);
  const handleBackButton = () => {
    navigate('/ticketing/purchaseticket');
  };
  const doCheckout = async (formData: CheckoutFormInfo) => {
    if (formData.seatingAcc === 'Other') {
      formData.seatingAcc = formData.comments;
    }
    const stripe = await stripePromise;
    if (!stripe) return;
    const response = await fetch(
      process.env.REACT_APP_API_1_URL + `/events/checkout`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({cartItems, formData, donation, discount}),
      },
    );
    const session = await response.json();
    const paymentIntent = session.payment_intent;
    const result = await stripe.redirectToCheckout({sessionId: session.id});
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='flex flex-col lg:ml-[15rem] lg:mx-[5rem] md:ml-[13rem] tab:mx-[2rem] mx-[0.5rem] mt=[5rem] mb-[9rem]'>
        <div className='flex flex-row items-center h-auto mt-[7.25rem] md:w-full mb-5'>
          <button
            onClick={() => navigate('../ticketing/purchaseticket')}
            className='bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-xl flex flex-row items-center text-zinc-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            back to Purchase
          </button>
        </div>
        <div className='flex flex-row items-center mt-2 text-zinc-800'></div>
        <div className='flex flex-col items-center md:flex-row rounded-[1rem] md:items-stretch md:bg-white sm:flex-col w-full h-full'>
          <div className='min-w-414 sm:w-full h-full md:m-[2rem] sm:mt-10 bg-zinc-100 p-2 md:p-[1rem] flex flex-col gap-5 items-start rounded-xl overflow-auto'>
            <div className='flex flex-col items-center h-auto w-full'>
              <div className='text-2xl lg:text-5xl font-bold mb-5'>
                Complete Order
              </div>
              <AdminCompleteOrderForm
                disabled={cartItems.length === 0}
                onSubmit={doCheckout}
                onBack={handleBackButton}
              />
            </div>
          </div>
          <div
            className='md:w-[30rem] sm:w-full sm:mt-10
               md:ml-5 md:m-[2rem] bg-zinc-900 p-9 flex
                flex-col items-center rounded-xl justify-between'
          >
            <YourOrder backButtonRoute='../ticketing/purchaseticket' />
          </div>
        </div>
      </div>
    </div>
  );
}
