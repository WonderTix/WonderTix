import React, {useEffect, useState} from 'react';
import {Showing} from '../../../../interfaces/showing.interface';
import DeleteConfirm from './deleteConfirm_depreciated';

/**
 * Used to map props to input container correctly
 *
 * @module
 * @param {initialData} object
 * @param {number} id
 * @param {Function} handleSetShow
 */
/* interface InitialData {
  availableseats?: number;
  defaulttickettype?: number;
  eventdate: string;
  eventid: number;
  index: number;
  ispreview?: boolean;
  purchaseuri?: string;
  salestatus?: boolean;
  totalseats?: number;
  eventtime: string;
}*/

export interface MapPropsToShowingInputContainer {
  showingData: Showing;
  eventinstanceid: number;
  index: number;
  handleSetShow: (show: Showing) => void;
  handleDeleteShow: (e: any) => void;
}

/**
 *
 * @param date
 * @param {MapPropsToShowingInputContainer} {initialData, id, handleSetShow}
 * @returns {ReactElement}
 */
// eslint-disable-next-line react/prop-types

export const toDateStringFormat = (date) => {
  if (date === undefined || date === '') return '';
  const dateString = String(date);
  if (dateString.includes('-')) return date;
  if (dateString.split('-').length === 3) {
    const [year, month, day] = dateString.split('-').map(Number);
    const Dateobject = new Date(year, month - 1, day);
    return Dateobject.getTime();
  }
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${year}-${month}-${day}`;
};

const toTimeStringFormat = (time) => {
  if (time === undefined || time === '') return '';
  const timeString = String(time);
  const splitTime = timeString.split(/[+.-]/)[0];
  return splitTime;
};

const ShowingInputContainer = ({
  showingData,
  eventinstanceid,
  index,
  handleSetShow,
  handleDeleteShow,
}: MapPropsToShowingInputContainer) => {
  const [eventtime, setStartTime] = useState(
    showingData.eventtime !== undefined
      ? showingData.eventtime.slice(0, 8)
      : '',
  );
  const [eventdate, setEventDate] = useState(showingData.eventdate);
  const [ticketTypeId, setTicketTypeId] = useState(
    showingData.ticketTypeId ? showingData.ticketTypeId : [],
  );
  const [seatsForType, setSeatsForType] = useState(
    showingData.seatsForType ? showingData.seatsForType : [],
  );
  const [availableSeats, setAvailableSeats] = useState(
    showingData.availableseats !== undefined ? showingData.availableseats : 0,
  );
  const [totalSeats, setTotalSeats] = useState(
    showingData.totalseats !== undefined ? showingData.totalseats : 0,
  );
  const [showConfirm, setShowConfirm] = useState(false);

  const [ticketTypes, setTicketTypes] = useState([]);

  const fetchTicketTypes = async () => {
    const res = await fetch(
      process.env.REACT_APP_API_1_URL + '/tickets/allTypes',
    );
    const data = await res.json();
    setTicketTypes(data.data);
  };

  useEffect(() => {
    fetchTicketTypes();
  }, [showingData]);

  useEffect(() => {
    const showing: Showing = {
      availableseats: availableSeats ? availableSeats : totalSeats,
      eventdate: eventdate,
      eventid_fk: showingData.eventid_fk,
      eventinstanceid: eventinstanceid,
      eventtime: eventtime,
      ispreview: false,
      salestatus: true,
      seatsForType: seatsForType,
      ticketTypeId: ticketTypeId,
      totalseats: totalSeats,
      index: index,
    };
    handleSetShow(showing);
  }, [
    eventtime,
    eventdate,
    ticketTypeId,
    totalSeats,
    availableSeats,
    seatsForType,
  ]);

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
    const newSeats = seatsForType.filter(
      (_, i) => i !== parseInt(e.target.value),
    );
    const newTypes = ticketTypeId.filter(
      (_, i) => i !== parseInt(e.target.value),
    );
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
    <div className='bg-violet-200 rounded-xl p-10 shadow-md mb-4' key={index}>
      {showConfirm && (
        <DeleteConfirm
          message='Are you sure you want to delete this showing?'
          setShowConfirm={setShowConfirm}
          handleDelete={handleDeleteShow}
          id={String(index)}
        />
      )}
      <div key={index} className='shadow-xl p-5 rounded-xl mb-9 bg-violet-700'>
        <label className='font-semibold text-white mb-7 mt-7  '>
          Show # {index + 1}
        </label>
        <div className='flex flex-col gap-5 mt-5 md:pr-20'>
          <label
            htmlFor={`${index}TotalSeats`}
            className='font-semibold text-white'
          >
            Total Tickets For Showing
          </label>
          <input
            className='input rounded-lg p-2 bg-violet-100 w-full md:w-7/8'
            value={showingData.totalseats}
            id={`${index}TotalSeats`}
            type='number'
            required
            key={index}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
              if (isNaN(parseInt(ev.target.value))) setTotalSeats(0);
              if (parseInt(ev.target.value) >= 0) {
                setTotalSeats(parseInt(ev.target.value));
              }
            }}
          />
          <div className='w-full'>
            <div
              className='toAdd flex flex-col gap-5 md:pr-20 w-full'
              id='toAdd'
            ></div>
            {seatsForType.map((seats, i) => (
              <div
                key={i}
                className='flex flex-col gap-6 mt-2 md:pr-20 bg-violet-800 rounded-xl p-5 pt-5'
              >
                <label className='font-semibold text-white flex flex-col'>
                  Ticket Type
                  <select
                    className='p-2 mt-2 rounded-lg bg-violet-100 text-zinc-700 font-normal'
                    name='typeSelect'
                    onChange={handleChangeOption}
                    id={String(i)}
                    value={ticketTypeId[i]}
                  >
                    <option className='text-sm text-zinc-700'>
                      Select Ticket Type
                    </option>
                    {ticketTypes.map((ticketType, j) => (
                      <option
                        key={j}
                        className='text-sm text-zinc-700'
                        value={ticketType.id}
                      >
                        {ticketType.description}: {ticketType.price} (+
                        {ticketType.concessions} concessions)
                      </option>
                    ))}
                  </select>
                </label>
                <label className='font-semibold text-white'>
                  Number of Tickets per Type
                  <input
                    id={String(i)}
                    className='input rounded-lg p-2 mt-2 bg-violet-100 w-full
                       flex flex-col text-zinc-700 font-normal'
                    name='numInput'
                    type='number'
                    placeholder='# of Seats'
                    onChange={handleSeatChange}
                    value={seatsForType[i].toString()}
                  ></input>
                </label>
                <button
                  className='w-min block px-4 py-1 mb-1 bg-red-700 disabled:opacity-30 text-white rounded-3xl
                    font-semibold transition ease-in-out delay-50 hover:scale-105 hover:bg-red-600'
                  type='button'
                  onClick={handleRemoveOption}
                  value={i}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className='block px-3 py-2 bg-blue-500 disabled:opacity-30 mt-4 mb-2 text-white rounded-xl
             transition ease-in-out delay-50 hover:scale-105 hover:bg-blue-400'
              type='button'
              onClick={handleAddTicketOption}
            >
              Add Ticket Option
            </button>
          </div>
          <div className='flex md:flex-row gap-10 flex-col'>
            <div>
              <label
                htmlFor={`${index}Date`}
                className='font-semibold text-white'
              >
                Enter Date
              </label>
              <input
                type='date'
                id={`${index}Date`}
                className='input w-full p-2 mt-1 rounded-lg bg-violet-100 mb-7'
                value={toDateStringFormat(showingData.eventdate)}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
                  console.log(ev.target.value);
                  setEventDate(ev.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor={`${index}Time`}
                className='font-semibold text-white'
              >
                Enter time
              </label>
              <input
                type='time'
                id={`${index}Time`}
                name='eventtime'
                placeholder='00:00:00'
                className='w-full p-2 mt-1 rounded-lg bg-violet-100 mb-7 '
                value={toTimeStringFormat(showingData.eventtime)}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
                  setStartTime(ev.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <button
          className='px-4 py-2 bg-red-700 disabled:opacity-30 mt-2 mb-2 text-white font-semibold rounded-3xl
           transition ease-in-out delay-50 hover:scale-105 hover:bg-red-600'
          type='button'
          onClick={() => setShowConfirm(true)}
          id={String(index)}
        >
          Delete Showing
        </button>
      </div>
    </div>
  );
};

export default ShowingInputContainer;
