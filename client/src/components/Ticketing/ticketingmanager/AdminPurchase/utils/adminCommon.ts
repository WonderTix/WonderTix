export type EventRow = {
  id?: number;
  desc: string;
  eventid?: number;
  eventinstanceid?: number;
  eventname?: string;
  eventdate?: string;
  eventtime?: string;
  ticketTypes?: string;
  ticketRestrictionInfo?: ticketTypeRestriction[];
  price?: number;
  complimentary?: boolean;
  availableSeats?: number;
  seatsForType?: number;
  imageurl?: string;
  qty?: number;
  typeID?: number;
};

export interface ticketTypeRestriction {
  concessionprice: string;
  eventinstanceid_fk: number;
  price: string;
  seasontickettypepricedefaultid_fk: number | null;
  ticketlimit: number;
  ticketrestrictionsid: number;
  ticketssold: number;
  tickettypedescription?: string;
  tickettypeid_fk: number;
}

export const initialTicketTypeRestriction: ticketTypeRestriction = {
  concessionprice: '',
  eventinstanceid_fk: 0,
  price: '',
  seasontickettypepricedefaultid_fk: 0,
  ticketlimit: 0,
  ticketrestrictionsid: 0,
  ticketssold: 0,
  tickettypedescription: '',
  tickettypeid_fk: 0,
};
