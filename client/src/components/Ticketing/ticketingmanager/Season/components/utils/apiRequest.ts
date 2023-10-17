import {formatSeasonDate} from '../../seasonUtils';

export interface RequestBody {
  seasonid: number;
  name: string;
  startdate: number;
  enddate: number;
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
      throw new Error(`Failed to create new season`);
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
