/* eslint-disable @typescript-eslint/no-empty-function */
import React, {useEffect, useState} from 'react';
import SeasonInfo from './SeasonInfo';
import SeasonEvents from './SeasonEvents';
import {LoadingScreen} from '../../../mainpage/LoadingScreen';
import {useFetchToken} from '../../Event/components/ShowingUtils';
import PopUp from '../../../PopUp';
import {useParams} from 'react-router';
import {getAllEvents} from './utils/apiRequest';
import {seasonEventInfo, SeasonTicketValues} from './utils/seasonCommon';

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
    const allEvents = await getAllEvents();
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

  const handleGetSeasonTicketType = async () => {
    try {
      const seasonTicketTypeTableRes = await fetch(
        process.env.REACT_APP_API_2_URL +
          `/season-ticket-type-price-default/${seasonId}`,
        {
          credentials: 'omit',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!seasonTicketTypeTableRes.ok) {
        throw new Error('Failed to get ticket type information');
      }

      const seasonTicketTypeData = await seasonTicketTypeTableRes.json();
      setSeasonTicketTypeData(seasonTicketTypeData.sort((a, b) => a.tickettypeid_fk - b.tickettypeid_fk));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSeasonTicketType = async (requestData, seasonId) => {
    try {
      const seasonUpdateTicketTypeRes = await fetch(
        process.env.REACT_APP_API_2_URL +
          `/season-ticket-type-price-default/${seasonId}`,
        {
          credentials: 'include',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        },
      );

      if (!seasonUpdateTicketTypeRes.ok) {
        throw new Error('Failed to update season ticket type');
      }
      const seasonUpdatedTicketTypeData = await seasonUpdateTicketTypeRes.json();

      setSeasonTicketTypeData(seasonUpdatedTicketTypeData.sort((a, b) => a.tickettypeid_fk - b.tickettypeid_fk));
    } catch (error) {
      console.error('Error updating season ticket type', error);
    }
  };

  useEffect(() => {
    void handleGetAllEvents();
    void handleGetSeasonTicketType();
  }, []);

  if (token === '' || seasonId === undefined || eventsInSeason === undefined) {
    return (
      <div className='absolute w-screen z-10'>
        <LoadingScreen />
      </div>
    );
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
            onUpdateSeasonTicketType={handleUpdateSeasonTicketType}
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
