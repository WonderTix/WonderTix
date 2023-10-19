import React from 'react';
import Udash_nav from '../udash_navbar';
import SeasonInstancesPage from './SeasonInstancesPage';
import {useFetchToken} from '../showings/ShowingUpdated/ShowingUtils';
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
        <Udash_nav />
        <SeasonInstancesPage token={token} />
      </div>
    );
  }
};

export default SeasonsMain;
