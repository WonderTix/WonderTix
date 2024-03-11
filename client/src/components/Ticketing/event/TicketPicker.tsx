import React, {useEffect, useState, useReducer, ReactElement} from 'react';
import {useAppDispatch} from '../app/hooks';
import {Collapse} from '@mui/material';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import {addTicketToCart, Ticket} from '../ticketingmanager/ticketingSlice';
import EventInstanceSelect from './EventInstanceSelect';
import {range} from '../../../utils/arrays';
import {formatUSD} from '../ticketingmanager/RefundOrders/RefundOrders';

/**
 * @module
 * @param {Date} selectedDate
 * @param {Ticket[]} displayedShowings
 * @param {Ticket} selectedTicket
 * @param {number} qty
 * @param {payWhatPrice?} payWhatPrice
 * @param {boolean} concessions
 * @param {TicketType} selectedTicketType
 * @param {boolean} showCalendar
 * @param {boolean} showTimes
 * @param {boolean} showClearBtn
 * @param prompt - 'selectDate' | 'selectTime' | 'showSelection'
 */
interface TicketPickerState {
  selectedDate?: Date;
  displayedShowings: Ticket[];
  selectedTicket?: Ticket;
  qty: number;
  payWhatPrice?: number;
  concessions: boolean;
  selectedTicketType?: TicketType;
  showCalendar: boolean;
  showTimes: boolean;
  showClearBtn: boolean;
  prompt: 'selectDate' | 'selectTime' | 'showSelection';
}

export interface TicketType {
  id: number;
  name: string;
  price: string;
  concessions: string;
}

/**
 * Initial state
 */
const initialState: TicketPickerState = {
  selectedDate: undefined,
  displayedShowings: [],
  selectedTicket: undefined,
  qty: 0,
  payWhatPrice: null,
  concessions: false,
  selectedTicketType: {
    id: -1,
    name: '',
    price: '',
    concessions: '',
  },
  showCalendar: true,
  showTimes: false,
  showClearBtn: false,
  prompt: 'selectDate',
};

