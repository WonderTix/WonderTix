import React, {ReactElement} from 'react';
import ReportingList from './ReportingList';
import Navigation from '../Navigation';
import {DSRmarqueeData, DsrMarqueeData} from './DailySalesReport/DsrMarqData';
import {
  DONmarqueeData,
  DonMarqueeData,
} from './DonationSummaryReport/DonMarqData';

/**
 * @returns {ReactElement} ReportingMain - has Navigation
 *  and Reporting to reroute to other components
 */
const ReportingMain = (): ReactElement => {
  return (
    <div>
      <ReportingList data={DSRmarqueeData} DONdata={DONmarqueeData} />
      <Navigation />
    </div>
  );
};

export default ReportingMain;
