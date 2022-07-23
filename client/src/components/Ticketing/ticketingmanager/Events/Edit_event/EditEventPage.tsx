/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
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
import {useState, useEffect} from 'react';
import EventForm, {NewEventData} from '../EventForm';
import {Typography} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import {selectEventData, EventPageData, fetchTicketingData} from '../../ticketing/ticketingSlice';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {diff} from 'deep-diff';
import {fetchEventInstanceData} from '../events_pages/eventsSlice';
import {openSnackbar} from '../../snackbarSlice';


const formatToEventFormData = (data: EventPageData): Partial<NewEventData> => ({
  eventName: data.title,
  eventDesc: data.description,
  imageUrl: data.image_url,
  showings: data.tickets.map((t) => ({
    id: t.event_instance_id,
    DateTime: t.date,
    totalseats: t.totalseats ?? 0,
    ticketTypeId: '0',
  })),
});
type EditEventPageProps = {eventid: string}
const EditEventPage = () => {
  const dispatch = useAppDispatch();
  const {eventid} = useParams<EditEventPageProps>();
  const [ticketTypes, setTicketTypes] = useState([]);

  const playData = useAppSelector((state) => selectEventData(state, eventid));
  const initValues = playData ? formatToEventFormData(playData) : undefined;

  const fetchTicketTypes = async () => {
    const res = await fetch('http://localhost:8000/api/tickets/types');
    setTicketTypes(await res.json());
  };
  useEffect(() => {
    fetchTicketTypes();
  }, []);

  const onSubmit = async (updatedData: NewEventData) => {
    const deltas = diff(initValues, updatedData);

    const res = await fetch('http://localhost:8000/api/events', {
      credentials: 'include',
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({eventid, deltas}),
    });

    if (res.ok) {
      const results = await res.json();
      console.log(results);
      dispatch(fetchTicketingData());
      dispatch(fetchEventInstanceData());
      dispatch(openSnackbar(`Saved edit to ${playData?.title ?? 'event'}`));
    } else {
      dispatch(openSnackbar('Save failed'));
    }
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
     sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <h1 className='font-bold text-5xl mb-14 bg-clip-text text-transparent
         bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 ' >
          Edit {playData?.title ?? 'Your Event'}
        </h1>
        <EventForm
          ticketTypes={ticketTypes}
          onSubmit={onSubmit}
          initialValues={initValues}
          editMode
        />
      </div>
    </div>
  );
};

export default EditEventPage;


