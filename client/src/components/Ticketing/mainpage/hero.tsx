import React, {useEffect, useRef} from 'react';
import {ListComponent} from './eventcard';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {fetchTicketingData} from '../ticketingmanager/ticketing/ticketingSlice';

/**
 * Events page
 *
 * @returns {ReactElement} state.event.ticketing also returned
 */
const Hero = () => {
  const allEvents = useAppSelector((state) => {
    console.log('State:', state.ticketing);
    return state.ticketing.events;
  });
  const dispatch = useAppDispatch();

  const ref = useRef(null);

  useEffect(()=>{
    dispatch(fetchTicketingData());
  }, []);

  const handlePrevious = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -640,
      });
    }
  };

  const handleNext = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 640,
      });
    }
  };
  return (
    <div className='home w-full h-screen'>
      <div className='w-full h-screen bg-zinc-100 overflow-y-hidden overflow-x-hidden bg-scroll
        justify-between md:bg-fixed bg-cover bg-hero bg-brightness-50'>
        <div className='flex flex-col md:flex-row
         items-center w-full h-full bg-gradient-to-r from-black'>
          <div className='max-w-[1240px] md:pl-40 flex flex-row
            text-center text-white m-auto'>
            <div className='flex flex-col justify-center md:items-center w-full px-2 py8 md:mr-40 md:mt-auto mt-40 mb-10'>
              <h1 className='text-5xl md:text-7xl font-bold'>Events</h1>
              <div className='flex flex-col my-2'>
                <label className='text-zinc-200/60 px-10 my-1'>Pick an Event</label>
              </div>
            </div>
          </div>
          <button onClick={handlePrevious} className='mx-4 hidden md:inline-block text-white hover:text-slate-50/50 hover:scale-125 transition-all'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
          </button>
          <div className='m-auto rounded-xl overflow-x-auto overflow-y-auto scroll-smooth' ref={ref}>
            <div className='flex flex-col md:flex-row'>
              <div className='flex flex-col md:flex-row gap-7 py-6'>
                {
                  allEvents.map((event) => <ListComponent key={event.id} {...event} />)
                }
              </div>
            </div>
          </div>
          <button onClick={handleNext} className='mx-4 hidden md:inline-block text-white hover:text-slate-50/50 hover:scale-125 transition-all'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
