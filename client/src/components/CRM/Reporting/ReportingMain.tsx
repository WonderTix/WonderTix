import React, {ReactElement} from 'react';
import ReportingList from './ReportingList';
import AdminNavBar from '../AdminNavBar';
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
      <AdminNavBar />
    </div>
  );
};

export default ReportingMain;
