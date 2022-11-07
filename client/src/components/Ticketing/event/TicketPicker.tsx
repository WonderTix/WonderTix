/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {addTicketToCart, selectCartTicketCount, Ticket} from '../ticketingmanager/ticketing/ticketingSlice';
import {openSnackbar} from '../ticketingmanager/snackbarSlice';
import {
  Collapse,
} from '@mui/material';
// import MultiSelectCalendar from './MultiSelectCalendar';
import EventInstanceSelect from './EventInstanceSelect';
import {range} from '../../../utils/arrays';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import React, {useEffect, useReducer, useState} from 'react';

/**
 * @module
 * @param {Date} selectedDate
 * @param {Ticket[]} displayedShowings
 * @param {Ticket} selectedTicket
 * @param {number} qty
 * @param {boolean} concessions
 * @param {boolean} showCalendar
 * @param {boolean} showTimes
 * @param {boolean} showClearBtn
 * @param prompt - 'selectDate' | 'selectTime' | 'showSelection'
 */
interface TicketPickerState {
    selectedDate?: Date,
    displayedShowings: Ticket[],
    selectedTicket?: Ticket,
    qty: number,
    payWhatPrice?: number,
    concessions: boolean,
    showCalendar: boolean,
    showTimes: boolean,
    showClearBtn: boolean,
    prompt: 'selectDate' | 'selectTime' | 'showSelection',
}

/**
 * Initial state
 * displayedShowings: [],
 * qty: 0,
 * concessions: false,
 * showCalendar: true,
 * showTimes: false,
 * showClearBtn: false,
 * prompt: 'selectDate',
 */
const initialState: TicketPickerState = {
  displayedShowings: [],
  qty: 0,
  concessions: false,
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
// const changePayWhat = (event: React.ChangeEvent<HTMLInputElement>) => ({type: 'change_pay_what', payload: event.currentTarget.value});
const changePayWhat = (n:number) => ({type: 'change_pay_what', payload: n});

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
    default:
      throw new Error('Received undefined action type');
  }
};

interface TicketPickerProps {
    tickets: Ticket[]
}

/**
 * Used to choose the tickets
 * @param {TicketPickerProps} tickets
 * @returns {ReactElement} and the correct ticket when picking
 */
const TicketPicker = ({tickets}: TicketPickerProps) => {
  const [{
    qty,
    concessions,
    prompt,
    payWhatPrice,
    selectedDate,
    displayedShowings,
    selectedTicket,
    showCalendar,
    showTimes,
    showClearBtn,
  }, dispatch] = useReducer(TicketPickerReducer, initialState);

  const appDispatch = useAppDispatch();
  const cartTicketCount = useAppSelector(selectCartTicketCount);
  const [tempPay, setTempPay] = useState(0);

  const handleClick = (d: Date, t: Ticket[]) => {
    dispatch(dateSelected(d, t));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicket && qty) {
      appDispatch(addTicketToCart({id: selectedTicket.event_instance_id, qty, concessions, payWhatPrice}));
      appDispatch(openSnackbar(`Added ${qty} ticket${qty === 1 ? '' : 's'} to cart!`));
      dispatch(resetWidget());
    }
  };

  const numAvail = selectedTicket ?
        cartTicketCount[selectedTicket.event_instance_id] ?
            selectedTicket.availableseats - cartTicketCount[selectedTicket.event_instance_id] :
            selectedTicket.availableseats :
        0;

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
    setTempPay(parseInt(event.currentTarget.value));
  };

  console.log(numAvail);
  console.log(selectedTicket);
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
            <select defaultValue={''} className='py-7 bg-zinc-700/50 text-white p-5 mt-5 rounded-xl'
              onChange={(ev) => handleClick(new Date(ev.target.value), tickets)}>
              <option value='' disabled>select date</option>
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
          eventInstances={displayedShowings}
          eventInstanceSelected={(t) => dispatch(timeSelected(t))}
        />
      </Collapse>
      <div className='flex flex-col gap-2 mt-3'>
        <div className='text-zinc-300' id="qty-select-label">
          {selectedTicket ?
            (numAvail > 0) ? 'Quantity' : 'Can\'t add more to cart' :
            'Quantity (select ticket)'
          }
        </div>
        <select
          // labelId="qty-select-label"
          value={qty}
          defaultValue={0}
          disabled={selectedTicket===undefined || numAvail < 1}
          onChange={(e) => dispatch(changeQty(parseInt(e.target.value)))}
          className='disabled:opacity-30 disabled:cursor-not-allowed bg-zinc-700/50 p-5 px-5 text-white rounded-xl '
        >
          <option value={0} disabled>select qty</option>
          {range(numAvail, false).map((n) => <option className='text-white' key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className='flex flex-row gap-2 mt-3 mb-3'>
        <input type='checkbox'
          disabled={!selectedTicket}
          checked={concessions}
          className='bg-zinc-700/50 disabled:opacity-30 disabled:cursor-not-allowed '
          onChange={() => dispatch({type: 'toggle_concession'})} name='concessions' />
        <label className='text-zinc-200 text-sm disabled:opacity-30 disabled:cursor-not-allowed '>Add concessions ticket</label>
      </div>
      <div className={tickets[0].admission_type == 'General Admission - Adult' ? 'show': 'hidden'}>
        <div className='flex flex-col gap-2 mt-3 mb-1 justify-center'>
          <div className='justify-center items-center text-white rounded-xl'>
            <h1 className= 'px-5 item-center text-white rounded-xl'>Pay What amount: {payWhatPrice}</h1>
          </div>
          <input
            disabled={!selectedTicket}
            onChange={(e) => payWhatFunc(e)}
            type="text"
            placeholder="Enter Amount"
            className="disabled:opacity-30 disabled:cursor-not-allowed input pl-1 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <button
        disabled={!selectedTicket}
        type="button"
        className="disabled:opacity-30 disabled:cursor-not-allowed bg-blue-600 px-3 py-1 rounded-xl text-white hover:bg-blue-700 mb-5"
        onClick={()=> dispatch(changePayWhat(tempPay))}
      >
          Set Pay What</button>
      <div>
        <button
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

