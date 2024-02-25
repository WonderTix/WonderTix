import React, {ReactElement} from 'react';
import Dashboard from './Dashboard';
import Navigation from './Navigation';

/**
 * @returns {ReactElement} Dashmain - has Navigation
 *  and Dashboard to reroute to other components
 */
const Dashmain = (): ReactElement => {
  return (
    <main className='flex flex-row'>
      <Navigation />
      <Dashboard />
    </main>
  );
};

export default Dashmain;
