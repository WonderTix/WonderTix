import React, {ReactElement, useEffect, useReducer} from 'react';
import {useAppDispatch} from '../app/hooks';
import isSameDay from 'date-fns/isSameDay';
import {addTicketToCart, Ticket} from '../ticketingmanager/ticketingSlice';
import ShowingTimeSelect from './ShowingTimeSelect';
import {formatUSD} from '../ticketingmanager/RefundOrders/RefundOrders';
import {DateOption, ShowingDateSelect} from './ShowingDateSelect';
import {TicketOptions, TicketInput} from './TicketOptions';
import {getUniqueFormattedDateOptions} from './ticketPickerUtils';

export interface TicketType {
  id: number;
  name: string;
  price: string;
  fee: string;
  numAvail: number;
}

/**
 * @param {DateOption?} selectedDate
 * @param {Ticket[]} displayedShowings
 * @param {Ticket?} selectedTime
 * @param {TicketInput[]} showingTicketInputs
 */
interface TicketPickerState {
  selectedDate?: DateOption;
  displayedShowings: Ticket[];
  selectedTime?: Ticket;
  showingTicketTypes: TicketType[];
  showingTicketInputs: TicketInput[];
}

/**
 * Initial state for the Ticket Picker
 */
const initialState: TicketPickerState = {
  selectedDate: undefined,
  displayedShowings: [],
  selectedTime: undefined,
  showingTicketTypes: [],
  showingTicketInputs: [],
};

// Action creators
const dateSelected = (d: DateOption, t: Ticket[]) => ({
  type: 'date_selected',
  payload: {dateOption: d, tickets: t},
});
const timeSelected = (t: Ticket) => ({type: 'time_selected', payload: t});
const resetWidget = () => ({type: 'reset'});
const updateTicketTypes = (t: TicketType[]) => ({
  type: 'update_ticket_types',
  payload: {showingTicketTypes: t},
});
const updateTicketInputs = (t: TicketInput[]) => ({
  type: 'update_ticket_inputs',
  payload: {showingTicketInputs: t},
});

/**
 * TicketPickerReducer is meant to be used to lower ticket numbers
 * Default:
 *      ...state,
 *      selectedDate: undefined,
 *      displayedShowings: sameDayShows,
 *      selectedTime: undefined,
 *      showingTicketTypes: [],
 *      showingTicketInputs: [],
 *
 * @param state
 * @param action
 * @returns a certain default state unless failed
 */
const TicketPickerReducer = (
  state: TicketPickerState,
  action: any,
): TicketPickerState => {
  switch (action.type) {
    case 'date_selected': {
      const {dateOption, tickets} = action.payload;
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
        displayedShowings: sameDayShows,
        selectedTime: undefined,
        showingTicketTypes: [],
        showingTicketInputs: [],
      };
    }
    case 'time_selected': {
      return {
        ...state,
        selectedTime: action.payload,
      };
    }
    case 'update_ticket_types': {
      return {
        ...state,
        showingTicketTypes: action.payload.showingTicketTypes,
      };
    }
    case 'update_ticket_inputs': {
      return {
        ...state,
        showingTicketInputs: action.payload.showingTicketInputs,
      };
    }
    case 'reset': {
      return initialState;
    }
    default: {
      throw new Error('Received undefined action type');
    }
  }
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

  const dateOptions = getUniqueFormattedDateOptions(tickets);

  const [
    {
      selectedDate,
      displayedShowings,
      selectedTime,
      showingTicketTypes,
      showingTicketInputs,
    },
    dispatch,
  ] = useReducer(TicketPickerReducer, initialState);

  useEffect(() => {
    // Select the first date on loading the page
    if (dateOptions.length) {
      dispatch(dateSelected(dateOptions[0], tickets));
    }
  }, []);

  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (selectedTime) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            process.env.REACT_APP_API_2_URL +
              `/ticket-restriction/${selectedTime.event_instance_id}`,
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
              selectedTime.availableseats,
            ),
          }));

          dispatch(updateTicketTypes(showingTypes));
        } catch (error) {
          console.error(error);
        }
      };

      void fetchData();
    } else {
      dispatch(updateTicketTypes([]));
    }
  }, [selectedTime]);

  const handleSelectDate = (date: DateOption, tickets: Ticket[]) => {
    if (date.date !== selectedDate?.date) {
      dispatch(dateSelected(date, tickets));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ticketInfo = {
      qty: showingTicketInputs.reduce((sum, type) => sum + type.qty, 0),
      selectedDate: new Date(selectedDate.date),
    };

    // Send ticket info to parent to display
    onSubmit(ticketInfo);

    // Add tickets to cart
    showingTicketInputs.forEach((ticketInput) => {
      if (ticketInput.qty > 0) {
        appDispatch(
          addTicketToCart({
            id: selectedTime.event_instance_id,
            tickettype: ticketInput.type,
            qty: ticketInput.qty,
            payWhatPrice: ticketInput.payWhatCanPrice ?? 0,
          }),
        );
      }
    });

    // Reset page to defaults
    dispatch(resetWidget());
    if (dateOptions.length) {
      dispatch(dateSelected(dateOptions[0], tickets));
    }
  };

  const isValidTicketTypeSelection = (ticketTypesInputs: TicketInput[]) => {
    // At least one must have a qty > 0
    const hasSomeValidQuantity = ticketTypesInputs.some(
      (typeInput) => typeInput.qty > 0,
    );

    // The pay what price type if existing must have a >=0 value if it has a qty > 0
    const payWhatType = ticketTypesInputs.find(
      (typeInput) => typeInput.type.name === 'Pay What You Can',
    );
    let isValidPayWhatType = true;
    if (payWhatType && payWhatType.qty > 0 && (payWhatType.payWhatCanPrice < 0 || payWhatType.payWhatCanPrice === undefined)) {
      isValidPayWhatType = false;
    }

    return hasSomeValidQuantity && isValidPayWhatType;
  };

  return (
    <div className='bg-zinc-200/20 shadow-md backdrop-blur-md p-8 pb-28 flex flex-col items-center rounded-xl w-full'>
      <ShowingDateSelect
        dateOptions={dateOptions}
        selectedDate={selectedDate}
        onSelectDate={(date) => handleSelectDate(date, tickets)}
      />
      <div className='flex flex-col md:flex-row items-center md:items-stretch w-full gap-12 md:min-h-[13.8em]'>
        <ShowingTimeSelect
          showings={displayedShowings}
          selectedTime={selectedTime}
          onSelectShowingTime={(showing) => dispatch(timeSelected(showing))}
        />
        <TicketOptions
          ticketTypes={showingTicketTypes}
          onChange={(typeInputs) => dispatch(updateTicketInputs(typeInputs))}
        />
      </div>
      <button
        data-testid='get-tickets'
        disabled={
          !showingTicketInputs ||
          !isValidTicketTypeSelection(showingTicketInputs)
        }
        className='disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 absolute
          bottom-7 mx-auto
          bg-green-600 text-base font-medium text-white enabled:hover:bg-green-700 rounded-lg
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
