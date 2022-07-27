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
            <button onClick={() => navigate('/')} className='bg-blue-500 hover:bg-blue-600 px-3 py-1 text-white mb-3 rounded-xl'>back to Events</button>
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

