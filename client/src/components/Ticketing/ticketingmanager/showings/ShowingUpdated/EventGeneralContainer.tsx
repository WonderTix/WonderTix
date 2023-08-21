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

  const onSuccess = async (newEvent) => {
    const res = await newEvent.json();
    setEventID(res.data[0].eventid);
    setEdit((edit)=>!edit);
    setPopUpProps(`Success`, 'Event Update Successful', true);
    setShowPopUp(true);
    setReloadEvent((reload) => !reload);
  };

  const onSubmitError = (event) => {
    console.log(event);
    setPopUpProps(`Failure`, 'Event Update Failed', false);
    setShowPopUp(true);
  };
  const onDeleteSuccess= () => {
    setPopUpProps(`Success`, 'Event Successfully Set to Inactive', true);
    setShowPopUp(true);
    navigate(`/ticketing/showings`);
  };

  const onDeleteError = (event) => {
    console.log('here', event);
    setPopUpProps(`Failure`, 'Event Cannot Be Marked Inactive', false);
    setShowPopUp(true);
  };

  const onSubmit = createSubmitFunction(eventID === 0 ? 'POST' : 'PUT',
      `${process.env.REACT_APP_API_1_URL}/events`,
      token,
      onSuccess,
      onSubmitError,
  );

  const onDelete = createDeleteFunction('DELETE',
      `${process.env.REACT_APP_API_2_URL}/event/${eventID}`,
      token,
      onDeleteSuccess,
      onDeleteError,
  );

  return (
    <div className={'bg-white flex flex-col  p-6 rounded-xl shadow-xl h-[20%]'}>
      <h2 className={'text-center text-3xl font-semibold mb-5'}>
        {eventID? 'Event Information' : 'Add Event'}
      </h2>
      {edit ?
        <EventGeneralForm
          onSubmit={onSubmit}
          onDelete={onDelete}
        /> :
        <EventGeneralView
          setEdit={setEdit}
        />
      }
    </div>
  );
};
