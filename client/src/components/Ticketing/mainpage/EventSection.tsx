import React, {ReactElement} from 'react';
import {EventCard} from './EventCard';
import {Event} from '../ticketingmanager/ticketingSlice';

interface EventSectionProps {
  title: string;
  events: Event[];
}

/**
 * An EventSection is a section of the Hero that contains events under a
 * particular category.
 *
 * @param {EventSectionProps} props
 * @param {string} props.title - title of the section
 * @param {Event[]} props.events - events in the section
 * @returns {ReactElement} EventSection
 */
const EventSection = (props: EventSectionProps): ReactElement => {
  const {title, events} = props;

  return (
    <section className='mx-8'>
      <h2
        className='text-4xl text-zinc-100 font-bold mb-10 drop-shadow-lg relative
        after:content=[""] after:h-[1px] after:absolute after:w-full after:bg-zinc-200 after:inline-block after:left-0 after:bottom-[-0.45em]'
      >
        {title}
      </h2>
      <div className='grid md:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-x-7 gap-y-10'>
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </section>
  );
};

export default EventSection;
