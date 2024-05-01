import React from 'react';
import Accounts from './Accounts';
import AdminNavBar from '../../AdminNavBar';
/**
 * @returns {object} userSearchmain - has Navigation
 *  and Accounts to reroute to other components
 */
const userSearchmain = () => {
  return (
    <div className='flex flex-row'>
      <Accounts/>
      <AdminNavBar/>
    </div>
  );
};

export default userSearchmain;
