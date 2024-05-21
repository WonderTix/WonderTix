import React, {ReactElement} from 'react';
import format from 'date-fns/format';
import {Ticket} from '../ticketingmanager/ticketingSlice';
import {CircleCheckIcon, CircleIcon} from '../Icons';
import Label from '../Label';

interface ShowingTimeSelectProps {
  showings: Ticket[];
  selectedTime?: Ticket;
  onSelectShowingTime?: (dateShowing: Ticket) => void;
}

/**
 * The Time Selection area of the Ticket Picker.
 *
 * @param {ShowingTimeSelectProps} props
 */
const ShowingTimeSelect = ({
  showings,
  selectedTime,
  onSelectShowingTime,
}: ShowingTimeSelectProps) => {
  const handleSelectTime = (showing: Ticket) => {
    if (onSelectShowingTime) {
      onSelectShowingTime(showing);
    }
  };

  const getTimeCardIcon = (showing: Ticket): ReactElement => {
    if (showing.remainingtickets === 0) {
      return <Label color='slate'>SOLD OUT</Label>;
    } else {
      return showing.event_instance_id === selectedTime?.event_instance_id ? (
        <CircleCheckIcon className='h-7 w-7 text-blue-500' strokeWidth={2.3} />
      ) : (
        <CircleIcon className='h-7 w-7 text-zinc-600' strokeWidth={2.3} />
      );
    }
  };

  return (
    <ul
      className='max-w-[30em] w-full md:w-96 relative
      after:content=[""] after:h-[1px] md:after:h-full after:absolute after:w-full md:after:w-[1px] after:bg-white after:inline-block md:after:right-[-1.5em] after:bottom-[-1.7em] md:after:bottom-auto md:after:top-0'
    >
      {showings.length ? (
        showings.map((showing, index) => (
          <li key={index} className='w-full mb-3 last-of-type:mb-0'>
            <button
              data-testid='time-option'
              className={`${
                selectedTime?.event_instance_id === showing.event_instance_id
                  ? 'ring-blue-500 ring-4'
                  : 'hover:enabled:bg-zinc-200'
              }
                ${showing.remainingtickets === 0 ? 'bg-zinc-400' : ''}
                bg-white rounded-md px-3 py-2 min-h-[4em] w-full text-left flex items-center
                justify-between border-transparent transition-all`}
              onClick={() => handleSelectTime(showing)}
              disabled={showing.remainingtickets === 0}
            >
              <p className='leading-tight'>
                <span className='text-xl block font-medium' data-testid='time-option-value'>
                  {format(new Date(showing.date), 'h:mm a')}
                </span>
                {(showing.detail || showing.ispreview) && (
                  <span>
                    {showing.detail}{' '}
                    {showing.detail && showing.ispreview && '| '}
                    {showing.ispreview && 'Preview'}
                  </span>
                )}
              </p>
              <span>{getTimeCardIcon(showing)}</span>
            </button>
          </li>
        ))
      ) : (
        <p className='text-zinc-300 font-bold text-center my-auto md:mt-3'>
          Select a Date
        </p>
      )}
    </ul>
  );
};

export default ShowingTimeSelect;
