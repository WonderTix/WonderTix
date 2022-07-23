/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
// import DataGrid from 'react-data-grid';
import {DataGrid, GridCellParams} from '@mui/x-data-grid';
import {Checkbox} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
// import RequireLogin from './RequireLogin';
import {titleCase, dayMonthDate, militaryToCivilian} from '../../../../utils/arrays';

const renderCheckbox = ((params: GridCellParams) => <Checkbox checked={params.value as boolean} />);

const checkInGuest = async (isCheckedIn: boolean, ticketID: string) => {
  try {
    const res = await fetch(`http://localhost:8000/api/events/checkin`, {
      credentials: 'include',
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({isCheckedIn, ticketID}),
    });
    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

const renderCheckin = ((params: GridCellParams) =>
  <Checkbox
    color='primary'
    defaultChecked={params.value as boolean}
    onChange={(e) => checkInGuest(e.target.checked, params.getValue(params.id, 'ticketno') as string)}
  />);

const columns = [
  {field: 'name', headerName: 'Name', width: 200},
  {field: 'vip', headerName: 'VIP', width: 100, renderCell: renderCheckbox},
  {field: 'donorbadge', headerName: 'Donor', width: 125, renderCell: renderCheckbox},
  {field: 'accomodations', headerName: 'Accomodations', width: 180, renderCell: renderCheckbox},
  {field: 'num_tickets', headerName: 'Tickets', width: 130},
  {field: 'arrived', headerName: 'Arrived', width: 130, renderCell: renderCheckin},
];


type DoorListProps = {eventinstanceid: string}
const DoorList = () => {
  const {eventinstanceid} = useParams<DoorListProps>();
  const [doorList, setDoorList] = useState([]);
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [eventList, setEventList] = useState([]);
  const getEvents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/events/list/active');
      const jsonData = await response.json();
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
      const getuser = event.target.value;
      const response = await fetch(`http://localhost:8000/api/doorlist?eventinstanceid=${getuser}`, {method: 'GET'});
      const jsonData = await response.json();

      // doorlistData.data {id: custid, name, vip, donor: donorbadge, accomodations: seatingaccom, num_tickets, checkedin, ticketno }
      setDoorList(jsonData.data);
      setEventName(jsonData.eventname);
      setDate(dayMonthDate(jsonData.eventdate));
      setTime(militaryToCivilian(jsonData.starttime));
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
        {/*<table className="table-fixed w-full text-sm text-left rounded-lg text-gray-500 ">
          <thead className="text-xs text-zinc-100 uppercase rounded-t-lg bg-zinc-800">
            <tr>
              {columns.map((client) =>
                (
                  <>
                    <th scope="col" className="px-6 py-3">
                      {client.field}
                    </th>
                  </>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-zinc-100 border-b rounded-b-lg hover:bg-gray-50">
              <td>{doorList.map((eventss) => (
                <>
                  <option className="px-6 py-3">
                    {eventss.name}
                  </option>
                </>
              ),
              )}</td>
              <td>{doorList.map((eventss) => (
                <>
                  <option className="px-6 py-3">
                    {eventss.vip}
                  </option>
                </>
              ),
              )}</td>
            </tr>
          </tbody>
        </table>*/}
      </div>

    </div>
  );
};

export default DoorList;
