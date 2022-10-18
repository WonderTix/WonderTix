/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Showing} from '../../../../interfaces/showing.interface';

/**
 * Used to map props to input container correctly
 * @module
 * @param {initialData} Showing
 * @param {number} id
 * @param {function} addShow
 * @param {function} deleteShow
 */
export interface MapPropsToShowingInputContainer {
  initialData?: Showing;
  id: number;
  addShow: (show:Showing) => void;
  deleteShow: (id:number) => void;
}

/**
 *
 * @param {MapPropsToShowingInputContainer} {initialData, id, addShow, deleteShow}
 * @returns {ReactElement}
 */
// eslint-disable-next-line react/prop-types
const ShowingInputContainer = ({initialData, id, addShow, deleteShow}:MapPropsToShowingInputContainer) => {
  const [starttime, setStarttime] = useState(initialData.starttime !== undefined? initialData.starttime: '');
  const [eventdate, setEventdate] = useState(initialData.eventdate !== undefined? initialData.eventdate: '');
  const [ticketTypeId, setTicketTypeId] = useState('');
  const [totalseats, setTotalseats] = useState(initialData.totalseats !== undefined? initialData.totalseats: 0);
  const availableseates = initialData.availableseats !== undefined? initialData.availableseats: 0;
  const [ticketTypes, setTicketTypes] = useState([]);

  let seatsForType = [];
  let typesForShow = [];

  const dateFieldValue = eventdate.split('T');
  const fetchTicketTypes = async () => {
    const res = await fetch(process.env.REACT_APP_ROOT_URL + '/api/tickets/types');
    setTicketTypes(await res.json());
  };

  useEffect(() => {
    fetchTicketTypes();
  }, [initialData]);

  const addToArray = (e) => {
    seatsForType = [];
    typesForShow = [];
    const div = e.target.parentElement;
    const inputs = div.querySelectorAll('input');
    const selects = div.querySelectorAll('select');
    const len = inputs.length - 2;
    for (let i = 1; i < len; i++) {
      seatsForType.push(parseInt(inputs[i].value));
    }
    selects.forEach((e: HTMLSelectElement) => {
      typesForShow.push(parseInt(e.value));
    });
  };

  // Generate the showing object to submit to parent component
  const createShowObject = (id) => {
    const showing: Showing = {
      id: id,
      eventid: initialData.eventid,
      starttime: starttime,
      eventdate: eventdate,
      totalseats: totalseats,
      availableseats: availableseates? availableseates : totalseats,
      ticketTypeId: typesForShow,
      seatsForType: seatsForType,
      salestatus: true,
    };
    console.log(showing);
    return showing;
  };

  // Send callback to parent
  const handleClick = (event) => {
    event.preventDefault();
    //  use call back to get to parent state
    addToArray(event);
    addShow(createShowObject(id));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteShow(id);
  };

  const createTicketOptions = (select: HTMLSelectElement) :HTMLSelectElement=> {
    ticketTypes.map((t) => {
      const newOp = document.createElement('option');
      if (t.id == ticketTypeId) {
        newOp.setAttribute('key', t.tickettypeid);
        newOp.setAttribute('value', t.tickettypeid);
        newOp.text = `${t.description}: ${t.price} (+ ${t.concessions} concessions)`;
      } else {
        newOp.setAttribute('key', t.tickettypeid);
        newOp.setAttribute('value', t.tickettypeid);
        newOp.text = `${t.description}: ${t.price} (+ ${t.concessions} concessions)`;
      }
      select.appendChild(newOp);
    });
    return select;
  };

  const addElement = (e) => {
    const div = e.target.parentElement.firstChild;
    const newDiv = document.createElement('div');
    const input = document.createElement('input');
    input.setAttribute('class', 'input rounded-lg p-2 bg-violet-100 w-full flex flex-col');
    input.setAttribute('name', 'numInput');
    input.setAttribute('type', 'number');
    input.setAttribute('placeholder', '# of Seats');
    let select = document.createElement('select');
    select.setAttribute('class', 'p-2 rounded-lg bg-violet-100');
    select.setAttribute('name', 'typeSelect');
    const options = document.createElement('option');
    options.setAttribute('class', 'text-sm text-zinc-700');
    options.text = 'Select Ticket Type';

    select.appendChild(options);
    select = createTicketOptions(select);

    newDiv.appendChild(input);
    newDiv.appendChild(select);
    newDiv.setAttribute('class', 'flex flex-col gap-5 mt-5 md:pr-20');

    div.appendChild(newDiv);
  };

  const removeElement = (e) => {
    const div = e.target.parentElement.firstChild;
    div.removeChild(div.lastChild);
  };

  return (
    <div className='bg-violet-200 rounded-xl p-10 shadow-md mb-4' key={id}>
      <div key={id} className='shadow-xl p-5 rounded-xl mb-9 bg-violet-700'>
        <label className='font-semibold text-white mb-7 mt-7  '>Show # {id}</label>
        <div className='flex flex-col gap-5 mt-5 md:pr-20'>
          <h3 className='font-semibold text-white'>Total Tickets For Showing</h3>
          <input
            className='input rounded-lg p-2 bg-violet-100 w-full'
            value={totalseats}
            name={`${initialData.eventdate}`}
            type='number'
            required
            placeholder='# of Seats'
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setTotalseats(parseInt(ev.target.value))
            }
          />
          <div className='w-full'>
            <div className='toAdd flex flex-col gap-5 md:pr-20 w-full' id='toAdd'></div>
            <button className='block px-2 py-1 bg-blue-500 disabled:opacity-30
              mt-4 mb-2 text-white rounded-lg text-sm'
            onClick={addElement}>Add Ticket Option</button>
            <button className='block px-2 py-1 bg-red-500 disabled:opacity-30
              mt-2 mb-4 text-white rounded-lg text-sm'
            onClick={removeElement}>Remove Ticket Option</button>
          </div>
          <div className="flex md:flex-row gap-10 flex-col">
            <div>
              <h3 className='font-semibold text-white'>Enter Date</h3>
              <input type="date" className='input w-full p-2 rounded-lg bg-violet-100 mb-7'
                value={dateFieldValue[0]}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
                  setEventdate(ev.target.value);
                } }/>

            </div>
            <div >
              <h3 className='font-semibold text-white'>Enter time</h3>
              <input type="time" name="starttime" placeholder='00:00:00'className='w-full p-2 rounded-lg bg-violet-100  mb-7 '
                value={starttime}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>{
                  setStarttime(ev.target.value + ':00');
                }
                }/>
            </div>
          </div>
        </div>
        <button
          className='px-2 py-1 bg-blue-500 disabled:opacity-30  mt-2 mb-4 text-white rounded-lg text-sm'
          onClick={handleClick}
        >
                    Save
        </button>
        <button
          className='px-2 py-1 bg-red-500 disabled:opacity-30 ml-9 mt-2 mb-4 text-white rounded-lg text-sm'
          onClick={handleDelete}
        >
                        Delete
        </button>
      </div>
    </div>
  );
};

export default ShowingInputContainer;
