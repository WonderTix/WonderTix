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

import {loadStripe} from '@stripe/stripe-js';

const pk = `${process.env.REACT_APP_PUBLIC_STRIPE_KEY}`;
const stripePromise = loadStripe(pk);

const ReaderPurchase = () => {
  const [status, setStatus] = useState('Awaiting Response...');

  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const clientSecret = location.state?.clientSecret || '';
  const readerID = location.state?.readerID || '';
  const discount = useAppSelector(selectDiscount);
  const [openDialog, setDialog] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const event = 'reader';
  const paymentIntentID = useParams().id;

  // const socketURL = process.env.WEBSOCKET_URL; use this once the env variable works
  const socketURL = process.env.REACT_APP_ROOT_URL.replace('https', 'wss') + '/wss';

  const {getWebSocket} = useWebSocket(socketURL, {
    shouldReconnect: () => true,
    onMessage: (event) => {
      const ws = getWebSocket();
      const data = JSON.parse(event.data);
      if (data.messageType === 'reader' &&
          data.paymentIntent === paymentIntentID ||
          data.paymentIntent === readerID) { // in the case of terminal event, paymentIntent is a readerID
        console.log(data);
        setStatus(data.eventType);
        if (data.eventType === 'payment_intent.succeeded') {
            ws.close();
          navigate(`/success`);
        } else if (data.eventType === 'payment_intent.requires_action') { // not sure if this needs to be handelled but I think this is how its done
          stripePromise.then((stripe) => {
            if (!stripe) return;
            stripe.confirmCardPayment(clientSecret).then((result) => {
              console.log(result); // should handle failure/success here
            });
          });
        } else if (data.eventType === 'terminal.reader.action_failed') {
          ws.close();
          setErrMsg(data.errMsg + ' Order canceled. Please Try again.');
          setDialog(true);
        }
      }
    },
  });

  useEffect(() => {
    const processPayment = async () => {
      try {
        console.log({cartItems, paymentIntentID, clientSecret, readerID, discount});

        const stripe = await stripePromise;
        if (!stripe) throw new Error('Failed to initialize stripe!');

        const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret);
        if (!paymentIntent) throw new Error('Cannot find payment intent!');

        if (paymentIntent.status === 'canceled') throw new Error('Payment Already Canceled!');

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
          setErrMsg('Failure processing order, cancelling.');
          setDialog(true);
          handleCancel();
          console.log(result);
        }
      } catch (error) {
        console.error(error.message);
        setErrMsg('Failure processing order, cancelling.');
        setDialog(true);
        handleCancel();
      }
    };
    processPayment();

    const alertUser = (e) => {
      e.preventDefault();
      e.returnValue = '';
      handleCancel();
      navigate('/ticketing/purchaseticket');
    };

    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

  const handleCloseDialog = () => {
    setDialog(false);
    navigate('/ticketing/purchaseticket');
  };

  const handleRefresh = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Failed to initialize stripe!');

      const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret);
      if (!paymentIntent) throw new Error('Cannot find payment intent!');

      setStatus('payment_intent.' + paymentIntent.status);
    } catch (error) {
      console.error(error.message);
      setErrMsg(error.message);
      setDialog(true);
    }
  };

  const handleCancel = async () => {
    if (status != 'terminal.reader.action.succeeded' && // must make sure we haven't already finished charging
        status != 'payment.intent.succeeded' &&
        status != 'charge.succeeded') {
      const response = await fetch( // request payment and put order in database
        process.env.REACT_APP_API_2_URL + `/order/reader-cancel`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({paymentIntentID}),
        },
      );

      if (!response.ok) {
        throw response;
      }

      console.log('order cancelled!');
      navigate('/ticketing/purchaseticket');
    }
  };

  return (
    <>
      <div className='w-full h-screen overflow-x-hidden absolute'>
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-zinc-500 mb-14'>
            Reader Order Status
          </h1>
          <div className='text-3xl font-semibold'>
            {'ID: ' + paymentIntentID}
          </div>
          <div className='text-3xl font-semibold'>
            {'Status: ' + status}
          </div>
          <div className='flex mt-10 gap-4'>
            <Button variant='contained' color='primary' onClick={handleRefresh}>
              Refresh Status
            </Button>
            <Button variant='contained' color='error' onClick={handleCancel}>
              Cancel Order
            </Button>
          </div>
        </div>
        {openDialog && (
          <PopUp
            title='Error'
            message={errMsg}
            handleProceed={handleCloseDialog}
            handleClose={handleCloseDialog}
            success={false}
          />
        )}
      </div>
    </>
  );
};

export default ReaderPurchase;
