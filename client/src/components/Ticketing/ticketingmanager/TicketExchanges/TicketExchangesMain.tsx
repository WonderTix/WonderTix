import React from 'react';
import {TicketExchangeProvider} from './TicketExchangeProvider';
import TicketExchange from './TicketExchange';
import TicketingNavBar from '../TicketingNavBar';

const TicketExchangesMain = () => {
  return (
    <div className='flex flex-row'>
      <TicketingNavBar />
      <div className='w-full h-screen overflow-x-hidden absolute bg-zinc-200'>
        <div className='flex flex-col lg:ml-[15rem] lg:mx-[5rem] md:ml-[13rem] tab:mx-[2rem] mx-[0.5rem] mt-[5rem] mb-[9rem]'>
            <TicketExchangeProvider>
              <TicketExchange />
            </TicketExchangeProvider>
          </div>
      </div>
    </div>
  );
};

export default TicketExchangesMain;

