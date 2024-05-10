import React, {useEffect, useState} from 'react';
import format from 'date-fns/format';
import {Ticket} from '../ticketingmanager/ticketingSlice';
import {ChevronRight} from '../Icons';

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
  const [selectedId, setSelectedId] = useState(-1);

  useEffect(() => {
    if (check === 'selectTime') {
      setSelectedId(-1);
    }
  }, [check]);

  const handleClick = (id: number) => {
    setSelectedId(id);
    const eventInstance = showings.find(
      (obj) => obj.event_instance_id === id,
    );
    if (onSelectShowingTime) {
      onSelectShowingTime(eventInstance);
    }
  };

  // TODO: Get the preview attribute in each showing
  return (
    <ul className='w-96 relative after:content=[""] after:h-full after:absolute after:w-[1px] after:bg-white after:inline-block after:right-[-1.5em] after:top-0'>
      {showings.map((showing, index) => (
        <li key={index} className='w-full'>
          <button className='bg-white rounded-md px-3 py-2 w-full text-left flex items-center justify-between' onClick={() => onSelectShowingTime(showing)}>
            <p>
              <span className='text-xl block font-medium'>{format(new Date(showing.date), 'h:mm a')}</span>
              {showing.detail || showing.ispreview && (
                <span>{showing.detail} {showing.detail && showing.ispreview && ('|')} Preview</span>
              )}
            </p>
            <span><ChevronRight /></span>
          </button>
        </li>
      ))}
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
