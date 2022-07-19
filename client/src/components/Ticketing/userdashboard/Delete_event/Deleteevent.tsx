/* eslint-disable require-jsdoc */
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
// import {DataGrid} from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import React, {useState, useEffect} from 'react';
import {dayMonthDate, militaryToCivilian} from '../../../../utils/arrays';

export default function DeleteEvents() {
  async function deleteEvent(showId: string) {
    const data = {
      id: showId,
    };

    const response = await fetch('/api/delete-event',
        {
          credentials: 'include',
          method: 'POST',
          headers:
           {
             'Content-Type': 'application/json',
           },
          body: JSON.stringify(data),
        });
    getEvents();
    return response.json();
  }

  // Create columns that appears in data
  const columns = [
    {field: 'id', headerName: 'Event Instance ID', width: 100},
    {field: 'eventname', headerName: 'Event', width: 150},
    {field: 'eventdescription', headerName: 'Event Description', width: 150},
    {field: 'eventdate', headerName: 'Date', width: 150},
    {field: 'starttime', headerName: 'Time', width: 100},
    {field: 'Delete', headerName: 'Delete', width: 150, renderCell: (params: any) => (
      <Button variant="contained" color="secondary" onClick={() => deleteEvent(JSON.stringify(params.row.id))}>Delete</Button>
    )},
  ];

  const [eventList, setEventList] = useState([]);
  const getEvents = async () => {
    try {
      const response = await fetch('/api/active-event-instance-list');
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
  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <h1 className='font-bold text-5xl mb-14 bg-clip-text text-transparent
         bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' >Delete Event</h1>
        <table className="table-fixed w-full text-sm text-left rounded-lg text-gray-500 ">
          <thead className="text-xs text-zinc-100 rounded-t-lg bg-zinc-800">
            <tr>
              {columns.map((client) =>
                (
                  <>
                    <th scope="col" className="px-6 py-3">
                      {client.headerName}
                    </th>
                  </>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-zinc-100 border-b rounded-b-lg hover:bg-gray-50">
              <td>{eventList}</td>
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
