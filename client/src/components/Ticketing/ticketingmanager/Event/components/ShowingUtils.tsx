import React, {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';
import {toDateStringFormat} from './util/EventsUtil';

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
        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
      />
    </svg>
  );
};

export const CirclePlusIcon = (props: {className?: string}) => {
  const {className} = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      stroke='white'
      strokeWidth={1.5}
      className={className}
    >
      <path
        fillRule='evenodd'
        d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
        clipRule='evenodd'
      />
    </svg>
  );
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
