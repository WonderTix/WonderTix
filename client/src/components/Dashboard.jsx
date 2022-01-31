import React from "react";
import Login from "./Login";
import useAuth from "../utils/Auth"

export default function Dashboard() {
  const isLoggedIn = useAuth();

  return (
    <>
      { isLoggedIn ? <></> : <Login /> }
    </>
  );
}
