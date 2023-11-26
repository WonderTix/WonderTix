import React, {useState} from 'react';
import {SpinAnimation} from '../../../Tasks/SVGIcons';

import ReportOptions from './ReportOptions';
import DeliveryOptions from './DeliveryOptions';
import FrequencyOptions from './FrequencyOptions';

const showToast = (message: string) => {
  alert(message);
};

export interface ScheduledReportsProps {
  isVisible: boolean;
  onCancel: () => void;
}

const ScheduleReportsForm: React.FC<ScheduledReportsProps> = ({
  isVisible,
  onCancel,
}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [rangeRadio, setRangeRadio] = useState('Daily');
  const [frequencyRadio, setFrequencyRadio] = useState('Weekly');

  if (!isVisible) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showToast('Scheduled run saved successfully!');
      onCancel();
    }, 1000);
  };


  return (
    isVisible && (
      <div className='bg-black bg-opacity-50 antialiased
        flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-20'
      >
        <div className='bg-white rounded-md p-5 w-[592px] md:ml-[19%] lg:ml-[13.5%] ml-0'>
          <h1 className='text-6xl bg-clip-text text-transparent mb-8
            bg-gradient-to-r from-purple-400 to-yellow-400 mt-4
            tracking-tight text-center font-normal mx-auto'
          >
            Scheduled Reports
          </h1>
          <form onSubmit={handleSubmit} className='space-y-6 group'>
            <ReportOptions
              rangeRadio={rangeRadio}
              setRangeRadio={setRangeRadio}
            />
            <DeliveryOptions />
            <FrequencyOptions
              frequencyRadio={frequencyRadio}
              setFrequencyRadio={setFrequencyRadio}
            />

            <div className='flex justify-evenly border-t mx-auto my-8 pt-7 pb-3'>
              <button
                type='submit'
                title='schedule'
                className='py-3 px-6 w-48
                  flex justify-center items-center rounded
                  shadow shadow-gray-500 hover:shadow-inner
                  bg-black font-semibold text-center text-white
                  active:ring-2 active:ring-black active:opacity-75
                  bg-gradient-to-t from-black to-gray-800 hover:bg-gradient-to-b
                  group-invalid:ring-0 group-invalid:cursor-not-allowed group-invalid:opacity-50'
              > {isLoading ? <SpinAnimation /> : 'Schedule Run'}
              </button>
              <button
                type='button'
                title='cancel'
                onClick={onCancel}
                className='py-3 px-6 w-48
                  flex justify-center items-center rounded
                  font-semibold text-center text-gray-900
                  bg-gradient-to-t from-gray-500/50 to-gray-300
                  active:ring-2 active:ring-gray-500 active:opacity-75
                  shadow shadow-gray-500 hover:shadow-inner hover:bg-gradient-to-b'
              > Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ScheduleReportsForm;
