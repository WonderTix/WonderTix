/* eslint-disable max-len */
import {EventShowingForm} from './EventShowingForm';
import React, {useState} from 'react';
import {EventShowingContainer} from './EventShowingContainer';
import {useEvent} from './EventProvider';
import {createSubmitFunction} from './ShowingUtils';
import {toDateStringFormat} from '../../Events/showingInputContainer';
import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export const EventShowingsContainer = () => {
  const {token, setReloadShowing, showingData, eventData, setShowPopUp, setPopUpProps} = useEvent();
  const [add, setAdd] = useState(false);
  const onSuccessAddShowing = async (event) => {
    setPopUpProps('Success', 'Showing Successfully Created', true);
    setShowPopUp(true);
    setReloadShowing((reload) => !reload);
    setAdd((add) => !add);
  };
  const onError = async (event) => {
    const message = 'Showing Creation Failed';
    if (event.status === 422 || event.status === 404) {
      // Where in the res is the custom actual error message
      console.log(event);
    }
    setPopUpProps('Failure', message, false);
    setShowPopUp(true);
  };

  if (!eventData) {
    return null;
  }
  return (
    <div className='bg-white flex flex-col mt-6 p-6 rounded-xl shadow-xl text-zinc-800'>
      <div className={'grid grid-cols-12 pb-2 gap-2'}>
        <h2 className={'text-center col-span-6 text-2xl'}>{eventData.eventname} Showings</h2>
        <div className={'grid content-center mx-auto col-span-6'}>
          <Button
            variant={'contained'}
            color={'success'}
            startIcon={<AddIcon/>}
            onClick={()=>setAdd( (add) => !add)}
          >
          Showing
          </Button>
        </div>
      </div>
      <div className={'flex flex-col gap-4'} >
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
                  onLeaveEdit={() => setAdd((add)=>!add)}
                /> :
            null
        }
        {
          showingData && showingData.length>0?
            showingData
                .sort((a, b) =>
                  new Date(toDateStringFormat(a.eventdate)).getTime() -
              new Date(toDateStringFormat(b.eventdate)).getTime())
                .map((showing) => (
                  <EventShowingContainer
                    key={'showing ' + showing.eventinstanceid}
                    showing={showing}
                  />
                )):
          null
        }
      </div>
    </div>);
};
