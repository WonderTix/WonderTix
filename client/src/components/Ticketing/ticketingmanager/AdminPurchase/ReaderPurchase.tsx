import React, {useEffect, useState} from 'react';
import {
  Button,
} from '@mui/material';
import PopUp from '../../PopUp';
import {useNavigate, useParams} from 'react-router';
import useWebSocket from 'react-use-websocket';

const ReaderPurchase = () => {
  const [status, setStatus] = useState('Awaiting Response...');

  const event = 'reader';
  const paymentIntentID = useParams().id;
  const socketURL = 'wss://localhost:8000/wss/reader';

  const {sendMessage, lastMessage} = useWebSocket(socketURL, {
    shouldReconnect: () => true,
    onMessage: () => {
      console.log(lastMessage);
      setStatus(lastMessage.data);
    },
    onOpen: () => sendMessage('reader websocket opened'),
  });

  useEffect(() => {
    console.log('lastMessage changed');
    console.log(lastMessage);
  }, [lastMessage]);

  const handleRefresh = () => {
    // Send a message to the websocket server to request the latest status
    sendMessage('message');
  };

  const handleCancel = () => {
    // Navigate to another page or show a confirmation dialog
    // You can use the useNavigate hook from react-router
    // const navigate = useNavigate();
    // navigate('/some-page');
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
