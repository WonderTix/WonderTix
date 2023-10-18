import React, {useEffect, useState} from 'react';
import {getSeasonImage, SeasonImage} from '../seasonUtils';
import {useNavigate} from 'react-router';
import {
  createNewSeason,
  getSeasonInfo,
  updateSeasonInfo,
  RequestBody,
} from './utils/apiRequest';
import {seasonDefaultValues, SeasonProps} from './utils/seasonCommon';
import ViewSeasonInfo from './utils/ViewSeasonInfo';

const SeasonInfo = (props: SeasonProps) => {
  const {seasonId, setSeasonId, setShowPopUp, setPopUpMessage, token} = props;
  const [seasonValues, setSeasonValues] = useState(seasonDefaultValues);
  const [isFormEditing, setIsFormEditing] = useState<boolean>(!seasonId);
  const [imageCheckbox, setImageCheckbox] = useState(false);

  const {name, startdate, enddate, imageurl} = seasonValues;
  const navigate = useNavigate();

  useEffect(() => {
    void handleGetSeasonInfo();
  }, [seasonId]);

  const handleGetSeasonInfo = async () => {
    const fetchedSeasonInfo = await getSeasonInfo(seasonId, token);
    const {imageurl} = fetchedSeasonInfo;
    if (fetchedSeasonInfo) {
      setSeasonValues(fetchedSeasonInfo);
    }
  };

  const handleCreateNewSeason = async (reqObject: RequestBody) => {
    const createdSeasonId = await createNewSeason(reqObject, token);
    if (createdSeasonId) {
      setPopUpMessage({
        title: 'Success',
        message: 'Season created successfully!',
        success: true,
      });
      setShowPopUp(true);
      setSeasonId(createdSeasonId);
      navigate(`/ticketing/seasons/${createdSeasonId}`);
    }
  };

  const handleUpdateSeason = async (reqObject: RequestBody) => {
    const updateSeason = await updateSeasonInfo(reqObject, seasonId, token);
    if (updateSeason) {
      setPopUpMessage({
        title: 'Success',
        message: 'Season update successful!',
        success: true,
      });
      setShowPopUp(true);
    }
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

  const handleCancelButton = () => {
    if (seasonId === 0) {
      navigate('/ticketing/seasons/');
    } else {
      setIsFormEditing(false);
    }
  };

  return seasonId === 0 || isFormEditing ? (
    <form onSubmit={onSubmit} className='rounded-xl p-7 bg-white text-lg'>
      <section className='flex flex-col text-center tab:flex-row tab:text-start tab:justify-between'>
        <h1 className='text-4xl mb-3 font-semibold'>Edit Season</h1>
        <article>
          <button className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-7 rounded-xl'>
            Save
          </button>
          <button
            className='bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white font-bold py-2 px-7 rounded-xl ml-3'
            onClick={handleCancelButton}
          >
            Cancel
          </button>
        </article>
      </section>
      <div className='grid grid-cols-12'>
        <div className='flex flex-col gap-2 col-span-12 mb-5 text-center tab:text-start tab:col-span-6'>
          <label htmlFor='seasonName'>
            Season Name:
            <input
              type='text'
              id='seasonName'
              name='name'
              value={name}
              onChange={onChangeHandler}
              className='text-sm w-full rounded-lg p-1 border border-zinc-400'
              required
            />
          </label>
          <label htmlFor='startDate'>
            Start Date:
            <input
              type='date'
              id='startDate'
              name='startdate'
              value={startdate}
              onChange={onChangeHandler}
              className='text-sm w-full rounded-lg p-1 border border-zinc-400'
              required
            />
          </label>
          <label htmlFor='endDate'>
            End Date:
            <input
              type='date'
              id='endDate'
              name='enddate'
              value={enddate}
              onChange={onChangeHandler}
              className='text-sm w-full rounded-lg p-1 border border-zinc-400'
              required
            />
          </label>
          <label htmlFor='imageUrl'>
            Image URL:
            <input
              type='text'
              id='imageUrl'
              name='imageurl'
              disabled={imageCheckbox}
              value={imageurl}
              onChange={onChangeHandler}
              className='text-sm w-full rounded-lg p-1 border border-zinc-400 disabled:bg-gray-200'
              required
            />
          </label>
          <div id='form-checkboxes' className='flex gap-7'>
            <div className='checkbox-2'>
              <input
                type='checkbox'
                id='defaultImage'
                name='defaultImage'
                className='mr-2'
                checked={imageCheckbox}
                onChange={() => {
                  setImageCheckbox((checked) => !checked);
                  setSeasonValues((seasonValues) => ({
                    ...seasonValues,
                    imageurl: '',
                  }));
                }}
              />
              <label className='text-base' htmlFor='defaultImage'>
                Use Default Image
              </label>
            </div>
            <div className='checkbox-2'>
              <input
                className='mr-2'
                type='checkbox'
                id='activeSeason'
                name='activeSeason'
              />
              <label className='text-base' htmlFor='activeSeason'>
                Active
              </label>
            </div>
          </div>
        </div>
        <article className='col-span-12 tab:col-span-6'>
          <SeasonImage
            className='h-auto max-w-[175px] mx-auto'
            src={imageurl}
            alt={`Cover photo for ${name} season`}
          />
        </article>
      </div>
    </form>
  ) : (
    <ViewSeasonInfo {...seasonValues} setIsFormEditing={setIsFormEditing} />
  );
};

export default SeasonInfo;
