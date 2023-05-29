/**
 * Main Interface for To describe shows that are options for the event
 * Contains:
 *  id of the show newely created or show that is updated
 *  event id of the Event it adjacent to
 *  start time of the event and event data
 *  sales status -- available or published
 * totalseats is the total amount of available seats for the event
 * during initial add totall seats equal to available seats
 */

export interface Showing {
    id?: number,
    eventid?: number,
    starttime: string,
    eventdate: string,
    salestatus: boolean,
    ticketTypeId: (string | number)[],
    seatsForType: number[],
    totalseats: number,
    availableseats: number
  }
