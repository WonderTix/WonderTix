/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Showing} from '../../../../interfaces/showing.interface';
import DeleteConfirm from './deleteConfirm';

/**
 * Used to map props to input container correctly
 *
 * @module
 * @param {initialData} object
 * @param {number} id
 * @param {Function} handleSetShow
 */
interface InitialData {
  availableseats?: number,
  defaulttickettype?: number,
  eventdate?: number | string,
  eventid_fk?: number,
  eventinstanceid?: number,
  eventtime?: string,
  ispreview?: boolean,
  purchaseuri?: string,
  salestatus?: boolean,
  totalseats?: number,
  starttime?: number | string,
}

export interface MapPropsToShowingInputContainer {
  showingData: InitialData;
  id: number;
  handleSetShow: (show: Showing) => void;
  handleDeleteShow: (e: any) => void;
}


/**
 *
 * @param {MapPropsToShowingInputContainer} {initialData, id, handleSetShow}
 * @returns {ReactElement}
 */
// eslint-disable-next-line react/prop-types


const toDateStringFormat = (date) => {
  if (date === undefined || date === '') return '';
  const dateString = String(date);
  if (dateString.split('-').length === 3) return dateString;
  return `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6, 8)}`;
};

const toTimeStringFormat = (time) => {
  if (time === undefined || time === '') return '';
  const timeString = String(time);
  if (timeString.split(/[+-]/).length === 1) return timeString;
  return timeString.split(/[+-]/)[0];
};

