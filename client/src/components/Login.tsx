// The login page is not being used currently.
// Someone can adapt this to a cstom login page with ath0

import React from 'react';
import LoginButton from './Authentication/login-button';
import LogoutButton from './Authentication/logout-button';

const Login = (): React.ReactElement => {
  return (
    <>
      <h1>Please Log In</h1>
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
    </>
  );
};

export default Login;
