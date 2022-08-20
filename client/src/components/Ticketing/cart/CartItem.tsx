/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import React, {useState, useEffect} from 'react';
import {editItemQty, selectNumAvailable, CartItem} from '../ticketingmanager/ticketing/ticketingSlice';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {toDollarAmount} from '../../../utils/arrays';

interface CartRowProps {item: CartItem, removeHandler: (id: number) => void}
const CartRow = ({item, removeHandler}: CartRowProps) => {
  const dispatch = useAppDispatch();
  const [cost, setCost] = useState(item.price * item.qty);
  const numAvailable = useAppSelector((state) => selectNumAvailable(state, item.product_id));

  useEffect(() => setCost(item.qty * item.price), [item.qty]);

  const decrement = () => {
    if (item.qty > 1) {
      dispatch(editItemQty({id: item.product_id, qty: item.qty-1}));
    } else {
      removeHandler(item.product_id);
    }
  };

  const handleIncrement = () => {
    if (numAvailable && item.qty < numAvailable) {
      dispatch(editItemQty({id: item.product_id, qty: item.qty+1}));
    }
  };

  return (
    <div className='bg-zinc-200 w-full flex flex-row
     h-40 gap-5 rounded-xl bg-cover' style={{backgroundImage: `url(${item.product_img_url})`}} >
      <div className='flex flex-col md:flex-row sm:flex-col
         sm:items-center w-full rounded-xl  bg-zinc-900/90 overflow-y-scroll justify-between'>
        <span className='ml-5'>
          <div className='text-white font-semibold'>
            {item.name}
          </div>
          <p className='text-zinc-200'>{item.desc}</p>
        </span>
        <div className='flex flex-row items-center gap-7 mr-5'>
          <div className='flex flex-row items-center gap-2'>
            <button className='text-white items-center' aira-label={`remove one ${item.name} to cart`} onClick={decrement}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <span className='text-white'>{item.qty}</span>
            <button className='text-white items-center' aria-label={`add one ${item.name} to cart`} onClick={handleIncrement}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className='text-white font-semibold'>{toDollarAmount(cost)}</div>
          <button className='text-white'
            aria-label={`Remove ${item.name} from cart`}
            onClick={() => removeHandler(item.product_id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};
export default CartRow;


