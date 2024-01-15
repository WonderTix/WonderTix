import React, {ReactElement, useEffect, useState} from 'react';
import {DataGrid, GridCellParams, useGridApiContext} from '@mui/x-data-grid';
import {Checkbox} from '@mui/material';
import ActivenessGroupToggle from '../../ActivenessGroupToggle';
import {titleCase} from '../../../../utils/arrays';
import {useAuth0} from '@auth0/auth0-react';
import {toDateStringFormat} from '../Event/components/util/EventsUtil';
import format from 'date-fns/format';

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
    const res = await fetch(
      process.env.REACT_APP_API_2_URL + `/events/checkin`,
      {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({isCheckedIn, ticketID}),
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to check in guest. HTTP status: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error(err.message);
  }
};

const renderCheckbox = (params: GridCellParams) => (
  <Checkbox checked={params.value as boolean} disabled color='info' />
);

/**
 * renders in the check in for guests
 *
 * @param {GridCellParams} params
 * @returns edits the checkInGuest value
 */
const renderCheckin = (params: GridCellParams) => {
  const isDisabled = params.getValue(params.id, 'lastname') === 'OPEN SEATS';

  return (
    <Checkbox
      color='primary'
      defaultChecked={params.value as boolean}
      disabled={isDisabled}
      onChange={(e) => {
        if (!isDisabled) {
          checkInGuest(
            e.target.checked,
            params.getValue(params.id, 'ticketno') as string,
          );
        }
      }}
    />
  );
};

/**
 * columns uses first name, last name, # of tickets purchased, arrival status, vip, donorbadge, accommodations
 */
const columns = [
  {
    field: 'arrived',
    headerName: 'Arrived',
    width: 65,
    renderCell: renderCheckin,
  },
  {field: 'firstname', headerName: 'First Name', width: 120},
  {field: 'lastname', headerName: 'Last Name', width: 120},
  {field: 'num_tickets', headerName: 'Tickets', width: 65},
  {field: 'email', headerName: 'Email', width: 150},
  {field: 'phone', headerName: 'Phone Number', width: 130},
  {field: 'vip', headerName: 'VIP', width: 65, renderCell: renderCheckbox},
  {
    field: 'donorbadge',
    headerName: 'Donor',
    width: 65,
    renderCell: renderCheckbox,
  },
  {field: 'accommodations', headerName: 'Accommodations', width: 200},
  {field: 'address', headerName: 'Address', width: 170},
];

/**
 * DoorList displays information about guests for a particular showing.
 *
 * @returns {ReactElement} DoorList
 */