// Action creators
const dateSelected = (d: Date, t: Ticket[]) => ({
  type: 'date_selected',
  payload: {date: d, tickets: t},
});
const timeSelected = (t: Ticket) => ({type: 'time_selected', payload: t});
const resetWidget = () => ({type: 'reset'});
const changeQty = (n: number) => ({type: 'change_qty', payload: n});
const changePayWhat = (n: number) => ({type: 'change_pay_what', payload: n});
const changeTicketType = (t: TicketType) => ({
  type: 'change_ticket_type',
  payload: {selectedTicketType: t},
});

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
const TicketPickerReducer = (
  state: TicketPickerState,
  action: any,
): TicketPickerState => {
  switch (action.type) {
    case 'date_selected': {
      const {tickets, date} = action.payload;
      const sameDayShows = tickets
        .filter((t: Ticket) => isSameDay(new Date(date), new Date(t.date)))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

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
      return {
        ...state,
        selectedTicket: action.payload,
        showTimes: false,
        prompt: 'showSelection',
      };
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

const getDateOptions = (tickets: Ticket[]): {date: string, soldOut: boolean}[] => {
  const sortedDates = tickets.map((ticket) => {
    return {
      date: new Date(ticket.date),
      soldOut: ticket.availableseats === 0,
    };
  }).sort((a, b) => a.date.getTime() - b.date.getTime());

  const formattedDates = sortedDates.map((sortedDate) => {
    return {
      date: format(sortedDate.date, 'eee, MMM dd yyyy'),
      soldOut: sortedDate.soldOut,
    };
  });

  // Reduce to unique dates and determine if all event instances are sold out
  return formattedDates.reduce((acc, curr) => {
    const index = acc.findIndex((date) => date.date === curr.date);
    if (index > -1) {
      acc[index].soldOut = acc[index].soldOut && curr.soldOut;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
};

interface TicketPickerProps {
  onSubmit: (ticketInfo: any) => void;
  tickets: Ticket[];
}

/**
 * Used to choose the tickets
 *
 * @param {TicketPickerProps} props
 * @returns {ReactElement} and the correct ticket when picking
 */
const TicketPicker = (props: TicketPickerProps): ReactElement => {
  const dateOptions = getDateOptions(props.tickets);

  const [
    {
      qty,
      concessions,
      prompt,
      payWhatPrice,
      selectedDate,
      displayedShowings,
      selectedTicket,
      selectedTicketType,
      showCalendar,
      showTimes,
      showClearBtn,
    },
    dispatch,
  ] = useReducer(TicketPickerReducer, initialState);

  const appDispatch = useAppDispatch();
  const [showingTicketTypes, setShowingTicketTypes] = useState<TicketType[]>(
    [],
  );
  const [numAvail, setNumAvail] = useState(Number);

  useEffect(() => {
    if (selectedTicket) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            process.env.REACT_APP_API_2_URL +
              `/ticket-restriction/${selectedTicket.event_instance_id}`,
          );
          if (!response.ok) {
            throw response;
          }
          const data = await response.json();
          const showingTypes: TicketType[] = data.map((type: any) => ({
            id: type.tickettypeid_fk,
            name: type.description,
            price: formatUSD(type.price),
            concessions: formatUSD(type.concessionprice),
          }));

          setShowingTicketTypes(showingTypes);
        } catch (error) {
          console.error(error);
        }
      };

      void fetchData();
    }
  }, [selectedTicket]);

  useEffect(() => {
    if (selectedTicket && selectedTicketType) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            process.env.REACT_APP_API_2_URL +
              `/ticket-restriction/${selectedTicket.event_instance_id}/${selectedTicketType.id}`,
          );
          if (!response.ok) {
            throw response;
          }
          const data = await response.json();
          setNumAvail(data.ticketlimit - data.ticketssold);
        } catch (error) {
          console.error(error);
        }
      };
      void fetchData();
    }
  }, [selectedTicketType]);

  const handleClick = (date: Date, tickets: Ticket[]) => {
    dispatch(dateSelected(date, tickets));
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
      appDispatch(
        addTicketToCart({
          id: selectedTicket.event_instance_id,
          tickettype: selectedTicketType,
          qty,
          concessions,
          payWhatPrice,
        }),
      );
      dispatch(resetWidget());
    }
  };

  const promptMarkup = {
    selectDate: (
      <label className='text-white font-semibold text-xl' htmlFor='date-select'>
        Select date below ({props.tickets.length} showings)
      </label>
    ),
    selectTime: (
      <label className='text-white text-xl' htmlFor='time-select'>
        {selectedDate ? format(selectedDate, 'eee, MMM dd') : ''}
        <span className='text-white font-bold text-xl'> - Choose time:</span>
      </label>
    ),
    showSelection: (
      <p className='text-white text-center text-xl'>
        {selectedTicket
          ? `${format(new Date(selectedTicket.date), 'eee, MMM dd - h:mm a')}${
              (selectedTicket?.detail ?? '') !== ''
                ? ` (${selectedTicket.detail})`
                : ''
            }`
          : ''}
      </p>
    ),
  };

  const payWhatFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const tempPay = parseFloat(event.currentTarget.value);
    if (isNaN(tempPay)) {
      dispatch(changePayWhat(null));
    } else {
      dispatch(changePayWhat(parseFloat(tempPay.toFixed(2))));
    }
  };

  return (
    <>
      <Collapse in={showClearBtn}>
        <button
          onClick={() => dispatch(resetWidget())}
          className='bg-blue-600 px-3 py-1 rounded-xl text-white text-xl hover:bg-blue-700 mb-3'
        >
          Choose different date
        </button>
      </Collapse>
      {promptMarkup[prompt]}
      <Collapse in={showCalendar}>
        <div className='text-white w-full px-20 text-xl'>
          <select
            id='date-select'
            value={selectedDate ? format(selectedDate, 'eee, MMM dd yyyy') : ''}
            className='bg-zinc-800/50 text-white p-5 mt-5 rounded-xl'
            onChange={(ev) =>
              handleClick(new Date(ev.target.value), props.tickets)
            }
          >
            <option className='text-zinc-300' value='' disabled>
              select date
            </option>
            {dateOptions.map((option, index) => (
              <option key={index} value={option.date} disabled={option.soldOut}>
                {option.soldOut && '[SOLD OUT] '}
                {option.date}
              </option>
            ))}
          </select>
        </div>
      </Collapse>
      <Collapse in={showTimes} sx={{maxWidth: '100%'}}>
        <EventInstanceSelect
          check={prompt}
          eventInstances={displayedShowings}
          eventInstanceSelected={(t) => dispatch(timeSelected(t))}
        />
      </Collapse>
      <div className='flex flex-col gap-2 mt-7'>
        <label
          htmlFor='ticket-type-select'
          className='text-center text-zinc-200 text-xl'
        >
          Ticket Type
        </label>
        <select
          id='ticket-type-select'
          value={selectedTicketType.id}
          disabled={selectedTicket === undefined}
          onChange={(e) =>
            dispatch(
              changeTicketType(
                showingTicketTypes.find(
                  (type) => type.id === Number(e.target.value),
                ),
              ),
            )
          }
          className='disabled:opacity-30 disabled:cursor-not-allowed bg-zinc-800/50 p-5 text-white rounded-xl text-xl'
        >
          <option className='text-zinc-300 text-xl' value={-1} disabled>
            select ticket type
          </option>
          {showingTicketTypes.map((t) => (
            <option className='text-white text-xl' key={t.id} value={t.id}>
              {t.name}: {t.price}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col gap-2 mt-3'>
        <label
          htmlFor='qty-select'
          className='text-center text-zinc-200 text-xl'
        >
          {selectedTicket
            ? numAvail > 0
              ? 'Quantity'
              : 'Can\'t add more to cart'
            : 'Quantity (select ticket)'}
        </label>
        <select
          id='qty-select'
          value={qty}
          disabled={selectedTicket === undefined || numAvail < 1}
          onChange={(e) => dispatch(changeQty(parseInt(e.target.value)))}
          className='disabled:opacity-30 disabled:cursor-not-allowed bg-zinc-800/50 p-5 text-white rounded-xl text-xl'
        >
          <option className='text-zinc-300 text-xl' value={0} disabled>
            select qty
          </option>
          {range(numAvail, false).map((n) =>
            numAvail > 20 && n > 20 ? null : (
              <option className='text-white text-xl' key={n} value={n}>
                {n}
              </option>
            ),
          )}
        </select>
      </div>
      {/* FIXME: This was removed per #563 in prep for the initial site launch*/}
      {/* <div className='flex gap-2 mt-3'>*/}
      {/*  <input*/}
      {/*    id='add-concessions-ticket'*/}
      {/*    type='checkbox'*/}
      {/*    disabled={!selectedTicket}*/}
      {/*    checked={concessions}*/}
      {/*    className='bg-zinc-800/50 disabled:opacity-30 disabled:cursor-not-allowed'*/}
      {/*    onChange={() => dispatch({type: 'toggle_concession'})}*/}
      {/*    name='concessions'*/}
      {/*  />*/}
      {/*  <label*/}
      {/*    htmlFor='add-concessions-ticket'*/}
      {/*    className='text-zinc-200 text-sm disabled:opacity-30 disabled:cursor-not-allowed'*/}
      {/*  >*/}
      {/*    Add concessions ticket*/}
      {/*  </label>*/}
      {/* </div>*/}
      <div
        className={
          selectedTicketType && selectedTicketType.name === 'Pay What You Can'
            ? 'flex flex-col gap-2 mt-3 justify-center'
            : 'hidden'
        }
      >
        <label
          className='text-center text-zinc-200'
          htmlFor='pay-what-can-input'
        >
          Pay What You Can
        </label>
        <input
          id='pay-what-can-input'
          disabled={!selectedTicket}
          onChange={(e) => payWhatFunc(e)}
          type='number'
          placeholder='Enter Amount'
          className='disabled:opacity-30 disabled:cursor-not-allowed input border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500'
        />
      </div>
      <button
        data-testid='get-tickets'
        disabled={
          !qty ||
          !selectedTicket ||
          qty > selectedTicket.availableseats ||
          (selectedTicketType.name === 'Pay What You Can' &&
            (payWhatPrice == null || payWhatPrice < 0))
        }
        className='disabled:opacity-30 disabled:cursor-not-allowed py-2 px-3 mt-7 bg-blue-500 text-xl text-white enabled:hover:bg-blue-600 rounded-xl'
        onClick={handleSubmit}
      >
        Get Tickets
      </button>
    </>
  );
};

export default TicketPicker;
