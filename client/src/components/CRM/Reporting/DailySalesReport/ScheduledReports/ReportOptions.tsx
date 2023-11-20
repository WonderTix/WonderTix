import React from 'react';

interface ReportOptionsProps {
  rangeRadio: string;
  setRangeRadio: (value: string) => void;
}

const ReportOptions: React.FC<ReportOptionsProps> = ({rangeRadio, setRangeRadio}) => {
  return (
    <div>
      <fieldset className='mb-4 mt-6'>
        <legend className='block font-bold bg-slate-100 text-lg indent-2 py-1 border-y w-full'>
          Report
        </legend>
        <label className='text-sm font-bold leading-6 px-6'>
          Report Name:
          <input
            type='text'
            id='reportName'
            name='reportName'
            placeholder='Daily Sales Report' pattern='.{3,}$'
            className='ml-3 mt-5 p-1 w-8/12 border rounded text-sm font-normal
            bg-slate-50 placeholder-gray-400 placeholder:italic peer
            invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
            aria-describedby='schedule-name' aria-required='true' required
          />
          <span id='schedule-name'
            className='mt-2 hidden text-xs text-red-500
            peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'
          >
            * Please provide a Schedule Name (at least 3 characters).
          </span>
        </label>
        <label className='text-sm font-bold leading-6 mt-5 px-6 flex items-center pr-2'>
          Report Range:
          <input
            type='radio'
            id='dailyReport'
            name='reportRange'
            value='Daily'
            checked={rangeRadio === 'Daily'}
            onChange={(e) => setRangeRadio(e.target.value)}
            className='ml-5 h-3.5 w-3.5 border-gray-300'
          />
          <label htmlFor='dailyReport' className='font-medium indent-1'>Daily</label>
          <input
            type='radio'
            id='weeklyReport'
            name='reportRange'
            value='Weekly'
            checked={rangeRadio === 'Weekly'}
            onChange={(e) => setRangeRadio(e.target.value)}
            className='ml-6 h-3.5 w-3.5 border-gray-300'
          />
          <label htmlFor='weeklyReport' className='font-medium indent-1'>Weekly</label>
          <input
            type='radio'
            id='monthlyReport'
            name='reportRange'
            value='Monthly'
            checked={rangeRadio === 'Monthly'}
            onChange={(e) => setRangeRadio(e.target.value)}
            className='ml-6 h-3.5 w-3.5 border-gray-300'
          />
          <label htmlFor='monthlyReport' className='font-medium indent-1'>Monthly</label>
          <input
            type='radio'
            id='quarterlyReport'
            name='reportRange'
            value='Quarterly'
            checked={rangeRadio === 'Quarterly'}
            onChange={(e) => setRangeRadio(e.target.value)}
            className='ml-6 h-3.5 w-3.5 border-gray-300'
          />
          <label htmlFor='quarterlyReport' className='font-medium indent-1'>Quarterly</label>
        </label>
      </fieldset>
    </div>
  );
};

export default ReportOptions;
