import React from 'react';

interface FilterOptionsProps {
  selectedView: string;
  onViewChange: (view: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  selectedView,
  onViewChange,
}): React.ReactElement => {
  return (
    <fieldset className='p-4 mt-2'>
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
            checked={selectedView === 'Today'}
            onChange={() => onViewChange('Today')}
          />
          <label htmlFor='Today' className='text-sm font-medium leading-6'>
            Today
          </label>
        </div>
        <div className='flex items-center space-x-1'>
          <input
            id='Yesterday'
            name='View'
            type='radio'
            className='h-4 w-4 border-gray-300'
            checked={selectedView === 'Yesterday'}
            onChange={() => onViewChange('Yesterday')}
          />
          <label htmlFor='Yesterday' className='text-sm font-medium leading-6'>
            Yesterday
          </label>
        </div>
        <div className='flex items-center space-x-1'>
          <input
            id='CustomDate'
            name='View'
            type='radio'
            className='h-4 w-4 border-gray-300'
            onChange={() => onViewChange('CustomDate')}
          />
          <label htmlFor='CustomDate' className='text-sm font-medium leading-6'>
            Custom Date
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default FilterOptions;
