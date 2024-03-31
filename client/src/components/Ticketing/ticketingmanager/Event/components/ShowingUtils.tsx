import {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';
import {toDateStringFormat} from './util/EventsUtil';

export const createSubmitFunction = (
  method: string,
  url: string,
  token: string,
  onSuccess?,
  onError?,
) => {
  return async (event, actions?) => {
    actions?.setStatus('Submitting...');
    try {
      const submitRes = await fetch(url, {
        credentials: 'include',
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });

      actions?.setSubmitting(false);

      if (!submitRes.ok) {
        throw submitRes;
      }
      if (onSuccess) {
        await onSuccess(submitRes);
      }
    } catch (error) {
      actions?.setSubmitting(false);
      if (onError) {
        await onError(error);
      }
    }
  };
};

export const createDeleteFunction = (
  method: string,
  url: string,
  token: string,
  onSuccess?,
  onError?,
) => {
  return async (setIsDeleting?) => {
    try {
      const deleteRes = await fetch(url, {
        credentials: 'include',
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!deleteRes.ok) {
        throw deleteRes;
      }

      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      if (setIsDeleting) {
        setIsDeleting(false);
      }
      if (onError) {
        await onError(error);
      }
    }
  };
};

export const useFetchEventData = (eventID: number) => {
  const [eventData, setEventData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [ticketTypes, setTicketTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (eventID) {
      getData(
        `${process.env.REACT_APP_API_2_URL}/events/${eventID}`,
        setEventData,
        signal,
      ).catch(() => navigate(`/ticketing/events/${eventID}/notFound`));
    }
    setLoading(false);
    return () => controller.abort();
  }, [eventID]);

  useEffect(() => {
    if (eventData) {
      const controller = new AbortController();
      const signal = controller.signal;
      void getData(
        `${
          process.env.REACT_APP_API_2_URL
        }/season-ticket-type-price-default/events/${
          eventData?.seasonid_fk ?? -1
        }`,
        setTicketTypes,
        signal,
      ).catch(() => console.error('unable to fetch ticket types'));
      return () => controller.abort();
    }
  }, [eventData]);
  return {eventData, setEventData, loading, ticketTypes};
};

export const fetchToken = async (getAccessTokenSilently, setToken) => {
  try {
    setToken(
      await getAccessTokenSilently({
        audience: process.env.REACT_APP_ROOT_URL,
        scope: 'admin',
      }),
    );
  } catch (error) {
    console.error(error);
  }
};

export const useFetchToken = () => {
  const [token, setToken] = useState('');
  const {getAccessTokenSilently, isAuthenticated} = useAuth0();
  useEffect(() => {
    void fetchToken(getAccessTokenSilently, setToken);
  }, [isAuthenticated]);
  return {token};
};

export const useFetchShowingData = (eventID: number) => {
  const [showingData, setShowingData] = useState([]);
  const [reload, setReloadShowing] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (eventID) {
      void getData(
        `${process.env.REACT_APP_API_2_URL}/event-instance/event/${eventID}`,
        setShowingData,
        signal,
      ).catch(() => console.error('Unable to fetch showings'));
    }
    return () => controller.abort();
  }, [eventID, reload]);
  return {showingData, setReloadShowing, reload};
};

export const getData = async (
  url: string,
  set: (data) => void,
  signal: AbortSignal,
  token?: string,
) => {
  const res = await fetch(url, {
    method: 'GET',
    signal,
    ...(token && {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }),
  });

  if (!res.ok) {
    throw new Error();
  }
  set(await res.json());
};

export const getKeyValue = (
  id: number,
  keyToReturn: string,
  objArray: any[],
  keyToCompare = 'tickettypeid_fk',
) => {
  const foundObj = objArray?.find((obj) => +obj[keyToCompare] === id);
  if (!foundObj) return 0;
  return typeof foundObj[keyToReturn] === 'string'
    ? foundObj[keyToReturn].replace('$', '')
    : foundObj[keyToReturn];
};

export const getInstanceTicketType = (ticketType) => {
  if (!ticketType) return {};
  return {
    ...ticketType,
    ticketlimit: 0,
  };
};


export const cloneShowing = (showing) => {
  const toReturn = {};
  Object.keys(showing).forEach((key) => {
    toReturn[key] = showing[key];
  });
  toReturn['instanceTicketTypes'] = showing.ticketrestrictions;
  toReturn['eventdate'] = toDateStringFormat(showing.eventdate);
  toReturn['eventtime'] = showing.eventtime.split('T')[1].slice(0, 8);
  toReturn['availableseats'] = toReturn['totalseats'];
  return toReturn;
};

export const getDate = (date: number, IsoTime?: string): Date => {
  const year = date / 10000;
  const month = Math.floor(date / 100) % 100;
  const day = date % 100;
  const toReturn = new Date(year, month - 1, day);
  if (IsoTime) {
    const time = new Date(IsoTime.split('.')[0]);
    toReturn.setHours(time.getHours(), time.getMinutes());
  }
  return toReturn;
};
