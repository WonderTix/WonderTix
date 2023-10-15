import React, {useEffect, useState} from 'react';
import {getSeasonImage, SeasonImage} from '../seasonUtils';
import {useNavigate} from 'react-router';
import {
  createNewSeason,
  getSeasonInfo,
  updateSeasonInfo,
  RequestBody,
} from './utils/apiRequest';

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

  const handleCreateNewSeason = async (reqObject: RequestBody) => {
    const createdSeasonId = await createNewSeason(reqObject, token);
    if (createdSeasonId) {
      setSeasonId(createdSeasonId);
      navigate(`/ticketing/seasons/${createdSeasonId}`);
    }
  };

  const handleUpdateSeason = async (reqObject: RequestBody) => {
    const updateSeason = await updateSeasonInfo(reqObject, seasonId, token);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // formatting request body for POST and PUT request
    const reqObject = {
      ...seasonValues,
      startdate: Number(startdate.replaceAll('-', '')),
      enddate: Number(enddate.replaceAll('-', '')),
      imageurl: getSeasonImage(imageurl),
    };

    setIsFormEditing(false);
    if (seasonId === 0) {
      void handleCreateNewSeason(reqObject);
    } else {
      void handleUpdateSeason(reqObject);
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
      <button className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-10 rounded-xl'>
        Save
      </button>
      <button
        className='bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white font-bold py-2 px-10 rounded-xl'
        onClick={() => {
          seasonId === 0
            ? navigate('/ticketing/seasons/')
            : setIsFormEditing(false);
        }}
      >
        Cancel
      </button>
    </form>
  ) : (
    <header className='rounded-xl bg-white p-7 text-lg'>
      <section className='flex flex-col text-center mb-5 justify-between tab:flex-row  '>
        <h1 className='text-4xl mb-3 font-semibold'>Season Information</h1>
        <button
          className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-10 rounded-xl'
          onClick={() => setIsFormEditing(true)}
        >
          Edit
        </button>
      </section>

      <article className='grid grid-cols-12'>
        <div className='col-span-12 mb-5 text-center tab:text-start sm:col-span-6'>
          <h3 className='font-semibold'>Season Name </h3>
          <p className='mb-3 text-base'>{name}</p>

          <h3 className='font-semibold'>Start Date </h3>
          <p className='mb-3 text-base'>{startdate}</p>

          <h3 className='font-semibold'>End Date </h3>
          <p className='text-base'>{enddate}</p>
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <SeasonImage
            className='h-auto max-w-[125px] mx-auto'
            src={imageurl}
            alt={`Cover photo for ${name} season`}
          />
        </div>
      </article>
    </header>
  );
};

export default SeasonInfo;
