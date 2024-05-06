/* eslint-disable react/react-in-jsx-scope */
import YourOrder from '../cart/YourOrder';
import {
  selectTicketCartContents,
  selectDiscount,
  selectSubscriptionCartContents,
  removeAllItemsFromCart,
} from '../ticketingmanager/ticketingSlice';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {loadStripe} from '@stripe/stripe-js';
import {ReactElement, useState} from 'react';
import DonationPage from '../donation/DonationPage';
import CompleteOrderForm from './CompleteOrderForm';
import {selectDonation} from '../ticketingmanager/donationSlice';
import {useNavigate} from 'react-router-dom';
import PopUp from '../PopUp';
import {useAuth0} from '@auth0/auth0-react';
import {
  baseContact,
  CheckoutContact,
  orderSource,
  validateContactInput,
} from './CheckoutUtils';

const pk = `${process.env.REACT_APP_PUBLIC_STRIPE_KEY}`;
const stripePromise = loadStripe(pk);

/**
 * Displays Checkout Page
 *
 * @returns {ReactElement}
 */
export default function CheckoutPage(): ReactElement {
  const navigate = useNavigate();
  const {isAuthenticated, user} = useAuth0();
  const ticketCartItems = useAppSelector(selectTicketCartContents);
  const subscriptionCartItems = useAppSelector(selectSubscriptionCartContents);
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
    handleClose: () => setPopUp((popUp) => ({...popUp, show: false})),
    handleProceed: () => setPopUp((popUp) => ({...popUp, show: false})),
    showSecondary: false,
  });
  const dispatch = useAppDispatch();
  const doCheckout = async (checkoutFormInfo: CheckoutContact) => {
    try {
      const formData = {...checkoutFormInfo};
      if (formData.seatingaccom === 'Other') {
        formData.seatingaccom = formData.otherSeatingAcc;
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
          body: JSON.stringify({
            ticketCartItems,
            subscriptionCartItems,
            formData,
            donation,
            discount,
            orderSource: orderSource.online_ticketing,
          }),
        },
      );
      if (!response.ok) {
        throw response;
      }
      const session = await response.json();
      if (session.id === 'comp') {
        dispatch(removeAllItemsFromCart());
        navigate(`/success`);
      }
      const result = await stripe.redirectToCheckout({sessionId: session.id});
      if (result.error) throw result;
    } catch (error) {
      let message = 'Checkout failed please try again';
      if (error instanceof Response && error.status === 422) {
        message = await error.json();
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
      {popUp.show && (
        <PopUp
          title={popUp.title}
          message={popUp.message}
          handleProceed={popUp.handleProceed}
          handleClose={popUp.handleClose}
          showSecondary={popUp.showSecondary}
          success={popUp.success}
        />
      )}
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
          <h1 className='text-4xl font-bold'>Checkout</h1>
        </div>
        <div className='flex flex-col items-center md:flex-row md:items-stretch sm:flex-col w-full h-full'>
          <div className='min-w-414 sm:w-full h-full md:mt-10 sm:mt-10 bg-zinc-100 p-2 pt-4 md:p-9 flex flex-col gap-5 items-start rounded-xl overflow-auto'>
            <div className='flex flex-col items-center h-auto w-full'>
              <h2 className='text-2xl lg:text-5xl font-bold mb-5'>
                Complete Order
              </h2>
              {checkoutStep === 'donation' && (
                <DonationPage onNext={() => setCheckoutStep('form')} />
              )}
              {checkoutStep === 'form' && (
                <CompleteOrderForm
                  mode='customer'
                  baseValues={{
                    ...baseContact,
                    ...(isAuthenticated && {
                      email: user.email ?? '',
                      confirmEmail: user.email ?? '',
                      firstname: user.given_name ?? '',
                      lastname: user.family_name ?? '',
                      phone: user.phone_number ?? '',
                    }),
                  }}
                  disabled={
                    !ticketCartItems.length && !subscriptionCartItems.length
                  }
                  requiredFields={[
                    'firstname',
                    'lastname',
                    'email',
                    'address',
                    'postalcode',
                  ]}
                  validateInput={validateContactInput}
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
