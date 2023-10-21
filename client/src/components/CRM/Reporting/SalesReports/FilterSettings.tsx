import React, {useState} from 'react';

const SpinAnimation = (): React.ReactElement => {
  return (
    <svg className='animate-spin -ml-1 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'> <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle> <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.93813-2.647z'></path> </svg>
  );
};

const FilterSettings: React.FC = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className='flex-grow-1 shadow-xl text-lg rounded-md bg-white w-auto
        border-t-4 border-black'
      >
        <h1 className='font-bold p-3 border-b text-center bg-slate-100'>
          View & Filter Settings
        </h1>

        {/* View Option */}
        <fieldset className='p-3 mt-3'>
          <legend className='text-sm font-bold leading-6'>
            View:
          </legend>
          <div className='flex justify-between space-x-2 text-sm'>
            <div className='flex items-center space-x-1'>
              <input
                id='Today'
                name='View'
                type='radio'
                className='h-4 w-4 border-gray-300'
              />
              <label htmlFor='Today' className='text-sm font-medium
              leading-6 '>
                Today
              </label>
            </div>
            <div className='flex items-center space-x-1'>
              <input
                id='Yesterday'
                name='View'
                type='radio'
                className='h-4 w-4 border-gray-300'
              />
              <label
                htmlFor='Yesterday'
                className='text-sm font-medium leading-6'
              >
                Yesterday
              </label>
            </div>
            <div className='flex items-center space-x-1'>
              <input
                id='CustomDate'
                name='View'
                type='radio'
                className='h-4 w-4 border-gray-300'
              />
              <label
                htmlFor='CustomDate'
                className='text-sm font-medium leading-6'
              >
                Custom Date
              </label>
            </div>
          </div>
        </fieldset>

        {/* Date Range */}
        <fieldset className='p-3'>
          <div className='flex justify-between space-x-4'>
            <div className='flex-1'>
              <label
                htmlFor='BegingDate'
                className='block text-sm font-bold leading-6'
              >
                Beginning Date:
              </label>
              <input
                type='date'
                id='BegingDate'
                name='BegingDate'
                aria-required='true'
                className='p-1.5 border rounded text-sm bg-slate-50'
              />
            </div>
            <div className='flex-1'>
              <label
                htmlFor='EndDate'
                className='block text-sm font-bold leading-6'
              >
                End Date:
              </label>
              <input
                type='date'
                id='EndDate'
                name='EndDate'
                aria-required='true'
                className='p-1.5 border rounded text-sm bg-slate-50'
              />
            </div>
          </div>
        </fieldset>

        {/* GL Code */}
        <fieldset className='p-3 mt-3'>
          <legend className='text-sm font-bold leading-6'>
            Show GL code instead of Event Name?
          </legend>
          <div className='flex justify-start space-x-4'>
            <div className='flex items-center space-x-1'>
              <input
                id='GL-Yes'
                name='GLCodeView'
                type='radio'
                className='h-4 w-4 border-gray-300'
              />
              <label
                htmlFor='GL-Yes'
                className='block text-sm font-medium leading-6'
              >
                Yes
              </label>
            </div>
            <div className='flex items-center space-x-1'>
              <input
                id='GL-No'
                name='GLCodeView'
                type='radio'
                className='h-4 w-4 border-gray-300'
              />
              <label
                htmlFor='GL-No'
                className='block text-sm font-medium leading-6'
              >
                No
              </label>
            </div>
          </div>
        </fieldset>

        {/* Price Level */}
        <fieldset className='p-3 mt-3'>
          <legend className='text-sm font-bold leading-6'>
            Show Price Level Detail Section?
          </legend>
          <div className='flex justify-start space-x-4'>
            <div className='flex items-center space-x-1'>
              <input
                id='PL-Yes'
                name='PriceLevelDetail'
                type='radio'
                className='h-4 w-4 border-gray-300'
              />
              <label
                htmlFor='PL-Yes'
                className='block text-sm font-medium leading-6'
              >
                Yes
              </label>
            </div>
            <div className='flex items-center space-x-1'>
              <input
                id='PL-No'
                name='PriceLevelDetail'
                type='radio'
                className='h-4 w-4 border-gray-300'
              />
              <label
                htmlFor='PL-No'
                className='block text-sm font-medium leading-6'
              >
                No
              </label>
            </div>
          </div>
        </fieldset>
        <div className='flex justify-evenly mx-auto mt-8 mb-4
          border-t py-4'>
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
            {isLoading ? <SpinAnimation /> : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterSettings;
