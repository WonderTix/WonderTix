/**
 * Showing Inteface - describes values expected from showing object
 *
 * @param {number} id - unique identifier of the show
 *
 * @param {string} eventid - id of the main event that show belongs to
 *
 * @param {string} eventdate - date of the show
 *
 * @param {string} eventtime - time when following show is presented
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
  index: number;
  eventinstanceid: number;
  eventid_fk: number;
  eventtime: string;
  eventdate: string;
  salestatus: boolean;
  ticketTypeId: (string | number) []; // This and tickettypeids are the same, temp fix
  seatsForType: number[];
  totalseats: number;
  availableseats: number;
  ispreview: boolean;
  purchaseuri?: string;
}

export interface TicketType {
  id: number,
  name: string,
  price: number,
  concessions: number,
}