/**
 * Copyright Â© 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {useAppDispatch, useAppSelector} from '../app/hooks';
import {addTicketToCart, selectCartTicketCount, Ticket} from '../ticketingmanager/ticketing/ticketingSlice';
import {openSnackbar} from '../ticketingmanager/snackbarSlice';
import {
  Collapse,
} from '@mui/material';
import EventInstanceSelect from './EventInstanceSelect';
import {range} from '../../../utils/arrays';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import React, {useEffect, useState, useReducer} from 'react';

/**
 * @module
 * @param {Date} selectedDate
 * @param {Ticket[]} displayedShowings
 * @param {Ticket} selectedTicket
 * @param {number} qty
 * @param {boolean} concessions
 * @param {TicketType[]} ticketTypes
 * @param {TicketType} selectedTicketType
 * @param {boolean} showCalendar
 * @param {boolean} showTimes
 * @param {boolean} showClearBtn
 * @param {TicketType} ticketType
 * @param prompt - 'selectDate' | 'selectTime' | 'showSelection'
 */
interface TicketPickerState {
    selectedDate?: Date,
    displayedShowings: Ticket[],
    selectedTicket?: Ticket,
    qty: number,
    payWhatPrice?: number,
    concessions: boolean,
    ticketTypes: TicketType[],
    selectedTicketType?: TicketType,
    showCalendar: boolean,
    showTimes: boolean,
    showClearBtn: boolean,
    prompt: 'selectDate' | 'selectTime' | 'showSelection',
}

export interface TicketType {
  id: number,
  name: string,
  price: string,
  concessions: string,
}

/**
 * Initial state
 * displayedShowings: [],
 * qty: 0,
 * concessions: false,
 * ticketTypes: [],
 * selectedTicketType: null,
 * showCalendar: true,
 * showTimes: false,
 * showClearBtn: false,
 * prompt: 'selectDate',
 */
const initialState: TicketPickerState = {
  displayedShowings: [],
  qty: 0,
  concessions: false,
  ticketTypes: [],
  selectedTicketType: {
    id: 0,
    name: '',
    price: '',
    concessions: '',
  },
  showCalendar: true,
  showTimes: false,
  showClearBtn: false,
  payWhatPrice: 0,
  prompt: 'selectDate',
};

// Action creators
const dateSelected = (d: Date, t: Ticket[]) => ({type: 'date_selected', payload: {date: d, tickets: t}});
const timeSelected = (t: Ticket) => ({type: 'time_selected', payload: t});
const resetWidget = () => ({type: 'reset'});
const changeQty = (n: number) => ({type: 'change_qty', payload: n});
const changePayWhat = (n:number) => ({type: 'change_pay_what', payload: n});
const changeTicketType = (t: TicketType) => ({type: 'change_ticket_type', payload: {selectedTicketType: t}});
let tempPay = 0;

/**
 * TicketPickerReducer is meant to be used to lower ticket numbers
 * Default:
 *      ...state,
 *      selectedDate: date,
 *      selectedTicket: undefined,
 *      displayedShowings: sameDayShows,
 *      showCalendar: false,
 *      showTimes: true,
 *      showClearBtn: true,
 *      prompt: 'selectTime',
 *
 * @param state
 * @param action
 * @returns a certain default state if failed
 */
const TicketPickerReducer = (state: TicketPickerState, action: any): TicketPickerState => {
  switch (action.type) {
  case 'date_selected': {
    const {tickets, date} = action.payload;
    const sameDayShows = tickets.filter((t: Ticket) => isSameDay(new Date(date), new Date(t.date)));
    console.log(sameDayShows);
    // (t: Ticket) => console.log(t.date);

    return {
      ...state,
      selectedDate: date,
      selectedTicket: undefined,
      displayedShowings: sameDayShows,
      showCalendar: false,
      showTimes: true,
      showClearBtn: true,
      prompt: 'selectTime',
    };
  }
  case 'time_selected': {
    return {...state, selectedTicket: action.payload, showTimes: false, prompt: 'showSelection'};
  }
  case 'reset': {
    return initialState;
  }
  case 'change_qty': {
    return {...state, qty: action.payload};
  }
  case 'toggle_concession': {
    return {...state, concessions: !state.concessions};
  }
  case 'change_pay_what': {
    return {...state, payWhatPrice: action.payload};
  }
  case 'change_ticket_type': {
    return {...state, selectedTicketType: action.payload.selectedTicketType};
  }
  default:
    throw new Error('Received undefined action type');
  }
};

interface TicketPickerProps {
  onSubmit: (ticketInfo: any) => void,
  tickets: Ticket[]
}