const ShowingInputContainer = ({showingData, id, handleSetShow, handleDeleteShow}:MapPropsToShowingInputContainer) => {
  const [starttime, setStartTime] = useState(showingData.eventtime !== undefined ? showingData.eventtime.slice(0, 8): '');
  const [eventdate, setEventDate] = useState(showingData.eventdate !== undefined ? toDateStringFormat(showingData.eventdate) : '');
  const [ticketTypeId, setTicketTypeId] = useState([]); // TODO: Fill this initial data out to properly load
  const [seatsForType, setSeatsForType] = useState([]); // TODO: Fill this initial data out to properly load
  const [availableSeats, setAvailableSeats] = useState(showingData.availableseats !== undefined ? showingData.availableseats : 0);
  const [totalSeats, setTotalSeats] = useState(showingData.totalseats !== undefined ? showingData.totalseats : 0);
  const [showConfirm, setShowConfirm] = useState(false);

  const [ticketTypes, setTicketTypes] = useState([]);


  const fetchTicketTypes = async () => {
    const res = await fetch(process.env.REACT_APP_ROOT_URL + '/api/tickets/allTypes');
    const data = await res.json();
    setTicketTypes(data.data);
  };

  useEffect(() => {
    fetchTicketTypes();
  }, [showingData]);

  useEffect(() => {
    const showing: Showing = {
      id: id,
      eventid: showingData.eventid_fk,
      starttime: starttime,
      eventdate: eventdate,
      ticketTypeId: ticketTypeId,
      seatsForType: seatsForType,
      availableseats: availableSeats ? availableSeats : totalSeats,
      totalseats: totalSeats,
      salestatus: true,
    };
    handleSetShow(showing);
  }, [starttime, eventdate, ticketTypeId, totalSeats, availableSeats, seatsForType]);

  const handleAddTicketOption = (e) => {
    setSeatsForType((data) => [...data, 0]);
    setTicketTypeId((data) => [...data, 'NaN']);
  };

  const handleSeatChange = (e) => {
    const newSeats = [...seatsForType];
    if (parseInt(e.target.value) >= 0) {
      newSeats[parseInt(e.target.id)] = parseInt(e.target.value);
      setSeatsForType(newSeats);
    } else {
      newSeats[parseInt(e.target.id)] = 0;
      setSeatsForType(newSeats);
    }
  };

  const handleRemoveOption = (e) => {
    const newSeats = seatsForType.filter((_, i) => i !== parseInt(e.target.value));
    const newTypes = ticketTypeId.filter((_, i) => i !== parseInt(e.target.value));
    setSeatsForType(newSeats);
    setTicketTypeId(newTypes);
  };

  const handleChangeOption = (e) => {
    const newList = [...ticketTypeId];
    if (e.target.value === 'Select Ticket Type') newList[e.target.id] = 'NaN';
    else newList[e.target.id] = parseInt(e.target.value);
    setTicketTypeId(newList);
  };

  return (
    <div className='bg-violet-200 rounded-xl p-10 shadow-md mb-4' key={id}>
      { showConfirm ?
      <DeleteConfirm message='Are you sure you want to delete this showing?' setShowConfirm={setShowConfirm} handleDelete={handleDeleteShow} id={String(id)}/> : null
      }
      <div key={id} className='shadow-xl p-5 rounded-xl mb-9 bg-violet-700'>
        <label className='font-semibold text-white mb-7 mt-7  '>Show # {id + 1}</label>
        <div className='flex flex-col gap-5 mt-5 md:pr-20'>
          <h3 className='font-semibold text-white'>Total Tickets For Showing</h3>
          <input
            className='input rounded-lg p-2 bg-violet-100 w-full md:w-7/8'
            value={showingData.totalseats}
            type='number'
            required
            key={id}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
              if (isNaN(parseInt(ev.target.value))) setTotalSeats(0);
              if (parseInt(ev.target.value) >= 0) setTotalSeats(parseInt(ev.target.value));
            }
            }
          />
          <div className='w-full'>

            <div className='toAdd flex flex-col gap-5 md:pr-20 w-full' id='toAdd'></div>
            {
              seatsForType.map((seats, i) => (
                <div key={i} className='flex flex-col gap-5 mt-2 md:pr-20 bg-violet-800 rounded-xl p-2 pt-5'>
                  <input
                    id={String(i)}
                    className='input rounded-lg p-2 bg-violet-100 w-full flex flex-col'
                    name='numInput'
                    type='number'
                    placeholder='# of Seats'
                    onChange={handleSeatChange}
                    value={seatsForType[i]}
                  >
                  </input>
                  <select className='p-2 rounded-lg bg-violet-100' name='typeSelect' onChange={handleChangeOption} id={String(i)} value={ticketTypeId[i]}>
                    <option className='text-sm text-zinc-700'>
                      Select Ticket Type
                    </option>
                    {ticketTypes.map((ticketType, j) => <option key={j} className='text-sm text-zinc-700' value={ticketType.id}>
                      {ticketType.description}: {ticketType.price} (+{ticketType.concessions} concessions)
                    </option>)}
                  </select>
                  <button className='w-min block px-2 py-1 bg-red-500 disabled:opacity-30 mb-4 text-white rounded-lg text-sm'
                    type='button' onClick={handleRemoveOption} value={i}>
                    Remove
                  </button>
                </div>))
            }
            <button className='block px-2 py-1 bg-blue-500 disabled:opacity-30
              mt-4 mb-2 text-white rounded-lg text-sm'
            type='button'
            onClick={handleAddTicketOption}>Add Ticket Option</button>
          </div>
          <div className="flex md:flex-row gap-10 flex-col">
            <div>
              <h3 className='font-semibold text-white'>Enter Date</h3>
              <input type="date" id="date" className='input w-full p-2 rounded-lg bg-violet-100 mb-7'
                value={toDateStringFormat(showingData.eventdate)}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
                  setEventDate(ev.target.value);
                } }/>
            </div>
            <div >
              <h3 className='font-semibold text-white'>Enter time</h3>
              <input type="time" id="time" name="starttime" placeholder='00:00:00'className='w-full p-2 rounded-lg bg-violet-100 mb-7 '
                value={toTimeStringFormat(showingData.eventtime ? showingData.eventtime : showingData.starttime)}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>{
                  setStartTime(ev.target.value);
                }
                }/>
            </div>
          </div>
        </div>
        <button className='px-2 py-1 bg-red-500 disabled:opacity-30  mt-2 mb-4 text-white rounded-lg text-sm' type='button' onClick={() => setShowConfirm(true)} id={String(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShowingInputContainer;
