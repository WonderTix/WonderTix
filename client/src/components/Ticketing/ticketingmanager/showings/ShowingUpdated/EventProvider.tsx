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
  loading: boolean;
  token: string;
  showingData: Showing[];
  setReloadShowing: (value) => void;
  setReloadEvent: (value) => void;
  editing: boolean;
  setEditing: (value) => void;
}

export const EventContext = React.createContext<EventContextType>({
  eventID: undefined,
  setEventID: undefined,
  eventData: undefined,
  ticketTypes: undefined,
  loading: true,
  token: undefined,
  showingData: undefined,
  setReloadShowing: undefined,
  setReloadEvent: undefined,
  editing: undefined,
  setEditing: undefined,
});
export const useEvent = () => {
  return useContext(EventContext);
};
export const EventProvider = (props: { eventID: number, children }) => {
  const [eventID, setEventID] = useState(props.eventID ?? 0);
  const [editing, setEditing] = useState(false);
  const {
    eventData, loading, ticketTypes, setReloadEvent,
  } = useFetchEventData(eventID);
  const {setReloadShowing, showingData, reload} = useFetchShowingData(eventID);
  const {token} = useFetchToken();

  return (
    <EventContext.Provider
      value={
        {
          eventID,
          setEventID,
          editing,
          setEditing,
          eventData,
          ticketTypes,
          loading,
          token,
          showingData,
          setReloadShowing,
          setReloadEvent,
        }
      }
    >
      {props.children}
    </EventContext.Provider>
  );
};
