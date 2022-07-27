/* eslint-disable max-len */
/* eslint-disable camelcase */


import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {useParams} from 'react-router-dom';
import {titleCase} from '../../../utils/arrays';
import {selectEventData} from '../ticketingmanager/ticketing/ticketingSlice';
import {fetchTicketingData} from '../ticketingmanager/ticketing/ticketingSlice';
import TicketPicker from './TicketPicker';
import {useNavigate} from 'react-router-dom';


type EventPageProps = {eventid: string}
const Eventshowings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    return dispatch(fetchTicketingData());
  };

  useEffect(()=>{
    getData();
  }, []);

  const {eventid} = useParams<EventPageProps>();
  const eventData = useAppSelector((state) => selectEventData(state, eventid));
  if (eventData === undefined) return <p>Whoops! Event not found</p>;
  const {title, description, image_url, tickets} = eventData;
  return (
    <div className = 'home w-full h-screen  ' >
      <div className=' w-full h-screen bg-zinc-100
      overflow-y-hidden overflow-x-hidden bg-scroll
        justify-between bg-cover bg-brightness-40'
      style={{backgroundImage: `url(${image_url})`}} >
        <div className='flex flex-col md:flex-col sm:flex-col
         sm:items-center w-full h-full bg-zinc-900/90 p-40 overflow-y-scroll'>
          <div className='w-full flex flex-row mb-5'>
            <button onClick={() => navigate('/')} className='bg-blue-500 hover:bg-blue-600 px-3 py-2 mb-3 rounded-xl flex flex-row items-center text-zinc-100'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              back to Events</button>
          </div>
          <div>
            <div className='bg-zinc-700/30 p-9 flex flex-col items-center rounded-xl'>
              <div className='flex md:flex-row sm:flex-col'>
                <img src={image_url} className='w-full h-full rounded-xl mr-12'></img>
                <div className='items-center'>
                  <div className='text-white text-4xl font-bold mt-6'>
                    {titleCase(title)}</div>
                  <h1 className='text-zinc-200 font-semibold text-xl mt-6'>Event description</h1>
                  <div className='text-zinc-100 pr-7'>{(description) ? description : ''}</div>
                </div>

              </div>
            </div>
            <div className='bg-zinc-700/30 p-9 flex flex-col items-center rounded-xl mt-9 w-full'>
              <TicketPicker tickets={tickets} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


export default Eventshowings;

