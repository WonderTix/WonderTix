import React, {ReactElement, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {EventRow} from './utils/adminCommon';
import {getDiscountCode} from './utils/adminApiRequests';
import {HelpIcon, SearchIcon, XIcon} from '../../Icons';
import {Tooltip} from '@mui/material';

/**
 * Math to dollar - `$${(Math.round(x * 100) / 100).toFixed(2)}`
 *
 * @param x
 */
const toDollar = (x: number) => `$${x.toFixed(2)}`;

interface AdminCartProps {
  backButtonRoute: string;
  eventDataFromPurchase: EventRow[];
  onDiscountChange: (discount: any) => void;
}

/**
 *
 * @param AdminCartProps
 * @param AdminCartProps.backButtonRoute
 * @param AdminCartProps.eventDataFromPurchase
 * @param AdminCartProps.onDiscountChange
 * @returns {ReactElement}
 */
const AdminCart = ({
  backButtonRoute,
  eventDataFromPurchase,
  onDiscountChange,
}: AdminCartProps): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountText, setDiscountText] = useState(null);
  const [discountClicked, setDiscountClicked] = useState(false);

  const cartItems = location.state?.cartItems || [];

  const itemsInCart = cartItems.map((item, index) => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return (
      <p
        key={index}
        className='flex flex-row flex-wrap bg-gradient-to-b from-zinc-700 px-5 pt-3 pb-4 rounded-xl mb-5'
      >
        <span className='flex-1 text-left font-bold'>
          {item.qty} x {item.name}
        </span>
        <span className='flex-1 text-right font-bold'>
          {toDollar(item.price)}
        </span>
        <span className='w-full text-left text-xs'>
          {`${item.desc} - ${formattedDate} - ${formattedTime}`}
        </span>
      </p>
    );
  });

  const subtotal = cartItems.reduce((total, item) => {
    const ticketPrice = item.qty * item.price;
    return total + ticketPrice;
  }, 0);

  const fee = cartItems.reduce((acc, item) => acc + item.fee, 0);

  const getDiscountTotal = () => {
    if (appliedDiscount) {
      if (appliedDiscount.amount && appliedDiscount.percent) {
        return Math.min(
          (+appliedDiscount.percent / 100) * subtotal,
          appliedDiscount.amount,
        );
      } else if (appliedDiscount.amount) {
        return Math.min(subtotal, appliedDiscount.amount);
      } else {
        return (+appliedDiscount.percent / 100) * subtotal;
      }
    } else {
      return 0;
    }
  };

  const getTotal = () => {
    const discount = getDiscountTotal();
    return subtotal - discount + fee;
  };

  const validateDiscountCode = (discount) => {
    const eventIds = new Set<number>();
    cartItems.forEach((item) => eventIds.add(item.eventId));
    const numEventsInCart = eventIds.size;

    const totalCartTicketCount = cartItems.reduce((tot, item) => {
      return tot + item.qty;
    }, 0);

    return !(
      discount.min_events > numEventsInCart ||
      discount.min_tickets > totalCartTicketCount
    );
  };

  const handleApplyDiscount = async () => {
    const discount = await getDiscountCode(discountText);
    if (discount) {
      const valid = validateDiscountCode(discount);
      if (valid) {
        setAppliedDiscount(discount);
        onDiscountChange(discount);
      }
    }
    setDiscountClicked(true);
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    onDiscountChange(null);
    setDiscountText(null);
    setDiscountClicked(false);
  };

  return (
    <div className='flex flex-col justify-between h-full w-full'>
      <section className='flex flex-col items-center w-full mb-5'>
        <h2 className='text-zinc-100 text-2xl font-bold'>Your order</h2>
        <div className='text-zinc-100 mt-10 w-full'>
          {itemsInCart.length > 0 ? itemsInCart : <p>Your cart is Empty</p>}
        </div>
        <button
          onClick={() =>
            navigate(backButtonRoute, {state: {eventDataFromPurchase}})
          }
          className='bg-green-600 px-3 py-1 text-sm hover:bg-green-700 text-white rounded-xl mt-4'
        >
          Add more items
        </button>
      </section>
      <section className='flex flex-col items-center gap-2 bg-zinc-800 rounded-xl px-5 py-3'>
        <div
          className={`bg-zinc-700 flex items-center justify-center gap-1 p-1 rounded-lg shadow-md w-full
          ${appliedDiscount && 'bg-zinc-800 border-2 border-zinc-900'}`}
        >
          <input
            type='text'
            placeholder='Discount code...'
            aria-label='Discount code'
            className='p-1 px-2 w-full rounded-md text-zinc-100 bg-zinc-700 disabled:bg-zinc-800'
            value={
              discountText
                ? discountText
                : appliedDiscount
                ? appliedDiscount.code
                : ''
            }
            onChange={(e) => {
              setDiscountText(e.target.value);
              setDiscountClicked(false);
            }}
            disabled={appliedDiscount}
          />
          {!appliedDiscount ? (
            <button
              className='p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300 justify-end rounded-full'
              onClick={handleApplyDiscount}
              aria-label='Apply discount code'
            >
              <SearchIcon className='h-5 w-5' strokeWidth={3} />
            </button>
          ) : (
            <button
              className='p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300 justify-end rounded-full'
              onClick={handleRemoveDiscount}
              aria-label='Remove discount code'
            >
              <XIcon className='h-5 w-5' strokeWidth={3} />
            </button>
          )}
        </div>
        {discountClicked &&
          (!appliedDiscount ? (
            <p className='bg-amber-400 text-sm font-medium text-zinc-900 rounded-md px-3'>
              Invalid Discount Code
            </p>
          ) : (
            <p className='flex items-center gap-2 justify-between w-full'>
              <span className='text-zinc-100 text-sm'>Discount</span>
              <span className='text-amber-300 text-lg font-bold'>
                {toDollar(getDiscountTotal())}
              </span>
            </p>
          ))}
        <p className='flex flex-row items-center gap-2 justify-between w-full'>
          <span className='flex items-center gap-1 text-zinc-100 text-sm'>
            Fee
          </span>
          <span className='text-white text-lg font-bold'>{toDollar(fee)}</span>
        </p>
        <p className='flex items-center gap-2 justify-between w-full'>
          <span className='text-zinc-100 text-sm'>Total</span>
          <span className='text-white text-lg font-bold'>
            {toDollar(getTotal())}
          </span>
        </p>
      </section>
    </div>
  );
};

export default AdminCart;
