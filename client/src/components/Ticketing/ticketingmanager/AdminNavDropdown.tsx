import React from 'react';
import {useNavigate} from 'react-router-dom';
import AuthNav from '../../Authentication/auth-nav';

/**
 * This replaces the code for the corner nav bar ADMIN dropdown with Admin, Ticketing, Sign out buttons.
 */
const AdminNavDropdown = () => {
  const navigate = useNavigate();

  return (
    <ul className='p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-16'>
      <li className='text-gray-600 hover:text-indigo-700 cursor-pointer'>
        <a
          onClick={() => navigate('/admin')}
          className='flex w-full p-4 justify-start items-center gap-x-2 text-sm'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            />
          </svg>
          Admin
        </a>
      </li>
      <li className='text-gray-600 hover:text-indigo-700 cursor-pointer'>
        <a
          onClick={() => navigate('/ticketing')}
          className='flex w-full p-4 justify-start items-center gap-x-2 text-sm'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className=' h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
            />
          </svg>
          Manage Ticketing
        </a>
      </li>
      <li className='text-gray-600 hover:text-indigo-700 cursor-pointer'>
        <a
          onClick={() => navigate('/admin/donor')}
          className='flex w-full p-4 justify-start items-center gap-x-2 text-sm'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className=' h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          Donors Dashboard
        </a>
      </li>
      <li className='text-sm text-gray-600 hover:text-indigo-700 cursor-pointer p-4'>
        <AuthNav />
      </li>
    </ul>
  );
};

export default AdminNavDropdown;
