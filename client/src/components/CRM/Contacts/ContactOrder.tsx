import React, {ReactElement} from 'react';
import {toDateStringFormat} from '../../Ticketing/ticketingmanager/Event/components/util/EventsUtil';
import format from 'date-fns/format';
import {toDollarAmount} from '../../../utils/arrays';

interface ContactOrderProps {
  orderId: number;
  orderTotal: number;
  orderDate: string;
  orderTime: string;
  refundIntent: string;
  orderItems: any[];
  donation?: any;
}

const ContactOrder = (props: ContactOrderProps): ReactElement => {
  const {
    orderId,
    orderTotal,
    orderDate,
    orderTime,
    refundIntent,
    orderItems,
    donation,
  } = props;

  const date = new Date(
    `${toDateStringFormat(orderDate)}T${orderTime.split('T')[1].slice(0, 8)}`,
  );

  return (
    <section className='w-full bg-white shadow-lg border border-zinc-300 rounded-lg mb-4 p-5 text-zinc-600'>
      <header className='flex gap-2 items-start justify-between mb-4'>
        <h2 className='text-2xl font-semibold'>Order {orderId}</h2>
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
      <div className='grid md:grid-cols-2'>
        <article>
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
            <span>{refundIntent ? 'Yes' : 'No'}</span>
          </p>
        </article>
        <aside>
          {orderItems.length === 0 && !donation && (
            <p className='text-center text-md mt-1 w-full text-zinc-400 font-medium'>
              No order items or donation
            </p>
          )}
          {orderItems.map((item, index) => (
            <TicketOrderItem
              key={index}
              price={item.price}
              ticketType={item.tickettype}
              quantity={item.quantity}
              description={item.description}
              seasonName={item.seasonname}
              detail={item.detail}
              eventDate={item.eventdate}
              eventTime={item.eventtime}
            />
          ))}
          {donation && (
            <DonationOrderItem
              amount={donation.amount}
              refundIntent={donation.refund_intent}
            />
          )}
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
  ticketType: string;
  quantity: number;
  description: string;
  seasonName?: string;
  detail?: string;
  eventDate: string;
  eventTime: string;
}

const TicketOrderItem = (props: TicketOrderItem): ReactElement => {
  const {
    price,
    ticketType,
    quantity,
    description,
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
      <p className='flex justify-between'>
        <span className='font-bold'>
          {quantity} x {description}
          {seasonName && (
            <span className='font-normal italic'> - {seasonName}</span>
          )}
        </span>
        <span className='font-bold'>{toDollarAmount(Number(price))}</span>
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
  refundIntent: string;
}

const DonationOrderItem = (props: DonationOrderItem): ReactElement => {
  const {amount, refundIntent} = props;

  return (
    <article className='border border-zinc-300 px-4 py-3 rounded-xl mb-2'>
      <p className='flex justify-between font-bold'>
        <span>Donation</span>
        <span className='flex items-center gap-2'>
          {refundIntent && (
            <span className='py-1 px-2 text-xs text-white bg-orange-500 shadow-sm rounded-md'>
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
