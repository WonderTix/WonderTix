import React from 'react';
import TicketingNavBar from '../TicketingNavBar';
import RefundOrders from './RefundOrders';

/**
 * Hosts refund page
 *
 * @returns {Navbar, RefundPage, Footer}
 */
const RefundOrdersMain = () => {
  return (
    <div className='flex flex-row'>
      <TicketingNavBar />
      <RefundOrders />
    </div>
  );
};

export default RefundOrdersMain;
