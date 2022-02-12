import React from "react";
import { Paper, Typography } from "@mui/material";

export default function ContactResults({ data }) {
  if (!data) return <Typography></Typography>;

  const {
    custname,
    id,
    email,
    phone,
    custaddress,
    newsletter,
    donorbadge,
    seatingaccom,
    vip,
    volunteerlist,
  } = data;

  return (
    <Paper
      elevation={6}
      sx={{
        mt: 2,
        p: 4,
        width: 400,
      }}
    >
      <Typography variant="h4">{custname}</Typography>
      <Typography>ID: {id}</Typography>
      <Typography>Email: {email}</Typography>
      <Typography>Phone: {phone}</Typography>
      <Typography>Address: {custaddress}</Typography>
      <Typography>Newsletter: {newsletter ? "Y" : "N"} </Typography>
      <Typography>Donor Badge: {donorbadge !== "false" ? donorbadge : "N/A"} </Typography>
      <Typography>Seating Accomodation: {seatingaccom ? "Y" : "N"} </Typography>
      <Typography>VIP: {vip ? "Y" : "N"} </Typography>
      <Typography>Volunteer List: {volunteerlist ? "Y" : "N"}</Typography>
    </Paper>
  );
}
