/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../udash_navbar';
import CreateEvents from './addevent';

const Addeventmain = () => {
  return (
    <div className='flex flex-row '>
      <Udash_nav/>
      <CreateEvents/>
    </div>
  );
};

export default Addeventmain;
