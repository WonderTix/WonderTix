/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../udash_navbar';
import DoorList from './doorlist';

/**
 * Main page to host door list
 * @module
 * @returns {Udash_nav, DoorList}
 */
const Doorlistmain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <DoorList/>
    </div>
  );
};

export default Doorlistmain;
