/* eslint-disable react/no-unescaped-entities */
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

import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useNavigate} from 'react-router';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {fetchEventInstanceData} from './events_pages/eventsSlice';
import {selectPlaysData, fetchTicketingData} from '../ticketing/ticketingSlice';
import {openSnackbar} from '../snackbarSlice';

export default function ManageEventsPage() {
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const eventsData = useAppSelector(selectPlaysData);
  const [eventToDelete, setEventToDelete] = useState<string|null>();
  const [show, setShow] = useState(false);
  const handleClick2 = () => setShow(!show);
  const onEditClick = (id: number|string) => {
    history(`/ticketing/editevent/${id}`);
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

  useEffect(()=>{
    getData();
  }, []);

  const deleteEvent = async () => {
    handleClick2();
    const res = await fetch(process.env.REACT_APP_ROOT_URL + `/api/events/${eventToDelete}`, {method: 'DELETE'});
    if (res.ok) {
      dispatch(openSnackbar('Deleted Event'));
      dispatch(fetchTicketingData());
      dispatch(fetchEventInstanceData());
    } else {
      console.error(res.status, res.statusText);
    }
  };

  const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'eventname', headerName: 'Title', width: 200},
    {field: 'eventdescription', headerName: 'Description', width: 200},
    {field: 'numShows', headerName: 'No. Shows', width: 150},
    {field: 'Edit', headerName: 'Edit', width: 130, renderCell: (params: any) => (
      <button className='px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-800' onClick={() => onEditClick(params.row.id)}>Edit</button>
    )},
    {field: 'Delete', headerName: 'Delete', width: 150, renderCell: (params: any) => (
      <button className='px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-800' onClick={() => onDeleteClick(params.row.id)}>Delete</button>
    )},
  ];

  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <h1 className='font-bold text-5xl mb-14 bg-clip-text text-transparent
         bg-gradient-to-r from-cyan-500 to-blue-500   '>Manage Events</h1>
        <div className='bg-white p-3 rounded-xl mb-4 shadow-lg'>
          <DataGrid className='bg-white' autoHeight columns={columns} rows={eventsData} pageSize={10} />
        </div>
        <button
          className='px-3 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700'
          onClick={() => history('/ticketing/addevent')}
        >
            Create New Event
        </button>

        <div className={!show ? 'hidden': 'relative z-10'} aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
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
    </div>
  );
}

