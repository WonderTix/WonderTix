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
    } else {
      setShowingTicketTypes([]);
    }
  }, [selectedTicket]);

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
    setShowingTicketTypes([]);
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
      <div className='flex flex-col md:flex-row items-center w-full gap-12'>
        <ShowingTimeSelect
          check={prompt}
          showings={displayedShowings}
          onSelectShowingTime={(showing) => dispatch(timeSelected(showing))}
        />
        <TicketOptions
          ticketTypes={showingTicketTypes}
          onChange={(typeInputs) => dispatch(changeTicketTypes(typeInputs))}
        />
      </div>
      <button
        data-testid='get-tickets'
        disabled={
          !selectedTicketTypes || !validTicketTypeSelection(selectedTicketTypes)
        }
        className='disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2
            mt-12 bg-green-600 text-base font-medium text-white enabled:hover:bg-green-700 rounded-lg
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
