import React, {useEffect, useState} from 'react';

interface SeasonProps {
  seasonId: number;
  token: number;
  isFormEditing: boolean;
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
  const {seasonId, token} = props;
  const [seasonValues, setSeasonValues] =
    useState<SeasonInfo>(seasonDefaultValues);
  const {name, startdate, enddate, imageurl} = seasonValues;

  useEffect(() => {
    void getSeasonInfo();
  }, []);

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

        const seasonInfo = await getSeasonRes.json();
        setSeasonValues(seasonInfo);
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
    void createNewSeason(postReqObject);
    setSeasonValues(seasonDefaultValues);
  };

  const onChangeHandler = (event) => {
    setSeasonValues((seasonValues) => ({
      ...seasonValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
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
  );
};

export default SeasonInfo;
