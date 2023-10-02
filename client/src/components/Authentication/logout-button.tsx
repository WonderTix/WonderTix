import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
/**
 * logout button
 *
 * @returns {React.ReactElement}
 */
const LogoutButton = (): React.ReactElement => {
  const {logout} = useAuth0();
  return (
    <button
      className='flex items-center gap-1'
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
        aria-hidden='true'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3
            3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
        />
      </svg>
      Sign out
    </button>
  );
};

export default LogoutButton;
