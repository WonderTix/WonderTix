import React from 'react';
import Udash_nav from '../udash_navbar';
import TicketTypes from './TicketTypes';

/**
 * Main page to host door list
 *
 * @module
 * @returns {Udash_nav, TicketType}
 */
const TicketTypesmain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <TicketTypes/>
    </div>
  );
};

export default TicketTypesmain;
