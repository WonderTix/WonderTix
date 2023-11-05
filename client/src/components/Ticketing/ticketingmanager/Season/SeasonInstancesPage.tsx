import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {titleCase} from '../../../../utils/arrays';
import {getSeasonImage, formatSeasonDate, SeasonImage} from './seasonUtils';
import GroupToggle from '../../GroupToggle';

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
  const [seasons, setAllSeasons] = useState<Seasons[]>([]);

  const getAllSeasons = async () => {
    try {
      const getAllSeasonsRes = await fetch(
        process.env.REACT_APP_API_2_URL + '/season',
        {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );

      if (!getAllSeasonsRes.ok) {
        throw new Error('Failed to fetch all seasons');
      }

      const seasonsData = await getAllSeasonsRes.json();
      setAllSeasons(seasonsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllSeasons();
  }, []);

  /**
   * Based on active/inactive/all
   *
   * @param event
   */
  const handleEventChange = (event) => {
    // TODO: handle the season type change when active/inactive is properly implemented
  };

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
        <div className='mb-6'>
          <GroupToggle/>
        </div>
        <ul className='md:grid md:grid-cols-2 md:gap-8 grid grid-cols-1 gap-4 mt-9'>
          {seasons.map((season) => (
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
