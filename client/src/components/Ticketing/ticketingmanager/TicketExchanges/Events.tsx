import React, {useState} from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import ActivenessGroupToggle from '../../ActivenessGroupToggle';
import PurchaseOption from './PurchaseOption';
import EventInstanceForm from './EventInstanceForm';
import {FormikProps, FormikValues} from 'formik';
import {EventImage} from '../../../../utils/imageURLValidation';
import {ProviderEvent} from './ticketExchangeInterfaces';

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

  if (!events || !events.size) {
    return <p className='w-ful text-center'>NO AVAILABLE TICKETS</p>;
  }

  return (
    <ul className='w-full flex flex-col gap-2 items-center p-3'>
      <li className='flex justify-end w-full'>
        <ActivenessGroupToggle
          defaultValue='active'
          handleFilterChange={setActiveFilter}
          groupClass='mb-0'
        />
      </li>
      {events?.size &&
        Array.from(events).reduce((acc, [, event], index) => {
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
                }) => (
                  <EventInstanceForm
                    {...event}
                    open={props.open}
                    formRef={props.formRef}
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
