import React, {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';
import {titleCase} from '../../../utils/arrays';
import {Event} from '../ticketingmanager/ticketingSlice';
import {EventImage} from '../../../utils/imageURLValidation';
import Label from '../Label';

/**
 * A single event card located on hero page.
 *
 * @param {Event} props
 * @returns {ReactElement} EventCard
 */
const EventCard = (props: Event): ReactElement => {
  const {id, title, description, imageurl: imageUrl, soldOut} = props;

  const navigate = useNavigate();

  return (
    <section className='flex justify-center'>
      <div
        className='relative flex flex-col overflow-auto md:flex-row md:w-[35rem]
        sm:w-[20rem] md:h-full rounded-2xl bg-zinc-900/60 shadow-lg mx-7
        hover:scale-110 transition duration-300 ease-in-out'
      >
        <EventImage
          className={`md:w-[14rem] h-40 md:h-auto object-cover rounded-t-lg md:rounded-lg ${
            soldOut && 'brightness-50'
          }`}
          src={imageUrl}
          title={title}
        />
        {soldOut && (
          <Label className='absolute top-3 right-3 md:right-auto md:left-3 text-xl' color='slate'>
            SOLD OUT
          </Label>
        )}
        <div className='p-6 flex flex-col justify-start text-center relative w-full'>
          <h5 className='text-gray-100 text-xl font-medium mb-2'>
            {titleCase(title)}
          </h5>
          <p className='text-gray-200 text-base mb-4'>
            {description ? description : 'No description available.'}
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
      </div>
    </section>
  );
};

export {EventCard};
