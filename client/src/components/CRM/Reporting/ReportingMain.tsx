/* eslint-disable react/react-in-jsx-scope */
import ReportingList from './ReportingList';
import Navigation from '../Navigation';
import {DSRmarqueeData, DsrMarqueeData} from './DailySalesReport/DsrMarqData';
import {
  DONmarqueeData,
  DonMarqueeData,
} from './DonationSummaryReport/DonMarqData';

/**
 * @returns {object} ReportingMain - has Navigation
 *  and Reporting to reroute to other components
 */
const ReportingMain = () => {
  return (
    <div>
      <ReportingList data={DSRmarqueeData} DONdata={DONmarqueeData} />
      <Navigation />
    </div>
  );
};

export default ReportingMain;
