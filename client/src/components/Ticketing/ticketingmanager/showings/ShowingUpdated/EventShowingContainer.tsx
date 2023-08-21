import {Showing} from '../../../../../interfaces/showing.interface';
import React, {useState} from 'react';
import {EventShowingForm} from './EventShowingForm';
import {EventShowingView} from './EventShowingView';
import {Button} from '@mui/material';
import {useEvent} from './EventProvider';
import {openSnackbar} from '../../snackbarSlice';
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
    setReloadShowing((reload) => !reload);
    setEdit((edit)=> !edit);
    setEditing((edit) => !edit);
    setPopUpProps('Success', 'Showing Successfully Updated', true);
    setShowPopUp(true);
  };

  const onError = (event) => {
    console.log(event);
    setPopUpProps('Failure', 'Showing Update Failed', false);
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
            onDelete = {createDeleteFunction('DELETE',
                // eslint-disable-next-line max-len
                `${process.env.REACT_APP_API_2_URL}/event-instance/${showing.eventinstanceid}`,
                token,
                onSuccess,
                onError,
            )
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
