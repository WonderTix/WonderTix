import React, {useEffect, useState} from 'react';
import {getSeasonImage, SeasonImage} from '../seasonUtils';
import {useNavigate} from 'react-router';
import {
  createNewSeason,
  getSeasonInfo,
  updateSeasonInfo,
  RequestBody,
  deleteSeasonInfo,
  getAllEvents,
  updateEventSeason,
} from './utils/apiRequest';
import {seasonDefaultValues, SeasonProps} from './utils/seasonCommon';
import ViewSeasonInfo from './utils/ViewSeasonInfo';
import {FormControlLabel, Checkbox} from '@mui/material';

const SeasonInfo = (props: SeasonProps) => {
  const {
    seasonId,
    isFormEditing,
    setSeasonId,
    setShowPopUp,
    setPopUpMessage,
    setIsFormEditing,
    token,
  } = props;
  const [seasonValues, setSeasonValues] = useState(seasonDefaultValues);
  const [defaultSeasonImageCheckbox, setDefaultSeasonImageCheckbox] =
    useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [activeSeasonCheckbox, setActiveSeasonCheckbox] = useState(false);
  const [prevActiveSeasonCheckbox, setPrevActiveSeasonCheckbox] =
    useState(false);
  const [currentSeasonEvents, setCurrentSeasonEvents] = useState([]);

  const {name, startdate, enddate, imageurl} = seasonValues;
  const navigate = useNavigate();

  const handleGetSeasonInfo = async () => {
    const fetchedSeasonInfo = await getSeasonInfo(seasonId, token);
    const {imageurl: fetchedImage} = fetchedSeasonInfo;

    if (fetchedSeasonInfo) {
      if (fetchedImage === 'Default Season Image') {
        setDefaultSeasonImageCheckbox(true);
        setSeasonValues({
          ...fetchedSeasonInfo,
          imageurl: '',
        });
        return;
      }
      setSeasonValues(fetchedSeasonInfo);
      setTempImageUrl(getSeasonImage(fetchedImage));
    }
  };

  const handleCreateNewSeason = async (reqObject: RequestBody) => {
    const createdSeasonId = await createNewSeason(reqObject, token);
    if (createdSeasonId) {
      setPopUpMessage({
        title: 'Success',
        message: 'Season created successfully!',
        success: true,
        handleClose: () => setShowPopUp(false),
        handleProceed: () => setShowPopUp(false),
      });
      setShowPopUp(true);
      setSeasonId(createdSeasonId);
      navigate(`/ticketing/seasons/${createdSeasonId}`);
    }
  };

  const handleUpdateSeasonEvents = async (isSeasonActive: boolean) => {
    for (const event of currentSeasonEvents) {
      const eventReqBody = {...event, active: isSeasonActive};
      delete eventReqBody['deletedat'];
      const updateSingleEvent = await updateEventSeason(eventReqBody, token);
      if (!updateSingleEvent) return;
    }
  };

  const handleGetSeasonEvents = async () => {
    const seasonEvents = await getAllEvents(token, seasonId);
    if (seasonEvents) {
      const isSeasonActive = seasonEvents.every((event) => event.active);
      setActiveSeasonCheckbox(isSeasonActive);
      setPrevActiveSeasonCheckbox(isSeasonActive);
      setCurrentSeasonEvents(seasonEvents);
    }
  };

  const handleUpdateSeason = async (reqObject: RequestBody) => {
    const updateSeason = await updateSeasonInfo(reqObject, seasonId, token);
    const {imageurl} = reqObject;
    if (updateSeason) {
      setPopUpMessage({
        title: 'Success',
        message: 'Season update successful!',
        success: true,
        handleClose: () => setShowPopUp(false),
        handleProceed: () => setShowPopUp(false),
      });
      setShowPopUp(true);
      setTempImageUrl(imageurl === 'Default Season Image' ? '' : imageurl);
    }
  };

  const handleDeleteSeason = async (seasonId: number) => {
    const deleteSeason = await deleteSeasonInfo(seasonId, token);
    if (deleteSeason) {
      navigate('/ticketing/seasons');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // formatting request body for POST and PUT request
    const reqObject = {
      ...seasonValues,
      startdate: Number(startdate.replaceAll('-', '')),
      enddate: Number(enddate.replaceAll('-', '')),
      imageurl: imageurl === '' ? 'Default Season Image' : imageurl,
    };

    setIsFormEditing(false);
    if (seasonId === 0) {
      void handleCreateNewSeason(reqObject);
    } else {
      void handleUpdateSeason(reqObject);
      void handleUpdateSeasonEvents(activeSeasonCheckbox);
      setPrevActiveSeasonCheckbox(activeSeasonCheckbox);
    }
  };

  const onChangeHandler = (event) => {
    setSeasonValues((seasonValues) => ({
      ...seasonValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCancelButton = (event) => {
    event.preventDefault();
    if (seasonId === 0) {
      navigate('/ticketing/seasons/');
    } else {
      setIsFormEditing(false);
      setSeasonValues({...seasonValues, imageurl: tempImageUrl});
      setActiveSeasonCheckbox(prevActiveSeasonCheckbox);
      tempImageUrl !== ''
        ? setDefaultSeasonImageCheckbox(false)
        : setDefaultSeasonImageCheckbox(true);
    }
  };

  const deleteConfirmationHandler = (event) => {
    event.preventDefault();
    setPopUpMessage({
      title: 'Delete Season',
      message:
        'Are you sure you want to delete this season? All events currently in the season will be unassigned.',
      success: false,
      handleClose: () => setShowPopUp(false),
      handleProceed: () => handleDeleteSeason(seasonId),
    });
    setShowPopUp(true);
  };

  useEffect(() => {
    void handleGetSeasonInfo();
    void handleGetSeasonEvents();
  }, [seasonId]);

  return seasonId === 0 || isFormEditing ? (
    <form onSubmit={onSubmit} className='rounded-xl p-7 bg-white text-lg'>
      <section className='flex flex-col text-center tab:flex-row tab:text-start tab:justify-between tab:flex-wrap tab:mb-5'>
        <h1 className='text-4xl mb-3 font-semibold'>Edit Season</h1>
        <article className='flex flex-wrap justify-center gap-2'>
          <button className='bg-green-500 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-2 px-7 rounded-xl'>
            Save
          </button>
          <button
            className='bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white font-bold py-2 px-7 rounded-xl'
            onClick={deleteConfirmationHandler}
          >
            Delete
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-7 rounded-xl'
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
              disabled={defaultSeasonImageCheckbox}
              value={imageurl}
              onChange={onChangeHandler}
              className='text-sm w-full rounded-lg p-1 border border-zinc-400 disabled:bg-gray-200'
              required
            />
          </label>
          <div id='form-checkboxes' className='flex gap-7'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={defaultSeasonImageCheckbox}
                  onChange={() => {
                    setDefaultSeasonImageCheckbox((checked) => !checked);
                    setSeasonValues((seasonValues) => ({
                      ...seasonValues,
                      imageurl: '',
                    }));
                  }}
                />
              }
              label='Use Default Image'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={activeSeasonCheckbox}
                  onChange={() =>
                    setActiveSeasonCheckbox((checked) => !checked)
                  }
                />
              }
              label='Active'
            />
          </div>
        </div>
        <article className='col-span-12 tab:col-span-6'>
          <SeasonImage
            className='h-auto max-w-[175px] mx-auto mt-5'
            src={imageurl}
            alt={`Cover photo for ${name} season`}
          />
        </article>
      </div>
    </form>
  ) : (
    <ViewSeasonInfo
      {...seasonValues}
      setIsFormEditing={setIsFormEditing}
      isSeasonActive={activeSeasonCheckbox}
    />
  );
};

export default SeasonInfo;
