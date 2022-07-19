/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../udash_navbar';
import DeleteEvents from './Deleteevent';

const Deleteeventmain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <DeleteEvents/>
    </div>
  );
};

export default Deleteeventmain;
