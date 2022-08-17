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
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../app/hooks';
import {openSnackbar} from '../../snackbarSlice';
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';

interface mapDataToEditEventProps {
  initValues: NewEventData;
}


const EditEventPage = ({initValues}: mapDataToEditEventProps) => {
  const params = useParams();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [ticketTypes, setTicketTypes] = useState([]);
  const {getAccessTokenSilently} = useAuth0();
  useEffect(() => {
    fetchTicketTypes();
  }, []);

  const fetchTicketTypes = async () => {
    const res = await fetch(process.env.REACT_APP_ROOT_URL + '/api/tickets/types');
    setTicketTypes(await res.json());
  };

  const onSubmit = async (updatedData: NewEventData) => {
    const dataToSave = {
      id: params.eventid,
      eventname: updatedData.eventName,
      eventdescription: updatedData.eventDesc,
      active: updatedData.isPublished,
      image_url: updatedData.imageUrl,
      seasonid: updatedData.seasonID,
    };
    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });
    const res = await fetch(process.env.REACT_APP_ROOT_URL + `/api/events/`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSave),
    });

    const res2 = await fetch(process.env.REACT_APP_ROOT_URL + `/api/events/instances/${params.eventid}`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData.showings),
    });

    if (res.ok) {
      const results = await res.json();
      console.log(results);
      // dispatch(fetchTicketingData());
      dispatch(openSnackbar(`Saved edit to ${initValues.eventName ?? 'event'}`));
    } else {
      dispatch(openSnackbar('Save failed'));
    }
    nav('/ticketing/manageevent');
  };

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
     sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <h1 className='font-bold text-5xl mb-14 bg-clip-text text-transparent
         bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 ' >
          Edit {initValues.eventName ?? 'Your Event'}
        </h1>
        <EventForm
          ticketTypes={ticketTypes}
          onSubmit={onSubmit}
          initialValues={initValues}
        />
      </div>
    </div>
  );
};

export default EditEventPage;