/**
 * Used to choose the tickets
 *
 * @param {TicketPickerProps} props
 * @returns {ReactElement} and the correct ticket when picking
 */
const TicketPicker = (props: TicketPickerProps) => {
  const [ticketTypesState, setTicketTypesState] = useState<TicketPickerState>(initialState);

  const [{
    qty,
    concessions,
    prompt,
    payWhatPrice,
    selectedDate,
    displayedShowings,
    selectedTicket,
    selectedTicketType,
    ticketTypes,
    showCalendar,
    showTimes,
    showClearBtn,
  }, dispatch] = useReducer(TicketPickerReducer, initialState);

  const fetchTicketTypes = async () => {
    const res = await fetch(process.env.REACT_APP_API_1_URL + '/tickets/AllTypes')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to retrieve ticket types');
        }
        console.log('Response containing ticket types received successfully');
        return res.json();
      })
      .then((resData) => {
        const data: TicketType[] = resData.data.map((t) => ({
          id: t.id,
          name: t.description,
          price: t.price,
          concessions: t.concessions,
        }));

        setTicketTypesState((prevState) => ({
          ...prevState,
          ticketTypes: data,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTicketTypes();
  }, []);

  useEffect(() => {
    console.log(ticketTypesState.ticketTypes);
  }, [ticketTypesState.ticketTypes]);

  const appDispatch = useAppDispatch();
  const cartTicketCount = useAppSelector(selectCartTicketCount);
  const tickets = props.tickets;

  const handleClick = (d: Date, t: Ticket[]) => {
    dispatch(dateSelected(d, t));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ticketInfo = {
      qty: qty,
      selectedDate: selectedDate,
    };

    // send ticket info to parent to display
    props.onSubmit(ticketInfo);
    if (selectedTicket && qty) {
      appDispatch(addTicketToCart({id: selectedTicket.event_instance_id, tickettype: selectedTicketType, qty, concessions, payWhatPrice}));
      appDispatch(openSnackbar(`Added ${qty} ticket${qty === 1 ? '' : 's'} to cart!`));
      dispatch(resetWidget());
    }
  };

  const promptMarkup = {
    selectDate: <div className='text-zinc-300 font-semibold text-xl '>Select date below ({tickets.length} showings)</div>,
    selectTime: <div className='text-white'>
      {selectedDate ? format(selectedDate, 'eee, MMM dd') : ''}
      <b className='text-white'> - Choose time:</b>
    </div>,
    showSelection: <div className='text-white'>
      {selectedTicket ? format(new Date(selectedTicket.date), 'eee, MMM dd - h:mm a') : ''}
    </div>,
  };

  const payWhatFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    tempPay = parseInt(event.currentTarget.value);
    dispatch(changePayWhat(tempPay));
  };

  const [filteredTicketTypes, setFilteredTicketTypes] = useState([]);

  const getDefaultType = ticketTypesState.ticketTypes.filter((t) => {
    if (!selectedTicket) {
      return;
    }

    return t.name === ticketTypesState.ticketTypes[1].name && selectedTicket.availableseats > 0;
  });

  console.log(selectedTicket);

  useEffect(() => {
    if (selectedTicket) {
      const fetchData = async () => {
        try {
          const response = await fetch(process.env.REACT_APP_API_1_URL + `/tickets/restrictions/${selectedTicket.event_instance_id}`);
          const data = await response.json();
          const finalFilteredTicketTypes = ticketTypesState.ticketTypes.filter((t) =>
            data.data.some((row) => row.tickettypeid_fk === t.id && row.ticketssold < row.ticketlimit),
          );
          setFilteredTicketTypes(finalFilteredTicketTypes);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [selectedTicket]);

  const [numAvail, setnumAvail] = useState(Number);
  useEffect(() => {
    if (selectedTicket) {
      const fetchData = async () => {
        try {
          const response = await fetch(process.env.REACT_APP_API_1_URL + `/tickets/restrictions/${selectedTicket.event_instance_id}`);
          const data = await response.json();
          const matchingRow = data.data.find((row) => row.tickettypeid_fk === selectedTicketType.id);
          if (matchingRow) {
            const numAvail = matchingRow.ticketlimit;
            setnumAvail(numAvail);
          } else {
            const numAvail = selectedTicket.availableseats;
            setnumAvail(numAvail);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [selectedTicketType]);

  return (
    <>
      <Collapse in={showClearBtn}>
        <button onClick={() => dispatch(resetWidget())} className='bg-blue-600 px-3 py-1
        rounded-xl text-white hover:bg-blue-700 mb-3'>
          Choose different date
        </button>
      </Collapse>
      {promptMarkup[prompt]}
      <Collapse in={showCalendar}>
        <div className='flex flex-col w-full'>
          <div className='flex flex-col text-white w-full px-20'>
            <select data-testid='select-date' defaultValue={''} className='py-7 bg-zinc-700/50 text-white p-5 mt-5 rounded-xl'
              onChange={(ev) => handleClick(new Date(ev.target.value), tickets)}>
              <option value='' disabled selected={prompt === 'selectDate'}>select date</option>
              {tickets.map((t) =>
                <option key={t.eventid} value={(t.date).toString()}>
                  {format(new Date(t.date), 'eee, MMM dd yyyy')}
                </option>)}
            </select>
          </div>
        </div>
      </Collapse>
      <Collapse in={showTimes}>
        <EventInstanceSelect
          check={prompt}
          eventInstances={displayedShowings}
          eventInstanceSelected={(t) => dispatch(timeSelected(t))}
        />
      </Collapse>
      <div className='flex flex-col gap-2 mt-7'>
        {ticketTypes.map((t) => (
          <p key={t.id}>
            hello {t.name}
          </p>
        ))}
        <div className='text-center text-zinc-300' id="ticket-type-select-label">Ticket Type</div>
        <select
          data-testid='select-ticket-type'
          value={selectedTicketType.name}
          defaultValue={''}
          disabled={selectedTicket===undefined}
          onChange={(e) => dispatch(changeTicketType(ticketTypesState.ticketTypes.find((t) => t.name === e.target.value)))}
          className='disabled:opacity-30 disabled:cursor-not-allowed bg-zinc-700/50 p-5 px-5 text-white rounded-xl '
        >
          <option value={''} disabled>select ticket type</option>
          {filteredTicketTypes.length > 0 ? (
            filteredTicketTypes.map((t) => (
              <option className="text-white" key={t.id} value={t.name}>
                {t.name}: {t.price}
              </option>
            ))
          ) : (
            getDefaultType.map((t) => (
              <option className="text-white" key={t.id} value={t.name}>
                {t.name}: {t.price}
              </option>
            ))
          )}
        </select>
      </div>
      <div className='flex flex-col gap-2 mt-3'>
        <div className='text-center text-zinc-300' id="qty-select-label">
          {selectedTicket ?
            (numAvail > 0) ? 'Quantity' : 'Can\'t add more to cart' :
            'Quantity (select ticket)'
          }
        </div>
        <select
          data-testid='select-qty'
          value={qty}
          defaultValue={0}
          disabled={selectedTicket===undefined || numAvail < 1}
          onChange={(e) => dispatch(changeQty(parseInt(e.target.value)))}
          className='disabled:opacity-30 disabled:cursor-not-allowed bg-zinc-700/50 p-5 px-5 text-white rounded-xl '
        >
          <option value={0} disabled>select qty</option>
          {range(numAvail, false).map((n) => (numAvail > 20 && n > 20) ? null : <option className='text-white' key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className='flex flex-row gap-2 mt-3 mb-7'>
        <input type='checkbox'
          data-testid='checkbox-concessions'
          disabled={!selectedTicket}
          checked={concessions}
          className='bg-zinc-700/50 disabled:opacity-30 disabled:cursor-not-allowed '
          onChange={() => dispatch({type: 'toggle_concession'})} name='concessions' />
        <label className='text-zinc-200 text-sm disabled:opacity-30 disabled:cursor-not-allowed '>Add concessions ticket</label>
      </div>

      <div className={selectedTicketType && selectedTicketType && selectedTicketType.name === 'Pay What You Can' ? 'show flex-col': 'hidden'}>
        <div className='flex flex-col gap-2 mt-3 mb-1 justify-center'>
          <div className='justify-center items-center text-white rounded-xl'>
            <h1 className= 'px-5 item-center text-white rounded-xl'>Pay What You Can</h1>
          </div>
          <input
            disabled={!selectedTicket}
            onChange={(e) => payWhatFunc(e)}
            type="text"
            placeholder="Enter Amount"
            className="mt-1 mb-2 disabled:opacity-30 disabled:cursor-not-allowed input pl-1 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <button
          data-testid='get-tickets'
          disabled={!qty || !selectedTicket || qty > selectedTicket.availableseats}
          className='< disabled:opacity-30 disabled:cursor-not-allowed py-2 px-3
          bg-blue-500 text-white hover:bg-blue-600 rounded-xl '
          onClick={handleSubmit}
        >
          Get Tickets
        </button>
      </div>
    </>
  );
};

export default TicketPicker;
