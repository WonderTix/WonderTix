import {useEvent} from './EventProvider';
import React, {useEffect, useState} from 'react';
import {EventImage} from '../../../../../utils/imageURLValidation';
import {FormDeleteButton} from './FormDeleteButton';
import {LineItem} from './LineItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface EventGeneralViewProps {
  setEdit: (value) => void;
  onDelete: (event) => void;
  onSubmitActiveOnly: (eventData) => void;
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

  const handleActiveChange = async () => {
    const updatedEventData = {
      ...eventData,
      active: !isActive,
    };
    setIsActive(!isActive);
    onSubmitActiveOnly(updatedEventData);
  };

  if (!eventData) {
    return null;
  }

  return (
    <div className={'bg-white flex flex-col p-6 rounded-xl shadow-xl'}>
      <div className={'flex justify-between items-center mb-5'}>
        <h2 className={'text-3xl font-semibold text-zinc-800'}>
          Event Information
        </h2>
        <div className='flex items-center gap-2'>
          <div
            className={`py-2 px-4 ${
              eventData.active ? 'bg-green-100' : 'bg-gray-300'
            } text-gray-700 border border-gray-300 flex items-center justify-center rounded-lg`}
            style={{cursor: 'default'}}
          >
            <span className={'font-semibold'}>
              {eventData.active ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div>

          <div
            onClick={() => {
              if (!editing && !showPopUp) {
                setEdit((edit) => !edit);
                setEditing((edit) => !edit);
              }
            }}
            className={`cursor-pointer ${
              editing || showPopUp ? 'opacity-50' : ''
            } bg-gray-400 hover:bg-gray-500 text-white rounded-lg`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-10 w-10'
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
          </div>

          <div
            onClick={() => {
              if (!editing && !showPopUp) {
                onDelete(eventData);
              }
            }}
            className={`cursor-pointer ${
              editing || showPopUp ? 'opacity-50' : ''
            } bg-red-500 hover:bg-red-600 rounded-lg`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-10 w-10'
              fill='#EF4444'
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
          </div>
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
