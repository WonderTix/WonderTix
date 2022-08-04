/*
This component is the main logic for the athentication to work.

*/
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Auth0Provider} from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({
  children,
}: {
  children: any,
}): React.ReactElement => {
  const domain = 'wtix-dev.us.auth0.com';
  const clientId = 'riiCcrxD0o7N7oArqgWTTTniMmYM6WiL';

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
      cacheLocations="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
