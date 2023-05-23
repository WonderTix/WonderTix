/**
 * Ticketing State Interface
 * @param {CartItem} cart - array of items in the cart.
 *
 * @param {TicketsState} tickets - state of the tickets
 *
 * @param {Event[]} events - list of events available
 *
 * @param {LoadStatus} status - status of the execution of requests
 */

import CartItem from './CartItem';
import TicketsState from './TicketsState';
import {LoadStatus} from './LoadStatus';
import Event from './Event';

export default interface ticketingState {
  cart: CartItem[];
  tickets: TicketsState;
  events: Event[];
  status: LoadStatus;
}
