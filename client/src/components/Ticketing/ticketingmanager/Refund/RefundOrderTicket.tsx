import React, {useEffect, useState} from 'react';
import {useFetchToken} from '../showings/ShowingUpdated/ShowingUtils';
import PopUp from '../../PopUp';


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
  const onSubmit = async (orderID) => {
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
  const mappedInstances = [
    {
      name: 'John Doe',
      date: '2023-10-24',
      showings: ['Gone With The Wind', 'Sound Of Music'],
      orderID: '12345',
      price: 19.99,
    },
    {
      name: 'John Doe',
      date: '2023-10-25',
      showings: 'Gone With The Wind',
      orderID: '12345',
      price: 14.99,
    },
  ];

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
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 mb-14'>
            Refund Ticket
          </h1>
          <div className='mb-4'>
            <div id='email-value' className='grid'>
              <div className='flex'>
                <svg xmlns='http://www.w3.org/2000/svg' className='pointer-events-none h-5 w-5 absolute ml-6 mt-3' viewBox='0 0 20 20' fill='gray'>
                  <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                  <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                </svg>
                <input // search button
                  type='email'
                  className='text-black border-2 border-gray rounded-l-full pl-12 w-80 py-2'
                  id='email-search-input'
                  placeholder='John_Smith@email.com'
                />
                <button id='email-search-button' type='button' className='px-0'>
                  <div className='hover:bg-sky-500 w-20 rounded-r-full bg-indigo-500 hover:drop-shadow-md active:bg-sky-600'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-11 w-11 pl-6' viewBox='0 0 20 20' fill='white'>
                      <path fill-rule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clip-rule='evenodd' />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <table className='w-full min-w-min'>
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
              {mappedInstances.length === 0 ? (
                <tr className='text-center text-gray-600'>
                  <td className='col-span-5'><p>No current results</p></td>
                </tr>
              ) : (
                mappedInstances.map((instance, index) => (
                  <tr key={index} className='grid grid-cols-5 gap-2 bg-gray-200 rounded-lg shadow-md px-2 mb-2 hover:bg-gray-300'>
                    <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                      {instance.name}
                    </td>
                    <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                      {instance.date}
                    </td>
                    <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                      {Array.isArray(instance.showings) ? (
                        instance.showings.map((showing, showingIndex) => (
                          <div key={showingIndex}>{showing}</div>
                        ))
                      ) : (
                        <div>{instance.showings}</div>
                      )}
                    </td>
                    <td className='row-start-1 justify-self-start pl-2 py-2 col-span-1'>
                      {instance.price}
                    </td>
                    <td className='row-start-1 justify-self-start py-2 col-span-1'>
                      <button
                        onClick={() => onSubmit(instance.orderID)}
                        type={'submit'}
                        className='bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded active:bg-red-900'
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

export default Refund;
