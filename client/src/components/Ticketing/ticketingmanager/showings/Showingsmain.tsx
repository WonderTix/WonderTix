/* eslint-disable camelcase */
import React from 'react';
import Udash_nav from '../udash_navbar';
import InstancesPage from './InstancesPage';

/**
 * @returns {Object} Showingsmain - has Udash_nav and InstancesPage to reroute to other components
 */
const Showingsmain = () => {
  return (
    <div className='flex flex-row'>
      <Udash_nav/>
      <InstancesPage/>
    </div>
  );
};

export default Showingsmain;
