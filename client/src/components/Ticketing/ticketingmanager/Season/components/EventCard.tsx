import React, {useState} from 'react';
import {getImageDefault} from '../../../../../utils/imageURLValidation';
import {useNavigate} from 'react-router';

interface EventCardProps {
  name: string;
  imageurl: string;
  eventId: string;
  addEventCard?: boolean;
  isFormEditing?: boolean;
  addEventToSeason?: (value) => void;
  deleteConfirmationHandler?: (value) => void;
}

const EventCard = (props: EventCardProps) => {
  const {
    name,
    imageurl,
    eventId,
    isFormEditing,
    addEventCard = false,
    addEventToSeason,
    deleteConfirmationHandler,
  } = props;
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center bg-gray-200 rounded-xl border-8 border-solid border-zinc-300 mb-3 p-3 tab:flex-row tab:justify-between'>
      <article className='flex flex-col items-center tab:flex-row'>
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
      </article>
      {addEventCard ? (
        <article>
          <button
            onClick={() => {
              addEventToSeason(Number(eventId));
            }}
            className='bg-green-500 hover:bg-green-700 disabled:bg-gray-500 text-white py-2 px-7 rounded-xl'
          >
            Add to Season
          </button>
        </article>
      ) : (
        <article className='flex flex-col my-2'>
          <button
            onClick={() => navigate(`/ticketing/showings/${Number(eventId)}`)}
            className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white py-2 px-3 rounded-xl mb-2'
            disabled={isFormEditing}
          >
            Go to Event Page
          </button>
          <button
            className='bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white py-2 px-3 rounded-xl'
            disabled={isFormEditing}
            onClick={() => deleteConfirmationHandler(Number(eventId))}
          >
            Remove Event
          </button>
        </article>
      )}
    </div>
  );
};

export default EventCard;
