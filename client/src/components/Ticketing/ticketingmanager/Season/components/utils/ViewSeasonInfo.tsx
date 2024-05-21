import React from 'react';
import {SeasonInfo} from './seasonCommon';
import {SeasonImage} from '../../seasonUtils';
import {FormControlLabel, Switch} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import {FormButton} from '../../../Event/components/FormButton';
import {EditIcon, TrashCanIcon} from '../../../../Icons';

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
  someActiveEvents: boolean;
  setIsFormEditing: (value) => void;
  handleUpdateSeasonEvents: (value) => void;
  setActiveSeasonSwitch: (value) => void;
  setSomeActiveEvents: (value) => void;
  deleteConfirmationHandler: () => void;
  disabled: boolean;
}

const ViewSeasonInfo = (props: ViewSeasonInfoProps) => {
  const {
    name,
    startdate,
    enddate,
    imageurl,
    activeSeasonSwitch,
    someActiveEvents,
    setIsFormEditing,
    handleUpdateSeasonEvents,
    setActiveSeasonSwitch,
    setSomeActiveEvents,
    deleteConfirmationHandler,
    disabled,
  } = props;

  const getLongDateFormat = (date: string) => {
    const year: string = date.slice(0, 4);
    const month = Number(date.slice(5, 7));
    const day = date.slice(8);

    return `${MONTHS[month - 1]} ${day}, ${year}`;
  };

  return (
    <header className='rounded-xl bg-white p-7 text-lg shadow-xl'>
      <section className='flex flex-col gap-3 text-center mb-5 justify-between min-[750px]:flex-row min-[750px]:flex-wrap'>
        <h1 className='text-4xl font-semibold'>Season Information</h1>
        <div className='flex flex-row gap-1 max-[750px]:justify-center'>
          <p
            className={`${
              activeSeasonSwitch ? 'bg-green-100' : 'bg-red-100'
            } py-2 px-2 md:px-7 rounded-lg font-medium`}
          >
            {activeSeasonSwitch ? 'ACTIVE' : 'INACTIVE'}
          </p>
          <div className='flex flex-row justify-end gap-2'>
            <FormButton
              onClick={() => setIsFormEditing(true)}
              title='Edit'
              disabled={disabled}
              className='flex justify-center items-center bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-bold px-2 py-2 rounded-xl'
              testID='season-edit'
            >
              <EditIcon className='h-6 w-6' />
            </FormButton>
            <FormButton
              onClick={deleteConfirmationHandler}
              title='Delete'
              disabled={disabled}
              className='flex justify-center items-center bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-bold px-2 py-2 rounded-xl'
              testID='season-delete'
            >
              <TrashCanIcon className='h-6 w-6' />
            </FormButton>
          </div>
        </div>
      </section>
      <div className='grid grid-cols-12'>
        <article className='flex flex-col mb-5 text-center sm:text-start col-span-12 sm:col-span-6'>
          <h3 className='font-semibold'>Season Name</h3>
          <p className='mb-3 text-base' data-testid='season-name'>{name}</p>

          <h3 className='font-semibold'>Start Date</h3>
          <p className='mb-3 text-base' data-testid='season-startdate'>{getLongDateFormat(startdate)}</p>

          <h3 className='font-semibold'>End Date</h3>
          <p className='mb-3 text-base' data-testid='season-enddate'>{getLongDateFormat(enddate)}</p>

          <div className='flex items-center max-sm:justify-center'>
            <FormControlLabel
              control={<Switch checked={activeSeasonSwitch} />}
              onChange={() => {
                setActiveSeasonSwitch((checked) => !checked);
                setSomeActiveEvents((someActiveEvents) => !someActiveEvents);
                void handleUpdateSeasonEvents(!activeSeasonSwitch);
              }}
              sx={{margin: 0}}
              label={
                <p className='text-zinc-800 font-semibold pr-2'>
                  Active:
                </p>
              }
              labelPlacement='start'
            />
            {!activeSeasonSwitch && someActiveEvents && (
              <Tooltip
                title='One or more events within this season are active'
                placement='top-start'
                arrow
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-zinc-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                  />
                </svg>
              </Tooltip>
            )}
          </div>
        </article>
        <div className='col-span-12 sm:col-span-6 grid justify-center'>
          <SeasonImage
            className='h-auto max-w-[150px] object-cover mx-1 mt-3'
            src={imageurl}
            alt={`Cover photo for ${name} season`}
          />
        </div>
      </div>
    </header>
  );
};

export default ViewSeasonInfo;
