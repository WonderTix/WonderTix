import React from 'react';
import Udash_nav from '../udash_navbar';
import SeasonInstancesPage from './SeasonInstancesPage';

/**
 * Main page to host seasons page
 *
 * @module
 * @returns Seasons Page
 */

const SeasonsMain = () => {
  return (
    <div className='flex'>
      <Udash_nav />
      <SeasonInstancesPage />
    </div>
  );
};

export default SeasonsMain;
