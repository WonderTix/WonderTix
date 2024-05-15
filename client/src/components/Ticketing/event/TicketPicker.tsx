import React, {ReactElement, useEffect, useReducer, useState} from 'react';
import {useAppDispatch} from '../app/hooks';
import {Collapse} from '@mui/material';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import {addTicketToCart, Ticket} from '../ticketingmanager/ticketingSlice';
import ShowingTimeSelect from './ShowingTimeSelect';
import {range} from '../../../utils/arrays';
import {formatUSD} from '../ticketingmanager/RefundOrders/RefundOrders';
import {DateOption, ShowingDateSelect} from './ShowingDateSelect';
import {TicketOptions, TicketTypeInput} from './TicketOptions';

/**
 * @module
 * @param {DateOption} selectedDate
 * @param {Ticket[]} displayedShowings
 * @param {Ticket} selectedTicket
 * @param {number} qty
 * @param {payWhatPrice?} payWhatPrice
 * @param {TicketType[]} selectedTicketType
 * @param {boolean} showCalendar
 * @param {boolean} showTimes
 * @param {boolean} showClearBtn
 * @param prompt - 'selectDate' | 'selectTime' | 'showSelection'
 */
interface TicketPickerState {
  selectedDate?: DateOption;
  displayedShowings: Ticket[];
  selectedTicket?: Ticket;
  qty: number;
  payWhatPrice?: number;
  selectedTicketTypes?: TicketTypeInput[];
  showCalendar: boolean;
  showTimes: boolean;
  showClearBtn: boolean;
  prompt: 'selectDate' | 'selectTime' | 'showSelection';
}

export interface TicketType {
  id: number;
  name: string;
  price: string;
  fee: string;
  numAvail: number;
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
  selectedTicketTypes: [],
  showCalendar: true,
  showTimes: false,
  showClearBtn: false,
  prompt: 'selectDate',
};

// Action creators
const dateSelected = (d: DateOption, t: Ticket[]) => ({
  type: 'date_selected',
  payload: {dateOption: d, tickets: t},
});
const timeSelected = (t: Ticket) => ({type: 'time_selected', payload: t});
const resetWidget = () => ({type: 'reset'});
const changeQty = (n: number) => ({type: 'change_qty', payload: n});
const changePayWhat = (n: number) => ({type: 'change_pay_what', payload: n});
const changeTicketTypes = (t: TicketTypeInput[]) => ({
  type: 'change_ticket_types',
  payload: {selectedTicketTypes: t},
});

