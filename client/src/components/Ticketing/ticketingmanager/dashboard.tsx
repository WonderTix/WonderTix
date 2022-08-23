/* eslint-disable max-len */
import React from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * Has Dashboard, Door List, Manage Events, Add New Events, Delete Event Showings, Create Newsletter, Manage Seasonal Tickets to click on
 * @module 
 * @param {Object} navigate - Used to go to different components
 * @returns {ReactElement} Dashboard 
 */
const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full h-screen   overflow-x-hidden absolute    '>
      <div className='md:ml-[22rem] md:mt-40  sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]   '>

        <h1 className='font-bold text-5xl mb-14   pb-8 w-[60rem] ' >Dashboard</h1>

        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-5 '>
          <a onClick={() => navigate('/ticketing/doorlist')} className="hover:scale-105 md:h-80 md:w- transition duration-300 ease-in-out border-none  bg-gradient-to-r from-sky-500 to-indigo-500 rounded-3xl  shadow-xl  ">
            <div className="m-8 flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12  " viewBox="0 0 20 20" fill="white">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>

              <h5 className="mb-2 ml-2 text-2xl font-bold  text-white">Door List</h5>

            </div>
          </a>
          <a onClick={() => navigate('/ticketing/manageevent')} className="border-none hover:border-none hover:scale-105  transition duration-300 ease-in-out bg-gradient-to-r from-cyan-500 to-blue-500  rounded-3xl    shadow-xl   ">
            <div className="m-8 flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="white">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>

              <h5 className="mb-2 ml-1 text-2xl font-bold tracking-tight  text-white">Manage Events</h5>

            </div>
          </a>
          <a onClick={() => navigate('/ticketing/addevent')} className=" hover:scale-105 transition duration-300 ease-in-out   md:h-60 border-none hover:border-none bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl   shadow-xl  ">
            <div className="m-8 flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              <h5 className="mb-2 ml-1 text-2xl font-bold tracking-tight  text-white">Add New Events</h5>

            </div>
          </a>
          <a onClick={() => navigate('/ticketing/deleteevent')} className="border-none hover:border-none hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-3xl shadow-xl ">
            <div className="m-8  flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              <h5 className="mb-2 ml-1 text-2xl font-bold tracking-tight  text-white">Delete Event Showing</h5>

            </div>
          </a>
          <a onClick={() => navigate('/ticketing/addnewsletter')} className="border-none hover:border-none hover:scale-105  h-40  transition duration-300 ease-in-out  bg-gradient-to-r from-yellow-600 to-red-600 rounded-3xl  shadow-xl  ">

            <div className="m-8 flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="white">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>

              <h5 className="mb-2 ml-2 text-2xl font-bold tracking-tight  text-white">Create Newsletter</h5>

            </div>
          </a>
          <a className="border-none hover:border-none hover:scale-105    transition duration-300 ease-in-out  bg-gradient-to-r from-purple-400 to-yellow-400 rounded-3xl   shadow-xl  ">
            <div className="m-8 flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="white">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>

              <h5 className="mb-2 ml-1 text-2xl font-bold tracking-tight  text-white">Manage Seasonal Tickets</h5>

            </div>
          </a>

        </div>


      </div>

    </div>
  );
};

export default Dashboard;
