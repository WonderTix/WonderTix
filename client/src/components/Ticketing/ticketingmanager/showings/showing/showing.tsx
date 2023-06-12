/* eslint-disable camelcase */
/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {titleCase} from '../../../../../utils/arrays';
import {selectEventData} from '../../../ticketingmanager/ticketing/ticketingSlice';
import {fetchTicketingData} from '../../../ticketingmanager/ticketing/ticketingSlice';
import {useNavigate} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import format from 'date-fns/format';
import {openSnackbar} from '../../snackbarSlice';
import {fetchEventInstanceData} from '../../Events/events_pages/eventsSlice';
import {useAuth0} from '@auth0/auth0-react';

/**
 * @param {string} eventid - EventPageProps uses this
 */
type EventPageProps = {eventid: string}

/**
 * Displays the data of the showing, uses dispatch, navigate, eventToDelete, setEventToDelete, show, setShow, getAccessTokenSilently,
 * handleClick2, onEditClick, onDeleteClick, onCancelDelete, getData, deleteEvent
 *
 * @module
 * @returns HTMLElements
 */
const Showing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [eventToDelete, setEventToDelete] = useState<string|null>();
  const [show, setShow] = useState(false);
  const {getAccessTokenSilently} = useAuth0();
  const handleClick2 = () => setShow(!show);
  const onEditClick = (id: number|string) => {
    navigate(`/ticketing/editevent/${id}`);
  };
  const onDeleteClick = (id: string) => {
    handleClick2();
    setEventToDelete(id);
  };

  const onCancelDelete = () => {
    setEventToDelete(null);
    handleClick2();
  };
  const getData = async () => {
    return dispatch(fetchTicketingData());
  };

  const deleteEvent = async () => {
    handleClick2();
    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });
    const res = await fetch(process.env.REACT_APP_API_1_URL + `/events/${eventToDelete}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
    );
    if (res.ok) {
      dispatch(openSnackbar('Deleted Event'));
      dispatch(fetchTicketingData());
      dispatch(fetchEventInstanceData());
    } else {
      console.error(res.status, res.statusText);
    }
    navigate(`/ticketing/showings`);
  };

  useEffect(()=>{
    getData();
  }, []);
  const {eventid} = useParams<EventPageProps>();
  const eventData = useAppSelector((state) => selectEventData(state, eventid));
  if (eventData === undefined) return <p>Whoops! Event not found</p>;
  const {title, description, image_url, tickets} = eventData;
  return (
    <div className='w-full h-screen overflow-x-hidden absolute bg-cover' style={{backgroundImage: `url(${image_url})`}}>
      <div className='backdrop-blur-sm h-screen overflow-x-hidden w-full absolute bg-zinc-900/70'>
        <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
          <div className='text-white text-4xl font-bold mt-6'>
            {titleCase(title)}</div>
          <h1 className='text-zinc-200 font-semibold text-xl mt-6'>Event description</h1>
          <div className='text-zinc-100 pr-7 mb-9'>{(description) ? description : ''}</div>
          <h1 className='text-zinc-200 font-semibold mb-4 text-xl mt-6'>Event Showings</h1>
          <div className='grid grid-cols-2 gap-6'>
            {tickets.map((showing) => (
              <div key={showing.event_instance_id}>
                <div className='bg-zinc-900/60 text-zinc-100 p-7
                flex flex-row rounded-xl gap-1 justify-between'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='text-sm text-zinc-300'>Showing Id: </div>
                      <div className='font-semibold '>
                        {showing.event_instance_id}
                      </div>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='text-sm text-zinc-300'>Event date: </div>
                      <div className='font-semibold '>
                        {format(new Date(showing.date), 'eee, MMM dd yyyy')}
                      </div>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='text-sm text-zinc-300'>Event time: </div>
                      <div className='font-semibold '>
                        {format(new Date(showing.date), 'hh:mm a')}
                      </div>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='text-sm text-zinc-300'>Ticket price: </div>
                      <div className='font-semibold '>
                        ${showing.ticket_price}
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='text-sm text-zinc-300'>Admission type: </div>
                      <div className='font-semibold '>
                        {showing.admission_type}
                      </div>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='text-sm text-zinc-300'>Concession price: </div>
                      <div className='font-semibold '>
                        ${showing.concession_price}
                      </div>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='text-sm text-zinc-300'>Total seats: </div>
                      <div className='font-semibold '>
                        {showing.totalseats}
                      </div>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='text-sm text-zinc-300'>Available seats: </div>
                      <div className='font-semibold '>
                        {showing.availableseats}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
            )}
          </div>
          <div className='flex flex-row mt-9 gap-5'>
            <button className='px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 ' onClick={() => onEditClick(eventid)}>Edit Event</button>
            <button className='px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 ' onClick={() => onDeleteClick(eventid)}>Delete Event</button>
          </div>
        </div>
      </div>

      <div className={!show ? 'hidden': 'fixed w-full h-screen overflow-x-hidden z-10 bg-gray-500 bg-opacity-75 transition-opacity'} aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Delete </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure you want to delete this?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={() => deleteEvent()} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent
                shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                  sm:ml-3 sm:w-auto sm:text-sm">Yes</button>
                <button onClick={onCancelDelete} type="button" className="mt-3 w-full inline-flex
                justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base
                font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                  focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};


export default Showing;
