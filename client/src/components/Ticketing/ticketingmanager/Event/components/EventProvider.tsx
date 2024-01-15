import {UpdatedShowing} from '../../../../../interfaces/showing.interface';
import React, {useContext, useState} from 'react';
import {
  useFetchEventData,
  useFetchShowingData,
  useFetchToken,
} from './ShowingUtils';
import {useParams} from 'react-router-dom';
import {EventPage} from './EventPage';

interface EventContextType {
  eventID: number;
  setEventID: (value) => void;
  setEventData: (value) => void;
  eventData;
  ticketTypes: any[];
  loading: boolean;
  token: string;
  showingData: UpdatedShowing[];
  setReloadShowing: (value) => void;
  editing: boolean;
  setEditing: (value) => void;
  setShowPopUp: (value) => void;
  showPopUp: boolean;
  message: string;
  title: string;
  success: boolean;
  dataTestId: string;
  setPopUpProps: (
    title: string,
    message: string,
    success: boolean,
    dataTestId: string,
    handleProceed?,
  ) => void;
  handleProceed: () => void;
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
  dataTestId: undefined,
  setPopUpProps: undefined,
  handleProceed: undefined,
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
  const [dataTestId, setDataTestId] = useState(undefined);
  const [handleProceed, setHandleProceed] = useState(undefined);
  const {setEventData, eventData, loading, ticketTypes} =
    useFetchEventData(eventID);
  const {setReloadShowing, showingData} = useFetchShowingData(eventID);
  const {token} = useFetchToken();
  const setPopUpProps = (
    title,
    message,
    success,
    dataTestId,
    handleProceedFunction?,
  ) => {
    setTitle(title);
    setMessage(message);
    setSuccess(success);
    setDataTestId(dataTestId);
    setHandleProceed(
      handleProceedFunction ? () => handleProceedFunction : undefined,
    );
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
        dataTestId,
        setPopUpProps,
        handleProceed,
      }}
    >
      <EventPage />
    </EventContext.Provider>
  );
};
