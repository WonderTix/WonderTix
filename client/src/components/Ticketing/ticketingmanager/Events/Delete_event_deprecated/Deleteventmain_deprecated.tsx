import React from 'react';
import Udash_nav from '../../udash_navbar';
import DeleteEvents from './Deleteevent_deprecated';

/**
 * Deletes the event from main
 *
 * @returns {Udash_nav, DeleteEvents} DeleteeventMain
 */
const Deleteeventmain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <DeleteEvents/>
    </div>
  );
};

export default Deleteeventmain;
