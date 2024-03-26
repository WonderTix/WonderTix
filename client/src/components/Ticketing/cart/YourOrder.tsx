import React, {ReactElement} from 'react';
import {useAppSelector} from '../app/hooks';
import {
  selectCartItem,
  selectCartContents,
  selectCartSubtotal,
  selectCartTotal,
  selectDiscount,
} from '../ticketingmanager/ticketingSlice';
import {useNavigate} from 'react-router';
import {selectDonation} from '../ticketingmanager/donationSlice';
import {HelpIcon} from '../Icons';
import {Tooltip} from '@mui/material';

/**
 * Math to dollar - `$${(Math.round(x * 100) / 100).toFixed(2)}`
 *
 * @param x
 */
const toDollar = (x: number) => `$${(Math.round(x * 100) / 100).toFixed(2)}`;

interface YourOrderProps {
  backButtonRoute: string;
}
/**
 * Used to handle your order by using the app selector
 *
 * @param YourOrderProps
 * @param YourOrderProps.backButtonRoute
 * @returns {ReactElement}
 */
const YourOrder = ({backButtonRoute}: YourOrderProps): ReactElement => {
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartContents);
  const donation = useAppSelector(selectDonation);
  const subtotal = useAppSelector(selectCartSubtotal);
  const total = useAppSelector(selectCartTotal);
  const discount = useAppSelector(selectDiscount);

  const lineItems = cartItems.map((item) => (
    <LineItem
      key={`${item.product_id}-${item.typeID}`}
      eventInstanceId={item.product_id}
      ticketTypeId={item.typeID}
      className='bg-gradient-to-b from-zinc-700 px-5 pt-3 pb-4 rounded-xl mb-5'
    />
  ));

  // Add a fee for each non-zero priced item
  const feeTotal = cartItems.reduce((acc, item) =>
    acc + ((item.payWhatCan && item.payWhatPrice ? item.payWhatPrice : item.price) > 0 ? item.fee : 0),
    0,
  );

  return (
    <aside className='flex flex-col justify-between h-full w-full'>
      <div className='flex flex-col items-center w-full mb-5'>
        <h2 className='text-zinc-100 text-2xl font-bold'>Your order</h2>
        <div className='text-zinc-100 mt-10 w-full'>
          {lineItems.length > 0 ? (
            lineItems
          ) : (
            <p className='text-zinc-100 mt-10 w-full'>Your cart is empty</p>
          )}
        </div>
        <button
          onClick={() => navigate(backButtonRoute)}
          className='bg-green-600 px-3 py-1 text-sm hover:bg-green-700 text-white rounded-xl mt-4'
        >
          Add more items
        </button>
      </div>
      <div className='flex flex-col items-center gap-2 bg-zinc-800 rounded-xl px-5 py-3'>
        <p className='flex flex-row items-center gap-2 justify-between w-full'>
          <span className='text-zinc-100 text-sm'>Subtotal</span>
          <span className='text-white text-lg font-bold'>
            {toDollar(subtotal)}
          </span>
        </p>
        {discount.code !== '' && (
          <p className='flex flex-row items-center gap-2 justify-between w-full'>
            <span className='text-zinc-100 text-sm'>Discount</span>
            <span className='text-amber-300 text-lg font-bold'>
              {toDollar(subtotal - total)}
            </span>
          </p>
        )}
        <p className='flex flex-row items-center gap-2 justify-between w-full'>
          <span className='text-zinc-100 text-sm'>Donation</span>
          <span className='text-white text-lg font-bold'>
            {toDollar(donation)}
          </span>
        </p>
        <p className='flex flex-row items-center gap-2 justify-between w-full'>
          <Tooltip
            title='We have to charge a processing fee to cover our costs to our online payment processor'
            placement='top'
            arrow
          >
            <span className='flex items-center gap-1 text-zinc-100 text-sm'>
              Fee
              <HelpIcon className='h-4 w-4' strokeWidth={2} />
            </span>
          </Tooltip>
          <span className='text-white text-lg font-bold'>{toDollar(feeTotal)}</span>
        </p>
        <p className='flex flex-row items-center gap-2 justify-between w-full'>
          <span className='text-zinc-100 text-sm'>Total</span>
          <span className='text-white text-lg font-bold'>
            {toDollar(donation + feeTotal + total)}
          </span>
        </p>
      </div>
    </aside>
  );
};

const LineItem = (props: {
  className: string;
  eventInstanceId: number;
  ticketTypeId: number;
}) => {
  const cartItem = useAppSelector((state) =>
    selectCartItem(state, props.eventInstanceId, props.ticketTypeId),
  );

  return cartItem ? (
    <p className={`${props.className} flex flex-col`}>
      <span className='flex justify-between'>
        <span className='text-left font-bold'>
          {cartItem.qty} x {cartItem.name}
        </span>
        <span className='text-right font-bold'>
          {cartItem.payWhatCan
            ? toDollar(cartItem.payWhatPrice)
            : toDollar(cartItem.qty * cartItem.price)}
        </span>
      </span>
      <span className='text-left text-xs'>{cartItem.desc}</span>
    </p>
  ) : (
    <></>
  );
};

export default YourOrder;
