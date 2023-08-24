import {EventShowingForm} from './EventShowingForm';
import React, {useState} from 'react';
import {EventShowingContainer} from './EventShowingContainer';
import {useEvent} from './EventProvider';
import {createSubmitFunction} from './ShowingUtils';
import {toDateStringFormat} from '../../Events/showingInputContainer';
import AddIcon from '@mui/icons-material/Add';

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
  const onSuccessAddShowing = async (event) => {
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
      <div className={'grid grid-cols-12 p-2'}>
        <h2
          className={
            'col-span-12 min-[650px]:col-span-6 text-xl md:text-2xl text-center min-[650px]:text-start pb-1'
          }
        >
          {eventData?.eventname} Showings
        </h2>
        <div
          className={
            'col-span-12 min-[650px]:col-span-6 flex flex-row justify-center min-[650px]:justify-end'
          }
        >
          <div className={'col-span-6 grid min-[1350px]:grid-cols-2 pr-1'}>
            <label
              htmlFor={'sortMethod'}
              className={
                'text-xs text-zinc-800 my-auto pr-2 text-center min-[1350px]:text-end'
              }
            >
              Sort By:
            </label>
            <select
              disabled={editing}
              value={sortBy}
              onChange={async (event) => setSortBy(Number(event.target.value))}
              className={
                `h-fit m-auto text-xs border border-zinc-500 rounded-xl mr-2 ${showPopUp?'hidden':''}`
              }
            >
              <option value={0}>Date - Ascending</option>
              <option value={1}>Showing ID - Ascending</option>
              <option value={2}>Total Seats - Ascending</option>
              <option value={3}>Available Seats - Ascending</option>
              <option value={4}>Date - Descending</option>
              <option value={5}>Showing ID - Descending</option>
              <option value={6}>Total Seats - Descending</option>
              <option value={7}>Available Seats - Descending</option>
            </select>
          </div>
          <button
            className={
              'border border-green-900 bg-green-700 hover:bg-green-800 w-fit h-fit my-auto ' +
              'disabled:bg-gray-600 text-white p-2 font-bold rounded-xl col-span-6 flex flex-row'
            }
            onClick={async () => {
              setAdd((add) => !add);
              setEditing((edit) => !edit);
            }}
            disabled={!eventData}
            aria-label={'Add Showing'}
          >
            <AddIcon /> Showing
          </button>
        </div>
      </div>
      {eventData && showingData ? (
        <div className={'flex flex-col gap-4'}>
          {add ? (
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
          ) : null}
          {showingData.sort(getSortingFunction()).map((showing) => (
            <EventShowingContainer
              key={'showing ' + showing.eventinstanceid}
              showing={showing}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
