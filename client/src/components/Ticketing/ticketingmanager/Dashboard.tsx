import React, {ReactElement} from 'react';
import DashboardLink from '../userdashboard/DashboardLink';

/**
 * Has Door List, Showings, Add New Events, Purchase Tickets,
 * Create Newsletter, Manage Seasonal Tickets, Manage Ticket Types, and
 * Ticket Exchanges to click on.
 *
 * @returns {ReactElement} Dashboard
 */
const Dashboard = (): ReactElement => {
  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[22rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
        <h1 className='font-bold text-5xl mb-14 md:pb-8'>
          Ticketing Dashboard
        </h1>
        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-5'>
          <DashboardLink
            gradientClasses='bg-gradient-to-r from-sky-500 to-indigo-500'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                viewBox='0 0 20 20'
                fill='white'
              >
                <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
                <path
                  fillRule='evenodd'
                  d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                  clipRule='evenodd'
                />
              </svg>
            }
            size='lg'
            title='Door List'
            route='/ticketing/doorlist'
          />
          <DashboardLink
            gradientClasses='bg-gradient-to-r from-cyan-500 to-blue-500'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='white'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
                />
              </svg>
            }
            size='lg'
            title='Events'
            route='/ticketing/events'
          />
          <DashboardLink
            gradientClasses='bg-gradient-to-r from-green-500 to-zinc-500'
            icon={
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
                  d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                />
              </svg>
            }
            size='md'
            title='Purchase Tickets'
            route='/ticketing/purchaseticket'
          />
          <DashboardLink
            gradientClasses='bg-gradient-to-r from-violet-500 to-fuchsia-500'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                fill='none'
                viewBox='0 0 24 24'
                stroke='white'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            }
            title='Seasons'
            route='/ticketing/seasons'
          />
          <DashboardLink
            gradientClasses='bg-gradient-to-r from-yellow-600 to-red-600'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                viewBox='0 0 20 20'
                fill='white'
              >
                <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z' />
              </svg>
            }
            title='Create Newsletter'
            route='/ticketing/addnewsletter'
          />
          <DashboardLink
            gradientClasses='bg-gradient-to-r from-purple-400 to-yellow-400'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                viewBox='0 0 20 20'
                fill='white'
              >
                <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                <path
                  fillRule='evenodd'
                  d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                  clipRule='evenodd'
                />
              </svg>
            }
            title='Manage Seasonal Tickets'
            route='/ticketing/seasonaltickets'
          />
          <DashboardLink
            gradientClasses='bg-gradient-to-r from-green-400 to-teal-700'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                viewBox='0 0 20 20'
                fill='white'
              >
                <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                <path
                  fillRule='evenodd'
                  d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                  clipRule='evenodd'
                />
              </svg>
            }
            title='Manage Ticket Types'
            route='/ticketing/tickettypes'
          />
          <DashboardLink
            gradientClasses='bg-gradient-to-r from-red-500 to-blue-600'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='white'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
                />
              </svg>
            }
            title='Ticket Exchanges'
            route='/ticketing/ticketexchanges'
          />
          <DashboardLink
            gradientClasses='bg-gradient-to-r from-sky-700 to-yellow-200'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='white'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z'
                />
              </svg>
            }
            title='Refund Orders'
            route='/ticketing/refund'
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
