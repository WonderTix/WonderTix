/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../udash_navbar';
import TicketExchanges from './TicketExchanges';

const TicketExchangesmain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <TicketExchanges/>
    </div>
  );
};

export default TicketExchangesmain;
