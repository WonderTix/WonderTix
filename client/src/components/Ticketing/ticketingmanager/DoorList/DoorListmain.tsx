import React from 'react';
import Udash_nav from '../udash_navbar';
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
      <Udash_nav />
      <DoorList />
    </div>
  );
};

export default DoorListmain;
