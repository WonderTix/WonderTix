/*
This component is the main logic for the athentication to work.

*/
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Auth0Provider} from '@auth0/auth0-react';
/**
 * the main logic for the athentication to work
 *
 * @param root0
 * @param root0.children
 * @returns {React.ReactElement}
 */
const Auth0ProviderWithHistory = ({
  children,
}: {
  children: any,
}): React.ReactElement => {
  const domain = 'wtix-dev.us.auth0.com';
  const clientId = 'riiCcrxD0o7N7oArqgWTTTniMmYM6WiL';
  const audience = 'https://localhost:8000';
  const scope = 'admin';

  const history = useNavigate();

  const onRedirectCallback = (appState: any) => {
    history(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens
      audience={audience}
      scope={scope}
      cacheLocations="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
