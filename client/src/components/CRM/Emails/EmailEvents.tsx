import React, {useEffect, useState, ReactElement} from 'react';
import {titleCase} from '../../../utils/arrays';
import {useNavigate} from 'react-router-dom';
import {
    EventImage,
    getEventImageDefault,
  } from '../../../utils/imageURLValidation';


const SelectEvent = (): ReactElement => {
  const navigate = useNavigate();
  const [eventsData, setEventsData]= useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_2_URL + '/events';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Sorting Descending
        setEventsData([...data.toSorted()].reverse());
      })
      .catch((error) => {
        console.error('Error Fetching Data:', error);
      });
  }, []);

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
        <div className='flex flex-col tab:flex-row tab:justify-between tab:items-center gap-10 tab:gap-1 w-full mb-6 tab:mb-14'>
          <h1
            className='col-span-2 min-[678px]:col-span-1 font-bold text-5xl bg-clip-text
            text-transparent bg-gradient-to-r from-cyan-500 to-blue-500'
          >
            Select Event
          </h1>
        </div>
        <ul className='md:grid md:grid-cols-2 md:gap-8 grid grid-cols-1 gap-4 mt-9'>
          {eventsData.map((event) => (
            <li key={event.eventid}>
              <button
                onClick={() => navigate(`/admin/emails/${event.eventid}`)}
                className='shadow-xl rounded-xl hover:scale-105  transition duration-300 ease-in-out w-full'
                style={{
                  backgroundImage: `url(${getEventImageDefault(
                    event.imageurl,
                  )}),url(${getEventImageDefault()})`,
                }}
              >
                <div
                  className='backdrop-blur-sm  md:flex-row flex-col items-center w-full rounded-xl  bg-zinc-900/70 h-full'
                >
                  <div className='flex flex-col overflow-clip'>
                    <div className='w-full h-40'>
                      <EventImage
                        className='object-cover h-full w-full rounded-t-xl'
                        src={event.imageurl}
                        title={event.eventname}
                      />
                    </div>
                    <div className='text-white p-9 flex flex-col items-start'>
                      <div className='text-xl font-bold'>
                        {titleCase(event.eventname)}
                      </div>
                      <div className='text-md font-semibold'>Description</div>
                      <div className='text-sm text-start'>
                        {event.eventdescription}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectEvent;
