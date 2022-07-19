/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../udash_navbar';
import Doorlist from './doorlist';

const Doorlistmain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <Doorlist/>
    </div>
  );
};

export default Doorlistmain;
