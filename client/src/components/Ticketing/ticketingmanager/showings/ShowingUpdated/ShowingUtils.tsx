import {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';

export const createSubmitFunction = (
  method: string,
  url: string,
  token: string,
  onSuccess?,
  onError?,
) => {
  return async (event, actions) => {
    actions.setStatus('Submitting...');
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
      actions.setSubmitting(false);
      if (!submitRes.ok) {
        throw submitRes;
      }
      if (onSuccess) {
        await onSuccess(submitRes);
      }
    } catch (error) {
      actions.setSubmitting(false);
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
      console.error(error);
      if (setIsDeleting) {
        setIsDeleting(false);
      }
      if (onError) {
        await onError(error);
      }
    }
  };
};

export const fetchTicketTypes = async (seasonid, setTicketTypes, signal) => {
  try {
    console.log(seasonid);
    const ticketTypeRes = await fetch(
      `${process.env.REACT_APP_API_2_URL}/season-ticket-type-price-default/events/${seasonid}`,
    );
    if (!ticketTypeRes.ok) {
      throw new Error('Unable to fetch ticket types');
    }
    setTicketTypes(await ticketTypeRes.json());
  } catch (error) {
    console.error(error);
  }
};

export const getEventData = async (eventID, setEventData, signal) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_2_URL}/events/${eventID}`,
    {signal},
  );
  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error('Unable to fetch event');
  }
  const data = await response.json();
  setEventData(data);
};

export const useFetchEventData = (eventID: number) => {
  const [eventData, setEventData] = useState(undefined);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (eventID) {
      getEventData(eventID, setEventData, signal).catch(() =>
        navigate(`/ticketing/showings/${eventID}/notFound`),
      );
    }
    setLoading(false);
    return () => controller.abort();
  }, [eventID]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    void fetchTicketTypes(
      eventData?.seasonid_fk ?? -1,
      setTicketTypes,
      signal,
    );
    return () => controller.abort();
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
      );
    }
    return () => controller.abort();
  }, [eventID, reload]);
  return {showingData, setReloadShowing, reload};
};

export const getData = async (url: string, set, signal, token?) => {
  try {
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
      throw new Error('Unable to fetch showings');
    }
    const data = await res.json();
    set(data);
  } catch (error) {
    console.error(error);
  }
};

export const getTicketTypeKeyValue = (
  id: number,
  priceType: string,
  ticketTypes,
) => {
  const foundType = ticketTypes?.find(
    (type) => Number(type.tickettypeid_fk) === id,
  );
  if (!foundType) return 0;
  return typeof foundType[priceType] === 'string'
    ? foundType[priceType].replace('$', '')
    : foundType[priceType];
};

export const getInstanceTicketType = (id: number, ticketTypes) => {
  if (!ticketTypes) return {};
  const {description, ...type} = ticketTypes.find(
    (type) => Number(type.tickettypeid_fk) === id,
  );
  return {
    ...type,
    ticketlimit: 0,
  };
};