const DoorList = (): ReactElement => {
  const {getAccessTokenSilently} = useAuth0();

  const [doorList, setDoorList] = useState([]);
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState<Date>(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [availableTimesEvents, setAvailableTimesEvents] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [eventListFull, setEventListFull] = useState([]);
  const [eventListActive, setEventListActive] = useState([]);
  const [filterSetting, setFilterSetting] = useState('active');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_1_URL + '/events/list/allevents',
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch events. HTTP status: ${response.status}`,
          );
        }
        const allEventRes = await response.json();
        const allEventResJson = allEventRes.data as any[];

        // Deduplicate the events based on eventid
        const uniqueEventIds = Array.from(
          new Set(allEventResJson.map((event) => event.eventid)),
        );
        let deduplicatedEvents = uniqueEventIds.map((id) =>
          allEventResJson.find((event) => event.eventid === id),
        );

        // Sort the events in alphabetical order by eventname
        deduplicatedEvents = deduplicatedEvents.sort((a, b) =>
          a.eventname.localeCompare(b.eventname),
        );

        setEventList(deduplicatedEvents);
        setEventListFull(allEventResJson);
        setEventListActive(deduplicatedEvents.filter((event) => event.active));
      } catch (error) {
        console.error(error.message);
      }
    };
    void fetchEvents();
  }, []);

  const handleEventChange = (event) => {
    const eventId = parseInt(event.target.value);
    setSelectedEventId(eventId);

    const matchingEvents = eventListFull.filter((e) => e.eventid === eventId);
    setAvailableTimesEvents(matchingEvents);
  };

  const handleTimeChange = async (event) => {
    const eventInstanceID = parseInt(event.target.value);
    await getDoorList(eventInstanceID);
  };

  const CustomToolbar = () => {
    const apiRef = useGridApiContext();

    const handleExport = (options: any) => {
      apiRef.current.exportDataAsCsv({
        ...options,
        fileName: `Door List - ${eventName} - ${format(date, 'yyyyMMdd hhmma')}`,
      });
    };

    return (
      <div className='flex justify-end'>
        <button
          className='flex gap-1 items-center font-medium text-blue-500 hover:text-blue-600 px-2 py-2 mx-2 mt-2'
          onClick={handleExport}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
            />
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
      const response = await fetch(
        process.env.REACT_APP_API_1_URL + `/doorlist?eventinstanceid=${event}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );
      const eventInstanceJson = await response.json();
      if (!response.ok) {
        throw new Error(
          `Failed to fetch door list. HTTP status: ${response.status}`,
        );
      }
      const eventInstanceData = eventInstanceJson.data;
      const doorListData = eventInstanceData
        .map((item, index) => {
          const row = item.row.slice(1, -1).split(',');
          const firstName = row[1] || '';
          const lastName = row[2] || 'OPEN SEATS';
          return {
            id: index,
            arrived: false,
            firstname: firstName,
            lastname: lastName,
            num_tickets: row[14],
            email: row[4],
            phone: row[3],
            vip: row[5] === 't',
            donorbadge: row[6] === 't',
            accommodations: row[7],
            address: row[8],
          };
          // Places open seats row at the top of the list by default
        })
        .filter(Boolean)
        .sort((a, b) => {
          if (a.lastname === 'OPEN SEATS') return -1;
          if (b.lastname === 'OPEN SEATS') return 1;
          return 0;
        });
      setDoorList(doorListData);

      const rowString = eventInstanceData[0].row.slice(1, -1);
      const rowParts = rowString.split(',');
      setEventName(rowParts[10]);

      const showingDateString = rowParts[12];
      const showingTimeString = rowParts[13];
      const showingDate = new Date(
        `${toDateStringFormat(showingDateString)} ${showingTimeString.slice(0, 8)}`,
      );
      setDate(showingDate);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
        <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 mb-10'>
          Door List
        </h1>
        <ActivenessGroupToggle
          defaultValue='active'
          handleFilterChange={setFilterSetting}
          showInactiveToggle={false}
        />
        <div className='mb-4'>
          <label
            htmlFor='event-select'
            className='text-sm text-zinc-500 ml-1 mb-2 block'
          >
            Choose Event
          </label>
          <select
            id='event-select'
            className='select w-full max-w-xs bg-white border border-zinc-300 rounded-lg p-3 text-zinc-600'
            onChange={handleEventChange}
          >
            <option className='px-6 py-3'>Select Event</option>
            {(filterSetting === 'active' ? eventListActive : eventList).map(
              (event) => (
                <option
                  key={event.eventinstanceid}
                  value={event.eventid}
                  className='px-6 py-3'
                >
                  {event.eventname} - {event.eventid}
                </option>
              ),
            )}
          </select>
        </div>
        <div className='mb-6'>
          <label
            htmlFor='time-select'
            className='text-sm text-zinc-500 ml-1 mb-2 block'
          >
            Choose Date & Time
          </label>
          <select
            data-testid='time-select-test'
            className='select w-full max-w-xs bg-white border border-zinc-300 rounded-lg p-3 text-zinc-600'
            onChange={handleTimeChange}
            disabled={!selectedEventId}
          >
            <option className='px-6 py-3'>Select Time</option>
            {availableTimesEvents.map((event) => {
              const showingDate = new Date(
                `${toDateStringFormat(event.eventdate)} ${event.eventtime.slice(0, 8)}`,
              );
              const formattedDate = format(showingDate, 'eee, MMM dd yyyy, h:mm a');
              return (
                <option
                  key={event.eventinstanceid}
                  value={event.eventinstanceid}
                  className='px-6 py-3'
                >
                  {formattedDate}
                </option>
              );
            })}
          </select>
        </div>
        <h2 className='text-3xl font-bold'>Showing: {titleCase(eventName)}</h2>
        {date && (
          <h3 className='text-xl font-bold text-zinc-700'>
            {format(date, 'eee, MMM dd yyyy, h:mm a')}
          </h3>
        )}
        <div className='bg-white p-5 rounded-xl mt-2 shadow-xl'>
          <DataGrid
            className='bg-white'
            autoHeight
            disableSelectionOnClick
            rows={doorList}
            columns={columns}
            pageSize={10}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default DoorList;
