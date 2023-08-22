import React from 'react';
import {EventShowingsContainer} from './EventShowingsContainer';
import {EventGeneralContainer} from './EventGeneralContainer';
import {useEvent} from './EventProvider';
import {LoadingScreen} from '../../../mainpage/LoadingScreen';
import Udash_nav from '../../udash_navbar';
import PopUp from '../../../Pop-up';


export const EventPageV2 = () => {
  // eslint-disable-next-line max-len
  const {eventID, loading, token, showPopUp,
    setShowPopUp, message, success, title} = useEvent();

  if (loading || !token || eventID === undefined) {
    return <LoadingScreen />;
  } else {
    return (
      <div className={'flex flex-row'}>
        <Udash_nav/>
        {/* eslint-disable-next-line max-len */}
        <div className='w-full h-screen overflow-x-hidden absolute bg-gray-200'>
          {
                showPopUp?
                  <>
                    <PopUp
                      message={message}
                      title={title}
                      handleClose={() => setShowPopUp(false)}
                      handleProceed={() => setShowPopUp(false)}
                      success={success}
                    />
                  </>:
                  null
          }
          <div className='md:ml-[18rem] md:mr-[5rem] mt-[7rem]
       sm:mr-[2rem] sm:ml-[2rem] sm:mb-[11rem]'>
            <EventGeneralContainer />
            {
          eventID?
            <EventShowingsContainer />:
            null
            }
          </div>
        </div>
      </div>
    );
  }
};

