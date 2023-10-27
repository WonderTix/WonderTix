import React, {ReactElement} from 'react';
import {useLocation, useNavigate} from 'react-router';

/**
 * Math to dollar - `$${(Math.round(x * 100) / 100).toFixed(2)}`
 *
 * @param x
 */
const toDollar = (x: number) => `$${(Math.floor(x * 100) / 100).toFixed(2)}`;

interface AdminCartProps {
  backButtonRoute: string;
}
/**
 *
 * @param AdminCartProps
 * @param AdminCartProps.backButtonRoute
 * @returns {ReactElement}
 */
const AdminCart = ({backButtonRoute}: AdminCartProps): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  // console.log('admin cart: ', cartItems);
  const itemsInCart = cartItems.map((item, index) => (
    <div
      key={index}
      className='flex flex-row gap-8 bg-gradient-to-b from-zinc-700 px-5 py-3 rounded-xl mb-5'
    >
      <div className='flex-auto text-left'>
        {item.qty} x {item.name}
      </div>
      <div className='flex-auto text-right'>{toDollar(item.price)}</div>
    </div>
  ));
  const total = cartItems.reduce((total, item) => {
    const ticketPrice = item.qty * item.price;
    return total + ticketPrice;
  }, 0);

  return (
    <div className='flex flex-col justify-between h-full w-full'>
      <div className='flex flex-col items-center w-full mb-5'>
        <div className='text-zinc-100 text-2xl font-bold'>Your order</div>
        <div className='text-zinc-100 mt-10 w-full'>
          {itemsInCart.length > 0 ? itemsInCart : <p>Your cart is Empty</p>}
        </div>
        <button
          onClick={() => navigate(backButtonRoute)}
          className='bg-green-600 px-3 py-1 text-sm hover:bg-green-700 text-white rounded-xl mt-4'
        >
          Add more items
        </button>
      </div>
      <div className='flex flex-col items-center gap-2 bg-zinc-800 rounded-xl px-5 py-3'>
        <div className='flex flex-row items-center gap-2 justify-between w-full'>
          <div className='text-zinc-100 text-sm '>Total</div>
          <div className='text-white text-lg font-bold'>{toDollar(total)}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminCart;
