import React from 'react';
import TicketingNavBar from '../../TicketingNavBar';
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
      <TicketingNavBar />
      <SeasonContainer />
    </div>
  );
};

export default SingleSeasonMain;
