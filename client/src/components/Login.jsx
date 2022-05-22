import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import AuthenticationButton from "./Authentication/authentication-button";
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
