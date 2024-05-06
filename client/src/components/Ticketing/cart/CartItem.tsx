import React, {useState, useEffect, ReactElement} from 'react';
import {
  editItemQty,
  editSubscriptionQty,
  isTicketCartItem,
  removeSubscriptionFromCart,
  removeTicketFromCart,
  SubscriptionCartItem,
  TicketCartItem,
} from '../ticketingmanager/ticketingSlice';
import {useAppDispatch} from '../app/hooks';
import {
  getEventImageDefault,
  getSeasonImageDefault,
} from '../../../utils/imageURLValidation';
import {formatUSD} from '../ticketingmanager/RefundOrders/RefundOrders';
import Label from '../Label';

interface CartRowProps {
  item: TicketCartItem | SubscriptionCartItem;
  removeHandler: () => void;
  availability: number;
  setPopUp: (value: boolean) => void;
}

/**
 * Entire thing is meant to handle increments and decrements in prices and item qty
 *
 * @param {TicketCartItem | SubscriptionCartItem} item
 * @param {func} removeHandler
 * @param {func} setPopUp
 * @param {number} availability
 * @returns {ReactElement}
 */
const CartRow = ({
  item,
  removeHandler,
  availability,
  setPopUp,
}: CartRowProps): ReactElement => {
  const dispatch = useAppDispatch();
  const [quantityAdjusted, setQuantityAdjusted] = useState(false);
  const [cost, setCost] = useState(
    isTicketCartItem(item) && item.payWhatPrice
      ? item.payWhatPrice
      : item.price * item.qty,
  );
  const isTicketItem = isTicketCartItem(item);

  useEffect(() => {
    if (availability > 0 && availability < item.qty) {
      setQuantityAdjusted(true);
      handleUpdateQuantity(availability - item.qty);
    } else if (availability === 0) {
      if (isTicketItem) {
        dispatch(
          removeTicketFromCart({
            id: item.product_id,
            tickettypeId: item.typeID,
          }),
        );
      } else {
        dispatch(removeSubscriptionFromCart({...item}));
      }
      setPopUp(true);
    }
  }, []);

  useEffect(
    () =>
      setCost(
        isTicketItem && item.payWhatPrice
          ? item.payWhatPrice
          : item.price * item.qty,
      ),
    [item.qty],
  );

  const getImage = isTicketItem
    ? getEventImageDefault
    : getSeasonImageDefault;

  const handleUpdateQuantity = (update: number) => {
    const updatedQty = item.qty + update;
    if (updatedQty < 1) {
      removeHandler();
    } else if (isTicketItem) {
      dispatch(
        editItemQty({
          id: item.product_id,
          tickettypeId: item.typeID,
          qty: updatedQty,
        }),
      );
    } else {
      dispatch(
        editSubscriptionQty({
          ...item,
          qty: updatedQty,
        }),
      );
    }
  };

  return (
    <div
      className='w-full h-45 rounded-xl bg-cover'
      style={{
        backgroundImage: `url(${getImage(
          item.product_img_url,
        )}),url(${getImage()})`,
      }}
    >
      <div
        data-testid='cart-item-card'
        className='flex flex-col md:flex-row justify-center md:justify-between items-center gap-5 p-5 h-full rounded-xl text-white bg-zinc-900/90'
      >
        <div>
          <p className='font-semibold'>{item.name}</p>
          <p className='text-zinc-200'>{item.desc}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-7'>
            <div className='flex items-center gap-2'>
              <button
                className='enabled:hover:text-gray-300'
                data-testid='decrement-item'
                aria-label={`Remove one ${item.name} from cart`}
                onClick={() => handleUpdateQuantity(-1)}
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
              <p data-testid='item-quantity'>{item.qty}</p>
              <button
                className='enabled:hover:text-gray-300'
                data-testid='increment-item'
                aria-label={`Add one ${item.name} to cart`}
                onClick={() => handleUpdateQuantity(1)}
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
            <p data-testid='card-item-subtotal' className='font-semibold'>
              {formatUSD(cost)}
            </p>
            <button
              className='enabled:hover:text-gray-300'
              data-testid='remove-item'
              aria-label={`Remove ${item.name} from cart`}
              onClick={removeHandler}
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
          {quantityAdjusted && (
            <Label color='red' className='px-0.5 py-1'>
              QUANTITY ADJUSTED
            </Label>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartRow;
