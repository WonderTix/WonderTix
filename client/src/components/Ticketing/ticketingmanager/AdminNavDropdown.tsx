/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import AuthNav from '../../Authentication/auth-nav';

/**
 * This replaces the code for the corner nav bar ADMIN dropdown with Admin, Ticketing, Sign out buttons.
 */
const AdminNavDropdown = () => {
  const navigate = useNavigate();

  return (
    <>
      <ul className="p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-16 ">
        <li className="text-gray-600 hover:text-indigo-700 cursor-pointer">
          <a onClick={() => navigate('/admin')}className="flex w-full p-4 justify-start items-center gap-x-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Admin
          </a>
        </li>
        <li className="text-gray-600 hover:text-indigo-700 cursor-pointer">
          <a onClick={() => navigate('/ticketing')}className="flex w-full p-4 justify-start items-center gap-x-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            Manage Ticketing
          </a>
        </li>
        <li className="text-sm text-gray-600 hover:text-indigo-700 cursor-pointer">
          <AuthNav />
        </li>
      </ul>
    </>
  );
};

export default AdminNavDropdown;
