/**
 * Ticket inteface desvibes the values required for the ticket to exist
 * @param {number} event_instance_id - referance to the show id
 * (specific show) that ticket is purchased for
 *
 * @param {string} eventid - referance to the Event object
 *
 * @param {string} admission_type - type of the admission
 * in future can include subscription for events
 *
 * @param {Date} date - date of the show that ticket is purchased for
 *
 * @param {number} ticket_price - price of 1 ticket for the show
 *
 * @param {number} concession_price -
 *
 * @param {number} totalseats - total seats for the show
 *
 * @param {number} availableseats - amount of available seats for the show
 */

export default interface Ticket {
  event_instance_id: number;
  eventid: string;
  admission_type: 'General Admission';
  date: Date;
  ticket_price: number;
  concession_price: number;
  totalseats?: number;
  availableseats: number;
}
