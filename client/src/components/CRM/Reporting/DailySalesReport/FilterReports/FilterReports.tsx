import React, {useState} from 'react';
import FilterOptions from './FilterOptions';
import FilterRange from './FilterRange';
import FilterEventCode from './FilterEventCode';
import FilterPriceLevel from './FilterPriceLevel';

const SpinAnimation = (): React.ReactElement => {
  return (
    <svg className='animate-spin -ml-1 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'> <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle> <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.93813-2.647z'></path> </svg>
  );
};

const FilterReports: React.FC = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex-grow-1 shadow-xl text-lg rounded-md bg-white w-auto
        border-t-4 border-black'
      >
        <h1 className='font-bold p-3 border-b text-2xl text-center bg-slate-100'>
          Filter Settings
        </h1>
        <FilterOptions />
        <FilterRange />
        <FilterEventCode />
        <FilterPriceLevel />
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
            title='submit filter'
            className='flex justify-center items-center
            rounded py-2.5 px-6 w-32 uppercase bg-black
            font-bold text-center text-white text-sm
            bg-gradient-to-t from-black to-gray-800
            hover:bg-gradient-to-b hover:shadow-inner
            shadow shadow-gray-600 active:opacity-75'
          >
            {isLoading ? <SpinAnimation /> : 'Generate'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterReports;
