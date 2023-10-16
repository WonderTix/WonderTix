import React, {useEffect, useState} from 'react';
import {useFetchToken} from '../showings/ShowingUpdated/ShowingUtils';
import PopUp from '../../Pop-up';


const Refund = () => {
  const {token} = useFetchToken();
  const [show, setShow] = useState({
    showPopUp: false,
    message: '',
    title: '',
    success: true,
    handle: () => {
      setShow((p) => ({...p, showPopUp: false}));
    },
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    const orderID = event.target.payment_intent.value;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_2_URL}/order/refund/${orderID}`,
        {
          credentials: 'include',
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw response;
      }

      setShow({
        ...show,
        showPopUp: true,
        message: `Order ${orderID} successfully refunded`,
        title: `Order Refund Successful`,
        success: true,
      });
    } catch (error) {
      const errorMessage = await error.json();
      setShow({
        ...show,
        showPopUp: true,
        message: `Order ${orderID} refund unsuccessful ${errorMessage.error}`,
        title: `Order Refund Failed`,
        success: false,
      });
    }
  };

  return (
    <>
      {show.showPopUp &&
      <PopUp
        title={show.title}
        message={show.message}
        handleClose={show.handle}
        handleProceed={show.handle}
        success={show.success}
      />
      }
      <div className='w-full h-screen overflow-x-hidden absolute '>
        <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
          <div className='flex flex-row'>
            <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 mb-14'>
              Refund Ticket
            </h1>
          </div>
          <div className='flex flex-wrap justify-center h-fit gap-x-24'>
            <form
              onSubmit={onSubmit}
              className='w-80 bg-gradient-to-r from-sky-500 to-indigo-500 drop-shadow-xl
            text-center rounded-xl m-3 p-3'
            >
              <h2 className='text-xl font-bold text-white m-4'>Stripe Order</h2>
              <div className='flex flex-wrap w-64 mx-auto'>
                <label
                  htmlFor='payment_intent'
                  className='text-white text-l'
                  id='payment-input'
                >
                 Order ID
                  <input
                    className='text-black w-full mt-1 mb-3 px-2 py-2 rounded'
                    type='text'
                    id='payment_intent'
                    name='payment_intent'
                    placeholder='XXXXX...'
                  />
                </label>
              </div>
              <button
                type={'submit'}
                className='bg-red-700
              hover:bg-red-500 text-white mt-5 py-2 px-4 rounded'
              >
                Refund
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Refund;
