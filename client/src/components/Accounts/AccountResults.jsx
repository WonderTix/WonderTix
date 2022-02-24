import React from "react";
import { Button, Paper, Typography } from "@mui/material";

export default function AccountResults({ data }) {
  if (!data) return <Typography></Typography>;

  const { username, id, is_superadmin } = data;

  return (
    <Paper
      elevation={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 2,
        p: 4,
        width: 500,
      }}
    >
      <Typography variant="h4">{username} </Typography>
      <Typography>ID: {id}</Typography>
      <Typography>Admin: {is_superadmin ? "Y" : "N"}</Typography>
      <Button disabled variant="contained" sx={{ alignSelf: "end" }}>
        Edit
      </Button>
    </Paper>
  );
}
