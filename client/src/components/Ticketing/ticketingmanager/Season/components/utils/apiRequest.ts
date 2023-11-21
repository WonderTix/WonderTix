import {formatSeasonDate, getSeasonImage} from '../../seasonUtils';

export interface RequestBody {
  seasonid: number;
  name: string;
  startdate: number;
  enddate: number;
  imageurl: string;
}

export interface EventRequestBody {
  eventid: number;
  seasonid_fk: number;
  eventname: string;
  eventdescription: string;
  active: boolean;
  seasonticketeligible: boolean;
  imageurl: string;
}

export const createNewSeason = async (reqBody: RequestBody, token: string) => {
  try {
    const createSeasonRes = await fetch(
      process.env.REACT_APP_API_2_URL + '/season',
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reqBody),
      },
    );

    if (!createSeasonRes.ok) {
      throw new Error('Failed to create new season');
    }

    const {seasonid} = await createSeasonRes.json();
    return seasonid;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSeasonInfo = async (seasonId: number, token: string) => {
  if (seasonId !== 0) {
    try {
      const getSeasonRes = await fetch(
        process.env.REACT_APP_API_2_URL + `/season/${seasonId}`,
        {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );

      if (!getSeasonRes.ok) {
        throw new Error('Failed to fetch season information');
      }

      // Converting startdate and enddate response to string for form validation
      const seasonInfo = await getSeasonRes.json();
      const {startdate: sdate, enddate: edate} = seasonInfo;
      const modifiedSeasonInfo = {
        ...seasonInfo,
        startdate: formatSeasonDate(sdate, true),
        enddate: formatSeasonDate(edate, true),
      };

      return modifiedSeasonInfo;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

export const updateSeasonInfo = async (
  reqBody: RequestBody,
  seasonId: number,
  token: string,
) => {
  try {
    const updateSeasonRes = await fetch(
      process.env.REACT_APP_API_2_URL + `/season/${seasonId}`,
      {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reqBody),
      },
    );

    if (!updateSeasonRes.ok) {
      throw new Error('Failed to update season information');
    }

    return updateSeasonRes.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteSeasonInfo = async (seasonId: number, token: string) => {
  try {
    const deleteSeasonRes = await fetch(
      process.env.REACT_APP_API_2_URL + `/season/${seasonId}`,
      {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      },
    );

    if (!deleteSeasonRes.ok) {
      throw new Error('Failed to delete season informaiton');
    }

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Retrieve all events, or retrieve all events for a particular season (if seasonId specified)
export const getAllEvents = async (token: string, seasonId?: number) => {
  const apiUrlSuffix =
    seasonId === undefined ? '/events' : `/events/season/${seasonId}`;

  try {
    const getAllEventsRes = await fetch(
      process.env.REACT_APP_API_2_URL + apiUrlSuffix,
      {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      },
    );

    if (!getAllEventsRes.ok) {
      throw new Error('Failed to get all event information');
    }

    const eventsInfo = await getAllEventsRes.json();
    return eventsInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateEventSeason = async (
  reqBody: EventRequestBody,
  token: string,
) => {
  try {
    const updateEventSeasonRes = await fetch(
      process.env.REACT_APP_API_2_URL + '/events',
      {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reqBody),
      },
    );

    if (!updateEventSeasonRes.ok) {
      throw new Error('Failed to change event season information');
    }

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};
