import {EventShowingForm} from './EventShowingForm';
import React, {useState} from 'react';
import {openSnackbar} from '../../snackbarSlice';
import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {EventShowingContainer} from './EventShowingContainer';
import {useEvent} from './EventProvider';
import {createSubmitFunction} from './ShowingUtils';


export const EventShowingsContainer = () => {
  const [add, setAdd] = useState(false);
  const {token, eventID, setReload, reload, showingData} = useEvent();

  const onSuccessAddShowing = (event) => {
    setReload((reload) => !reload);
    setAdd((add) => !add);
    openSnackbar('Showing has been added successfully');
  };
  const onError = () => {
    openSnackbar('Showing Update Failed');
  };

  return (
    <div className='flex flex-col gap-2 p-3'>
      {showingData && showingData.length>0?
      <div
        className={'flex flex-col justify-evenly ' +
          'm-h-[calc(.5*100vh)] overflow-y-scroll'}
      >
        {
          showingData.map((showing) => (
            <EventShowingContainer
              key={'showing ' + showing.eventinstanceid}
              showing={showing}
            />
          ))
        }
      </div>:
        null
      }
      <div className={'bg-zinc-900/60 p-7 ' +
          'flex flex-row rounded-xl gap-1 justify-center'}
      >
        {
          add?
            <EventShowingForm
              onSubmit={
                createSubmitFunction('POST',
                    `${process.env.REACT_APP_API_2_URL}/event-instance/`,
                    token,
                    onSuccessAddShowing,
                    onError,
                )}
              onDelete={() => setAdd((add)=>!add)}
            />:
            <Button
              size={'large'}
              variant={'contained'}
              startIcon={<AddIcon/>}
              color={'success'}
              onClick={()=>setAdd( (add) => !add)}
            >
              Add Showing
            </Button>
        }
      </div>
    </div>);
};
