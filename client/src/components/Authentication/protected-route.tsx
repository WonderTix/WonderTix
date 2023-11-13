/*
This component takes a component in as a prop,
and only returns it if one is logged in and an admin.
*/
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';
import React from 'react';
import {LoadingScreen} from '../Ticketing/mainpage/LoadingScreen';
/**
 * takes a component in as a prop,
 and only retrns it if one is logged in
 *
 * @param root0
 * @param root0.component
 * @returns {React.ReactElement}
 */
const ProtectedRoute = ({component}: {component: any}): React.ReactElement => {
  const {isLoading} = useAuth0();
  const Component = withAuthenticationRequired(
      withAuthenticationRequired(component, {claimCheck, returnTo: '/'}),
  );
  if (isLoading) {
    return <LoadingScreen />;
  }
  return <Component />;
};

export default ProtectedRoute;

const claimCheck = (user): boolean => {
  return user?.undefineduser_authorization?.permissions.includes('admin');
};

