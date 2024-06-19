import React from 'react';
import TicketingNavBar from '../TicketingNavBar';
import TicketExchanges from './TicketExchanges';

const TicketExchangesmain = () => {
  return (
    <div className='flex flex-row'>
      <TicketingNavBar/>
      <TicketExchanges/>
    </div>
  );
};

export default TicketExchangesmain;
