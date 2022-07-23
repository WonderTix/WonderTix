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
import {Button, Typography} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {Backdrop, Fade, Modal, Paper} from '@material-ui/core';
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

  const [modalOpen, setModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string|null>();

  const onEditClick = (id: number|string) => {
    history(`/ticketing/editevent/${id}`);
  };

  const onDeleteClick = (id: string) => {
    setModalOpen(true);
    setEventToDelete(id);
  };

  const onCancelDelete = () => {
    setEventToDelete(null);
    setModalOpen(false);
  };
  const getData = async () => {
    return dispatch(fetchTicketingData());
  };

  useEffect(()=>{
    getData();
  }, []);

  const deleteEvent = async () => {
    setModalOpen(false);
    const res = await fetch('http://localhost:8000/api/delete-event', {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: eventToDelete}),
    });
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
      <Button variant="contained" color="secondary" onClick={() => onEditClick(params.row.id)}>Edit</Button>
    )},
    {field: 'Delete', headerName: 'Delete', width: 150, renderCell: (params: any) => (
      <Button variant="contained" color="secondary" onClick={() => onDeleteClick(params.row.id)}>Delete</Button>
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

        <Modal
          open={modalOpen}
          onClose={onCancelDelete}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{timeout: 500}}
        >
          <Fade in={modalOpen}>
            <Paper>
              <Typography>Are you sure you want to delete this?</Typography>
              <div>
                <Button variant='outlined' onClick={() => deleteEvent()}>
                                Yes
                </Button>
                <Button variant='contained' onClick={onCancelDelete}>
                                No, Cancel
                </Button>
              </div>
            </Paper>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

