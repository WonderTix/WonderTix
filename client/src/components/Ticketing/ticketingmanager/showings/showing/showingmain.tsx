import React from 'react';
import Udash_nav from '../../udash_navbar';
import Showing from './showing';
const showingmain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <Showing/>
    </div>
  );
};

export default showingmain;
