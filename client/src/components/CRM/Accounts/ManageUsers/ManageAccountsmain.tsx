import React from 'react';
import ManageAccounts from './ManageAccounts';
import AdminNavBar from '../../AdminNavBar';

/**
 * @returns {object} ManageAccountsmain - has Navigation
 *  and ManageAccounts to reroute to other components
 */
const ManageAccountsmain = () => {
  return (
    <div className='flex flex-row'>
      <AdminNavBar/>
      <ManageAccounts/>
    </div>
  );
};

export default ManageAccountsmain;
