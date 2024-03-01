import React, {useState} from 'react';

const DailySalesReport = (): React.ReactElement => {
    return (
      <div className='w-full h-screen overflow-x-hidden absolute'>
        <div className='sm:my-32 sm:mx-4 md:my-32 md:ml-60 md:mr-14 lg:ml-64'>
          <div className='flex flex-row'>
            <h1 className='font-bold text-5xl bg-clip-text text-transparent
              bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-14'>
              Sales Overview Report
            </h1>
          </div>
        </div>
      </div>
    );
  };

  export default DailySalesReport;
