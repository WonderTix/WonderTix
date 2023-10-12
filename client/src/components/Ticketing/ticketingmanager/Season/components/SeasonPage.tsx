import React from 'react';
import Udash_nav from '../../udash_navbar';
import SeasonView from './SeasonView';

/**
 * Page to view a single season
 *
 * @module
 * @returns Season page component
 */

const SeasonPage = () => {
  return (
    <div className='flex'>
      <Udash_nav />
      <SeasonView />
    </div>
  );
};

export default SeasonPage;
