import React from 'react';
import {SeasonInfo} from './seasonCommon';
import {SeasonImage} from '../../seasonUtils';
import {FormControlLabel, Switch} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import {FieldArray} from 'formik';
import {SeasonTicketViewTable} from '../SeasonTicketViewTable';

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
  activeSeasonSwitch: boolean;
  setIsFormEditing: (value) => void;
  handleUpdateSeasonEvents: (value) => void;
  setActiveSeasonSwitch: (value) => void;
  deleteConfirmationHandler: (event) => void;
}

const ViewSeasonInfo = (props: ViewSeasonInfoProps) => {
  const {
    name,
    startdate,
    enddate,
    imageurl,
    activeSeasonSwitch,
    setIsFormEditing,
    handleUpdateSeasonEvents,
    setActiveSeasonSwitch,
    deleteConfirmationHandler,
  } = props;

  const values: {eventinstanceid: number} = {eventinstanceid: parseInt('1234', 10)};

  const getLongDateFormat = (date: string) => {
    const year: string = date.slice(0, 4);
    const month = Number(date.slice(5, 7));
    const day = date.slice(8);

    return `${MONTHS[month - 1]} ${day}, ${year}`;
  };

  return (
    <header className='rounded-xl bg-white p-7 text-lg shadow-xl'>
      <section className='flex flex-col gap-3 text-center mb-5 justify-between tab:flex-row tab:flex-wrap'>
        <h1 className='text-4xl font-semibold'>Season Information</h1>
        <div className='flex flex-col gap-2 tab:flex-row tab:flex-wrap'>
          <span
            className={`${
              activeSeasonSwitch ? 'bg-green-100' : 'bg-red-100'
            } py-2 px-8 rounded-lg font-medium`}
          >
            {activeSeasonSwitch ? 'ACTIVE' : 'INACTIVE'}
          </span>
          <Tooltip title={<p>Edit</p>} placement='top' arrow>
            <button
              className='flex justify-center items-center bg-gray-400 hover:bg-gray-500 disabled:bg-gray-500 text-white font-bold px-2 py-2 rounded-xl'
              onClick={() => setIsFormEditing(true)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                />
              </svg>
            </button>
          </Tooltip>
          <Tooltip title={<p>Delete</p>} placement='top' arrow>
            <button
              className='flex justify-center items-center bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white font-bold px-2 py-2 rounded-xl'
              onClick={deleteConfirmationHandler}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            </button>
          </Tooltip>
        </div>
      </section>
      <div className='grid grid-cols-12'>
        <div className='flex flex-col col-span-6 lg:col-span-2 sm:flex-row mb-5 text-center sm:text-start'>
          <article className=''>
            <h3 className='font-semibold'>Season Name </h3>
            <p className='mb-3 text-base'>{name}</p>

            <h3 className='font-semibold'>Start Date </h3>
            <p className='mb-3 text-base'>{getLongDateFormat(startdate)}</p>

            <h3 className='font-semibold'>End Date </h3>
            <p className='mb-3 text-base'>{getLongDateFormat(enddate)}</p>
            <div>
              <FormControlLabel
                control={<Switch checked={activeSeasonSwitch} />}
                onChange={() => {
                  setActiveSeasonSwitch((checked) => !checked);
                  void handleUpdateSeasonEvents(!activeSeasonSwitch);
                }}
                sx={{margin: 0, gap: '5px'}}
                label='Active'
                labelPlacement='start'
              />
            </div>
          </article>
        </div>
        <div className='col-span-6 lg:col-span-2'>
          <SeasonImage
            className='h-auto max-w-[150px] object-cover mx-1 mt-3'
            src={imageurl}
            alt={`Cover photo for ${name} season`}
          />
        </div>
        <div className='pl-2 col-span-12 lg:col-span-8 h-[100%]'>
          <div className='flex flex-col justify-center m-auto col-span-12 lg:col-span-8 rounded-lg p-3 w-[100%] h-[100%]'>
            <SeasonTicketViewTable />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ViewSeasonInfo;
