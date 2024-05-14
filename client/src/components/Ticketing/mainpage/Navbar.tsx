import React, {useState, useEffect, ReactElement, useRef} from 'react';
import {MenuIcon, XIcon} from '@heroicons/react/outline';
import {useNavigate} from 'react-router-dom';
import bgImg from '../../../assets/WTix logo dark.png';
import {Link} from 'react-scroll';
import {useAuth0} from '@auth0/auth0-react';
import AuthNav from '../../Authentication/auth-nav';
import AdminNavDropdown from '../ticketingmanager/AdminNavDropdown';
import {SubscriptionNavDropdown} from './SubscriptionPurchasing/SubscriptionNavDropdown';
interface NavbarProps {
  bMode?: boolean;
}

/**
 * Used to set up the navbar with auth0
 *
 * @param {NavbarProps} bMode
 * @returns {ReactElement}
 */
const Navbar = ({bMode}: NavbarProps): ReactElement => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState(false);
  const {user, isAuthenticated} = useAuth0();
  const {getIdTokenClaims} = useAuth0();
  const [admin, isAdmin] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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
      audience: process.env.REACT_APP_ROOT_URL,
      scope: 'admin',
    });

    if (token?.undefineduser_authorization.permissions[0] == 'admin') {
      isAdmin(true);
    }
  };
  useEffect(() => {
    showMenu();
  }, []);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setProfile(false); // Close the dropdown
    }
  };

  return (
    <div className='w-full h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
      <div className='px-6 flex justify-between items-center w-full h-full'>
        <div className='w-full md:w-auto flex items-center justify-center md:justify-left gap-4'>
          {/* <a
            href='https://portlandplayhouse.org/'
            aria-label='Portland Playhouse site'
            className='ml-6 md:m-0'
          > */}
          <img
            className='w-12 h-full object-cover'
            src={bgImg}
            aria-hidden='true'
            alt=''
          />
          {/* </a> */}
          <ul className='hidden md:flex'>
            <li className='hover:text-indigo-600 text-zinc-600 font-semibold transition duration-300 ease-in-out'>
              {!bMode ? (
                <Link
                  to='home'
                  smooth={true}
                  duration={600}
                  className='cursor-pointer px-4 py-2 inline-block'
                  tabIndex={0}
                >
                  Events
                </Link>
              ) : (
                <button onClick={() => navigate('/')} className="px-4 py-2">Events</button>
              )}
            </li>
            <li className='hover:text-indigo-600 text-zinc-600 font-semibold transition duration-300 ease-in-out'>
              <SubscriptionNavDropdown />
            </li>
            {/* FIXME: These were removed per #563 in prep for the initial site launch*/}
            {/* <li className='hover:text-indigo-600 text-zinc-600 font-semibold transition duration-300 ease-in-out'>*/}
            {/*   <button onClick={() => navigate('/donate')} className='px-4 py-2'>Donate</button>*/}
            {/* </li>*/}
          </ul>
        </div>

        {/* Desktop top-right profile nav button */}
        <button
          className='md:hidden relative'
          onClick={handleClick}
          aria-label={!nav ? 'Expand menu' : 'Close menu'}
        >
          {!nav ? <MenuIcon className='w-6' /> : <XIcon className='w-6' />}
        </button>
        <div className='hidden md:flex gap-4'>
          <div className='flex items-center justify-end'>
            {login ? (
              <div className='relative' ref={dropdownRef}>
                <button
                  className='flex items-center relative cursor-pointer px-4 flex-shrink-0'
                  onClick={() => setProfile(!profile)}
                >
                  <div className='rounded-full'>
                    <div className='relative'>
                      <div>
                        <img
                          src={picture}
                          className='rounded-3xl w-10 h-10'
                          alt='Profile picture'
                        />
                      </div>
                    </div>
                  </div>
                  <p className='text-gray-800 text-sm mx-3'>{name}</p>
                  <div className='cursor-pointer text-gray-600'>
                    <svg
                      aria-haspopup='true'
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-chevron-down'
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
                  </div>
                </button>
                {profile && (
                  admin ? (
                    <AdminNavDropdown />
                  ) : (
                    <ul className='border-r bg-zinc-100 rounded shadow absolute w-full mt-6'>
                      <li className='flex justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center p-4'>
                        <AuthNav />
                      </li>
                    </ul>
                  )
                )}
              </div>
            ) : (
              <div className='flex px-5 flex-row gap-1 items-center text-zinc-500 font-semibold rounded-xl hover:text-indigo-500 transition duration-300 ease-in-out '>
                <AuthNav />
              </div>
            )}
          </div>
          <button
            onClick={() => navigate('/cart')}
            className='flex gap-1 items-center bg-indigo-600
               hover:bg-transparent border border-indigo-600 font-semibold px-3 py-2 transition duration-300 ease-in-out hover:text-indigo-600 rounded-xl text-zinc-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' />
            </svg>
            Cart
          </button>
        </div>

        {/* Mobile top-left profile nav button */}
        <div className='md:hidden z-10 flex absolute flex-col w-auto items-start'>
          {login ? (
            <div className='relative'>
              <button
                className='flex items-center relative cursor-pointer mr-4'
                onClick={() => setProfile(!profile)}
              >
                <div className='rounded-full'>
                  <img
                    src={picture}
                    className='rounded-3xl w-10 h-10'
                    alt='Profile picture'
                  />
                </div>
              </button>
              {profile && (
                <div className='absolute w-44'>
                  {admin ? (
                    <AdminNavDropdown />
                  ) : (
                    <ul className='p-2 w-max border-r bg-zinc-100 absolute rounded left-0 shadow mt-6'>
                      <li className='flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center p-4'>
                        <AuthNav />
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className='flex pr-5 flex-row gap-1 items-center text-zinc-500 font-semibold rounded-xl hover:text-indigo-500 transition duration-300 ease-in-out '>
              <AuthNav />
            </div>
          )}
        </div>
      </div>

      <ul
        className={
          !nav
            ? 'hidden'
            : 'absolute md:hidden bg-zinc-200 w-full px-8 items-center'
        }
      >
        <li className='border-b-2 border-zinc-300 w-full flex flex-col items-center hover:scale-105 duration-300 text-black font-semibold'>
          {!bMode ? (
            <Link
              to='home'
              smooth={true}
              duration={600}
              className='cursor-pointer p-3'
            >
              Events
            </Link>
          ) : (
            <button
              onClick={() => navigate('/')}
              className='border-none bg-transparent p-3'
            >
              Events
            </button>
          )}
        </li>
        <li className='border-b-2 border-zinc-300 w-full flex flex-col items-center hover:scale-105 duration-300 text-black font-semibold'>
          <SubscriptionNavDropdown mobile={true} />
        </li>
        {/* FIXME: These were removed per #563 in prep for the initial site launch*/}
        {/* <li className='border-b-2 border-zinc-300 w-full flex flex-col items-center text-black font-semibold hover:scale-105 duration-300'>*/}
        {/*   <button*/}
        {/*     onClick={() => navigate('/donate')}*/}
        {/*     className='border-none bg-transparent p-3'*/}
        {/*   >*/}
        {/*     Donate*/}
        {/*   </button>*/}
        {/* </li>*/}
        <li className='border-b-2 border-zinc-300 w-full flex flex-col items-center text-black font-semibold hover:scale-105 duration-300'>
          <button
            onClick={() => navigate('/cart')}
            className='border-none bg-transparent p-3'
          >
            Cart
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
