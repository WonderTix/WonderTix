import React from 'react';

const TicketExchanges = () => {
  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem] h-full'>
        <h1 className='font-bold text-5xl bg-clip-text
           text-transparent bg-gradient-to-r from-sky-500
            to-indigo-500 mb-10 pb-4 h-fit'>Ticket Exchanges</h1>

        <div className="flex flex-wrap justify-center h-fit gap-x-24">
          <div className="w-80 bg-blue-400 drop-shadow-xl
            text-center rounded-xl m-3 p-3">
            <h2 className="text-xl font-bold text-white m-4">
              Customer&apos;s Ticket
            </h2>
            <div className="flex flex-wrap w-64 mx-auto">
              <div className="text-white text-l" id="select-event-id">
                Order Number
              </div>
              <input className="w-full mt-1 mb-3 px-2 py-2 rounded" type="text"
                id="order-number" name="order-number"
                placeholder="enter order number"></input>
              <div className="text-white text-l" id="select-event-id">
                Select Event
              </div>
              <select className="w-full mt-1 mb-3 border border-gray-300
                px-2 py-2 rounded">
                <option value="">select event</option>
              </select>
              <div className="text-white text-l" id="select-date-id">
                Select Date
              </div>
              <select className="w-full mt-1 mb-3 border border-gray-300
                px-2 py-2 rounded">
                <option value="">select date</option>
              </select>
              <div className="text-white text-l"
                id="tickets-purchased-list-id">
                List of Tickets Purchased
              </div>
              <div className="flex justify-center mt-1 mb-5 w-full">
                <div className="w-full h-64 bg-white rounded-lg"></div>
              </div>
            </div>
          </div>

          <div className="w-80 bg-blue-400 drop-shadow-xl
            text-center rounded-xl m-3 p-3">
            <h2 className="text-white text-xl font-bold text-black m-4">
              New Ticket
            </h2>
            <div className="flex flex-wrap w-64 mx-auto">
              <div className="text-white text-l" id="select-event-id">
                Select Event
              </div>
              <select className="w-full mt-1 mb-3 border border-gray-300
                px-2 py-2 rounded">
                <option value="">select event</option>
              </select>
              <div className="text-white text-l" id="select-date-id">
                Select Date
              </div>
              <select className="w-full mt-1 mb-3 border border-gray-300
                px-2 py-2 rounded">
                <option value="">select date</option>
              </select>
              <div className="text-white text-l"
                id="tickets-available-list-id">
                Tickets Free to Switch
              </div>
              <div className="flex justify-center mt-1 mb-5 w-full">
                <div className="w-full h-64 bg-white rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button className="float-right bg-green-500
              hover:bg-green-600 text-white mt-5 py-2 px-4 rounded">
              Confirm Exchange
          </button>
        </div>

      </div>
    </div>
  );
};

export default TicketExchanges;
