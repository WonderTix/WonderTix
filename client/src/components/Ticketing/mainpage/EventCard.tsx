import React, {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';
import {titleCase} from '../../../utils/arrays';
import {Event} from '../ticketingmanager/ticketingSlice';
import {EventImage} from '../../../utils/imageURLValidation';
import Label from '../Label';
import format from 'date-fns/format';
import {trimDescription} from './heroUtils';

/**
 * A single event card located on hero page.
 *
 * @param {Event} props
 * @returns {ReactElement} EventCard
 */
const EventCard = (props: Event): ReactElement => {
  const {
    id,
    title,
    description,
    imageurl: imageUrl,
    soldOut,
    startDate,
    endDate,
  } = props;

  const navigate = useNavigate();

  const startEndDates =
    new Date(startDate).toDateString() === new Date(endDate).toDateString()
      ? format(new Date(startDate), 'MMM d')
      : `${format(new Date(startDate), 'MMM d')} - ${format(
          new Date(endDate),
          'MMM d',
        )}`;

  return (
    <article
      className='relative flex flex-col md:flex-row w-full
      rounded-xl bg-zinc-800/70 backdrop-blur-md shadow-lg
      md:hover:scale-105 transition duration-300 ease-in-out'
      data-testid={`hero-event-card-${title}`}
    >
      <EventImage
        className={`md:w-[14rem] h-40 md:h-[350px] object-cover rounded-t-lg md:rounded-lg ${
          soldOut && 'brightness-50'
        }`}
        src={imageUrl}
        title={title}
      />
      {soldOut && (
        <Label
          className='absolute top-3 right-3 md:right-auto md:left-3 text-xl'
          color='slate'
        >
          SOLD OUT
        </Label>
      )}
      <div className='flex flex-col justify-start relative w-full p-6'>
        <h3 className='text-zinc-100 text-2xl font-semibold'>
          {titleCase(title)}
        </h3>
        <p className='text-zinc-200 uppercase font-semibold'>
          {startEndDates}
        </p>
        <p className='text-zinc-200 text-base my-4 md:h-40'>
          {trimDescription(description, 215)}
        </p>
        <button
          onClick={() => navigate(`/events/${id}`)}
          className={`border rounded-2xl px-5 py-2 mt-3 mx-auto hover:bg-transparent hover:text-white hover:border-white
          ${
            !soldOut
              ? 'text-white bg-indigo-600 border-indigo-600'
              : 'text-gray-200 bg-transparent border-gray-200'
          }`}
        >
          {!soldOut ? 'Select Date & Time' : 'See Information'}
        </button>
      </div>
    </article>
  );
};

export {EventCard};
