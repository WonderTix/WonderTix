/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {MenuIcon, XIcon} from '@heroicons/react/outline';
import {useNavigate} from 'react-router-dom';
import bgImg from '../../../assets/pp_logo_black.png';
import {Link} from 'react-scroll';
import {useAuth0} from '@auth0/auth0-react';
import AuthNav from '../../Authentication/auth-nav';
import LoginButton from '../../Authentication/login-button';
import LogoutButton from '../../Authentication/logout-button';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const [na2, setNav2] = useState(false);
  const handleClick2 = () => setNav2(!na2);

  const [show, setShow] = useState(false);
  const handleClick3 = () => setShow(!show);

  const [profile, setProfile] = useState(false);
  const {user} = useAuth0();
  const {picture} = user;
  const {name} = user;
  const navigate = useNavigate();
  return (
    <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
      <div className='px-2 flex justify-between items-center w-full h-full'>
        <div className='flex items-center'>
          <div>
            <img className='w-12 h-full
             object-cover mx-4' src={bgImg} alt="/" />
          </div>

          <ul className='hidden md:flex '>
            <li>
              <button className='border-none bg-transparent
               text-black px-4 py-2'>
                <Link to='home' smooth={true} duration={600}>
                    Events
                </Link>

              </button>

            </li>
            <li>
              <button className='border-none bg-transparent
               text-black px-4 py-2'>
                <Link to='seasontickets' smooth={true} duration={600}>
                    Seasonal Tickets
                </Link>
              </button>
            </li>
            <li className='px-4 py-2'>Donate</li>
            <li>
              <button className='border-none bg-indigo-700
               hover:bg-zinc-500 px-4 py-2 hover:text-zinc-100 rounded-xl text-zinc-200 '>
                  Cart
              </button>
            </li>
          </ul>
        </div>
        <div className='md:hidden ' onClick={handleClick}>
          {!nav ? <MenuIcon className='w-5'/> : <XIcon className = 'w-5' />}
        </div>
        <div className="w-1/2 hidden md:flex">
          <div className="w-full flex items-center pl-8 justify-end">
            <div className="flex items-center relative cursor-pointer" onClick={() => setProfile(!profile)}>
              <div className="rounded-full">
                {profile ? (
                        <ul className="p-2 w-full border-r bg-zinc-100 absolute rounded left-0 shadow mt-12 sm:mt-[4.3rem] ">
                          <li className="flex p-4 w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <a href='\admin'className="text-sm ml-2">Admin</a>
                            </div>
                          </li>
                          <li className="flex p-4 w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
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


      <ul className={!nav ? 'hidden' :'absolute bg-zinc-200 w-full px-8 items-center '}>

        <li className='border-b-2 p-3 border-zinc-300 w-full flex flex-col
         items-center hover:scale-105 duration-300'>
          <button onClick={() => navigate('./')} className='border-none
           bg-transparent text-black font-semibold  '>
                Events
          </button>
        </li>
        <li className='border-b-2 p-3 border-zinc-300 w-full flex flex-col
         items-center hover:scale-105 duration-300 '>
          <button className='border-none bg-transparent text-black
           font-semibold'>
            <Link to='seasontickets' smooth={true} duration={500}>
                    Seasonal Tickets
            </Link>
          </button></li>
        <li className='border-b-2 p-3 border-zinc-300 w-full flex flex-col
         items-center font-semibold hover:scale-105 duration-300'>Donate</li>
        <li className='border-b-2 border-zinc-300 w-full flex flex-col
         items-center hover:scale-105 duration-300 '>
          <button onClick={() => navigate('./cart')} className='border-none
           bg-transparent text-black font-semibold p-3'>
                Cart
          </button>
        </li>
        <ul className="flex flex-col items-center">
          <li className="flex  p-3 border-b-2 border-zinc-300 w-full text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <a href='\admin'className="text-sm ml-2">Admin</a>
            </div>
          </li>
          <li className="flex p-3 border-b-2 border-zinc-300 w-full text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <a href='\ticketing'className="text-sm ml-2">Manage Ticketing</a>
            </div>
          </li>
          <li className="flex p-3 border-b-2 border-zinc-300 w-full text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <a className="border-none bg-transparent text-sm ml-2"><AuthNav /></a>
            </div>
          </li>
        </ul>

      </ul>


    </div>
  );
};

export default Navbar;
