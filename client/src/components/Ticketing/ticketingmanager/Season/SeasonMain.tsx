import React from 'react';
import TicketingNavBar from '../TicketingNavBar';
import SeasonInstancesPage from './SeasonInstancesPage';
import {useFetchToken} from '../Event/components/ShowingUtils';
import {LoadingScreen} from '../../mainpage/LoadingScreen';

/**
 * Main page to host seasons page
 *
 * @module
 * @returns Seasons Page
 */

const SeasonsMain = () => {
  const {token} = useFetchToken();

  if (token === '') {
    return <LoadingScreen />;
  } else {
    return (
      <div className='flex'>
        <TicketingNavBar />
        <SeasonInstancesPage token={token} />
      </div>
    );
  }
};

export default SeasonsMain;
