import {useEvent} from './EventProvider';
import React from 'react';
import {Item} from './InputControl';
import {EventImage} from '../../../../../utils/imageURLValidation';

export const EventGeneralView = () => {
  const {eventData} = useEvent();

  if (!eventData) {
    return <div>Loading</div>;
  }
  return (
    <div className={'flex flex-row h-[100%]'}>
      <Item
        label={'Event ID'}
        information={eventData.eventid}
      />
      <Item
        label={'Event Name'}
        information={eventData.eventname}
      />
      <p>Event Description</p>
      <p>{eventData.eventdescription}</p>
      <EventImage
        className={'h-[50%] w-auto'}
        src={eventData.imageurl}
        title={'Event Image'}
      />

    </div>);
};
