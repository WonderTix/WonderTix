/*
This component takes a component in as a prop,
and only retrns it if one is logged in.
*/
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
