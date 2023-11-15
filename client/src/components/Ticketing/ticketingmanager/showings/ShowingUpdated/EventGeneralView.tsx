import {useEvent} from './EventProvider';
import React from 'react';
import {EventImage} from '../../../../../utils/imageURLValidation';
import {FormDeleteButton} from './FormDeleteButton';

import {LineItem} from './LineItem';

interface EventGeneralViewProps {
  setEdit: (value) => void;
  onDelete: (event) => void;
}
export const EventGeneralView = (props: EventGeneralViewProps) => {
  const {eventData, editing, setEditing, showPopUp} = useEvent();
  const {setEdit} = props;
  const {onDelete} = props;
  if (!eventData) {
    return null;
  }

  return (
    <div className={'bg-white flex flex-col p-6 rounded-xl shadow-xl'}>
      <div
        className={
          'grid grid-cols-12 mb-5 gap-2 justify-items-center min-[650px]:justify-items-end'
        }
      >
        <h2
          className={
            'col-span-12 min-[650px]:col-span-6 text-center min-[650px]:text-start text-3xl font-semibold text-zinc-800 w-full'
          }
        >
          Event Information
        </h2>
        <div
          className={
            'col-span-12 min-[650px]:col-span-6 flex flex-col justify-end gap-4'
          }
        >
          <div
            className={`py-2 px-4 ${
              eventData.active ? 'bg-green-100' : 'bg-red-100'
            } text-gray-700 border border-gray-300 flex items-center justify-center`}
            style={{cursor: 'default', borderRadius: '0'}}
          >
            <span className={'font-semibold'}>
              {eventData.active ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div>
          <button
            type={'button'}
            disabled={editing || showPopUp}
            onClick={() => {
              setEdit((edit) => !edit);
              setEditing((edit) => !edit);
            }}
            className={
              'w-full bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl h-fit w-fit'
            }
          >
            Edit
          </button>
          <button
            type={'button'}
            disabled={editing || showPopUp}
            onClick={() => onDelete(eventData)}
            className={
              'w-full bg-red-500 hover:bg-red-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl h-fit w-fit'
            }
          >
            Delete
          </button>
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
