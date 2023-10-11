import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {titleCase} from '../../../../utils/arrays';
import {useFetchToken} from '../showings/ShowingUpdated/ShowingUtils';
import {getSeasonImage, formatSeasonDate, SeasonImage} from './seasonUtils';

export interface Seasons {
  seasonid: number;
  name: string;
  startdate: number;
  enddate: number;
  imageurl?: string;
}

/**
 * Display all seasons page
 *
 * @module
 * @returns Season Instances Page
 */
const SeasonInstancesPage = () => {
  const navigate = useNavigate();
  const [seasons, setAllSeasons] = useState<Seasons[]>([]);
  const {token} = useFetchToken();

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
  }, [token]);

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
            onClick={() => navigate(``)} // TODO, create seasons page
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
            <p className='my-auto'>Add Season</p>
          </button>
        </section>
        <div className='mb-6'>
          <label
            htmlFor='event-select'
            className='text-sm text-zinc-500 ml-1 mb-2 block'
          >
            Filter (Currently Unavailable)
          </label>
          <select
            id='event-select'
            className='select w-full tab:max-w-xs bg-white border border-zinc-300 rounded-lg p-3 text-zinc-600'
            onChange={handleEventChange}
          >
            <option value='active' className='px-6 py-3'>
              Active
            </option>
            <option value='inactive' className='px-6 py-3'>
              Inactive
            </option>
            <option value='all' className='px-6 py-3'>
              All
            </option>
          </select>
        </div>
        <ul className='md:grid md:grid-cols-2 md:gap-8 grid grid-cols-1 gap-4 mt-9'>
          {seasons.map((season) => (
            <li key={season.seasonid}>
              <button
                onClick={() => navigate(``)} // TODO, seasons edit page
                className='shadow-xl rounded-xl hover:scale-105 transition duration-300 ease-in-out w-full'
                style={{
                  backgroundImage: `url(${getSeasonImage('')})`, // TODO, use season specific image after DB migration
                }}
              >
                <article
                  className=' backdrop-blur-sm md:flex-row sm:flex-col
         sm:items-center w-full rounded-xl bg-zinc-900/70 h-full '
                >
                  <div className='w-full h-48'>
                    <SeasonImage
                      className='object-cover h-full w-full rounded-t-xl'
                      src={getSeasonImage('')} // TODO, use season specific image after DB migration
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
