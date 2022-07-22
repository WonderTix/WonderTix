/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable semi */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {Button, Typography} from '@material-ui/core'
import {useState} from 'react'
import {Backdrop, Modal, Paper} from '@material-ui/core';
import {DataGrid} from '@mui/x-data-grid';
import {useNavigate} from 'react-router'
import {useAppSelector, useAppDispatch} from '../../../app/hooks'
import {fetchEventInstanceData} from '../events_pages/eventsSlice';
import {selectPlaysData, fetchTicketingData} from '../../ticketing/ticketingSlice'
import {openSnackbar} from '../../snackbarSlice';

export default function ManageEventsPage() {
  const history = useNavigate()
  const dispatch = useAppDispatch()
  const eventsData = useAppSelector(selectPlaysData)

  const [modalOpen, setModalOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<string|null>()

  const onEditClick = (id: number|string) => {
    history(`/admin/EditEvent/${id}`)
  }

  const onDeleteClick = (id: string) => {
    setModalOpen(true)
    setEventToDelete(id)
  }

  const onCancelDelete = () => {
    setEventToDelete(null)
    setModalOpen(false)
  }

  const deleteEvent = async () => {
    setModalOpen(false)
    const res = await fetch('/api/delete-event', {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: eventToDelete}),
    });
    if (res.ok) {
      dispatch(openSnackbar('Deleted Event'))
      dispatch(fetchTicketingData())
      dispatch(fetchEventInstanceData())
    } else {
      console.error(res.status, res.statusText)
    }
  }

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
  ]

  return (
    <div >
      <Typography component='h1' variant='h4'>
                Manage Events
      </Typography>

      <DataGrid autoHeight columns={columns} rows={eventsData} pageSize={10} />

      <Button
        onClick={() => history('/admin/CreateEvents')}
        variant='contained'
        color='primary'
      >
                Create New Event
      </Button>

      <Modal
        open={modalOpen}
        onClose={onCancelDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}
      >
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
      </Modal>
    </div>
  )
}

