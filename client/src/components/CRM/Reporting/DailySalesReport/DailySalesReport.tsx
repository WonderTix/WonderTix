import React, {useState} from 'react';
import FilterReports from './FilterReports/FilterReports';
import ScheduledReports from './ScheduledReports/ScheduleReportsForm';
import SalesSummaryReport from './DailyReports/SalesSummaryReport';
import PaymentSummaryReport from './DailyReports/PaymentSummaryReport';
import NetSalesSummaryReport from './DailyReports/NetSalesSummaryReport';
import NetSalesPriceLevelReport from './DailyReports/NetSalesPriceLevelReport';
import GrossSalesPriceLevelReport from './DailyReports/GrossSalesPriceLevelReport';
import ExchangeSalesPriceLevelReport from './DailyReports/ExchangeSalesPriceLevelReport';

const DailySalesReport = (): React.ReactElement => {
  const [showTools, setShowTools] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [selectedBeginDate, setSelectedBeginDate] = useState('');
  const [showPriceLevelDetail, setShowPriceLevelDetail] = useState(false);
  const [showScheduledReports, setShowScheduledReports] = useState(false);
  const [viewOption, setViewOption] = useState<'Today' | 'Yesterday' | 'CustomDate'>('Today');

  const handleGenerateClick = (beginDate: string, endDate: string, showPriceLevel: boolean): void => {
    setSelectedBeginDate(beginDate);
    setSelectedEndDate(endDate);
    setShowPriceLevelDetail(showPriceLevel);
    setShowTools(true);
    setShowFilter(false);
  };

  const toggleScheduledReports = () => {
    setShowScheduledReports(!showScheduledReports);
  };

  const tools = (): React.ReactElement => {
    return (
      <>
        <div className='flex flex-col bg-slate-100 border-t-4 border-black rounded-b-none rounded'>
          <div className="flex justify-between items-center p-4 border-b">
            <h1 className='text-3xl font-bold bg-slate-100'>
              Portland Playhouse Sales Reports
            </h1>
            <div className="flex flex-wrap justify-end items-center">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className='p-2 w-36 gap-1
                flex items-center rounded
                font-semibold text-sm text-slate-900
                shadow shadow-gray-500 hover:shadow-inner
                active:ring-1 active:ring-gray-500 active:opacity-75
                bg-gradient-to-t from-gray-200 to-white hover:bg-gradient-to-b'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" /> </svg>
                {showFilter ? 'Hide Settings' : 'Open Settings'}
              </button>
              <button
                className='p-2 w-36 gap-2 my-2 ml-3
                flex items-center rounded
                font-semibold text-sm text-slate-900
                shadow shadow-gray-500 hover:shadow-inner
                active:ring-1 active:ring-gray-500 active:opacity-75
                bg-gradient-to-t from-gray-200 to-white hover:bg-gradient-to-b'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /> </svg>
                  Export Excel
              </button>
              <button
                title='Schedule Run'
                onClick={toggleScheduledReports}
                className='p-2 w-36 gap-1.5 ml-3
                flex items-center rounded
                font-semibold text-sm text-slate-900
                shadow shadow-gray-500 hover:shadow-inner
                active:ring-1 active:ring-gray-500 active:opacity-75
                bg-gradient-to-t from-gray-200 to-white hover:bg-gradient-to-b'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
                Schedule Run
              </button>
              <div>
                {showScheduledReports &&
                  <ScheduledReports
                    isVisible={showScheduledReports}
                    onCancel={toggleScheduledReports}
                  />
                }
              </div>
            </div>
          </div>
          <div className='flex justify-start px-4 py-3 gap-10 text-sm'>
            <p> <strong>Date Range:</strong> {selectedBeginDate} ~ {selectedEndDate}</p>
            <p> <strong>Group by:</strong>
              {showPriceLevelDetail ? (' Event, Price Level') : (' Event, Instance')}
            </p>
          </div>
        </div>
        {!showPriceLevelDetail ? (
          <div className='border-t'>
            <SalesSummaryReport />
            <PaymentSummaryReport />
            <NetSalesSummaryReport />
          </div>
        ) : (
          <div className='border-t'>
            <NetSalesPriceLevelReport />
            <GrossSalesPriceLevelReport />
            <ExchangeSalesPriceLevelReport />
          </div>
        )}
      </>
    );
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='sm:my-32 sm:mx-4 md:my-32 md:ml-60 md:mr-14 lg:ml-64'>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent
            bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-14'>
            Daily Sales Reports
          </h1>
        </div>
        <div className='flex md:flex-row md:items-start sm:flex-col sm:items-center justify-start'>
          {showFilter && (
            <FilterReports
              onGenerateClick={handleGenerateClick}
              viewOption={viewOption}
              setViewOption={setViewOption}
              showPriceLevelDetail={showPriceLevelDetail}
              setShowPriceLevelDetail={setShowPriceLevelDetail}
            />
          )}
          <div className='h-full w-full flex-grow-1 bg-white rounded-md shadow-xl'>
            {showTools && tools()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySalesReport;
