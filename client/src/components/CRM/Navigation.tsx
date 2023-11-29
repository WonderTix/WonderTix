/* eslint-disable operator-linebreak */
import React, {useState} from 'react';
import logo from '../../Logo/2011_Logo_white.png';
import '../../Logo/logo.css';
import {useAuth0} from '@auth0/auth0-react';
import AuthNav from '../Authentication/auth-nav';

import {useNavigate} from 'react-router-dom';
import AdminNavDropdown from '../Ticketing/ticketingmanager/AdminNavDropdown';
/**
 * CRM Navigation bar
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
    <div className="w-full h-full bg-gray-100">
      <div className="flex flex-no-wrap">
        <div className="absolute md:relative w-[14rem] h-screen  bg-zinc-900 hidden md:block z-10 overflow-auto">
          <div className="h-12 w-full flex flex-col items-center">
            <button
              onClick={() => navigate('/')}
              className=" bg-transparent border-transparent justify-center items-center"
            >
              <img src={logo} className="mt-[5rem] w-[6rem]" alt="/" />
            </button>
          </div>
          <ul className="space-y-7 mt-30 ml-[rem] flex flex-col items-center mb-7">
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

                  <span>Dashboard</span>
                </div>
              </a>
            </li>
            <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <a
                onClick={() => navigate('/admin/accounts')}
                className="bg-transparent border-none rounded-none hover:scale-110 transition duration-300 ease-in-out "
              >
                <div className="flex flex-col gap-2 items-center">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>

                  <span className="">Accounts</span>
                </div>
              </a>
            </li>
            <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <a
                onClick={() => navigate('/admin/contacts')}
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
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                      />
                    </svg>
                  </div>

                  <span className="">Contacts</span>
                </div>
              </a>
            </li>
            <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <a
                onClick={() => navigate('/admin/reporting')}
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

                  <span>Reporting</span>
                </div>
              </a>
            </li>
            <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <button
                onClick={handleClick}
                className="bg-transparent border-none rounded-none transition duration-300 ease-in-out "
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
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>

                  <span>Task</span>
                </div>
              </button>
            </li>
          </ul>
          <div
            className={
              !showTaskMenu
                ? 'hidden'
                : ' cursor-pointer text-zinc-200 font-semibold  text-center text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'
            }
          >
            <div className=" flex flex-col items-center text-zinc-200 bg-zinc-800 rounded-xl mx-2 mb-2">
              <div className="py-1 font-bold">
                <a
                  onClick={() => navigate('/admin/tasks/create')}
                  className="text-zinc-200 block px-4 py-2 text-sm border-b border-zinc-700 hover:text-indigo-600"
                >
                  Create
                </a>
                <a
                  onClick={() => navigate('/admin/tasks/edit')}
                  className="text-zinc-200 block px-4 py-2 text-sm hover:text-indigo-600 bg-transparent border-transparent "
                >
                  Edit
                </a>
                <a
                  onClick={() => navigate('/admin/tasks/accountInformation')}
                  className="text-zinc-200 block px-4 py-2 text-sm border-t border-zinc-700 hover:text-indigo-600 "
                >
                  Account Information
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            showMobileMenu
              ? 'w-full h-full absolute z-40  transform  translate-x-0 '
              : '   w-full h-full absolute z-40  transform -translate-x-full'
          }
          id="mobile-nav"
        >
          <div
            className="bg-gray-800 opacity-50 absolute h-full w-full md:hidden"
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
              setShowTaskMenu(false);
            }}
          />
          <div className="absolute z-40 sm:relative w-[14rem] md:w-96 shadow bg-zinc-900 md:hidden transition duration-150 ease-in-out h-full">
            <div className="flex flex-col justify-between h-full w-full overflow-auto">
              <div>
                <div className="flex items-center justify-between px-6">
                  <div className="h-12  w-full flex flex-col ml-6 items-center ">
                    <button className="flex flex-col  bg-transparent border-transparent justify-center items-center">
                      <img src={logo} className="mt-[5rem] w-[6rem] " alt="/" />
                    </button>
                  </div>
                  <button
                    id="closeSideBar"
                    className="flex items-center justify-center h-10 w-10"
                    onClick={() => {
                      setShowMobileMenu(!showMobileMenu);
                      setShowTaskMenu(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-x"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </button>
                </div>
                <ul className=" space-y-7 flex flex-col items-center mb-7">
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

                        <span>Dashboard</span>
                      </div>
                    </a>
                  </li>
                  <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                    <a
                      onClick={() => navigate('/admin/accounts')}
                      className="bg-transparent border-none rounded-none hover:scale-110 transition duration-300 ease-in-out "
                    >
                      <div className="flex flex-col gap-2 items-center">
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
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>

                        <span>Accounts</span>
                      </div>
                    </a>
                  </li>

                  <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                    <a
                      onClick={() => navigate('/admin/contacts')}
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
                              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                            />
                          </svg>
                        </div>

                        <span>Contacts</span>
                      </div>
                    </a>
                  </li>

                  <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                    <a
                      onClick={() => navigate('/admin/reporting')}
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

                        <span>Reporting</span>
                      </div>
                    </a>
                  </li>
                  <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                    <button
                      onClick={handleClick}
                      className="bg-transparent border-none rounded-none  transition duration-300 ease-in-out "
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
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            />
                          </svg>
                        </div>

                        <span>Task</span>
                      </div>
                    </button>
                  </li>
                </ul>
                <div
                  className={
                    !showTaskMenu
                      ? ' hidden '
                      : ' cursor-pointer text-zinc-200 font-semibold text-center text-md leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'
                  }
                >
                  <div className="flex flex-col items-center text-zinc-200 bg-zinc-800 rounded-xl mx-3 mb-2">
                    <div className="py-1 font-bold">
                      <a
                        onClick={() => navigate('/admin/tasks/create')}
                        className="text-zinc-200 block px-4 py-2 text-sm border-b border-zinc-700 hover:text-indigo-600"
                      >
                        Create
                      </a>
                      <a
                        onClick={() => navigate('/admin/tasks/edit')}
                        className="text-zinc-200 block px-4 py-2 text-sm hover:text-indigo-600 bg-transparent border-transparent "
                      >
                        Edit
                      </a>
                      <a
                        onClick={() =>
                          navigate('/admin/tasks/accountInformation')
                        }
                        className="text-zinc-200 block px-4 py-2 text-sm border-t border-zinc-700 hover:text-indigo-600 "
                      >
                        Account Information
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom corner nav elements */}
              <div className="w-full">
                <div className="border-t bg-zinc-800/30 border-gray-500">
                  <div className="w-full flex flex-row items-center justify-between  ">
                    <div className="flex flex-col items-center ml-3">
                      <div className="flex flex-row mb-3 mt-2">
                        <img
                          alt="Profile picture"
                          src={picture}
                          className="w-8 h-8 rounded-md"
                        />
                        <p className="text-sm text-zinc-200 leading-4 ml-2 font-semibold ">
                          {name}
                        </p>
                      </div>
                      <div className="flex w-full text-gray-200 mt-2 hover:text-indigo-700 cursor-pointer items-center">
                        <AuthNav />
                      </div>
                    </div>
                    <ul className="flex flex-col items-center gap-9 bg-zinc-800/50 px-6 py-6">
                      <li className="flex flex-col w-full text-gray-200 hover:text-indigo-700 cursor-pointer items-center">
                        <a onClick={() => navigate('/admin')} className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </a>
                      </li>
                      <li className="flex flex-col items-center w-full text-gray-200 hover:text-indigo-700 cursor-pointer">
                        <a
                          onClick={() => navigate('/ticketing')}
                          className="flex flex-col"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className=" h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation starts */}
        <div className="w-full">
          <header className="h-16 flex items-center md:items-stretch justify-end md:justify-between bg-white shadow relative z-10">
            <div className="hidden md:flex md:justify-between md:items-center w-full pr-2">
              <h2 className="flex items-center text-lg text-zinc-500 font-bold ml-12 mr-6">
                Welcome to WonderTix CRM
              </h2>
              <div className='relative'>
                <button
                  className="flex items-center text-left cursor-pointer px-4"
                  onClick={() => setProfile(!profile)}
                >
                  <img
                    alt="Profile picture"
                    src={picture}
                    className="rounded-3xl w-12 h-12"
                  />
                  <p className="text-gray-800 text-sm mx-3">{name}</p>
                  <svg
                    aria-haspopup="true"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-down text-gray-600"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {profile && <AdminNavDropdown marginClass='mt-3' />}
              </div>
            </div>
            <button
              className="text-gray-600 mr-8 visible md:hidden relative"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {!showMobileMenu && (
                <svg
                  aria-label="Main Menu"
                  aria-haspopup="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-menu"
                  width={30}
                  height={30}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={4} y1={8} x2={20} y2={8} />
                  <line x1={4} y1={16} x2={20} y2={16} />
                </svg>
              )}
            </button>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
