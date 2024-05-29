/* eslint-disable operator-linebreak */
import React, {useState, useRef, useEffect} from 'react';
import logo from '../Logo/2011_Logo_white.png';
import '../Logo/logo.css';
import {useAuth0} from '@auth0/auth0-react';
import AuthNav from './Authentication/auth-nav';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import AdminNavDropdown from './Ticketing/ticketingmanager/AdminNavDropdown';
/**
 * Base Navigation bar
 *
 * @returns {React.ReactElement}
 */
const Navigation = ({buttons, navTitle}): React.ReactElement => {
  const [profile, setProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const {user} = useAuth0();
  const {picture, name} = user;
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const useOutsideClick = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, callback]);
  };

  useOutsideClick(dropdownRef, () => setProfile(false));

  const NavButton = ({name, url, symbol, strokeWidth, viewBox = '0 0 24 24'}) => {
    return (
      <li className="cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
        <a
          onClick={() => navigate(url)}
          className="bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out"
        >
          <div className="flex flex-col gap-2 items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox={viewBox}
                stroke="currentColor"
                strokeWidth={strokeWidth}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={symbol}
                />
              </svg>
            </div>

            <span>{name}</span>
          </div>
        </a>
      </li>
    );
  };

  NavButton.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    symbol: PropTypes.string,
    strokeWidth: PropTypes.number,
    viewBox: PropTypes.string,
  };

  const NavSymbols = ({navButtons}) => {
    return (
      <ul className="space-y-7 mt-30 ml-[rem] flex flex-col items-center mb-7">
        {
          navButtons.map((values, index) => (
            <NavButton key = {index}
                name={values.name}
                url={values.url}
                symbol={values.symbol}
                strokeWidth={values.strokeWidth}
                viewBox={values.viewBox}
              />
          ))
        },
      </ul>
    );
  };

  NavSymbols.propTypes = {
    navButtons: PropTypes.array,
  };


  return (
    <div className="w-full h-full bg-gray-100">
      <div className="flex flex-no-wrap">
        <div className="absolute md:relative w-[14rem] h-screen  bg-zinc-900 hidden md:block z-10 overflow-auto">
          <div className="h-12 w-full flex flex-col items-center">
            <button
              onClick={() => navigate('/')}
              className="bg-transparent border-transparent justify-center items-center"
            >
              <img src={logo} className="mt-[5rem] w-[6rem]" alt="/" />
            </button>
          </div>
          <NavSymbols navButtons={buttons}/>
        </div>


        <div
          className={
            showMobileMenu
              ? 'w-full h-full absolute z-40  transform  translate-x-0 '
              : 'w-full h-full absolute z-40  transform -translate-x-full'
          }
          id="mobile-nav"
        >
          <div
            className="bg-gray-800 opacity-50 absolute h-full w-full md:hidden"
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
            }}
          />
          <div className="absolute z-40 sm:relative w-[14rem] md:w-96 shadow bg-zinc-900 md:hidden transition duration-150 ease-in-out h-full">
            <div className="flex flex-col justify-between h-full w-full overflow-auto">
              <div>
                <div className="flex items-center justify-between px-6">
                  <div className="h-12  w-full flex flex-col ml-6 items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-transparent border-transparent justify-center items-center"
                      >
                      <img src={logo} className="mt-[5rem] w-[6rem]" alt="/" />
                    </button>
                  </div>
                  <button
                    id="closeSideBar"
                    className="flex items-center justify-center h-10 w-10"
                    onClick={() => {
                      setShowMobileMenu(!showMobileMenu);
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
                  <NavSymbols navButtons={buttons}/>
              </div>

              {/* Bottom corner nav elements */}
              <div className="w-full">
                <div className="border-t bg-zinc-800/30 border-gray-500">
                  <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-col items-center ml-3">
                      <div className="flex flex-row mb-3 mt-2">
                        <img
                          alt="Profile picture"
                          src={picture}
                          className="w-8 h-8 rounded-md"
                        />
                        <p className="text-sm text-zinc-200 leading-4 ml-2 font-semibold">
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
                            className="h-6 w-6"
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
                {navTitle}
              </h2>
              <div className='relative' ref={dropdownRef}>
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

Navigation.propTypes = {
  buttons: PropTypes.array,
  navTitle: PropTypes.string,
};

export default Navigation;
