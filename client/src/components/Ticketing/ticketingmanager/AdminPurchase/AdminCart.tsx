import React, {ReactElement, useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {EventRow} from './AdminPurchase';

/**
 * Math to dollar - `$${(Math.round(x * 100) / 100).toFixed(2)}`
 *
 * @param x
 */
const toDollar = (x: number) => `$${x.toFixed(2)}`;

interface AdminCartProps {
  backButtonRoute: string;
  eventDataFromPurchase: EventRow[];
}
/**
 *
 * @param AdminCartProps
 * @param AdminCartProps.backButtonRoute
 * @param AdminCartProps.eventDataFromPurchase
 * @returns {ReactElement}
 */
const AdminCart = ({
  backButtonRoute,
  eventDataFromPurchase,
}: AdminCartProps): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems || [];

  const itemsInCart = cartItems.map((item, index) => (
    <p
      key={index}
      className='flex flex-row gap-8 bg-gradient-to-b from-zinc-700 px-5 py-3 rounded-xl mb-5'
    >
      <span className='flex-auto text-left'>
        {item.qty} x {item.name}
      </span>
      <span className='flex-auto text-right'>{toDollar(item.price)}</span>
    </p>
  ));

  const total = cartItems.reduce((total, item) => {
    const ticketPrice = item.qty * item.price;
    return total + ticketPrice;
  }, 0);

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
      <aside className='flex flex-col items-center gap-2 bg-zinc-800 rounded-xl px-5 py-3'>
        <div className='flex flex-row items-center gap-2 justify-between w-full'>
          <span className='text-zinc-100 text-sm '>Total</span>
          <strong className='text-white text-lg font-bold'>
            {toDollar(total)}
          </strong>
        </div>
      </aside>
    </div>
  );
};

export default AdminCart;