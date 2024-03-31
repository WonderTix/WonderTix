import React from 'react';
import {SubscriptionsRedemptionContainer} from './SubscriptionsRedemptionContainer';
import {useFetchToken} from '../Event/components/ShowingUtils';
import Udash_nav from '../udash_navbar';
import {usePopUp} from '../TicketTypes/SubscriptionTypeUtils';
import {LoadingScreen} from '../../mainpage/LoadingScreen';
import PopUp from '../../PopUp';

export const SubscriptionRedemptionMain = () => {
  const {token} = useFetchToken();
  const {popUpProps, setShowPopUp, showPopUp, setPopUpProps} = usePopUp();

  if (!token) return <LoadingScreen />;

  return (
    <div className='flex flex-row'>
      <Udash_nav />
      <div className='w-full h-screen overflow-x-hidden absolute bg-gray-200'>
        <SubscriptionsRedemptionContainer
          token={token}
          showPopUp={showPopUp}
          setPopUpProps={setPopUpProps}
        />
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
        />
      )}
    </div>
  );
};
