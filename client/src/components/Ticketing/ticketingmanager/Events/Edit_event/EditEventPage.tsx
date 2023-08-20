/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import React, {useState, useEffect} from 'react';
import EventForm from '../EventForm';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../app/hooks';
import {openSnackbar} from '../../snackbarSlice';
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';
import {WtixEvent} from '../../../../../interfaces/showing.interface';

/**
 * Maps edit data to the event props
 *
 * @param {WtixEvent} initValues
 */
interface mapDataToEditEventProps {
  initValues: WtixEvent;
}

/**
 * Displays the main edit page of an event to change event name
 * description, image, and option to add/remove showings
 *
 * @module
 * @param {mapDataToEditEventProps} initValues
 * @param params - useParams()
 * @param nav - useNavigate()
 * @param dispatch - useAppDispatch()
 * @param {number} tickettypes, setTicketTypes - useState([])
 * @param getAccessTokenSilently - useAuth0()
 * @returns {ReactElement}
 */
const EditEventPage = ({initValues}: mapDataToEditEventProps) => {
  if (initValues.eventid == null) {
    throw new TypeError('eventid must be set');
  }
  const [tickettypes, setTicketTypes] = useState([]);
  const {getAccessTokenSilently} = useAuth0();

  const params = useParams();
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const fetchTicketTypes = async () => {
    const res = await fetch(
      process.env.REACT_APP_API_1_URL + '/tickets/validTypes',
    );
    setTicketTypes(await res.json());
  };

  const toggleEventOff = async (eventData: WtixEvent) => {
    console.log('inside toggle event off');
    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_ROOT_URL,
        scope: 'admin',
      });

      const modifiedEvent: WtixEvent = {
        ...eventData,
        active: false,
      };

      const res = await fetch(process.env.REACT_APP_API_1_URL + `/events/`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(modifiedEvent),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (updatedData: WtixEvent) => {
    console.log('onSubmit called for edit event');
    console.log(updatedData);
    const showings = updatedData.showings.map((show) => show.eventinstanceid);
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_ROOT_URL,
      scope: 'admin',
    });

    // Updates the event data (everything before showings)
    const res = await fetch(process.env.REACT_APP_API_1_URL + `/events/`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    await fetch(
      process.env.REACT_APP_API_1_URL + `/events/instances/${params.eventid}`,
      {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData.showings),
      },
    );

    if (res.ok) {
      const results = await res.json();
      console.log(results);
      dispatch(
        openSnackbar(`Saved edit to ${initValues.eventname ?? 'event'}`),
      );
    } else {
      dispatch(openSnackbar('Save failed'));
    }
    nav('/ticketing/showings');
  };

  useEffect(() => {
    fetchTicketTypes();
  }, []);

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <h1 className='font-bold text-5xl mb-10 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500'>
          Edit {initValues.eventname ?? 'Your Event'}
        </h1>
        <EventForm
          tickettypes={tickettypes}
          onSubmit={onSubmit}
          initialValues={initValues}
        />
      </div>
    </div>
  );
};

export default EditEventPage;
