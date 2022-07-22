/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../udash_navbar';
import ManageEventsPage from './ManageEvents';

const Manageventmain = () => {
  return (
    <div className='flex flex-row '>
      <Udash_nav/>
      <ManageEventsPage/>
    </div>
  );
};

export default Manageventmain;
