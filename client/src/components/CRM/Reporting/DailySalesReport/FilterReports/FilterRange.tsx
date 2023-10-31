import React from 'react';

const FilterRange: React.FC<{
  onBeginDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}> = ({onBeginDateChange, onEndDateChange}): React.ReactElement => {
  return (
    <fieldset className='px-4 py-2'>
      <div className='flex justify-between space-x-4'>
        <div className='flex-1'>
          <label htmlFor='BegingDate' className='block text-sm font-bold leading-6'>
            Beginning Date:
          </label>
          <input
            required
            type='date'
            id='BegingDate'
            name='BegingDate'
            aria-required='true'
            onChange={(e) => onBeginDateChange(e.target.value)}
            className='p-1.5 border rounded text-sm bg-slate-50'
          />
        </div>
        <div className='flex-1'>
          <label htmlFor='EndDate' className='block text-sm font-bold leading-6'>
            End Date:
          </label>
          <input
            required
            type='date'
            id='EndDate'
            name='EndDate'
            aria-required='true'
            onChange={(e) => onEndDateChange(e.target.value)}
            className='p-1.5 border rounded text-sm bg-slate-50'
          />
        </div>
      </div>
    </fieldset>
  );
};

export default FilterRange;
