import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {titleCase} from '../../../../utils/arrays';
import {getSeasonImage, formatSeasonDate, SeasonImage} from './seasonUtils';
import ShowingActivenessToggle from '../../GroupToggle';

export interface Seasons {
  seasonid: number;
  name: string;
  startdate: number;
  enddate: number;
  imageurl?: string;
}

interface SeasonInstancesProp {
  token: string;
}

/**
 * Display all seasons page
 *
 * @param props
 * @module
 * @returns Season Instances Page
 */
const SeasonInstancesPage = (props: SeasonInstancesProp) => {
  const navigate = useNavigate();
  const {token} = props;
  const [filterSetting, setFilterSetting] = useState('active');
  const [seasonData, setSeasonData] = useState([]);
  const [allSeasonData, setAllSeasonData] = useState([]);
  const [inactiveData, setInactiveData] = useState([]);
  const [activeData, setActiveData] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_2_URL + '/season/list', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      const inactiveSeasons = [];
      const activeSeasons = [];
      const allSeasons = [];

      data.forEach((season) => {
        const allEventsActive = season.events.every((event) => event.active);

        if (allEventsActive) {
          activeSeasons.push(season);
        } else {
          inactiveSeasons.push(season);
        }

        // Common operation
        allSeasons.push(season);
      });
      // Sorting
      inactiveSeasons.sort((a, b) => b.seasonid - a.seasonid);
      activeSeasons.sort((a, b) => b.seasonid - a.seasonid);
      allSeasons.sort((a, b) => b.seasonid - a.seasonid);

      // Set active/inactive/all data arrays
      setInactiveData(inactiveSeasons);
      setActiveData(activeSeasons);
      setAllSeasonData(allSeasons);

      // Set Default "Active"
      setSeasonData(activeSeasons);
    })
    .catch((error) => {
      console.error('Error Fetching Season Data:', error);
    });
  }, []);

  // Group Toggle Display Changes
  useEffect(() => {
    if (filterSetting === 'active') {
      setSeasonData(activeData);
    } else if (filterSetting === 'inactive') {
      setSeasonData(inactiveData);
    } else {
      setSeasonData(allSeasonData);
    }
  }, [filterSetting]);

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
        <section className='flex flex-col tab:flex-row tab:justify-between tab:items-center gap-10 tab:gap-1 w-full mb-6 tab:mb-14'>
          <h1
            className='col-span-2 min-[678px]:col-span-1 font-bold text-5xl bg-clip-text
            text-transparent bg-gradient-to-r from-sky-500 to-indigo-500'
          >
            Select Season
          </h1>
          <button
            onClick={() => navigate('/ticketing/seasons/0')}
            className={
              'bg-green-500 hover:bg-green-700 h-fit disabled:bg-gray-500 text-white p-2 rounded-xl flex justify-center align-center gap-1'
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={3}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v12m6-6H6'
              />
            </svg>
            Add Season
          </button>
        </section>
        <ShowingActivenessToggle
          defaultValue={filterSetting}
          handleFilterChange={setFilterSetting}
        />
        <ul className='md:grid md:grid-cols-2 md:gap-8 grid grid-cols-1 gap-4 mt-9'>
          {seasonData.map((season) => (
            <li key={season.seasonid}>
              <button
                onClick={() =>
                  navigate(`/ticketing/seasons/${season.seasonid}`)
                }
                className='shadow-xl rounded-xl hover:scale-105 transition duration-300 ease-in-out w-full'
                style={{
                  backgroundImage: `url(${getSeasonImage(season.imageurl)})`,
                }}
              >
                <article
                  className=' backdrop-blur-sm md:flex-row sm:flex-col sm:items-center w-full rounded-xl bg-zinc-900/70 h-full '
                >
                  <div className='w-full h-48'>
                    <SeasonImage
                      className='object-cover h-full w-full rounded-t-xl'
                      src={getSeasonImage(season.imageurl)}
                      alt={`Cover image for ${season.name} season`}
                    />
                  </div>
                  <div className='text-white text-start p-5'>
                    <h2 className='text-xl font-bold'>
                      {titleCase(season.name)}
                    </h2>
                    <p className='text-md'>
                      Start Date: {formatSeasonDate(season.startdate)}
                    </p>
                    <p className='text-md'>
                      End Date: {formatSeasonDate(season.enddate)}
                    </p>
                  </div>
                </article>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeasonInstancesPage;
