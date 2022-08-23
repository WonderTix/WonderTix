import React from 'react';
import Accounts from './Accounts';
import Navigation from '../../Navigation';
/**
 * @return {object} userSearchmain - has Navigation
 *  and Accounts to reroute to other components
 */
const userSearchmain = () => {
  return (
    <div className='flex flex-row  '>
      <Accounts/>
      <Navigation/>
    </div>
  );
};

export default userSearchmain;
