import {withAuthenticationRequired} from '@auth0/auth0-react';
import React from 'react';
/**
 * takes a component in as a prop,
and only retrns it if one is logged in
 *
 * @param root0
 * @param root0.component
 * @returns {React.ReactElement}
 */
const ProtectedRoute = ({
  component,
}: {
  component: any;
}): React.ReactElement => {
  const Component = withAuthenticationRequired(component);
  return <Component />;
};
export default ProtectedRoute;

{/* import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';
import React from 'react';
import {LoadingScreen} from '../Ticketing/mainpage/LoadingScreen'; */}
/**
 This component takes a component in as a prop,
 and only renders it if one is logged in and has admin permissions.
 If the user has not logged in they will be redirected to the
 login page. If the user has logged in but is not an admin they
 will be redirected to the main page. If the user has both
 logged in and is an admin they will be routed to the component.
 *
 /** @param root0
 /** @param root0.component
 /** @returns {React.ReactElement}
 */
{/* const ProtectedRoute = ({component}: {component: any}): React.ReactElement => {
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
*/}
