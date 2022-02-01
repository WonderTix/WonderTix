import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      navigate("/welcome");
    } else {
      document.getElementById("error-message").hidden = false;
      document.getElementById("error-message").style.textAlign = "center";
    }
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "80%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <FormControl
        sx={{
          width: "25%",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Sign In
        </Typography>
        <TextField
          placeholder="Username"
          variant="outlined"
          type="text"
          sx={{ my: 1 }}
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          placeholder="Password"
          variant="outlined"
          type="password"
          sx={{ my: 1 }}
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Typography id="error-message" hidden sx={{ color: "red" }}>
          Incorrect username or password
        </Typography>
        <Button
          type="submit"
          variant="contained"
          sx={{ my: 1 }}
          onClick={handleClick}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}
