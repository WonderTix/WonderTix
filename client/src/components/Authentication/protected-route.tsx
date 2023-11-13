/*
This component takes a component in as a prop,
and only retrns it if one is logged in.
*/
import {withAuthenticationRequired} from '@auth0/auth0-react';
import React from 'react';
import {boolean} from 'yup';
/**
 * takes a component in as a prop,
and only retrns it if one is logged in
 *
 * @param root0
 * @param root0.component
 * @returns {React.ReactElement}
 */
const ProtectedRoute = ({component}: {component: any}): React.ReactElement => {
  const Component = withAuthenticationRequired(
    withAuthenticationRequired(component, {claimCheck, returnTo: '/'}),
  );
  return <Component />;
};

export default ProtectedRoute;

const claimCheck = (user): boolean => {
  return user?.undefineduser_authorization?.permissions.includes(
      (permission: string) => permission === 'admin',
  );
};

