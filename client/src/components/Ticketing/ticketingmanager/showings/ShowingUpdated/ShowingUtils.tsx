/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';

export const createSubmitFunction = (method: string, url: string, token: string, onSuccess?, onError?) => {
  return async (event, actions) => {
    console.log(event);
    actions.setStatus('Submitting...');
    try {
      const res = await fetch(url, {
        credentials: 'include',
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      actions.setSubmitting(false);
      if (!res.status.toString().startsWith('2')) {
        throw res;
      }
      if (onSuccess) {
        await onSuccess(res);
      }
    } catch (error) {
      actions.setSubmitting(false);
      if (onError) {
        await onError(error);
      }
    }
  };
};
// eslint-disable-next-line max-len
export const createDeleteFunction = (method: string, url: string, token: string, onSuccess?, onError?) => {
  return async () => {
    try {
      const res = await fetch(url, {
        credentials: 'include',
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.status.toString().startsWith('2')) {
        throw res;
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      if (onError) {
        onError(error);
      }
    }
  };
};
export const fetchTicketTypes = async (setTicketTypes) => {
  const res = await fetch(process.env.REACT_APP_API_1_URL +
    '/tickets/allTypes');
  const data = await res.json();
  setTicketTypes(data.data);
};
export const useFetchEventData = (eventID: number) => {
  const [eventData, setEventData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [reload, setReloadEvent] = useState(false);

  useEffect(() => {
    void fetchTicketTypes(setTicketTypes);
    if (eventID !== 0) {
      void getEventData(eventID, setEventData);
    }
    setLoading(false);
  }, [reload]);

  // eslint-disable-next-line max-len
  return {eventData, setReloadEvent, setEventData, loading, ticketTypes};
};
export const useFetchToken = () => {
  const [token, setToken] = useState('');
  const {getAccessTokenSilently} = useAuth0();
  useEffect(() => {
    void fetchToken(getAccessTokenSilently, setToken);
  }, []);
  return {token};
};
export const fetchToken = async (getAccessTokenSilently, setToken) => {
  const token = await getAccessTokenSilently({
    audience: process.env.REACT_APP_ROOT_URL,
    scope: 'admin',
  });
  setToken(token);
};
export const getEventData = async (eventID, setEventData) => {
  try {
    const eventData = {
      seasonid: undefined,
      eventid: undefined,
      eventname: '',
      eventdescription: '',
      active: false,
      imageurl: '',
    };
    await fetch(process.env.REACT_APP_API_1_URL + '/events/' + eventID)
        .then((response) => {
          return response.json();
        }).then((data) => {
          eventData.eventname = data.data[0].title;
          eventData.eventdescription = data.data[0].description;
          eventData.active = data.data[0].active;
          eventData.imageurl = data.data[0].imageurl;
          eventData.eventid = data.data[0].eventid;
          eventData.seasonid = data.data[0].seasonid_fk;
        });
    setEventData(eventData);
  } catch (error) {
    console.log(error);
  }
};
export const useFetchShowingData = (eventID: number) => {
  const [showingData, setShowingData] = useState(undefined);
  const [reload, setReloadShowing] = useState(true);

  useEffect(() => {
    if (eventID) {
      void getShowingData(eventID, setShowingData);
    }
  }, [reload, eventID]);

  return {showingData, setReloadShowing, reload};
};
export const getShowingData = async (eventID, setShowingData) => {
  try {
    // eslint-disable-next-line max-len
    const showingRes = await fetch(`${process.env.REACT_APP_API_1_URL}/events/instances/${eventID}`);
    const data = await showingRes.json();
    const showingData = data.data;

    for (const showing of showingData) {
      if (!showing.seatsForType) {
        showing.seatsForType = [];
      }
      if (!showing.ticketTypeId) {
        showing.ticketTypeId = [];
      }
      const ticketRestrictionRes = await fetch(
          `${process.env.REACT_APP_API_1_URL}/tickets/restrictions/
          ${showing.eventinstanceid}`);
      const ticketRestrictionData = await ticketRestrictionRes.json();
      for (const item of ticketRestrictionData.data) {
        showing.seatsForType.push(item.ticketlimit);
        showing.ticketTypeId.push(item.tickettypeid_fk);
      }
    }
    setShowingData(showingData);
  } catch (error) {
    console.log(error);
  }
};

export interface eventInstanceTicketType {
  typeID: number | string;
  typeQuantity: number | string;
}

export const getTicketTypeArray =
  (types: (string | number)[], count: (string | number)[]) => {
    if (!types || !count || count.length != types.length) return [];
    return types
        .map((id, index) => {
          return {
            typeID: id,
            typeQuantity: count[index],
          };
        });
  };
export const separateTicketTypeAndSeats =
  (toSeparate: eventInstanceTicketType[]) => {
    const seatsForType = [];
    if (toSeparate.length === 0) {
      return {
        seatsForType,
        ticketTypeId: [],
      };
    }
    const ticketTypeId = toSeparate.map((item) => {
      seatsForType.push(item.typeQuantity);
      return item.typeID;
    });
    return {seatsForType, ticketTypeId};
  };
export const getTicketTypePrice = (id, priceType, ticketTypes) => {
  if (id === undefined || id < 0 || id >= ticketTypes.length) return 0;
  return ticketTypes[id][priceType];
};
