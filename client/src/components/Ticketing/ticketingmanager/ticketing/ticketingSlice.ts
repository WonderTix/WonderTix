import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import format from 'date-fns/format';
import {bound, titleCase} from '../../../../utils/arrays';

/**
 * Amount of tickets in the cart
 *
 * @module
 * @param {number} product_id - references state.tickets.event_instance_id
 * @param {number} qty - amount of that product (tickets)
 * @param {Date} date
 * @param {string} name - name of the event/ticket for the event
 * @param {string} desc - description of the event
 * @param {string} product_img_url - URL to what the ticket looks like
 * @param {number} price - listed in dollars, like 60
 * @param {boolean} payWhatCan
 * @param {number?} payWhatPrice
 * @param {number} typeID - the id of the tickettype
 */
export interface CartItem {
  product_id: number; // references state.tickets.event_instance_id
  qty: number;
  date: Date;
  name: string;
  desc: string;
  product_img_url: string;
  price: number;
  payWhatCan: boolean;
  payWhatPrice?: number;
  typeID: number;
}

/**
 * Ticket item itself
 *
 * @module
 * @param {number} event_instance_id
 * @param {string} eventid
 * @param {string} admission_type - default is 'General Admission' type tickets
 * @param {number?} payWhatYouCan
 * @param {Date} date - date format
 * @param {number} ticket_price - A number for the ticket price
 * @param {number} concession_price
 * @param {number?} totalseats - the total amount of seats available
 * @param {number} availableseats - amount of leftover seats, gets subtracted when people buy
 */
export interface Ticket {
  event_instance_id: number;
  eventid: string;
  admission_type: 'General Admission - Adult' | 'Pay What You Can';
  payWhatYouCan?: number;
  date: Date;
  ticket_price: number;
  concession_price: number;
  totalseats?: number;
  availableseats: number;
}

/**
 * Ticket Restriction Item
 *
 * @module
 * @param {number} id
 * @param {number} eventinstanceid
 * @param {number} tickettypeid
 * @param {number} ticketlimit
 * @param {number?} ticketssold
 */
export interface TicketRestriction {
  id: number;
  eventinstanceid: number;
  tickettypeid: number;
  ticketlimit: number;
  ticketssold?: number;
}

/**
 * TicketType Info
 *
 * @module
 * @param {number} id - Ticket type ID
 * @param {string} name
 * @param {string} price
 * @param {string} concessions
 */

export interface TicketType {
  id: number;
  name: string;
  price: string;
  concessions: string;
}

/**
 * The interface for event
 *
 * @module
 * @param {string} id - Event id
 * @param {string} title - title of event showing
 * @param {string} description
 * @param {string} imageurl
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  imageurl: string;
}

/**
 * Discount code
 *
 * @module
 * @param {number} discountid
 * @param {string} code - the discount code itself
 * @param {number} amount - A set number of dollars off
 * @param {number} percent - A percentage to be taken off
 * @param {number} startdate - yyyymmdd format
 * @param {number} enddate - yyyymmdd format
 * @param {number} min_tickets - The minimum number of tickets for this discount to apply
 * @param {number} min_events - The minimum number of events for this discount to apply
 * @param {number} usagelimit - The maximum number of times this discount can be used
 */
export interface Discount {
  discountid: number;
  code: string;
  amount: number;
  percent: number;
  startdate: number;
  enddate: number;
  min_tickets: number;
  min_events: number;
  usagelimit: number;
}

type TicketsState = {data: {byId: {[key: string]: Ticket}; allIds: number[]}};

/**
 * Four states - 'idle', 'loading', 'success', 'failed'
 *
 * @module
 */
export type LoadStatus = 'idle' | 'loading' | 'success' | 'failed';
export type DiscountItem = {
  code: string;
  amount: number;
  percent: number;
  minTickets: number;
  minEvents: number;
};

/**
 * Used to manage the ticketing states
 *
 * @module
 * @param {Array} cart - CartItem array
 * @param {TicketsState} tickets - TicketsState has a key(string), byId(ticket), allIds is a number array
 * @param {Array} ticketrestrictions - TicketRestriction array
 * @param {TicketType} tickettype - The ticket type
 * @param {Array} events - Event array
 * @param {LoadStatus} status - Array of different loading states
 * @param {DiscountItem} discount - Discount has a code(string), amount(number), percent(number)
 */
