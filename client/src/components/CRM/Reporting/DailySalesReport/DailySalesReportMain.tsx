import React from 'react';
import DailySalesReports from './DailySalesReport';
import Navigation from '../../Navigation';

const DailySalesReportMain: React.FC = (): React.ReactElement => {
  return (
    <div className='flex flex-row'>
      <Navigation/>
      <DailySalesReports/>
    </div>
  );
};

export default DailySalesReportMain;
