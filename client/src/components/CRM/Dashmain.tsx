/* eslint-disable react/react-in-jsx-scope */
import Dashboard from './Dashboard';
import Navigation from './Navigation';

/**
 * @returns {object} Dashmain - has Navigation
 *  and Dashboard to reroute to other components
 */
const Dashmain = (): object => {
  return (
    <main className='flex flex-row  '>
      <Navigation />
      <Dashboard />
    </main>
  );
};

export default Dashmain;
