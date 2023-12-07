import React, {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';

const makeApiCall = async (method, url, token, event, onSuccess, onError) => {
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
    if (!submitRes.ok) {
      throw submitRes;
    }
    if (onSuccess) {
      await onSuccess(submitRes);
    }
  } catch (error) {
    if (onError) {
      await onError(error);
    }
  }
};

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
      ).catch(() => navigate(`/ticketing/showings/${eventID}/notFound`));
    }
    setLoading(false);
    return () => controller.abort();
  }, [eventID]);

  useEffect(() => {
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

export const getTicketTypeKeyValue = (
  id: number,
  key: string,
  ticketTypes: any[],
) => {
  const foundType = ticketTypes?.find((type) => +type.tickettypeid_fk === id);
  if (!foundType) return 0;
  return typeof foundType[key] === 'string'
    ? foundType[key].replace('$', '')
    : foundType[key];
};

export const getInstanceTicketType = (ticketType) => {
  if (!ticketType) return {};
  return {
    ...ticketType,
    ticketlimit: 0,
  };
};

export const TrashCanIcon = (props: {className?: string}) => {
  const {className} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
      />
    </svg>
  );
};
