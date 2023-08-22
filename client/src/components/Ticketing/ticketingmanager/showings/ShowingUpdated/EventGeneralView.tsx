/* eslint-disable max-len */
import {useEvent} from './EventProvider';
import React from 'react';
import {EventImage} from '../../../../../utils/imageURLValidation';
import {Button} from '@mui/material';
import {LineItem} from './InputControl';


interface EventGeneralViewProps {
  setEdit: (value)=>void;
}
export const EventGeneralView = (props:EventGeneralViewProps)=> {
  const {eventData} = useEvent();
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
      {/* Need to fix image sizing so that it does not exceed height requiremen */}
      <div className={'grid grid-cols-12 col-span-12 min-[450px]:col-span-6'}>
        <div className={'grid content-center col-span-9'}>
          <EventImage
            className={'block mx-auto w-[50%] h-auto'}
            src={eventData.imageurl}
            title={'Event Image'}
          />
        </div>
        <div className={'grid content-center col-span-3'}>
          <Button
            color={'primary'}
            variant={'contained'}
            onClick={() => setEdit((edit) => !edit)}
          >
          Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

