import React, {useState} from 'react';
import SeasonInfo from './SeasonInfo';
import {LoadingScreen} from '../../../mainpage/LoadingScreen';
import {useFetchToken} from '../../showings/ShowingUpdated/ShowingUtils';

import {useParams} from 'react-router';

const SeasonView = () => {
  const providedSeasonId = useParams();
  const [seasonId, setSeasonId] = useState(Number(providedSeasonId.seasonid));
  const [isFormEditing, setIsFormEditing] = useState<boolean>(!seasonId);
  const {token} = useFetchToken();

  if (token === '' || seasonId === undefined) {
    return <LoadingScreen />;
  } else {
    return (
      <div className='w-full h-screen overflow-x-hidden absolute'>
        <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <SeasonInfo
            seasonId={seasonId}
            setSeasonId={setSeasonId}
            isFormEditing={isFormEditing}
            token={Number(token)}
          />
        </div>
      </div>
    );
  }
};

export default SeasonView;
