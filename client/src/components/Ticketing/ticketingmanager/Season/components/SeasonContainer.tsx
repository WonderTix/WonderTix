/* eslint-disable @typescript-eslint/no-empty-function */
import React, {useEffect, useState} from 'react';
import SeasonInfo from './SeasonInfo';
import SeasonEvents from './SeasonEvents';
import {LoadingScreen} from '../../../mainpage/LoadingScreen';
import {useFetchToken} from '../../showings/ShowingUpdated/ShowingUtils';
import PopUp from '../../../PopUp';
import {useParams} from 'react-router';
import {getAllEvents} from './utils/apiRequest';
import {seasonEventInfo, initialSeasonEventInfo, SeasonTicketValues} from './utils/seasonCommon';

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
  const [seasonTicketTypeData, setSeasonTicketTypeData] = useState<SeasonTicketValues[]>();
  const {token} = useFetchToken();

  const commonSeasonPageProps = {
    seasonId: seasonId,
    token: token,
    isFormEditing: isFormEditing,
    eventsInSeason: eventsInSeason,
    setEventsInSeason: setEventsInSeason,
    setShowPopUp: setShowPopUp,
    setPopUpMessage: setPopUpMessage,
  };

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

  const handleSeasonTicketType = async () => {
    try {
      const seasonTicketTypePriceRes = await fetch(
        process.env.REACT_APP_API_2_URL +
          `/season-ticket-type-price-default/${seasonId}`,
        {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );

      if (!seasonTicketTypePriceRes.ok) {
        throw new Error('Failed to get all event information');
      }

      const seasonTicketTypeData = await seasonTicketTypePriceRes.json();
      setSeasonTicketTypeData(seasonTicketTypeData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void handleGetAllEvents();
    void handleSeasonTicketType();
  }, []);

  if (token === '' || seasonId === undefined || eventsInSeason === undefined) {
    return <LoadingScreen />;
  } else {
    return (
      <div className='w-full h-screen overflow-x-hidden absolute bg-gray-200'>
        {showPopUp && <PopUp {...popUpMessage} />}
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <SeasonInfo
            {...commonSeasonPageProps}
            setSeasonId={setSeasonId}
            setIsFormEditing={setIsFormEditing}
            seasonTicketTypeData={seasonTicketTypeData}
          />
          <SeasonEvents
            {...commonSeasonPageProps}
            eventsNotInAnySeason={eventsNotInAnySeason}
            setEventsNotInAnySeason={setEventsNotInAnySeason}
          />
        </div>
      </div>
    );
  }
};

export default SeasonContainer;
