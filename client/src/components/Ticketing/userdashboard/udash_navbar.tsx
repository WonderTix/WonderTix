/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, {useState} from 'react';
import logoi from '../../../assets/pp_logo_white.png';
import {useNavigate} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import AuthNav from '../../Authentication/auth-nav';

const Udash_nav = () => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [show2, setShow2] = useState(false);

  const {user} = useAuth0();
  // const {name, picture, email} = user;
  const {picture} = user;
  const {name} = user;
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-full bg-gray-200 ">
        <div className="flex flex-no-wrap">
          {/* Sidebar starts */}
          <div className="absolute md:relative w-[14rem] h-screen  bg-zinc-900 hidden md:block z-10">
            <div className="h-12 w-full flex flex-col items-center " >
              <button onClick={() => navigate('/')} className=" bg-transparent border-transparent justify-center items-center">
                <img src={logoi} className="mt-[5rem] w-[6rem]" alt="/"/>
              </button>

            </div>
            <ul className=" space-y-7 mt-30 ml-[rem] flex flex-col items-center  ">
              <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                <a href='\ticketing' className="bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out ">
                  <div className="flex flex-col gap-2 items-center">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>

                    <span className="">Dashboard</span>

                  </div>
                </a>

              </li>
              <li className="cursor-pointer text-zinc-200 font-semibold  text-md leading-3 tracking-normal mt-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                <a className="bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out ">
                  <div className="flex flex-col gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="">Users</span>
                  </div>
                </a>
              </li>

              <li className="cursor-pointer text-zinc-200 font-semibold  text-md leading-3 tracking-normal mt-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                <a className="bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out ">
                  <div className="flex flex-col gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="">Calender</span>
                  </div>
                </a>
              </li>


              <li className=" cursor-pointer text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                <a className="bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out ">
                  <div className="flex flex-col gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                    </svg>
                    <span className="">Inbox</span>
                  </div>
                </a>
              </li>


            </ul>
          </div>
          {/* Mobile responsive sidebar*/}
          <div className={show ? 'w-full h-full absolute z-40  transform  translate-x-0 ' : '   w-full h-full absolute z-40  transform -translate-x-full'} id="mobile-nav">
            <div className="bg-gray-800 opacity-50 absolute h-full w-full md:hidden" onClick={() => setShow(!show)} />
            <div className="absolute z-40 sm:relative w-[14rem] md:w-96 shadow pb-4 bg-zinc-900 md:hidden transition duration-150 ease-in-out h-full">
              <div className="flex flex-col justify-between h-full w-full">
                <div>
                  <div className="flex items-center justify-between px-6">
                    <div className="h-12  w-full flex flex-col ml-6 items-center ">
                      <button onClick={() => navigate(-1)} className="flex flex-col  bg-transparent border-transparent justify-center items-center">
                        <img src={logoi} className="mt-[5rem] w-[6rem] " alt="/"/>
                      </button>
                    </div>
                    <div id="closeSideBar" className="flex items-center justify-center h-10 w-10" onClick={() => setShow(!show)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </div>
                  </div>
                  <ul className=" space-y-7 mt-30  flex flex-col items-center  ">
                    <li className=" cursor-pointer mt-[12rem] text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                      <a href='\ticketing' className="bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out ">
                        <div className="flex flex-col gap-2 items-center">
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                          </div>

                          <span className="">Dashboard</span>

                        </div>
                      </a>

                    </li>
                    <li className="cursor-pointer text-zinc-200 font-semibold  text-md leading-3 tracking-normal mt-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                      <button className="bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out ">
                        <div className="flex flex-col gap-2 items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span className="">Users</span>
                        </div>
                      </button>
                    </li>

                    <li className="cursor-pointer text-zinc-200 font-semibold  text-md leading-3 tracking-normal mt-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                      <button className="bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out ">
                        <div className="flex flex-col gap-2 items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="">Calender</span>
                        </div>
                      </button>
                    </li>


                    <li className=" cursor-pointer text-zinc-200 font-semibold  text-md leading-3 tracking-normal  py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                      <button className="bg-transparent border-none   rounded-none hover:scale-110 transition duration-300 ease-in-out ">
                        <div className="flex flex-col gap-2 items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                          </svg>
                          <span className="">Inbox</span>
                        </div>
                      </button>
                    </li>


                  </ul>
                </div>
                <div className="w-full">
                  <div className="flex justify-center mb-4 w-full px-6">
                    <div className="relative w-full">
                      <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth={1} stroke="#A0AEC0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <circle cx={10} cy={10} r={7} />
                          <line x1={21} y1={21} x2={15} y2={15} />
                        </svg>
                      </div>
                      <input className="bg-gray-200 focus:outline-none rounded w-full text-sm text-gray-500  pl-10 py-2" type="text" placeholder="Search" />
                    </div>
                  </div>
                  <div className="border-t border-gray-300">
                    <div className="w-full flex items-center justify-between px-6 pt-1">
                      <div className="flex items-center mt-2">
                        <img alt="profile-pic" src='https://cdn-icons-png.flaticon.com/512/149/149071.png' className="w-8 h-8 rounded-md" />
                        <p className="md:text-xl text-zinc-200 text-base leading-4 ml-2">user name</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile responsive sidebar*/}
          {/* Sidebar ends */}
          <div className="w-full">
            {/* Navigation starts */}
            <nav className="h-16 flex items-center md:items-stretch justify-end md:justify-between bg-white shadow relative z-10">
              <div className="hidden md:flex w-full pr-6">
                <div className="w-1/2 h-full hidden md:flex items-center pr-24">
                  <div className="relative w-full">
                    <div className=" focus:outline-none focus:border-indigo-700 w-full text-lg text-zinc-500 pl-12 py-2 font-bold ">Welcome to Ticketing Manager</div>
                  </div>
                </div>
                <div className="w-1/2 hidden md:flex">
                  <div className="w-full flex items-center pl-8 justify-end">
                    <div className="flex items-center relative cursor-pointer" onClick={() => setProfile(!profile)}>
                      <div className="rounded-full">
                        {profile ? (
                        <ul className="p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-16 ">
                          <li className="flex w-full p-4 justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <a href='\admin'className="text-sm ml-2">Admin</a>
                            </div>
                          </li>
                          <li className="flex p-4  w-full text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                              </svg>
                              <a href='\ticketing'className="text-sm ml-2">Manage Ticketing</a>
                            </div>
                          </li>
                          <li className="flex w-full p-4 justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              <a className="border-none bg-transparent text-sm ml-2"><AuthNav /></a>
                            </div>
                          </li>
                        </ul>
                    ) : (
                        ''
                    )}
                        <div className="relative">
                          <div className=''>
                            <img src={picture} className='rounded-3xl w-12 h-12  ' />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm mx-3">{name}</p>
                      <div className="cursor-pointer text-gray-600">
                        <svg aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-gray-600 mr-8 visible md:hidden relative" onClick={() => setShow2(!show2)}>
                {show ? (
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
    </>
  );
};

export default Udash_nav;
