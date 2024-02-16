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
  availableseats?: number;
  seatsForType?: number;
  imageurl?: string;
  qty?: number;
  typeID?: number;
};

export interface ticketTypeRestriction {
  id: number;
  eventinstanceid: number;
  tickettypeid: number;
  concessionprice: number;
  price: string;
  ticketlimit: number;
  ticketssold: number;
  description: string;
}

export const initialTicketTypeRestriction: ticketTypeRestriction = {
  id: 0,
  eventinstanceid: 0,
  tickettypeid: 0,
  concessionprice: 0,
  price: '',
  ticketlimit: 0,
  ticketssold: 0,
  description: '',
};

export const emptyDiscountCode = {
  discountid: -1,
  code: '',
  amount: 0,
  percent: 0,
  min_tickets: 0,
  min_events: 0,
};
