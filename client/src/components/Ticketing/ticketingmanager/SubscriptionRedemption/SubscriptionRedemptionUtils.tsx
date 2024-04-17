import {useCallback, useEffect, useRef, useState} from 'react';
import {getData} from '../Event/components/ShowingUtils';

export interface Event {
  eventid: number;
  seasonid_fk: number | null;
  name: string;
  description: string;
  active: boolean;
  subscriptioneligible: boolean;
  imageurl: string | null;
  eventinstances: EventInstance[];
}

export interface EventInstance {
  eventinstanceid: number;
  eventid_fk: number;
  eventdate: number;
  eventtime: Date;
  salesstatus: boolean;
  totalseats: number;
  availableseats: number;
  detail: string | null;
  purchaseuri: string | null;
  ispreview: boolean;
  ticketrestrictions: TicketRestriction[];
}

export interface TicketRestriction {
  price: number;
  concessionprice: number;
  ticketlimit: number;
  ticketrestrictionsid: number;
  ticekettypeid_fk: number;
  eventinstanceid_fk: number;
  seasonticketpricedefaultid_fk: number | null;
  description: string;
  availabletickets: number;
}

export interface Subscription {
  orderid_fk: number;
  id: number;
  subscriptiontypeid_fk: number;
  seasonid_fk: number;
  price: number;
  previewonly: boolean;
  firstname: string;
  lastname: string;
  email: string;
  name: string;
  ticketlimit: number;
  seasonName: string;
  ticketsredeemed: number;
}

export interface SubscriptionWithTicketItems {
  orderid_fk: number;
  id: number;
  subscriptiontypeid_fk: number;
  seasonid_fk: number;
  price: number;
  previewonly: boolean;
  ticketlimit: number;
  subscriptionticketitems: SubscriptionTicketItem[];
}

export interface SubscriptionTicketItem {
  id: number;
  ticketrestrictionid: number;
  eventinstanceid: number;
  eventid: number;
  donated: boolean;
  redeemed: Date | null;
}

export const useFetchSubscription = (subscriptionId: number, token: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [subscription, setSubscription] =
    useState<SubscriptionWithTicketItems>(undefined);
  useEffect(() => {
    const controller = new AbortController();
    if (subscriptionId && token) {
      getData(
        `${process.env.REACT_APP_API_2_URL}/subscription-types/subscriptions/redemption/${subscriptionId}`,
        ({subscription, events}) => {
          setSubscription(subscription);
          setEvents(events);
        },
        controller.signal,
        token,
      ).catch(() => console.error('Error Fetching Subscription'));
    }
    return () => controller.abort();
  }, [subscriptionId, token]);
  return {events, setEvents, setSubscription, subscription};
};

export interface Season {
  seasonid: number;
  name: string;
  startdate: number;
  enddate: number;
  imageurl?: string;
  seasonname: string;
}

export const useFetchSeasons = (query = '') => {
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    getData(
      `${process.env.REACT_APP_API_2_URL}/season/${query}`,
      setSeasons,
      controller.signal,
    ).catch(() => console.error('Error fetching seasons'));
    return () => controller.abort();
  }, []);

  return {seasons};
};

export const getSubscriptionSortFunction = (id: string) => {
  switch (id) {
    case 'name':
      return (a, b) =>
        a.firstname < b.firstname
          ? -1
          : a.firstname > b.firstname
          ? 1
          : a.lastname < b.lastname
          ? -1
          : a.lastname === b.lastname
          ? 0
          : 1;
    case 'email':
      return (a, b) => (a.email < b.email ? -1 : a.email === b.email ? 0 : 1);
    case 'season':
      return (a, b) => a.seasonid_fk - b.seasonid_fk;
    default:
      return (a, b) => a.subscriptiontypeid_fk - b.subscriptiontypeid_fk;
  }
};

export const getSubscriptionFilterFunction = (id: string) => {
  switch (id) {
    case 'fully':
      return (a) => a.ticketsredeemed >= a.ticketlimit;
    case 'partially':
      return (a) => a.ticketsredeemed < a.ticketlimit;
    default:
      return () => true;
  }
};

export const getSeasonFilterFunction = (id: string) => {
  switch (id) {
    case 'past':
      return (a) => !a.current;
    case 'present':
      return (a) => a.current;
    default:
      return () => true;
  }
};

export const useIsMounted = () => {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);

  return useCallback(() => ref.current, []);
};

export const useTimeout = (callback, delay) => {
  const callbackRef = useRef(callback);
  const timeoutId = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay) return;
    timeoutId.current = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(timeoutId.current);
  }, [delay]);
};

export const getUpdatedEvent = (
  method: (value: number) => number,
  event: Event,
  eventInstanceId: number,
  ticketRestrictionId: number,
) => ({
  ...event,
  eventinstances:
    eventInstanceId === -1
      ? event.eventinstances
      : event.eventinstances.map((instance) =>
          instance.eventinstanceid !== eventInstanceId
            ? instance
            : getUpdatedEventInstance(method, instance, ticketRestrictionId),
        ),
});

export const getUpdatedEventInstance = (
  method: (value: number) => number,
  eventInstance: EventInstance,
  ticketRestrictionId: number,
) => ({
  ...eventInstance,
  availableseats: method(eventInstance.availableseats),
  ticketrestrictions:
    ticketRestrictionId === -1
      ? eventInstance.ticketrestrictions
      : eventInstance.ticketrestrictions.map((res) =>
          res.ticketrestrictionsid !== ticketRestrictionId
            ? res
            : getUpdatedTicketRestriction(method, res),
        ),
});

export const getUpdatedTicketRestriction = (
  method: (value: number) => number,
  ticketRestriction: TicketRestriction,
) => ({
  ...ticketRestriction,
  availabletickets: method(ticketRestriction.availabletickets),
});
