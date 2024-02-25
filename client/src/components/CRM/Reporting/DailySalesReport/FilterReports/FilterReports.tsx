import React, {useState, useEffect} from 'react';
import FilterOptions from './FilterOptions';
import FilterRange from './FilterRange';
import FilterEventCode from './FilterEventCode';
import FilterPriceLevel from './FilterPriceLevel';
import {SpinAnimation} from '../../../Tasks/SVGIcons';

interface FilterReportsProps {
  onGenerateClick: (beginDate: string, endDate: string, showPriceLevel: boolean) => void;
  viewOption: 'Today' | 'Yesterday' | 'CustomDate';
  setViewOption: (viewOption: 'Today' | 'Yesterday' | 'CustomDate') => void;
  showPriceLevelDetail: boolean;
  setShowPriceLevelDetail: (showPriceLevelDetail: boolean) => void;
}

const FilterReports: React.FC<FilterReportsProps> = ({
  onGenerateClick,
  viewOption,
  setViewOption,
  showPriceLevelDetail,
  setShowPriceLevelDetail,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showGLCode, setShowGLCode] = useState(false);
  const [localShowPriceLevelDetail, setLocalShowPriceLevelDetail] = useState(showPriceLevelDetail);

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${year}`;
    };

    switch (viewOption) {
      case 'Today':
        setBeginDate(formatDate(today));
        setEndDate(formatDate(today));
        break;
      case 'Yesterday':
        setBeginDate(formatDate(yesterday));
        setEndDate(formatDate(yesterday));
        break;
      default:
        setBeginDate('');
        setEndDate('');
    }
  }, [viewOption]);

  const handleDateChange = (dateString: string, isStartDate: boolean) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const formattedDate = `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${year}`;
    if (isStartDate) {
      setBeginDate(formattedDate);
    } else {
      setEndDate(formattedDate);
    }
    setViewOption('CustomDate');
  };

  const handlePriceLevelDetailChange = (show: boolean) => {
    setLocalShowPriceLevelDetail(show);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onGenerateClick(beginDate, endDate, localShowPriceLevelDetail);
      setViewOption(viewOption);
    }, 1000);
  };

  const handleReset = (e: React.FormEvent): void => {
    e.preventDefault();
    setViewOption('Today');
    setBeginDate('');
    setEndDate('');
    setShowGLCode(false);
    setShowPriceLevelDetail(false);
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
          onBeginDateChange={(date) => handleDateChange(date, true)}
          onEndDateChange={(date) => handleDateChange(date, false)}
          />
        )}
        <FilterEventCode
          showGLCode={showGLCode}
          onShowGLCodeChange={setShowGLCode}
        />
        <FilterPriceLevel
          showPriceLevelDetail={localShowPriceLevelDetail}
          onShowPriceLevelDetailChange={handlePriceLevelDetailChange}
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
