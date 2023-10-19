import React from 'react';
import {getImageDefault} from '../../../../../utils/imageURLValidation';

interface EventCardProps {
  name: string;
  imageurl: string;
}

const EventCard = (props: EventCardProps) => {
  const {name, imageurl} = props;
  return (
    <div className='flex flex-col items-center bg-gray-200 rounded-xl border-8 border-solid border-zinc-300 mb-3 p-3 tab:flex-row'>
      <div id='event-image-container' className='w-32'>
        <img
          className='h-auto w-full'
          src={
            imageurl === 'Default Event Image' ? getImageDefault() : imageurl
          }
          alt={`Cover photo for ${name} event`}
        />
      </div>
      <h3 className='ml-5 text-3xl font-bold'>{name}</h3>
    </div>
  );
};

export default EventCard;
