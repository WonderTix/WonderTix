/* eslint-disable react/react-in-jsx-scope */
import ReportingList from './ReportingList';
import Navigation from '../Navigation';

/**
 * @returns {object} ReportingMain - has Navigation
 *  and Reporting to reroute to other components
 */
const ReportingMain = () => {
  return (
    <div>
      <ReportingList/>
      <Navigation/>
    </div>
  );
};

export default ReportingMain;
