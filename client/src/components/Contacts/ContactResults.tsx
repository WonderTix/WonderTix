/* eslint-disable max-len */
import React from 'react';
import {Typography} from '@mui/material';

import {useParams} from 'react-router-dom';
// import { useInput } from './hooks/input-hook';
import {useState} from 'react';

const ContactResults = ({
  data,
}: {
  data: any,
}): React.ReactElement => {
  if (!data) return <Typography>Empty</Typography>;

  // What is this?
  /* const {
   * custname,
   * id,
   * email,
   * phone,
   * custaddress,
   * newsletter,
   * donorbadge,
   * seatingaccom,
   * vip,
   * volunteerlist,
   * } = data;*/

  if (data) {
    return contactForm(data);
  }
};


export const contactForm = (data: any): React.ReactElement => {
  const [Custname, setName] = useState('');
  setName(data.custname);
  const [id, setID] = useState(0);
  setID(data.id);
  const [Email, setEmail] = useState(data.email);
  const [Phone, setPhone] = useState(data.phone);
  const [Custaddress, setCustaddress] = useState(data.custaddress);
  const [Newsletter, setNewsletter] = useState(data.newsletter);
  const [Donorbadge, setDonorbage] = useState(data.donorbage);
  const [Seatingaccom, setSeatingaccom] = useState(data.seatingaccom);
  const [VIP, setVIP] = useState(data.vip);
  const [Volunteerlist, setVolunteerlist] = useState(data.volunteerlist);
  const params = useParams();


  // The changed data can be linked to the server (but it will creat a new row)
  const HandleSubmit = (evt: any) => {
    evt.preventDefault();


    // useState is an asynchronous operation, so it cannot be changed directly.
    // I tried to use useRef to change the value of volunteer,
    // but it has no effect.
    /*
      if(Volunteerlist==undefined){
        console.log("1111");
        setVolunteerlist(false);
      }
      console.log("..................");
      console.log(Volunteerlist);
      */

    // If not work change Volunteerlist to false
    const body = {
      custname: Custname,
      email: Email,
      phone: Phone,
      custaddress: Custaddress,
      newsletter: Newsletter,
      donorbadge: Donorbadge,
      seatingaccom: Seatingaccom,
      vip: VIP,
      volunteer_list: false,
    };

    console.log(params);
    console.log(params.id);
    // This is the statement to contact with the api,
    // and establish a link with the background data from here
    // However, in the actual url, param.id
    // is not the id but the user's name, which causes the update to fail
    const url = `http://localhost:8000/api/${params.id}`;
    // const url='http://localhost:8000/api/contacts/'+params.id;
    // const url = 'http://localhost:8000/api/contacts?filters[custname][$eq]=${params.id}';
    console.log(body);

    // This function contains the relevant methods of the operation
    // "put" corresponds to the backend function "export const update = (r: any)
    fetch(url, {
      // method: "post",
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
      // params: JSON.stringify(params),
    }).then((res) => console.log(res));
  };

  return (
    <div className="w-full max-w-s">
      <form onSubmit={HandleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="custname">
            Custname: {Custname}
          </label>
        </div>
        <br />

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
            ID: {id}
          </label>
        </div>
        <br />

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="Email"
              type="text"
              value={Email}
              onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone:
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="Phone"
            type="text"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Cust Address:
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="Address"
            type="text"
            value={Custaddress}
            onChange={(e) => setCustaddress(e.target.value)} />
        </label>
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Newsletter:
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="Newsletter"
            type="text"
            value={Newsletter}
            onChange={(e) => setNewsletter(e.target.value)} />
        </label>
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Donorbadge:
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="Donorbadge"
            type="text"
            value={Donorbadge}
            onChange={(e) => setDonorbage(e.target.value)} />
        </label>
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Seating Accomdation:
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="Seatingaccom"
            type="text"
            value={Seatingaccom}
            onChange={(e) => setSeatingaccom(e.target.value)} />
        </label>
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          VIP:
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="VIP"
            type="text"
            value={VIP}
            onChange={(e) => setVIP(e.target.value)} />
        </label>
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Volunteer List:
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="Volunteerlist"
            type="text"
            value={Volunteerlist}
            onChange={(e) => setVolunteerlist(e.target.value)} />
        </label>
        <br />
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="SAVE" >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactResults;
