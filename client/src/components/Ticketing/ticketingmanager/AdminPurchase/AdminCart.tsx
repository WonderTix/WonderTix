import React from 'react';

const AdminCart = () => {
  return (
    <div className='flex flex-col justify-between h-full w-full'>
      <div className='flex flex-col items-center w-full mb-5'>
        <div className='text-zinc-100 text-2xl font-bold'>Your order</div>
        <div className='text-zinc-100 mt-10 w-full'>this is a test</div>
        <button className='bg-green-600 px-3 py-1 text-sm hover:bg-green-700 text-white rounded-xl mt-4'>
          Add more items
        </button>
      </div>
      <div className='flex flex-col items-center gap-2 bg-zinc-800 rounded-xl px-5 py-3'>
        <div className='flex flex-row items-center gap-2 justify-between w-full'>
          <div className='text-zinc-100 text-sm '>Subtotal</div>
          <div className='text-white text-lg font-bold'>99</div>
        </div>
        <div className='flex flex-row items-center gap-2 justify-between w-full'>
          <div className='text-zinc-100 text-sm '>Donation</div>
          <div className='text-white text-lg font-bold'>100</div>
        </div>
        <div className='flex flex-row items-center gap-2 justify-between w-full'>
          <div className='text-zinc-100 text-sm '>Total</div>
          <div className='text-white text-lg font-bold'>9999</div>
        </div>
      </div>
    </div>
  );
};

export default AdminCart;
