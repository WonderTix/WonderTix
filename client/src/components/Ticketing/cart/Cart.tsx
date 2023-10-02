import React, {useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import CartRow from './CartItem';
import {toDollarAmount} from '../../../utils/arrays';
import {
  removeTicketFromCart,
  removeAllTicketsFromCart,
  selectCartContents,
  selectDiscount,
  fetchDiscountData,
  removeDiscountFromCart,
  DiscountItem,
} from '../ticketingmanager/ticketing/ticketingSlice';
import {useNavigate} from 'react-router-dom';

/**
 * @param {Item} price: number, qty: number
 * @param {Function} itemCost - item: Item, item.price * item.qty
 * @param {Function} subtotalReducer - acc: number, item: Item, acc + itemCost(item)
 * @param {Function} totalReducer - subtotal: number, discount: DiscountItem
 */
type Item = {
  price: number;
  qty: number;
  payWhatCan: boolean;
  payWhatPrice?: number;
};
const itemCost = (item: Item) => item.price * item.qty;
const subtotalReducer = (acc: number, item: Item) => {
  if (!item.payWhatCan) {
    return acc + itemCost(item);
  } else {
    return acc + item.payWhatPrice;
  }
};
const totalReducer = (subtotal: number, discount: DiscountItem) => {
  const total = subtotal * (1 - discount.percent / 100) - discount.amount;
  return total < 0 ? 0 : total;
};

/**
 * Cart handler on clicks, resets and complete orders
 *
 * @returns {ReactElement}
 */
const Cart = () => {
  const history = useNavigate();
  const navigate = useNavigate();

  enum RemoveContext {
    single,
    all,
  }

  const [show, setShow] = useState(false);
  const handleClick2 = () => setShow(!show);
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartContents);
  const subtotal = items.reduce(subtotalReducer, 0);
  const [, setModalOpen] = useState(false);
  const [targetItem, setTargetItem] = useState<number | null>(null);
  const [removeContext, setRemoveContext] = useState(RemoveContext.single);
  const [removeContextMessage, setRemoveContextMessage] = useState('');
  const [discountText, setDiscountText] = useState<string | null>(null);
  const [validDiscount, setValidDiscount] = useState(false);
  const [discountClicked, setDiscountClicked] = useState(false);
  const discount = useAppSelector(selectDiscount);
  const total = totalReducer(subtotal, discount);

  useEffect(() => {
    if (discount.code !== '') {
      setValidDiscount(true);
      setDiscountClicked(false);
    } else setValidDiscount(false);
  });

  const resetModal = () => {
    setTargetItem(null);
    handleClick2();
  };

  const handleRemove = () => {
    if (removeContext === RemoveContext.single) {
      if (targetItem) {
        dispatch(removeTicketFromCart(targetItem));
        resetModal();
      }
    } else if (removeContext === RemoveContext.all) {
      dispatch(removeAllTicketsFromCart());
      resetModal();
    }
  };

  const removeAllCartItems = () => {
    setRemoveContext(RemoveContext.all);
    setRemoveContextMessage('all items');
    handleClick2();
  };

  const printDiscountText = (disc: DiscountItem) => {
    if (disc.code === '') return;

    if (disc.amount === 0) {
      return disc.percent + '% discount';
    } else {
      return '$' + disc.amount + ' discount';
    }
  };

  /**
   * Searches for (and applies if found) discount code based on user input
   */
  async function applyDiscount() {
    await dispatch(fetchDiscountData(discountText));
    setDiscountClicked(true);
  }

  const removeDiscount = () => {
    setValidDiscount(false);
    setDiscountClicked(false);
    setDiscountText('');
    dispatch(removeDiscountFromCart());
  };

  const displayModal = (id: number) => {
    setRemoveContext(RemoveContext.single);
    setRemoveContextMessage('this');
    setTargetItem(id);
    handleClick2();
  };

  const navigateToCompleteOrder = () => {
    history('/completeorder');
  };

  return (
    <div className='flex flex-col items-center h-full py-[5rem] px-[1rem] tab:px-[5rem] bg-zinc-200'>
      <div className='w-full mb-5'>
        <button
          onClick={() => navigate('/')}
          className='bg-blue-500 mt-10 hover:bg-blue-600 px-3 py-2 rounded-xl flex flex-row items-center text-zinc-100'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
              clipRule='evenodd'
            />
          </svg>
          back to Events
        </button>
      </div>
      <h1 className='flex items-center mt-2 gap-2 text-zinc-800'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
            aria-hidden='true'
          />
        </svg>
        <span className='text-3xl font-bold'>My Cart</span>
      </h1>
      <div className='flex flex-col md:flex-row gap-10 md:gap-5 mt-14 md:mt-20 items-center w-full h-full'>
        <div className='w-full bg-zinc-300 p-5 tab:p-9 flex flex-col gap-5 items-start rounded-xl'>
          {items.length > 0 ? (
            items.map((data) => (
              <CartRow
                key={data.product_id}
                item={data}
                removeHandler={displayModal}
              />
            ))
          ) : (
            <p className='text-zinc-500'>There&apos;s nothing in your cart</p>
          )}
        </div>
        <div className='md:w-[30rem] w-full bg-zinc-900 p-9 flex flex-col items-center rounded-xl justify-between'>
          <div className='flex flex-col items-center mb-3'>
            <p className='text-zinc-100 text-xl font-semibold'>Subtotal</p>
            <p className='text-amber-300 italic'>
              {printDiscountText(discount)}
            </p>
            <p className='text-white'>{toDollarAmount(total)}</p>
          </div>
          <div className='flex flex-col items-center gap-3'>
            <div className='flex flex-col items-center form-control disabled:opacity-50'>
              {!validDiscount && discountClicked ? (
                <p className='text-amber-300 italic'>Invalid discount code</p>
              ) : (
                ''
              )}
              <div className='input-group flex flex-row items-center w-full px-3 py-1 text-black rounded-xl bg-sky-500'>
                <input
                  type='text'
                  placeholder='Discount code...'
                  className='input input-bordered rounded-md pl-2'
                  value={discountText ? discountText : discount.code}
                  onChange={(e) => {
                    setDiscountText(e.target.value);
                    setDiscountClicked(false);
                  }}
                  disabled={discount.code !== ''}
                />
                {!validDiscount ? (
                  <button
                    className='btn btn-square bg-sky-500 ml-1'
                    onClick={applyDiscount}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    className='btn btn-square bg-sky-500 ml-1'
                    onClick={removeDiscount}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <button
              className='bg-red-600 flex items-center justify-center gap-1 w-full p-3 text-white rounded-xl disabled:opacity-50'
              disabled={items.length === 0}
              onClick={removeAllCartItems}
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
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
              Empty Cart
            </button>
            <button
              className='bg-yellow-600 flex items-center justify-center gap-1 w-full p-3 text-white rounded-xl disabled:opacity-50'
              disabled={items.length === 0}
              onClick={navigateToCompleteOrder}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                  clipRule='evenodd'
                />
              </svg>
              Proceed To Checkout
            </button>
          </div>
          <div
            className={!show ? 'hidden' : 'relative z-10'}
            aria-labelledby='modal-title'
            role='dialog'
            aria-modal='true'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
            <div className='fixed z-10 inset-0 overflow-y-auto'>
              <div className='flex items-end tab:items-center justify-center min-h-full p-4 text-center tab:p-0'>
                <div className='relative w-full bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all tab:my-8 tab:max-w-lg'>
                  <div className='bg-white px-4 pt-5 pb-4 tab:p-6 tab:pb-4'>
                    <div className='tab:flex tab:items-start'>
                      <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 tab:mx-0 tab:h-10 tab:w-10'>
                        <svg
                          className='h-6 w-6 text-red-600'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='2'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                          />
                        </svg>
                      </div>
                      <div className='mt-3 text-center tab:mt-0 tab:ml-4 tab:text-left'>
                        <h3
                          className='text-lg leading-6 font-medium text-gray-900'
                          id='modal-title'
                        >
                          Confirm removal
                        </h3>
                        <p className='text-sm text-gray-500 mt-2'>
                          Do you want to remove {removeContextMessage} from your
                          cart?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 tab:px-6 tab:flex tab:flex-row-reverse'>
                    <button
                      onClick={handleRemove}
                      type='button'
                      className='w-full inline-flex justify-center rounded-md border border-transparent
              shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                tab:ml-3 tab:w-auto tab:text-sm'
                    >
                      Yes
                    </button>
                    <button
                      onClick={resetModal}
                      type='button'
                      className='mt-3 w-full inline-flex
              justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base
              font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500 tab:mt-0 tab:ml-3 tab:w-auto tab:text-sm'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
