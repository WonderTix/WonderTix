import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getData} from '../../ticketingmanager/Event/components/ShowingUtils';
import {ChevronDown, ChevronUp} from '../../Icons';

interface SubscriptionNavDropdownProps {
  marginClass?: string;
  mobile?: boolean;
}

export const SubscriptionNavDropdown = ({
  marginClass = 'mt-6',
  mobile = false,
}: SubscriptionNavDropdownProps) => {
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const controler = new AbortController();
    getData(
      `${process.env.REACT_APP_API_2_URL}/subscription-types/season/subscriptions/available`,
      setSeasons,
      controler.signal,
    ).catch(() => console.error('Error fetching seasons'));
    return () => controler.abort();
  }, []);

  return (
    <>
      <button
        className='flex flex-row gap-1 justify-between px-4 py-2 items-center'
        onClick={() => setShowDropDown(!showDropDown)}
      >
        Subscriptions
        {showDropDown ? (
          <ChevronUp className='h-4 w-4' />
        ) : (
          <ChevronDown className='h-4 w-4' />
        )}
      </button>
      {showDropDown && (
        <div className={mobile ? '' : 'relative'}>
          <ul
            className={
              mobile
                ? ''
                : `py-2 w-full border-r bg-zinc-200 absolute rounded left-0 shadow ${marginClass}`
            }
          >
            {seasons.length ? (
              seasons.map((season, index) => (
                <li
                  key={index}
                  className='text-gray-600 hover:text-indigo-700 cursor-pointer'
                >
                  <a
                    onClick={() => {
                      setShowDropDown(!showDropDown);
                      navigate(`/subscriptions/${season.seasonid}`);
                    }}
                    className={`flex w-full p-4 items-center gap-x-2 text-sm ${
                      mobile ? 'justify-center' : 'justify-start'
                    }`}
                  >
                    {season.name}
                  </a>
                </li>
              ))
            ) : (
              <li className={`text-gray-600 flex w-full p-4 items-center gap-x-2 text-sm ${
                mobile ? 'justify-center' : 'justify-start'
              }`}>
                No Subscriptions Available
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};
