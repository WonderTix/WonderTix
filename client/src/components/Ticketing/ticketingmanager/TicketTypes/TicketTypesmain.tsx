import React, {useState} from 'react';
import TicketingNavBar from '../TicketingNavBar';
import TicketTypes from './TicketTypes';
import {Tab, Tabs} from '@mui/material';
import {SubscriptionTypes} from './SubscriptionTypes';

/**
 * Main page to host door list
 *
 * @module
 * @returns {Udash_nav, TicketType}
 */
const TicketTypesmain = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (_, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <div className='flex flex-row'>
      <TicketingNavBar />
      <div className='w-full h-screen absolute'>
        <main className='w-full h-screen overflow-x-hidden absolute '>
          <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label='Ticket Types' />
              <Tab label='Subscription Types' />
            </Tabs>
            {!tabValue ? <TicketTypes /> : <SubscriptionTypes />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TicketTypesmain;
