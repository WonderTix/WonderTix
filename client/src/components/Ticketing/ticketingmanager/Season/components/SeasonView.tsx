import React from 'react';
import SeasonEvents from './SeasonEvents';

const SeasonView = () => {
  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem] bg-green-600'>
        <h1>Season View</h1>
        <SeasonEvents />
      </div>
    </div>
  );
};

export default SeasonView;
