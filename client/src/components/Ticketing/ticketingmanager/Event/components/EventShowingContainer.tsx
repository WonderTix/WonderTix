import {UpdatedShowing} from '../../../../../interfaces/showing.interface';
import React, {useState} from 'react';
import {EventShowingForm} from './EventShowingForm';
import {EventShowingView} from './EventShowingView';
import {useEvent} from './EventProvider';
import {createDeleteFunction, createSubmitFunction} from './ShowingUtils';

interface EventShowingContainerProps {
  showing: UpdatedShowing;
}

export const EventShowingContainer = (props: EventShowingContainerProps) => {
  const {showing} = props;
  const {setReloadShowing, token, setEditing, setPopUpProps} = useEvent();
  const [edit, setEdit] = useState(false);

  const onSubmitSuccess = () => {
    setReloadShowing((reload) => !reload);
    setEdit((edit) => !edit);
    setPopUpProps(
      'Success',
      'Showing successfully updated',
      true,
      `update-modal-showing-id-${showing.eventinstanceid}`,
    );
    setEditing((editing) => !editing);
  };
  const onDeleteSuccess = () => {
    setReloadShowing((reload) => !reload);
    setEdit((edit) => !edit);
    setPopUpProps(
      'Success',
      'Showing successfully deleted',
      true,
      `delete-modal-showing-id-${showing.eventinstanceid}`,
    );
    setEditing(false);
  };
  const onError = async (event) => {
    try {
      const res = await event.json();
      setPopUpProps('Failure', res.error, false, `failure-modal`);
    } catch (error) {
      setPopUpProps(
        'Failure',
        'Showing update failed',
        false,
        `failure-delete-modal-showing-id-${showing.eventinstanceid}`,
      );
    }
  };

  const onEditClick = () => {
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
            onSubmitSuccess,
            onError,
          )}
          onLeaveEdit={onEditClick}
        />
      ) : (
        <EventShowingView
          setEdit={onEditClick}
          onDelete={createDeleteFunction(
            'DELETE',
            `${process.env.REACT_APP_API_2_URL}/event-instance/${showing.eventinstanceid}`,
            token,
            onDeleteSuccess,
            onError,
          )}
          showing={showing}
        />
      )}
    </>
  );
};
