import React from 'react';
import Udash_nav from '../../udash_navbar';
import SeasonContainer from './SeasonContainer';

/**
 * Page to view a single season
 *
 * @module
 * @returns Season page component
 */

const SingleSeasonMain = () => {
  return (
    <div className='flex'>
      <Udash_nav />
      <SeasonContainer />
    </div>
  );
};

export default SingleSeasonMain;
