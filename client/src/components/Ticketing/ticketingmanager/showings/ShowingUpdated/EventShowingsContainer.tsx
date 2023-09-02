import {EventShowingForm} from './EventShowingForm';
import React, {useState} from 'react';
import {EventShowingContainer} from './EventShowingContainer';
import {useEvent} from './EventProvider';
import {createSubmitFunction} from './ShowingUtils';
import {toDateStringFormat} from '../../Events/showingInputContainer_deprecated';

export const EventShowingsContainer = () => {
  const {
    token,
    setReloadShowing,
    showingData,
    eventData,
    setEditing,
    editing,
    setPopUpProps,
    showPopUp,
  } = useEvent();
  const [add, setAdd] = useState(false);
  const [sortBy, setSortBy] = useState(0);
  const onSuccessAddShowing = () => {
    setEditing((edit) => !edit);
    setPopUpProps('Success', 'Showing Successfully Created', true);
    setReloadShowing((reload) => !reload);
    setAdd((add) => !add);
  };
  const onError = async (event) => {
    try {
      const res = await event.json();
      setPopUpProps('Failure', res.error, false);
    } catch (error) {
      setPopUpProps('Failure', 'Showing creation failed', false);
    }
  };

  const getSortingFunction = () => {
    switch (sortBy) {
    case 1:
      return (a, b) => a.eventinstanceid - b.eventinstanceid;
    case 2:
      return (a, b) => a.totalseats - b.totalseats;
    case 3:
      return (a, b) => a.availableseats - b.availableseats;
    case 4:
      return (a, b) =>
        new Date(toDateStringFormat(b.eventdate)).getTime() -
          new Date(toDateStringFormat(a.eventdate)).getTime();
    case 5:
      return (a, b) => b.eventinstanceid - a.eventinstanceid;
    case 6:
      return (a, b) => b.totalseats - a.totalseats;
    case 7:
      return (a, b) => b.availableseats - a.availableseats;
    default:
      return (a, b) =>
        new Date(toDateStringFormat(a.eventdate)).getTime() -
          new Date(toDateStringFormat(b.eventdate)).getTime();
    }
  };

  return (
    <div
      className={
        'bg-white flex flex-col mt-6 p-6 rounded-xl shadow-xl text-zinc-800'
      }
    >
      <div className={'grid grid-cols-12 p-2 gap-2'}>
        <div
          className={
            'col-span-12 min-[768px]:col-span-7 flex flex-row flex-wrap justify-center min-[768px]:justify-start gap-2'
          }
        >
          <h2
            className={
              ' text-xl md:text-2xl text-center min-[768px]:text-start w-fit h-fit my-auto'
            }
          >
            {eventData?.eventname} Showings
          </h2>
          <button
            className={
              'bg-green-500 hover:bg-green-700 w-fit h-fit font-bold disabled:bg-gray-500 text-white px-2 py-1 rounded-xl flex gap-1 items-stretch my-auto'
            }
            onClick={() => {
              setAdd((add) => !add);
              setEditing((edit) => !edit);
            }}
            disabled={!eventData || editing}
            aria-label={'Add Showing'}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
              strokeWidth='3'
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v12m6-6H6'
              />
            </svg>
            Showing
          </button>
        </div>
        <div className={'col-span-12 min-[768px]:col-span-5 my-auto flex flex-row flex-wrap justify-center min-[1230px]:justify-end'}>
          <label
            htmlFor={'sortMethod'}
            className={
              'text-zinc-800 my-auto pr-2 text-center w-fit'
            }
          >
              Sort By:
          </label>
          <select
            disabled={editing}
            value={sortBy}
            onChange={(event) => setSortBy(Number(event.target.value))}
            className={`h-fit w-fit border border-zinc-500 rounded-lg ${showPopUp ? 'hidden' : ''} p-1`}
          >
            <option value={0}>Date - Ascending</option>
            <option value={1}>Showing ID - Ascending</option>
            <option value={2}>Total Tickets - Ascending</option>
            <option value={3}>Available Tickets - Ascending</option>
            <option value={4}>Date - Descending</option>
            <option value={5}>Showing ID - Descending</option>
            <option value={6}>Total Tickets - Descending</option>
            <option value={7}>Available Tickets - Descending</option>
          </select>
        </div>
      </div>
      {eventData && showingData && (
        <div className={'flex flex-col gap-4'}>
          {add && (
            <EventShowingForm
              onSubmit={createSubmitFunction(
                'POST',
                `${process.env.REACT_APP_API_2_URL}/event-instance/`,
                token,
                onSuccessAddShowing,
                onError,
              )}
              onLeaveEdit={() => {
                setEditing((edit) => !edit);
                setAdd((add) => !add);
              }}
            />
          )}
          {showingData.sort(getSortingFunction()).map((showing) => (
            <EventShowingContainer
              key={'showing ' + showing.eventinstanceid}
              showing={showing}
            />
          ))}
        </div>
      )}
    </div>
  );
};
