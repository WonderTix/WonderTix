import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
/**
 * login button
 *
 * @returns {React.ReactElement}
 */
const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();
  return (
    <button
      className=""
      onClick={() => loginWithRedirect()}
    >
      Sign in
    </button>
  );
};

export default LoginButton;
