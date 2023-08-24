import {useEvent} from './EventProvider';
import React from 'react';
import {EventImage} from '../../../../../utils/imageURLValidation';
import {LineItem} from './InputControl';


interface EventGeneralViewProps {
  setEdit: (value)=>void;
}
export const EventGeneralView = (props:EventGeneralViewProps)=> {
  const {eventData, editing, setEditing} = useEvent();
  const {setEdit} = props;

  if (!eventData) {
    return null;
  }

  return (
    <div className={'grid grid-cols-12'}>
      <div className={'flex flex-col col-span-12 min-[450px]:col-span-6'}>
        <LineItem
          label={'Event ID'}
          information={eventData.eventid}
          event
        />
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
      </div>
      <div className={'grid grid-cols-12 col-span-12 min-[450px]:col-span-6'}>
        <div className={'grid content-center col-span-9'}>
          <EventImage
            className={'block mx-auto w-[50%] h-auto max-w-[200px]'}
            src={eventData.imageurl}
            title={'Event Image'}
          />
        </div>
        <div className={'grid content-center col-span-3'}>
          <button
            type={'button'}
            disabled={editing}
            onClick={async () => {
              setEdit((edit) => !edit);
              setEditing((edit)=> !edit);
            }}
            className={'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold p-2 px-4 rounded-xl'}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

