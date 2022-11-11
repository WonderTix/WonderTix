/*
This component is a wrapper for the
Authentication button. It is kind of repetitive.
but can be placed anywhere to create a dynamic login/logot btton.
*/
import React from 'react';
import AuthenticationButton from './authentication-button';
/**
 * a wrapper for the
Authentication button. It is kind of repetitive.
but can be placed anywhere to create a dynamic login/logot btton
 *
 * @returns {React.ReactElement}
 */
const AuthNav = (): React.ReactElement => <AuthenticationButton />;

export default AuthNav;
