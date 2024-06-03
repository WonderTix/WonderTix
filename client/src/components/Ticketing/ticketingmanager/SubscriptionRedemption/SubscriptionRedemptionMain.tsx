import React from 'react';
import {SubscriptionsRedemptionContainer} from './SubscriptionsRedemptionContainer';
import {useFetchToken} from '../Event/components/ShowingUtils';
import TicketingNavBar from '../TicketingNavBar';
import {usePopUp} from '../TicketTypes/SubscriptionTypeUtils';
import {LoadingScreen} from '../../mainpage/LoadingScreen';
import PopUp from '../../PopUp';

export const SubscriptionRedemptionMain = () => {
  const {token} = useFetchToken();
  const {popUpProps, setShowPopUp, showPopUp, setPopUpProps} = usePopUp();

  if (!token) return <LoadingScreen />;

  return (
    <div className='flex flex-row'>
      <TicketingNavBar />
      <div className='w-full h-screen overflow-x-hidden absolute bg-gray-200'>
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem] min-[2000px]:flex justify-center'>
          <SubscriptionsRedemptionContainer
            token={token}
            showPopUp={showPopUp}
            setPopUpProps={setPopUpProps}
          />
        </div>
      </div>
      {showPopUp && (
        <PopUp
          {...popUpProps}
          handleProceed={async () => {
            setShowPopUp(false);
            if (popUpProps.handleProceed) {
              await popUpProps.handleProceed();
            }
          }}
          handleClose={() => setShowPopUp(false)}
          showSecondary={!!popUpProps.secondaryLabel}
          showClose={!!popUpProps.secondaryLabel}
        />
      )}
    </div>
  );
};
