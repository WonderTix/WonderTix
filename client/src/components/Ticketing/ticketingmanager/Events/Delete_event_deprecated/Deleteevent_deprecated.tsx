/* eslint-disable require-jsdoc */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {DataGrid} from '@mui/x-data-grid';
import React, {useState, useEffect} from 'react';
import {dayMonthDate, militaryToCivilian} from '../../../../../utils/arrays';
import {useAuth0} from '@auth0/auth0-react';

/**
 * Deletes Events
 *
 * @module
 * @returns reponse.json()
 */
export default function DeleteEvents() {
  const {getAccessTokenSilently} = useAuth0();

  /**
   *
   * @param showId
   */
  async function deleteEvent(showId: string) {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_ROOT_URL,
      scope: 'admin',
    });
    const response = await fetch(process.env.REACT_APP_API_1_URL + `/events/${showId}`,
        {
          credentials: 'include',
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    getEvents();
    return response.json();
  }

  /**
   * const columns - Used to create columns that appear in the data
   */
  const columns = [
    {field: 'id', headerName: 'Event Instance ID', width: 100},
    {field: 'eventname', headerName: 'Event', width: 150},
    {field: 'eventdescription', headerName: 'Event Description', width: 150},
    {field: 'eventdate', headerName: 'Date', width: 150},
    {field: 'eventtime', headerName: 'Time', width: 100},
    {field: 'Delete', headerName: 'Delete', width: 150, renderCell: (params: any) => (
      <button className='px-3 py-1 text-sm bg-red-600 text-white rounded-xl' onClick={() => deleteEvent(JSON.stringify(params.row.id))}>Delete</button>
    )},
  ];

  /**
   * getEvents - used to get events using the api routes
   */
  const [eventList, setEventList] = useState([]);
  const getEvents = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_1_URL + '/events/list/active');
      const jsonRes = await response.json();
      const jsonData = jsonRes.data;
      Object.keys(jsonData).forEach(function(key) {
        jsonData[key].eventdate = dayMonthDate(jsonData[key].eventdate);
        jsonData[key].eventtime = militaryToCivilian(jsonData[key].eventtime);
      });
      setEventList(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  /**
   * useEffect calls getEvents
   *
   * @returns {ReactElement}
   */
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <h1 className='font-bold text-5xl mb-14 bg-clip-text text-transparent
         bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' >Delete Event Showing</h1>
        <DataGrid className='bg-white' autoHeight rows={eventList} columns={columns} pageSize={10} />
      </div>
    </div>
  );
}
