import React, {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';
import {titleCase} from '../../../utils/arrays';
import {Event} from '../ticketingmanager/ticketingSlice';
import {EventImage} from '../../../utils/imageURLValidation';
import Label from '../Label';
import format from 'date-fns/format';

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

  const trimDescription = (desc: string) => {
    const trimmedDesc = desc.trimStart().trimEnd();
    if (trimmedDesc.length <= 215) {
      // If length of description is already 200 chars or less, that is ok
      return trimmedDesc;
    }

    const shorterDesc = trimmedDesc.substring(0, 212);
    if ([' ', '.', '!', '?', ',', ';'].includes(trimmedDesc[212])) {
      // If we trimmed the description at a good stopping point, return it
      return `${shorterDesc.trimEnd()}...`;
    }

    // Otherwise find the next space character to break the description at
    // This avoids stopping the description in the middle of a word
    const spaceIndex = shorterDesc.lastIndexOf(' ');
    if (spaceIndex > 0) {
      return `${shorterDesc.substring(0, spaceIndex).trimEnd()}...`;
    } else {
      return 'No description available.';
    }
  };

  const dateDescription =
    startDate.substring(0, 10) === endDate.substring(0, 10)
      ? format(new Date(startDate), 'MMM d')
      : `${format(new Date(startDate), 'MMM d')} - ${format(
          new Date(endDate),
          'MMM d',
        )}`;

  return (
    <article
      className='relative flex flex-col overflow-auto md:flex-row w-full
      rounded-xl bg-zinc-800/70 backdrop-blur-md shadow-lg
      hover:scale-105 transition duration-300 ease-in-out'
    >
      <EventImage
        className={`md:w-[14rem] h-40 md:h-auto object-cover rounded-t-lg md:rounded-lg ${
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
      <div className='p-6 flex flex-col justify-start relative w-full'>
        <h3 className='text-zinc-100 text-2xl font-semibold'>
          {titleCase(title)}
        </h3>
        <p className='text-zinc-200 uppercase font-semibold'>
          {dateDescription}
        </p>
        <p className='text-zinc-200 text-base my-4 md:h-40'>
          {description
            ? trimDescription(description)
            : 'No description available.'}
        </p>
        <div className='flex flex-col items-center'>
          <button
            onClick={() => navigate(`/events/${id}`)}
            className={`py-2 border rounded-2xl px-4 md:px-6 my-3 mx-1 hover:bg-transparent hover:text-white hover:border-white
            ${
              !soldOut
                ? 'text-white bg-indigo-600 border-indigo-600'
                : 'text-gray-200 bg-transparent border-gray-200'
            }`}
          >
            {!soldOut ? 'Select Date & Time' : 'See Information'}
          </button>
        </div>
      </div>
    </article>
  );
};

export {EventCard};
