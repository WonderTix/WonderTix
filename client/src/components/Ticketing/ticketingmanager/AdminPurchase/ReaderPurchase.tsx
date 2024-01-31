import React, {useEffect, useState} from 'react';
import {
  Button,
} from '@mui/material';
import PopUp from '../../PopUp';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import {useAppDispatch, useAppSelector} from '../../app/hooks';

import {
  removeAllTicketsFromCart,
  selectDiscount,
} from '../ticketingSlice';

const ReaderPurchase = () => {
  const [status, setStatus] = useState('Awaiting Response...');

  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const readerID = location.state?.readerID || '';
  const discount = useAppSelector(selectDiscount);

  const event = 'reader';
  const paymentIntentID = useParams().id;

  const socketURL = 'wss://localhost:8000/wss/reader/';

  const {sendMessage, lastMessage, getWebSocket} = useWebSocket(socketURL, {
    shouldReconnect: () => true,
    onMessage: (event) => {
      console.log(event);
      setStatus(event.data);
      if (event.data === 'payment_intent.succeeded') {
        const ws = getWebSocket();
        ws.close();
        navigate(`/success`);
      }
    },
      onOpen: () => sendMessage('reader websocket opened'),
  });

  /* useEffect(() => {
    console.log('lastMessage changed');
    console.log(lastMessage);
  }, [lastMessage]); */

  useEffect(() => {
    const processPayment = async () => {
      try {
        console.log({cartItems, paymentIntentID, readerID, discount});
        const response = await fetch( // request payment and put order in database
          process.env.REACT_APP_API_2_URL + `/events/reader-checkout`,
          {
            credentials: 'include',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({cartItems, paymentIntentID, readerID, discount}),
          },
        );

        if (!response.ok) { // order has already been cancelled at this point
          throw response;
        }

        const result = await response.json();
        if (result.status === 'order sent') {
          console.log('order sent!');
        } else {
          console.log('order failed!');
          console.log(result);
        }
      } catch (error) {
        console.error(error.message);
        navigate('/ticketing/purchaseticket'); // maybe should be error display instead
      }
    };
    processPayment();
  }, []);

  const handleRefresh = () => {
    // not sure what this will do or if we even need this
  };

  const handleCancel = () => {
    // orderCancel probably, but we have to be really careful with this kind of thing
    // since we don't know at what stage of the stripe process we are at really,
    // unless we check for status, for example if status is payment_intent.succeeded
    // or charge.succeeded, this should do nothing.
  };

  return (
    <>
      <div className='w-full h-screen overflow-x-hidden absolute'>
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-zinc-500 mb-14'>
            Reader Order Status
          </h1>
          {/* Add a div to display the status */}
          <div className='text-3xl font-semibold'>
            {'ID: ' + paymentIntentID}
          </div>
          <div className='text-3xl font-semibold'>
            {'Status: ' + status}
          </div>
          {/* Add a div to display the buttons */}
          <div className='flex mt-10 gap-4'>
            {/* Use the Button component from Material UI [^1^][5] */}
            <Button variant='contained' color='primary' onClick={handleRefresh}>
              Refresh Status
            </Button>
            <Button variant='contained' color='error' onClick={handleCancel}>
              Cancel Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReaderPurchase;
