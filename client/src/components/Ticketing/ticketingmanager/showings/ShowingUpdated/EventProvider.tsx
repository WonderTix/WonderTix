import {Showing} from '../../../../../interfaces/showing.interface';
import React, {useContext, useState} from 'react';
import {
  useFetchEventData,
  useFetchShowingData,
  useFetchToken,
} from './ShowingUtils';
import {useParams} from 'react-router-dom';
import {EventPageV2} from './EventPageV2';

interface EventContextType {
  eventID: number;
  setEventID: (value) => void;
  setEventData: (value) => void;
  eventData;
  ticketTypes: any[];
  loading: boolean;
  token: string;
  showingData: Showing[];
  setReloadShowing: (value) => void;
  editing: boolean;
  setEditing: (value) => void;
  setShowPopUp: (value) => void;
  showPopUp: boolean;
  message: string;
  title: string;
  success: boolean;
  setPopUpProps: (title: string, message: string, success: boolean) => void;
}

export const EventContext = React.createContext<EventContextType>({
  eventID: undefined,
  setEventID: undefined,
  setEventData: undefined,
  eventData: undefined,
  ticketTypes: undefined,
  loading: true,
  token: undefined,
  showingData: undefined,
  setReloadShowing: undefined,
  editing: undefined,
  setEditing: undefined,
  setShowPopUp: undefined,
  showPopUp: undefined,
  message: undefined,
  title: undefined,
  success: undefined,
  setPopUpProps: undefined,
});

export const useEvent = () => {
  return useContext(EventContext);
};

type EventProviderParams = {
  eventid: string;
};
export const EventProvider = () => {
  const providedEventID = useParams<EventProviderParams>();
  const [eventID, setEventID] = useState(Number(providedEventID.eventid) ?? 0);
  const [editing, setEditing] = useState(!eventID);
  const [showPopUp, setShowPopUp] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [success, setSuccess] = useState(false);
  const {setEventData, eventData, loading, ticketTypes} =
    useFetchEventData(eventID);
  const {setReloadShowing, showingData} = useFetchShowingData(eventID);
  const {token} = useFetchToken();

  const setPopUpProps = (title, message, success) => {
    setTitle(title);
    setMessage(message);
    setSuccess(success);
    setShowPopUp(true);
    return;
  };

  return (
    <EventContext.Provider
      value={{
        eventID,
        setEventID,
        eventData,
        setEventData,
        editing,
        setEditing,
        ticketTypes,
        loading,
        token,
        showingData,
        setReloadShowing,
        setShowPopUp,
        showPopUp,
        message,
        title,
        success,
        setPopUpProps,
      }}
    >
      <EventPageV2 />
    </EventContext.Provider>
  );
};
