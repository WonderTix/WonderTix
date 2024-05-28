import React from 'react';
import TicketingNavBar from '../TicketingNavBar';
import AdminCheckout from './AdminCheckout';

/**
 * Main page to host door list
 *
 * @module
 * @returns {Udash_nav, AdminPurchase}
 */
const AdminCheckoutmain = () => {
  return (
    <div className='flex flex-row'>
      <TicketingNavBar />
      <AdminCheckout />
    </div>
  );
};

export default AdminCheckoutmain;
