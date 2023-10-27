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
import {Checkbox, Button, FormControlLabel} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {dayMonthDate, militaryToCivilian} from '../../../../utils/arrays';
import {useNavigate} from 'react-router-dom';


type EventRow = {
  id?: number;
  desc: string;
  eventid?: number;
  eventinstanceid?: number;
  eventname?: string;
  eventdate?: string;
  eventtime?: string;
  ticketTypes?: string;
  price?: number;
  complementary?: boolean;
  availableSeats?: number;
  imageurl?: string;
  qty?: number;
};

const AdminPurchase = () => {
  const [numberOfRows, setNumberOfRows] = useState(1);
  const emptyRows: EventRow[] = Array.from({length: numberOfRows}, (_, id) => ({
    id,
    desc: '',
  }));
  const [eventData, setEventData] = useState<EventRow[]>(emptyRows);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimesByRowId, setAvailableTimesByRowId] = useState({});
  const [eventList, setEventList] = useState([]);
  const [eventListFull, setEventListFull] = useState([]);
  const [eventListActive, setEventListActive] = useState([]);
  const [ticketsSold, setTicketsSold] = useState(true);
  const [priceByRowId, setPriceByRowId] = useState({});
  const [ticketTypes, setTicketTypes] = useState([]);
  const navigate = useNavigate();

  const addNewRow = () => {
    const maxId = Math.max(-1, ...eventData.map((r) => r.id)) + 1;
    setEventData([...eventData, {id: maxId, desc: ''}]);
  };

  const removeRow = (rowId) => {
    setEventData(eventData.filter((row) => row.id !== rowId));
  };

  const columns = [
    {
      field: 'eventname',
      headerName: 'Event Name',
      width: 250,
      renderCell: (params) => (
        <select onChange={(e) => handleEventChange(e, params.row)}>
          <option>Select Event</option>
          {eventList.map((event) => (
            <option
              key={event.eventinstanceid}
              value={`${event.eventid}-${event.eventname}`}
            >
              {`${event.eventname} - ${event.eventid}`}
            </option>
          ))}
        </select>
      ),
    },
    {
      field: 'eventtime',
      headerName: 'Time',
      width: 200,
      renderCell: (params) => (
        <select
          onChange={(e) => handleTimeChange(e, params.row)}
          disabled={!params.row.eventid}
        >
          <option>Select Time</option>
          {availableTimesByRowId[params.row.id]?.map((event) => {
            const eventDateObject = new Date(
              event.eventdate
                .toString()
                .replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3'),
            );
            eventDateObject.setDate(eventDateObject.getDate() + 1); // fixes off by one error
            const formattedDate = dayMonthDate(
              eventDateObject.toISOString().split('T')[0],
            );
            const formattedTime = militaryToCivilian(event.eventtime);
            return (
              <option key={event.eventinstanceid} value={event.eventinstanceid}>
                {`${formattedDate} - ${formattedTime}`}
              </option>
            );
          })}
        </select>
      ),
    },
    {
      field: 'seatsAvailable',
      headerName: 'Seats Available',
      width: 150,
      renderCell: (params) => <span>{params.row.availableSeats ?? ''}</span>,
    },
    {
      field: 'ticketTypes',
      headerName: 'Ticket Type',
      width: 200,
      renderCell: (params) => (
        <select
          onChange={(e) => handleTicketTypeChange(e, params.row)}
          disabled={!params.row.eventtime}
        >
          <option>Select Type</option>
          {ticketTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.description}
            </option>
          ))}
        </select>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center">
          $
          <input
            type='text'
            value={priceByRowId[params.row.id] || ''}
            onChange={(e) => handlePriceChange(e, params.row)}
            onBlur={(e) => handlePriceBlur(e, params.row)}
            disabled={params.row.complementary || !params.row.ticketTypes}
            className="w-16"
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
          label=''
        />
      ),
    },
    {
      field: 'action',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <Button
          variant='contained'
          color='secondary'
          onClick={() => removeRow(params.row.id)}
        >
          Remove
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_1_URL + '/events/list/active',
        );
        const jsonRes = await response.json();
        const jsonData = jsonRes.data as any[];

        // Deduplicate the events based on eventid
        const uniqueEventIds = Array.from(
          new Set(jsonData.map((event) => event.eventid)),
        );
        let deduplicatedEvents = uniqueEventIds.map((id) =>
          jsonData.find((event) => event.eventid === id),
        );

        // Sort the events in alphabetical order by eventname
        deduplicatedEvents = deduplicatedEvents.sort((a, b) =>
          a.eventname.localeCompare(b.eventname),
        );

        setEventList(deduplicatedEvents);
        setEventListFull(jsonData);
        setEventListActive(deduplicatedEvents.filter((event) => event.active));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchTicketTypes = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_1_URL + '/tickets/validTypes',
          {
            headers: {
              accept: 'application/json',
            },
          },
        );
        const jsonRes = await response.json();
        setTicketTypes(jsonRes.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTicketTypes();
  }, []);

  const updateAvailableTimes = (eventId, rowId) => {
    const matchingEvents = eventListFull.filter((e) => e.eventid === eventId);
    setAvailableTimesByRowId((prevState) => ({
      ...prevState,
      [rowId]: matchingEvents,
    }));
  };

  const handleEventChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    row: EventRow,
  ) => {
    const [eventIdString, eventName] = event.target.value.split('-');
    const eventId = parseInt(eventIdString);

    // If no event is selected, reset the ID and available times.
    if (isNaN(eventId)) {
      const updatedRows = eventData.map((r) => {
        if (r.id === row.id) {
          return {...row, eventid: null, eventname: null};
        }
        return r;
      });
      setEventData(updatedRows);
      setAvailableTimesByRowId((prevState) => ({
        ...prevState,
        [row.id]: [],
      }));
      return;
    }

    const matchingEvent = eventListFull.find((e) => e.eventid === eventId);
    updateAvailableTimes(eventId, row.id);

    const updatedRows = eventData.map((r) => {
      if (r.id === row.id) {
        return {...row, ...matchingEvent};
      }
      return r;
    });
    setEventData(updatedRows);
  };

  const handleTimeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    row: EventRow,
  ) => {
    const eventInstanceID = parseInt(event.target.value);
    const selectedEvent = availableTimesByRowId[row.id]?.find(
      (e) => e.eventinstanceid === eventInstanceID,
    );
    const updatedRows = eventData.map((r) => {
      if (r.id === row.id) {
        return {
          ...row,
          eventtime: selectedEvent?.eventtime,
          availableSeats: selectedEvent?.availableSeats || selectedEvent?.availableseats,
          eventinstanceid: eventInstanceID,
        };
      }
      return r;
    });
    setEventData(updatedRows);
    setSelectedTime(eventInstanceID);
  };

  const handleTicketTypeChange = (event, row) => {
    const ticketTypeId = parseInt(event.target.value);
    const selectedType = ticketTypes.find((type) => type.id === ticketTypeId);

    // Extract the numerical value of the price
    const price = parseFloat(selectedType?.price.replace(/[^\d.-]/g, '')) || 0;

    // Update the eventData
    const updatedRows = eventData.map((r) => {
      if (r.id === row.id) {
        // If complementary, don't change the price
        const finalPrice = row.complementary ? 0 : price;
        return {...row, ticketTypes: selectedType.description, price: finalPrice};
      }
      return r;
    });
    setEventData(updatedRows);

    // If the row is not complementary, update the priceByRowId
    if (!row.complementary) {
      setPriceByRowId((prevState) => ({
        ...prevState,
        [row.id]: price.toFixed(2),
      }));
    }
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
    let newPrice = parseFloat(event.target.value).toFixed(2);
    if (isNaN(parseFloat(newPrice))) {
      newPrice = '0.00';
    }
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
        return {
          ...row,
          complementary: isChecked,
          price: isChecked ? 0 : row.price,
        };
      }
      return r;
    });
    setEventData(updatedRows);

    // Update the priceByRowId to reflect the change in the price
    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: isChecked ? '0.00' : (row.price || 0).toFixed(2), // Set to $0 if complementary
    }));
  };

  const handlePurchase = () => {
    console.log('eventData', eventData);

    const aggregatedCartItems = {};

    eventData.forEach((row) => {
      const key = row.eventinstanceid;
      if (aggregatedCartItems[key]) {
        // If this item already exists in the cart, qty++
        aggregatedCartItems[key].qty += 1;
        aggregatedCartItems[key].price += row.price;
      } else {
        // If this item doesn't exist in the cart, add it
        aggregatedCartItems[key] = {
          product_id: row.eventinstanceid,
          price: row.price,
          desc: row.ticketTypes,
          typeID: 1,
          date: new Date(row.eventdate),
          name: row.eventname,
          product_img_url: row.imageurl,
          qty: 1, // default 1
          payWhatCan: false,
        };
      }
    });

    // Convert to array
    const cartItems = Object.values(aggregatedCartItems);

    // Navigate to the AdminCheckout page and pass the cart items
    navigate('/ticketing/admincheckout', {state: {cartItems}});
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
        <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-zinc-500 mb-14'>
          Purchase Tickets
        </h1>
        <div className='bg-white p-5 rounded-xl mt-2 shadow-xl'>
          {ticketsSold ? (
            <DataGrid
              className='bg-white'
              autoHeight
              disableSelectionOnClick
              rows={eventData}
              columns={columns}
              pageSize={100}
              hideFooter
            />
          ) : (
            <p className='text-xl font-bold text-red-600'>
            No tickets sold for this show
            </p>
          )}
          <div className='mt-4'>
            <Button variant='contained' color='primary' onClick={addNewRow}>
              Add Ticket
            </Button>
          </div>
          <div className='mt-4 text-center'>
            <Button
              variant='contained'
              style={{
                backgroundColor: 'green',
                color: 'white',
                fontSize: 'larger',
                textTransform: 'none',
              }}
              onClick={handlePurchase}
            >
                Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPurchase;
