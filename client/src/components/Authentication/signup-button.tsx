import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
/**
 * SignupButton
 * @return {React.ReactElement}
 */
const SignupButton = () => {
  const {loginWithRedirect} = useAuth0();
  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
        })
      }
    >
      Sign Up
    </button>
  );
};

export default SignupButton;
