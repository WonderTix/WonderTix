import React from 'react';
import {useParams} from 'react-router';
import {useEffect} from 'react';

const ReaderPurchasePage = () => {
    const paymentIntentID = useParams().id;
    useEffect(() => {
        const paymentSocket = new WebSocket('ws://localhost:8000/wss/reader/' + paymentIntentID);
        paymentSocket.onmessage = (message) => {
            console.log(message.data);
        };
    });

    return (
        <p>page</p>
    );
};

export default ReaderPurchasePage;
