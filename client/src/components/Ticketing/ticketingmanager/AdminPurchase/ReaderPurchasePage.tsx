import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router';
import useWebSocket from 'react-use-websocket';

const ReaderPurchasePage = () => {
    const event = 'reader';
    const paymentIntentID = useParams().id;
    const socketURL = 'wss://localhost:8000/wss/reader/' + paymentIntentID;

    const {sendMessage, lastMessage} = useWebSocket(socketURL, {
        shouldReconnect: () => true,
        onMessage: () => {
            console.log(lastMessage);
        },
        onOpen: () => sendMessage('message'),
    });


    return (
        <p>page</p>
    );
};

export default ReaderPurchasePage;
