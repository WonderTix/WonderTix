export interface order {
  orderid: number;
  orderdatetime: string;
  ordersubtotal: number;
  refundtotal: number;
  discounttotal: number;
  feetotal: number;
  order_status: string;
  contactid_fk?: number;
  discountid_fk?: number;
  order_source?: string;
  contacts?: contact;
  orderitems?: orderitem[];
}

export interface orderitem {
  id: number;
  orderid_fk: number;
  type: string;
  price: number;
  discount: number;
  fee: number;
  department?: string;
  order?: order;
  ticketitem?: ticketitem;
  subscription?: subscription;
  donation?: donation;
  refund?: refunditem;
}

export interface refunditem {
  id: number;
  orderid_fk: number;
  orderitemid_fk: number;
  amount: number;
  orderitem?: orderitem;
  order?: order;
}

export interface donation {
  donationid: number;
  orderitemid_fk: number;
  orderitemtype: string;
  anonymous: boolean;
  frequency: string;
  comments?: string;
  orderitem?: orderitem;
}

export interface subscription {
  id: number;
  orderitemid_fk: number;
  orderitemtype: string;
  subscriptiontypeid_fk: number;
  seasonid_fk: number;
  orderitem?: orderitem;
  seasonsubscriptiontype?: seasonsubscriptiontype;
}

export interface seasonsubscriptiontype {
  seasonid_fk: number;
  subscriptiontypeid_fk: number;
  subscriptionlimit: number;
  price: number;
  ticketlimit: number;
  season?: season;
  subscriptiontype?: subscriptiontype;
  subscriptions?: subscription[];
}

export interface subscriptiontype {
  id: number;
  name: string;
  description: string;
  previewonly: boolean;
  price: number;
  seasonsubscriptiontypes?: seasonsubscriptiontype[];
}

export interface ticketitem {
  id: number;
  orderitemid_fk?: number;
  orderitemtype?: number;
  subscriptionticketitemid_fk?: number;
  ticketrestrictionid_fk: number;
  donated: boolean;
  redeeemed?: string;
  ticketrestriction?: ticketrestriction;
  orderitem?: orderitem;
}

export interface ticketrestriction {
  ticketrestrictionsid: number;
  eventinstanceid_fk: number;
  tickettypeid_fk: number;
  ticketlimit: number;
  price: number;
  fee: number;
  seasontickettypepricedefaultid_fk?: number;
  eventinstance?: eventinstance;
  tickettype?: tickettype;
  ticketitems?: ticketitem[];
  ticketssold?: number;
}

export interface tickettype {
  tickettypeid: number;
  description: string;
  price: number;
  fee: number;
  deprecated: boolean;
}

export interface eventinstance {
  eventinstanceid: number;
  eventid_fk: number;
  eventdate: number;
  eventtime: string;
  salestatus: boolean;
  totalseats: number;
  availableseats: number;
  detail?: string;
  ispreview: boolean;
  event?: event;
  ticketrestrictions?: ticketrestriction[];
}

export interface event {
  eventid: number;
  seasonid_fk?: number;
  eventname: string;
  eventdescription: string;
  active: boolean;
  subscriptioneligible: boolean;
  imageurl?: string;
  eventinstances?: eventinstance[];
  seasons?: season;
}

export interface season {
  seasonid: number;
  name: string;
  startdate: number;
  enddate: number;
  imageurl?: string;
  events: event[];
  seasonsubscriptiontypes?: seasonsubscriptiontype[];
}

export interface contact {
  contactid: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  visitsource?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalcode?: string;
  seatingaccom?: string;
  comments?: string;
  donorbadge: boolean;
  vip: boolean;
  newsletter?: string;
}
