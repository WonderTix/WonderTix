/* eslint-disable camelcase */
import React from 'react';
import Addevent from './addevent';
import Udash_nav from '../udash_navbar';


const Addeventmain = () => {
  return (
    <div className='flex flex-row '>
      <Udash_nav/>
      <Addevent/>
    </div>
  );
};

export default Addeventmain;
