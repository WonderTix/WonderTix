import React from 'react';
import Udash_nav from '../udash_navbar';
import RefundOrders from './RefundOrders';

/**
 * Hosts refund page
 *
 * @returns {Navbar, RefundPage, Footer}
 */
const RefundOrdersMain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav />
      <RefundOrders />
    </div>
  );
};

export default RefundOrdersMain;
