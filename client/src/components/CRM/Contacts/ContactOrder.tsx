import React, {ReactElement} from 'react';
import {toDateStringFormat} from '../../Ticketing/ticketingmanager/Event/components/util/EventsUtil';
import {departmentOptions} from '../../Ticketing/ticketingmanager/AdminPurchase/utils/adminCommon';
import format from 'date-fns/format';
import {toDollarAmount} from '../../../utils/arrays';
import {TicketIcon} from '../../Ticketing/Icons';
import Label from '../../Ticketing/Label';
import {readableOrderSource} from '../../Ticketing/checkout/CheckoutUtils';

interface ContactOrderProps {
  orderId: number;
  orderTotal: number;
  feeTotal: number;
  discountTotal: number;
  orderDateTime: string;
  refunded: string;
  orderItems: any[];
  donation: any;
  orderSource?: string;
}

const ContactOrder = (props: ContactOrderProps): ReactElement => {
  const {
    orderId,
    orderTotal,
    feeTotal,
    discountTotal,
    orderDateTime,
    refunded,
    orderItems,
    donation,
    orderSource,
  } = props;

  const date = new Date(orderDateTime);

  return (
    <section className='w-full bg-white shadow-lg border border-zinc-300 rounded-lg mb-4 p-5 text-zinc-700'>
      <header className='flex gap-2 items-start justify-between mb-4 text-zinc-800'>
        <h2 className='text-2xl font-medium'>Order #{orderId}</h2>
        <TicketIcon className='h-7 w-7' strokeWidth={2} />
      </header>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <article className='tab:col-span-2'>
          <p className='flex justify-between tab:justify-start gap-3 text-lg'>
            <span className='tab:flex-initial tab:w-28 text-zinc-600'>
              Order Date
            </span>
            <span className='text-zinc-800'>
              {format(date, 'MMM dd, yyyy')}
            </span>
          </p>
          <p className='flex justify-between tab:justify-start gap-3 text-lg mt-1'>
            <span className='tab:flex-initial tab:w-28 text-zinc-600'>
              Order Time
            </span>
            <span className='text-zinc-800'>{format(date, 'h:mm a')}</span>
          </p>
          {orderSource && (
            <p className='flex justify-between tab:justify-start gap-3 text-lg mt-1'>
              <span className='tab:flex-initial tab:w-28 text-zinc-600'>
                Order Source
              </span>
              <span className='text-zinc-800'>
                {readableOrderSource[orderSource]}
              </span>
            </p>
          )}
          <p className='flex justify-between tab:justify-start gap-3 text-lg mt-1 mb-3'>
            <span className='tab:flex-initial tab:w-28 text-zinc-600'>
              Refunded
            </span>
            <span className='text-zinc-800'>{refunded ? 'Yes' : 'No'}</span>
          </p>
        </article>
        <aside className='col-span-3'>
          {!orderItems && !donation && (
            <p className='text-center text-md mt-1 w-full text-zinc-400 font-medium'>
              No order items or donation
            </p>
          )}
          {orderItems.map((item, index) =>
            item.tickettype ? (
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
                department={item.department}
              />
            ) : (
              <SubscriptionOrderItem key={index} {...item} />
            ),
          )}
          {donation && (
            <DonationOrderItem
              amount={donation.amount}
              refunded={donation.refunded}
            />
          )}
        </aside>
      </div>
      <footer className='mt-3'>
        {discountTotal !== 0 && (
          <p className='flex'>
            <span className='tab:flex-initial tab:w-32 w-full text-lg'>
              Discount:
            </span>
            <span className='font-medium text-lg text-zinc-800'>
              {toDollarAmount(Number(discountTotal))}
            </span>
          </p>
        )}
        {feeTotal !== 0 && (
          <p className='flex'>
            <span className='tab:flex-initial tab:w-32 w-full text-lg'>
              Fee:
            </span>
            <span className='font-medium text-lg text-zinc-800'>
              {toDollarAmount(Number(feeTotal))}
            </span>
          </p>
        )}
        <p className='flex'>
          <span className='tab:flex-initial tab:w-32 w-full text-lg'>
            Order Total:
          </span>
          <span className='font-medium text-lg text-zinc-800'>
            {toDollarAmount(Number(orderTotal))}
          </span>
        </p>
      </footer>
    </section>
  );
};

interface TicketOrderItem {
  price: number;
  refunded: number;
  ticketType: string;
  quantity: number;
  eventName: string;
  seasonName?: string;
  detail?: string;
  eventDate: string;
  eventTime: string;
  department?: string;
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
    department,
  } = props;

  const time = new Date(
    `${toDateStringFormat(eventDate)}T${eventTime.split('T')[1].slice(0, 8)}`,
  );

  return (
    <article className='border border-zinc-300 px-4 pt-3 pb-4 rounded-xl mb-2'>
      <p className='flex justify-between items-start font-bold gap-2 leading-none mt-0.5 mb-1'>
        <span>
          {quantity} x {eventName}
          {seasonName && (
            <>
              {' '}
              • <span className='font-normal italic text-sm'>{seasonName}</span>
            </>
          )}
        </span>
        <span className='flex items-center gap-2'>
          {refunded > 0 && (
            <Label className='text-[0.7rem]' color='green'>
              {refunded < quantity? `${refunded} of ${quantity} REFUNDED`: 'FULLY REFUNDED'}
            </Label>
          )}
          {department ? (
            <Label className='text-[0.7rem]' color='slate'>
              {`${departmentOptions[department].toUpperCase()} COMP`}
            </Label>
          ) : (
            toDollarAmount(Number(price))
          )}
        </span>
      </p>
      <p className='text-xs'>
        {ticketType} • {format(time, 'MMM dd, yyyy • h:mm a')}
        {detail && <> ({detail})</>}
      </p>
    </article>
  );
};

interface SubscriptionOrderItemProps {
  price: number;
  refunded: number;
  subscriptionType: string;
  seasonName: string;
  ticketlimit: number;
  quantity: number;
}
const SubscriptionOrderItem = (
  props: SubscriptionOrderItemProps,
): ReactElement => {
  const {price, refunded, seasonName, ticketlimit, quantity, subscriptionType} =
    props;

  return (
    <article className='border border-zinc-300 px-4 pt-3 pb-4 rounded-xl mb-2'>
      <p className='flex justify-between items-start font-bold gap-2 leading-none mt-0.5 mb-1'>
        <span>
          {quantity} x {subscriptionType} Subscription
        </span>
        <span className='flex items-center gap-2'>
          {refunded > 0 && (
            <Label className='text-[0.7rem]' color='green'>
              {refunded < quantity? `${refunded} of ${quantity} REFUNDED`: 'FULLY REFUNDED'}
            </Label>
          )}
          {toDollarAmount(Number(price))}
        </span>
      </p>
      <p className='text-xs'>
        {ticketlimit} tickets for {seasonName}
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
      <p className='flex justify-between items-start font-bold gap-2 leading-none mt-0.5 mb-1'>
        <span>Donation</span>
        <span className='flex items-center gap-2'>
          {refunded && (
            <Label className='text-[0.7rem]' color='green'>
              REFUNDED
            </Label>
          )}
          {toDollarAmount(Number(amount))}
        </span>
      </p>
    </article>
  );
};

export default ContactOrder;
