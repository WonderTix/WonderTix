import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthNav from "./Authentication/auth-nav";

export default function Home() {
  const { user } = useAuth0();
  const { name, picture, email } = user;
  return (
    <>
      <h3>Welcome {name}</h3>
      <AuthNav />
    </>
  );
}
