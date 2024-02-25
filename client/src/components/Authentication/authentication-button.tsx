/*
This component retrns a btton depending on if one is logged in or not.

*/
import React from 'react';
import LoginButton from './login-button';
import LogoutButton from './logout-button';
import {useAuth0} from '@auth0/auth0-react';
/**
 * returns a button depending on if one is logged in or not.
 *
 * @returns {React.ReactElement}
 */
const AuthenticationButton = () => {
  const {isAuthenticated} = useAuth0();
  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;
