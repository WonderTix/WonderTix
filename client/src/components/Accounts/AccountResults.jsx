import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function AccountResults({ data }) {
  if (!data) return <Typography></Typography>;

  const { username, id, is_superadmin } = data;

  return (
    <Paper
      elevation={6}
      sx={{
        mt: 2,
        p: 4,
        width: 400,
      }}
    >
      <Typography variant="h4">{username} </Typography>
      <Typography>ID: {id}</Typography>
      <Typography>Admin: {is_superadmin ? "Y" : "N"}</Typography>
    </Paper>
  );
}
