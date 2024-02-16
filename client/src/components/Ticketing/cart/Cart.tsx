import React, {ReactElement, useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import CartRow from './CartItem';
import PopUp from '../PopUp';
import {toDollarAmount} from '../../../utils/arrays';
import {
  removeTicketFromCart,
  removeAllTicketsFromCart,
  selectCartContents,
  selectDiscount,
  fetchDiscountData,
  removeDiscountFromCart,
  DiscountItem,
  selectCartTotal,
  selectDiscountValue,
  selectCartSubtotal,
} from '../ticketingmanager/ticketingSlice';
import {useNavigate} from 'react-router-dom';

/**
 * TargetItem is the type that can uniquely identify a cartItem
 *
 * @param {number} eventInstanceId is the id of the showing
 * @param {number} ticketTypeId is the id of the ticket's ticket type
 */
type TargetItem = {
  eventInstanceId: number;
  ticketTypeId: number;
};

/**
 * Cart handler on clicks, resets and complete orders
 *
 * @returns {ReactElement}
 */
const Cart = (): ReactElement => {
  enum RemoveContext {
    single,
    all,
  }

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartContents);
  const subtotal = useAppSelector(selectCartSubtotal);
  const total = useAppSelector(selectCartTotal);
  const discount = useAppSelector(selectDiscount);
  const discountValue = useAppSelector(selectDiscountValue);

  const [modalOpen, setModalOpen] = useState(false);
  const [targetItem, setTargetItem] = useState<TargetItem | null>(null);
  const [removeContext, setRemoveContext] = useState(RemoveContext.single);
  const [removeContextMessage, setRemoveContextMessage] = useState('');
  const [discountText, setDiscountText] = useState<string | null>(null);
  const [validDiscount, setValidDiscount] = useState(false);
  const [discountClicked, setDiscountClicked] = useState(false);

  useEffect(() => {
    if (discount.code !== '') {
      setValidDiscount(true);
      setDiscountClicked(false);
    } else setValidDiscount(false);
  });

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setModalOpen(true);
  };

  const resetModal = () => {
    setTargetItem(null);
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  const handleRemove = () => {
    if (removeContext === RemoveContext.single) {
      if (targetItem) {
        dispatch(
          removeTicketFromCart({
            id: targetItem.eventInstanceId,
            tickettypeId: targetItem.ticketTypeId,
          }),
        );
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
    openModal();
  };

  const printDiscountText = (disc: DiscountItem) => {
    if (disc.code === '') return;

    if (!disc.amount || disc.amount === 0) {
      return disc.percent + '% discount';
    } else {
      return `${toDollarAmount(Math.min(discountValue, subtotal))} discount`;
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
    setDiscountText(null);
    dispatch(removeDiscountFromCart());
  };

  const displayModal = (eventInstanceId: number, ticketTypeId: number) => {
    setRemoveContext(RemoveContext.single);
    setRemoveContextMessage('this');
    setTargetItem({
      eventInstanceId: eventInstanceId,
      ticketTypeId: ticketTypeId,
    });
    openModal();
  };

  const navigateToCompleteOrder = () => {
    navigate('/completeorder');
  };

  return (
    <main className='flex flex-col items-center min-h-[calc(100vh-233px)] md:min-h-[calc(100vh-142px)] h-full py-[5rem] px-[1rem] tab:px-[5rem] bg-zinc-200'>
      <button
        onClick={() => navigate('/')}
        className='bg-blue-500 mt-10 mb-7 hover:bg-blue-600 px-3 py-2 rounded-xl flex items-center gap-1 self-start text-white'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
            clipRule='evenodd'
          />
        </svg>
        back to Events
      </button>
      <h1 className='flex items-center gap-2 text-zinc-800'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
          />
        </svg>
        <span className='text-3xl font-bold'>My Cart</span>
      </h1>
      <div className='flex flex-col md:flex-row gap-10 md:gap-5 mt-14 md:mt-20 items-center w-full'>
        <div className='flex flex-col w-full p-5 tab:p-9 gap-5 rounded-xl bg-zinc-300'>
          {items.length > 0 ? (
            items.map((cartItem) => (
              <CartRow
                key={`${cartItem.product_id}-${cartItem.typeID}`}
                item={cartItem}
                removeHandler={displayModal}
              />
            ))
          ) : (
            <p className='text-zinc-500'>There&apos;s nothing in your cart</p>
          )}
        </div>
        <section className='flex flex-col items-center w-full md:w-[30rem] p-9 rounded-xl text-center bg-zinc-800'>
          <div className='mb-3'>
            <h2 className='text-zinc-100 text-xl font-semibold'>Subtotal</h2>
            <p data-testid='subtotal-display' className='text-amber-300 italic'>
              {printDiscountText(discount)}
            </p>
            <p className='text-white'>{toDollarAmount(total)}</p>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col form-control disabled:opacity-50'>
              {!validDiscount && discountClicked && (
                <p className='text-amber-300 italic'>Invalid discount code</p>
              )}
              <div className='flex items-center justify-center gap-1 px-2 py-1 rounded-xl shadow-md ml-auto bg-zinc-600'>
                <input
                  type='text'
                  placeholder='Discount code...'
                  aria-label='Discount code'
                  className='p-1 px-2 rounded-md text-zinc-100 bg-zinc-600 disabled:bg-zinc-800'
                  value={discountText ? discountText : discount.code}
                  onChange={(e) => {
                    setDiscountText(e.target.value);
                    setDiscountClicked(false);
                  }}
                  disabled={discount.code !== ''}
                />
                {!validDiscount ? (
                  <button
                    className='p-2 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 justify-end rounded-full'
                    onClick={applyDiscount}
                    aria-label='Apply discount code'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='3'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    className='p-2 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 justify-end rounded-full'
                    onClick={removeDiscount}
                    aria-label='Remove discount code'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='3'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <button
              className='bg-red-600 enabled:hover:bg-red-700 shadow-sm shadow-red-800 flex items-center justify-center gap-1 p-3 text-white rounded-xl disabled:opacity-50'
              disabled={items.length === 0}
              onClick={removeAllCartItems}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
                aria-hidden='true'
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
              className='bg-yellow-600 enabled:hover:bg-yellow-700 shadow-sm shadow-yellow-800 flex items-center justify-center gap-1 p-3 text-white rounded-xl disabled:opacity-50'
              disabled={items.length === 0}
              onClick={navigateToCompleteOrder}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
                strokeWidth='2'
                aria-hidden='true'
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
          {modalOpen && (
            <PopUp
              title='Confirm removal'
              message={`Do you want to remove ${removeContextMessage} from your cart?`}
              primaryLabel='Yes'
              secondaryLabel='Cancel'
              handleProceed={handleRemove}
              handleClose={resetModal}
              showClose={false}
              success={false}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default Cart;
