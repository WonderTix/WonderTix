import React from 'react';
import TicketingNavBar from '../TicketingNavBar';
import AdminPurchase from './AdminPurchase';

/**
 * Main page to host door list
 *
 * @module
 * @returns {TicketingNavBar, AdminPurchase}
 */
const AdminPurchasemain = () => {
  return (
    <div className='flex flex-row'>
      <TicketingNavBar />
      <AdminPurchase />
    </div>
  );
};

export default AdminPurchasemain;
