import React, {ReactElement} from 'react';
import Navbar from '../Navbar';
import {SeasonSubscriptions} from './SeasonSubscriptions';
import Footer from '../Footer';
import {useFetchSeasonSubscriptions} from './SubscriptionPurchaseUtils';
import {useParams} from 'react-router-dom';
import {LoadingScreen} from '../LoadingScreen';
import {usePopUp} from '../../ticketingmanager/TicketTypes/SubscriptionTypeUtils';
import PopUp from '../../PopUp';

export const SubscriptionMain = (): ReactElement => {
  const {seasonid} = useParams();
  const {season} = useFetchSeasonSubscriptions(+seasonid);
  const {setPopUpProps, setShowPopUp, showPopUp, popUpProps} = usePopUp();
  if (!season) return <LoadingScreen />;
  return (
    <div>
      <Navbar bMode />
      <SeasonSubscriptions
          season={season}
          setPopUpProps={setPopUpProps}
      />
      <Footer />
      {showPopUp && (
        <PopUp
          title={popUpProps.title}
          message={popUpProps.message}
          success={popUpProps.success}
          dataTestId={popUpProps.dataTestId}
          handleProceed={async () => {
            setShowPopUp(false);
            if (popUpProps.handleProceed) await popUpProps.handleProceed();
          }}
          primaryLabel={popUpProps.primaryLabel}
          secondaryLabel={popUpProps.secondaryLabel}
          handleClose={() => setShowPopUp(false)}
        />
      )}
    </div>
  );
};
