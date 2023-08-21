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
import {DataGrid, GridCellParams, useGridApiContext, useGridApiRef} from '@mui/x-data-grid';
import {Checkbox, Button} from '@mui/material';
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
 * columns uses name, vip, donorbadge, accomodations, num_tickets, arrived and renders
 */
const columns = [
  {field: 'firstname', headerName: 'First Name', width: 120},
  {field: 'lastname', headerName: 'Last Name', width: 120},
  {field: 'num_tickets', headerName: 'Tickets', width: 100},
  // TODO: Fix link from renderCheckin to checkInGuest
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
        const jsonRes = await response.json();
        const jsonData = jsonRes.data as any[];
        // Filter only active events
        const activeEvents = jsonData.filter((event) => event.active);
        // Deduplicate the events based on eventname for full event list
        const uniqueEventNames = Array.from(new Set(jsonData.map((event) => event.eventname)));
        const deduplicatedEvents = uniqueEventNames.map((name) => jsonData.find((event) => event.eventname === name));
        // Deduplicate the active events
        const uniqueEventNamesActive = Array.from(new Set(activeEvents.map((event) => event.eventname)));
        const deduplicatedEventsActive = uniqueEventNamesActive.map((name) => activeEvents.find((event) => event.eventname === name));
        setEventList(deduplicatedEvents);
        setEventListFull(jsonData);
        // Set the new state variables for active events
        setEventListActive(deduplicatedEventsActive);
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
    const eventIId = parseInt(event.target.value);
    getDoorList(eventIId);
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
              // eslint-disable-next-line max-len
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
      const jsonRes = await response.json();
      const jsonData = jsonRes.data;
      const doorListData = jsonData.map((item, index) => {
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
          num_tickets: row[12],
          // TODO: hook arrived with redeemed vaue
          arrived: false,
          vip: row[3] === 't',
          donorbadge: row[4] === 't',
          accommodations: row[5],
        };
      }).filter(Boolean);

      setDoorList(doorListData);
      const rowString = jsonData[0].row.slice(1, -1);
      const rowParts = rowString.split(',');
      const eventNameFromData = rowParts[7].replace(/"/g, '');
      const eventDate = rowParts[9];
      const eventDateObject = new Date(eventDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
      eventDateObject.setDate(eventDateObject.getDate() + 1); // Add one day
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
          <label className='text-sm text-zinc-500 mr-2' htmlFor="enable-inactive-events">Enable inactive events</label>
          <Checkbox
            id="enable-inactive-events"
            color='primary'
            checked={showInactiveEvents}
            onChange={(e) => setShowInactiveEvents(e.target.checked)}
          />
        </div>
        <div className='text-sm text-zinc-500 ml-1 mb-2'>Choose Event</div>
        <select id="event-select" className="select w-full max-w-xs bg-white border border-zinc-300 rounded-lg p-3 text-zinc-600 mb-7" onChange={handleEventChange}>
          <option className="px-6 py-3">Select Event</option>
          {(showInactiveEvents ? eventList : eventListActive).map((event) => (
            <option key={event.eventinstanceid} value={event.eventid} className="px-6 py-3">{event.eventname}</option>
          ))}
        </select>
        <div className='text-sm text-zinc-500 ml-1 mb-2'>Choose Time</div>
        <select id="time-select" className="select w-full max-w-xs bg-white border border-zinc-300 rounded-lg p-3 text-zinc-600 mb-7" onChange={handleTimeChange} disabled={!selectedEventId}>
          <option className="px-6 py-3">Select Time</option>
          {availableTimesEvents.map((event) => {
            const eventDateObject = new Date(event.eventdate.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
            eventDateObject.setDate(eventDateObject.getDate() + 1); // Add one day
            const formattedDate = dayMonthDate(eventDateObject.toISOString().split('T')[0]);
            return (
              <option key={event.eventinstanceid} value={event.eventinstanceid} className="px-6 py-3">{formattedDate} {militaryToCivilian(event.eventtime)}</option>
            );
          })}
        </select>
        <div className='text-4xl font-bold '>{`Showing: ${titleCase(eventName)}`}</div>
        <div className='text-2xl font-bold text-zinc-700'>
          {date && time ? `${date}, ${time}` : `${date}${time}`}
        </div>
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
            <div className="text-xl font-bold text-red-600">No tickets sold for this show</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoorList;
