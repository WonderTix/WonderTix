import React from 'react';
import Udash_nav from '../udash_navbar';
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
      <Udash_nav />
      <AdminCheckout />
    </div>
  );
};

export default AdminCheckoutmain;
