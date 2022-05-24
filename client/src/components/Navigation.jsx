import React from "react";
import { AppBar, Box, IconButton, Link, Toolbar, Menu, MenuItem, Button} from "@mui/material";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { anchors } from "../utils/arrays";

export default function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx = {{ color: "#fff", ml: 2}}
      >

        Task
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Link href="/tasks/create" sx={{ color: "black", letterSpacing: "2px"}}>Create</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href="/tasks/edit" sx={{ color: "black", letterSpacing: "2px"}}>Edit</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href="/tasks/accountInformation" sx={{ color: "black", letterSpacing: "2px"}}>Account Information</Link></MenuItem>
      </Menu>
          <IconButton
            aria-label="menu"
            edge="start"
            size="large"
            sx={{ ml: 4 }}
          >
            <AccountCircleIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
