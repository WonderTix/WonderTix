import React, {ReactElement} from 'react';
import {toDateStringFormat} from '../../Ticketing/ticketingmanager/Event/components/util/EventsUtil';
import format from 'date-fns/format';
import {toDollarAmount} from '../../../utils/arrays';

interface ContactOrderProps {
  orderId: number;
  orderTotal: number;
  orderDateAndTime: string;
  refunded: string;
  orderItems: any[];
  donations: any[];
}

const ContactOrder = (props: ContactOrderProps): ReactElement => {
  const {
    orderId,
    orderTotal,
    orderDateAndTime,
    refunded,
    orderItems,
    donations,
  } = props;

  const date = new Date(orderDateAndTime);

  return (
    <section className='w-full bg-white shadow-lg border border-zinc-300 rounded-lg mb-4 p-5 text-zinc-700'>
      <header className='flex gap-2 items-start justify-between mb-4 text-zinc-800'>
        <h2 className='text-2xl font-medium'>Order #{orderId}</h2>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-7 w-7'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
          />
        </svg>
      </header>
      <div className='grid md:grid-cols-5'>
        <article className='col-span-2'>
          <p className='flex flex-row gap-3 text-lg w-full'>
            <span className='font-semibold'>Order Date:</span>
            <span>{format(date, 'MMM dd, yyyy')}</span>
          </p>
          <p className='flex flex-row gap-3 text-lg mt-1 w-full'>
            <span className='font-semibold'>Order Time:</span>
            <span>{format(date, 'h:mm a')}</span>
          </p>
          <p className='flex flex-row gap-3 text-lg my-1 w-full'>
            <span className='font-semibold'>Refunded:</span>
            <span>{refunded ? 'Yes' : 'No'}</span>
          </p>
        </article>
        <aside className='col-span-3'>
          {!orderItems && !donations && (
            <p className='text-center text-md mt-1 w-full text-zinc-400 font-medium'>
              No order items or donation
            </p>
          )}
          {orderItems.map((item, index) => (
            <TicketOrderItem
              key={index}
              price={item.price}
              refunded={item.refunded}
              ticketType={item.tickettype}
              quantity={item.quantity}
              eventName={item.eventname}
              seasonName={item.seasonname}
              detail={item.detail}
              eventDate={item.eventdate}
              eventTime={item.eventtime}
            />
          ))}
          {donations.map((donation, index) => (
            <DonationOrderItem
              key={index}
              amount={donation.amount}
              refunded={donation.refunded}
            />
          ))}
        </aside>
      </div>
      <footer>
        <p className='flex flex-row gap-3 text-xl mt-2 w-full'>
          <span className='font-semibold'>Order Total:</span>
          <span>{toDollarAmount(Number(orderTotal))}</span>
        </p>
      </footer>
    </section>
  );
};

interface TicketOrderItem {
  price: number;
  refunded: boolean;
  ticketType: string;
  quantity: number;
  eventName: string;
  seasonName?: string;
  detail?: string;
  eventDate: string;
  eventTime: string;
}

const TicketOrderItem = (props: TicketOrderItem): ReactElement => {
  const {
    price,
    refunded,
    ticketType,
    quantity,
    eventName,
    seasonName,
    detail,
    eventDate,
    eventTime,
  } = props;

  const time = new Date(
    `${toDateStringFormat(eventDate)}T${eventTime.split('T')[1].slice(0, 8)}`,
  );

  return (
    <article className='border border-zinc-300 px-4 pt-3 pb-4 rounded-xl mb-2'>
      <p className='flex justify-between font-bold gap-2'>
        <span>
          {quantity} x {eventName}
          {seasonName && (
            <span className='font-normal italic'> - {seasonName}</span>
          )}
        </span>
        <span className='flex items-center gap-2'>
          {refunded && (
            <span className='py-1 px-2 text-xs text-green-800 bg-green-200 shadow-sm rounded-md'>
              REFUNDED
            </span>
          )}
          {toDollarAmount(Number(price))}
        </span>
      </p>
      <p className='text-xs'>
        {ticketType} • {format(time, 'MMM dd, yyyy')} • {format(time, 'h:mm a')}
        {detail && <span> ({detail})</span>}
      </p>
    </article>
  );
};

interface DonationOrderItem {
  amount: string;
  refunded: boolean;
}

const DonationOrderItem = (props: DonationOrderItem): ReactElement => {
  const {amount, refunded} = props;

  return (
    <article className='border border-zinc-300 px-4 py-3 rounded-xl mb-2'>
      <p className='flex justify-between font-bold'>
        <span>Donation</span>
        <span className='flex items-center gap-2'>
          {refunded && (
            <span className='py-1 px-2 text-xs text-green-800 bg-green-200 shadow-sm rounded-md'>
              REFUNDED
            </span>
          )}
          {toDollarAmount(Number(amount))}
        </span>
      </p>
    </article>
  );
};

export default ContactOrder;
