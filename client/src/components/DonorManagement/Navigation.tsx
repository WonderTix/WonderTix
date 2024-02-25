/* eslint-disable max-len */
import React, {useState} from 'react';
import logo from '../../Logo/2011_Logo_white.png';
import '../../Logo/logo.css';
import {useAuth0} from '@auth0/auth0-react';
import AuthNav from '../Authentication/auth-nav';

import {useNavigate} from 'react-router-dom';
import AdminNavDropdown from '../Ticketing/ticketingmanager/AdminNavDropdown';

/**
 * Donors Management Navigation bar
 *
 * @returns {React.ReactElement}
 */
const Navigation = () => {
  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const handleClick = () => setShowTaskMenu(!showTaskMenu);
  const [profile, setProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const {user} = useAuth0();
  const {picture} = user;
  const {name} = user;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-gray-100  ">
      <div className="flex flex-no-wrap">
        <div
          className="absolute md:relative w-[14rem] h-screen
                        bg-zinc-900 hidden md:block z-10"
        >
          <div className="h-12 w-full flex flex-col items-center">
            <button
              onClick={() => navigate('/')}
              className=" bg-transparent border-transparent justify-center items-center"
            >
              <img src={logo} className="mt-[5rem] w-[6rem]" alt="/" />
            </button>
          </div>
          <ul className="space-y-7 mt-30 ml-[rem] flex flex-col items-center   ">
            <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <a
                onClick={() => navigate('/admin')}
                className="bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out "
              >
                <div className="flex flex-col gap-2 items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </div>

                  <span className="">Admin Dashboard</span>
                </div>
              </a>
            </li>
            <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <a
                onClick={() => navigate('./reporting')}
                className="bg-transparent border-none rounded-none hover:scale-110 transition duration-300 ease-in-out "
              >
                <div className="flex flex-col gap-2 items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  <span className="">Reports</span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        {/* Navigation starts */}
        <div className="w-full">
          <nav className="h-16 flex items-center md:items-stretch justify-end md:justify-between bg-white shadow relative z-10">
            <div className="hidden md:flex md:items-center md:justify-between w-full pr-6">
              <div className="h-full hidden md:flex items-center pr-24">
                <div className="relative w-full">
                  <div className="focus:outline-none focus:border-indigo-700 w-full text-lg text-zinc-500 pl-12 py-2 font-bold ">Welcome to WonderTix Donors Management</div>
                </div>
              </div>
              <div className="relative px-4">
                <button className="flex items-center cursor-pointer" onClick={() => setProfile(!profile)}>
                  <div className="rounded-full">
                    <img src={picture} className='rounded-3xl w-12 h-12' />
                  </div>
                  <p className="text-gray-800 text-sm mx-3">{name}</p>
                  <div className="cursor-pointer text-gray-600">
                    <svg aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>
                {profile && <AdminNavDropdown marginClass='mt-3' />}
              </div>
            </div>
            <div className="text-gray-600 mr-8 visible md:hidden relative" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              {showMobileMenu ? (
                ' '
              ) : (
                <svg aria-label="Main Menu" aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu cursor-pointer" width={30} height={30} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={4} y1={8} x2={20} y2={8} />
                  <line x1={4} y1={16} x2={20} y2={16} />
                </svg>
              )}
            </div>
          </nav>

        </div>
      </div>

    </div>
  );
};

export default Navigation;
