import React, {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';
import {titleCase} from '../../../utils/arrays';
import {Event} from '../ticketingmanager/ticketingSlice';
import {EventImage} from '../../../utils/imageURLValidation';

/**
 * Lists out all the event cards
 *
 * @param {Event} props
 * @returns {ReactElement}
 */
const ListComponent = (props: Event): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center'>
      <div
        className='flex flex-col overflow-auto md:flex-row md:w-[35rem]
        sm:w-[20rem] md:h-full rounded-2xl bg-zinc-900/60 shadow-lg mx-7
        hover:scale-110 transition duration-300 ease-in-out'
      >
        <EventImage
          className='md:w-[14rem] h-40 md:h-auto object-cover rounded-t-lg md:rounded-lg'
          src={props.imageurl}
          title={props.title}
        />
        <div className='p-6 flex flex-col justify-start text-center relative w-full'>
          <h5 className='text-gray-100 text-xl font-medium mb-2'>
            {titleCase(props.title)}
          </h5>
          <p className='text-gray-200 text-base mb-4'>
            {props.description
              ? props.description
              : 'No description available.'
            }
          </p>
          <div className='flex flex-col items-center'>
            <button
              onClick={() => navigate(`/events/${props.id}`)}
              className='py-2 text-white border bg-indigo-600 border-indigo-600
                hover:bg-transparent hover:text-white rounded-2xl px-4 md:px-6
                my-3 mx-1 hover:border-white'
            >
              Select Date & Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export {ListComponent};
