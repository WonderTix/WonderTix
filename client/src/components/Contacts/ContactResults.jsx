import React from "react";
import { Button, Paper, Typography } from "@mui/material";

//import { useInput } from './hooks/input-hook';
import { useState } from "react";




export default function ContactResults({ data }) {
  if (!data) return <Typography>Empty</Typography>;

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

  if(data){
    return ContactForm(data);
  }
}

/*
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
      <Typography variant="h4">{custname}</Typography>

      
      <textarea name = "ID" value = "ID"/>
      <input type="text" defaultValue="ID:{}"/>
      <Typography>Test_Data {data.vip ? "Y":"N"}</Typography>


      <Typography>ID: {id}</Typography>
      <Typography>Email: {email}</Typography>
      <Typography>Phone: {phone}</Typography>
      <Typography>Address: {custaddress}</Typography>
      <Typography>Newsletter: {newsletter ? "Y" : "N"} </Typography>
      <Typography>Donor Badge: {donorbadge !== "false" ? donorbadge : "N/A"} </Typography>
      <Typography>Seating Accomodation: {seatingaccom ? "Y" : "N"} </Typography>
      <Typography>VIP: {vip ? "Y" : "N"} </Typography>
      <Typography>Volunteer List: {volunteerlist ? "Y" : "N"}</Typography> 
      <Button disabled variant="contained" sx={{ alignSelf: "end" }}>Edit</Button>
    </Paper>
  );  
*/
export function ContactForm(data){


  const [Custname, setName] = useState(data.custname);
  const [Id, setID] = useState(data.id); //
  const [Email, setEmail] = useState(data.email);
  const [Phone, setPhone] = useState(data.phone);
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
      let body = {
        custname:{Custname}, email: {Email}, phone:{Phone}, custaddress:'12345 test street', newsletter:'', 
        donorbadge:'', seatingaccom:'', vip:'', volunteer_list:'',
      };
      const url=`http://localhost:8000/api/contacts`;

      fetch ( url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => console.log(res));
    
  }


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

    <form onSubmit={handleSubmit}>

      <label>
        Custname:
        <input
          name="Custname"
          type="text"
          value={Custname}
          onChange={e => setName(e.target.value)}/>
      </label>
      <br />
      <label>
        ID:
        <input
          name="ID"
          type="number"
          value={Id}
          onChange={e => setID(e.target.value)} />
      </label>
      <br />

      <label>
        Email:
        <input
          name="Email"
          type="text"// Checkboxjhh  m                                                                                                                                                                                                                                                                                            m
          value={Email}
          onChange={e => setEmail(e.target.value)} />
      </label>
      <br/>

      <label>
        Phone
        <input
          name="Phone"
          type="text"
          value={Phone}
          onChange={e => setPhone(e.target.value)} />
      </label>
      <br/>


      
      
      <input type="submit" value="Submit" />
    </form>
    </Paper>

  )

 }

 


