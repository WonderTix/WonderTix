import {loadStripe} from '@stripe/stripe-js';
import React, {ReactElement, useState} from 'react';
import {emptyDiscountCode} from './utils/adminCommon';
import {useNavigate, useLocation} from 'react-router-dom';
import AdminCart from './AdminCart';
import PopUp from '../../PopUp';
import {
  baseContact,
  CheckoutContact,
  validateContactInputAdmin,
} from '../../checkout/CheckoutUtils';
import CompleteOrderForm from '../../checkout/CompleteOrderForm';

const pk = `${process.env.REACT_APP_PUBLIC_STRIPE_KEY}`;
const stripePromise = loadStripe(pk);

/**
 * Displays Checkout Page
 *
 * @returns {ReactElement}
 */
export default function AdminCheckout(): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();

  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const eventDataFromPurchase = location.state?.eventData || [];
  const cartItems = location.state?.cartItems || [];

  const [popUpMessage, setPopUpMessage] = useState('');

  const doCheckout = async (checkoutFormInfo: CheckoutContact) => {
    try {
      const formData = {...checkoutFormInfo};
      if (formData.seatingaccom === 'Other') {
        formData.seatingaccom = formData.otherSeatingAcc;
      }

      const donation = formData.donation ? +formData.donation : 0;
      const discount = appliedDiscount ? appliedDiscount : emptyDiscountCode;

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
          body: JSON.stringify({ticketCartItems: cartItems, formData, donation, discount, orderSource: 'admin_ticketing'}),
        },
      );
      if (!response.ok) {
        throw response;
      }
      const session = await response.json();
      if (session.id === 'comp') {
        navigate(`/success`);
      }
      const result = await stripe.redirectToCheckout({sessionId: session.id});
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error response status: ', error.status);
      setPopUpMessage(
        error.json ? (await error.json()).error : 'Checkout failed',
      );
    }
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='flex flex-col lg:ml-[15rem] lg:mx-[5rem] md:ml-[13rem] tab:mx-[2rem] mx-[0.5rem] mt=[5rem] mb-[9rem]'>
        <div className='flex flex-col mt-[6rem] items-center md:flex-row rounded-[1rem] md:items-stretch md:bg-white w-full h-full'>
          <div className='min-w-414 w-full h-full md:m-[2rem] md:mr-5 mt-10 bg-zinc-100 p-2 md:p-[1rem] flex flex-col gap-5 items-start rounded-xl overflow-auto'>
            <div className='flex flex-col items-center h-auto w-full'>
              <h1 className='text-3xl font-bold mb-5'>Complete Order</h1>
              <CompleteOrderForm
                mode='admin'
                onSubmit={doCheckout}
                onBack={() =>
                  navigate('/ticketing/purchaseticket', {
                    state: {eventDataFromPurchase},
                  })
                }
                validateInput={validateContactInputAdmin}
                disabled={!cartItems.length}
                requiredFields={['firstname', 'lastname', 'email']}
                baseValues={{
                  ...baseContact,
                  donation: 0,
                }}
              />
            </div>
          </div>
          <div
            className='md:w-[30rem] w-full mt-10
              md:ml-5 md:m-[2rem] bg-zinc-900 p-9 flex
              flex-col items-center rounded-xl justify-between'
          >
            <AdminCart
              backButtonRoute='../ticketing/purchaseticket'
              eventDataFromPurchase={eventDataFromPurchase}
              onDiscountChange={setAppliedDiscount}
            />
          </div>
        </div>
      </div>
      {popUpMessage && popUpMessage !== '' && (
        <PopUp
          title='Checkout Failed'
          message={popUpMessage}
          handleProceed={() => setPopUpMessage('')}
          handleClose={() => setPopUpMessage('')}
          success={false}
          showSecondary={false}
        />
      )}
    </div>
  );
}
