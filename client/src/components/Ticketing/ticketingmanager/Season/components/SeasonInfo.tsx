import React, {useEffect, useState} from 'react';
import {formatSeasonDate} from '../seasonUtils';

interface SeasonProps {
  seasonId: number;
  token: string;
  isFormEditing: boolean;
  setIsFormEditing: (value) => void;
  setSeasonId: (value) => void;
}

export interface SeasonInfo {
  seasonid: number;
  name: string;
  startdate: string;
  enddate: string;
  imageurl: string;
}

export const seasonDefaultValues: SeasonInfo = {
  seasonid: 0,
  name: '',
  startdate: '',
  enddate: '',
  imageurl: '',
};

const SeasonInfo = (props: SeasonProps) => {
  const {seasonId, setSeasonId, isFormEditing, setIsFormEditing, token} = props;
  const [seasonValues, setSeasonValues] =
    useState<SeasonInfo>(seasonDefaultValues);
  const {name, startdate, enddate, imageurl} = seasonValues;

  useEffect(() => {
    void getSeasonInfo();
  }, [seasonId]);

  const getSeasonInfo = async () => {
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

        setSeasonValues(modifiedSeasonInfo);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const createNewSeason = async (reqBody) => {
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
      setSeasonId(seasonid);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const postReqObject = {
      ...seasonValues,
      startdate: Number(seasonValues.startdate.replaceAll('-', '')),
      enddate: Number(seasonValues.enddate.replaceAll('-', '')),
    };

    setIsFormEditing(false);
    if (seasonId === 0) {
      void createNewSeason(postReqObject);
    } else {
      console.log('updating season');
    }
  };

  const onChangeHandler = (event) => {
    setSeasonValues((seasonValues) => ({
      ...seasonValues,
      [event.target.name]: event.target.value,
    }));
  };

  return seasonId === 0 || isFormEditing ? (
    <form onSubmit={onSubmit}>
      <label htmlFor='seasonName'>Season Name: </label>
      <input
        type='text'
        id='seasonName'
        name='name'
        value={name}
        onChange={onChangeHandler}
        required
      />
      <label htmlFor='startDate'>Start Date: </label>
      <input
        type='date'
        id='startDate'
        name='startdate'
        value={startdate}
        onChange={onChangeHandler}
        required
      />
      <label htmlFor='endDate'>End Date: </label>
      <input
        type='date'
        id='endDate'
        name='enddate'
        value={enddate}
        onChange={onChangeHandler}
        required
      />
      <label htmlFor='imageUrl'>Image URL: </label>
      <input
        type='text'
        id='imageUrl'
        name='imageurl'
        value={imageurl}
        onChange={onChangeHandler}
        required
      />
      <button>Save</button>
    </form>
  ) : (
    <div>
      <h1>{name}</h1>
      <button onClick={() => setIsFormEditing(true)}>Edit Season</button>
    </div>
  );
};

export default SeasonInfo;
