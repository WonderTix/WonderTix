import React, {useState} from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import ActivenessGroupToggle from '../../ActivenessGroupToggle';
import PurchaseOption from './PurchaseOption';
import Event from './Event';
import {FormikProps, FormikValues} from 'formik';
import {EventImage} from '../../../../utils/imageURLValidation';
import {ProviderEvent} from './ticketExchangeTypes';

const eventFilter = (
  event: ProviderEvent,
  status: 'active' | 'inactive' | 'all',
) => {
  switch (status) {
    case 'active':
      return event.active;
    case 'inactive':
      return !event.active;
    case 'all':
      return true;
  }
};

const Events: React.FC = () => {
  const {events} = useTicketExchangeContext();
  const [activeFilter, setActiveFilter] = useState<
    'active' | 'inactive' | 'all'
  >('active');

  if (!events || !events.length) {
    return <p className='w-ful text-center mt-4'>NO AVAILABLE TICKETS</p>;
  }

  return (
    <ul className='w-full flex flex-col gap-2 items-center p-3'>
      <li className='flex justify-end w-full'>
        <ActivenessGroupToggle
          defaultValue='active'
          handleFilterChange={setActiveFilter}
          className='mb-0'
        />
      </li>
      {
        events.reduce((acc, event, index) => {
          if (eventFilter(event, activeFilter)) {
            acc.push(
              <PurchaseOption
                key={index}
                title={event.eventname}
                subTitle={event.seasons?.name}
                image={
                  <EventImage
                    src={event.imageurl}
                    title={event.eventname}
                    className='h-[80px] w-[60px] object-cover object-left-top rounded-lg'
                  />
                }
                Form={(props: {
                  open: boolean;
                  formRef: React.MutableRefObject<FormikProps<FormikValues>>;
                  setDisabled: (value: any) => void;
                }) => (
                  <Event
                    {...event}
                    {...props}
                  />
                )}
                id={event.eventid}
              />,
            );
          }
          return acc;
        }, [])}
    </ul>
  );
};

export default Events;
