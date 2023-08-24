import {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';

export interface eventInstanceTicketType {
  typeID: number | string;
  typeQuantity: number | string;
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
export const createDeleteFunction = (
  method: string,
  url: string,
  token: string,
  onSuccess?,
  onError?,
) => {
  return async (setIsDeleting) => {
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
      setIsDeleting(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
      if (onError) {
        onError(error);
      }
    }
  };
};

export const fetchTicketTypes = async (setTicketTypes) => {
  try {
    const res = await fetch(
      process.env.REACT_APP_API_1_URL + '/tickets/allTypes',
    );
    if (!res.ok) {
      throw new Error('Unable to fetch ticket types');
    }
    setTicketTypes((await res.json()).data);
  } catch (error) {
    console.log(error);
  }
};

export const getEventData = async (eventID, setEventData) => {
  const eventData = {
    seasonid_fk: undefined,
    eventid: undefined,
    eventname: '',
    eventdescription: '',
    active: false,
    imageurl: '',
  };
  await fetch(process.env.REACT_APP_API_1_URL + '/events/' + eventID)
    .then((response) => {
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
    void fetchTicketTypes(setTicketTypes);
    if (eventID) {
      getEventData(eventID, setEventData)
        .then(() => console.log('Event load success'))
        .catch(() => navigate(`/ticketing/showings/v2/${eventID}/notFound`));
    }
    setLoading(false);
  }, [eventID]);

  // eslint-disable-next-line max-len
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
    console.log(error);
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
    if (eventID) {
      void getShowingData(eventID, setShowingData);
    }
  }, [eventID, reload]);

  return {showingData, setReloadShowing, reload};
};
export const getShowingData = async (eventID, setShowingData) => {
  try {
    const showingRes = await fetch(
      `${process.env.REACT_APP_API_1_URL}/events/instances/${eventID}`,
    );

    if (!showingRes.ok) {
      throw new Error('Unable to fetch showings');
    }

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
          ${showing.eventinstanceid}`,
      );
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

export const getTicketTypeArray = (
  types: (string | number)[],
  count: (string | number)[],
): eventInstanceTicketType[] => {
  if (!types || !count || count.length != types.length) return [];
  return types.map((id, index) => {
    return {
      typeID: id,
      typeQuantity: count[index],
    };
  });
};

export const getTicketTypePrice = (id, priceType, ticketTypes) => {
  if (id === undefined || id < 0 || id >= ticketTypes.length) return 0;
  return ticketTypes.find((type) => type.id == id)[priceType];
};
