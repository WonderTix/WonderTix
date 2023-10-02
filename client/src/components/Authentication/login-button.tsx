import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
/**
 * login button
 *
 * @returns {React.ReactElement}
 */
const LoginButton = (): React.ReactElement => {
  const {loginWithRedirect} = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Sign in</button>;
};

export default LoginButton;
