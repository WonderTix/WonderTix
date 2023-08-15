import React from 'react';
import {Container} from '@mui/material';
import {EventShowingsContainer} from './EventShowingsContainer';
import {EventGeneralContainer} from './EventGeneralContainer';
import {useEvent} from './EventProvider';
import {LoadingScreen} from '../../../mainpage/LoadingScreen';


export const TestPage = () => {
  const {eventID, setEventID, loading, token} = useEvent();

  console.log('Here', eventID, loading);

  if (loading || !token || eventID === undefined) {
    return <LoadingScreen />;
  } else {
    return (
      <Container>
        <EventGeneralContainer />
        {
          eventID?
            <EventShowingsContainer />:
            null
        }
      </Container>
    );
  }
};

