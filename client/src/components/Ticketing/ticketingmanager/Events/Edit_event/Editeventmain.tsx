/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../../udash_navbar';
import EditEventPage from './EditEventPage';

const Editeventmain = () => {
  return (
    <div className='flex flex-row '>
      <Udash_nav/>
      <EditEventPage/>
    </div>
  );
};

export default Editeventmain;

