import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import format from 'date-fns/format';
import {bound, titleCase} from '../../../utils/arrays';
import {SeasonInfo} from './Season/components/utils/seasonCommon';

/**
 * Base Cart Item
 *
 * @module
 * @param {number} qty -  product quantity
 * @param {string} name - name of cart item
 * @param {string} desc - description of cart item
 * @param {string} product_img_url - product image URL
 * @param {number} price - Per-unit price
 */
export interface CartItem {
  name: string;
  desc: string;
  qty: number;
  price: number;
  product_img_url: string;
}

/**
 * Amount of tickets in the ticketCart
 *
 * @module
 * @param {number} product_id - references state.tickets.event_instance_id
 * @param {number} eventId - the id of the event
 * @param {Date} date
 * @param {boolean} payWhatCan
 * @param {number?} payWhatPrice
 * @param {number?} fee
 * @param {number} typeID - the id of the tickettype
 */
export interface TicketCartItem extends CartItem {
  product_id: number; // references state.tickets.event_instance_id
  eventId: number;
  date: Date;
  payWhatCan: boolean;
  payWhatPrice?: number;
  fee: number;
  typeID: number;
}

/**
 * Subscription Cart Item
 *
 * @module
 * @param {number} qtyAvailable - quantity being purchased
 * @param {number} seasonid_fk -  subscription season id
 * @param {number} subscriptiontypeid_fk - subscription type id
 */
