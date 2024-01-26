import React, {useState} from 'react';
import {useFetchToken} from '../Event/components/ShowingUtils';
import PopUp from '../../PopUp';
import format from 'date-fns/format';

export const formatUSD = (number) => {
  const formatter = new Intl.NumberFormat('en-us', {
    currency: 'USD',
    style: 'currency',
  });

  return formatter.format(number);
};

const RefundOrders = () => {
  const {token} = useFetchToken();
  const [submitting, setSubmitting] = useState(false);
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState({
    showPopUp: false,
    message: '',
    title: '',
    success: true,
    showSecondary: false,
    handleProceed: () => setShow({...show, showPopUp: false}),
    handleClose: () => setShow({...show, showPopUp: false}),
  });

  const setPopUp = (
    title: string,
    message: string,
    success: boolean,
    showPopUp: boolean,
    handle,
    secondary,
  ) => {
    setShow({
      ...show,
      title,
      message,
      success,
      showPopUp,
      handleProceed: handle,
      showSecondary: secondary,
    });
  };

  const onRefund = async (orderID) => {
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
      setOrders((orders) =>
        orders.filter((order) => order.orderid !== orderID),
      );
      setPopUp(
        'Refund Successful',
        `Order ${orderID} successfully refunded`,
        true,
        true,
        show.handleClose,
        false,
      );
      setSubmitting(false);
    } catch (error) {
      const errorMessage = await error.json();
      setPopUp(
        `Refund Failed`,
        `Order ${orderID} refund unsuccessful: ${errorMessage.error}`,
        false,
        true,
        show.handleClose,
        false,
      );
      setSubmitting(false);
    }
  };

  const onFetchOrders = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    if (!email) {
      setPopUp(
        `Invalid Search`,
        `Email required`,
        false,
        true,
        show.handleClose,
        false,
      );
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_2_URL}/order/refund?email=${email}`,
        {
          credentials: 'include',
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
      setPopUp(
        'Error',
        'Error fetching orders',
        false,
        true,
        show.handleClose,
        false,
      );
    }
  };
    console.log(orders);
  return (
    <>
      {show.showPopUp && (
        <PopUp
          title={show.title}
          message={show.message}
          handleClose={show.handleClose}
          handleProceed={show.handleProceed}
          success={show.success}
          showSecondary={show.showSecondary}
        />
      )}
      <div className='w-full h-screen overflow-x-hidden absolute'>
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-yellow-200 mb-14'>
            Refund Order
          </h1>
          <form className='mb-4' onSubmit={onFetchOrders}>
            <div className='flex'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='pointer-events-none h-5 w-5 absolute ml-6 mt-3'
                viewBox='0 0 20 20'
                fill='gray'
              >
                <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
              </svg>
              <input // search button
                type='email'
                className='text-black border-2 border-gray rounded-l-full pl-12 w-80 py-2'
                id='email'
                placeholder='John_Smith@email.com'
                aria-label='email'
              />
              <button id='email-search-input' type='submit' className='px-0'>
                <div className='hover:bg-sky-500 w-20 rounded-r-full bg-indigo-500 hover:drop-shadow-md active:bg-sky-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-11 w-11 pl-6'
                    viewBox='0 0 20 20'
                    fill='white'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </button>
            </div>
          </form>
          <table className={'w-full min-w-min'}>
            <thead>
              <tr className='grid grid-cols-6 gap-2 bg-gray-200 h-18 rounded-lg shadow-md px-2 mb-2 font-bold'>
                <td className='row-start-1 justify-self-start py-2 col-span-1'>
                  Name
                </td>
                <td className='row-start-1 justify-self-start py-2 col-span-1'>
                  Order Date & Time
                </td>
                <td className='row-start-1 justify-self-start py-2 col-span-1'>
                    Ticket(s)
                </td>
                <td className='row-start-1 justify-self-start py-2 col-span-1'>
                  Donation Total
                </td>
                <td className='row-start-1 justify-self-start py-2 col-span-1'>
                  Order Total
                </td>
                <td className='row-start-1 justify-self-center py-2 col-span-1'></td>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr className='text-center text-gray-600 grid grid-cols-6'>
                  <td className={'col-span-6'}>
                    <p>No Refundable Orders</p>
                  </td>
                </tr>
              ) : (
                orders.map((instance, index) => (
                  <tr
                    key={index}
                    className='grid grid-cols-6 gap-2 bg-gray-200 rounded-lg shadow-md px-2 mb-2 hover:bg-gray-300'
                  >
                    <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                      {instance.name}
                    </td>
                    <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                      {format(new Date(
                          instance.orderdate,
                      ), 'MM/dd/yyyy, h:mm a')}
                    </td>
                    <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                      {instance.items.length ?
                          instance.items.map((showing, showingIndex) => (<p key={showingIndex}>{showing}</p>)):
                          <p>No Tickets in order</p>
                      }
                    </td>
                    <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                      {formatUSD(instance.donation ?? 0)}
                    </td>
                    <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                      {formatUSD(instance.price)}
                    </td>
                    <td className='row-start-1 justify-self-start py-2 col-span-1'>
                      <button
                        disabled={submitting}
                        onClick={() =>
                          setPopUp(
                            'Confirm Refund',
                            'Click continue to refund this order and any associated donation',
                            false,
                            true,
                            async () => {
                              setSubmitting(true);
                              show.handleClose();
                              await onRefund(instance.orderid);
                              return;
                            },
                            true,
                          )
                        }
                        type='button'
                        className='bg-red-600 hover:bg-red-700 focus:ring-red-500
                          w-full inline-flex justify-center rounded-md border border-transparent
                          shadow-sm px-4 py-2 text-base font-medium text-white
                          focus:outline-none focus:ring-2 focus:ring-offset-2
                          tab:ml-3 tab:w-auto tab:text-sm disabled:bg-gray-500'
                      >
                        Refund
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RefundOrders;
