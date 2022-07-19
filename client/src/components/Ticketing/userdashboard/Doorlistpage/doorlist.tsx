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
import axios from 'axios';
// import RequireLogin from './RequireLogin';
import {titleCase, dayMonthDate, militaryToCivilian} from '../../../../utils/arrays';

const renderCheckbox = ((params: GridCellParams) => <Checkbox checked={params.value as boolean} />);

const checkInGuest = async (isCheckedIn: boolean, ticketID: string) => {
  try {
    const res = await fetch(`/api/checkin`, {
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
  {field: 'name'},
  {field: 'vip', renderCell: renderCheckbox},
  {field: 'donorbadge', renderCell: renderCheckbox},
  {field: 'accomodations', renderCell: renderCheckbox},
  {field: 'num_tickets'},
  {field: 'arrived', renderCell: renderCheckin},
];


type DoorListProps = {eventinstanceid: string}
export default function DoorList() {
  const {eventinstanceid} = useParams<DoorListProps>();
  const [doorList, setDoorList] = useState([]);
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const getDoorList = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/doorlist?eventinstanceid=${eventinstanceid}`, {method: 'GET'});
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

  useEffect(() => {
    getDoorList();
  }, []);

  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text
           text-transparent bg-gradient-to-r from-sky-500
            to-indigo-500 mb-14' >Door List</h1>
        </div>
        <div className='text-4xl font-bold '>{`Showing: ${titleCase(eventName)}`}</div>
        <div className='text-2xl font-bold '>{`${date}, ${time}`}</div>
        <table className="table-fixed w-full text-sm text-left rounded-lg text-gray-500 ">
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
