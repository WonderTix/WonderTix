import {Showing} from '../../../../../interfaces/showing.interface';
import React, {useContext, useState} from 'react';

import {
  useFetchEventData,
  useFetchShowingData,
  useFetchToken,
} from './ShowingUtils';

interface EventContextType {
  eventID: number;
  setEventID: (value) => void;
  eventData;
  ticketTypes: any[];
  setLoading: (value) => void;
  loading: boolean;
  token: string;
  showingData: Showing[];
  setReload: (value) => void;
  reload: boolean;
}

export const EventContext = React.createContext<EventContextType>({
  eventID: undefined,
  setEventID: undefined,
  eventData: undefined,
  ticketTypes: undefined,
  setLoading: undefined,
  loading: true,
  token: undefined,
  showingData: undefined,
  setReload: undefined,
  reload: true,
});
export const useEvent = () => {
  return useContext(EventContext);
};
export const EventProvider = (props: { eventID: number, children }) => {
  const [eventID, setEventID] = useState(props.eventID ?? 0);
  const {
    eventData, loading, ticketTypes,
    setLoading,
  } = useFetchEventData(eventID);
  const {setReload, showingData, reload} = useFetchShowingData(eventID);
  const {token} = useFetchToken();

  return (
    <EventContext.Provider
      value={
        {
          eventID,
          setEventID,
          eventData,
          ticketTypes,
          setLoading,
          loading,
          token,
          showingData,
          setReload,
          reload,
        }
      }
    >
      {props.children}
    </EventContext.Provider>
  );
};
