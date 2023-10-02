import React from 'react';
import Udash_nav from '../udash_navbar';
// import AdminCheckout from './AdminCheckout'; //uncomment this line to use AdminCheckout

/**
 * Main page to host door list
 *
 * @module
 * @returns {Udash_nav, AdminPurchase}
 */
const AdminCheckoutmain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      {/*   <AdminCheckout/> uncomment this to use AdminCheckout    */}
    </div>
  );
};

export default AdminCheckoutmain;
