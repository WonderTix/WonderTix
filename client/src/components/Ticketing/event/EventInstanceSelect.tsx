import React, {useEffect, useState} from 'react';
import format from 'date-fns/format';
import {Ticket} from '../ticketingmanager/ticketingSlice';

/**
 * EventInstanceSelectProps holds tickets, showings and such
 */
interface EventInstanceSelectProps {
  check: string;
  eventInstances: Ticket[];
  eventInstanceSelected?: (dateShowing: Ticket) => void;
}

/**
 * This is the handler
 *
 * @param {EventInstanceSelectProps} props
 * @returns the selection of date and others once clicked
 */
const EventInstanceSelect = ({
  check,
  eventInstances,
  eventInstanceSelected,
}: EventInstanceSelectProps) => {
  const [selectedId, setSelectedId] = useState(-1);

  useEffect(() => {
    if (check === 'selectTime') {
      setSelectedId(-1);
    }
  }, [check]);

  const handleClick = (id: number) => {
    setSelectedId(id);
    const eventInstance = eventInstances.find(
      (obj) => obj.event_instance_id === id,
    );
    if (eventInstanceSelected) {
      eventInstanceSelected(eventInstance);
    }
  };

  return (
    <select
      value={selectedId}
      onChange={(ev): void => handleClick(parseFloat(ev.target.value))}
      className='bg-zinc-800/50 text-white p-5 mt-5 mb-3 rounded-xl max-w-full text-xl'
      id='time-select'
    >
      <option className='text-zinc-300 text-xl' disabled value={-1}>
        select time
      </option>
      {eventInstances.map((ticket) => {
        const soldOut = ticket.remainingtickets === 0;
        return (
          <option key={ticket.event_instance_id} value={ticket.event_instance_id} disabled={soldOut}>
            {soldOut && '[SOLD OUT] '}
            {format(new Date(ticket.date), 'h:mm a')}
            {(ticket.detail ?? '') !== '' ? ` (${ticket.detail})` : ''}
          </option>
        );
      })}
    </select>
  );
};

export default EventInstanceSelect;
