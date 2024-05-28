import React from 'react';
import Dashboard from './Dashboard';
import TicketingNavBar from './TicketingNavBar';

/**
 * Udashmain uses both Udash_nav and Dashboard to make the main dashboard
 *
 * @module
 * @returns {ReactElement} Udashmain
 */
const Udashmain = () => {
  return (
    <div className='flex flex-row  '>
      <TicketingNavBar />
      <Dashboard />
    </div>
  );
};

export default Udashmain;
