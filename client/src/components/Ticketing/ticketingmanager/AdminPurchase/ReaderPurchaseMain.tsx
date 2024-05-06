import React from 'react';
import TicketingNavBar from '../TicketingNavBar';
import ReaderPurchase from './ReaderPurchase';

const ReaderPurchaseMain = () => {
  return (
    <div className='flex flex-row'>
      <TicketingNavBar />
      <ReaderPurchase />
    </div>
  );
};

export default ReaderPurchaseMain;
