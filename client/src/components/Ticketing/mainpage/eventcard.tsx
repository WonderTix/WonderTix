import React from 'react';
// import bgImg2 from '../../../assets/My-project-24.png';

import {useNavigate} from 'react-router-dom';
import {titleCase} from '../../../utils/arrays';
import {Event} from '../ticketingmanager/ticketing/ticketingSlice';

/**
 * Lists out all the event cards
 * @param {Event} props 
 * @returns {ReactElement}
 */
const ListComponent = (props: Event) => {
  const navigate = useNavigate();
  console.log('Props:', props);

  return (
    <div className='flex justify-center '>
      <div className="flex flex-row overflow-auto md:flex-row
       sm:flex-col md:w-[35rem]
      sm:w-[20rem] md:h-full rounded-2xl
       bg-zinc-900/60 shadow-lg mx-7 hover:scale-110
       transition duration-300
        ease-in-out">
        <img className=" md:w-[14rem] h-96
         sm:h-40 md:h-auto object-cover rounded-t-lg
           md:rounded-lg " src={props.image_url} alt="/" />
        <div className="p-6 flex flex-col justify-start text-center relative">
          <h5 className="text-gray-100 text-xl
           font-medium mb-2">{titleCase(props.title)}</h5>
          <p className="text-gray-200 text-base mb-4">
            {(props.description) ?
                          props.description :
                          'No description available.'
            }
          </p>
          <div className='flex flex-col items-center'>
            <button onClick={() => navigate(`/events/${props.id}`)}
              className='py-2
            text-white  border bg-indigo-600 border-indigo-600
             hover:bg-transparent hover:text-white rounded-2xl
             px-4 sm:w-[60%] my-3 mx-1
            hover:border-white'>See Showings</button>
          </div>

        </div>

      </div>
    </div>


  );
};

export {ListComponent};
