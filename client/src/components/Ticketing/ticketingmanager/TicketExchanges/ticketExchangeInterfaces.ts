import {
  CartItem,
  SubscriptionCartItem,
  TicketCartItem,
} from '../ticketingSlice';
import {
  contact,
  event,
  eventinstance,
  order,
  orderitem,
  season,
  seasonsubscriptiontype,
  ticketrestriction,
} from '../prismaTypes';

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
  events: Map<number, ProviderEvent>;
  eventInstances: Map<number, ProviderEventInstance>;
  ticketRestrictions: Map<number, ProviderTicketRestriction>;
  subscriptionTypes: Map<string, ProviderSeasonSubscriptionType>;
  seasons: ProviderSeason[];
  orders: ProviderOrder[];
  updateCart: (item: TicketCartItem | SubscriptionCartItem) => void;
  stage: 'customer_info' | 'select_items' | 'checkout' | 'processing';
  setStage: (
    stage: 'customer_info' | 'select_items' | 'checkout' | 'processing',
  ) => void;
  setAppliedDiscount: (value: any) => void;
  appliedDiscount: any;
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
