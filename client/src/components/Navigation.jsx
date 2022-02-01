import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar
} from "@mui/material";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { anchors } from "../utils/arrays";

export default function Navigation() {
  return (
    <AppBar position="static" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          href="/"
          variant="h6"
          sx={{ color: "#fff", letterSpacing: "2px", textDecoration: "none" }}
        >
          WonderTix CRM
        </Link>
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
            <AccountCircleIcon sx={{ color: "#fff" }}/>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
