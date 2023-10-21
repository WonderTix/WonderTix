import React, {useEffect, useState} from 'react';
import {getAllEvents, updateEventSeason} from './utils/apiRequest';
import EventCard from './EventCard';
import PopUp from '../../../Pop-up';

interface SeasonEventsProp {
  token: string;
  seasonId: number;
  isFormEditing: boolean;
  setShowPopUp: (value) => void;
  setPopUpMessage: (value) => void;
}

const SeasonEvents = (props: SeasonEventsProp) => {
  const {seasonId, token, isFormEditing, setShowPopUp, setPopUpMessage} = props;
  const [allEventInfo, setAllEventInfo] = useState<any>([]);
  const [eventsNotInSeason, setEventsNotInSeason] = useState<any>([]);
  const [isAddEventActive, setIsAddEventActive] = useState<boolean>(false);

  const handleGetAllEvents = async () => {
    const allEvents = await getAllEvents(token);
    if (allEvents) {
      const {data} = allEvents;
      const eventsInSeason = data.filter(
        (event) => event.seasonid === seasonId,
      );
      const eventsNotInSeason = data.filter((event) => event.seasonid === null);

      setAllEventInfo(eventsInSeason);
      setEventsNotInSeason(eventsNotInSeason);
    }
  };

  const handleRemoveEvent = async (eventIdToRemove: number) => {
    const updatedEvents = allEventInfo.filter(
      (event) => Number(event.id) !== eventIdToRemove,
    );
    let eventToUpdate = allEventInfo.find(
      (event) => Number(event.id) === eventIdToRemove,
    );
    const eventToUpdateCopy = {...eventToUpdate};

    // Temporary solution until Events API is updated (Line 43 - 62)
    // Fetch all event API returns data with different property names than what update event API requires as payload
    const {
      id: eventId,
      description: eventDescription,
      title: eventName,
    } = eventToUpdate;
    eventToUpdate = {
      ...eventToUpdate,
      eventid: eventId,
      eventname: eventName,
      eventdescription: eventDescription,
      seasonid_fk: null,
    };
    delete eventToUpdate['id'];
    delete eventToUpdate['seasonid'];
    delete eventToUpdate['seasonticketeligible'];
    delete eventToUpdate['numshows'];
    delete eventToUpdate['description'];
    delete eventToUpdate['title'];

    const updateEventCall = await updateEventSeason(eventToUpdate, token);
    if (updateEventCall) {
      setAllEventInfo(updatedEvents);
      setEventsNotInSeason([...eventsNotInSeason, eventToUpdateCopy]);
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
      (event) => Number(event.id) === eventIdToAdd,
    );
    const eventToAddCopy = {...eventToAdd};
    const updatedEventsNotInSeason = eventsNotInSeason.filter((event) => {
      return Number(event.id) !== eventIdToAdd;
    });

    // Temporary solution until Events API is updated (Line 94 - 113)
    // Fetch all event API returns data with different property names than what update event API requires as payload
    const {
      id: eventId,
      description: eventDescription,
      title: eventName,
    } = eventToAdd;
    eventToAdd = {
      ...eventToAdd,
      eventid: eventId,
      eventname: eventName,
      eventdescription: eventDescription,
      seasonid_fk: seasonId,
    };
    delete eventToAdd['id'];
    delete eventToAdd['seasonid'];
    delete eventToAdd['seasonticketeligible'];
    delete eventToAdd['numshows'];
    delete eventToAdd['description'];
    delete eventToAdd['title'];

    const updateEventCall = await updateEventSeason(eventToAdd, token);
    setShowPopUp(true);
    if (updateEventCall) {
      setAllEventInfo([...allEventInfo, eventToAddCopy]);
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

  return (
    <div className='rounded-xl p-7 bg-white text-lg mt-5'>
      <section className='flex flex-col gap-4 items-center tab:flex-row tab:justify-between mb-6'>
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
        <article>
          <label className='pr-2' htmlFor='eventSelect'>
            Sort by:
          </label>
          <select
            name='sortBy'
            id='eventSelect'
            className='p-1 border border-zinc-500 rounded-lg'
          >
            <option value='eventName'>Event Name - Ascending</option>
          </select>
        </article>
      </section>
      {isAddEventActive && (
        <div className='h-96 overflow-scroll mb-3'>
          <h2 className='text-2xl mb-2 inline'>Unassigned Events</h2>
          <button
            onClick={() => setIsAddEventActive(false)}
            className='bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-5 rounded-xl ml-3 mb-3'
          >
            Close
          </button>
          {eventsNotInSeason.length !== 0 ? (
            eventsNotInSeason.map((event) => {
              return (
                <EventCard
                  key={event.id}
                  eventId={event.id}
                  name={event.title}
                  imageurl={event.imageurl}
                  addEventCard={true}
                  addEventToSeason={handleAddEventToSeason}
                />
              );
            })
          ) : (
            <p className='text-xl italic'>
              There are currently no events that are unassigned to a season
            </p>
          )}
        </div>
      )}
      {allEventInfo.map((event) => {
        return (
          <EventCard
            key={event.id}
            name={event.title}
            imageurl={event.imageurl}
            eventId={event.id}
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
