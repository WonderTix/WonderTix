import React from 'react';
import {SeasonInfo} from '../SeasonInfo';
import {SeasonImage} from '../../seasonUtils';

interface ViewSeasonInfoProps extends SeasonInfo {
  setIsFormEditing: (value) => void;
}

const ViewSeasonInfo = (props: ViewSeasonInfoProps) => {
  const {name, startdate, enddate, imageurl, setIsFormEditing} = props;
  return (
    <header className='rounded-xl bg-white p-7 text-lg'>
      <section className='flex flex-col text-center mb-5 justify-between tab:flex-row  '>
        <h1 className='text-4xl mb-3 font-semibold'>Season Information</h1>
        <button
          className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-10 rounded-xl'
          onClick={() => setIsFormEditing(true)}
        >
          Edit
        </button>
      </section>

      <section className='grid grid-cols-12'>
        <article className='col-span-12 mb-5 text-center tab:text-start sm:col-span-6'>
          <h3 className='font-semibold'>Season Name </h3>
          <p className='mb-3 text-base'>{name}</p>

          <h3 className='font-semibold'>Start Date </h3>
          <p className='mb-3 text-base'>{startdate}</p>

          <h3 className='font-semibold'>End Date </h3>
          <p className='text-base'>{enddate}</p>
        </article>
        <article className='col-span-12 sm:col-span-6'>
          <SeasonImage
            className='h-auto max-w-[125px] mx-auto'
            src={imageurl}
            alt={`Cover photo for ${name} season`}
          />
        </article>
      </section>
    </header>
  );
};

export default ViewSeasonInfo;
