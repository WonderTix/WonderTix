/* eslint-disable react/react-in-jsx-scope */
import Reporting from './Reporting';
import Navigation from '../Navigation';

/**
 * @returns {object} ReportingMain - has Navigation
 *  and Reporting to reroute to other components
 */
const ReportingMain=() =>{
  return (
    <div className='flex flex-row  '>
      <Reporting/>
      <Navigation/>
    </div>
  );
};

export default ReportingMain;
