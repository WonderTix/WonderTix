/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Showing} from '../../../../interfaces/showing.interface';

/**
 * Used to map props to input container correctly
 *
 * @module
 * @param {initialData} Showing
 * @param {number} id
 * @param {Function} addShow
 * @param {Function} deleteShow
 */
export interface MapPropsToShowingInputContainer {
  initialData?: Showing;
  id: number;
  showingNum: number;
  addShowData: (show: Showing) => void;
  deleteShow: (event: Event) => void;
  handleSetShow: (show: Showing) => void;
}

/**
 *
 * @param {MapPropsToShowingInputContainer} {initialData, id, addShow, deleteShow}
 * @returns {ReactElement}
 */
// eslint-disable-next-line react/prop-types
const ShowingInputContainer = ({initialData, id, showingNum, addShowData, deleteShow, handleSetShow}:MapPropsToShowingInputContainer) => {
  const [starttime, setStartTime] = useState(initialData.starttime !== undefined? initialData.starttime: '');
  const [eventdate, setEventDate] = useState(initialData.eventdate !== undefined? initialData.eventdate: '');
  const [ticketTypeId, setTicketTypeId] = useState([]);
  const [seatsForType, setSeatsForType] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(initialData.availableseats !== undefined? initialData.availableseats: 0);
  const [totalSeats, setTotalSeats] = useState(initialData.totalseats !== undefined? initialData.totalseats: 0);

  const [ticketTypes, setTicketTypes] = useState([]);


  const dateFieldValue = typeof eventdate === 'string' ? eventdate.split('T') : '';
  const fetchTicketTypes = async () => {
    const res = await fetch(process.env.REACT_APP_ROOT_URL + '/api/tickets/allTypes');
    const data = await res.json();
    setTicketTypes(data.data);
  };

  useEffect(() => {
    fetchTicketTypes();
  }, [initialData]);

  useEffect(() => {
    const showing: Showing = {
      id: id,
      eventid: initialData.eventid,
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
    setTicketTypeId((data) => [...data, 0]);
  };

  const handleSeatChange = (e) => {
    const newSeats = [...seatsForType];
    newSeats[parseInt(e.target.id)] = parseInt(e.target.value);
    setSeatsForType(newSeats);
  };

  const handleRemove = (e) => {
    const newSeats = seatsForType.filter((seat, i) => i !== parseInt(e.target.value));
    const newTypes = ticketTypeId.filter((ticketType, i) => i !== parseInt(e.target.value));
    setSeatsForType(newSeats);
    setTicketTypeId(newTypes);
  };

  const handleOptionChange = (e) => {
    const newList = [...ticketTypeId];
    newList[e.target.id] = parseInt(e.target.value);
    setTicketTypeId(newList);
  };

  return (
    <div className='bg-violet-200 rounded-xl p-10 shadow-md mb-4' key={id}>
      <div key={id} className='shadow-xl p-5 rounded-xl mb-9 bg-violet-700'>
        <label className='font-semibold text-white mb-7 mt-7  '>Show # {id ? id : showingNum}</label>
        <div className='flex flex-col gap-5 mt-5 md:pr-20'>
          <h3 className='font-semibold text-white'>Total Tickets For Showing</h3>
          <input
            className='input rounded-lg p-2 bg-violet-100 w-full md:w-7/8'
            value={totalSeats}
            name={`${initialData.eventdate}`}
            type='number'
            required
            placeholder='# of Seats'
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
              if (isNaN(parseInt(ev.target.value))) setTotalSeats(0);
              if (parseInt(ev.target.value) >= 0) setTotalSeats(parseInt(ev.target.value));
            }
            }
          />
          <div className='w-full'>
            <div className='toAdd flex flex-col gap-5 md:pr-20 w-full' id='toAdd'></div>
            {seatsForType.length > 0 ?
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
                    <select className='p-2 rounded-lg bg-violet-100' name='typeSelect' onChange={handleOptionChange} id={String(i)}>
                      <option className='text-sm text-zinc-700'>
                        Select Ticket Type
                      </option>
                      {ticketTypes.map((ticketType, j) => <option key={j} className='text-sm text-zinc-700' value={ticketType.id}>
                        {ticketType.description}: {ticketType.price} (+{ticketType.concessions} concessions)
                      </option>)}
                    </select>
                    <button className='w-min block px-2 py-1 bg-red-500 disabled:opacity-30 mb-4 text-white rounded-lg text-sm'
                      type='button' onClick={handleRemove} value={i}>
                      Remove
                    </button>
                  </div>)):
              null
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
                value={dateFieldValue[0]}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
                  setEventDate(ev.target.value);
                } }/>
            </div>
            <div >
              <h3 className='font-semibold text-white'>Enter time</h3>
              <input type="time" id="time" name="starttime" placeholder='00:00:00'className='w-full p-2 rounded-lg bg-violet-100 mb-7 '
                value={starttime}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>{
                  setStartTime(ev.target.value);
                }
                }/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowingInputContainer;
