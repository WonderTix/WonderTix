import React, {useState} from 'react';
import {EventGeneralForm} from './EventGeneralForm';
import {useEvent} from './EventProvider';
import {useNavigate} from 'react-router';
import {createDeleteFunction, createSubmitFunction} from './ShowingUtils';
import {EventGeneralView} from './EventGeneralView';

export const EventGeneralContainer = () => {
  // eslint-disable-next-line max-len
  const {eventID, setEventID, token, setReloadEvent, setShowPopUp, setPopUpProps} = useEvent();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(!eventID);

  const onSubmitSuccess = async (newEvent) => {
    const res = await newEvent.json();
    console.log(newEvent);
    setEventID(res.data[0].eventid);
    setEdit((edit)=>!edit);
    setPopUpProps(`Success`, 'Event update successful', true);
    setShowPopUp(true);
    setReloadEvent((reload) => !reload);
  };

  const onSubmitError = (event) => {
    console.log(event);
    setPopUpProps(`Failure`, 'Event update failed', false);
    setShowPopUp(true);
  };
  const onDeleteSuccess= () => {
    navigate(`/ticketing/showings`);
  };

  const onDeleteError = (event) => {
    console.log(event);
    setPopUpProps(`Failure`, 'Event cannot be marked inactive', false);
    setShowPopUp(true);
  };

  const onSubmit = createSubmitFunction(eventID === 0 ? 'POST' : 'PUT',
      `${process.env.REACT_APP_API_1_URL}/events`,
      token,
      onSubmitSuccess,
      onSubmitError,
  );

  const onDelete = createDeleteFunction('DELETE',
      `${process.env.REACT_APP_API_2_URL}/event/${eventID}`,
      token,
      onDeleteSuccess,
      onDeleteError,
  );

  return (
    <div className={'bg-white flex flex-col  p-6 rounded-xl shadow-xl'}>
      <h2 className={'text-center text-3xl font-semibold mb-5 text-zinc-800'}>
        {eventID? 'Event Information' : 'Add Event'}
      </h2>
      {edit ?
        <EventGeneralForm
          onSubmit={onSubmit}
          onDelete={onDelete}
          onLeaveEdit={()=> setEdit((edit) => !edit)}
        /> :
        <EventGeneralView
          setEdit={setEdit}
        />
      }
    </div>
  );
};
