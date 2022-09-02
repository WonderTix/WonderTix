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
import React from 'react';
import {useAppSelector} from '../app/hooks';
import {
  selectCartItem,
  selectCartIds,
  selectCartSubtotal,
} from '../ticketingmanager/ticketing/ticketingSlice';
import {useNavigate} from 'react-router';
import {selectDonation} from '../ticketingmanager/donationSlice';

const toDollar = (x: number) => `$${(Math.round(x * 100) / 100).toFixed(2)}`;

const YourOrder = () => {
  const history = useNavigate();
  const cartIds = useAppSelector(selectCartIds);
  const donation = useAppSelector(selectDonation);
  const subtotal = useAppSelector(selectCartSubtotal);
  const lineItems = cartIds.map((id) => <LineItem key={id} id={id} className='bg-gradient-to-b from-zinc-700 px-5 py-3 rounded-xl mb-5'/>);

  return (
    <div className='flex flex-col justify-between h-full w-full'>
      <div className='flex flex-col items-center w-full'>
        <div className='text-zinc-100 text-2xl font-bold'>Your order</div>
        <div className='text-zinc-100 mt-10 w-full'>
          {lineItems.length > 0 ? lineItems : <p>Your cart is empty</p>}
        </div>
        <button onClick={() => history('/')} className='bg-green-600 px-3 py-1 text-sm
         hover:bg-green-700 text-white rounded-xl mt-4 '>
        Add more items
        </button>
      </div>
      <div className='flex flex-col items-center gap-2 bg-zinc-800 rounded-xl px-5 py-3'>
        <div className='flex flex-row items-center gap-2 justify-between w-full'>
          <div className='text-zinc-100 text-sm '>Subtotal</div>
          <div className='text-white text-lg font-bold'>
            {toDollar(subtotal)}
          </div>
        </div>
        <div className='flex flex-row items-center gap-2 justify-between w-full'>
          <div className='text-zinc-100 text-sm '>Donation</div>
          <div className='text-white text-lg font-bold'>{toDollar(donation)}</div>
        </div>
        <div className='flex flex-row items-center gap-2 justify-between w-full'>
          <div className='text-zinc-100 text-sm '>Total</div>
          <div className='text-white text-lg font-bold'>{toDollar(donation+subtotal)}</div>
        </div>
      </div>


    </div>
  );
};

const LineItem = (props: {className: string, id: number}) => {
  const data = useAppSelector((state) => selectCartItem(state, props.id));
  return data ?
        <div className={props.className}>
          <div>{data.qty} <b>x</b> {data.name}</div>
          <div>{
            data.payWhatCan ?
              toDollar(data.payWhatPrice) :
              toDollar(data.qty * data.price)
          }</div>
        </div> :
        <div></div>;
};

export default YourOrder;
