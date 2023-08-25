import React, {useState} from 'react';
import {EventGeneralForm} from './EventGeneralForm';
import {useEvent} from './EventProvider';
import {useNavigate} from 'react-router';
import {createDeleteFunction, createSubmitFunction} from './ShowingUtils';
import {EventGeneralView} from './EventGeneralView';

export const EventGeneralContainer = () => {
  const {eventID, setEventID, token, setEventData, setPopUpProps, setEditing} =
    useEvent();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(!eventID);

  const onUpdateSuccess = async (newEvent) => {
    try {
      const res = await newEvent.json();
      setEventData(res.data[0]);
      setEventID(res.data[0].eventid);
      setEdit((edit) => !edit);
      setEditing((edit) => !edit);
      setPopUpProps(`Success`, 'Event update successful', true);
    } catch (error) {
      console.log('error updating event');
    }
  };

  const onCreateSuccess = async (newEvent) => {
    try {
      const res = await newEvent.json();
      navigate(`/ticketing/showings/v2/${res.data[0].eventid}`);
      setEventData(res.data[0]);
      setEventID(res.data[0].eventid);
      setEdit((edit) => !edit);
      setEditing((edit) => !edit);
      setPopUpProps(`Success`, 'Event creation successful', true);
    } catch (error) {
      console.log('error updating event after creation');
    }
  };
  const onSubmitError = async (event) => {
    try {
      const res = await event.json();
      setPopUpProps(`Failure`, res.error, false);
    } catch (error) {
      setPopUpProps(`Failure`, 'Event update failed', false);
    }
  };
  const onDeleteSuccess = async () => {
    navigate(`/ticketing/showings`);
  };

  const onDeleteError = async (event) => {
    try {
      const res = await event.json();
      setPopUpProps(`Failure`, res.error, false);
    } catch (error) {
      setPopUpProps(`Failure`, 'Event cannot be marked inactive', false);
    }
  };

  const onSubmit = createSubmitFunction(
    eventID === 0 ? 'POST' : 'PUT',
    `${process.env.REACT_APP_API_1_URL}/events`,
    token,
    eventID ? onUpdateSuccess : onCreateSuccess,
    onSubmitError,
  );

  const onDelete = createDeleteFunction(
    'DELETE',
    `${process.env.REACT_APP_API_2_URL}/event/${eventID}`,
    token,
    onDeleteSuccess,
    onDeleteError,
  );

  return (
    <div className={'bg-white flex flex-col  p-6 rounded-xl shadow-xl'}>
      <h2 className={'text-center text-3xl font-semibold mb-5 text-zinc-800'}>
        {eventID ? 'Event Information' : 'Add Event'}
      </h2>
      {edit ? (
        <EventGeneralForm
          onSubmit={onSubmit}
          onDelete={onDelete}
          onLeaveEdit={() => {
            setEdit((edit) => !edit);
            setEditing((edit) => !edit);
          }}
        />
      ) : (
        <EventGeneralView setEdit={setEdit} />
      )}
    </div>
  );
};
