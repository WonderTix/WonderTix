import React from 'react';
import SeasonView from './SeasonView';
import Udash_nav from '../../udash_navbar';

/**
 * Page to view a single season
 *
 * @module
 * @returns SeasonContainer
 */

const SeasonContainer = () => {
  return (
    <div className='flex'>
      <Udash_nav />
      <SeasonView />
    </div>
  );
};

export default SeasonContainer;
