import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
export default function ProtectedRoute({ component }) {
  const Component = withAuthenticationRequired(component);

  return <Component />;
}
