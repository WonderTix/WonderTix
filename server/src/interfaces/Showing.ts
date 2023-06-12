/**
 * Showing Inteface - describes values expected from showing object
 *
 * @param {number} id - unique identifier of the show
 *
 * @param {string} eventid - id of the main event that show belongs to
 *
 * @param {string} eventdate - date of the show
 *
 * @param {string} starttime - time when following show is presented
 *
 * @param {boolean} salestatus - status of the show, if it is
 * available for general audinace purchase or not
 *
 * @param {number} totalseats - total amount of the seats for specific show
 *
 * @param {number} availableseats - amount of available
 * seats left form the total seat count
 *
 * @param {string} purchaseuri -
 */

export default interface Showing {
  id: number;
  eventid: string;
  eventdate: string;
  starttime: string;
  salestatus: boolean;
  totalseats: number;
  availableseats: number;
  tickettypes: number[];
  seatsfortype: number[];
  purchaseuri: string;
  ispreview: boolean;
  eventinstanceid: number;
  ticketTypeId: number[]; // This and tickettypeids are the same, but this is a temp fix for a type error
}

export interface TicketType {
  id: number,
  name: string,
  price: number,
  concessions: number,
}