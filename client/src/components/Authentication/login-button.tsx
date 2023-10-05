import React, {ReactElement} from 'react';
import {useAuth0} from '@auth0/auth0-react';
/**
 * login button
 *
 * @returns {ReactElement}
 */
const LoginButton = (): ReactElement => {
  const {loginWithRedirect} = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Sign in</button>;
};

export default LoginButton;
