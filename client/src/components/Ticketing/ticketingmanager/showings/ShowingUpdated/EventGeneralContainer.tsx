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

  const updateEvent = async (event) => {
    const res = await event.json();
    setEventData(res);
    setEventID(res.eventid);
    setEdit(false);
    setEditing(false);
    return res.eventid;
  };

  const onUpdateSuccess = async (newEvent) => {
    try {
      const eventID = await updateEvent(newEvent);
      setPopUpProps(
          `Success`,
          'Event update successful',
          true,
          `update-modal-event-id-${eventID}`,
      );
    } catch (error) {
      console.error('error updating event');
    }
  };

  const onUpdateSuccessActiveOnly = async (newEvent) => {
    try {
      await updateEvent(newEvent);
    } catch (error) {
      console.error('error updating event');
    }
  };

  const onCreateSuccess = async (newEvent) => {
    try {
      const eventID = await updateEvent(newEvent);
      navigate(`/ticketing/showings/${eventID}`);
      setPopUpProps(
        `Success`,
        'Event creation successful',
        true,
        `create-modal-event-id-${eventID}`,
      );
    } catch (error) {
      console.error('error updating event after creation');
    }
  };
  const onSubmitError = async (event) => {
    try {
      const res = await event.json();
      setPopUpProps(`Failure`, res.error, false, `failure-modal`);
    } catch (error) {
      setPopUpProps(
        `Failure`,
        'Event update failed',
        false,
        `failure-update-modal-event-id-${eventID}`,
      );
    }
  };

  const onDeleteSuccess = () => {
    navigate(`/ticketing/showings`);
  };

  const onDeleteError = async (event) => {
    try {
      const res = await event.json();
      setPopUpProps(`Failure`, res.error, false, `failure-modal`);
    } catch (error) {
      setPopUpProps(
        `Failure`,
        'Event cannot be deleted',
        false,
        `failure-delete-modal-event-id-${eventID}`,
      );
    }
  };

  const onDelete = createDeleteFunction(
    'DELETE',
    `${process.env.REACT_APP_API_2_URL}/events/${eventID}`,
    token,
    onDeleteSuccess,
    onDeleteError,
  );

  return (
    <>
      {edit ? (
        <EventGeneralForm
          onSubmit={createSubmitFunction(
              eventID === 0 ? 'POST' : 'PUT',
              `${process.env.REACT_APP_API_2_URL}/events`,
              token,
              eventID ? onUpdateSuccess : onCreateSuccess,
              onSubmitError,
          )}
          onLeaveEdit={() => {
            setEdit((edit) => !edit);
            setEditing((edit) => !edit);
          }}
        />
      ) : (
          <EventGeneralView
              onSubmitActiveOnly={createSubmitFunction(
                  'PUT',
                  `${process.env.REACT_APP_API_2_URL}/events`,
                  token,
                  onUpdateSuccessActiveOnly,
              )}
              setEdit={setEdit}
              onDelete={() =>
                setPopUpProps(
                    'Confirm deletion',
                    'Click continue to delete this event',
                    false,
                    `delete-modal-event-id-${eventID}`,
                    async () => await onDelete(),
                )}
          />
      )}
    </>
  );
};
