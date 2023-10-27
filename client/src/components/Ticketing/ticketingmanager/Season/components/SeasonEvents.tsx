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
        <div className='h-96 overflow-auto mb-3'>
          <div className='flex justify-between px-3'>
            <h2 className='text-2xl mb-2 inline'>Unassigned Events</h2>
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
