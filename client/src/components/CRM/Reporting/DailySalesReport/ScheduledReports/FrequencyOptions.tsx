import React from 'react';

interface FrequencyOptionsProps {
  frequencyRadio: string;
  setFrequencyRadio: (value: string) => void;
}

const FrequencyOptions: React.FC<FrequencyOptionsProps> = ({
  frequencyRadio,
  setFrequencyRadio,
}): React.ReactElement => {
  const renderRadioButtons = () => {
    return ['Daily', 'Weekly', 'Monthly', 'Quarterly'].map((frequency) => (
      <label key={frequency} htmlFor={`frequency${frequency}`} className='ml-6 flex items-center'>
        <input
          type='radio'
          id={`frequency${frequency}`}
          name='frequency'
          value={frequency}
          checked={frequencyRadio === frequency}
          onChange={(e) => setFrequencyRadio(e.target.value)}
          className='h-3.5 w-3.5 border-gray-300'
        />
        <span className='ml-2 font-medium'>{frequency}</span>
      </label>
    ));
  };

  return (
    <>
      <fieldset className='mb-4 mt-6'>
        <legend className='block font-bold bg-slate-100 text-lg indent-2 py-1 border-y w-full'>
          Frequency
        </legend>
        <div className='mt-4 px-5'>
          <legend className='text-sm font-bold mt-4 flex items-center justify-between'>
            Frequency:
            {renderRadioButtons()}
          </legend>
        </div>
      </fieldset>

      <fieldset className='px-5 mt-4 text-sm'>
        {['Daily', 'Weekly', 'Monthly', 'Quarterly'].includes(frequencyRadio) && (
          <div className=''>
            {frequencyRadio === 'Daily' && (
              <div className='flex justify-between items-center'>
                <label className='font-bold'>
                  Time:
                  <input
                    required
                    type='time'
                    aria-required='true'
                    className='ml-2 p-1.5 pl-2 w-44 border rounded text-sm font-normal bg-slate-50'
                  />
                </label>
              </div>
            )}

            {frequencyRadio === 'Weekly' && (
              <div className='flex justify-between items-center'>
                <label htmlFor='weekDay'>
                  <b>Every:</b>
                  <select id='weekDay' className='w-40 ml-2 rounded border border-gray-300 p-1.5'>
                    {[
                      'Sunday',
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                    ].map((day) => (
                      <option key={day} value={day}> {day} </option>
                    ))}
                  </select>
                </label>
                <label className='font-bold'>
                  Time:
                  <input
                    required
                    type='time'
                    aria-required='true'
                    className='ml-2 p-1.5 pl-2 w-44 border rounded text-sm font-normal bg-slate-50'
                  />
                </label>
              </div>
            )}

            {frequencyRadio === 'Monthly' && (
              <div className='flex justify-between items-center'>
                <label htmlFor='monthDay'>
                  <b>Every:</b>
                  <select id='monthDay' className='w-40 ml-2 rounded border border-gray-300 p-1.5'>
                    {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th',
                      '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th',
                      '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th',
                      'Last day',
                    ].map((day) => (
                      <option key={day} value={day}> {day} </option>
                    ))}
                  </select>
                </label>
                <label className='font-bold'>
                  Time:
                  <input
                    required
                    type='time'
                    aria-required='true'
                    className='ml-2 p-1.5 pl-2 w-44 border rounded text-sm font-normal bg-slate-50'
                  />
                </label>
              </div>
            )}

            {frequencyRadio === 'Quarterly' && (
              <div className='flex justify-between items-center'>
                <label htmlFor='quarterMonth'>
                  <b>Every:</b>
                  <select id='quarterMonth' className='w-40 ml-2 rounded border border-gray-300 p-1.5'>
                    {[
                      '1st',
                      '5th',
                      '10th',
                      '15th',
                      '30th',
                      '60th',
                      'Last day',
                    ].map((day) => (
                      <option key={day} value={day}> {day} </option>
                    ))}
                  </select>
                </label>
                <label className='font-bold'>
                  Time:
                  <input
                    required
                    type='time'
                    aria-required='true'
                    className='ml-2 p-1.5 pl-2 w-44 border rounded text-sm font-normal bg-slate-50'
                  />
                </label>
              </div>
            )}
          </div>
        )}
      </fieldset>
    </>
  );
};

export default FrequencyOptions;
