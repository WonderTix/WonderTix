import React, {ReactElement, useEffect, useState} from 'react';
import format from 'date-fns/format';
import {Ticket} from '../ticketingmanager/ticketingSlice';
import {ChevronRight, CircleCheckIcon, CircleIcon} from '../Icons';
import Label from '../Label';

/**
 * ShowingTimeSelectProps holds tickets, showings and such
 */
interface ShowingTimeSelectProps {
  check: string;
  showings: Ticket[];
  onSelectShowingTime?: (dateShowing: Ticket) => void;
}

/**
 * This is the handler
 *
 * @param {ShowingTimeSelectProps} props
 * @returns the selection of date and others once clicked
 */
const ShowingTimeSelect = ({
  check,
  showings,
  onSelectShowingTime,
}: ShowingTimeSelectProps) => {
  const [selectedShowingId, setSelectedShowingId] = useState(-1);

  useEffect(() => {
    if (check === 'selectTime') {
      setSelectedShowingId(-1);
    }
  }, [check]);

  const handleClick = (showing: Ticket) => {
    setSelectedShowingId(showing.event_instance_id);
    if (onSelectShowingTime) {
      onSelectShowingTime(showing);
    }
  };

  const getTimeCardIcon = (showing: Ticket): ReactElement => {
    if (showing.remainingtickets === 0) {
      return (
        <Label className='' color='slate'>
          SOLD OUT
        </Label>
      );
    } else {
      return showing.event_instance_id === selectedShowingId ? (
        <CircleCheckIcon className='h-8 w-8 text-blue-500' strokeWidth={2.3} />
      ) : (
        <CircleIcon className='h-8 w-8 text-zinc-600' strokeWidth={2.3} />
      );
    }
  };

  return (
    <ul className='w-96 relative after:content=[""] after:h-full after:absolute after:w-[1px] after:bg-white after:inline-block after:right-[-1.5em] after:top-0'>
      {showings.length ? (
        showings.map((showing, index) => (
          <li key={index} className='w-full mb-3'>
            <button
              className={`${
                selectedShowingId === showing.event_instance_id
                  ? 'ring-blue-500 ring-4'
                  : ''
              }
                ${showing.remainingtickets === 0 ? 'bg-zinc-400' : ''}
                bg-white rounded-md px-3 py-2 w-full text-left flex items-center justify-between border-transparent transition-all`}
              onClick={() => handleClick(showing)}
              disabled={showing.remainingtickets === 0}
            >
              <p>
                <span className='text-xl block font-medium'>
                  {format(new Date(showing.date), 'h:mm a')}
                </span>
                {(showing.detail || showing.ispreview) && (
                  <span>
                    {showing.detail}{' '}
                    {showing.detail && showing.ispreview && '|'} Preview
                  </span>
                )}
              </p>
              <span>{getTimeCardIcon(showing)}</span>
            </button>
          </li>
        ))
      ) : (
        <p className='text-zinc-300 font-bold text-center'>Select a Date</p>
      )}
    </ul>
    // <select
    //   value={selectedId}
    //   onChange={(ev): void => handleClick(parseFloat(ev.target.value))}
    //   className='bg-zinc-800/50 text-white p-5 mt-5 mb-3 rounded-xl max-w-full text-xl'
    //   id='time-select'
    // >
    //   <option className='text-zinc-300 text-xl' disabled value={-1}>
    //     select time
    //   </option>
    //   {showings.map((ticket) => {
    //     const soldOut = ticket.remainingtickets === 0;
    //     return (
    //       <option key={ticket.event_instance_id} value={ticket.event_instance_id} disabled={soldOut}>
    //         {soldOut && '[SOLD OUT] '}
    //         {format(new Date(ticket.date), 'h:mm a')}
    //         {(ticket.detail ?? '') !== '' ? ` (${ticket.detail})` : ''}
    //       </option>
    //     );
    //   })}
    // </select>
  );
};

export default ShowingTimeSelect;
