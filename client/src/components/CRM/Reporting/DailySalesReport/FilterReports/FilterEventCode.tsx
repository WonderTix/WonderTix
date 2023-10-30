import React from 'react';

const FilterEventCode: React.FC = (): React.ReactElement => {
  return (
    <fieldset className='p-4 mt-4'>
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
          <label htmlFor='GL-Yes' className='block text-sm font-medium leading-6'>
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
          <label htmlFor='GL-No' className='block text-sm font-medium leading-6'>
            No
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default FilterEventCode;
