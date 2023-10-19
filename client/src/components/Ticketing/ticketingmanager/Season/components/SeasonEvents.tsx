import React, {useEffect, useState} from 'react';
import {getAllEvents} from './utils/apiRequest';
import EventCard from './EventCard';

interface SeasonEventsProp {
  token: string;
  seasonId: number;
}

const SeasonEvents = (props: SeasonEventsProp) => {
  const {seasonId, token} = props;
  const [allEventInfo, setAllEventInfo] = useState([]);

  const handleGetAllEvents = async () => {
    const allEvents = await getAllEvents(token);
    if (allEvents) {
      const {data} = allEvents;
      const filteredEvents = data.filter(
        (event) => event.seasonid === seasonId,
      );
      setAllEventInfo(filteredEvents);
    }
  };

  useEffect(() => {
    void handleGetAllEvents();
  }, []);

  return (
    <div className='rounded-xl p-7 bg-white text-lg mt-5'>
      <section className='flex flex-col items-center tab:flex-row tab: justify-between mb-6'>
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
          />
        );
      })}
    </div>
  );
};

export default SeasonEvents;
