import React from 'react';
import TicketingNavBar from '../TicketingNavBar';
import DoorList from './DoorList';

/**
 * Main page to host door list
 *
 * @module
 * @returns {Udash_nav, DoorList}
 */
const DoorListmain = () => {
  return (
    <div className='flex flex-row'>
      <TicketingNavBar />
      <DoorList />
    </div>
  );
};

export default DoorListmain;
