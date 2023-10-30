/* eslint-disable react/react-in-jsx-scope */

import YourOrder from '../../cart/YourOrder';
import {
  CartItem,
  removeAllTicketsFromCart,
  selectCartContents,
  selectDiscount,
} from '../../ticketingmanager/ticketing/ticketingSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {loadStripe} from '@stripe/stripe-js';
import {ReactElement, useState} from 'react';
import AdminCompleteOrderForm, {
  CheckoutFormInfo,
} from './AdminCompleteOrderForm';
import {selectDonation} from '../../ticketingmanager/donationSlice';
import {useNavigate, useLocation} from 'react-router-dom';
import AdminCart from './AdminCart';

const pk = `${process.env.REACT_APP_PUBLIC_STRIPE_KEY}`;
const stripePromise = loadStripe(pk);

/**
 * Displays Checkout Page
 *
 * @returns {ReactElement}
 */
export default function AdminCheckout(): ReactElement {
  const location = useLocation();
  const eventDataFromPurchase = location.state?.eventData || [];
  console.log('eventDataFromPurchase:', eventDataFromPurchase);
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const discount = useAppSelector(selectDiscount);
  const handleBackButton = () => {
    navigate('/ticketing/purchaseticket');
  };
  const dispatch = useAppDispatch();

  const doCheckout = async (formData: CheckoutFormInfo) => {
    try {
      if (formData.seatingAcc === 'Other') {
        formData.seatingAcc = formData.comments;
      }
      const donation = formData.donation;
      const stripe = await stripePromise;
      if (!stripe) return;
      const response = await fetch(
        process.env.REACT_APP_API_2_URL + `/events/checkout`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({cartItems, formData, donation, discount}),
        },
      );
      if (!response.ok) {
        throw response;
      }
      const session = await response.json();
      if (session.id == 'comp') {
        dispatch(removeAllTicketsFromCart());
        navigate(`/success`);
      }
      const paymentIntent = session.payment_intent;
      const result = await stripe.redirectToCheckout({sessionId: session.id});
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error response status: ', error.status);
      console.error('Error response status text: ', error.statusText);
      if (error.json) {
        const errorMessage = await error.json();
        console.error('Error message from server: ', errorMessage);
      }
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
                disabled={false} // {cartItems.length === 0}
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
            <AdminCart
              backButtonRoute='../ticketing/purchaseticket'
              eventDataFromPurchase={eventDataFromPurchase}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
