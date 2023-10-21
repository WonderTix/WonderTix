import React, {useState} from 'react';
import {getImageDefault} from '../../../../../utils/imageURLValidation';
import {useNavigate} from 'react-router';

interface EventCardProps {
  name: string;
  imageurl: string;
  eventId: string;
  addEventCard?: boolean;
  isFormEditing?: boolean;
  isAddEventActive?: boolean;
  addEventToSeason?: (value) => void;
  deleteEventConfirmationHandler?: (value) => void;
}

const EventCard = (props: EventCardProps) => {
  const {
    name,
    imageurl,
    eventId,
    isFormEditing,
    addEventCard = false,
    isAddEventActive = false,
    addEventToSeason,
    deleteEventConfirmationHandler,
  } = props;
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center bg-gray-200 rounded-xl border-8 border-solid border-zinc-300 mb-3 p-3 tab:flex-row tab:justify-between'>
      <article className='flex flex-col items-center justify-center tab:flex-row'>
        <div id='event-image-container' className='w-36'>
          <img
            className='h-auto'
            src={
              imageurl === 'Default Event Image' ? getImageDefault() : imageurl
            }
            alt={`Cover photo for ${name} event`}
          />
        </div>
        <h3 className='text-3xl font-bold tab:ml-5'>{name}</h3>
      </article>
      {addEventCard ? (
        <article>
          <button
            onClick={() => {
              addEventToSeason(Number(eventId));
            }}
            className='bg-green-500 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-3 px-5 rounded-xl mt-2 tab:m-0'
          >
            Add to Season
          </button>
        </article>
      ) : (
        <article className='flex flex-col my-2'>
          <button
            onClick={() => navigate(`/ticketing/showings/${Number(eventId)}`)}
            className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white py-2 px-3 rounded-xl mb-2'
            disabled={isFormEditing || isAddEventActive}
          >
            Go to Event Page
          </button>
          <button
            className='bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white py-2 px-3 rounded-xl'
            disabled={isFormEditing || isAddEventActive}
            onClick={() => deleteEventConfirmationHandler(Number(eventId))}
          >
            Remove Event
          </button>
        </article>
      )}
    </div>
  );
};

export default EventCard;
