/* eslint-disable react/react-in-jsx-scope */
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
import {
  removeAllTicketsFromCart,
  selectCartContents,
  selectDiscount,
} from '../ticketingmanager/ticketing/ticketingSlice';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {loadStripe} from '@stripe/stripe-js';
import {ReactElement, useState} from 'react';
import DonationPage from '../donation/DonationPage';
import CompleteOrderForm, {CheckoutFormInfo} from './CompleteOrderForm';
import {selectDonation} from '../ticketingmanager/donationSlice';
import {useNavigate} from 'react-router-dom';
import PopUp from '../PopUp';

const pk = `${process.env.REACT_APP_PUBLIC_STRIPE_KEY}`;
const stripePromise = loadStripe(pk);

/**
 * Displays Checkout Page
 *
 * @returns {ReactElement}
 */
export default function CheckoutPage(): ReactElement {
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartContents);
  const discount = useAppSelector(selectDiscount);
  const donation = useAppSelector(selectDonation);
  const [checkoutStep, setCheckoutStep] = useState<'donation' | 'form'>(
    'donation',
  );
  const [popUp, setPopUp] = useState({
    show: false,
    title: '',
    message: '',
    success: true,
    handleProceed: () => setPopUp((popUp) => ({...popUp, show: false})),
    showSecondary: false,
  });
  const dispatch = useAppDispatch();
  const doCheckout = async (formData: CheckoutFormInfo) => {
    try {
      if (formData.seatingAcc === 'Other') {
        formData.seatingAcc = formData.comments;
      }
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
      if (session.id === 'comp') {
        dispatch(removeAllTicketsFromCart());
        navigate(`/success`);
      }
      const result = await stripe.redirectToCheckout({sessionId: session.id});
      if (result.error) throw result;
    } catch (error) {
      let message = 'Checkout failed please try again';
      console.log(error);
      if (error instanceof Response) {
        const parsedError = await error.json();
        message = error.status === 422? parsedError: message;
      }
      setPopUp({
        ...popUp,
        title: 'Checkout Error',
        message: message,
        success: false,
        show: true,
        showSecondary: false,
      });
    }
  };

  return (
    <>
      {
        popUp.show &&
          <PopUp
            title={popUp.title}
            message={popUp.message}
            handleProceed={popUp.handleProceed}
            showSecondary={popUp.showSecondary}
            success={popUp.success}
          />
      }
      <div
        className='bg-zinc-200 flex flex-col md:flex-col sm:flex-col
         max-md:items-center w-full h-full p-4 pt-20 md:p-20'
      >
        <div className='w-full mb-5'>
          <button
            onClick={() => navigate('/')}
            className='bg-blue-500 mt-10 hover:bg-blue-600 px-3 py-2 rounded-xl flex flex-row items-center text-zinc-100'
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
          back to Events
          </button>
        </div>
        <div className='flex flex-row items-center mt-2 text-zinc-800'>
          <div className='text-4xl font-bold'>Checkout</div>
        </div>
        <div className='flex flex-col items-center md:flex-row md:items-stretch sm:flex-col w-full h-full'>
          <div className='min-w-414 sm:w-full h-full md:mt-10 sm:mt-10 bg-zinc-100 p-2 pt-4 md:p-9 flex flex-col gap-5 items-start rounded-xl overflow-auto'>
            <div className='flex flex-col items-center h-auto w-full'>
              <div className='text-2xl lg:text-5xl font-bold mb-5'>
              Complete Order
              </div>
              {checkoutStep === 'donation' && (
                <DonationPage onNext={() => setCheckoutStep('form')} />
              )}
              {checkoutStep === 'form' && (
                <CompleteOrderForm
                  disabled={cartItems.length === 0}
                  onSubmit={doCheckout}
                  onBack={() => setCheckoutStep('donation')}
                />
              )}
            </div>
          </div>
          <div
            className='md:w-[30rem] sm:w-full sm:mt-10
               md:ml-5 md:mt-10 bg-zinc-900 p-9 flex
                flex-col items-center rounded-xl justify-between'
          >
            <YourOrder backButtonRoute='/' />
          </div>
        </div>
      </div>
    </>
  );
}
