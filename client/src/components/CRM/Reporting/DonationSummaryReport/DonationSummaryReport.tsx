import React from 'react';
import TableHeader from './Table/TableHeader';
import TableData from './Table/TableData';

const DonationSummaryReport=() =>{
    return (
      <div className='w-full h-screen overflow-x-hidden absolute'>
        <div className='md:ml-[16rem] md:mt-32 md:mr-16 sm:mt-[4rem] sm:mx-[0rem]'>
            <div className='bg-white shadow-md rounded-md w-100 md:mx-auto h-fit antialiased lg:subpixel-antialiased xl:antialiased border-t-4 border-black'>
                <TableHeader/>
                <TableData/>
            </div>
        </div>
      </div>
    );
  };

export default DonationSummaryReport;