export interface ticketingState {
  cart: CartItem[];
  tickets: TicketsState;
  ticketrestrictions: TicketRestriction[];
  tickettype: TicketType;
  events: Event[];
  status: LoadStatus;
  discount: DiscountItem;
}

/**
 * @param {string} url - gets data
 * @returns Error message on fail, otherwise gets message
 */
const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
};

/**
 * Fetches all the events, ticketRestriction and tickets data
 *
 * @module
 * @returns {Array} events, ticketRestrictions, tickets, byID, allIds
 */
export const fetchTicketingData = createAsyncThunk(
  'ticketing/fetch',
  async () => {
    const eventData = await fetchData(process.env.REACT_APP_API_1_URL + '/events');
    const events: Event[] = eventData.data;

    const restrictionData = await fetchData(process.env.REACT_APP_API_1_URL + '/tickets/restrictions');
    const ticketRestrictions: TicketRestriction[] = restrictionData.data;

    const ticketState: TicketsState = await fetchData(process.env.REACT_APP_API_1_URL + '/tickets');
    const tickets = Object.entries(ticketState.data.byId).reduce(
      (res, [key, val]) => ({
        ...res,
        [key]: {...val, date: new Date(val.date).toString()},
      }),
      {},
    );

    return {
      events,
      ticketRestrictions,
      tickets: {data: {byId: tickets, allIds: ticketState.data.allIds}},
    };
  },
);

/**
 * Fetches all the data, and gets all the api routes then prints to console
 *
 * @module
 * @returns {DiscountItem} code, amount, percent
 */
export const fetchDiscountData = createAsyncThunk(
  'ticketing/fetchDiscount',
  async (code: string) => {
    const url =
      process.env.REACT_APP_API_1_URL + '/discounts/search?code=' + code;
    const discountData = await fetchData(url);
    const discountArray: Discount[] = discountData.data;
    const discount: DiscountItem = {
      code: discountArray[0].code,
      amount: discountArray[0].amount,
      percent: discountArray[0].percent,
      minTickets: discountArray[0].min_tickets,
      minEvents: discountArray[0].min_events,
    };

    console.log('Discount returned:', discountArray[0]);

    // Check date (after startDate and before EndDate)
    const nowDate = new Date(Date.now());
    const now = Number(
      nowDate.getFullYear().toString() +
        (nowDate.getMonth() + 1).toString() +
        nowDate.getDate().toString(),
    );
    console.log('Current date in db format:', now);

    const start = discountArray[0].startdate;
    const end = discountArray[0].enddate;
    console.log('Start:', start);
    console.log('End:', end);

    if (end && end < now) {
      console.log('EndDate is before now!');
      return;
    }
    if (start && start > now) {
      console.log('StartDate is after now!');
      return;
    }

    // Check min tickets
    console.log('Min tickets:', discount.minTickets);

    // Check min events
    console.log('Min events:', discount.minEvents);

    // Check number of uses limit (???)
    console.log('Usage limit:', discountArray[0].usagelimit);

    return {discount};
  },
);

/**
 * Uses appendCartField to append to the cartfield
 *
 * @module
 * @param data.ticket
 * @param data.tickettype
 * @param data.event
 * @param data.qty
 * @param data.payWhatPrice
 * @param {CartItem} data - ticket, event, qty, CartItem
 * @returns appended cart item
 */
export const createCartItem = (data: {
  ticket: Ticket;
  tickettype: TicketType;
  event: Event;
  qty: number;
  payWhatPrice?: number;
}): CartItem => {
  const {ticket, tickettype, event, qty, payWhatPrice} = data;

  if (ticket && tickettype && event && qty) {
    const cartItem: CartItem = {
      product_id: ticket.event_instance_id,
      price: parseFloat(tickettype.price.replace(/[^0-9.-]+/g, '')),
      desc: `${tickettype.name} - ${format(
        new Date(ticket.date),
        'eee, MMM dd - h:mm a',
      )}`,
      typeID: tickettype.id,
      date: ticket.date,
      name: `${titleCase(event.title)} Ticket${qty > 1 ? 's' : ''}`,
      qty: qty,
      product_img_url: event.imageurl,
      payWhatPrice: payWhatPrice,
      payWhatCan: !!payWhatPrice,
    };

    if (cartItem.payWhatCan) {
      cartItem.price = payWhatPrice;
    }

    return cartItem;
  }
};

/**  @param {string} EventId */
type EventId = string;