export interface SubscriptionCartItem extends CartItem {
  seasonid_fk: number;
  subscriptiontypeid_fk: number;
  qtyAvailable: number;
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
 * @param {number?} totalseats - the total amount of seats available
 * @param {number} availableseats - amount of leftover seats, gets subtracted when people buy
 */
export interface Ticket {
  event_instance_id: number;
  eventid: number;
  admission_type: 'General Admission - Adult' | 'Pay What You Can';
  payWhatYouCan?: number;
  date: Date;
  ticket_price: number;
  totalseats?: number;
  availableseats: number;
  remainingtickets: number;
  detail: string;
}

/**
 * Ticket Restriction Item
 *
 * @module
 * @param {number} id
 * @param {number} eventinstanceid
 * @param {number} tickettypeid
 * @param {string} description
 * @param {number} price
 * @param {number} fee
 * @param {number} ticketlimit
 * @param {number?} ticketssold
 */
export interface TicketRestriction {
  id: number;
  eventinstanceid: number;
  tickettypeid: number;
  description: string;
  price: number;
  fee: number;
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
 * @param {string} fee
 */
export interface TicketType {
  id: number;
  name: string;
  price: string;
  fee: string;
}

/**
 * The interface for event
 *
 * @module
 * @param {number} id - Event id
 * @param {string} title - title of event showing
 * @param {string} description
 * @param {string} imageurl
 * @param {boolean} soldOut
 */
export interface Event {
  id: number;
  title: string;
  description: string;
  imageurl: string;
  soldOut: boolean;
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
  active: boolean;
  amount: number;
  percent: number;
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
  discountid: number;
  code: string;
  amount: number;
  percent: number;
  min_tickets: number;
  min_events: number;
};

/**
 * Used to manage the ticketing states
 *
 * @module
 * @param {Array} ticketCart - TicketCartItem array
 * @param {Array} subscriptionCart - SubscriptionCartItem array
 * @param {TicketsState} tickets - TicketsState has a key(string), byId(ticket), allIds is a number array
 * @param {Array} ticketrestrictions - TicketRestriction array
 * @param {TicketType} tickettype - The ticket type
 * @param {Array} events - Event array
 * @param {LoadStatus} status - Array of different loading states
 * @param {DiscountItem} discount - Discount has a code(string), amount(number), percent(number)
 */
export interface ticketingState {
  ticketCart: TicketCartItem[];
  subscriptionCart: SubscriptionCartItem[];
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
    if (!res.ok) {
      throw res;
    }
    return await res.json();
  } catch (err) {
    if (err instanceof Response) {
      console.error(await err.json());
      return;
    }
    console.error(err.message);
  }
};

/**
 * Fetches all the events, ticket restrictions and tickets data
 *
 * @module
 * @returns {Array} events, ticketRestrictions, tickets, byID, allIds
 */
export const fetchTicketingData = createAsyncThunk(
  'ticketing/fetch',
  async () => {
    const ticketRestrictions: TicketRestriction[] = await fetchData(
      process.env.REACT_APP_API_2_URL + '/ticket-restriction',
    );

    const ticketState: TicketsState = await fetchData(
      process.env.REACT_APP_API_2_URL + '/event-instance/tickets',
    );
    const tickets = Object.entries(ticketState.data.byId).reduce(
      (res, [key, val]) => ({
        ...res,
        [key]: {...val, date: new Date(val.date).toString()},
      }),
      {},
    );

    const eventData: Event[] = await fetchData(
      process.env.REACT_APP_API_2_URL + '/events/slice',
    );
    const events = eventData.map((event) => {
      const tickets = ticketState.data.allIds.reduce(
        filterTicketsReducer(ticketState.data.byId, event.id),
        [] as Ticket[],
      );
      const soldOut = tickets.reduce((soldOutAcc, currTicket) => {
        return soldOutAcc && currTicket.remainingtickets === 0;
      }, true);

      return {...event, soldOut};
    });

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
 * @returns {DiscountItem}
 */
export const fetchDiscountData = createAsyncThunk(
  'ticketing/fetchDiscount',
  async (code: string) => {
    const url = `${process.env.REACT_APP_API_2_URL}/discount/code/${code}?active=true`;
    const discountResp: Discount = await fetchData(url);
    const discount: DiscountItem = {
      discountid: discountResp.discountid,
      code: discountResp.code,
      amount: Number(discountResp.amount),
      percent: discountResp.percent,
      min_tickets: discountResp.min_tickets,
      min_events: discountResp.min_events,
    };

    return {discount};
  },
);

/**
 * Creates a TicketCartItem based on incomplete data
 *
 * @module
 * @param data.ticket
 * @param data.tickettype
 * @param data.event
 * @param data.qty
 * @param data.payWhatPrice
 * @param {TicketCartItem} data ticket, tickettype, event, qty, payWhatPrice?
 * @returns full CartItem
 */
export const createTicketCartItem = (data: {
  ticket: Ticket;
  tickettype: TicketType;
  event: Event;
  qty: number;
  payWhatPrice?: number;
}): TicketCartItem => {
  const {ticket, tickettype, event, qty, payWhatPrice} = data;

  if (ticket && tickettype && event && qty) {
    const ticketCartItem: TicketCartItem = {
      product_id: ticket.event_instance_id,
      eventId: event.id,
      price: parseFloat(tickettype.price.replace(/[^0-9.-]+/g, '')),
      desc: `${tickettype.name} - ${format(
        new Date(ticket.date),
        'eee, MMM dd - h:mm a',
      )}${(ticket.detail ?? '') === '' ? '' : ` (${ticket.detail})`}`,
      typeID: tickettype.id,
      date: ticket.date,
      name: `${titleCase(event.title)} Ticket${qty > 1 ? 's' : ''}`,
      qty: qty,
      product_img_url: event.imageurl,
      payWhatPrice: payWhatPrice,
      payWhatCan: tickettype.name === 'Pay What You Can',
      fee: parseFloat(tickettype.fee.replace(/[^0-9.-]+/g, '')),
    };

    if (ticketCartItem.payWhatCan) {
      ticketCartItem.price = payWhatPrice;
    }

    return ticketCartItem;
  }
};

export interface SeasonSubscriptionType {
    seasonid_fk: number;
    subscriptiontypeid_fk: number;
    subscriptionlimit: number;
    subscriptionssold: number;
    price: number;
    name: string;
    ticketlimit: number;
    season: SeasonInfo;
}

export const createSubscriptionCartItem = (
  type: SeasonSubscriptionType,
): SubscriptionCartItem | undefined => {
  const {
    seasonid_fk,
    subscriptiontypeid_fk,
    subscriptionlimit,
    subscriptionssold,
    name,
    ticketlimit,
    season,
    price,
  } = type;
  if (
    !seasonid_fk ||
    !subscriptiontypeid_fk
  ) {
    return;
  }
  return {
    seasonid_fk,
    subscriptiontypeid_fk,
    qtyAvailable: subscriptionlimit - subscriptionssold,
    name: `${name} Subscription`,
    desc: `${ticketlimit} show${ticketlimit > 1? 's': ''} for ${season.name}`,
    qty: 0,
    price: Number(price),
    product_img_url: season.imageurl,
  };
};

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
export const isTicketCartItem = (obj: any): obj is TicketCartItem =>
  Object.keys(obj).some((key) => key === 'product_id');

export const isSubscriptionCartItem = (obj: any): obj is SubscriptionCartItem => {
  return (
    obj.subscriptiontypeid_fk !== undefined && obj.seasonid_fk !== undefined && obj.qty !== undefined
  );
};

/**
 * @param obj
 * @returns {boolean} checks if ticket restriction object has ticketlimit key
 */
const isTicketRestriction = (obj: any): obj is TicketRestriction =>
  Object.keys(obj).some((key) => key === 'ticketlimit');

/**
 * byId does checks by ID. If a ticketCartItem, checks both product_id and typeID
 *
 * @param id
 * @param tickettypeId
 */
const byId =
  (id: number, tickettypeId?: number) =>
  (obj: Ticket | Event | TicketCartItem | TicketRestriction) =>
    isTicket(obj)
      ? obj.event_instance_id === id
      : isTicketCartItem(obj)
      ? obj.product_id === id && obj.typeID === tickettypeId
      : isTicketRestriction(obj)
      ? obj.eventinstanceid === id && obj.tickettypeid === tickettypeId
      : obj.id === id;

/**
 * @param id
 * @param tickettypeId
 * @param qty
 * @param payWhatPrice
 */
interface ItemData {
  id: number;
  tickettypeId: number;
  qty: number;
  payWhatPrice?: number;
}

export const totalCartTicketCount = (state: ticketingState) =>
  state.ticketCart.reduce((tot, item) => {
    return tot + item.qty;
  }, 0);

export const totalCartEventCount = (state: ticketingState) => {
  const eventIds = new Set<number>();
  state.ticketCart.forEach((item) => eventIds.add(item.eventId));
  return eventIds.size;
};

const isValidDiscount = (discount: DiscountItem, state: ticketingState) => {
  return !(
    totalCartTicketCount(state) < discount.min_tickets ||
    totalCartEventCount(state) < discount.min_events
  );
};

/**
 * updateTicketCartItem edits the ticketCart items like qty and payWhatPrice
 *
 * @param ticketCartItems
 * @param root0
 * @param root0.id
 * @param root0.tickettypeId
 * @param root0.qty
 * @param root0.payWhatPrice
 */
const updateTicketCartItem = (
  ticketCartItems: TicketCartItem[],
  {id, tickettypeId, qty, payWhatPrice}: ItemData,
) =>
  ticketCartItems.map((item) => {
    if (item.product_id === id && item.typeID === tickettypeId) {
      return payWhatPrice && item.payWhatCan
        ? {...item, qty, payWhatPrice}
        : {...item, qty};
    } else {
      return item;
    }
  });

const updateSubscriptionCartItem = (
  subscriptionCart: SubscriptionCartItem[],
  toUpdate: SubscriptionCartItem,
) => {
  if (toUpdate.qty > toUpdate.qtyAvailable || toUpdate.qty < 0) {
    return subscriptionCart;
  }
  const filteredCart = subscriptionCart.filter(
    (item) =>
      item.subscriptiontypeid_fk !== toUpdate.subscriptiontypeid_fk ||
      item.seasonid_fk !== toUpdate.seasonid_fk,
  );
  if (!toUpdate.qty) return filteredCart;
  return filteredCart.concat(toUpdate);
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
const getTicketQuantityRange = (
  state: ticketingState,
  eventInstanceId: number,
  ticketTypeId: number,
  ticket: Ticket,
) => {
  const eventInstanceAvailableSeats = ticket.availableseats;
  const ticketRestriction = state.ticketrestrictions.find(
    byId(eventInstanceId, ticketTypeId),
  );
  const ticketRestrictionAvailableSeats =
    ticketRestriction.ticketlimit - ticketRestriction.ticketssold;
  return bound(
    0,
    Math.min(eventInstanceAvailableSeats, ticketRestrictionAvailableSeats),
  );
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
    payWhatPrice?: number;
  }>
> = (state, action) => {
  const {id, tickettype, qty, payWhatPrice} = action.payload;

  const tickets = state.tickets;
  if (!tickets.data.allIds.includes(id)) return state;

  const ticket = tickets.data.byId[id];
  const validRange = getTicketQuantityRange(state, id, tickettype.id, ticket);

  const ticketCartItem = state.ticketCart.find(byId(id, tickettype.id));
  let updatedState: ticketingState;

  if (ticketCartItem) {
    updatedState = {
      ...state,
      ticketCart: updateTicketCartItem(state.ticketCart, {
        id,
        tickettypeId: tickettype.id,
        qty: validRange(qty + ticketCartItem.qty),
        payWhatPrice,
      }),
    };
  } else {
    const event = state.events.find(byId(ticket.eventid));

    const newCartItem = event
      ? createTicketCartItem({ticket, tickettype, event, qty, payWhatPrice})
      : null;

    updatedState = newCartItem
      ? {
          ...state,
          ticketCart: [...state.ticketCart, newCartItem],
        }
      : {...state};
  }

  if (!isValidDiscount(state.discount, updatedState)) {
    updatedState.discount = INITIAL_STATE.discount;
  }

  return updatedState;
};

const addSubscriptionReducer: CaseReducer<
  ticketingState,
  PayloadAction<SubscriptionCartItem>
> = (state, action) => {
  const updatedState = {
    ...state,
    subscriptionCart: updateSubscriptionCartItem(
      state.subscriptionCart,
      action.payload,
    ),
  };

  if (!isValidDiscount(state.discount, updatedState)) {
    updatedState.discount = INITIAL_STATE.discount;
  }

  return updatedState;
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

  const updatedState = {
    ...state,
    ticketCart: updateTicketCartItem(state.ticketCart, {
      id,
      tickettypeId,
      qty: validRange(qty),
    }),
  };

  if (!isValidDiscount(state.discount, updatedState)) {
    updatedState.discount = INITIAL_STATE.discount;
  }

  return updatedState;
};

const editSubscriptionQtyReducer: CaseReducer<
  ticketingState,
  PayloadAction<{
    seasonid_fk: number;
    subscriptiontypeid_fk: number;
    qty: number;
  }>
> = (state, action) => {
  const {seasonid_fk, subscriptiontypeid_fk, qty} = action.payload;
  const updatedState = {
    ...state,
    subscriptionCart: state.subscriptionCart.map((item) =>
      item.subscriptiontypeid_fk === subscriptiontypeid_fk &&
      item.seasonid_fk === seasonid_fk
        ? {...item, qty: bound(0, item.qtyAvailable)(qty)}
        : item,
    ),
  };

  if (!isValidDiscount(state.discount, updatedState)) {
    updatedState.discount = INITIAL_STATE.discount;
  }
  return updatedState;
};

/**
 * removeTicketFromCartReducer removes a ticketCartItem from ticketCart based on product_id and tickettypeId
 *
 * @param state
 * @param action
 */
const removeTicketFromCartReducer: CaseReducer<
  ticketingState,
  PayloadAction<{id: number; tickettypeId: number}>
> = (state, action) => {
  const {id, tickettypeId} = action.payload;
  const updatedState = {
    ...state,
    ticketCart: state.ticketCart.filter(
      (item) => item.product_id !== id || item.typeID !== tickettypeId,
    ),
  };

  if (!isValidDiscount(state.discount, updatedState)) {
    updatedState.discount = INITIAL_STATE.discount;
  }

  return updatedState;
};

const removeSubscriptionFromCartReducer: CaseReducer<
  ticketingState,
  PayloadAction<{seasonid_fk: number; subscriptiontypeid_fk: number}>
> = (state, action) => {
  const {seasonid_fk, subscriptiontypeid_fk} = action.payload;
  const updatedState = {
    ...state,
    subscriptionCart: state.subscriptionCart.filter(
      (item) =>
        item.seasonid_fk !== seasonid_fk ||
        item.subscriptiontypeid_fk !== subscriptiontypeid_fk,
    ),
  };
  if (!isValidDiscount(state.discount, updatedState)) {
    updatedState.discount = INITIAL_STATE.discount;
  }

  return updatedState;
};

const removeAllTicketsFromCartReducer: CaseReducer<ticketingState> = (
  state,
) => {
  const updatedState = {
    ...state,
    ticketCart: [],
  };

  if (!isValidDiscount(state.discount, updatedState)) {
    updatedState.discount = INITIAL_STATE.discount;
  }

  return updatedState;
};

const removeAllSubscriptionsFromCartReducer: CaseReducer<ticketingState> = (
  state,
) => {
  const updatedState = {
    ...state,
    subscriptionCart: [],
  };

  if (!isValidDiscount(state.discount, updatedState)) {
    updatedState.discount = INITIAL_STATE.discount;
  }

  return updatedState;
};

const removeAllItemsFromCartReducer: CaseReducer<ticketingState> = (
  state,
) => {
  const updatedState = {
    ...state,
    ticketCart: [],
    subscriptionCart: [],
  };

  if (!isValidDiscount(state.discount, updatedState)) {
    updatedState.discount = INITIAL_STATE.discount;
  }

  return updatedState;
};

/**
 * Makes an initial state for ticketing
 *
 * @module
 * @param {Array} ticketCart - []
 * @param {Array} subscriptionCart - []
 * @param {Array} tickets - byId: {}, allIds: []
 * @param {TicketRestriction} - []
 * @param {TicketType} tickettype - {-1, '', '', ''}
 * @param {Array} events - []
 * @param {string} status - 'idle'
 * @param {DiscountItem} discount - {-1, '', 0, 0, 0, 0}
 */
export const INITIAL_STATE: ticketingState = {
  ticketCart: [],
  subscriptionCart: [],
  tickets: {data: {byId: {}, allIds: []}},
  ticketrestrictions: [],
  tickettype: {id: -1, name: '', price: '', fee: ''},
  events: [],
  status: 'idle',
  discount: {
    discountid: -1,
    code: '',
    amount: 0,
    percent: 0,
    min_tickets: 0,
    min_events: 0,
  },
};

/** ticketSlice = createSlice, creates the ticketing slice */
const ticketingSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addTicketToCart: addTicketReducer,
    addSubscription: addSubscriptionReducer,
    editItemQty: editQtyReducer,
    editSubscriptionQty: editSubscriptionQtyReducer,
    removeDiscountFromCart: (state) => ({
      ...state,
      discount: INITIAL_STATE.discount,
    }),
    removeTicketFromCart: removeTicketFromCartReducer,
    removeSubscriptionFromCart: removeSubscriptionFromCartReducer,
    removeAllTicketsFromCart: removeAllTicketsFromCartReducer,
    removeAllSubscriptionsFromCart: removeAllSubscriptionsFromCartReducer,
    removeAllItemsFromCart: removeAllItemsFromCartReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscountData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiscountData.fulfilled, (state, action) => {
        state.status = 'success';
        if (action.payload && isValidDiscount(action.payload.discount, state)) {
          state.discount = action.payload.discount;
        } else {
          state.discount = INITIAL_STATE.discount;
        }
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
        state.ticketrestrictions = action.payload.ticketRestrictions
          ? action.payload.ticketRestrictions
          : [];
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
export const selectDiscountValue = (state: RootState): number => {
  const subtotal = selectTicketCartSubtotal(state);
  const percentAmountDifference =
    (+state.ticketing.discount.percent / 100) * subtotal;
  if (state.ticketing.discount.amount && state.ticketing.discount.percent) {
    return Math.min(percentAmountDifference, state.ticketing.discount.amount);
  } else if (state.ticketing.discount.amount) {
    return state.ticketing.discount.amount;
  } else {
    return percentAmountDifference;
  }
};

export const selectCartSubtotal = (state: RootState): number =>
  selectTicketCartSubtotal(state) + selectSubscriptionCartSubtotal(state);

export const selectTicketCartSubtotal = (state: RootState): number =>
  state.ticketing.ticketCart.reduce((tot, item) => {
    if (!item.payWhatCan) {
      return tot + item.price * item.qty;
    } else {
      return tot + item.payWhatPrice;
    }
  }, 0);

export const selectSubscriptionCartSubtotal = (state: RootState): number =>
  state.ticketing.subscriptionCart.reduce<number>(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

export const selectCartTotal = (state: RootState): number => {
  const subtotal = selectCartSubtotal(state);
  if (state.ticketing.discount.amount || state.ticketing.discount.percent) {
    return Math.max(subtotal - selectDiscountValue(state), 0);
  } else {
    return subtotal;
  }
};

export const selectCartFeeTotal = (state: RootState): number =>
  state.ticketing.ticketCart.reduce((feeTot, item) => {
    const effectivePrice = item.payWhatCan ? item.payWhatPrice : item.price;
    if (effectivePrice !== 0) {
      return feeTot + item.fee * item.qty;
    } else {
      return feeTot;
    }
  }, 0);
export const selectTicketCartItem = (
  state: RootState,
  event_instance_id: number,
  tickettypeId: number,
): TicketCartItem | undefined =>
  state.ticketing.ticketCart.find(
    (item) =>
      item.product_id === event_instance_id && item.typeID === tickettypeId,
  );

export const selectSubscriptionCartItem = (
  state: RootState,
  seasonid_fk: number,
  subscriptionid_fk: number,
): SubscriptionCartItem | undefined =>
  state.ticketing.subscriptionCart.find(
    (item) =>
      item.subscriptiontypeid_fk === subscriptionid_fk &&
      item.seasonid_fk === seasonid_fk,
  );

export const selectCartTicketCount = (
  state: RootState,
): {[key: number]: number} =>
  state.ticketing.ticketCart.reduce((acc, item) => {
    const key = item.product_id;
    if (key in acc) {
      return acc;
    } else {
      return {...acc, [key]: item.qty};
    }
  }, {});

export const selectTicketCartContents = (state: RootState): TicketCartItem[] =>
  state.ticketing.ticketCart;

export const selectSubscriptionCartContents = (
  state: RootState,
): SubscriptionCartItem[] => state.ticketing.subscriptionCart;

export const selectCartContents = (state: RootState): (TicketCartItem | SubscriptionCartItem)[] =>
  [...state.ticketing.ticketCart, ...state.ticketing.subscriptionCart];

export const selectDiscount = (state: RootState): DiscountItem =>
  state.ticketing.discount;

/**
 * filterTicketsReducer
 *
 * @param ticketsById
 * @param {number} eventid
 */
const filterTicketsReducer =
  (ticketsById: {[key: number]: Ticket}, eventid: number) =>
  (filtered: Ticket[], id: number) => {
    return ticketsById[id].eventid === eventid
      ? [...filtered, ticketsById[id]]
      : filtered;
  };

/**
 * Interface for EventPageData
 *
 * @module
 * @param {number} id
 * @param {string} title
 * @param {string} description
 * @param {string} imageurl
 * @param {boolean} soldOut
 * @param {Ticket[]} tickets
 */
export interface EventPageData {
  id: number;
  title: string;
  description: string;
  imageurl: string;
  soldOut: boolean;
  tickets: Ticket[];
}

/**
 * Get all event data and its tickets.
 *
 * @module
 * @param {RootState} state - different types of state of selectEventData
 * @param {number} eventid
 * @returns playData, Tickets | undefined
 */
export const selectEventData = (
  state: RootState,
  eventid: number,
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
  }

  return undefined;
};

export const {
  addTicketToCart,
  addSubscription,
  editItemQty,
  editSubscriptionQty,
  removeDiscountFromCart,
  removeTicketFromCart,
  removeSubscriptionFromCart,
  removeAllTicketsFromCart,
  removeAllSubscriptionsFromCart,
  removeAllItemsFromCart,
} = ticketingSlice.actions;

export default ticketingSlice.reducer;
