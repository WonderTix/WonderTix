/**
 * Inteface of Event
 *
 * @param {string} id - unique identifier for the event
 *
 * @param {string} title - name of the event
 *
 * @param {string} description - description of the event
 *
 * @param {string} imageurl - url to thumbnail of the event
 */


export default interface Event {
  id: string;
  title: string;
  description: string;
  imageurl: string;
}

export interface instanceTicketType {
  tickettypeid_fk: number;
  seasontickettypepricedefaultid_fk: number;
  price: number;
  concessionprice: number;
  ticketlimit: number;
  description: string;
}

export interface eventInstanceRequest {
  availableseats: number;
  eventdate: string;
  eventid_fk: number;
  eventinstanceid: number;
  eventtime: string;
  ispreview: boolean;
  defaulttickettype: number
  purchaseuri: string;
  instanceTicketTypes: instanceTicketType[];
  salestatus: boolean;
  totalseats: number;
}

export interface ticketRestriction {
  ticketrestrictionsid: number;
  eventinstanceid_fk: number;
  tickettypeid_fk: number;
  ticketlimit:number;
  ticketssold:number | null;
}

