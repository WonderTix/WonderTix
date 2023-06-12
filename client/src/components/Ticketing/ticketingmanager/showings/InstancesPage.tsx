/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
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
import {useEffect} from 'react';
import {titleCase} from '../../../../utils/arrays';
import {fetchTicketingData} from '../ticketing/ticketingSlice';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';

/**
 * Uses dispatch, navigate, allEvents, and getData
 *
 * @module
 * @returns {ReactElements} and dispatch(fetchTicketingData())
 */
const InstancesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const allEvents = useAppSelector((state) => state.ticketing.events);
  const getData = async () => {
    return dispatch(fetchTicketingData());
  };

  useEffect(()=>{
    getData();
  }, []);

  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem] h-full'>
        <h1 className='font-bold text-5xl bg-clip-text
           text-transparent bg-gradient-to-r from-sky-500
            to-indigo-500 mb-14' >Select Event</h1>
        <ul className='md:grid md:grid-cols-2 md:gap-8 sm:grid sm:grid-cols-1 sm:gap-4 mt-9'>
          {allEvents.map((eventss) => (
            <div key={eventss.id}>
              <button onClick={() => navigate(`/ticketing/showings/${eventss.id}`)}
                className="shadow-xl rounded-xl hover:scale-105  transition duration-300 ease-in-out w-full" style={{backgroundImage: `url(${eventss.image_url})`}}>
                <div className=' backdrop-blur-sm  md:flex-row sm:flex-col
         sm:items-center w-full rounded-xl  bg-zinc-900/70 h-full'>
                  <div className='flex flex-col overflow-clip'>
                    <div className='w-full h-40'>
                      <img className='object-cover h-full w-full rounded-t-xl' src={eventss.image_url}/>
                    </div>
                    <div className='text-white p-9 flex flex-col items-start '>
                      <div className='text-xl font-bold'>
                        {titleCase(eventss.title)}
                      </div>
                      <div className='text-md font-semibold '>
                        Description
                      </div>
                      <div className='text-sm text-start'>
                        {eventss.description}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default InstancesPage;
