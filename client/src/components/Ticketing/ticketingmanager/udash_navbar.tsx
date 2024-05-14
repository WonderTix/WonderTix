/* eslint-disable operator-linebreak */
import React, {useState, useRef, useEffect} from 'react';
import logoi from '../../../assets/WTix logo dark.png';
import {useNavigate} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import AuthNav from '../../Authentication/auth-nav';
import AdminNavDropdown from './AdminNavDropdown';

/**
 * Has Dashboard, Door List, Manage Events, and Showings to navigate to
 *
 * @module
 * @param {boolean} show - We use states true or false, default is false
 * @param {boolean} profile - True or false, default is false
 * @param {auth0} user - managed by auth0
 * @param {auth0} picture - managed by auth0
 * @param {auth0} name - managed by auth0
 * @param {object} navigate - makes use of the navigate function
 * @returns {ReactElement} Udash_nav
 */
const Udash_nav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const dropdownRef = useRef(null);

  const {user} = useAuth0();
  const {picture} = user;
  const {name} = user;
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='w-full h-full bg-gray-100'>
      <div className='flex flex-no-wrap'>
        {/* Sidebar starts */}
        <div className='absolute md:relative w-[14rem] h-screen  bg-zinc-900 hidden md:block z-10 overflow-auto'>
          <div className='h-12 w-full flex flex-col items-center '>
            <button
              onClick={() => navigate('/')}
              className=' bg-transparent border-transparent justify-center items-center'
            >
              <img src={logoi} className='mt-[5rem] w-[6rem]' alt='/' />
            </button>
          </div>
          <ul className=' space-y-7 mt-30 ml-[rem] flex flex-col items-center mb-7 '>
            <li className=' cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
              <a
                onClick={() => navigate('/ticketing')}
                className='bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out '
              >
                <div className='flex flex-col gap-2 items-center'>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-10 w-10'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                      />
                    </svg>
                  </div>

                  <span>Dashboard</span>
                </div>
              </a>
            </li>
            <li className='cursor-pointer text-zinc-200 font-semibold  text-md leading-3 tracking-normal mt-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
              <a
                onClick={() => navigate('/ticketing/doorlist')}
                className='bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out '
              >
                <div className='flex flex-col gap-2 items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-10 w-10  '
                    viewBox='0 0 20 20'
                    fill='none'
                    stroke='currentColor'
                  >
                    <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
                    <path
                      fillRule='evenodd'
                      d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span>Door List</span>
                </div>
              </a>
            </li>

            <li className=' cursor-pointer text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
              <a
                onClick={() => navigate('/ticketing/events')}
                className='bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out '
              >
                <div className='flex flex-col gap-2 items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-10 w-10'
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
                  <span>Events</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        {/* Mobile responsive sidebar*/}
        <div
          className={
            showMobileMenu
              ? 'w-full h-full absolute z-40  transform  translate-x-0 '
              : 'w-full h-full absolute z-40 transform -translate-x-full'
          }
          id='mobile-nav'
        >
          <div
            className='bg-gray-800 opacity-50 absolute h-full w-full md:hidden'
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          />
          <div className='absolute z-40 sm:relative w-[14rem] md:w-96 shadow  bg-zinc-900 md:hidden transition duration-150 ease-in-out h-full'>
            <div className='flex flex-col justify-between h-full w-full overflow-auto'>
              <div>
                <div className='flex items-center justify-between px-6'>
                  <div className='h-12  w-full flex flex-col ml-6 items-center '>
                    <button
                      onClick={() => navigate('/')}
                      className='flex flex-col  bg-transparent border-transparent justify-center items-center'
                    >
                      <img
                        src={logoi}
                        className='mt-[5rem] w-[6rem] '
                        alt='/'
                      />
                    </button>
                  </div>
                  <button
                    id='closeSideBar'
                    className='flex items-center justify-center h-10 w-10 text-gray-200 hover:text-indigo-700'
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-x'
                      width={20}
                      height={20}
                      viewBox='0 0 24 24'
                      strokeWidth='2'
                      stroke='currentColor'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </button>
                </div>
                <ul className=' space-y-7 mt-30 flex flex-col items-center mb-4 '>
                  <li className=' cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
                    <a
                      onClick={() => navigate('/ticketing')}
                      className='bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out '
                    >
                      <div className='flex flex-col gap-2 items-center'>
                        <div>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-10 w-10'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                            />
                          </svg>
                        </div>

                        <span>Dashboard</span>
                      </div>
                    </a>
                  </li>
                  <li className='cursor-pointer text-zinc-200 font-semibold  text-md leading-3 tracking-normal mt-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
                    <a
                      onClick={() => navigate('/ticketing/doorlist')}
                      className='bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out '
                    >
                      <div className='flex flex-col gap-2 items-center'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-10 w-10  '
                          viewBox='0 0 20 20'
                          fill='none'
                          stroke='currentColor'
                        >
                          <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
                          <path
                            fillRule='evenodd'
                            d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>Door List</span>
                      </div>
                    </a>
                  </li>

                  <li className=' cursor-pointer text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
                    <a
                      onClick={() => navigate('/ticketing/events')}
                      className='bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out '
                    >
                      <div className='flex flex-col gap-2 items-center mb-4'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-10 w-10'
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
                        <span>Events</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className='w-full'>
                <div className='border-t bg-zinc-800/30 border-gray-500'>
                  <div className='w-full flex flex-row items-center justify-between  '>
                    <div className='flex flex-col items-center ml-3'>
                      <div className='flex flex-row mb-3 mt-2'>
                        <img
                          alt='Profile picture'
                          src={picture}
                          className='w-8 h-8 rounded-md'
                        />
                        <p className='text-sm text-zinc-200 leading-4 ml-2 font-semibold '>
                          {name}
                        </p>
                      </div>
                      <div className='flex w-full text-gray-200 mt-2 hover:text-indigo-700 cursor-pointer items-center'>
                        <AuthNav />
                      </div>
                    </div>
                    <ul className='flex flex-col items-center gap-9 bg-zinc-800/50 px-6 py-6'>
                      <li className='flex flex-col w-full text-gray-200 hover:text-indigo-700 cursor-pointer items-center'>
                        <a onClick={() => navigate('/admin')} className=''>
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
                        </a>
                      </li>
                      <li className='flex flex-col items-center w-full text-gray-200 hover:text-indigo-700 cursor-pointer'>
                        <a
                          onClick={() => navigate('/ticketing')}
                          className='flex flex-col'
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
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile responsive sidebar ends*/}

        {/* Desktop top navigation starts */}
        <div className='w-full'>
          <header className='h-16 flex items-center md:items-stretch justify-end md:justify-between bg-white shadow relative z-10'>
            <div className='hidden md:flex md:justify-between md:items-center w-full pr-2'>
              <h2 className='flex items-center text-lg text-zinc-500 font-bold ml-12 mr-6'>
                Welcome to Ticketing Manager
              </h2>
              <div className='relative' ref={dropdownRef}>
                <button
                  className='flex items-center text-left cursor-pointer px-4'
                  onClick={() => setProfile(!profile)}
                >
                  <img
                    alt='Profile picture'
                    src={picture}
                    className='rounded-3xl w-12 h-12'
                  />
                  <p className='text-gray-800 text-sm mx-3'>{name}</p>
                  <svg
                    aria-haspopup='true'
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-chevron-down cursor-pointer text-gray-600'
                    width={20}
                    height={20}
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <polyline points='6 9 12 15 18 9' />
                  </svg>
                </button>
                {profile && <AdminNavDropdown marginClass='mt-3' />}
              </div>
            </div>
            <button
              className='text-gray-600 mr-8 visible md:hidden relative'
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {!showMobileMenu && (
                <svg
                  aria-label='Main Menu'
                  aria-haspopup='true'
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-menu cursor-pointer'
                  width={30}
                  height={30}
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
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

export default Udash_nav;