/**
 * @param obj
 * @returns {boolean} checks if ticket object matches event_instance_id
 */
const isTicket = (obj: any): obj is Ticket =>
  Object.keys(obj).some((key) => key === 'event_instance_id');

/**
 * @param obj
 * @returns {boolean} checks if cart object matches product_id
 */
const isCartItem = (obj: any): obj is CartItem =>
  Object.keys(obj).some((key) => key === 'product_id');

/**
 * @param obj
 * @returns {boolean} checks if ticket restriction object has ticketlimit key
 */
const isTicketRestriction = (obj: any): obj is TicketRestriction =>
  Object.keys(obj).some((key) => key === 'ticketlimit');

/**
 * byId does checks by ID. If a cart item, checks both product_id and typeID
 *
 * @param id
 * @param tickettypeId
 */
const byId =
  (id: number | EventId, tickettypeId?: number) =>
    (obj: Ticket | Event | CartItem | TicketRestriction) =>
      isTicket(obj)
        ? obj.event_instance_id === id
        : isCartItem(obj)
          ? obj.product_id === id && obj.typeID === tickettypeId
          : isTicketRestriction(obj)
            ? obj.eventinstanceid === id && obj.tickettypeid === tickettypeId
            : obj.id === id;

/**
 * hasConcessions checks if CartItem includes Concessions
 *
 * @param item
 */
const hasConcessions = (item: CartItem) => item.name.includes('Concessions');

/**
 * applyConcession appends and adds that it's a ticket with concessions
 *
 * @param c_price
 * @param item
 */
const applyConcession = (c_price: number, item: CartItem) =>
  hasConcessions(item) ? item : {
    ...item,
    name: item.name + ' + Concessions',
    price: c_price + item.price,
    desc: `${item.desc} with concessions ticket`,
  };

/**
 * @param id
 * @param tickettypeId
 * @param qty
 * @param concessions
 */
interface ItemData {
  id: number;
  tickettypeId: number;
  qty: number;
  concessions?: number;
  payWhatPrice?: number;
}

/**
 * updateCartItem edits the cart items like qty, id, and concessions
 *
 * @param cart
 * @param root0
 * @param root0.id
 * @param root0.tickettypeId
 * @param root0.qty
 * @param root0.concessions
 * @param root0.payWhatPrice
 */
const updateCartItem = (
  cart: CartItem[],
  {id, tickettypeId, qty, concessions, payWhatPrice}: ItemData,
) =>
  cart.map((item) => {
    if (item.product_id === id && item.typeID === tickettypeId) {
      const updatedItem = payWhatPrice && item.payWhatCan ? {...item, qty, payWhatPrice} : {...item, qty};
      if (concessions) {
        return applyConcession(concessions, {...updatedItem});
      } else {
        return {...updatedItem};
      }
    } else {
      return item;
    }
  });

/**
 * @param cart
 * @param num
 * @param qty
 */
const payWhatFunc = (cart: CartItem, num: number, qty: number) => {
  cart.payWhatCan = true;
  cart.payWhatPrice = num * qty;
  cart.price = num;
};

/**
 * Checks if the ticketTypeId is General Admission - Adult (at the moment, ID=1)
 *
 * @param ticketTypeId
 */
const isGeneralAdmissionAdult = (ticketTypeId: number): boolean => {
  return ticketTypeId === 1;
};

/**
 * Gets a bounded range for how many tickets are available to purchase for a ticket
 * type in a given event instance. If general admission, then total available seats.
 * If any other type, then based on the limit set in ticket restriction.
 *
 * @param state
 * @param eventInstanceId
 * @param ticketTypeId
 * @param ticket
 */
const getTicketQuantityRange = (state: ticketingState, eventInstanceId: number, ticketTypeId: number, ticket: Ticket) => {
  const eventInstanceAvailableSeats = ticket.availableseats;

  if (isGeneralAdmissionAdult(ticketTypeId)) {
    return bound(0, eventInstanceAvailableSeats);
  } else {
    const ticketRestriction = state.ticketrestrictions.find(byId(eventInstanceId, ticketTypeId));
    const ticketRestrictionAvailableSeats = ticketRestriction.ticketlimit - ticketRestriction.ticketssold;
    return bound(0, Math.min(eventInstanceAvailableSeats, ticketRestrictionAvailableSeats));
  }
};

