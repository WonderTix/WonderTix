/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {useEffect, ReactElement} from 'react';
import {titleCase} from '../../../../utils/arrays';
import {fetchTicketingData} from '../ticketing/ticketingSlice';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {
  EventImage,
  getImageDefault,
} from '../../../../utils/imageURLValidation';
import GroupToggle from '../../GroupToggle';

/**
 * Uses dispatch, navigate, allEvents, and getData
 *
 * @module
 * @returns {ReactElement} and dispatch(fetchTicketingData())
 */
const InstancesPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const allEvents = useAppSelector((state) => state.ticketing.events);
  const getData = async () => {
    return dispatch(fetchTicketingData());
  };

  useEffect(() => {
    getData();
  }, []);

  /**
   * Based on active/inactive/all
   *
   * @param event
   */
  const handleEventChange = (event) => {
    // TODO: handle the event type change when active/inactive is properly implemented
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
        <div className='flex flex-col tab:flex-row tab:justify-between tab:items-center gap-10 tab:gap-1 w-full mb-6 tab:mb-14'>
          <h1
            className='col-span-2 min-[678px]:col-span-1 font-bold text-5xl bg-clip-text
            text-transparent bg-gradient-to-r from-sky-500 to-indigo-500'
          >
            Select Event
          </h1>
          <button
            onClick={() => navigate(`/ticketing/showings/0`)}
            className='bg-green-500 hover:bg-green-700 h-fit disabled:bg-gray-500 text-white p-2 rounded-xl flex justify-center align-center gap-1'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='3'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v12m6-6H6'
              />
            </svg>
            Add Event
          </button>
        </div>
        <div className='mb-6'>
          <GroupToggle/>
        </div>
        <ul className='md:grid md:grid-cols-2 md:gap-8 grid grid-cols-1 gap-4 mt-9'>
          {allEvents.map((event) => (
            <li key={event.id}>
              <button
                onClick={() => navigate(`/ticketing/showings/${event.id}`)}
                className='shadow-xl rounded-xl hover:scale-105  transition duration-300 ease-in-out w-full'
                style={{
                  backgroundImage: `url(${getImageDefault(
                    event.imageurl,
                  )}),url(${getImageDefault()})`,
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
                        title={event.title}
                      />
                    </div>
                    <div className='text-white p-9 flex flex-col items-start'>
                      <div className='text-xl font-bold'>
                        {titleCase(event.title)}
                      </div>
                      <div className='text-md font-semibold'>Description</div>
                      <div className='text-sm text-start'>
                        {event.description}
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

export default InstancesPage;