/**
 * TicketPickerReducer is meant to be used to lower ticket numbers
 * Default:
 *      ...state,
 *      selectedDate: DateOption,
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
      const {tickets, dateOption} = action.payload;
      const sameDayShows = tickets
        .filter((t: Ticket) =>
          isSameDay(new Date(dateOption.date), new Date(t.date)),
        )
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

      return {
        ...state,
        selectedDate: dateOption,
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
    case 'change_pay_what': {
      return {...state, payWhatPrice: action.payload};
    }
    case 'change_ticket_types': {
      return {
        ...state,
        selectedTicketTypes: action.payload.selectedTicketTypes,
      };
    }
    default:
      throw new Error('Received undefined action type');
  }
};

const getDateOptions = (tickets: Ticket[]): DateOption[] => {
  const sortedDates = tickets
    .map((ticket) => {
      return {
        date: new Date(ticket.date),
        soldOut: ticket.remainingtickets === 0,
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

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

const findDateOption = (dateOptions: DateOption[], date: string) => {
  const dateOption = dateOptions.find((option) => option.date === date);
  return {
    date: dateOption.date,
    soldOut: dateOption.soldOut,
  };
};

interface TicketPickerProps {
  isEventSoldOut: boolean;
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
  const {isEventSoldOut, onSubmit, tickets} = props;

  const dateOptions = getDateOptions(tickets);

  const [
    {
      qty,
      prompt,
      payWhatPrice,
      selectedDate,
      displayedShowings,
      selectedTicket,
      selectedTicketTypes,
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
            fee: formatUSD(type.fee),
            numAvail: Math.min(
              type.ticketlimit - type.ticketssold,
              selectedTicket.availableseats,
            ),
          }));

          setShowingTicketTypes(showingTypes);
        } catch (error) {
          console.error(error);
        }
      };

      void fetchData();
    }
  }, [selectedTicket]);

  // useEffect(() => {
  //   if (selectedTicket && selectedTicketTypes.length) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           process.env.REACT_APP_API_2_URL +
  //             `/ticket-restriction/${selectedTicket.event_instance_id}/${selectedTicketTypes[0].type.id}`,
  //         );
  //         if (!response.ok) {
  //           throw response;
  //         }
  //         const data = await response.json();
  //         setNumAvail(
  //           Math.min(
  //             data.ticketlimit - data.ticketssold,
  //             selectedTicket.availableseats,
  //           ),
  //         );
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     void fetchData();
  //   }
  // }, [selectedTicketTypes]);

  const handleClick = (date: DateOption, tickets: Ticket[]) => {
    if (date.date !== selectedDate?.date) {
      dispatch(dateSelected(date, tickets));
      setShowingTicketTypes([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ticketInfo = {
      qty: selectedTicketTypes.reduce((sum, type) => sum + type.qty, 0),
      selectedDate: new Date(selectedDate.date),
    };

    // send ticket info to parent to display
    onSubmit(ticketInfo);
    selectedTicketTypes.forEach((ticketInput) => {
      appDispatch(
        addTicketToCart({
          id: selectedTicket.event_instance_id,
          tickettype: ticketInput.type,
          qty: ticketInput.qty,
          payWhatPrice: ticketInput.payWhatCanPrice,
        }),
      );
    });

    // TODO: This is not resetting
    dispatch(resetWidget());
  };

  const promptMarkup = {
    selectDate: (
      <label className='text-white font-semibold text-xl' htmlFor='date-select'>
        {!isEventSoldOut ? 'Select date below' : 'View dates & times'} (
        {tickets.length} showings)
      </label>
    ),
    selectTime: (
      <>
        {selectedDate && (
          <label className='text-white text-xl' htmlFor='time-select'>
            {format(new Date(selectedDate.date), 'eee, MMM dd')}
            <span className='text-white font-bold text-xl'>
              {!selectedDate.soldOut ? ' - Choose time:' : ' - Times:'}
            </span>
          </label>
        )}
      </>
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

  const validTicketTypeSelection = (ticketTypesInputs: TicketTypeInput[]) => {
    // At least one must have a qty > 0
    const hasSomeValidQuantity = ticketTypesInputs.some(
      (typeInput) => typeInput.qty > 0,
    );

    // The pay what price type if existing must have a >=0 value if it has a qty > 0
    const payWhatType = ticketTypesInputs.find(
      (typeInput) => typeInput.type.name === 'Pay What You Can',
    );
    let isValidPayWhatType = true;
    if (payWhatType && payWhatType.qty > 0 && payWhatType.payWhatCanPrice < 0) {
      isValidPayWhatType = false;
    }

    return hasSomeValidQuantity && isValidPayWhatType;
  };

  return (
    <div className='bg-zinc-200/20 shadow-md backdrop-blur-md p-9 flex flex-col items-center rounded-xl w-full'>
      <ShowingDateSelect
        dateOptions={dateOptions}
        onSelectDate={(date) => handleClick(date, tickets)}
      />
      <div className='flex w-full gap-12'>
        <ShowingTimeSelect
          check={prompt}
          showings={displayedShowings}
          onSelectShowingTime={(t) => dispatch(timeSelected(t))}
        />
        <TicketOptions
          ticketTypes={showingTicketTypes}
          onChange={(typeInputs) => dispatch(changeTicketTypes(typeInputs))}
        />
      </div>
      {/* {!isEventSoldOut && false && ( */}
      {/*   <> */}
      {/*     <div className='flex flex-col gap-2 mt-7'> */}
      {/*       <label */}
      {/*         htmlFor='ticket-type-select' */}
      {/*         className='text-center text-zinc-200 text-xl' */}
      {/*       > */}
      {/*         Ticket Type */}
      {/*       </label> */}
      {/*       <select */}
      {/*         id='ticket-type-select' */}
      {/*         value={selectedTicketType.id} */}
      {/*         disabled={selectedTicket === undefined} */}
      {/*         onChange={(e) => */}
      {/*           dispatch( */}
      {/*             changeTicketType( */}
      {/*               showingTicketTypes.find( */}
      {/*                 (type) => type.id === Number(e.target.value), */}
      {/*               ), */}
      {/*             ), */}
      {/*           ) */}
      {/*         } */}
      {/*         className='disabled:opacity-30 disabled:cursor-not-allowed bg-zinc-800/50 p-5 text-white rounded-xl text-xl' */}
      {/*       > */}
      {/*         <option className='text-zinc-300 text-xl' value={-1} disabled> */}
      {/*           select ticket type */}
      {/*         </option> */}
      {/*         {showingTicketTypes.map((t) => ( */}
      {/*           <option className='text-white text-xl' key={t.id} value={t.id}> */}
      {/*             {t.name}: {t.price} */}
      {/*           </option> */}
      {/*         ))} */}
      {/*       </select> */}
      {/*     </div> */}
      {/*     <div className='flex flex-col gap-2 mt-3'> */}
      {/*       <label */}
      {/*         htmlFor='qty-select' */}
      {/*         className='text-center text-zinc-200 text-xl' */}
      {/*       > */}
      {/*         {selectedTicket */}
      {/*           ? numAvail > 0 */}
      {/*             ? 'Quantity' */}
      {/*             : 'Can\'t add more to cart' */}
      {/*           : 'Quantity (select ticket)'} */}
      {/*       </label> */}
      {/*       <select */}
      {/*         id='qty-select' */}
      {/*         value={qty} */}
      {/*         disabled={selectedTicket === undefined || numAvail < 1} */}
      {/*         onChange={(e) => dispatch(changeQty(parseInt(e.target.value)))} */}
      {/*         className='disabled:opacity-30 disabled:cursor-not-allowed bg-zinc-800/50 p-5 text-white rounded-xl text-xl' */}
      {/*       > */}
      {/*         <option className='text-zinc-300 text-xl' value={0} disabled> */}
      {/*           select qty */}
      {/*         </option> */}
      {/*         {range(numAvail, false).map((n) => */}
      {/*           numAvail > 20 && n > 20 ? null : ( */}
      {/*             <option className='text-white text-xl' key={n} value={n}> */}
      {/*               {n} */}
      {/*             </option> */}
      {/*           ), */}
      {/*         )} */}
      {/*       </select> */}
      {/*     </div> */}
      {/*     <div */}
      {/*       className={ */}
      {/*         selectedTicketType && */}
      {/*         selectedTicketType.name === 'Pay What You Can' */}
      {/*           ? 'flex flex-col gap-2 mt-3 justify-center' */}
      {/*           : 'hidden' */}
      {/*       } */}
      {/*     > */}
      {/*       <label */}
      {/*         className='text-center text-zinc-200' */}
      {/*         htmlFor='pay-what-can-input' */}
      {/*       > */}
      {/*         Pay What You Can */}
      {/*       </label> */}
      {/*       <input */}
      {/*         id='pay-what-can-input' */}
      {/*         disabled={!selectedTicket} */}
      {/*         onChange={(e) => payWhatFunc(e)} */}
      {/*         type='number' */}
      {/*         placeholder='Enter Amount' */}
      {/*         className='disabled:opacity-30 disabled:cursor-not-allowed input border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500' */}
      {/*       /> */}
      {/*     </div> */}
      {/*     <button */}
      {/*       data-testid='get-tickets' */}
      {/*       disabled={ */}
      {/*         !qty || */}
      {/*         !selectedTicket || */}
      {/*         qty > numAvail || */}
      {/*         (selectedTicketType.name === 'Pay What You Can' && */}
      {/*           (payWhatPrice == null || payWhatPrice < 0)) */}
      {/*       } */}
      {/*       className='disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 */}
      {/*       mt-7 bg-green-600 text-base font-medium text-white enabled:hover:bg-green-700 rounded-lg */}
      {/*       enabled:focus:ring-green-300 border border-transparent */}
      {/*       shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2' */}
      {/*       onClick={handleSubmit} */}
      {/*     > */}
      {/*       Add to Cart */}
      {/*     </button> */}
      {/*   </> */}
      {/* )} */}
      <button
        data-testid='get-tickets'
        disabled={
          !selectedTicketTypes || !validTicketTypeSelection(selectedTicketTypes)
        }
        className='disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2
            mt-7 bg-green-600 text-base font-medium text-white enabled:hover:bg-green-700 rounded-lg
            enabled:focus:ring-green-300 border border-transparent
            shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
        onClick={handleSubmit}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default TicketPicker;
