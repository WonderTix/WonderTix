import React, {ReactElement} from 'react';
import DailySalesReports from './DailySalesReport';
import AdminNavBar from '../../AdminNavBar';

const DailySalesReportMain = (): ReactElement => {
  return (
    <div className='flex flex-row'>
      <AdminNavBar />
      <DailySalesReports />
    </div>
  );
};

export default DailySalesReportMain;
