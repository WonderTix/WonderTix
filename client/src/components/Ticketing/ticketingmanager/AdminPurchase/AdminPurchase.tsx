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
import {
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import PopUp from '../../PopUp';
import {toDateStringFormat} from '../showings/ShowingUpdated/util/EventsUtil';
import {format, parse} from 'date-fns';

export type EventRow = {
  id?: number;
  desc: string;
  eventid?: number;
  eventinstanceid?: number;
  eventname?: string;
  eventdate?: string;
  eventtime?: string;
  ticketTypes?: string;
  price?: number;
  complimentary?: boolean;
  availableSeats?: number;
  seatsForType?: number;
  imageurl?: string;
  qty?: number;
  typeID?: number;
};

const AdminPurchase = () => {
  const emptyRows: EventRow[] = [{id: 0, desc: ''}];
  const location = useLocation();
  const initialEventData = location.state?.eventDataFromPurchase || emptyRows;
  const [eventData, setEventData] = useState<EventRow[]>(initialEventData);
  const [availableTimesByRowId, setAvailableTimesByRowId] = useState({});
  const [eventList, setEventList] = useState([]);
  const [eventListFull, setEventListFull] = useState([]);
  const [priceByRowId, setPriceByRowId] = useState({});
  const [ticketTypes, setTicketTypes] = useState([]);
  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [isTicketTypesLoading, setIsTicketTypesLoading] = useState(true);
  const [openDialog, setDialog] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const addNewRow = () => {
    const maxId = Math.max(-1, ...eventData.map((r) => r.id)) + 1;
    setEventData([...eventData, {id: maxId, desc: ''}]);

    setPriceByRowId((prevState) => ({...prevState, [maxId]: '0.00'}));
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  useEffect(() => {
    if (location.state?.eventDataFromPurchase) {
      setEventData(location.state.eventDataFromPurchase);
      const initialAvailableTimes = {};
      location.state.eventDataFromPurchase.forEach((row) => {
        if (row.eventid) {
          initialAvailableTimes[row.id] = eventListFull.filter(
            (e) => e.eventid === row.eventid,
          );
        }
      });
      setAvailableTimesByRowId(initialAvailableTimes);

      const initialPrices = {};
      location.state.eventDataFromPurchase.forEach((row) => {
        initialPrices[row.id] = (row.price || 0).toFixed(2);
      });
      setPriceByRowId(initialPrices);
    }
  }, [location.state?.eventDataFromPurchase, eventListFull]);

  const removeRow = (rowId) => {
    setEventData(eventData.filter((row) => row.id !== rowId));
  };

  const columns = [
    {
      field: 'eventname',
      headerName: 'Event Name - ID',
      width: 200,
      renderCell: (params) => (
        <select
          value={`${params.row.eventid}-${params.row.eventname}`}
          onChange={(e) => handleEventChange(e, params.row)}
        >
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
      headerName: 'Date - Time',
      width: 200,
      renderCell: (params) => (
        <select
          value={
            params.row.eventtime ? params.row.eventinstanceid : 'Select Time'
          }
          onChange={(e) => handleTimeChange(e, params.row)}
          disabled={!params.row.eventid}
        >
          <option>Select Time</option>
          {availableTimesByRowId[params.row.id]?.map((event) => {
            const dateTimeString = `${event.eventdate}T${event.eventtime}`;
            const adjustedDateTimeString = dateTimeString.replace('+00', '');
            const dateTime = parse(adjustedDateTimeString, 'yyyyMMdd\'T\'HH:mm:ss.SSS', new Date());
            const formattedDate = format(dateTime, 'eee, MMM dd yyyy');
            const formattedTime = format(dateTime, 'hh:mm a');
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
      field: 'ticketTypes',
      headerName: 'Ticket Type',
      width: 200,
      renderCell: (params) => (
        <select
          value={params.row.ticketTypes ? params.row.typeID : 'Select Type'}
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
      field: 'seatsAvailable',
      headerName: 'Seats',
      width: 80,
      renderCell: (params) => (
        <span>
          {params.row.typeID === 1
            ? params.row.availableSeats
            : params.row.seatsForType}
        </span>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      renderCell: (params) => (
        <div className='flex items-center'>
          $
          <input
            type='text'
            value={priceByRowId[params.row.id] || ''}
            onChange={(e) => handlePriceChange(e, params.row)}
            onBlur={(e) => handlePriceBlur(e, params.row)}
            disabled={params.row.complimentary || !params.row.ticketTypes}
            className='w-16'
          />
        </div>
      ),
    },
    {
      field: 'complimentary',
      headerName: 'Comp',
      width: 60,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={params.row.complimentary || false}
              onChange={(e) => handleComplimentaryChange(e, params.row)}
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
        <button
          className='bg-red-500 px-2 py-1 text-white rounded-xl hover:bg-red-600 disabled:opacity-40 m-2'
          onClick={() => removeRow(params.row.id)}
        >
          Remove
        </button>
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
        const deduplicatedEvents = Array.from(
          new Set(jsonData.map((e) => e.eventid)),
        )
          .map((eventid) => jsonData.find((event) => event.eventid === eventid))
          .sort((a, b) => a.eventname.localeCompare(b.eventname));

        setEventList(deduplicatedEvents);
        setEventListFull(jsonData);
        setIsEventsLoading(false);

        const initialAvailableTimes = {};
        initialEventData.forEach((row) => {
          if (row.eventid) {
            initialAvailableTimes[row.id] = jsonData.filter(
              (e) => e.eventid === row.eventid,
            );
          }
        });
        setAvailableTimesByRowId(initialAvailableTimes);
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
        setIsTicketTypesLoading(false);
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
        return {
          ...row,
          ...matchingEvent,
          eventtime: null,
          eventinstanceid: null,
        };
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
          availableSeats:
            selectedEvent?.availableSeats || selectedEvent?.availableseats,
          eventinstanceid: eventInstanceID,
        };
      }
      return r;
    });
    setEventData(updatedRows);
  };

  const handleTicketTypeChange = async (event, row) => {
    const ticketTypeId = parseInt(event.target.value);
    const selectedType = ticketTypes.find((type) => type.id === ticketTypeId);

    // Extract the numerical value of the price
    const price = parseFloat(selectedType?.price.replace(/[^\d.-]/g, '')) || 0;

    let seatsForType;

    if (row.eventinstanceid) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_2_URL}/ticket-restriction`,
        );
        if (!response.ok) {
          throw response;
        }
        const ticketRestrictionData = await response.json();

        // Find the matching restriction
        const restriction = ticketRestrictionData.find(
          (tr) =>
            tr.eventinstanceid === row.eventinstanceid &&
            tr.tickettypeid === ticketTypeId,
        );

        // Calculate seatsForType value
        seatsForType = restriction
          ? restriction.ticketlimit - restriction.ticketssold
          : 0;
      } catch (error) {
        console.error('Error fetching ticket restrictions:', error);
      }
    }

    const updatedRows = eventData.map((r) => {
      if (r.id === row.id) {
        return {
          ...r,
          ticketTypes: selectedType.description,
          price: row.complimentary ? 0 : price,
          typeID: ticketTypeId,
          seatsForType: seatsForType,
        };
      }
      return r;
    });
    setEventData(updatedRows);

    if (!row.complimentary) {
      setPriceByRowId((prevState) => ({
        ...prevState,
        [row.id]: price.toFixed(2),
      }));
    }
  };

  const handlePriceChange = (event, row) => {
    if (row.complimentary) return; // If complimentary, no changes allowed
    const newPriceString = event.target.value;

    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: newPriceString,
    }));
  };

  const handlePriceBlur = (event, row) => {
    const newPrice = parseFloat(event.target.value);

    // Format the value once the user moves out of the input
    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: isNaN(newPrice) ? '0.00' : newPrice.toFixed(2),
    }));

    const updatedEventData = eventData.map((r) => {
      if (r.id === row.id) {
        return {
          ...r,
          price: isNaN(newPrice) ? 0 : newPrice,
        };
      }
      return r;
    });
    setEventData(updatedEventData);
  };

  const handleComplimentaryChange = (event, row) => {
    const isChecked = event.target.checked;
    const updatedRows = eventData.map((r) => {
      if (r.id === row.id) {
        return {
          ...row,
          complimentary: isChecked,
          price: isChecked ? 0 : row.price,
        };
      }
      return r;
    });
    setEventData(updatedRows);

    // Update the priceByRowId to reflect the change in the price
    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: isChecked ? '0.00' : (row.price || 0).toFixed(2), // Set to $0 if complimentary
    }));
  };

  const handlePurchase = () => {
    if (eventData.length === 0) {
      setDialog(true);
      setErrMsg('Cart is empty.');
      return;
    }
    for (const row of eventData) {
      if (
        !row.eventid ||
        !row.eventtime ||
        !row.ticketTypes ||
        typeof row.price === 'undefined'
      ) {
        setDialog(true);
        setErrMsg('Missing selection.');
        return;
      }
    }

    const aggregatedCartItems = {};

    eventData.forEach((row) => {
      const key = `${row.eventinstanceid}-${row.ticketTypes}-${row.price}-${row.eventtime}`;
      const showingDate = new Date(
        `${toDateStringFormat(row.eventdate)} ${row.eventtime.slice(0, 8)}`,
      );
      if (aggregatedCartItems[key]) {
        // If this item already exists in the cart, qty++
        aggregatedCartItems[key].qty += 1;
      } else {
        // If this item doesn't exist in the cart, add it
        aggregatedCartItems[key] = {
          product_id: row.eventinstanceid,
          price: row.price,
          desc: row.ticketTypes,
          typeID: row.typeID,
          date: showingDate,
          name: row.eventname,
          product_img_url: row.imageurl,
          qty: 1, // default 1
          payWhatCan: false,
        };
      }
    });

    for (const key in aggregatedCartItems) {
      if (Object.prototype.hasOwnProperty.call(aggregatedCartItems, key)) {
        const item = aggregatedCartItems[key];
        const correspondingRow = eventData.find(
          (row) =>
            row.eventinstanceid === item.product_id &&
            row.typeID === item.typeID,
        );
        const available =
          correspondingRow.typeID === 1
            ? correspondingRow.availableSeats
            : correspondingRow.seatsForType;

        if (item.qty > available) {
          setDialog(true);
          setErrMsg('Quantity selected exceeds available seats.');
          return;
        }
      }
    }

    const cartItems = Object.values(aggregatedCartItems);
    navigate('/ticketing/admincheckout', {state: {cartItems, eventData}});
  };

  return (
    <div className="w-full h-screen absolute">
      <div className='w-full h-screen overflow-x-hidden absolute '>
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-zinc-500 mb-14'>
            Purchase Tickets
          </h1>
          <div className='bg-white p-5 rounded-xl mt-2 shadow-xl'>
            {isEventsLoading || isTicketTypesLoading ? (
              <p>Loading...</p>
            ) : (
              <DataGrid
                className='bg-white'
                autoHeight
                disableSelectionOnClick
                rows={eventData}
                columns={columns}
                pageSize={100}
                hideFooter
              />
            )}
            <div className='mt-4'>
              <button
                className='bg-blue-500 px-2 py-1 text-white rounded-xl hover:bg-blue-600 disabled:opacity-40 m-2'
                onClick={addNewRow}
              >
                Add Ticket
              </button>
            </div>
            <div className='mt-4 text-center'>
              <button
                className='bg-green-600 px-8 py-1 text-white rounded-xl hover:bg-green-700 disabled:opacity-40 m-2'
                onClick={handlePurchase}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        openDialog && (
          <PopUp
            title="Error"
            message={errMsg}
            handleProceed={handleCloseDialog}
            handleClose={handleCloseDialog}
            success={false}
          />
        )
      }
    </div>
  );
};

export default AdminPurchase;
