import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Loading } from "../Loading";

export default function ProtectedRoute({ component }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Loading />,
  });

  return <Component />;
}
