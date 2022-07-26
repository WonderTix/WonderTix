/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {ListComponent} from './eventcard';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {fetchTicketingData} from '../ticketingmanager/ticketing/ticketingSlice';
const Hero = () => {
  const allEvents = useAppSelector((state) => state.ticketing.events);
  const dispatch = useAppDispatch();

  const getData = async () => {
    return dispatch(fetchTicketingData());
  };

  useEffect(()=>{
    getData();
  }, []);
  return (

    <div className = 'home w-full h-screen ' >
      <div className=' w-full h-screen bg-zinc-100
       overflow-y-hidden overflow-x-hidden sm:bg-scroll
        justify-between md:bg-fixed bg-cover bg-hero bg-brightness-50' >
        <div className='flex flex-row md:flex-row sm:flex-col
         sm:items-center w-full h-full bg-gradient-to-r from-black'>
          <div className='max-w-[1240px] md:pl-40 flex flex-row
            text-center  text-white m-auto '>
            <div className = 'flex flex-col justify-center md:items-center w-full px-2 py8 md:mt-auto sm:mt-40 sm:mb-10'>
              <h1 className=' py-3 text-5xl md:text-7xl font-bold hover:text-indigo-600'>Events</h1>
              <div className='flex flex-col my-2'>
                <label className=' hover:text-indigo-600 text-gray-200 rounded-full py-2 px-10 my-1'>Pick a Date</label>
                <input className='bg-zinc-300 text-gray-600 text-center border content-center rounded-xl py-2 px-4' type="date" />
              </div>

            </div>

          </div>
          <div className=' m-auto  rounded-xl overflow-x-scroll  scroll-smooth   '>
            <div className='flex flex-row md:flex-row sm:flex-col '>
              <div className='flex flex-row md:flex-row sm:flex-col gap-7 py-6'>
                {allEvents.map((event) => <ListComponent key={event.id} {...event} />)
                }
              </div>
            </div>


          </div>
        </div>
      </div>


    </div>
  );
};

export default Hero;
