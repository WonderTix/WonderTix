import React, {useEffect, useState} from 'react';
import {getAllEvents, updateEventSeason} from './utils/apiRequest';
import EventCard from './EventCard';

interface SeasonEventsProps {
  token: string;
  seasonId: number;
  isFormEditing: boolean;
  setShowPopUp: (value) => void;
  setPopUpMessage: (value) => void;
}

const SeasonEvents = (props: SeasonEventsProps) => {
  const {seasonId, token, isFormEditing, setShowPopUp, setPopUpMessage} = props;
  const [allEventInfo, setAllEventInfo] = useState<any>([]);
  const [eventsNotInSeason, setEventsNotInSeason] = useState<any>([]);
  const [isAddEventActive, setIsAddEventActive] = useState<boolean>(false);

  const handleGetAllEvents = async () => {
    const allEvents = await getAllEvents(token);
    if (allEvents) {
      const eventsInSeason = allEvents.filter(
        (event) => event.seasonid_fk === seasonId,
      );
      const eventsNotInSeason = allEvents.filter(
        (event) => event.seasonid_fk === null,
      );

      setAllEventInfo(eventsInSeason);
      setEventsNotInSeason(eventsNotInSeason);
    }
  };

  const handleRemoveEvent = async (eventIdToRemove: number) => {
    const updatedEvents = allEventInfo.filter(
      (event) => Number(event.eventid) !== eventIdToRemove,
    );
    let eventToUpdate = allEventInfo.find(
      (event) => Number(event.eventid) === eventIdToRemove,
    );

    eventToUpdate = {
      ...eventToUpdate,
      seasonid_fk: null,
    };

    const updateEventCall = await updateEventSeason(eventToUpdate, token);
    if (updateEventCall) {
      setAllEventInfo(updatedEvents);
      setEventsNotInSeason([...eventsNotInSeason, eventToUpdate]);
    }
  };

  const deleteEventConfirmationHandler = (eventId: number) => {
    setShowPopUp(true);
    setPopUpMessage({
      title: 'Remove event',
      message: 'Are you sure you want to remove this event?',
      success: false,
      handleClose: () => setShowPopUp(false),
      handleProceed: () => {
        handleRemoveEvent(eventId);
        setShowPopUp(false);
      },
    });
  };

  const handleAddEventToSeason = async (eventIdToAdd: number) => {
    let eventToAdd = eventsNotInSeason.find(
      (event) => Number(event.eventid) === eventIdToAdd,
    );
    const updatedEventsNotInSeason = eventsNotInSeason.filter((event) => {
      return Number(event.eventid) !== eventIdToAdd;
    });

    eventToAdd = {
      ...eventToAdd,
      seasonid_fk: seasonId,
    };

    const updateEventCall = await updateEventSeason(eventToAdd, token);
    setShowPopUp(true);
    if (updateEventCall) {
      setAllEventInfo([...allEventInfo, eventToAdd]);
      setEventsNotInSeason(updatedEventsNotInSeason);
      setPopUpMessage({
        title: 'Success',
        message: 'The event has been added to the season!',
        success: true,
        handleClose: () => setShowPopUp(false),
        handleProceed: () => setShowPopUp(false),
      });
    } else {
      setPopUpMessage({
        title: 'Error',
        message:
          'There was a error adding the event to the season. Pleas try again.',
        success: false,
        handleClose: () => setShowPopUp(false),
        handleProceed: () => setShowPopUp(false),
      });
    }
  };

  useEffect(() => {
    void handleGetAllEvents();
  }, []);

  useEffect(() => {
    if (eventsNotInSeason.length > 0) {
      eventsNotInSeason.sort((a, b) => b.id - a.id);
    }
  }, [eventsNotInSeason]);

  return (
    <div className='rounded-xl p-7 bg-white text-lg mt-5 shadow-xl'>
      <section className='flex flex-col gap-4 items-center mb-4 tab:flex-row tab:justify-center tab:flex-wrap min-[1076px]:justify-between'>
        <article className='flex flex-wrap gap-2'>
          <h1 className='text-3xl'>Season Events </h1>
          <button
            className='flex gap-1 items-center bg-green-500 hover:bg-green-700 disabled:bg-gray-500 text-white p-2 rounded-xl'
            disabled={isFormEditing || isAddEventActive}
            onClick={() => setIsAddEventActive(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
              strokeWidth='3'
              stroke='currentColor'
              className='w-5 h-5 mb-1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v12m6-6H6'
              />
            </svg>
            <p>Add event</p>
          </button>
        </article>
      </section>
      {isAddEventActive && (
        <div className='h-96 overflow-auto mb-3 p-4 rounded-2xl bg-slate-300'>
          <div className='flex justify-between px-3 mt-3'>
            <h2 className='text-3xl mb-2'>Unassigned Events</h2>
            <button
              onClick={() => setIsAddEventActive(false)}
              className='flex gap-1 items-center bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl ml-3 mb-3'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fill-rule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                />
              </svg>
              <p>Close</p>
            </button>
          </div>
          {eventsNotInSeason.length !== 0 ? (
            eventsNotInSeason.map((event) => {
              return (
                <EventCard
                  key={event.eventid}
                  eventId={event.eventid}
                  name={event.eventname}
                  imageurl={event.imageurl}
                  addEventCard={true}
                  addEventToSeason={handleAddEventToSeason}
                />
              );
            })
          ) : (
            <p className='text-xl italic pl-3'>
              There are currently no events that are unassigned to a season
            </p>
          )}
        </div>
      )}
      {allEventInfo.map((event) => {
        return (
          <EventCard
            key={event.eventid}
            name={event.eventname}
            imageurl={event.imageurl}
            eventId={event.eventid}
            isFormEditing={isFormEditing}
            isAddEventActive={isAddEventActive}
            deleteEventConfirmationHandler={deleteEventConfirmationHandler}
          />
        );
      })}
    </div>
  );
};

export default SeasonEvents;
