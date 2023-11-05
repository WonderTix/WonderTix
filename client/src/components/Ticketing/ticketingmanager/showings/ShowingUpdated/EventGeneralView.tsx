import {useEvent} from './EventProvider';
import React from 'react';
import {EventImage} from '../../../../../utils/imageURLValidation';

import {LineItem} from './LineItem';

interface EventGeneralViewProps {
  setEdit: (value) => void;
}
export const EventGeneralView = (props: EventGeneralViewProps) => {
  const {eventData, editing, setEditing, showPopUp} = useEvent();
  const {setEdit} = props;

  if (!eventData) {
    return null;
  }

  return (
    <div className={'bg-white flex flex-col p-6 rounded-xl shadow-xl'}>
      <div className={'grid grid-cols-12 mb-5 gap-2 justify-items-center min-[650px]:justify-items-end'}>
        <h2 className={'col-span-12 min-[650px]:col-span-6 text-center min-[650px]:text-start text-3xl font-semibold text-zinc-800 w-full'}>
          Event Information
        </h2>
        <button
          type={'button'}
          disabled={editing || showPopUp}
          onClick={() => {
            setEdit((edit) => !edit);
            setEditing((edit) => !edit);
          }}
          className={
            ' bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl h-fit w-fit col-span-12 min-[650px]:col-span-6'
          }
        >
          Edit
        </button>
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
          {
            eventData.seasonid_fk &&
          <LineItem
            description
            label={'Event Season'}
            information={eventData.seasons?.name}
            event
          />
          }
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
