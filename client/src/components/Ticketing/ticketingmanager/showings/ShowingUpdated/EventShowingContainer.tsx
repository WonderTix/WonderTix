import {Showing} from '../../../../../interfaces/showing.interface';
import React, {useState} from 'react';
import {EventShowingForm} from './EventShowingForm';
import {EventShowingView} from './EventShowingView';
import {useEvent} from './EventProvider';
import {createDeleteFunction, createSubmitFunction} from './ShowingUtils';

interface EventShowingContainerProps {
  showing: Showing;
}

export const EventShowingContainer = (props: EventShowingContainerProps) => {
  const {showing} = props;
  const {setReloadShowing, token, setEditing, setPopUpProps} = useEvent();
  const [edit, setEdit] = useState(false);

  const onSuccess = async (event) => {
    setReloadShowing((reload) => !reload);
    setEdit((edit) => !edit);
    setEditing((editing) => !editing);
    setPopUpProps('Success', 'Showing successfully updated', true);
  };

  const onError = async (event) => {
    try {
      const res = await event.json();
      setPopUpProps('Failure', res.error, false);
    } catch (error) {
      setPopUpProps('Failure', 'Showing update failed', false);
    }
  };

  const onEditClick = async () => {
    setEditing((edit) => !edit);
    setEdit((edit) => !edit);
  };

  return (
    <>
      {edit ? (
        <EventShowingForm
          initialValues={showing}
          onSubmit={createSubmitFunction(
            'PUT',
            `${process.env.REACT_APP_API_2_URL}/event-instance/${showing.eventinstanceid}`,
            token,
            onSuccess,
            onError,
          )}
          onDelete={createDeleteFunction(
            'DELETE',
            `${process.env.REACT_APP_API_2_URL}/event-instance/${showing.eventinstanceid}`,
            token,
            onSuccess,
            onError,
          )}
          onLeaveEdit={onEditClick}
        />
      ) : (
        <EventShowingView setEdit={onEditClick} showing={showing} />
      )}
    </>
  );
};
