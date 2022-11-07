/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React from 'react';
import {useParams} from 'react-router-dom';
// import { useInput } from './hooks/input-hook';
import {useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
/**
 * Display the results of contacts search
 * @return {ReactElement}
 */
const ContactResults = ({
  data,
}: {
  data: any,
}): React.ReactElement => {
  if (!data) return <div>Empty</div>;
  const {getAccessTokenSilently} = useAuth0();

  async function deleteEvent(showId: Number) {
    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });
    const response = await fetch(process.env.REACT_APP_ROOT_URL + `/api/contacts/${showId}`,
        {
          credentials: 'include',
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    return response.json();
  }
  // What is this?
  const {
    custname,
    id,
    email,
    phone,
    address,
    newsletter,
    donorbadge,
    seatingaccom,
    vip,
    volunteerlist,
  } = data;

  return (
    <div className='flec flex-row w-full bg-white
     shadow-lg border border-zinc-300 rounded-lg'>
      <div className='flex flex-col mt-2 p-5 '>
        <div className='flex flex-row gap-3 text-3xl items-center border-b pb-5 font-bold text-zinc-700'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
          <div >Customer Information</div>
        </div>
        <div className='flex flex-row gap-3 text-lg mt-5 w-full'>
          <div className='font-semibold'>
          Customer name:
          </div>
          <div>
            {custname}
          </div>
        </div>
        <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <div className='font-semibold'>
            ID:
          </div>
          <div>
            {id}
          </div>
        </div>
        <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <div className='font-semibold'>
            Email:
          </div>
          <div>
            {email}
          </div>
        </div>
        <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <div className='font-semibold'>
            Phone:
          </div>
          <div>
            {phone}
          </div>
        </div>
        <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <div className='font-semibold'>
            Customer Address:
          </div>
          <div>
            {address}
          </div>
        </div>
        <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <div className='font-semibold'>
            Newsletter:
          </div>
          <div>
            {'' + newsletter}
          </div>
        </div>
        <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <div className='font-semibold'>
            Donorbadge:
          </div>
          <div>
            {donorbadge}
          </div>
        </div>
        <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <div className='font-semibold'>
            Seating Accomdation:
          </div>
          <div>
            { '' + seatingaccom }
          </div>
        </div>
        <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <div className='font-semibold'>
            VIP:
          </div>
          <div>
            { '' + vip }
          </div>
        </div>
        <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
          <div className='font-semibold'>
            Volunteer List:
          </div>
          <div>
            {'' + volunteerlist}
          </div>
        </div>
        <button disabled className='bg-blue-600 disabled:opacity-40
        mt-4 text-white px-5 py-2
        rounded-xl justify-end
          ' >Edit info</button>
        <button className='bg-red-600 hover:bg-red-700
        mt-4 text-white px-5 py-2
        rounded-xl justify-end
          ' onClick={() => deleteEvent(id)} >Remove Customer</button>
      </div>
    </div>
  );
};


export const contactForm = (data: any): React.ReactElement => {
  const [Custname, setName] = useState(data.custname);
  setName(data.custname);
  const [id, setID] = useState(0);
  setID(data.id);
  const [Email, setEmail] = useState(data.email);
  const [Phone, setPhone] = useState(data.phone);
  const [Address, setaddress] = useState(data.address);
  const [Newsletter, setNewsletter] = useState(data.newsletter);
  const [Donorbadge, setDonorbage] = useState(data.donorbage);
  const [Seatingaccom, setSeatingaccom] = useState(data.seatingaccom);
  const [VIP, setVIP] = useState(data.vip);
  const [Volunteerlist, setVolunteerlist] = useState(data.volunteerlist);
  const params = useParams();
  const {getAccessTokenSilently} = useAuth0();


  // The changed data can be linked to the server (but it will creat a new row)
  const HandleSubmit = async (evt: any) => {
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
      address: Address,
      newsletter: Newsletter,
      donorbadge: Donorbadge,
      seatingaccom: Seatingaccom,
      vip: VIP,
      volunteer_list: false,
    };
    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });

    console.log(params);
    console.log(params.id);
    // This is the statement to contact with the api,
    // and establish a link with the background data from here
    // However, in the actual url, param.id
    // is not the id but the user's name, which causes the update to fail
    const url=process.env.REACT_APP_ROOT_URL + `/api/contacts/${data.id}`;
    // const url=process.env.REACT_APP_ROOT_URL + '/api/contacts/'+params.id;
    // const url = process.env.REACT_APP_ROOT_URL + '/api/contacts?filters[custname][$eq]=${params.id}';
    console.log(body);

    // This function contains the relevant methods of the operation
    // "put" corresponds to the backend function "export const update = (r: any)
    fetch( url, {
      // method: "post",
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      // params: JSON.stringify(params),
    }).then((res) => console.log(res));
  };

  return (
    <div className='flex flex-col mt-2 p-4 w-60 bg-black'>
      <form >
        <button onSubmit={HandleSubmit}></button>
        <div>
        Custname: {Custname}
        </div>
        <br />

        <div>
        ID: {id}
        </div>
        <br />

        <div>
        Email:
          <input
            name="Email"
            type="text"
            value={Email}
            className="input w-full max-w-xs border
            border-zinc-300 p-2 rounded-lg "
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br/>

        <div>
        Phone:
          <input
            name="Phone"
            type="text"
            value={Phone}
            className="input w-full max-w-xs border
            border-zinc-300 p-2 rounded-lg "
            onChange={(e) => setPhone(e.target.value)} />
        </div>
        <br/>

        <div>
        Cust Address:
          <input
            name="Address"
            type="text"
            value={Address}
            className="input w-full max-w-xs border
            border-zinc-300 p-2 rounded-lg "
            onChange={(e) => setaddress(e.target.value)} />
        </div>
        <br/>

        <div>
        Newsletter:
          <input
            name="Newsletter"
            type="text"
            value={Newsletter}
            className="input w-full max-w-xs border
            border-zinc-300 p-2 rounded-lg "
            onChange={(e) => setNewsletter(e.target.value)} />
        </div>
        <br/>

        <div>
        Donorbadge:
          <input
            name="Donorbadge"
            type="text"
            value={Donorbadge}
            className="input w-full max-w-xs border
                      border-zinc-300 p-2 rounded-lg "
            onChange={(e) => setDonorbage(e.target.value)} />
        </div>
        <br/>

        <div>
        Seating Accomdation:
          <input
            name="Seatingaccom"
            type="text"
            value={Seatingaccom}
            className="input w-full max-w-xs border
                      border-zinc-300 p-2 rounded-lg "
            onChange={(e) => setSeatingaccom(e.target.value)} />
        </div>
        <br/>

        <div>
        VIP:
          <input
            className="input w-full max-w-xs border
                      border-zinc-300 p-2 rounded-lg "
            name="VIP"
            type="text"
            value={VIP}
            onChange={(e) => setVIP(e.target.value)} />
        </div>
        <br/>

        <div>
        Volunteer List:
          <input
            name="Volunteerlist"
            type="text"
            value={Volunteerlist}
            className="input w-full max-w-xs border
                      border-zinc-300 p-2 rounded-lg "
            onChange={(e) => setVolunteerlist(e.target.value)} />
        </div>
        <br/>

        <button type="submit" value="SAVE" />
      </form>
    </div>

  );
};

export default ContactResults;
