import React from 'react';

const TicketExchanges = () => {
  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem] h-full'>
        <h1 className='font-bold text-5xl bg-clip-text
           text-transparent bg-gradient-to-r from-sky-500
            to-indigo-500 mb-10 h-16'>Ticket Exchanges</h1>

        <div className="flex h-fit space-x-4">
          <div className="w-1/2 bg-blue-500 text-center rounded-xl">
            <h2 className="text-xl font-bold text-white pt-5 pb-4">
              Customer&apos;s Ticket
            </h2>
            <div className="text-white text-l" id="select-event-id">
              Select Event
            </div>
            <select className="mt-1 mb-3 border border-gray-300
              px-2 py-1 rounded">
              <option value="">select event</option>
            </select>
            <div className="text-white text-l" id="select-date-id">
              Select Date
            </div>
            <select className="mt-1 mb-3 border border-gray-300
              px-2 py-1 rounded">
              <option value="">select date</option>
            </select>
            <div className="text-white text-l px-3"
              id="tickets-purchased-list-id">
              List of Tickets Purchased
            </div>
            <div className="flex justify-center mt-1 mb-5 px-3">
              <div className="w-64 h-64 bg-white rounded-lg"></div>
            </div>
          </div>

          <div className="w-1/2 w-1/2 bg-blue-500 text-center rounded-xl">
            <h2 className="text-white text-xl font-bold text-black pt-5 pb-4">
              New Ticket
            </h2>
            <div className="text-white text-l" id="select-event-id">
              Select Event
            </div>
            <select className="mt-1 mb-3 border border-gray-300
              px-2 py-1 rounded">
              <option value="">select event</option>
            </select>
            <div className="text-white text-l" id="select-date-id">
              Select Date
            </div>
            <select className="mt-1 mb-3 border border-gray-300
              px-2 py-1 rounded">
              <option value="">select date</option>
            </select>
            <div className="text-white text-l" id="tickets-purchased-list-id">
              Tickets Free to Switch
            </div>
            <div className="flex justify-center mt-1 mb-5 px-3">
              <div className="w-64 h-64 bg-white rounded-lg"></div>
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
