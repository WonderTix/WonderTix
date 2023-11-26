import React from 'react';

interface ReportOptionsProps {
  rangeRadio: string;
  setRangeRadio: (value: string) => void;
}

const ReportOptions: React.FC<ReportOptionsProps> = ({
  rangeRadio,
  setRangeRadio,
}): React.ReactElement => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangeRadio(event.target.value);
  };

  return (
    <fieldset className='mb-4 mt-6'>
      <legend className='block font-bold bg-slate-100 text-lg indent-2 py-1 border-y w-full'>
        Report
      </legend>
      <div className='mt-4 px-5'>
        <label
          htmlFor='reportName'
          className='text-sm font-bold'
        >
          Report Name:
          <input
            type='text'
            id='reportName'
            name='reportName'
            placeholder='Daily Sales Report' pattern='.{3,}$'
            className='ml-4 p-1 w-[385px]
            border rounded text-sm font-normal
            bg-slate-50 placeholder-gray-400 placeholder:italic peer
            invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
            aria-describedby='schedule-name' aria-required='true' required
          />
          <span id='schedule-name'
            className='mt-2 hidden text-xs font-semibold text-red-500
            peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'
          >
            * Please provide a Schedule Name (at least 3 characters).
          </span>
        </label>
      </div>

      <div className='mt-4 pl-5 pr-5'>
        <label className='text-sm font-bold flex items-center justify-between'>
          Report Range:
          {['Daily', 'Weekly', 'Monthly', 'Quarterly'].map((value) => (
            <React.Fragment key={value}>
              <div className='flex items-center'>
                <input
                  type='radio'
                  id={`${value.toLowerCase()}Report`}
                  name='reportRange'
                  value={value}
                  checked={rangeRadio === value}
                  onChange={handleRadioChange}
                  className='h-3.5 w-3.5 border-gray-300'
                />
                <label
                  htmlFor={`${value.toLowerCase()}Report`}
                  className='font-medium indent-1'
                >
                  {value}
                </label>
              </div>
            </React.Fragment>
          ))}
        </label>
      </div>
    </fieldset>
  );
};

export default ReportOptions;
