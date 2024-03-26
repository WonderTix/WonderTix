import {Seasons} from '../../ticketingmanager/Season/SeasonInstancesPage';
import {useEffect, useState} from 'react';
import {getData} from '../../ticketingmanager/Event/components/ShowingUtils';

export interface SeasonWithSubscriptions extends Seasons {
  events: SubscriptionEvent[];
  seasonsubscriptiontypes: SeasonSubscriptionType[];
}

export interface SubscriptionEvent {
  eventid: number;
  seasonid_fk: number | null;
  eventname: string;
  eventdescription: string;
  imageurl: string | null;
  active: boolean;
  subscriptioneligible: boolean;
  startdate: number;
  enddate: number;
  eventinstances: {
    eventinstanceid: number;
    eventdate: number;
    eventtime: string;
  }[];
}

export interface SeasonSubscriptionType {
  seasonid_fk: number;
  subscriptiontypeid_fk: number;
  name: string;
  description: string;
  ticketlimit: number;
  subscriptionlimit: number;
  subscriptionssold: number;
}

export const useFetchSeasonSubscriptions = (id: number) => {
  const [season, setSeason] = useState<SeasonWithSubscriptions>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    if (id !== 0) {
      getData(
        `${process.env.REACT_APP_API_2_URL}/subscription-types/active-subscriptions/${id}`,
        setSeason,
        controller.signal,
      ).catch(() => console.error('Season fetch failed'));
    }
    return () => controller.abort();
  }, [id]);

  return {season};
};
