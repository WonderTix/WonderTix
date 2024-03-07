import {useEvent} from './EventProvider';
import React, {useEffect, useState} from 'react';
import {EventImage} from '../../../../../utils/imageURLValidation';
import {LineItem} from './LineItem';
import Switch from '@mui/material/Switch';
import {FormButton} from './FormButton';
import {FormDeleteButton} from './FormDeleteButton';
import {EditIcon, TrashCanIcon} from '../../../Icons';

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

  const handleSubscriptionChange = () => {
    const updatedEventData = {
      ...eventData,
      subscriptioneligible: !eventData.subscriptioneligible,
    };
    return onSubmitActiveOnly(updatedEventData);
  };

  if (!eventData) {
    return null;
  }

  return (
    <div className={'bg-white flex flex-col p-6 rounded-xl shadow-xl'}>
      <div
        className={
          'flex flex-col gap-3 text-center mb-5 justify-between min-[650px]:flex-row min-[650px]:flex-wrap'
        }
      >
        <h2 className={'text-3xl font-semibold text-zinc-800'}>
          Event Information
        </h2>
        <div className='flex flex-row gap-2 flex-wrap justify-center min-[650px]:justify-end'>
          <p
            className={`${
              eventData.active ? 'bg-green-100' : 'bg-red-100'
            } py-2 px-2 md:px-7 rounded-lg font-medium`}
          >
            {eventData.active ? 'ACTIVE' : 'INACTIVE'}
          </p>
          <FormButton
            onClick={() => {
              setEdit((edit) => !edit);
              setEditing((edit) => !edit);
            }}
            title='Edit'
            disabled={editing || showPopUp}
            className='flex justify-center items-center bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white font-bold p-2 rounded-xl shadow-xl'
            testID='event-edit-button'
          >
            <EditIcon className='h-6 w-6' />
          </FormButton>
          <FormDeleteButton
            className='flex justify-center items-center bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white font-bold p-2 rounded-xl shadow-xl'
            onDelete={onDelete}
            disabled={showPopUp || editing}
            testID='event-delete-button'
          >
            <TrashCanIcon className='h-6 w-6' />
          </FormDeleteButton>
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
          <div
            className='flex flex-row gap-3 items-center col-span-12 min-[450px]:col-span-6 grid min-[450px]:grid-cols-2'
          >
            <div className='flex flex-row items-center'>
              <label
                htmlFor='active'
                className='text-sm text-zinc-800 font-semibold pr-2'
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
            <div className='flex flex-row items-center'>
              <label
                htmlFor='subscriptioneligible'
                className='text-sm text-zinc-800 font-semibold pr-2'
              >
                Subscription Eligible:
              </label>
              <Switch
                checked={eventData.subscriptioneligible}
                onChange={handleSubscriptionChange}
                inputProps={{'aria-label': 'controlled'}}
                id='subscriptioneligible'
              />
            </div>
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