/**
 * addTicketReducer adds a ticketReducer to the payload and checks the id similar to qtyReducer
 *
 * @param state
 * @param action
 */
const addTicketReducer: CaseReducer<
  ticketingState,
  PayloadAction<{
    id: number;
    tickettype: TicketType;
    qty: number;
    concessions: boolean;
    payWhatPrice?: number;
  }>
> = (state, action) => {
  const {id, tickettype, qty, concessions, payWhatPrice} = action.payload;

  const tickets = state.tickets;
  if (!tickets.data.allIds.includes(id)) return state;

  const ticket = tickets.data.byId[id];
  const validRange = getTicketQuantityRange(state, id, tickettype.id, ticket);

  const cartItem = state.cart.find(byId(id, tickettype.id));
  if (cartItem) {
    return {
      ...state,
      cart: updateCartItem(state.cart, {
        id,
        tickettypeId: tickettype.id,
        qty: validRange(qty + cartItem.qty),
        concessions: concessions ? ticket.concession_price : undefined,
        payWhatPrice,
      }),
    };
  } else {
    const event = state.events.find(byId(ticket.eventid));

    const newCartItem = event
      ? createCartItem({ticket, tickettype, event, qty, payWhatPrice})
      : null;

    return newCartItem ? {
      ...state,
      cart: concessions
        ? [
          ...state.cart,
          applyConcession(ticket.concession_price, newCartItem),
        ] : [...state.cart, newCartItem],
    } : state;
  }
};

/**
 * editQtyReducer changes the qty, don't update if ticket doesn't exist, and don't try to set more if available
 *
 * @param state
 * @param action
 */
// Do not update state if 1) ticket doesn't exist, 2) try to set more than available
const editQtyReducer: CaseReducer<
  ticketingState,
  PayloadAction<{id: number; tickettypeId: number; qty: number}>
> = (state, action) => {
  const {id, tickettypeId, qty} = action.payload;
  if (!state.tickets.data.allIds.includes(id)) return state;

  const ticket = state.tickets.data.byId[id];
  const validRange = getTicketQuantityRange(state, id, tickettypeId, ticket);

  return {
    ...state,
    cart: updateCartItem(state.cart, {
      id,
      tickettypeId,
      qty: validRange(qty),
    }),
  };
};

/**
 * Makes an initial state for ticketing
 *
 * @module
 * @param {Array} cart - []
 * @param {Array} tickets - byId: {}, allIds: []
 * @param {TicketRestriction} - []
 * @param {TicketType} tickettype - {0, '', '', ''}
 * @param {Array} events - []
 * @param {string} status - 'idle'
 * @param {DiscountItem} discount - {'', 0, 0, 0, 0}
 */
export const INITIAL_STATE: ticketingState = {
  cart: [],
  tickets: {data: {byId: {}, allIds: []}},
  ticketrestrictions: [],
  tickettype: {id: 0, name: '', price: '', concessions: ''},
  events: [],
  status: 'idle',
  discount: {code: '', amount: 0, percent: 0, minTickets: 0, minEvents: 0},
};

