import {useEvent} from './EventProvider';
import React, {useEffect, useState} from 'react';
import {EventImage} from '../../../../../utils/imageURLValidation';
import {LineItem} from './LineItem';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';

interface EventGeneralViewProps {
  setEdit: (value) => void;
  onDelete: (event) => void;
  onSubmitActiveOnly: (eventData) => Promise<void>;
}

export const EventGeneralView = (props: EventGeneralViewProps) => {
  const {eventData, editing, setEditing, showPopUp} = useEvent();
  const {setEdit, onDelete, onSubmitActiveOnly} = props;
  const [isActive, setIsActive] = useState(
    eventData ? eventData.active : false,
  );

  useEffect(() => {
    setIsActive(eventData ? eventData.active : false);
  }, [eventData]);

  const handleActiveChange = () => {
    const updatedEventData = {
      ...eventData,
      active: !isActive,
    };
    setIsActive(!isActive);
    return onSubmitActiveOnly(updatedEventData);
  };

  if (!eventData) {
    return null;
  }

  return (
    <div className={'bg-white flex flex-col p-6 rounded-xl shadow-xl'}>
      <div
        className={
          'flex flex-col gap-3 text-center mb-5 justify-between tab:flex-row tab:flex-wrap'
        }
      >
        <h2 className={'text-3xl font-semibold text-zinc-800'}>
          Event Information
        </h2>
        <div className='flex flex-col gap-2 tab:flex-row tab:flex-wrap'>
          <span
            className={`${
              eventData.active ? 'bg-green-100' : 'bg-red-100'
            } py-2 px-8 rounded-lg font-medium`}
          >
            {eventData.active ? 'ACTIVE' : 'INACTIVE'}
          </span>

          <Tooltip title={<p>Edit</p>} placement='top' arrow>
            <button
              data-testid='event-edit-button'
              className='flex justify-center items-center bg-gray-400 hover:bg-gray-500 disabled:bg-gray-500 text-white font-bold px-2 py-2 rounded-xl'
              onClick={() => {
                if (!editing && !showPopUp) {
                  setEdit((edit) => !edit);
                  setEditing((edit) => !edit);
                }}
                disabled={editing || showPopUp}
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
            </span>
          </Tooltip>

          <Tooltip title={<p>Delete</p>} placement='top' arrow>
            <button
              data-testid='event-delete-button'
              className='flex justify-center items-center bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white font-bold px-2 py-2 rounded-xl'
              onClick={() => {
                if (!editing && !showPopUp) {
                  onDelete(eventData);
                }}
                disabled={editing || showPopUp}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill={editing || showPopUp ? '' : `#EF4444`}
                  viewBox='0 0 24 24'
                  stroke='white'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
              </button>
            </span>
          </Tooltip>
        </div>
      </div>
      <div className={'grid grid-cols-12'}>
        <div className={'flex flex-col col-span-12 min-[450px]:col-span-6'}>
          <LineItem
            label={'Event Name'}
            information={eventData.eventname}
            event
          />
          <LineItem
            description
            label={'Event Description'}
            information={eventData.eventdescription}
            event
          />
          {eventData.seasonid_fk && (
            <LineItem
              description
              label={'Event Season'}
              information={eventData.seasons?.name}
              event
            />
          )}
          <div className={'flex flex-row items-center col-span-6'}>
            <label
              htmlFor={'active'}
              className={'text-sm text-zinc-800 font-semibold pr-2'}
            >
              Active:
            </label>
            <Switch
              checked={isActive}
              onChange={handleActiveChange}
              inputProps={{'aria-label': 'controlled'}}
              id='active'
            />
          </div>
        </div>
        <div className={'col-span-12 min-[450px]:col-span-6'}>
          <EventImage
            className={'block mx-auto w-[50%] h-auto max-w-[125px]'}
            src={eventData.imageurl}
            title={'Event Image'}
          />
        </div>
      </div>
    </div>
  );
};
