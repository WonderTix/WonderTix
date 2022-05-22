import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "./Navigation";
import AuthNav from "./Authentication/auth-nav";

export default function Home() {
  return (
    <>
      <Navigation />
      <CssBaseline />
      <h3>Welcome to the home page</h3>
    </>
  );
}
