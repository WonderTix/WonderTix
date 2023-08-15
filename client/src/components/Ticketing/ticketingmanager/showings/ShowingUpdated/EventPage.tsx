import React from 'react';
import {Container} from '@mui/material';
import {EventShowingsContainer} from './EventShowingsContainer';
import {EventGeneralContainer} from './EventGeneralContainer';
import {useEvent} from './EventProvider';
import {LoadingScreen} from '../../../mainpage/LoadingScreen';


export const TestPage = () => {
  const {eventID, loading, token} = useEvent();

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

