import React, {useEffect, useState} from 'react';
import {getSeasonImage, SeasonImage} from '../seasonUtils';
import {useNavigate} from 'react-router';
import {
  createNewSeason,
  getSeasonInfo,
  updateSeasonInfo,
  RequestBody,
  deleteSeasonInfo,
  updateEventSeason,
} from './utils/apiRequest';
import {seasonDefaultValues, SeasonProps} from './utils/seasonCommon';
import ViewSeasonInfo from './utils/ViewSeasonInfo';
import {LoadingScreen} from '../../../mainpage/LoadingScreen';
import {SeasonTicketTypeUpdateTable} from './utils/SeasonTicketTypeUpdateTable';

const SeasonInfo = (props: SeasonProps) => {
  const {
    seasonId,
    isFormEditing,
    eventsInSeason,
    setEventsInSeason,
    setSeasonId,
    setShowPopUp,
    setPopUpMessage,
    setIsFormEditing,
    token,
  } = props;
  const [seasonValues, setSeasonValues] = useState(seasonDefaultValues);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [activeSeasonSwitch, setActiveSeasonSwitch] = useState<
    boolean | undefined
  >();

  const {name, startdate, enddate, imageurl} = seasonValues;
  const navigate = useNavigate();

  const handleGetSeasonInfo = async () => {
    const fetchedSeasonInfo = await getSeasonInfo(seasonId, token);
    const {imageurl: fetchedImage} = fetchedSeasonInfo;

    if (fetchedSeasonInfo) {
      if (fetchedImage === 'Default Season Image') {
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
    for (const event of eventsInSeason) {
      const eventReqBody = {...event, active: isSeasonActive};
      delete eventReqBody['deletedat'];
      const updateSingleEvent = await updateEventSeason(eventReqBody, token);
      if (!updateSingleEvent) return;
    }
    setEventsInSeason((allEventsInSeason) => {
      return allEventsInSeason.map((singleEvent) => {
        return {...singleEvent, active: isSeasonActive};
      });
    });
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
  }, [seasonId]);

  useEffect(() => {
    const isSeasonActive = eventsInSeason.every((event) => event.active);
    setActiveSeasonSwitch(isSeasonActive);
  }, [eventsInSeason]);

  if (activeSeasonSwitch === undefined) return <LoadingScreen />;

  return seasonId === 0 || isFormEditing ? (
    <form onSubmit={onSubmit} className='rounded-xl p-7 bg-white text-lg'>
      <section className='flex flex-col gap-3 text-center tab:flex-row tab:text-start tab:justify-between tab:flex-wrap tab:mb-5'>
        <h1 className='text-4xl font-semibold'>Edit Season</h1>
        <article className='flex flex-wrap justify-center gap-2 mb-3 tab:mb-0'>
          <button className='bg-green-500 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-2 px-7 rounded-xl'>
            Save
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
        <div className='flex flex-col gap-3 col-span-12 mb-5 text-center tab:text-start lg:col-span-2'>
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
            <div className='flex gap-2'>
              <input
                type='text'
                id='imageUrl'
                name='imageurl'
                value={imageurl}
                onChange={onChangeHandler}
                className='text-sm w-full rounded-lg p-1 border border-zinc-400 disabled:bg-gray-200'
              />
              <button
                className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold px-4 py-1 rounded-xl'
                onClick={(event) => {
                  event.preventDefault();
                  setSeasonValues((seasonValues) => ({
                    ...seasonValues,
                    imageurl: '',
                  }));
                }}
              >
                Default
              </button>
            </div>
          </label>
        </div>
        <article className='col-span-12 lg:col-span-2 pl-2'>
          <SeasonImage
            className='h-auto max-w-[175px] mx-auto mt-5'
            src={imageurl}
            alt={`Cover photo for ${name} season`}
          />
        </article>
        <div className='pl-2 col-span-12 lg:col-span-8 h-[100%]'>
          <div className='flex flex-col justify-center m-auto col-span-12 lg:col-span-8 rounded-lg p-3 w-[100%] h-[100%]'>
            <SeasonTicketTypeUpdateTable/>
          </div>
        </div>
      </div>
    </form>
  ) : (
    <ViewSeasonInfo
      {...seasonValues}
      activeSeasonSwitch={activeSeasonSwitch}
      setIsFormEditing={setIsFormEditing}
      setActiveSeasonSwitch={setActiveSeasonSwitch}
      handleUpdateSeasonEvents={handleUpdateSeasonEvents}
      deleteConfirmationHandler={deleteConfirmationHandler}
    />
  );
};

export default SeasonInfo;
