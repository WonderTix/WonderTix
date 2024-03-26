import {EventImage} from '../../../../utils/imageURLValidation';
import React from 'react';
import {Popper} from '@mui/material';
import {getDate} from '../../ticketingmanager/Event/components/ShowingUtils';
import format from 'date-fns/format';
import Label from '../../Label';
import {SubscriptionEvent} from './SubscriptionPurchaseUtils';

export const CarousalEvent = (props: {
  event: SubscriptionEvent;
  anchor: HTMLElement | null;
  setAnchor: (value) => void;
}) => {
  const {event, anchor, setAnchor} = props;
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <article className='flex flex-col overflow-auto sm:w-[30rem] md:w-[35rem] md:flex-row md:h-full lg:w-[40rem] rounded-2xl bg-zinc-900/80 shadow-lg'>
        <EventImage
          className='md:w-[14rem] h-40 md:h-auto object-cover rounded-t-lg md:rounded-lg'
          src={event.imageurl}
          title={event.eventname}
        />
        <div className='flex-auto flex flex-col items-center justify-center p-3 text-zinc-200 text-md'>
          <h3 className='w-full text-xl font-semibold mb-5 flex flex-col items-center'>
            <span className='text-center'>
              {event.eventname}
            </span>
            {event.startdate && (
              <>
                <span className='italic flex flex-row gap-1 text-gray-200 text-base mb-1'>
                  <span>{format(getDate(event.startdate), 'MM/dd/yyyy')}</span>-
                  <span>{format(getDate(event.enddate), 'MM/dd/yyyy')}</span>
                </span>
                {event.eventinstances.length && (
                  <button
                    className='text-sm bg-blue-500 hover:bg-blue-600 rounded-2xl py-1 px-2 m-1'
                    onClick={(event) =>
                      setAnchor(anchor ? null : event.currentTarget)
                    }
                  >
                    show times
                  </button>
                )}
              </>
            )}
            {!event.subscriptioneligible && (
              <Label color='red' className='mt-2 text-base text-center'>
                NOT INCLUDED IN SUBSCRIPTION
              </Label>
            )}
          </h3>
          <p className='text-center mb-6'>{event.eventdescription}</p>
        </div>
      </article>
      {anchor && (
        <Popper open={!!anchor} anchorEl={anchor}>
          <ul className='bg-white px-4 py-2 rounded-xl max-h-[150px] m-1 overflow-scroll'>
            {event.eventinstances.map((instance) => (
              <li key={instance.eventinstanceid}>
                {format(
                  getDate(instance.eventdate, instance.eventtime),
                  'MM/dd/yyyy hh:mm aa',
                )}
              </li>
            ))}
          </ul>
        </Popper>
      )}
    </div>
  );
};
