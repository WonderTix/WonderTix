import React from "react";
import { Box, Typography } from "@mui/material";

export default function AccountResults({ data }) {
  if(!data) return <></>;

  return (
    <Box>
      <Typography>Username: {data.username} </Typography>
      <Typography>ID: {data.id}</Typography>
      <Typography>Admin: {data.is_superadmin ? "Y" : "N"}</Typography>
    </Box>
  );
}
