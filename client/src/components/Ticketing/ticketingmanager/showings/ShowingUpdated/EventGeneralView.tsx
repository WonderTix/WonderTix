/* eslint-disable max-len */
import {useEvent} from './EventProvider';
import React from 'react';
import {EventItem} from './InputControl';
import {EventImage} from '../../../../../utils/imageURLValidation';
import {Button} from '@mui/material';

export const EventGeneralView = (props: {setEdit: (value) => void}) => {
  const {eventData} = useEvent();
  const {setEdit} = props;

  if (!eventData) {
    return null;
  }
  return (
    <div className={'grid grid-cols-12'}>
      <div className={'flex flex-col col-span-12 min-[450px]:col-span-6'}>
        <EventItem
          label={'Event ID'}
          information={eventData.eventid}
        />
        <EventItem
          label={'Event Name'}
          information={eventData.eventname}
        />
        <EventItem
          description
          label={'Event Description'}
          information={eventData.eventdescription}
        />
      </div>
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

