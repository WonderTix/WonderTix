import React from 'react';
import TicketingNavBar from '../TicketingNavBar';
import InstancesPage from './InstancesPage';

/**
 * @returns {Udash_nav, InstancesPage} Eventmain - has Udash_nav and
 * InstancesPage to reroute to other components
 */
const Eventmain = () => {
  return (
    <div className='flex flex-row'>
      <TicketingNavBar/>
      <InstancesPage/>
    </div>
  );
};

export default Eventmain;
