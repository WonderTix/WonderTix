import React, {useState} from 'react';
import FilterOptions from './FilterOptions';
import FilterRange from './FilterRange';
import FilterEventCode from './FilterEventCode';
import FilterPriceLevel from './FilterPriceLevel';
import {SpinAnimation} from '../../../Tasks/SVGIcons';

interface FilterReportsProps {
  onGenerateClick: (
    beginDate: string,
    endDate: string,
    showPriceLevel: boolean
  ) => void;
}

const FilterReports: React.FC<FilterReportsProps> = ({
  onGenerateClick,
}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [viewOption, setViewOption] = useState('Today');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showGLCode, setShowGLCode] = useState(false);
  const [showPriceLevelDetail, setShowPriceLevelDetail] = useState(false);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onGenerateClick(beginDate, endDate, showPriceLevelDetail);
    }, 1000);
  };

  const handleReset = (e: React.FormEvent): void => {
    e.preventDefault();
    handleViewChange('Today');
    setBeginDate('');
    setEndDate('');
    setShowGLCode(false);
    setShowPriceLevelDetail(false);
  };

  const formatDate = (date: Date): string => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split('T')[0];
  };

  const getTodayDate = (): string => {
    const today = new Date();
    return formatDate(today);
  };

  const getYesterdayDate = (): string => {
    const date = new Date();
    date.setDate(date.getDate());
    return formatDate(date);
  };

  const updateDateForToday = (): void => {
    const todayDate = getTodayDate();
    setBeginDate(todayDate);
    setEndDate(todayDate);
  };

  const updateDateForYesterday = (): void => {
    const yesterdayDate = getYesterdayDate();
    const todayDate = getTodayDate();
    setBeginDate(yesterdayDate);
    setEndDate(todayDate);
  };

  React.useEffect(() => {
    updateDateForToday();
  }, []);

  const handleViewChange = (view: string): void => {
    setViewOption(view);
    if (view === 'Today') {
      updateDateForToday();
    } else if (view === 'Yesterday') {
      updateDateForYesterday();
    } else {
      setBeginDate('');
      setEndDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className='group mr-2'>
      <div className='flex-grow-1 shadow-xl text-lg rounded-md bg-white border-t-4 border-black w-80'>
        <h1 className='font-bold p-3 border-b text-2xl text-center bg-slate-100'>
          Filter Settings
        </h1>
        <FilterOptions
          selectedView={viewOption}
          onViewChange={setViewOption}
        />
        {viewOption === 'CustomDate' && (
          <FilterRange
            onBeginDateChange={setBeginDate}
            onEndDateChange={setEndDate}
          />
        )}
        <FilterEventCode
          showGLCode={showGLCode}
          onShowGLCodeChange={setShowGLCode}
        />
        <FilterPriceLevel
          showPriceLevelDetail={showPriceLevelDetail}
          onShowPriceLevelDetailChange={setShowPriceLevelDetail}
        />
        <div className='flex justify-evenly mx-auto border-t my-3 py-4'>
          <button
            type='reset'
            title='Reset filter'
            className='rounded py-2.5 px-6 w-32 uppercase
            font-bold text-center text-slate-900 text-sm
            bg-gradient-to-t from-slate-400/50 to-slate-100
            hover:bg-gradient-to-b hover:shadow-inner shadow
            shadow-slate-600 active:opacity-75'
          >
            Reset
          </button>
          <button
            type='submit'
            title='Generate'
            className='flex justify-center items-center
            rounded py-2.5 px-6 w-32 uppercase bg-black
            font-bold text-center text-white text-sm
            bg-gradient-to-t from-black to-gray-800
            hover:bg-gradient-to-b hover:shadow-inner
            shadow shadow-gray-600 active:opacity-75
            group-invalid:pointer-events-none group-invalid:opacity-50'
          >
            {isLoading ? <SpinAnimation /> : 'Generate'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterReports;
