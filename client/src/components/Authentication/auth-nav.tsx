import React from 'react';
import AuthenticationButton from './authentication-button';

/**
 * A wrapper for the Authentication button. It is kind of repetitive,
 * but can be placed anywhere to create a dynamic login/logout button
 *
 * @returns {React.ReactElement}
 */
const AuthNav = (): React.ReactElement => <AuthenticationButton />;

export default AuthNav;
