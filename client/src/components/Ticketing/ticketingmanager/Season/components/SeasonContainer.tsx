/* eslint-disable @typescript-eslint/no-empty-function */
import React, {useEffect, useState} from 'react';
import SeasonInfo from './SeasonInfo';
import SeasonEvents from './SeasonEvents';
import {LoadingScreen} from '../../../mainpage/LoadingScreen';
import {useFetchToken} from '../../showings/ShowingUpdated/ShowingUtils';
import PopUp from '../../../PopUp';
import {useParams} from 'react-router';
import {getAllEvents} from './utils/apiRequest';
import {seasonEventInfo, initialSeasonEventInfo} from './utils/seasonCommon';

const defaultPopUpValues = {
  title: '',
  message: '',
  success: false,
  handleClose: () => undefined,
  handleProcess: () => undefined,
};

const SeasonContainer = () => {
  const providedSeasonId = useParams();
  const [seasonId, setSeasonId] = useState(Number(providedSeasonId.seasonid));
  const [eventsInSeason, setEventsInSeason] = useState<seasonEventInfo[]>();
  const [eventsNotInAnySeason, setEventsNotInAnySeason] =
    useState<seasonEventInfo[]>();
  const [isFormEditing, setIsFormEditing] = useState<boolean>(!seasonId);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [popUpMessage, setPopUpMessage] = useState({
    ...defaultPopUpValues,
    handleClose: () => setShowPopUp(false),
    handleProceed: () => setShowPopUp(false),
  });
  const {token} = useFetchToken();

  const handleGetAllEvents = async () => {
    const allEvents = await getAllEvents(token);
    if (allEvents) {
      const eventsInCurrentSeason = allEvents.filter(
        (event) => event.seasonid_fk === seasonId,
      );
      const unassignedEvents = allEvents.filter(
        (event) => event.seasonid_fk === null,
      );

      setEventsInSeason(eventsInCurrentSeason);
      setEventsNotInAnySeason(unassignedEvents);
    }
  };

  useEffect(() => {
    void handleGetAllEvents();
  }, []);

  if (token === '' || seasonId === undefined || eventsInSeason === undefined) {
    return <LoadingScreen />;
  } else {
    return (
      <div className='w-full h-screen overflow-x-hidden absolute bg-gray-200'>
        {showPopUp && <PopUp {...popUpMessage} />}
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <SeasonInfo
            seasonId={seasonId}
            isFormEditing={isFormEditing}
            setIsFormEditing={setIsFormEditing}
            setSeasonId={setSeasonId}
            setPopUpMessage={setPopUpMessage}
            setShowPopUp={setShowPopUp}
            eventsInSeason={eventsInSeason}
            setEventsInSeason={setEventsInSeason}
            token={token}
          />
          <SeasonEvents
            token={token}
            seasonId={seasonId}
            eventsInSeason={eventsInSeason}
            eventsNotInAnySeason={eventsNotInAnySeason}
            setEventsInSeason={setEventsInSeason}
            setEventsNotInAnySeason={setEventsNotInAnySeason}
            setShowPopUp={setShowPopUp}
            setPopUpMessage={setPopUpMessage}
            isFormEditing={isFormEditing}
          />
        </div>
      </div>
    );
  }
};

export default SeasonContainer;
