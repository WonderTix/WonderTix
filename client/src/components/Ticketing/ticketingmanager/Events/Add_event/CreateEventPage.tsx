/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import React, {useEffect, useState} from 'react';
import EventForm from '../EventForm';
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';
import PopUp from '../../../Pop-up';
import {Showing, WtixEvent} from '../../../../../interfaces/showing.interface';

let id = 0;

const formatShowingData = (eventid_fk: number) => (data: Showing) => {
  const {eventtime, eventdate, totalseats, ticketTypeId, seatsForType} = data;
  return {eventid_fk, eventdate, eventtime, totalseats, ticketTypeId, seatsForType};
};

/**
 * Creates event page
 *
 * @returns {ReactElement} and all data, or console error, EventForm and PopUp
 */
const CreateEventPage = () => {
  const [tickettypes, setTicketTypes] = useState([]);
  const [visible, setVisible] = useState(false);
  const {getAccessTokenSilently} = useAuth0();
  const nav = useNavigate();
  const fetchTicketTypes = async () => {
    const res = await fetch(process.env.REACT_APP_API_1_URL + '/tickets/validTypes');
    setTicketTypes(await res.json());
  };

  useEffect(() => {
    fetchTicketTypes();
  }, []);

  // TODO: create endpoint that combines /api/create-event & /api/create-showings
  const onSubmit = async (formData: WtixEvent) => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_ROOT_URL,
      scope: 'admin',
    });
    const {imageurl, eventname, eventdescription, showings} = formData;
    const seasonid_fk = 7;

    const createPlayRes = await fetch(process.env.REACT_APP_API_1_URL + '/events', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({seasonid_fk, eventname, eventdescription, imageurl}),
    });

    if (createPlayRes.ok) {
      const eventData = await createPlayRes.json();
      id = eventData.data[0].eventid;
      const showingdata = showings.map(formatShowingData(id));
      console.log(showingdata);
      const postShowings = await fetch(process.env.REACT_APP_API_1_URL + '/events/instances', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({instances: showingdata}),
      });
      // update Redux state with new event & available tickets
      if (postShowings.ok) {
        setVisible(true);
      }
    } else {
      console.error('New event creation failed', createPlayRes.statusText);
    }
  };

  const handleClose = () => {
    setVisible(false);
    nav(`/ticketing/editevent/${id}`);
  };

  const handleProceed = () => {
    setVisible(false);
    nav('/ticketing/showings');
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[18rem] md:mr-[5rem] sm:mt-40 sm:mt-[11rem] sm:mr-[2rem] sm:ml-[2rem] sm:mb-[11rem]'>
        {visible == true ?
        <PopUp title="Success" message='New event has been successfully added.' handleClose={handleClose} handleProceed={handleProceed} success={true}/> :
         <></> }
        <h1 className='font-bold text-5xl mb-10 pb-4 bg-clip-text text-transparent
         bg-gradient-to-r from-violet-500 to-fuchsia-500'>Add New Event</h1>
        <EventForm onSubmit={onSubmit} tickettypes={tickettypes}/>
      </div>
    </div>
  );
};

export default CreateEventPage;
