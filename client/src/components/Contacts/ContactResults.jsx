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

export function ContactForm(data){


  const [Custname, setName] = useState(data.custname);
  const [Id, setID] = useState(data.id); 
  const [Email, setEmail] = useState(data.email);
  const [Phone, setPhone] = useState(data.phone);
  const [Custaddress, setCustaddress] = useState(data.custaddress);
  const [Newsletter, setNewsletter] = useState(data.newsletter);
  const [Donorbadge, setDonorbage] = useState(data.donorbage);
  const [Seatingaccom, setSeatingaccom] = useState(data.seatingaccom);
  const [VIP, setVIP] = useState(data.vip);
  const [Volunteerlist, setVolunteerlist] = useState(data.volunteerlist);


  //The changed data can be linked to the server (backend), but still cannot be updated
  const handleSubmit = (evt) => {
    evt.preventDefault();
      
      //useState is an asynchronous operation, so it cannot be changed directly. 
      //I tried to use useRef to change the value of volunteer, but it has no effect.
      /*
      if(Volunteerlist==undefined){
        console.log("1111");
        setVolunteerlist(false);
      }
      console.log("..................");
      console.log(Volunteerlist);
      */

      //If not work change Volunteerlist to false
      let body = {
        custname: Custname, email: Email, phone: Phone, custaddress:Custaddress, newsletter: Newsletter, 
        donorbadge: Donorbadge, seatingaccom: Seatingaccom, vip: VIP, volunteer_list: false,  
      };
      
       const url=`http://localhost:8000/api/contacts`;

       console.log(body);

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
        Custname: {Custname}
      </label>
      <br />

      <label>
        ID: {Id}
      </label>
      <br />

      <label>
        Email: 
        <input
          name="Email"
          type="text"                                                                                                                                                                                                                                                                                            m
          value={Email}
          onChange={e => setEmail(e.target.value)} />
      </label>
      <br/>

      <label>
        Phone: 
        <input
          name="Phone"
          type="text"
          value={Phone}
          onChange={e => setPhone(e.target.value)} />
      </label>
      <br/>
      
      <label>
        Cust Address: 
        <input
          name="Address"
          type="text"
          value={Custaddress}
          onChange={e => setCustaddress(e.target.value)} />
      </label>
      <br/>

      <label>
        Newsletter: 
        <input
          name="Newsletter"
          type="text"
          value={Newsletter}
          onChange={e => setNewsletter(e.target.value)} />
      </label>
      <br/>

      <label>
        Donorbadge: 
        <input
          name="Donorbadge"
          type="text"
          value={Donorbadge}
          onChange={e => setDonorbage(e.target.value)} />
      </label>
      <br/>

      <label>
        Seating Accomdation: 
        <input
          name="Seatingaccom"
          type="text"
          value={Seatingaccom}
          onChange={e => setSeatingaccom(e.target.value)} />
      </label>
      <br/>

      <label>
        VIP: 
        <input
          name="VIP"
          type="text"
          value={VIP}
          onChange={e => setVIP(e.target.value)} />
      </label>
      <br/>

      <label>
        Volunteer List: 
        <input
          name="Volunteerlist"
          type="text"
          value={Volunteerlist}
          onChange={e => setVolunteerlist(e.target.value)} />
      </label>
      <br/>

      <input type="submit" value="SAVE" />
    </form>
    </Paper>
  )
 }