import React, {ReactElement} from 'react';
import DailySalesReports from './DailySalesReport';
import Navigation from '../../Navigation';

const DailySalesReportMain = (): ReactElement => {
  return (
    <div className='flex flex-row'>
      <Navigation />
      <DailySalesReports />
    </div>
  );
};

export default DailySalesReportMain;
