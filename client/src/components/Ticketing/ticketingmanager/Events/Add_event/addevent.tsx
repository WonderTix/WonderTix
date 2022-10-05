/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/

import React, {useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';

/**
 * Used to help create events
 * @module
 * @returns {ReactElement} and other event changes
 */
export default function CreateEvents() {
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventTickets, setEventTickets] = useState(0);
  const eventDate = new Date(); // Use React datetime??
  const eventTime = useState(eventDate.getTime()); // Use React datetime??
  const {getAccessTokenSilently} = useAuth0();

  const eventCreate = async () => {
    const data = {
      eventName: eventName,
      eventDesc: eventDesc,
      eventTickets: eventTickets,
      eventDate: eventDate,
      eventTime: eventTime,
    };

    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });

    const req = await fetch(process.env.REACT_APP_ROOT_URL + '/api/events', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return req.json();
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem] '>
        <h1 className='font-bold text-5xl mb-14 bg-clip-text text-transparent
         bg-gradient-to-r from-violet-500 to-fuchsia-500   ' >Add New Event</h1>

        <div className='bg-white p-7 rounded-xl shadow-lg'>
          <h3 className='text-sm text-zinc-600 mb-1'>Enter Event Name</h3>
          <input
            type="input"
            id="Event"
            className='w-full p-2 rounded-lg border border-zinc-300 mb-7'
            placeholder='Event Name'
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setEventName(ev.target.value)
            }
          />
          <h3 className='text-sm text-zinc-600 mb-1'>Enter Short Event Description</h3>
          <input
            type="input"
            id="EventDescription"
            className='w-full p-2 rounded-lg border border-zinc-300 mb-7'
            placeholder='Event Description'
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setEventDesc(ev.target.value)
            }
          />
          <h3 className='text-sm text-zinc-600 mb-1'>Upload Image for Event</h3>
          <div className='mb-7'>
            <div className="mt-1 flex justify-center
                       px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed
                        rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12
                           text-gray-400" stroke="currentColor"
                fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0
                             0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8
                              32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only"/>
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-10">
            <div>
              <h3 className='text-sm text-zinc-600 mb-1'>Enter Date</h3>
              <input type="date" id="eventDate" className='w-full p-2 rounded-lg border border-zinc-300 mb-7 '/>
            </div>
            <div >
              <h3 className='text-sm text-zinc-600 mb-1'>Enter time</h3>
              <input type="time" id="eventtime" className='w-full p-2 rounded-lg border border-zinc-300 mb-7 '/>
            </div>
          </div>
          <h3 className='text-sm text-zinc-600 mb-1'>Enter Number of Tickets Available</h3>
          <input
            type="input"
            id="NumTicketsAvailable"
            className='w-full p-2 rounded-lg border border-zinc-300 mb-7'
            placeholder='Number of Tickets Available'
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setEventTickets(parseInt(ev.target.value, 10))
            }
          />
          <button className='bg-blue-600 text-white px-5 py-2 mb-7
            rounded-xl shadow-xl hover:scale-105 duration-300
             hover:bg-blue-800' type="submit" onClick={eventCreate}>Submit</button>
          <h3 className='text-sm text-zinc-600 mb-3 '>To Delete An Event click the Link Below</h3>
          <a className='bg-zinc-800 text-white px-5 py-3
            rounded-xl shadow-xl hover:scale-105 duration-300
             hover:bg-zinc-700' href="/admin/DeleteEvents">Event Deletion</a>
        </div>
      </div>
    </div>
  );
}
