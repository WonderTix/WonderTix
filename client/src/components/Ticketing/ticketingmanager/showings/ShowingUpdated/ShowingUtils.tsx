import {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';

export interface eventInstanceTicketType {
  typeID: number;
  typeQuantity: number;
}

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

export const fetchTicketTypes = async (setTicketTypes, signal) => {
  try {
    const ticketTypeRes = await fetch(
      process.env.REACT_APP_API_1_URL + '/tickets/allTypes',
      {signal},
    );
    if (!ticketTypeRes.ok) {
      throw new Error('Unable to fetch ticket types');
    }
    setTicketTypes((await ticketTypeRes.json()).data);
  } catch (error) {
    console.error(error);
  }
};

export const getEventData = async (eventID, setEventData, signal) => {
  const eventData = {
    seasonid_fk: undefined,
    eventid: undefined,
    eventname: '',
    eventdescription: '',
    active: false,
    imageurl: '',
  };
  await fetch(process.env.REACT_APP_API_1_URL + '/events/' + eventID, {signal})
    .then((response) => {
      if (!response.ok) {
        throw new Error('Unable to fetch event');
      }
      return response.json();
    })
    .then((data) => {
      eventData.eventname = data.data[0].title;
      eventData.eventdescription = data.data[0].description;
      eventData.active = data.data[0].active;
      eventData.imageurl = data.data[0].imageurl;
      eventData.eventid = data.data[0].eventid;
      eventData.seasonid_fk = data.data[0].seasonid_fk;
    });
  setEventData(eventData);
};

export const useFetchEventData = (eventID: number) => {
  const [eventData, setEventData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [ticketTypes, setTicketTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    void fetchTicketTypes(setTicketTypes, signal);
    if (eventID) {
      getEventData(eventID, setEventData, signal).catch(() =>
        navigate(`/ticketing/showings/${eventID}/notFound`),
      );
    }
    setLoading(false);
    return () => controller.abort();
  }, [eventID]);

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
      void getShowingData(eventID, setShowingData, signal);
    }
    return () => controller.abort();
  }, [eventID, reload]);
  return {showingData, setReloadShowing, reload};
};

export const getShowingData = async (eventID, setShowingData, signal) => {
  try {
    const showingRes = await fetch(
      `${process.env.REACT_APP_API_1_URL}/events/instances/${eventID}`, {signal});

    if (!showingRes.ok) {
      throw new Error('Unable to fetch showings');
    }

    const data = await showingRes.json();
    const showingData = data.data;

    for (const showing of showingData) {
      if (!showing.seatsForType) {
        showing.seatsForType = Array<number>();
      }
      if (!showing.ticketTypeId) {
        showing.ticketTypeId = Array<number>();
      }
      const ticketRestrictionRes = await fetch(
        `${process.env.REACT_APP_API_1_URL}/tickets/restrictions/
          ${showing.eventinstanceid}`,
      );
      if (!ticketRestrictionRes.ok) {
        throw new Error(
          `Unable to fetch ticket restrictions for ${showing.eventinstanceid}`,
        );
      }
      const ticketRestrictionData = await ticketRestrictionRes.json();
      ticketRestrictionData.data.forEach((ticketRestriction) => {
        showing.seatsForType.push(Number(ticketRestriction.ticketlimit));
        showing.ticketTypeId.push(Number(ticketRestriction.tickettypeid_fk));
      });
    }
    setShowingData(showingData);
  } catch (error) {
    console.error(error);
  }
};

export const getTicketTypeArray = (
  ticketsTypes: (number | string) [],
  seatsForType: (number | string) [],
): eventInstanceTicketType[] => {
  if (
    !ticketsTypes ||
    !seatsForType ||
    seatsForType.length !== ticketsTypes.length
  ) {
    return [];
  }
  return ticketsTypes.map((id, index) => {
    return {
      typeID: Number(id),
      typeQuantity: Number(seatsForType[index]),
    };
  });
};

export const getTicketTypePrice = (id:number, priceType:string, ticketTypes) => {
  const foundType = ticketTypes?.find((type) => Number(type.id) === id);
  if (!foundType) return 0;
  return foundType[priceType];
};
