import React from "react";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
  // return <LogoutButton />;
  // return <LoginButton />;
};

export default AuthenticationButton;
