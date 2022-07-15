/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
// import React from 'react';
// import Login from './Login';

const Dashboard = () => {
  return (
    <div className='w-full h-screen   overflow-x-hidden absolute    '>
      <div className='md:ml-[22rem] md:mt-40  sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]   '>

        <h1 className='font-bold text-5xl mb-14   pb-8 w-[60rem] ' >Dashboard</h1>

        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-5 '>
          <a href='/accounts' className="hover:scale-105 md:h-80 md:w- transition duration-300 ease-in-out border-none  bg-gradient-to-r from-sky-500 to-indigo-500 rounded-3xl  shadow-xl  ">
            <div className="m-8 flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>

              <h5 className="mb-2 ml-1 text-2xl font-bold  text-white">Accounts</h5>

            </div>
          </a>
          <a href='/contacts' className="border-none hover:border-none hover:scale-105  transition duration-300 ease-in-out bg-gradient-to-r from-cyan-500 to-blue-500  rounded-3xl    shadow-xl   ">
            <div className="m-8 flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>

              <h5 className="mb-2 ml-1 text-2xl font-bold tracking-tight  text-white">Contacts</h5>

            </div>
          </a>
          <a href='/reporting' className=" hover:scale-105 transition duration-300 ease-in-out   md:h-60 border-none hover:border-none bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl   shadow-xl  ">
            <div className="m-8 flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>

              <h5 className="mb-2 ml-1 text-2xl font-bold tracking-tight  text-white">Reporting</h5>

            </div>
          </a>
          <a href="/tasks/create" className="border-none hover:border-none hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-3xl shadow-xl ">
            <div className="m-8  flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              <h5 className="mb-2 ml-1 text-2xl font-bold tracking-tight  text-white">Create Task</h5>

            </div>
          </a>
          <a href="/tasks/edit" className="border-none hover:border-none hover:scale-105  h-40 transition duration-300 ease-in-out  bg-gradient-to-r from-yellow-600 to-red-600 rounded-3xl  shadow-xl  ">

            <div className="m-8 flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="white">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>

              <h5 className="mb-2 ml-2 text-2xl font-bold tracking-tight  text-white">Edit Task</h5>

            </div>
          </a>
          <a href="/tasks/accountInformation" className="border-none hover:border-none hover:scale-105 transition duration-300 ease-in-out  bg-gradient-to-r from-purple-400 to-yellow-400 rounded-3xl   shadow-xl  ">
            <div className="m-8 flex flex-col items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              <h5 className="mb-2 ml-1 text-2xl font-bold tracking-tight  text-white">Account Information</h5>

            </div>
          </a>

        </div>


      </div>

    </div>
  );
};

export default Dashboard;
