/* eslint-disable camelcase */
import React from 'react';
import ManageAccounts from './ManageAccounts';
import Navigation from '../../Navigation';

/**
 * @returns {object} ManageAccountsmain - has Navigation
 *  and ManageAccounts to reroute to other components
 */
const ManageAccountsmain = () => {
  return (
    <div className='flex flex-row'>
      <Navigation/>
      <ManageAccounts/>
    </div>
  );
};

export default ManageAccountsmain;
