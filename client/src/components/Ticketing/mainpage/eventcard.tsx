import React from 'react';
import bgImg2 from '../../../assets/My-project-24.png';

import {useNavigate} from 'react-router-dom';

const ListComponent = (props) => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center '>
      <div className="flex flex-row overflow-auto md:flex-row
       sm:flex-col md:w-[35rem]
      sm:w-[20rem] md:h-full rounded-lg
       bg-zinc-700/80 shadow-lg mx-7 hover:scale-110
       transition duration-300
        ease-in-out">
        <img className=" md:w-[14rem] h-96
         sm:h-40 md:h-auto object-cover rounded-t-lg
           md:rounded-lg " src={bgImg2} alt="/" />
        <div className="p-6 flex flex-col justify-start text-center relative">
          <h5 className="text-gray-100 text-xl
           font-medium mb-2">BELLA: AN AMERICAN TALL TALE</h5>
          <p className="text-gray-200 text-base mb-4">
              Hop on board for a Western musical adventure,
               the likes of which you’ve never experienced.
          </p>
          <p className="text-gray-200
           text-xs py-1">Friday, May 6th ( PREVIEW), 7.30pm </p>
          <p className="text-gray-200
           text-xs py-1">Saturday, May 14th, 7.30pm</p>
          <p className="text-gray-200
           text-xs py-1">Wednesday, May 25th, 7.30pm</p>
          <div className='flex flex-col items-center'>
            <button onClick={() => navigate('./reserve')}className='py-2
            text-white  border bg-indigo-600 border-indigo-600
        hover:bg-transparent hover:text-indigo-600 rounded-full
             px-4 sm:w-[60%] my-3 mx-16 hover:text-white
              hover:border-white'>Reserve</button>
          </div>

        </div>

      </div>
    </div>


  );
};

export {ListComponent};
