import React, {useEffect, useState} from 'react';
import {
  Button,
} from '@mui/material';
import PopUp from '../../PopUp';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import {useAppSelector} from '../../app/hooks';

import {useFetchToken} from '../Event/components/ShowingUtils';

import {
  selectDiscount,
} from '../ticketingSlice';

import {loadStripe} from '@stripe/stripe-js';

const pk = `${process.env.REACT_APP_PUBLIC_STRIPE_KEY}`;
const stripePromise = loadStripe(pk);

const ReaderPurchase = () => {
  const {token} = useFetchToken();
  const [status, setStatus] = useState('Awaiting Response...');
  const [rawStatus, setRawStatus] = useState('Awaiting Response...');

  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const clientSecret = location.state?.clientSecret || '';
  const readerID = location.state?.readerID || '';
  const discount = useAppSelector(selectDiscount);
  const [openDialog, setDialog] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [orderID, setOrderID] = useState('loading...');

  const paymentIntentID = useParams().id;

  const translateStatus = (status) => {
    switch (status) {
      case 'payment_intent.created':
        return 'Payment Intent Created';
      case 'payment_intent.succeeded':
        return 'Payment Succeeded';
      case 'payment_intent.canceled':
        return 'Payment Intent Canceled';
      case 'payment_intent.payment_failed':
        return 'Payment Failed';
      case 'payment_intent.processing':
        return 'Payment Processing';
      case 'payment_intent.requires_payment_method':
        return 'Requires Payment Method';
      case 'terminal.reader.action_failed':
        return 'Card Reader Payment Failed';
      case 'terminal.reader.action_succeeded':
        return 'Card Reader Payment Succeeded';
      default:
        return status;
    }
  };

  const setTranslatedStatus = (status) => {
    setRawStatus(status);
    setStatus(translateStatus(status));
  };

  const socketURL = process.env.REACT_APP_WEBSOCKET_URL;

  const {getWebSocket} = useWebSocket(socketURL, {
    shouldReconnect: () => true,
    onMessage: (event) => {
      const ws = getWebSocket();
      const data = JSON.parse(event.data);
      if (data.messageType === 'reader' &&
          data.paymentIntent === paymentIntentID ||
          data.paymentIntent === readerID) { // in the case of terminal event, paymentIntent is a readerID
        setTranslatedStatus(data.eventType);
        if (data.eventType === 'payment_intent.succeeded') {
          ws.close();
          navigate(`/success`);
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
        handleRefresh();

        if (rawStatus === 'payment_intent.canceled') throw new Error('Payment Already Canceled!');

        const orderSource = 'card_reader';
        const response = await fetch( // request payment and put order in database
          process.env.REACT_APP_API_2_URL + `/events/reader-checkout`,
          {
            credentials: 'include',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({cartItems, paymentIntentID, readerID, discount, orderSource}),
          },
        );

        if (!response.ok) { // order has already been cancelled at this point
          throw response;
        }

        const result = await response.json();
        if (result.status === 'order sent') {
          setOrderID(result.orderID);
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
    if (!token) return;
    processPayment();

    const alertUser = async (e) => {
      e.preventDefault();
      handleCancel();
    };

    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, [token]);

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

      const newStatus = 'payment_intent.' + paymentIntent.status;
      setTranslatedStatus(newStatus);

      if (newStatus === 'payment_intent.succeeded') {
        const ws = getWebSocket();
        ws.close();
        navigate(`/success`);
      }
    } catch (error) {
      console.error(error.message);
      setErrMsg(error.message);
      setDialog(true);
    }
  };

  const handleCancel = async () => {
    handleRefresh();

    if (rawStatus != 'terminal.reader.action_succeeded' && // must make sure we haven't already finished charging
        rawStatus != 'payment_intent.succeeded' &&
        rawStatus != 'charge.succeeded') {
      if (!token) return;
      const response = await fetch( // request payment and put order in database
        process.env.REACT_APP_API_2_URL + `/order/reader-cancel`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          body: JSON.stringify({paymentIntentID}),
        },
      );

      if (!response.ok) {
        throw response;
      }

      console.log('order cancelled!');
      navigate('/ticketing/purchaseticket');
    } else {
      setErrMsg('Order completed before cancelation could occur.');
      setDialog(true);
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
            {'Order # ' + orderID}
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
