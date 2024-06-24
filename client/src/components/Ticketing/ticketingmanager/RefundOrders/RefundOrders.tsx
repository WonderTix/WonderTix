import React, {useState} from 'react';
import {useFetchToken} from '../Event/components/ShowingUtils';
import PopUp from '../../PopUp';
import format from 'date-fns/format';
import {SearchIcon, UserIcon} from '../../Icons';

export const formatUSD = (number) => {
  const formatter = new Intl.NumberFormat('en-us', {
    currency: 'USD',
    style: 'currency',
    currencySign: 'accounting',
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
    primaryLabel: 'Continue',
    secondaryLabel: 'Close',
  });

  const setPopUp = (
    title: string,
    message: string,
    success: boolean,
    showPopUp: boolean,
    handle: () => void,
    showSecondary: boolean,
    primaryLabel: string,
    secondaryLabel?: string,
  ) => {
    setShow({
      ...show,
      title,
      message,
      success,
      showPopUp,
      handleProceed: handle,
      showSecondary: showSecondary,
      primaryLabel,
      ...(secondaryLabel && {secondaryLabel: secondaryLabel}),
    });
  };

  const onRefund = async (orderID) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_2_URL}/order/refund/${orderID}`,
        {
          credentials: 'include',
          method: 'PUT',
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
        'Refund Process Started',
        `Order ${orderID} refund process successfully started`,
        true,
        true,
        show.handleClose,
        false,
        'Continue',
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
        'Continue',
      );
      setSubmitting(false);
    }
  };

  const onFetchOrders = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    if (!email) {
      setOrders([]);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_2_URL}/order/refund?search=${email}`,
        {
          credentials: 'include',
          method: 'GET',
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
        'Continue',
      );
    }
  };
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
          primaryLabel={show.primaryLabel}
          secondaryLabel={show.secondaryLabel}
        />
      )}
      <main className='w-full h-screen overflow-x-hidden absolute'>
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-yellow-200 mb-14'>
            Refund Orders
          </h1>
          <form
            className='inline-flex mb-3 drop-shadow-sm'
            onSubmit={onFetchOrders}
          >
            <UserIcon className='text-gray-500 pointer-events-none h-5 w-5 absolute ml-3 mt-3' />
            <input
              type='text'
              className='text-zinc-800 border-y-2 border-l-2 border-gray rounded-l-lg pl-10 w-80 py-2'
              id='name-email-input'
              placeholder='Name or email'
              aria-label='Name or email'
            />
            <button
              id='order-search-input'
              type='submit'
              className='px-0 flex justify-center text-white items-center bg-zinc-800 hover:bg-zinc-700 w-12 rounded-r-lg hover:drop-shadow-md active:bg-zinc-600'
              aria-label='Search'
            >
              <SearchIcon className='h-6 w-6' strokeWidth={2.5} />
            </button>
          </form>
          <table className='w-full border-spacing-y-2 border-separate'>
            <thead>
              <tr className='bg-gray-200 drop-shadow-md font-bold whitespace-nowrap text-left'>
                <th className='p-2 pl-4 rounded-l-lg'>Name</th>
                <th className='p-2'>Email</th>
                <th className='p-2'>Order Date</th>
                <th className='p-2'>Order Item(s)</th>
                <th className='p-2'>Donation</th>
                <th className='p-2'>Order Total</th>
                <th className='p-2 rounded-r-lg'></th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr className='text-center text-gray-600'>
                  <td colSpan={7}>
                    <p>No Refundable Orders</p>
                  </td>
                </tr>
              ) : (
                orders.map((instance, index) => (
                  <tr
                    key={index}
                    className='bg-gray-200 drop-shadow-md hover:bg-gray-300'
                  >
                    <td className='pl-4 py-2 rounded-l-lg'>{instance.name}</td>
                    <td className='pl-2 py-2'>{instance.email}</td>
                    <td className='pl-2 py-2'>
                      {format(new Date(instance.orderdate), 'MM/dd/yyyy')}
                    </td>
                    <td className='pl-2 py-2'>
                      {instance.orderitems.length ? (
                        instance.orderitems.map((item, index) => (
                          <p key={index}>
                            {item.quantity} x {item.type} -{' '}
                            <span className='italic'>{item.description}</span>
                          </p>
                        ))
                      ) : (
                        <p>No Refundable Order Items</p>
                      )}
                    </td>
                    <td className='pl-2 py-2'>
                      {formatUSD(instance.donation ?? 0)}
                    </td>
                    <td className='pl-2 py-2'>{formatUSD(instance.price)}</td>
                    <td className='py-2 px-2 rounded-r-lg'>
                      <button
                        disabled={submitting}
                        onClick={() =>
                          setPopUp(
                            'Confirm Refund',
                            'Click Refund to refund this order and any associated donation',
                            false,
                            true,
                            async () => {
                              setSubmitting(true);
                              show.handleClose();
                              await onRefund(instance.orderid);
                              return;
                            },
                            true,
                            'Refund',
                            'Cancel',
                          )
                        }
                        type='button'
                        className='bg-red-600 hover:bg-red-700 focus:ring-red-500
                          w-full inline-flex justify-center rounded-md border border-transparent
                          shadow-sm px-3 py-2 text-base font-medium text-white
                          focus:outline-none focus:ring-2 focus:ring-offset-2
                          tab:w-auto tab:text-sm disabled:bg-gray-500'
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
      </main>
    </>
  );
};

export default RefundOrders;
