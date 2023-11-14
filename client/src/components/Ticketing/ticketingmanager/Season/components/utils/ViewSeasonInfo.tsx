import React from 'react';
import {SeasonInfo} from './seasonCommon';
import {SeasonImage} from '../../seasonUtils';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface ViewSeasonInfoProps extends SeasonInfo {
  setIsFormEditing: (value) => void;
}

const ViewSeasonInfo = (props: ViewSeasonInfoProps) => {
  const {name, startdate, enddate, imageurl, setIsFormEditing} = props;

  const getLongDateFormat = (date: string) => {
    const year: string = date.slice(0, 4);
    const month = Number(date.slice(5, 7));
    const day = date.slice(8);

    return `${MONTHS[month - 1]} ${day}, ${year}`;
  };

  return (
    <header className='rounded-xl bg-white p-7 text-lg shadow-xl'>
      <section className='flex flex-col text-center mb-5 justify-between tab:flex-row tab:flex-wrap'>
        <h1 className='text-4xl mb-3 font-semibold'>Season Information</h1>
        <button
          className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-10 rounded-xl'
          onClick={() => setIsFormEditing(true)}
        >
          Edit
        </button>
      </section>

      <div className='grid grid-cols-12'>
        <article className='col-span-12 mb-5 text-center tab:text-start tab:col-span-6'>
          <h3 className='font-semibold'>Season Name </h3>
          <p className='mb-3 text-base'>{name}</p>

          <h3 className='font-semibold'>Start Date </h3>
          <p className='mb-3 text-base'>{getLongDateFormat(startdate)}</p>

          <h3 className='font-semibold'>End Date </h3>
          <p className='text-base'>{getLongDateFormat(enddate)}</p>
        </article>
        <article className='col-span-12 tab:col-span-6'>
          <SeasonImage
            className='h-auto max-w-[150px] mx-auto mt-3'
            src={imageurl}
            alt={`Cover photo for ${name} season`}
          />
        </article>
      </div>
    </header>
  );
};

export default ViewSeasonInfo;
