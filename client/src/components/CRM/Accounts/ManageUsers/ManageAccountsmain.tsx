/* eslint-disable camelcase */
import React from 'react';
import ManageAccounts from './ManageAccounts';
import Navigation from '../../Navigation';
const ManageAccountsmain = () => {
  return (
    <div className='flex flex-row'>
      <Navigation/>
      <ManageAccounts/>
    </div>
  );
};

export default ManageAccountsmain;
