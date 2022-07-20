/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../udash_navbar';
import DoorList from './doorlist';

const Doorlistmain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <DoorList/>
    </div>
  );
};

export default Doorlistmain;
