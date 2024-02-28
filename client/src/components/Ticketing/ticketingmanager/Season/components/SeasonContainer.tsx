/* eslint-disable @typescript-eslint/no-empty-function */
import React, {useEffect, useState} from 'react';
import SeasonInfo from './SeasonInfo';
import SeasonEvents from './SeasonEvents';
import {LoadingScreen} from '../../../mainpage/LoadingScreen';
import {useFetchToken} from '../../Event/components/ShowingUtils';
import PopUp from '../../../PopUp';
import {useParams} from 'react-router';
import {getAllEvents} from './utils/apiRequest';
import {seasonEventInfo} from './utils/seasonCommon';
import {Tab, Tabs} from '@mui/material';
import {SeasonTicketTypesContainer} from './SeasonSubscriptionAndTicketTypes/SeasonTicketTypesContainer';
import {SubscriptionTypeContainer} from './SeasonSubscriptionAndTicketTypes/SubscriptionTypeContainer';

const defaultPopUpValues = {
  title: '',
  message: '',
  success: false,
  handleClose: () => undefined,
  handleProceed: () => undefined,
  showSecondary: false,
  showClose: false,
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
  const [tab, setTab] = useState(0);
    const [editing, setEditing] = useState(!seasonId);

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

  useEffect(() => {
    void handleGetAllEvents();
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
            setIsFormEditing={(value: boolean) => {
              setEditing(value);
              setIsFormEditing(value);
            }}
            disabled={editing}
          />
          <div className='lg:ml-2 col-span-12 lg:col-span-8 h-[100%] w-[100%] pt-3 md:p-3 rounded-lg'>
            <Tabs
              value={tab}
              onChange={(e, newValue) => {
                setTab(newValue);
                if (!isFormEditing) setEditing(false);
              }}
            >
              <Tab label='Events' />
              <Tab label='Ticket & Subscription Types' />
            </Tabs>
            {!tab ? (
              <SeasonEvents
                {...commonSeasonPageProps}
                eventsNotInAnySeason={eventsNotInAnySeason}
                setEventsNotInAnySeason={setEventsNotInAnySeason}
              />
            ) : (
              <div className='flex flex-col h-[100%] gap-3'>
                <SeasonTicketTypesContainer
                  token={token}
                  id={seasonId}
                  disabled={editing}
                  setDisabled={setEditing}
                  setPopUpProps={(value) => {
                    setPopUpMessage(value);
                    setShowPopUp(true);
                  }}
                  showPopUp={showPopUp}
                />
                <SubscriptionTypeContainer
                  token={token}
                  id={seasonId}
                  disabled={editing}
                  setDisabled={setEditing}
                  setPopUpProps={(value) => {
                    setPopUpMessage(value);
                    setShowPopUp(true);
                  }}
                  showPopUp={showPopUp}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default SeasonContainer;
