/* eslint-disable camelcase */
import React from 'react';
import Dashboard from './dashboard';
import Udash_nav from './udash_navbar';


/**
 * Udashmain uses both Udash_nav and Dashboard to make the main dashboard
 * @module
 * @returns {Object} Udashmain
 */
const Udashmain=() => {
  return (
    <div className='flex flex-row  '>
      <Udash_nav/>
      <Dashboard/>
    </div>
  );
};

export default Udashmain;
