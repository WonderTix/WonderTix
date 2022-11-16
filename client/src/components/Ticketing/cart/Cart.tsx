/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import CartRow from './CartItem';
import {toDollarAmount} from '../../../utils/arrays';
import {
  removeTicketFromCart,
  removeAllTicketsFromCart,
  selectCartContents,
} from '../ticketingmanager/ticketing/ticketingSlice';
import {useNavigate} from 'react-router-dom';


/**
 * @param {Item} price: number, qty: number
 * @param {Function} itemCost - item: Item, item.price * item.qty
 * @param {Function} subtotalReducer - acc: number, item: Item, acc + itemCost(item)
 */
type Item = {price: number, qty: number}
const itemCost = (item: Item) => item.price * item.qty;
const subtotalReducer = (acc: number, item: Item) => acc + itemCost(item);

/**
 * Cart handler on clicks, resets and complete orders
 *
 * @returns {ReactElement}
 */
const Cart = () => {
  const history = useNavigate();
  const navigate = useNavigate();

  enum RemoveContext
  {
      single,
      all,
  }

  const [show, setShow] = useState(false);
  const handleClick2 = () => setShow(!show);
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartContents);
  const subtotal = items.reduce(subtotalReducer, 0);
  const [, setModalOpen] = useState(false);
  const [targetItem, setTargetItem] = useState<number|null>(null);
  const [removeContext, setRemoveContext] = useState(RemoveContext.single);
  const [removeContextMessage, setRemoveContextMessage] = useState('');

  useEffect(() => console.log(subtotal), [subtotal]);

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

  const displayModal = (id: number) => {
    setRemoveContext(RemoveContext.single);
    setRemoveContextMessage('this');
    setTargetItem(id);
    setModalOpen(true);
  };

  const navigateToCompleteOrder = () => {
    history('/completeorder');
  };

  return (
    <div className='w-full h-screen'>
      <div className='w-full h-screen bg-zinc-200'>
        <div className='flex flex-col md:flex-col sm:flex-col
        sm:items-center w-full h-full p-20 overflow-y-scroll'>
          <div className='w-full flex flex-row mb-5'>
            <button onClick={() => navigate('/')} className='bg-blue-500 mt-10 hover:bg-blue-600 px-3 py-2 rounded-xl flex flex-row items-center text-zinc-100'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            back to Events</button>
          </div>
          <div className='flex flex-row items-center mt-2 text-zinc-800'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <div className='text-3xl font-bold ml-2 mt-2'>My Cart</div>
          </div>
          <div className='flex flex-col md:flex-row sm:flex-col
        sm:items-center w-full h-full'>
            <div className='w-full h-full md:mt-20 sm:mt-20 bg-zinc-300 p-9 flex flex-col gap-5 items-start rounded-xl'>
              {(items.length > 0) ?
                  items.map((data) => <CartRow key={data.product_id} item={data} removeHandler={displayModal} />) :
                  <div className='text-zinc-400 '>There&apos;s nothing in your cart</div>
              }
            </div>
            <div className='md:w-[30rem] sm:w-full sm:mt-10
              md:ml-5 h-full md:mt-20 bg-zinc-900 p-9 flex
              flex-col items-center rounded-xl justify-between'>
              <div className='flex flex-col items-center'>
                <div className='text-zinc-100 text-xl font-semibold'>Subtotal</div>
                <div className='text-white'>{toDollarAmount(subtotal)}</div>
              </div>


              <div className='flex flex-col items-center gap-3 '>

                <div className='flex flex-col items-center form-control disabled:opacity-50 '>
                  <div className='input-group flex flex-row items-center w-full px-3 py-1 text-black rounded-xl bg-sky-500'>
                    <input type="text" placeholder="Discount code..." className='input input-bordered rounded-md pl-2' />
                    <button className='btn btn-square bg-sky-500 ml-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                  </div>
                </div>

                <button className='bg-red-600 flex flex-col items-center w-full px-3 py-3 text-white rounded-xl disabled:opacity-50 'disabled={items.length === 0} onClick={removeAllCartItems}>
                  <div className='flex flex-row items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Empty Cart
                  </div>
                </button>
                <button className='bg-yellow-600 px-3 py-2 flex flex-col items-center w-full text-white rounded-xl disabled:opacity-50 ' disabled={items.length === 0} onClick={navigateToCompleteOrder}>
                  <div className='flex flex-row items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Proceed To Checkout
                  </div>

                </button>
              </div>
              <div className={!show ? 'hidden': 'relative z-10'} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Confirm removal</h3>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">Do you want to remove {removeContextMessage} from your cart?</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={handleRemove} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent
                  shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                    sm:ml-3 sm:w-auto sm:text-sm">Yes</button>
                        <button onClick={resetModal} type="button" className="mt-3 w-full inline-flex
                  justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base
                  font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                      </div>
                    </div>
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
