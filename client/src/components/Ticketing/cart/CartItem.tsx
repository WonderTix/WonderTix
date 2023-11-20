import React, {useState, useEffect, ReactElement} from 'react';
import {
  editItemQty,
  CartItem,
} from '../ticketingmanager/ticketing/ticketingSlice';
import {useAppDispatch} from '../app/hooks';
import {toDollarAmount} from '../../../utils/arrays';
import {getImageDefault} from '../../../utils/imageURLValidation';

interface CartRowProps {
  item: CartItem;
  removeHandler: (eventInstanceId: number, ticketTypeId: number) => void;
}

/**
 * Entire thing is meant to handle increments and decrements in prices and item qty
 *
 * @param {CartItem} item
 * @param {func} removeHandler
 * @returns {ReactElement}
 */
const CartRow = ({item, removeHandler}: CartRowProps): ReactElement => {
  const dispatch = useAppDispatch();
  const [cost, setCost] = useState(item.price * item.qty);

  useEffect(() => setCost(item.qty * item.price), [item.qty]);

  const handleDecrement = () => {
    if (item.qty > 1) {
      dispatch(editItemQty({id: item.product_id, tickettypeId: item.typeID, qty: item.qty - 1}));
    } else {
      removeHandler(item.product_id, item.typeID);
    }
  };

  const handleIncrement = () => {
    dispatch(editItemQty({id: item.product_id, tickettypeId: item.typeID, qty: item.qty + 1}));
  };

  return (
    <div
      className='w-full h-40 rounded-xl bg-cover'
      style={{
        backgroundImage: `url(${getImageDefault(
          item.product_img_url,
        )}),url(${getImageDefault()})`,
      }}
    >
      <div className='flex flex-col md:flex-row justify-center md:justify-between items-center gap-5 p-5 h-full rounded-xl text-white bg-zinc-900/90'>
        <div>
          <p className='font-semibold'>{item.name}</p>
          <p className='text-zinc-200'>{item.desc}</p>
        </div>
        <div className='flex items-center gap-7'>
          <div className='flex items-center gap-2'>
            <button
              aria-label={`Remove one ${item.name} from cart`}
              onClick={handleDecrement}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            <p>{item.qty}</p>
            <button
              aria-label={`Add one ${item.name} to cart`}
              onClick={handleIncrement}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          <p className='font-semibold'>
            {item.payWhatCan
              ? toDollarAmount(item.payWhatPrice)
              : toDollarAmount(cost)}
          </p>
          <button
            aria-label={`Remove ${item.name} from cart`}
            onClick={() => removeHandler(item.product_id, item.typeID)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartRow;
