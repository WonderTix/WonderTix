import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

const LogoutButton = () => {
  const {logout} = useAuth0();
  return (
    <button
      className=""
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Sign out
    </button>
  );
};

export default LogoutButton;
