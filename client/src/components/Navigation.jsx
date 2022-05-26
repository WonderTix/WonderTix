import React from "react";
import { AppBar, Box, IconButton, Link, Toolbar } from "@mui/material";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { anchors } from "../utils/arrays";
import logo from "../Logo/2011_Logo_white.png";
import "../Logo/logo.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navigation({ icon }) {
  const { user } = useAuth0();
  const { name, picture, email } = user;
  return (
    <AppBar position="static" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlignVertical: "center",
          }}
        >
          <Link
            href="/"
            variant="h6"
            sx={{
              color: "#fff",
              letterSpacing: "2px",
              textDecoration: "none",
              textAlignVertical: "center",
              marginTop: "20px",
            }}
            className="T-style"
          >
            WonderTix CRM
          </Link>

          <Link href="https://portlandplayhouse.org/" sx={{ ml: 5 }}>
            <img src={logo} className="logo_size"></img>
          </Link>
        </Box>
        <Box>
          {anchors.map((anchor) => (
            <Link
              href={anchor.link}
              key={anchor.title}
              underline="none"
              sx={{ color: "#fff", ml: 2 }}
            >
              {anchor.title}
            </Link>
          ))}
          <IconButton
            aria-label="menu"
            edge="start"
            size="large"
            sx={{ ml: 4 }}
          >
            <img src={picture} width="30" height="30" />
            {/* <AccountCircleIcon sx={{ color: "#fff" }} /> */}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
