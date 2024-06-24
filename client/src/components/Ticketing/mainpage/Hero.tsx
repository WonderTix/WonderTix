import React, {ReactElement, useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {fetchTicketingData} from '../ticketingmanager/ticketingSlice';
import EventSection from './EventSection';
import {Event} from '../ticketingmanager/ticketingSlice';

/**
 * The section of the home page that contains events for which tickets are
 * purchaseable.
 *
 * @returns {ReactElement} Hero
 */
const Hero = (): ReactElement => {
  const [nowPlayingEvents, setNowPlayingEvents] = useState<Event[]>([]);
  const [comingSoonEvents, setComingSoonEvents] = useState<Event[]>([]);

  const allEvents = useAppSelector((state) => {
    return state.ticketing.events;
  });
  const loadStatus = useAppSelector((state) => {
    return state.ticketing.status;
  });
  const dispatch = useAppDispatch();

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
    <main className='w-full bg-fixed bg-cover bg-hero'>
      <div className='w-full bg-gradient-to-r from-black'>
        <section className='flex flex-col gap-16 max-w-[450px] md:max-w-[1200px] min-h-screen py-[11em] md:py-[12em] mx-auto'>
          <h1 className='font-black text-zinc-100 text-6xl md:text-8xl mx-auto drop-shadow-lg pb-4 md:py-12'>
            Events
          </h1>
          {nowPlayingEvents.length !== 0 && (
            <EventSection title='Now Playing' events={nowPlayingEvents} />
          )}
          {comingSoonEvents.length !== 0 && (
            <EventSection title='Coming Soon' events={comingSoonEvents} />
          )}
          {!['idle', 'loading'].includes(loadStatus) && allEvents.length === 0 && (
            <p className='text-zinc-200 text-xl mx-auto text-center font-semibold rounded-xl bg-zinc-800/70 backdrop-blur-md shadow-lg py-3 px-5'>
              No upcoming events.
              <br />
              Check back soon
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Hero;
