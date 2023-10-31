import React, {useState} from 'react';
import {useFetchToken} from '../showings/ShowingUpdated/ShowingUtils';
import PopUp from '../../PopUp';


const Refund = () => {
  const format = new Intl.NumberFormat(
    'en-us',
    {
      currency: 'USD',
      style: 'currency',
    });
  const {token} = useFetchToken();
  const [show, setShow] = useState({
    showPopUp: false,
    message: '',
    title: '',
    success: true,
    showSecondary: false,
    handleProceed: () => setShow({...show, showPopUp: false}),
    handleClose: () => setShow({...show, showPopUp: false}),
  });
  const handle = () => setShow((p) =>({...p, showPopUp: false}));
  const setPopUp = (title:string, message:string, success:boolean, showPopUp: boolean, handle, secondary) => {
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
  const [submitting, setSubmitting] = useState(false);
  const [orders, setOrders] = useState([]);

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
      setOrders((orders) => orders.filter((order) => order.orderid !== orderID));
      setPopUp(
        'Order Refund Successful',
        `Order ${orderID} successful refunded`,
        true,
        true,
        handle,
        false,
      );
      setSubmitting(false);
    } catch (error) {
      const errorMessage = await error.json();
      setPopUp(
        `Order Refund Failed`,
        `Order ${orderID} refund unsuccessful ${errorMessage.error}`,
        false,
        true,
        handle,
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
        `Invalid search`,
        `Email Required`,
        false,
        true,
        handle,
        false,
      );
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_2_URL}/order/?email=${email}`,
        {
          credentials: 'include',
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
      setPopUp(
        'Error',
        'Return failed',
        false,
        true,
        handle,
        false);
    }
  };

  return (
    <>
      {show.showPopUp &&
      <PopUp
        title={show.title}
        message={show.message}
        handleClose={show.handleClose}
        handleProceed={show.handleProceed}
        success={show.success}
        showSecondary={show.showSecondary}
      />
      }
      <div className='w-full h-screen overflow-x-hidden absolute '>
        <table className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
            <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 mb-14'>
              Refund Ticket
            </h1>
          <form className='mb-4' onSubmit={onFetchOrders}>
              <div className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none h-5 w-5 absolute ml-6 mt-3" viewBox="0 0 20 20" fill="gray">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <input // search button
                  type='email'
                  className='text-black border-2 border-gray rounded-l-full pl-12 w-80 py-2'
                  id='email'
                  placeholder='John_Smith@email.com'
                />
                <button id='email-search-input' type='submit' className='px-0'>
                  <div className='hover:bg-sky-500 w-20 rounded-r-full bg-indigo-500 hover:drop-shadow-md active:bg-sky-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-11 pl-6" viewBox="0 0 20 20" fill="white">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </button>
              </div>
          </form>
          <tbody className='w-full min-w-min'>
            <thead>
            <tr className='grid grid-cols-5 gap-2 bg-gray-200 h-18 rounded-lg shadow-md px-2 mb-2 font-bold'>
              <td className='row-start-1 justify-self-start py-2 col-span-1'>Name</td>
              <td className='row-start-1 justify-self-start py-2 col-span-1'>Date</td>
              <td className='row-start-1 justify-self-start py-2 col-span-1'>Showing(s)</td>
              <td className='row-start-1 justify-self-start py-2 col-span-1'>Total</td>
              <td className='row-start-1 justify-self-center py-2 col-span-1'></td>
            </tr>
            </thead>
            <tbody>
            {orders.length === 0 ? (
              <tr className="text-center text-gray-600">
                <td className={'col-span-5'}>
                  <p>
                    No Refundable Orders
                  </p>
                </td>
              </tr>
            ) : (
              orders.map((instance, index) => (
                <tr key={index} className = 'grid grid-cols-5 gap-2 bg-gray-200 rounded-lg shadow-md px-2 mb-2 hover:bg-gray-300'>
                  <td className = 'row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                    {instance.name}
                  </td>
                  <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                    {new Date(`${instance.orderdate} ${instance.ordertime.split('T')[1].slice(0, 6)}`).toLocaleString()}
                  </td>
                  <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                    {Array.isArray(instance.showings) ? (
                      instance.showings.map((showing, showingIndex) => (
                        <p key={showingIndex}>{showing}</p>
                      ))
                    ) : (
                      <div>{instance.showings}</div>
                    )}
                  </td>
                  <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                    {format.format(instance.price)}
                  </td>
                  <td className='row-start-1 justify-self-start py-2 col-span-1'>
                    <button
                      disabled={submitting}
                      onClick={ () =>
                        setPopUp(
                          'Confirm Refund',
                          'Click continue to refund',
                          false,
                          true,
                          async () => {
                            setSubmitting(true);
                            handle();
                            await onRefund(instance.orderid);
                            return;
                          },
                          true,
                        )}
                      type='button'
                      className='bg-red-700 hover:bg-red-500 text-white py-2 px-4 rounded active:bg-red-600 disabled:bg-gray-500'
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
    </>
  );
};

export default Refund;
