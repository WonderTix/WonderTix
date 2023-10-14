import React, {useEffect, useState} from 'react';
import {formatSeasonDate, getSeasonImage} from '../seasonUtils';
import {useNavigate} from 'react-router';
import {createNewSeason, getSeasonInfo} from './utils/apiRequest';

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
  const [imageCheckbox, setImageCheckbox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    void handleGetSeasonInfo();
  }, [seasonId]);

  const handleGetSeasonInfo = async () => {
    const fetchedSeasonInfo = await getSeasonInfo(seasonId, token);
    if (fetchedSeasonInfo) {
      setSeasonValues(fetchedSeasonInfo);
    }
  };

  const handleCreateNewSeason = async () => {
    const postReqObject = {
      ...seasonValues,
      startdate: Number(startdate.replaceAll('-', '')),
      enddate: Number(enddate.replaceAll('-', '')),
      imageurl: getSeasonImage(imageurl),
    };

    const createdSeasonId = await createNewSeason(postReqObject, token);
    if (createdSeasonId) {
      setSeasonId(createdSeasonId);
      navigate(`/ticketing/seasons/${createdSeasonId}`);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setIsFormEditing(false);
    if (seasonId === 0) {
      void handleCreateNewSeason();
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
        disabled={imageCheckbox}
        value={imageurl}
        onChange={onChangeHandler}
        required
      />
      <input
        type='checkbox'
        id='defaultImage'
        name='defaultImage'
        checked={imageCheckbox}
        onChange={() => {
          setImageCheckbox((checked) => !checked);
          setSeasonValues((seasonValues) => ({
            ...seasonValues,
            imageurl: '',
          }));
        }}
      />
      <label htmlFor='defaultImage'>Use Default Image</label>
      <button>Save</button>
    </form>
  ) : (
    <section className='rounded-xl border-black border-solid border-2 p-5 text-lg'>
      <h1 className='text-4xl mb-3 font-semibold'>Season Information</h1>
      <button
        className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl'
        onClick={() => setIsFormEditing(true)}
      >
        Edit
      </button>

      <h3 className='font-semibold'>Season Name:</h3>
      <p className='mb-3 font-sm'>{name}</p>

      <h3 className='font-semibold'>Start Date: </h3>
      <p className='mb-3 font-xs'>{startdate}</p>

      <h3 className='font-semibold'>End Date: </h3>
      <p>{enddate}</p>
    </section>
  );
};

export default SeasonInfo;
