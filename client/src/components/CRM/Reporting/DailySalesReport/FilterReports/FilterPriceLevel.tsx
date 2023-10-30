import React from 'react';

const FilterPriceLevel: React.FC = (): React.ReactElement => {
  return (
    <fieldset className='p-4 mt-2'>
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
          <label htmlFor='PL-Yes' className='block text-sm font-medium leading-6'>
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
          <label htmlFor='PL-No' className='block text-sm font-medium leading-6'>
            No
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default FilterPriceLevel;
