import React from "react";
import { Button, Paper, Typography } from "@mui/material";

import { useParams } from "react-router-dom";
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
  const [id, setID] = useState(data.id); 
  const [Email, setEmail] = useState(data.email);
  const [Phone, setPhone] = useState(data.phone);
  const [Custaddress, setCustaddress] = useState(data.custaddress);
  const [Newsletter, setNewsletter] = useState(data.newsletter);
  const [Donorbadge, setDonorbage] = useState(data.donorbage);
  const [Seatingaccom, setSeatingaccom] = useState(data.seatingaccom);
  const [VIP, setVIP] = useState(data.vip);
  const [Volunteerlist, setVolunteerlist] = useState(data.volunteerlist);
  const params = useParams();


  //The changed data can be linked to the server (but it will creat a new row)
  const HandleSubmit = (evt) => {
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

      console.log(params);
      console.log(params.id);
       // This is the statement to contact with the api, and establish a link with the background data from here
       // However, in the actual url, param.id is not the id but the user's name, which causes the update to fail
       const url=`http://localhost:8000/api/${params.id}`;
       //const url='http://localhost:8000/api/contacts/'+params.id; 
       //const url = 'http://localhost:8000/api/contacts?filters[custname][$eq]=${params.id}';
       console.log(body);

       // This function contains the relevant methods of the operation
       //"put" corresponds to the backend function "export const update = (r: any)
       fetch ( url, {
        //method: "post",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        //params: JSON.stringify(params),
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
      
    <form onSubmit={HandleSubmit}>

      <label>
        Custname: {Custname}
      </label>
      <br />

      <label>
        ID: {id}
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