/** ticketSlice = createSlice, creates the ticketing slice */
const ticketingSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addTicketToCart: addTicketReducer,
    editItemQty: editQtyReducer,
    removeDiscountFromCart: (state) => ({
      ...state,
      discount: INITIAL_STATE.discount,
    }),
    removeTicketFromCart: (state, action: PayloadAction<number>) => ({
      ...state,
      cart: state.cart.filter((item) => item.product_id !== action.payload),
    }),
    removeAllTicketsFromCart: (state) => ({
      ...state,
      cart: [],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscountData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiscountData.fulfilled, (state, action) => {
        state.status = 'success';
        state.discount = action.payload
          ? action.payload.discount
          : {code: '', amount: 0, percent: 0, minTickets: 0, minEvents: 0};
      })
      .addCase(fetchDiscountData.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchTicketingData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTicketingData.fulfilled, (state, action) => {
        state.status = 'success';
        state.events = action.payload.events ? action.payload.events : [];
        state.ticketrestrictions = action.payload.ticketRestrictions ? action.payload.ticketRestrictions : [];
        state.tickets = action.payload.tickets
          ? action.payload.tickets
          : {data: {byId: {}, allIds: []}};
      })
      .addCase(fetchTicketingData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

/**
 * export selectCartSubtotal, selectCartTotal, selectCartItem, selectCartTicketCount, selectCartContents, selectDiscount
 *
 * @param state
 */
export const selectCartSubtotal = (state: RootState): number =>
  state.ticketing.cart.reduce((tot, item) => {
    if (!item.payWhatCan) {
      return tot + item.price * item.qty;
    } else {
      return tot + item.payWhatPrice;
    }
  }, 0);
export const selectCartTotal = (state: RootState): number =>
  Math.max(
    selectCartSubtotal(state) * (1 - state.ticketing.discount.percent / 100) -
      state.ticketing.discount.amount,
    0,
  );
export const selectCartItem = (
  state: RootState,
  event_instance_id: number,
  tickettypeId: number,
): CartItem | undefined =>
  state.ticketing.cart.find((item) => item.product_id === event_instance_id && item.typeID === tickettypeId);
export const selectCartTicketCount = (
  state: RootState,
): {[key: number]: number} =>
  state.ticketing.cart.reduce((acc, item) => {
    const key = item.product_id;
    if (key in acc) {
      return acc;
    } else {
      return {...acc, [key]: item.qty};
    }
  }, {});
export const selectCartContents = (state: RootState): CartItem[] =>
  state.ticketing.cart;
export const selectDiscount = (state: RootState): DiscountItem =>
  state.ticketing.discount;

/**
 * filterTicketsReducer - self-explanatory
 *
 * @param ticketsById
 * @param {EventId} eventid
 */
const filterTicketsReducer =
  (ticketsById: {[key: number]: Ticket}, eventid: EventId) =>
    (filtered: Ticket[], id: number) => {
      return ticketsById[id].eventid === eventid
        ? [...filtered, ticketsById[id]]
        : filtered;
    };

/**
 * Interface for EventPageData
 *
 * @module
 * @param {string} title
 * @param {string} description
 * @param {string} imageurl
 * @param {Array} tickets
 */
export interface EventPageData {
  title: string;
  description: string;
  imageurl: string;
  tickets: Ticket[];
}

/**
 * Name says it all
 *
 * @module
 * @param {RootState} state - different types of state of selectEventData
 * @param {EventId} eventid
 * @param ticketData - uses state.ticketing.tickets
 * @param event - uses state.ticketing.events.find(byId(eventid))
 * @returns playData, Tickets | undefined
 */
export const selectEventData = (
  state: RootState,
  eventid: EventId,
): EventPageData | undefined => {
  const ticketData = state.ticketing.tickets;
  const event = state.ticketing.events.find(byId(eventid));
  if (event) {
    const {...playData} = event;
    const tickets = ticketData.data.allIds.reduce(
      filterTicketsReducer(ticketData.data.byId, eventid),
      [] as Ticket[],
    );
    return {...playData, tickets};
  } else {
    return undefined;
  }
};

/**
 * Manages events page
 *
 * @module
 * @param {EventId} id
 * @param {string} eventname
 * @param {string} eventdescription
 * @param {number} numShows
 */
// Used for manage events page
interface EventSummaryData {
  id: EventId;
  eventname: string;
  eventdescription: string;
  numShows: number;
}

/**
 * Gets the data from the play when selected
 *
 * @module
 * @param {RootState} state
 * @returns {Array} id: event.id, eventname: title, eventdescription: description, numShows: filteredTickets.length
 */
export const selectPlaysData = (state: RootState): Array<any> =>
  state.ticketing.events.reduce((res, event) => {
    const {id, title, description} = event;
    const filteredTickets = state.ticketing.tickets.data.allIds.reduce(
      filterTicketsReducer(state.ticketing.tickets.data.byId, id),
      [] as Ticket[],
    );

    return [
      ...res,
      {
        id: event.id,
        eventname: title,
        eventdescription: description,
        numShows: filteredTickets.length,
      },
    ];
  }, [] as EventSummaryData[]);

/**
 * Gets num of tickets available
 *
 * @module
 * @param {RootState} state
 * @param {number} ticketid
 * @returns ticket.availableseats
 */
export const selectNumAvailable = (state: RootState, ticketid: number) => {
  const ticket = state.ticketing.tickets.data.byId[ticketid];
  return ticket ? ticket.availableseats : 0;
};

export const {
  addTicketToCart,
  editItemQty,
  removeDiscountFromCart,
  removeTicketFromCart,
  removeAllTicketsFromCart,
} = ticketingSlice.actions;

export default ticketingSlice.reducer;
