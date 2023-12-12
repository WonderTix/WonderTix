import React from 'react';
import {EventShowingsContainer} from './EventShowingsContainer';
import {EventGeneralContainer} from './EventGeneralContainer';
import {useEvent} from './EventProvider';
import {LoadingScreen} from '../../../mainpage/LoadingScreen';
import Udash_nav from '../../udash_navbar';
import PopUp from '../../../PopUp';

export const EventPageV2 = () => {
  const {
    eventID,
    loading,
    token,
    showPopUp,
    setShowPopUp,
    message,
    success,
    title,
    dataTestId,
    handleProceed,
    ticketTypes,
  } = useEvent();


  if (loading || token === '' || eventID === undefined || !ticketTypes) {
    return <LoadingScreen />;
  } else {
    return (
      <div className={'flex flex-row'}>
        <Udash_nav />
        <div className='w-full h-screen overflow-x-hidden absolute bg-gray-200'>
          {showPopUp && (
            <PopUp
              message={message}
              title={title}
              handleClose={() => setShowPopUp(false)}
              handleProceed={async () => {
                setShowPopUp(false);
                if (handleProceed) {
                  await handleProceed();
                }
              }
              }
              success={success}
              dataTestId={dataTestId}
            />
          )}
          <div className='md:ml-[18rem] md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
            <EventGeneralContainer />
            <EventShowingsContainer />
          </div>
        </div>
      </div>
    );
  }
};
