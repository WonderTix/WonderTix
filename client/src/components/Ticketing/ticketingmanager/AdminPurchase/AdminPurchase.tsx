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

// import DataGrid from 'react-data-grid';
import {DataGrid, GridCellParams, useGridApiContext} from '@mui/x-data-grid';
import {Checkbox, Button, FormControlLabel} from '@mui/material';
import React, {useEffect, useState} from 'react';
// import RequireLogin from './RequireLogin';
import {titleCase, dayMonthDate, militaryToCivilian} from '../../../../utils/arrays';
import {useAuth0} from '@auth0/auth0-react';
import {Link} from 'react-router-dom';

type EventRow = {
  id?: number;
  eventid?: number;
  eventname?: string;
  ticketTypes?: string;
  price?: number;
  complementary?: boolean;
};

const AdminPurchase = () => {
  const emptyRows: EventRow[] = Array.from({length: 10}, (_, id) => ({id}));
  const [eventData, setEventData] = useState<EventRow[]>(emptyRows);
  const [events, setEvents] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const {getAccessTokenSilently} = useAuth0();
  const [availableTimesByRowId, setAvailableTimesByRowId] = useState({});
  const [eventList, setEventList] = useState([]);
  const [eventListFull, setEventListFull] = useState([]);
  const [eventListActive, setEventListActive] = useState([]);
  const [ticketsSold, setTicketsSold] = useState(true);
  const [priceByRowId, setPriceByRowId] = useState({});


  const columns = [
    {
      field: 'eventname',
      headerName: 'Event Name',
      width: 250,
      renderCell: (params) => (
        <select onChange={(e) => handleEventChange(e, params.row)}>
          <option>Select Event</option>
          {eventList.map((event) => (
            <option key={event.eventinstanceid} value={event.eventid}>
              {event.eventname}
            </option>
          ))}
        </select>
      ),
    },
    {field: 'eventid', headerName: 'ID', width: 50},
    {
      field: 'eventtime',
      headerName: 'Time',
      width: 150,
      renderCell: (params) => (
        <select
          onChange={(e) => handleTimeChange(e, params.row)}
          disabled={!params.row.eventid}
        >
          <option>Select Time</option>
          {availableTimesByRowId[params.row.id]?.map((event) => (
            <option key={event.eventinstanceid} value={event.eventinstanceid}>
              {militaryToCivilian(event.eventtime)}
            </option>
          ))}
        </select>
      ),
    },
    {
      field: 'ticketTypes',
      headerName: 'Ticket Type',
      width: 150,
      renderCell: (params) => (
        <select disabled={!params.row.eventtime}>  {/* Disabled if time not selected */}
          <option>Select Type</option>
          <option value="general">General</option>
          <option value="vip">VIP</option>
        </select>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      renderCell: (params) => (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span>$</span>
          <input
            type="text"
            value={priceByRowId[params.row.id] || ''}
            onChange={(e) => handlePriceChange(e, params.row)}
            onBlur={(e) => handlePriceBlur(e, params.row)}
            disabled={!params.row.eventid || params.row.complementary} // Disable if no event or complementary is true
            style={{width: '60px'}}
          />
        </div>
      ),
    },
    {
      field: 'complementary',
      headerName: 'Complementary',
      width: 150,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={params.row.complementary || false}
              onChange={(e) => handleComplementaryChange(e, params.row)}
            />
          }
          label=""
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_1_URL + '/events/list/active');
        const jsonRes = await response.json();
        const jsonData = jsonRes.data as any[];

        // Deduplicate the events based on eventid
        const uniqueEventIds = Array.from(new Set(jsonData.map((event) => event.eventid)));
        let deduplicatedEvents = uniqueEventIds.map((id) => jsonData.find((event) => event.eventid === id));

        // Sort the events in alphabetical order by eventname
        deduplicatedEvents = deduplicatedEvents.sort((a, b) => a.eventname.localeCompare(b.eventname));

        setEventList(deduplicatedEvents);
        setEventListFull(jsonData);
        setEventListActive(deduplicatedEvents.filter((event) => event.active));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchEvents();
  }, []);

  const updateAvailableTimes = (eventId, rowId) => {
    const matchingEvents = eventListFull.filter((e) => e.eventid === eventId);
    setAvailableTimesByRowId((prevState) => ({
      ...prevState,
      [rowId]: matchingEvents,
    }));
  };

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>, row: EventRow) => {
    const eventId = parseInt(event.target.value);
    const matchingEvent = eventListFull.find((e) => e.eventid === eventId);
    updateAvailableTimes(eventId, row.id);
    // Create a new array with the updated row data
    const updatedRows = eventData.map((r) => {
      if (r.id === row.id) {
        return {...row, ...matchingEvent};
      }
      return r;
    });
    setEventData(updatedRows);
  };

  const handleTimeChange = (event, row) => {
    const eventInstanceID = parseInt(event.target.value);

    // You can update the state based on the selected time and the row data.
    // For example, you might want to set the selected time for the current row.
    setSelectedTime(eventInstanceID);
  };

  const handlePriceChange = (event, row) => {
    if (row.complementary) return; // If complementary, no changes allowed
    const newPrice = event.target.value;
    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: newPrice,
    }));
  };

  const handlePriceBlur = (event, row) => {
    const newPrice = parseFloat(event.target.value).toFixed(2);
    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: newPrice,
    }));
  };

  const handleComplementaryChange = (event, row) => {
    const isChecked = event.target.checked;
    // Update row with complementary flag
    const updatedRows = eventData.map((r) => {
      if (r.id === row.id) {
        return {...row, complementary: isChecked, price: isChecked ? 0 : row.price};
      }
      return r;
    });
    setEventData(updatedRows);
    // Also update the priceByRowId to reflect the change in the price
    if (isChecked) {
      setPriceByRowId((prevState) => ({
        ...prevState,
        [row.id]: '0.00', // Set to $0 if complementary
      }));
    }
  };

  const handlePurchase = () => {
    // Redirect to checkout page
  };

  const getEventData = async (event) => {
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
      const eventData = jsonData.map((item, index) => {
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

      setEventData(eventData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-zinc-500 mb-14'>Purchase Tickets</h1>
        </div>
        <div className='bg-white p-5 rounded-xl mt-2 shadow-xl'>
          {ticketsSold ? (
            <DataGrid
              className='bg-white'
              autoHeight
              disableSelectionOnClick
              rows={eventData}
              columns={columns}
              pageSize={10} />
          ) : (
            <div className="text-xl font-bold text-red-600">No tickets sold for this show</div>
          )}
          {/* Add the purchase button here */}
          <Link to="/ticketing/admincheckout">
            <Button variant="contained" color="primary">
              Proceed To Purchase
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPurchase;
