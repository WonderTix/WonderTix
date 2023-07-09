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
  const domain = process.env.REACT_APP_AUTH0_URL;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
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
