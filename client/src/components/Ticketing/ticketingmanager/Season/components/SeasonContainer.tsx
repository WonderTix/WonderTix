/* eslint-disable @typescript-eslint/no-empty-function */
import React, {useState} from 'react';
import SeasonInfo from './SeasonInfo';
import SeasonEvents from './SeasonEvents';
import {LoadingScreen} from '../../../mainpage/LoadingScreen';
import {useFetchToken} from '../../showings/ShowingUpdated/ShowingUtils';
import PopUp from '../../../Pop-up';
import {useParams} from 'react-router';

const defaultPopUpValues = {
  title: '',
  message: '',
  success: false,
};

const SeasonContainer = () => {
  const providedSeasonId = useParams();
  const [seasonId, setSeasonId] = useState(Number(providedSeasonId.seasonid));
  const [isFormEditing, setIsFormEditing] = useState<boolean>(!seasonId);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [popUpMessage, setPopUpMessage] = useState(defaultPopUpValues);
  const {token} = useFetchToken();

  if (token === '' || seasonId === undefined) {
    return <LoadingScreen />;
  } else {
    return (
      <div className='w-full h-screen overflow-x-hidden absolute bg-gray-200'>
        {showPopUp && (
          <PopUp
            {...popUpMessage}
            handleClose={() => setShowPopUp(false)}
            handleProceed={() => setShowPopUp(false)}
          />
        )}
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <SeasonInfo
            seasonId={seasonId}
            isFormEditing={isFormEditing}
            setIsFormEditing={setIsFormEditing}
            setSeasonId={setSeasonId}
            setPopUpMessage={setPopUpMessage}
            setShowPopUp={setShowPopUp}
            token={token}
          />
          <SeasonEvents
            token={token}
            seasonId={seasonId}
            isFormEditing={isFormEditing}
            setIsFormEditing={setIsFormEditing}
          />
        </div>
      </div>
    );
  }
};

export default SeasonContainer;
