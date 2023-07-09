/* eslint-disable react/react-in-jsx-scope */
import Dashboard from './Dashboard';
import Navigation from './Navigation';

/**
 * @returns {object} Dashmain - has Navigation
 *  and Dashboard to reroute to other components
 */
const Dashmain=() =>{
  return (
    <div className='flex flex-row  '>
      <Dashboard/>
      <Navigation/>
    </div>
  );
};

export default Dashmain;
