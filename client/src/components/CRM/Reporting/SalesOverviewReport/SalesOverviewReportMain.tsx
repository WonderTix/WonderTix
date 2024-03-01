import React, {ReactElement} from 'react';
import SalesOverviewReport from './SalesOverViewReport';
import Navigation from '../../Navigation';

const SalesOverviewReportMain = (): ReactElement => {
  return (
    <div className='flex flex-row'>
      <Navigation />
      <SalesOverviewReport />
    </div>
  );
};

export default SalesOverviewReportMain;
