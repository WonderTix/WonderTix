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
      audience: process.env.REACT_APP_ROOT_URL,
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

const renderCheckbox = ((params: GridCellParams) => <Checkbox checked={params.value as boolean} />);

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
  {field: 'firstname', headerName: 'First Name', width: 120},
  {field: 'lastname', headerName: 'Last Name', width: 120},
  {field: 'num_tickets', headerName: 'Tickets', width: 130},
  {field: 'arrived', headerName: 'Arrived', width: 130, renderCell: renderCheckin},
  {field: 'vip', headerName: 'VIP', width: 100, renderCell: renderCheckbox},
  {field: 'donorbadge', headerName: 'Donor', width: 125, renderCell: renderCheckbox},
  {field: 'accommodations', headerName: 'Accommodations', width: 180, renderCell: renderCheckbox},
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
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [availableTimesEvents, setAvailableTimesEvents] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [eventListFull, setEventListFull] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_1_URL + '/events/list/allevents');
        const jsonRes = await response.json();
        const jsonData = jsonRes.data;
        console.log('Fetched events:', jsonData);
        Object.keys(jsonData).forEach(function(key) {
          jsonData[key].eventdate = dayMonthDate(jsonData[key].eventdate);
          jsonData[key].eventtime = militaryToCivilian(jsonData[key].eventtime);
        });
        // deduplicate the events based on eventname
        const uniqueEventNames = new Set(jsonData.map((event) => event.eventname));
        console.log('Unique event names:', uniqueEventNames);
        const deduplicatedEvents = Array.from(uniqueEventNames).map((name) => jsonData.find((event) => event.eventname === name));
        console.log('Deduplicated events:', deduplicatedEvents);
        setEventList(deduplicatedEvents);
        setEventListFull(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchEvents();
  }, []);

  const handleEventChange = (event) => {
    const eventId = parseInt(event.target.value);
    console.log('Selected event ID:', eventId);
    setSelectedEventId(eventId);

    const matchingEvents = eventListFull.filter((e) => e.eventid === eventId);
    console.log('Matching events:', matchingEvents);
    const timesForThisEvent = matchingEvents.map((e) => e.eventtime);
    setAvailableTimesEvents(matchingEvents);
    console.log('Available times:', timesForThisEvent);
    console.log('Available times events:', matchingEvents);
  };

  const handleTimeChange = (event) => {
    const eventIId = parseInt(event.target.value);
    console.log('Selected event i id:', event.target.value);
    const matchingEvent = availableTimesEvents.find((e) => e.eventinstanceid === eventIId);
    console.log('Matching event:', matchingEvent);
    getDoorList(eventIId);
  };

  const getDoorList = async (event) => {
    console.log('Getting door list for event:', event);
    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_ROOT_URL,
        scope: 'admin',
      });
      const response = await fetch(process.env.REACT_APP_API_1_URL + `/doorlist?eventinstanceid=${event}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const jsonRes = await response.json();
      const jsonData = jsonRes.data;
      const doorListData = jsonData.map((item, index) => {
        const row = item.row.slice(1, -1).split(',');
        return {
          id: index,
          firstname: row[1],
          lastname: row[2],
          num_tickets: row[12],
          // TODO: calculate arrived and update the database is selected
          arrived: row[11] === 't',
          vip: row[3] === 't',
          donorbadge: row[4] === 't',
          accommodations: row[5] === 't',
        };
      });

      setDoorList(doorListData);
      const rowString = jsonData[0].row.slice(1, -1);
      const rowParts = rowString.split(',');
      console.log('Row parts:', rowParts);
      const eventNameFromData = rowParts[7].replace(/"/g, '');
      const eventDate = rowParts[9];
      const formattedEventDate = eventDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'); // convert to "yyyy-mm-dd"
      const eventTime = rowParts[10];
      setEventName(eventNameFromData);
      console.log('eventDate:', eventDate);
      setDate(dayMonthDate(formattedEventDate));
      setTime(militaryToCivilian(eventTime));
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
        <div className='text-sm text-zinc-500 ml-1 mb-2'>Choose Event</div>
        <select id="event-select" className="select w-full max-w-xs bg-white border border-zinc-300 rounded-lg p-3 text-zinc-600 mb-7" onChange={handleEventChange}>
          <option className="px-6 py-3">Select Event</option>
          {eventList.map((event) => (
            <option key={event.eventinstanceid} value={event.eventid} className="px-6 py-3">{event.eventname}</option>
          ))}
        </select>
        <div className='text-sm text-zinc-500 ml-1 mb-2'>Choose Time</div>
        <select id="time-select" className="select w-full max-w-xs bg-white border border-zinc-300 rounded-lg p-3 text-zinc-600 mb-7" onChange={handleTimeChange} disabled={!selectedEventId}>
          <option className="px-6 py-3">Select Time</option>
          {availableTimesEvents.map((event) => (
            <option key={event.eventinstanceid} value={event.eventinstanceid} className="px-6 py-3">{event.eventdate} {event.eventtime}</option>
          ))}
        </select>
        <div className='text-4xl font-bold '>{`Showing: ${titleCase(eventName)}`}</div>
        <div className='text-2xl font-bold text-zinc-700'>{date && time ? `${date}, ${time}` : `${date}${time}`}</div>
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
