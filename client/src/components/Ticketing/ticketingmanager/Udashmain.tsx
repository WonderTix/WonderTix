import React from 'react';
import Dashboard from './Dashboard';
import Udash_nav from './udash_navbar';

/**
 * Udashmain uses both Udash_nav and Dashboard to make the main dashboard
 *
 * @module
 * @returns {ReactElement} Udashmain
 */
const Udashmain = () => {
  return (
    <div className='flex flex-row  '>
      <Udash_nav />
      <Dashboard />
    </div>
  );
};

export default Udashmain;
