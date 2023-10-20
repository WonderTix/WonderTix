import React, {useEffect, useState} from 'react';
import {getAllEvents, updateEventSeason} from './utils/apiRequest';
import EventCard from './EventCard';
import PopUp from '../../../Pop-up';

interface SeasonEventsProp {
  token: string;
  seasonId: number;
  isFormEditing: boolean;
  setIsFormEditing: (value) => void;
}

const SeasonEvents = (props: SeasonEventsProp) => {
  const {seasonId, token, isFormEditing, setIsFormEditing} = props;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [allEventInfo, setAllEventInfo] = useState([]);
  const [eventToRemove, setEventToRemove] = useState<number>();

  const handleGetAllEvents = async () => {
    const allEvents = await getAllEvents(token);
    if (allEvents) {
      const {data} = allEvents;
      const filteredEvents = data.filter(
        (event) => event.seasonid === seasonId,
      );
      console.log(filteredEvents);
      setAllEventInfo(filteredEvents);
    }
  };

  const handleRemoveEvent = async (eventIdToRemove: number) => {
    const updatedEvents = allEventInfo.filter(
      (event) => Number(event.id) !== eventIdToRemove,
    );
    let eventToUpdate = allEventInfo.find(
      (event) => Number(event.id) === eventIdToRemove,
    );

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

    // Temporary solution until Ben's changes
    // Fetch all event API returns data with different names than what update event API expects as payload
    delete eventToUpdate['id'];
    delete eventToUpdate['seasonid'];
    delete eventToUpdate['seasonticketeligible'];
    delete eventToUpdate['numshows'];
    delete eventToUpdate['description'];
    delete eventToUpdate['title'];

    const updateEventCall = await updateEventSeason(eventToUpdate, token);
    if (updateEventCall) {
      setAllEventInfo(updatedEvents);
    }
    setShowDeleteConfirm(false);
  };

  const deleteConfirmationHandler = (eventId: number) => {
    setShowDeleteConfirm(true);
    setEventToRemove(eventId);
  };

  useEffect(() => {
    void handleGetAllEvents();
  }, []);

  return (
    <div className='rounded-xl p-7 bg-white text-lg mt-5'>
      <div className='absolute top-0 left-0'>
        {showDeleteConfirm && (
          <PopUp
            title='Confirm deletion'
            message={`Are you sure you want to remove this event?`}
            handleClose={() => {
              setShowDeleteConfirm(false);
              setEventToRemove(null);
            }}
            handleProceed={() => handleRemoveEvent(eventToRemove)}
            success={false}
          />
        )}
      </div>
      <section className='flex flex-col items-center tab:flex-row tab:justify-between mb-6'>
        <h1 className='text-3xl'>Season Events </h1>
        <div>
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
        </div>
      </section>
      {allEventInfo.map((event) => {
        return (
          <EventCard
            key={event.id}
            name={event.title}
            imageurl={event.imageurl}
            eventId={event.id}
            isFormEditing={isFormEditing}
            deleteConfirmationHandler={deleteConfirmationHandler}
          />
        );
      })}
    </div>
  );
};

export default SeasonEvents;
