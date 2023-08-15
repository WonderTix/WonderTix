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
  const {setReload, token} = useEvent();
  const [edit, setEdit] = useState(false);

  const onSuccess = (event) => {
    setReload((reload) => !reload);
    setEdit((edit)=> !edit);
    openSnackbar(`Event Updated Successfully`);
  };

  const onError = () => {
    openSnackbar(`Event Update Failed`);
  };

  return (
    <div className={'bg-zinc-900/60 p-7 ' +
      'flex flex-row rounded-xl gap-1 justify-between'}>
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
            showing={showing}
          />
      }
      {
        !edit?
          <Button
            color={'primary'}
            variant={'contained'}
            onClick={() => setEdit((edit) => !edit)}
          >
            Edit
          </Button>:
          null
      }
    </div>
  );
};
