/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import React, {useState} from 'react';
import {Ticket} from '../ticketingmanager/ticketing/ticketingSlice';
import format from 'date-fns/format';

/**
 * EventInstanceSelectProps holds tickets, showings and such
 */
interface EventInstanceSelectProps {check: string, eventInstances: Ticket[], eventInstanceSelected?: (dateShowing: Ticket) => void}

/**
 * This is the handler
 *
 * @param {EventInstanceSelectProps} props
 * @returns the selection of date and others once clicked
 */
const EventInstanceSelect=(props: EventInstanceSelectProps) =>{
  const [selectedId, setSelectedId] = useState(-1);

  const handleClick = (id: number) => {
    setSelectedId(id);
    const eventInstance = props.eventInstances.find((obj) => {
      return obj.event_instance_id === id;
    });
    console.log(eventInstance);
    if (props.eventInstanceSelected) props.eventInstanceSelected(eventInstance);
    console.log(selectedId);
  };
  console.log(props.eventInstances);

  return (
    <select id='select-time' defaultValue={0} onChange={((ev: React.ChangeEvent<HTMLSelectElement>): void => (handleClick(parseFloat(ev.target.value))))} className='py-4 bg-zinc-700/50 text-white p-5 mt-5 mb-3 rounded-xl'>
      <option disabled selected={props.check === 'selectTime'}>select time</option>
      {props.eventInstances.map((s) =>
        <option key={s.event_instance_id} value={s.event_instance_id} >
          {format(new Date(s.date), 'hh:mm a')}
          {console.log(s.date)}
        </option>,
      )}
    </select>
  );
};

export default EventInstanceSelect;

