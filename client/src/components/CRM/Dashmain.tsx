import React, {ReactElement} from 'react';
import Dashboard from './Dashboard';
import AdminNavBar from './AdminNavBar';

/**
 * @returns {ReactElement} Dashmain - has Navigation
 *  and Dashboard to reroute to other components
 */
const Dashmain = (): ReactElement => {
  return (
    <main className='flex flex-row'>
      <AdminNavBar />
      <Dashboard />
    </main>
  );
};

export default Dashmain;
