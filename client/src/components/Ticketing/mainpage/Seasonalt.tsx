/* eslint-disable max-len */
import React from 'react';

/**
 * Text about seasonal tickets
 * @returns HTMLElements
 */
const Seasonaltickets = () => {
  return (
    <div className='seasontickets w-full py-[10rem] px-4 bg-zinc-200'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
        <div className='bg-zinc-100 w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <h2 className='text-2xl font-bold text-center py-8'>Anytime Subscriptions</h2>
          <p className='text-center text-gray-500 text-xl font-bold'>Starting at</p>
          <p className='text-center text-4xl font-bold'>$149</p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8 text-gray-600'>Redeem your Anytime Tickets for any performance dates – including our video on-demand options.</p>
            <p className='py-2 border-b mx-8'>3-4 Anytime Tickets</p>
          </div>
          <button className=' w-[200px] text-white  border bg-indigo-600 border-indigo-600
        hover:bg-transparent hover:text-indigo-600 rounded-full font-medium my-6 mx-auto px-6 py-3'>Subscribe</button>
        </div>
        <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
          <h2 className='text-2xl font-bold text-center py-8'>Sometimes Subscriptions</h2>
          <p className='text-center text-gray-500 text-xl font-bold'>Starting at</p>
          <p className='text-center text-4xl font-bold'>$111</p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8 text-gray-600'>Redeem your Sometimes Tickets for any Weds, Thurs, & Saturday Matinee performances.</p>
            <p className='py-2 border-b mx-8'>3-4 Sometimes Tickets</p>
          </div>
          <button className=' w-[200px] rounded-full font-medium my-6 mx-auto px-6 py-3 text-white  border bg-indigo-600 border-indigo-600
        hover:bg-transparent hover:text-indigo-600 '>Subscribe</button>
        </div>
        <div className='bg-zinc-100 w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <h2 className='text-2xl font-bold text-center py-8'>Preview Subscriptions</h2>
          <p className='text-center text-gray-500 text-xl font-bold'>Starting at</p>
          <p className='text-center text-4xl font-bold'>$69</p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8 text-gray-600'>These tickets can only be redeemed  for preview performances (prior to Opening Night).</p>

            <p className='py-2 border-b mx-8'>3-4 Preview Tickets</p>
          </div>
          <button className='w-[200px] text-white  border bg-indigo-600 border-indigo-600
        hover:bg-transparent hover:text-indigo-600 rounded-full font-medium my-6 mx-auto px-6 py-3'>Subscribe</button>
        </div>
      </div>
      <div className='grid place-items-center my-14'>
        <button className='px-20 py-2 bg-black border-black hover:text-black text-white  border
        hover:bg-transparent rounded-full '>More Details</button>
      </div>

    </div>
  );
};

export default Seasonaltickets;
