import React from 'react';

const Refund = () => {
    return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 mb-14'>Refund Ticket</h1>
        </div>
        <div className="flex flex-wrap justify-center h-fit gap-x-24">
          <div className="w-80 bg-gradient-to-r from-sky-500 to-indigo-500 drop-shadow-xl
            text-center rounded-xl m-3 p-3">
            <h2 className="text-xl font-bold text-white m-4">
              Stripe Order
            </h2>
            <div className="flex flex-wrap w-64 mx-auto">
              <div className="text-white text-l" id="select-event-id">
                Stripe Description
              </div>
              <input className="w-full mt-1 mb-3 px-2 py-2 rounded" type="text"
                id="stripe-description" name="stripe-description"
                placeholder="XXXXX"></input>
            </div>
            <div>
              <button className="bg-red-700
                hover:bg-red-500 text-white mt-5 py-2 px-4 rounded">
                Refund
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;
