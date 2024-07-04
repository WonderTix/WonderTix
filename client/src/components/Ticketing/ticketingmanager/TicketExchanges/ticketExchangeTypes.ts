import {
  CartItem,
  SubscriptionCartItem,
  TicketCartItem,
} from '../ticketingSlice';

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
  orders?: order[];
}

export interface donation {
  donationid: number;
  orderitemid_fk: number;
  anonymous: boolean;
  frequency: string;
  comments?: string;
  orderitem?: orderitem;
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

export interface subscription {
  id: number;
  orderitemid_fk: number;
  orderitemtype: string;
  subscriptiontypeid_fk: number;
  seasonid_fk: number;
  orderitem?: orderitem;
  seasonsubscriptiontype?: seasonsubscriptiontype;
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
  ticketrestrictions?: ticketrestriction[];
}

export type ProviderEventInstance = Omit<
  eventinstance,
  'ticketrestrictions'
> & {ticketrestrictions: number[]};

export type ProviderEvent = Omit<event, 'eventinstances'> & {
  eventinstances: number[];
};

export type ProviderTicketRestriction = ticketrestriction & {
  ticketsavailable: number;
};

export type ProviderSeasonSubscriptionType = seasonsubscriptiontype & {
  subscriptionsavailable: number;
};

export type ProviderSeason = Omit<season, 'seasonsubscriptiontypes'> & {
  seasonsubscriptiontypes: number[];
};

export type ProviderOrder = Omit<order, 'orderitems'> & {
  orderitems: (orderitem & {refunded: boolean})[];
};

export type ProviderCartItem = SubscriptionCartItem | TicketCartItem;

export interface RefundCartItem extends CartItem {
  id: number;
  fee: number;
}

export interface TicketExchangeContextValues {
  token: string;
  cartItems: Map<string, SubscriptionCartItem | TicketCartItem>;
  refundItems: Map<number, RefundCartItem>;
  setRefundItems: (value: any) => void;
  customer: contact;
  setCustomer: (value?: any) => void;
  events: ProviderEvent[];
  eventInstances: Map<number, ProviderEventInstance>;
  ticketRestrictions: Map<number, ProviderTicketRestriction>;
  subscriptionTypes: Map<string, ProviderSeasonSubscriptionType>;
  seasons: ProviderSeason[];
  orders: ProviderOrder[];
  updateCart: (item: TicketCartItem | SubscriptionCartItem) => void;
  stage: 'customer_info' | 'select_items' | 'checkout';
  setStage: (
    stage: 'customer_info' | 'select_items' | 'checkout',
  ) => void;
  setAppliedDiscount: (value: any) => void;
  appliedDiscount: any;
}

