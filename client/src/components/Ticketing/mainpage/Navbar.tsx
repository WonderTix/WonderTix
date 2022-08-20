/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {MenuIcon, XIcon} from '@heroicons/react/outline';
import {useNavigate} from 'react-router-dom';
import bgImg from '../../../assets/pp_logo_black.png';
import {Link} from 'react-scroll';
import {useAuth0} from '@auth0/auth0-react';
import AuthNav from '../../Authentication/auth-nav';
interface NavbarProps {
  bMode?: boolean
}

const Navbar = ({bMode}: NavbarProps) => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState(false);
  const {user, isAuthenticated} = useAuth0();
  const {getIdTokenClaims} = useAuth0();
  const [admin, isAdmin] = useState(false);
  const navigate = useNavigate();

  let picture: any;
  let name: any;
  if (isAuthenticated) {
    picture = user.picture;
    name = user.name;
  }

  const showMenu = async () => {
    if (isAuthenticated) {
      setLogin(true);
    }
    const token = await getIdTokenClaims({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });

    if (token.undefineduser_authorization.permissions[0] == 'admin') {
      isAdmin(true);
    }
  };
  useEffect(() => {
    showMenu();
  }, []);

  return (
    <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
      <div className='px-2 flex justify-between items-center w-full h-full'>
        <div className='flex items-center sm:w-full '>
          <div className='sm:w-full md:w-auto'>
            <div className='sm:flex sm:flex-col sm:w-full sm:items-center'>
              <a href='https://portlandplayhouse.org/' >
                <img className='w-12 h-full
             object-cover md:mx-4 sm:ml-4' src={bgImg} alt="/" />
              </a>
            </div>

          </div>


          <ul className='hidden md:flex md:flex-row '>
            <li>
              <button className=' hover:text-indigo-600
               text-zinc-600 font-semibold px-4 py-2 transition duration-300 ease-in-out'>
                {
                   !bMode ? ( <Link to='home' smooth={true} duration={600}>
                   Events
                   </Link>):(<button onClick={() => navigate('/')}>Events</button>)
                }

              </button>

            </li>
            <li>
              <button className={!bMode ? 'hover:text-indigo-600 text-zinc-600 font-semibold px-4 py-2 transition duration-300 ease-in-out':
            ''}>
                {
                   !bMode ? ( <Link to='seasontickets' smooth={true} duration={600}>
                   Seasonal Tickets
                   </Link>):(<div></div>)
                }
              </button>
            </li>
            <li className=''>
              <button onClick={() => navigate('/donate')} className='hover:text-indigo-600
               text-zinc-600 font-semibold px-4 py-2 transition duration-300 ease-in-out'>
                Donate
              </button>
            </li>
          </ul>
        </div>
        <div className='md:hidden relative' onClick={handleClick}>
          {!nav ? <MenuIcon className='w-5'/> : <XIcon className = 'w-5' />}
        </div>
        <div className="w-1/2 hidden md:flex mr-4 gap-4">
          <div className="w-full flex items-center pl-8 justify-end">
            {login ? ( <div className="flex items-center relative cursor-pointer px-4" onClick={() => setProfile(!profile)}>
              <div className="rounded-full">
                {profile ? (
                  <div>
                    {admin ? (<ul className="p-2 w-full border-r bg-zinc-100 absolute rounded left-0 shadow mt-12 sm:mt-[4.3rem] ">
                      <li className="flex p-4 w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <button onClick={() => navigate('/admin')} className="text-sm ml-2">Admin</button>
                        </div>
                      </li>
                      <li className="flex p-4 w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                          <button onClick={() => navigate('/ticketing')} className="text-sm ml-2">Manage Ticketing</button>
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
                    </ul>): (
                    <ul className="p-2 w-full border-r bg-zinc-100 absolute rounded left-0 shadow mt-12 sm:mt-[4.3rem] ">
                      <li className="flex w-full p-4 justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <a className="border-none bg-transparent text-sm ml-2"><AuthNav /></a>
                        </div>
                      </li>
                    </ul>
                    )}
                  </div>
                    ) : (
                        ''
                    )}
                <div className="relative">
                  <div className=''>
                    <img src={picture} className='rounded-3xl w-10 h-10  ' />
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
            </div>) : ( <button className="flex px-5 flex-row gap-1  items-center text-zinc-500 rounded-xl hover:text-indigo-500 transition duration-300 ease-in-out ">
              <button className="font-semibold"><AuthNav /></button>
            </button>)}
          </div>
          <button onClick={() => navigate('/cart')} className=' flex flex-row gap-1 items-center bg-indigo-600
               hover:bg-transparent border border-indigo-600  font-semibold px-3 py-2 transition duration-300 ease-in-out  hover:text-indigo-600 rounded-xl text-zinc-200 '>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
                  Cart
          </button>
        </div>
        <div className='md:hidden   sm:z-10 sm:flex sm:absolute sm:flex-col sm:w-auto sm:items-start'>
          {login ? ( <div className="flex  items-center relative cursor-pointer px-4" onClick={() => setProfile(!profile)}>
            <div className="rounded-full">
              {profile ? (
                  <div>
                    {admin ? (<ul className="p-2 w-auto border-r bg-zinc-100 absolute rounded left-0 shadow mt-12 sm:mt-[4.3rem] ">
                      <li className="flex p-4 w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <button onClick={() => navigate('/admin')} className="text-sm ml-2">Admin</button>
                        </div>
                      </li>
                      <li className="flex p-4 w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                          <button onClick={() => navigate('/ticketing')} className="text-sm ml-2">Manage Ticketing</button>
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
                    </ul>): (
                    <ul className="p-2 w-auto border-r bg-zinc-100 absolute rounded left-0 shadow mt-12 sm:mt-[4.3rem] ">
                      <li className="flex w-full p-4 justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <a className="border-none bg-transparent text-sm ml-2"><AuthNav /></a>
                        </div>
                      </li>
                    </ul>
                    )}
                  </div>
                    ) : (
                        ''
                    )}
              <div className="relative">
                <div className=''>
                  <img src={picture} className=' rounded-3xl w-10 h-10  ' />
                </div>
              </div>
            </div>
          </div>) : ( <button className="flex px-5 flex-row gap-1  items-center text-zinc-500 rounded-xl hover:text-indigo-500 transition duration-300 ease-in-out ">
            <button className="font-semibold"><AuthNav /></button>
          </button>)}
        </div>
      </div>

      <ul className={!nav ? 'hidden' :'absolute  bg-zinc-200 w-full px-8 items-center '}>
        <li className='border-b-2 p-3 border-zinc-300 w-full flex flex-col
         items-center hover:scale-105 duration-300'>
          <button onClick={() => navigate('/')} className='border-none
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
         items-center font-semibold hover:scale-105 duration-300'>
          <button onClick={() => navigate('/donate')} className='border-none bg-transparent text-black
           font-semibold'>
             Donate
          </button></li>
        <li className='border-b-2 border-zinc-300 w-full flex flex-col
         items-center hover:scale-105 duration-300 '>
          <button onClick={() => navigate('./cart')} className='border-none
           bg-transparent text-black font-semibold p-3'>
                Cart
          </button>
        </li>
      </ul>


    </div>
  );
};

export default Navbar;
