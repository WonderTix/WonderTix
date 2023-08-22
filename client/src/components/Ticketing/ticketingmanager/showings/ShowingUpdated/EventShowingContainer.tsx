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
  const {setReloadShowing, token, setEditing,
    setShowPopUp, setPopUpProps} = useEvent();
  const [edit, setEdit] = useState(false);

  const onSuccess = async (event) => {
    console.log(event);
    setReloadShowing((reload) => !reload);
    setEdit((edit)=> !edit);
    setEditing((editing) => !editing);
    setPopUpProps('Success', 'Showing successfully updated', true);
    setShowPopUp(true);
  };

  const onError = async (event) => {
    console.log(event.error);
    setPopUpProps('Failure', 'Showing update failed', false);
    setShowPopUp(true);
  };
  return (
    <>
      {
        edit ?
          <EventShowingForm
            initialValues={showing}
            onSubmit={
              createSubmitFunction('PUT',
                  // eslint-disable-next-line max-len
                  `${process.env.REACT_APP_API_2_URL}/event-instance/${showing.eventinstanceid}`,
                  token,
                  onSuccess,
                  onError,
              )
            }
            onDelete = {
              createDeleteFunction('DELETE',
                  // eslint-disable-next-line max-len
                  `${process.env.REACT_APP_API_2_URL}/event-instance/${showing.eventinstanceid}`,
                  token,
                  onSuccess,
                  onError,
              )
            }
            onLeaveEdit = {
              () => {
                setEditing((edit) => !edit);
                setEdit((edit) => !edit);
              }
            }
          /> :
          <EventShowingView
            setEdit={setEdit}
            showing={showing}
          />
      }
    </>
  );
};
