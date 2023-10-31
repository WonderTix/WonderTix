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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {dayMonthDate, militaryToCivilian} from '../../../../utils/arrays';
import {useLocation, useNavigate} from 'react-router-dom';

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
  const [openDialog, setOpenDialog] = useState(false);
  const [openMissingSelectionDialog, setOpenMissingSelectionDialog] =
    useState(false);
  const navigate = useNavigate();

  const addNewRow = () => {
    const maxId = Math.max(-1, ...eventData.map((r) => r.id)) + 1;
    setEventData([...eventData, {id: maxId, desc: ''}]);

    setPriceByRowId((prevState) => ({...prevState, [maxId]: '0.00'}));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseMissingSelectionDialog = () => {
    setOpenMissingSelectionDialog(false);
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
        console.log('API Response for Events:', jsonData);

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
          `${process.env.REACT_APP_API_1_URL}/tickets/restrictions/`,
        );
        const ticketRestrictionData = await response.json();

        // Find the matching restriction
        const restriction = ticketRestrictionData.data.find(
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
    for (const row of eventData) {
      if (
        !row.eventid ||
        !row.eventtime ||
        !row.ticketTypes ||
        typeof row.price === 'undefined'
      ) {
        setOpenMissingSelectionDialog(true);
        return;
      }
    }
    console.log('eventData', eventData);

    const aggregatedCartItems = {};

    eventData.forEach((row) => {
      const key = `${row.eventinstanceid}-${row.ticketTypes}-${row.price}-${row.eventtime}`;
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
          date: new Date(row.eventdate),
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
          setOpenDialog(true);
          return;
        }
      }
    }

    const cartItems = Object.values(aggregatedCartItems);
    navigate('/ticketing/admincheckout', {state: {cartItems, eventData}});
  };

  return (
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{'Error'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Quantity selected exceeds available seats.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openMissingSelectionDialog}
        onClose={handleCloseMissingSelectionDialog}
      >
        <DialogTitle>{'Error'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Missing selection.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMissingSelectionDialog} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPurchase;
