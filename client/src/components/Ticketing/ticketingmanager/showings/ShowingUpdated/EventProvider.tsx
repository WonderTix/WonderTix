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
  setShowPopUp: (value) => void;
  showPopUp: boolean;
  message:string;
  title:string;
  success:boolean;
  setPopUpProps: (title:string, message:string, success:boolean) => void;
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
export const EventProvider = (props: { eventID: number, children }) => {
  const [eventID, setEventID] = useState(props.eventID ?? 0);
  const [editing, setEditing] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle]=useState('');
  const [success, setSuccess] = useState(false);
  const {
    eventData, loading, ticketTypes, setReloadEvent,
  } = useFetchEventData(eventID);
  const {setReloadShowing, showingData, reload} = useFetchShowingData(eventID);
  const {token} = useFetchToken();

  const setPopUpProps = (title, message, success) => {
    setTitle(title);
    setMessage(message);
    setSuccess(success);
    return;
  };

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
          setShowPopUp,
          showPopUp,
          message,
          title,
          success,
          setPopUpProps,
        }
      }
    >
      {props.children}
    </EventContext.Provider>
  );
};
