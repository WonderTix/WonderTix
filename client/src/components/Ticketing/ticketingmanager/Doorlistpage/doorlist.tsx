/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// import DataGrid from 'react-data-grid';
import {DataGrid, GridCellParams} from '@mui/x-data-grid';
import {Checkbox} from '@mui/material';
import React, {useEffect, useState} from 'react';
// import RequireLogin from './RequireLogin';
import {titleCase, dayMonthDate, militaryToCivilian} from '../../../../utils/arrays';
import {useAuth0} from '@auth0/auth0-react';

const renderCheckbox = ((params: GridCellParams) => <Checkbox checked={params.value as boolean} />);

/**
 * Used to check the guests in
 *
 * @param {boolean} isCheckedIn
 * @param {string} ticketID
 * @returns
 */
const checkInGuest = async (isCheckedIn: boolean, ticketID: string) => {
  const {getAccessTokenSilently} = useAuth0();
  try {
    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });
    const res = await fetch(process.env.REACT_APP_API_1_URL + `/events/checkin`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({isCheckedIn, ticketID}),
    });
    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * renders in the check in for guests
 *
 * @param {GridCellParams} params
 * @returns edits the checkInGuest value
 */
const renderCheckin = ((params: GridCellParams) =>
  <Checkbox
    color='primary'
    defaultChecked={params.value as boolean}
    onChange={(e) => checkInGuest(e.target.checked, params.getValue(params.id, 'ticketno') as string)}
  />);

/**
 * columns uses name, vip, donorbadge, accomodations, num_tickets, arrived and renders
 */
const columns = [
  {field: 'name', headerName: 'Name', width: 200},
  {field: 'vip', headerName: 'VIP', width: 100, renderCell: renderCheckbox},
  {field: 'donorbadge', headerName: 'Donor', width: 125, renderCell: renderCheckbox},
  {field: 'accomodations', headerName: 'Accomodations', width: 180, renderCell: renderCheckbox},
  {field: 'num_tickets', headerName: 'Tickets', width: 130},
  {field: 'arrived', headerName: 'Arrived', width: 130, renderCell: renderCheckin},
];

/**
 * Doorlist gets data about the event, time of the event
 *
 * @returns {ReactElement} DoorList also has a datagrid
 */
const DoorList = () => {
  const {getAccessTokenSilently} = useAuth0();
  const [doorList, setDoorList] = useState([]);
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [eventList, setEventList] = useState([]);

  const getEvents = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_1_URL + '/events/list/active');
      const jsonRes = await response.json();
      const jsonData = jsonRes.data;
      Object.keys(jsonData).forEach(function(key) {
        jsonData[key].eventdate = dayMonthDate(jsonData[key].eventdate);
        jsonData[key].starttime = militaryToCivilian(jsonData[key].starttime);
      });
      setEventList(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);


  const getDoorList = async (event) => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'https://localhost:8000',
        scope: 'admin',
      });

      const getuser = event.target.value;
      const response = await fetch(process.env.REACT_APP_API_1_URL + `/doorlist?eventinstanceid=${getuser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      console.log(jsonData.data);

      // doorlistData.data {id: custid, name, vip, donor: donorbadge, accomodations: seatingaccom, num_tickets, checkedin, ticketno }
      setDoorList(jsonData.data);
      setEventName(jsonData.data[0].eventname);
      setDate(dayMonthDate(jsonData.data[0].eventdate));
      setTime(militaryToCivilian(jsonData.data[0].starttime));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text
           text-transparent bg-gradient-to-r from-sky-500
            to-indigo-500 mb-14' >Door List</h1>
        </div>
        <div className='text-sm text-zinc-500 ml-1 mb-2'>Choose Event Date and time</div>
        <select id="search-select" className="select w-full
           max-w-xs bg-white border border-zinc-300
           rounded-lg p-3 text-zinc-600 mb-7" onChange={(e) => (getDoorList(e))}>
          <option className="px-6 py-3">select date</option>
          {eventList.map((eventss) => (
            <>
              <option value={eventss.id} className="px-6 py-3">
                {eventss.eventdate} at {eventss.starttime}
              </option>
            </>
          ),
          )}
        </select>
        <div className='text-4xl font-bold '>{`Showing: ${titleCase(eventName)}`}</div>
        <div className='text-2xl font-bold text-zinc-700'>{`${date}, ${time}`}</div>
        <div className='bg-white p-5 rounded-xl mt-2 shadow-xl'>
          <DataGrid
            className='bg-white'
            autoHeight
            disableSelectionOnClick
            rows={doorList}
            columns={columns}
            pageSize={10}/>
        </div>
      </div>

    </div>
  );
};

export default DoorList;
