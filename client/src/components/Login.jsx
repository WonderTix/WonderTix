//The login page is not being used currently.

import React, { useState } from "react";
import LoginButton from "./Authentication/login-button";
import LogoutButton from "./Authentication/logout-button";

export default function Login() {
  return (
    <>
      <h1>Please Log In</h1>
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
    </>
  );
}
