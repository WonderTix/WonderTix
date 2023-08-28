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
import {DataGrid, GridCellParams, useGridApiContext} from '@mui/x-data-grid';
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
    if (!res.ok) {
      throw new Error(`Failed to check in guest. HTTP status: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

const renderCheckbox = (params: GridCellParams) => (
  <Checkbox checked={params.value as boolean} disabled color="info" />
);

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
 * columns uses first name, last name, # of tickets purchased, arrival status, vip, donorbadge, accomodations
 */
const columns = [
  {field: 'firstname', headerName: 'First Name', width: 120},
  {field: 'lastname', headerName: 'Last Name', width: 120},
  {field: 'num_tickets', headerName: 'Tickets', width: 100},
  {field: 'arrived', headerName: 'Arrived', width: 100, renderCell: renderCheckin},
  {field: 'vip', headerName: 'VIP', width: 100, renderCell: renderCheckbox},
  {field: 'donorbadge', headerName: 'Donor', width: 100, renderCell: renderCheckbox},
  {field: 'accommodations', headerName: 'Accommodations', width: 200},
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
  const [eventListActive, setEventListActive] = useState([]);
  const [ticketsSold, setTicketsSold] = useState(true);
  const [showInactiveEvents, setShowInactiveEvents] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_1_URL + '/events/list/allevents');
        if (!response.ok) {
          throw new Error(`Failed to fetch events. HTTP status: ${response.status}`);
        }
        const allEventRes = await response.json();
        const allEventResJson = allEventRes.data as any[];

        // Deduplicate the events based on eventid
        const uniqueEventIds = Array.from(new Set(allEventResJson.map((event) => event.eventid)));
        let deduplicatedEvents = uniqueEventIds.map((id) => allEventResJson.find((event) => event.eventid === id));

        // Sort the events in alphabetical order by eventname
        deduplicatedEvents = deduplicatedEvents.sort((a, b) => a.eventname.localeCompare(b.eventname));

        setEventList(deduplicatedEvents);
        setEventListFull(allEventResJson);
        setEventListActive(deduplicatedEvents.filter((event) => event.active));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchEvents();
  }, []);

  const handleEventChange = (event) => {
    const eventId = parseInt(event.target.value);
    setSelectedEventId(eventId);

    const matchingEvents = eventListFull.filter((e) => e.eventid === eventId);
    setAvailableTimesEvents(matchingEvents);
  };

  const handleTimeChange = (event) => {
    const eventInstanceID = parseInt(event.target.value);
    getDoorList(eventInstanceID);
  };

  const CustomToolbar = () => {
    const apiRef = useGridApiContext();

    const handleExport = (options: any) => {
      apiRef.current.exportDataAsCsv(options);
    };

    return (
      <div className='container columns-3 gap-4 ml-3 mt-3 '>
        <button
          className='flex flex-row  text-blue-600 gap-2
          items-center hover:text-blue-500 px-3 py-2 rounded-lg'
          onClick={handleExport}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          Export
        </button>
      </div>
    );
  };

  const getDoorList = async (event) => {
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
      const eventInstanceJson = await response.json();
      if (!response.ok) {
        throw new Error(`Failed to fetch door list. HTTP status: ${response.status}`);
      }
      const eventInstanceData = eventInstanceJson.data;
      const doorListData = eventInstanceData.map((item, index) => {
        const row = item.row.slice(1, -1).split(',');
        if (!row || !row[0]) { // Check if the value in column 0 is present
          setTicketsSold(false);
          return null; // Exit early if no tickets sold
        }
        setTicketsSold(true);
        return {
          id: index,
          firstname: row[1],
          lastname: row[2],
          num_tickets: row[11],
          arrived: false,
          vip: row[3] === 't',
          donorbadge: row[4] === 't',
          accommodations: row[5],
        };
      }).filter(Boolean);

      setDoorList(doorListData);
      const rowString = eventInstanceData[0].row.slice(1, -1);
      const rowParts = rowString.split(',');
      const eventNameFromData = rowParts[7].replace(/"/g, '');
      const eventDate = rowParts[9];
      const eventDateObject = new Date(eventDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3'));
      eventDateObject.setDate(eventDateObject.getDate() + 1); // fixes off by one error
      const formattedEventDate = eventDateObject.toISOString().split('T')[0]; // Convert to "yyyy-mm-dd"
      const eventTime = rowParts[10];
      setEventName(eventNameFromData);
      setDate(dayMonthDate(formattedEventDate));
      setTime(militaryToCivilian(eventTime));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 mb-14'>Door List</h1>
        </div>
        <div className='flex flex-row items-center mb-3'>
          <Checkbox
            id="enable-inactive-events"
            color='primary'
            checked={showInactiveEvents}
            onChange={(e) => setShowInactiveEvents(e.target.checked)}
          />
          <label className='text-sm text-zinc-500 mr-2' htmlFor="enable-inactive-events">Enable inactive events</label>
        </div>
        <div className="mb-3">
          <label htmlFor="event-select" className='text-sm text-zinc-500 ml-1 mb-2 block'>Choose Event</label>
          <select
            id="event-select"
            className="select w-full max-w-xs bg-white border border-zinc-300 rounded-lg p-3 text-zinc-600 mb-7"
            onChange={handleEventChange}
          >
            <option className="px-6 py-3">Select Event</option>
            {(showInactiveEvents ? eventList : eventListActive).map((event) => (
              <option key={event.eventinstanceid} value={event.eventid} className="px-6 py-3">
                {event.eventname} - {event.eventid}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="time-select" className='text-sm text-zinc-500 ml-1 mb-2 block'>Choose Time</label>
          <select id="time-select" className="select w-full max-w-xs bg-white border border-zinc-300 rounded-lg p-3 text-zinc-600 mb-7" onChange={handleTimeChange} disabled={!selectedEventId}>
            <option className="px-6 py-3">Select Time</option>
            {availableTimesEvents.map((event) => {
              const eventDateObject = new Date(event.eventdate.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3'));
              eventDateObject.setDate(eventDateObject.getDate() + 1); // fixes off by one error
              const formattedDate = dayMonthDate(eventDateObject.toISOString().split('T')[0]);
              return (
                <option key={event.eventinstanceid} value={event.eventinstanceid} className="px-6 py-3">{formattedDate} {militaryToCivilian(event.eventtime)}</option>
              );
            })}
          </select>
        </div>
        <h2 className='text-4xl font-bold '>{`Showing: ${titleCase(eventName)}`}</h2>
        <h3 className='text-2xl font-bold text-zinc-700'>
          {date && time ? `${date}, ${time}` : `${date}${time}`}
        </h3>
        <div className='bg-white p-5 rounded-xl mt-2 shadow-xl'>
          {ticketsSold ? (
            <DataGrid
              className='bg-white'
              autoHeight
              disableSelectionOnClick
              rows={doorList}
              columns={columns}
              pageSize={10}
              components={{
                Toolbar: CustomToolbar,
              }} />
          ) : (
            <p className="text-xl font-bold text-red-600">No tickets sold for this show</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoorList;
