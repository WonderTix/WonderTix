import {DataGrid} from '@mui/x-data-grid';
import {Checkbox} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import PopUp from '../../PopUp';
import {toDateStringFormat} from '../Event/components/util/EventsUtil';
import {format} from 'date-fns';
import {getAllTicketRestrictions} from './utils/adminApiRequests';
import {useFetchToken} from '../Event/components/ShowingUtils';
import {
  initialTicketTypeRestriction,
  EventRow,
  departmentOptions,
} from './utils/adminCommon';
import {PlusIcon, TrashCanIcon} from '../../Icons';
import IconButton from '../../IconButton';

const AdminPurchase = () => {
  const emptyRows: EventRow[] = [
    {
      id: 0,
      desc: '',
      ticketRestrictionInfo: [initialTicketTypeRestriction],
      department: '',
    },
  ];

  const location = useLocation();
  const initialEventData = location.state?.eventDataFromPurchase || emptyRows;
  const [eventData, setEventData] = useState<EventRow[]>(initialEventData);

  const [availableTimesByRowId, setAvailableTimesByRowId] = useState({});
  const [eventList, setEventList] = useState([]);

  const [readerList, setReaderList] = useState([]);
  const [selectedReader, setSelectedReader] = useState('Select Reader');

  const [eventListFull, setEventListFull] = useState([]);
  const [priceByRowId, setPriceByRowId] = useState({});
  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [isReadersLoading, setIsReadersLoading] = useState(true);
  const [allTicketRestrictions, setAllTicketRestrictions] = useState([]);
  const [openDialog, setDialog] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const {token} = useFetchToken();

  const addNewRow = () => {
    const maxId = Math.max(-1, ...eventData.map((r) => r.id)) + 1;
    setEventData([
      ...eventData,
      {
        id: maxId,
        desc: '',
        ticketRestrictionInfo: [initialTicketTypeRestriction],
        department: '',
      },
    ]);

    setPriceByRowId((prevState) => ({...prevState, [maxId]: ''}));
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const removeRow = (rowId) => {
    setEventData(eventData.filter((row) => row.id !== rowId));
  };

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
          return {
            ...row,
            eventid: null,
            eventname: null,
            eventtime: null,
            ticketRestrictionInfo: [initialTicketTypeRestriction],
          };
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
        delete r.ticketTypes;
        delete r.seatsForType;
        delete r.typeID;
        return {
          ...row,
          ...matchingEvent,
          availableseats: null,
          eventtime: null,
          eventinstanceid: null,
          ticketRestrictionInfo: [initialTicketTypeRestriction],
        };
      }
      return r;
    });
    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: '',
    }));
    setEventData(updatedRows);
  };

  const handleTimeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    row: EventRow,
  ) => {
    const eventInstanceID = parseInt(event.target.value);
    const selectedEventInstance = availableTimesByRowId[row.id]?.find(
      (e) => e.eventinstanceid === eventInstanceID,
    );

    // get matching event for availableseats quantity
    const matchingEvent = eventListFull.find(
      (event) =>
        event.eventid === row.eventid &&
        event.eventinstanceid === eventInstanceID,
    );

    // get ticket restrictions for event instance
    const eventInstanceTicketRestrictions = allTicketRestrictions.filter(
      (restriction) => restriction.eventinstanceid === eventInstanceID,
    );

    const updatedRows = eventData.map((r) => {
      if (r.id === row.id) {
        delete r.ticketTypes;
        delete r.seatsForType;
        delete r.typeID;
        return {
          ...row,
          availableseats: matchingEvent.availableseats,
          eventtime: selectedEventInstance?.eventtime,
          eventinstanceid: eventInstanceID,
          ticketRestrictionInfo: eventInstanceTicketRestrictions,
        };
      }
      return r;
    });
    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: 0,
    }));
    setEventData(updatedRows);
  };

  const handleTicketTypeChange = async (event, row) => {
    const ticketTypeId = parseInt(event.target.value);
    const currentTicketRestriction = row.ticketRestrictionInfo.find(
      (restriction) => ticketTypeId === restriction.tickettypeid,
    );
    const price = parseFloat(currentTicketRestriction.price);
    const fee = parseFloat(currentTicketRestriction.fee);

    // determine how many seats for current event instance
    const {ticketlimit, ticketssold} = currentTicketRestriction;
    const seatsForType = ticketlimit - ticketssold;

    const updatedRows = eventData.map((r) => {
      if (r.id === row.id) {
        return {
          ...r,
          ticketTypes: currentTicketRestriction.description,
          price: row.complimentary ? 0 : price,
          fee: row.complimentary ? 0 : fee,
          typeID: ticketTypeId,
          seatsForType: seatsForType,
        };
      }
      return r;
    });
    setEventData(updatedRows);

    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: !row.complimentary ? price.toFixed(2) : '0.00',
    }));
  };

  const handlePriceChange = (event, row) => {
    const newPriceString = event.target.value;

    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: newPriceString,
    }));
  };

  const handlePriceBlur = (event, row) => {
    const newPrice = parseFloat(event.target.value);
    const currentTicketRestriction = row.ticketRestrictionInfo.find(
      (restriction) => row.typeID === restriction.tickettypeid,
    );

    const priceIsZero = isNaN(newPrice) || newPrice === 0;

    // Format the value once the user moves out of the input
    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: priceIsZero ? '0.00' : newPrice.toFixed(2),
    }));

    const updatedEventData = eventData.map((r) => {
      if (r.id === row.id) {
        return {
          ...r,
          price: priceIsZero ? 0 : newPrice,
          fee: priceIsZero ? 0 : currentTicketRestriction.fee,
          ...(priceIsZero && {complimentary: true}),
          ...(!priceIsZero && {
            department: '',
            complimentary: false,
          }),
        };
      }
      return r;
    });
    setEventData(updatedEventData);
  };

  const handleComplimentaryChange = (event, row) => {
    const isChecked = event.target.checked;
    const currentTicketRestriction = row.ticketRestrictionInfo.find(
      (restriction) => row.typeID === restriction.tickettypeid,
    );
    const updatedRows = eventData.map((r) => {
      if (r.id === row.id) {
        return {
          ...row,
          complimentary: isChecked,
          department: isChecked ? row.department : '',
          price: isChecked ? 0 : currentTicketRestriction.price,
          fee: isChecked ? 0 : currentTicketRestriction.fee,
        };
      }
      return r;
    });
    setEventData(updatedRows);

    // Update the priceByRowId to reflect the change in the price
    setPriceByRowId((prevState) => ({
      ...prevState,
      [row.id]: isChecked
        ? '0.00'
        : (currentTicketRestriction.price || 0).toFixed(2),
    }));
  };

  const handleDepartmentChange = (event, row) => {
    const newDepartment = event.target.value;
    const updatedRows = eventData.map((r) => {
      if (r.id === row.id) {
        return {...r, department: newDepartment};
      }
      return r;
    });
    setEventData(updatedRows);
  };

  const handlePurchase = (toReader: boolean) => {
    if (eventData.length === 0) {
      setErrMsg('Cart is empty.');
      setDialog(true);
      return;
    }

    for (const row of eventData) {
      if (
        !row.eventid ||
        !row.eventtime ||
        !row.ticketTypes ||
        typeof row.price === 'undefined'
      ) {
        setErrMsg('Missing selection.');
        setDialog(true);
        return;
      }

      if (row.price < 0) {
        setErrMsg('All prices must be $0.00 or greater');
        setDialog(true);
        return;
      }
    }

    // qty selection for showing doesn't exceed available seats for showing
    const eventInstanceQtys = {};
    eventData.forEach((row) => {
      if (eventInstanceQtys[row.eventinstanceid]) {
        eventInstanceQtys[row.eventinstanceid] += 1;
      } else {
        eventInstanceQtys[row.eventinstanceid] = 1;
      }
    });

    for (const eventinstanceid in eventInstanceQtys) {
      if (
        Object.prototype.hasOwnProperty.call(eventInstanceQtys, eventinstanceid)
      ) {
        const matchingEventInstance = eventData.find(
          (event) => event.eventinstanceid == Number(eventinstanceid),
        );
        if (
          eventInstanceQtys[eventinstanceid] >
          matchingEventInstance.availableseats
        ) {
          setErrMsg('Quantity selected for showing exceeds available seats.');
          setDialog(true);
          return;
        }
      }
    }

    const aggregatedCartItems = {};
    eventData.forEach((row) => {
      const key = `${row.eventinstanceid}-${row.ticketTypes}-${row.price}-${row.eventtime}-Department ${row.department}`;
      const showingDate = new Date(
        `${toDateStringFormat(row.eventdate)}T${row.eventtime
          .split('T')[1]
          .slice(0, 8)}`,
      );
      if (aggregatedCartItems[key]) {
        // If this item already exists in the cart, qty++
        aggregatedCartItems[key].qty += 1;
      } else {
        // If this item doesn't exist in the cart, add it
        aggregatedCartItems[key] = {
          product_id: row.eventinstanceid,
          eventId: row.eventid,
          price: row.price,
          fee: row.fee,
          desc: row.ticketTypes,
          typeID: row.typeID,
          date: showingDate,
          name: row.eventname,
          product_img_url: row.imageurl,
          qty: 1, // default 1
          payWhatCan: false,
          department: row.department,
        };
      }
    });

    // qty selection for ticket type doesn't exceed available tickets for ticket type
    for (const key in aggregatedCartItems) {
      if (Object.prototype.hasOwnProperty.call(aggregatedCartItems, key)) {
        const item = aggregatedCartItems[key];
        const correspondingRow = eventData.find(
          (row) =>
            row.eventinstanceid === item.product_id &&
            row.typeID === item.typeID,
        );

        if (item.qty > correspondingRow.seatsForType) {
          setErrMsg(
            'Quantity selected for ticket type exceeds available seats.',
          );
          setDialog(true);
          return;
        }
      }
    }

    const cartItems = Object.values(aggregatedCartItems);
    if (toReader) {
      // we need to do this in this file so we can navigate to the
      // directory based on the payment intent we create here

      if (!token) return;

      fetch(
        // create intent
        `${process.env.REACT_APP_API_2_URL}/events/reader-intent`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ticketCartItems: cartItems}),
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          response
            .json()
            .then((result) => {
              const readerID = selectedReader;
              const paymentIntentID = result.id;
              const clientSecret = result.secret;
              navigate(paymentIntentID, {
                state: {cartItems, paymentIntentID, clientSecret, readerID},
              });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate('/ticketing/admincheckout', {state: {cartItems, eventData}});
    }
  };

  // TABLE COLUMN DEFINITION
  const columns = [
    {
      field: 'eventname',
      headerName: 'Event Name - ID',
      width: 200,
      renderCell: (params) => (
        <div className='truncate w-full'>
          <select
            className='w-full'
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
        </div>
      ),
    },
    {
      field: 'eventtime',
      headerName: 'Date - Time',
      width: 200,
      renderCell: (params) => (
        <div className='truncate w-full'>
          <select
            className='w-full'
            value={
              params.row.eventtime ? params.row.eventinstanceid : 'Select Time'
            }
            onChange={(e) => handleTimeChange(e, params.row)}
            disabled={!params.row.eventid}
          >
            <option>Select Time</option>
            {availableTimesByRowId[params.row.id]?.map((event) => {
              const dateTime = new Date(
                `${toDateStringFormat(event.eventdate)}T${event.eventtime
                  .split('T')[1]
                  .slice(0, 8)}`,
              );
              const formattedDateTime = format(
                dateTime,
                'eee, MMM dd yyyy - h:mm a',
              );
              return (
                <option
                  key={event.eventinstanceid}
                  value={event.eventinstanceid}
                >
                  {formattedDateTime}
                </option>
              );
            })}
          </select>
        </div>
      ),
    },
    {
      field: 'ticketTypes',
      headerName: 'Ticket Type',
      width: 200,
      renderCell: (params) => (
        <div className='truncate w-full'>
          <select
            className='w-full'
            value={params.row.ticketTypes ? params.row.typeID : 'Select Type'}
            onChange={(e) => handleTicketTypeChange(e, params.row)}
            disabled={!params.row.eventtime}
          >
            <option>Select Type</option>
            {params.row.ticketRestrictionInfo.map((restriction) => (
              <option
                key={restriction.tickettypeid}
                value={restriction.tickettypeid}
              >
                {restriction.description}
              </option>
            ))}
          </select>
        </div>
      ),
    },
    {
      field: 'seatsAvailable',
      headerName: 'Seats',
      width: 80,
      renderCell: (params) => <span>{params.row.seatsForType}</span>,
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
            disabled={!params.row.ticketTypes}
            className='w-16'
          />
        </div>
      ),
    },
    {
      field: 'complimentary',
      headerName: 'Comp',
      width: 220,
      renderCell: (params) => (
        <>
          <Checkbox
            checked={params.row.complimentary || false}
            onChange={(e) => handleComplimentaryChange(e, params.row)}
            aria-label={
              params.row.complimentary ? 'Uncheck comp' : 'Check comp'
            }
          />
          <select
            className='w-full'
            value={params.row.department || ''}
            disabled={!params.row.complimentary}
            onChange={(e) => handleDepartmentChange(e, params.row)}
          >
            <option value=''>No Department</option>
            {Object.keys(departmentOptions).map((value, index) => (
              <option key={index} value={value}>
                {departmentOptions[value]}
              </option>
            ))}
          </select>
        </>
      ),
    },
    {
      field: 'action',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <IconButton
          onClick={() => removeRow(params.row.id)}
          hoverColor='red'
          tooltip='Remove ticket'
        >
          <TrashCanIcon className='h-5 w-5' strokeWidth={2} />
        </IconButton>
      ),
    },
  ];

  const reader_handleChange = (event) => {
    setSelectedReader(event.target.value);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_2_URL + '/event-instance/list/allevents',
        );
        const jsonData = await response.json();

        // Deduplicate the events based on eventid
        const deduplicatedEvents = Array.from(
          new Set(jsonData.map((e) => e.eventid)),
        )
          .map((eventid) => jsonData.find((event) => event.eventid === eventid))
          .sort((a, b) => b.eventid - a.eventid);

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

  useEffect(() => {
    const fetchAllTicketRestrictions = async () => {
      const allTicketRestrictions = await getAllTicketRestrictions();
      if (allTicketRestrictions) {
        setAllTicketRestrictions(allTicketRestrictions);
      }
    };

    void fetchAllTicketRestrictions();
  }, []);

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        if (!token) return;
        const response = await fetch(
          process.env.REACT_APP_API_2_URL + `/order/readers`,
          {
            credentials: 'include',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) throw response;

        const readers = await response.json();
        setReaderList(readers.data);
      } catch (error) {
        console.error(error.message);
        setErrMsg(error.message);
        setDialog(true);
        setIsReadersLoading(false);
      }
    };
    fetchReaders();
  }, [token]);

  useEffect(() => {
    if (readerList.length > 0) {
      setSelectedReader(readerList[0].id); // Default to first reader found
    }
  }, [readerList]);

  return (
    <div className='w-full h-screen absolute'>
      <div className='w-full h-screen overflow-x-hidden absolute '>
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-zinc-500 mb-14'>
            Purchase Tickets
          </h1>
          <div className='bg-white p-5 rounded-xl mt-2 shadow-xl'>
            {isEventsLoading ? (
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
            <button
              className='w-full inline-flex items-center justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 mt-2 bg-white text-zinc-700 hover:bg-gray-50'
              onClick={addNewRow}
              aria-label='Add ticket'
            >
              <PlusIcon className='h-6 w-6' strokeWidth={2} />
            </button>
            <div className='mt-4 text-center'>
              <button
                className='bg-green-600 px-8 py-1 text-white rounded-xl hover:bg-green-700 disabled:opacity-40 m-2'
                onClick={() => handlePurchase(false)}
              >
                Proceed to Checkout
              </button>
            </div>
            <div className='mt-4 text-center'>
              <label htmlFor='reader-select' className='font-semibold'>
                Select a Reader
              </label>
              <select
                id='reader-select'
                value={selectedReader}
                onChange={reader_handleChange}
              >
                {readerList.map((reader) => (
                  <option key={reader.id} value={reader.id}>
                    {reader.id}
                  </option>
                ))}
              </select>
            </div>
            <div className='mt-4 text-center'>
              <button
                className='bg-green-600 px-8 py-1 text-white rounded-xl hover:bg-green-700 disabled:opacity-40 m-2'
                onClick={() => handlePurchase(true)}
              >
                Send to Reader
              </button>
            </div>
          </div>
        </div>
      </div>
      {openDialog && (
        <PopUp
          title='Error'
          message={errMsg}
          handleProceed={handleCloseDialog}
          handleClose={handleCloseDialog}
          success={false}
        />
      )}
    </div>
  );
};

export default AdminPurchase;
