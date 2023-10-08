import React from 'react';
import Udash_nav from '../udash_navbar';
import Refund from './RefundOrderTicket';

/**
 * Hosts refund page
 *
 * @returns {Navbar, RefundPage, Footer}
 */
const RefundMain = () => {
  return (
    <div className='flex flex-row'>
        <Udash_nav/>
        <Refund/>
    </div>
  );
};

export default RefundMain;
