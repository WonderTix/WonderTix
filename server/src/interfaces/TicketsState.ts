/**
 * Tickets State
 * @param {[key: number]: Ticket} byId - directory of tickets by id
 *
 * @param {number[]} allIds - list of all ids of shows
 */


import Ticket from './Ticket';
export default interface TicketsState {
  byId: { [key: number]: Ticket };
  allIds: number[];
}
