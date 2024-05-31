import React, {ReactElement, useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {fetchTicketingData} from '../ticketingmanager/ticketingSlice';
import EventSection from './EventSection';
import {Event} from '../ticketingmanager/ticketingSlice';

/**
 * Events page
 *
 * @returns {ReactElement} state.event.ticketing also returned
 */
const Hero = (): ReactElement => {
  const [nowPlayingEvents, setNowPlayingEvents] = useState<Event[]>([]);
  const [comingSoonEvents, setComingSoonEvents] = useState<Event[]>([]);

  const dispatch = useAppDispatch();

  const allEvents = useAppSelector((state) => {
    return state.ticketing.events;
  });

  useEffect(() => {
    void dispatch(fetchTicketingData());
  }, []);

  useEffect(() => {
    const todaysDate = new Date();
    const tempNowPlayingEvents: Event[] = [];
    const tempComingSoonEvents: Event[] = [];

    allEvents.forEach((event) => {
      if (new Date(event.startDate) < todaysDate) {
        tempNowPlayingEvents.unshift(event);
      } else {
        tempComingSoonEvents.unshift(event);
      }
    });

    setNowPlayingEvents(tempNowPlayingEvents);
    setComingSoonEvents(tempComingSoonEvents);
  }, [allEvents]);

  return (
    <div className='w-full'>
      <div className='w-full bg-zinc-100 overflow-y-hidden overflow-x-hidden bg-fixed justify-between bg-cover bg-hero bg-brightness-50'>
        <div className='w-full bg-gradient-to-r from-black'>
          <div className='max-w-[450px] md:max-w-[1200px] py-[12em] mx-auto flex flex-col gap-16'>
            <h1 className='font-black text-zinc-100 text-6xl md:text-8xl mx-auto drop-shadow-lg py-12'>Events</h1>
            {nowPlayingEvents.length && (
              <EventSection title='Now Playing' events={nowPlayingEvents} />
            )}
            {comingSoonEvents.length && (
              <EventSection title='Coming Soon' events={comingSoonEvents} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
