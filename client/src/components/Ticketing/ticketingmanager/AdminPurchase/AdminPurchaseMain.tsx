import React from 'react';
import Udash_nav from '../udash_navbar';
import AdminPurchase from './AdminPurchase';

/**
 * Main page to host door list
 *
 * @module
 * @returns {Udash_nav, AdminPurchase}
 */
const AdminPurchaseMain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav />
      <AdminPurchase />
    </div>
  );
};

export default AdminPurchaseMain;
