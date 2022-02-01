import React from "react";
import { Box, Typography } from "@mui/material";

export default function ContactResults({ data }) {
  if (!data) return <Typography></Typography>;

  return (
    <Box>
      <Typography>Name: {data.custname}</Typography>
      <Typography>ID: {data.id}</Typography>
      <Typography>Email: {data.email}</Typography>
      <Typography>Phone: {data.phone}</Typography>
      <Typography>Address: {data.custaddress}</Typography>
      <Typography>Newsletter: {data.newsletter ? "Y" : "N"}</Typography>
      <Typography>Donor Badge: {data.donorbadge}</Typography>
      <Typography>Seating Accomodation: {data.seatingaccom}</Typography>
      <Typography>VIP: {data.vip ? "Y" : "N"}</Typography>
      <Typography>Volunteer List: {data.volunteerlist ? "Y" : "N"}</Typography>
    </Box>
  );
}
