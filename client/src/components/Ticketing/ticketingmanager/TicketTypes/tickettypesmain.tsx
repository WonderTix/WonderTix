/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../udash_navbar';
import TicketTypes from './tickettypes';

/**
 * Main page to host door list
 *
 * @module
 * @returns {Udash_nav, TicketType}
 */
const Tickettypesmain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <TicketTypes/>
    </div>
  );
};

export default Tickettypesmain;
