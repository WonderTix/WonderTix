import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * Donor Management Dashboard
 *
 * @returns {React.ReactElement}
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const openEditor = () => {
    setIsEditorOpen(true);
  };
  return (
    <div className='w-full h-screen   overflow-x-hidden absolute    '>
      <div className='md:ml-[22rem] md:mt-40  sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]   '>
        <h1 className='font-bold text-5xl mb-14   pb-8 w-[60rem] '>
          Donors Dashboard
        </h1>

        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-5 '>
          <a
            onClick={() => navigate('/admin/reporting')}
            className='hover:scale-105 md:h-80 md:w- transition duration-300 ease-in-out border-none  bg-gradient-to-r from-sky-500 to-indigo-500 rounded-3xl  shadow-xl  '
          >
            <div className='m-8 flex flex-col items-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                fill='none'
                viewBox='0 0 24 24'
                stroke='white'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>

              <h5 className='mb-2 ml-1 text-2xl font-bold  text-white'>
                Reports
              </h5>
            </div>
          </a>
          <a
            onClick={openEditor}
            className='hover:scale-105 md:h-80 md:w- transition duration-300 ease-in-out border-none  bg-gradient-to-r from-sky-500 to-indigo-500 rounded-3xl  shadow-xl  '
          >
            <div className='m-8 flex flex-col items-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                fill='none'
                viewBox='0 0 24 24'
                stroke='white'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                />
              </svg>

              <h5 className='mb-2 ml-1 text-2xl font-bold  text-white'>
                Edit Intro Text
              </h5>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
