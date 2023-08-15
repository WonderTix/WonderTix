import React, {useState} from 'react';
import {EventGeneralForm} from './EventGeneralForm';
import {Button} from '@mui/material';

import {useEvent} from './EventProvider';
import {openSnackbar} from '../../snackbarSlice';
import {useNavigate} from 'react-router';
import {createDeleteFunction, createSubmitFunction} from './ShowingUtils';
import {EventGeneralView} from './EventGeneralView';

export const EventGeneralContainer = () => {
  const {eventID, setEventID, token, setReloadEvent} = useEvent();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(!eventID);

  const onSuccess = async (newEvent) => {
    const res = await newEvent.json();
    setReloadEvent((reload) => !reload);
    setEventID(res.data[0].eventid);
    setEdit((edit)=>!edit);
    openSnackbar('Event Updated');
  };

  const onSubmitError = () => {
    openSnackbar('Error Creating Event');
  };
  const onDeleteSuccess= () => {
    openSnackbar(`Event Deleted`);
    navigate(`${process.env.ROOT_URL}/ticketing/showings`);
  };

  const onDeleteError = () => {
    openSnackbar(`Error Deleting Event`);
  };

  const onSubmit = createSubmitFunction(eventID === 0 ? 'POST' : 'PUT',
      `${process.env.REACT_APP_API_1_URL}/events`,
      token,
      onSuccess,
      onSubmitError,
  );

  const onDelete = createDeleteFunction('DELETE',
      `${process.env.REACT_APP_API_1_URL}/events/${eventID}`,
      token,
      onDeleteSuccess,
      onDeleteError,
  );
  return (
    <div
      className={'bg-zinc-900/60 p-7 ' +
        'rounded-xl shadow-xl h-[calc(.3*100vh)] p-3'}
    >
      <h2 className={'text-center pb-2 text-xl text-white'}>
        {eventID? 'Event Information' : 'Add Event'}
      </h2>
      <div className={'grid grid-cols-10 gap-3'}>
        <div className={`${edit?'col-span-10':'col-span-9'}`}>
          {edit ?
        <EventGeneralForm
          onSubmit={onSubmit}
          onDelete={onDelete}
        /> :
        <EventGeneralView />
          }
        </div>
        {!edit?
        <div className={'flex flex-col justify-center col-span-1'}>
          <Button
            color={'primary'}
            variant={'contained'}
            size={'large'}
            onClick={() => setEdit((edit) => !edit)}
          >
          Edit
          </Button>
        </div> :
        null
        }
      </div>
    </div>
  );
};
