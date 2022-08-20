/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../../udash_navbar';
// import CreateEvents from './addevent';
import CreateEventPage from './CreateEventPage';

const Addeventmain = () => {
  return (
    <div className='flex flex-row '>
      <Udash_nav/>
      <CreateEventPage/>
    </div>
  );
};

export default Addeventmain;
