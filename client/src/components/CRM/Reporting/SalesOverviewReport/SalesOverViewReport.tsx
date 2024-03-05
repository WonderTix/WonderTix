import React, {useState} from 'react';
import FilterReports from './FilterReports/FilterReports';

const DailySalesReport = (): React.ReactElement => {
  const [showTools, setShowTools] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [selectedBeginDate, setSelectedBeginDate] = useState('');
  const [showScheduledReports, setShowScheduledReports] = useState(false);


  const handleGenerateClick = (beginDate: string, endDate: string): void => {
    setSelectedBeginDate(beginDate);
    setSelectedEndDate(endDate);
    setShowTools(true);
    setShowFilter(false);
  };

  const toggleScheduledReports = () => {
    setShowScheduledReports(!showScheduledReports);
  };

    return (
      <div className='w-full h-screen overflow-x-hidden absolute'>
        <div className='sm:my-32 sm:mx-4 md:my-32 md:ml-60 md:mr-14 lg:ml-64'>
          <div className='flex flex-row'>
            <h1 className='font-bold text-5xl bg-clip-text text-transparent
              bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-14'>
              Sales Overview Report
            </h1>
          </div>
          <div className='flex md:flex-row md:items-start sm:flex-col sm:items-center justify-start'>
            {showFilter && (
              <FilterReports
                onGenerateClick={handleGenerateClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  export default DailySalesReport;
