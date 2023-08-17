/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {selectDonation, setDonation} from '../ticketingmanager/donationSlice';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import React, {useState, useEffect, ReactElement} from 'react';

/**
 * Renders the donation page
 *
 * @param {Function} onNext onNext callback function
 * @returns {ReactElement}
 */
export default function DonationPage({onNext}: {onNext: () => any}): ReactElement {
  const dispatch = useAppDispatch();
  const donation = useAppSelector(selectDonation);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(donation);
  }, [donation]);

  return (
    <div className='w-full h-full bg-zinc-200 p-9 rounded-xl flex flex-col items-center justify-between'>
      <div className='flex flex-col'>
        <div className='text-zinc-800 text-4xl font-semibold mb-2'>
                Everyone has something they bring to the table.
        </div>
        <div className='text-zinc-800 text-lg text-justify'>
          <b>Artists</b> bring open hearts, creativity,
         and bucketfuls of talent. <b>Volunteers</b> give time pouring beer,
         rolling towels, and seating patrons. Green thumbed <b>neighbors</b> keep up our garden. Staff members use their
          skills to make the theatre hum. <b>Audience</b> members come through the doors with their curiosity and
           a sense of wonder. And our <b>donors</b> give us the essential financial
            support we need to thrive.
        </div>
        <div className='mt-4 text-zinc-800 '>
                Our theatre is a testament to the power of friends and neighbors coming together to create something special!
        </div>


        <div className='mt-4 text-zinc-800 mb-2 text-lg font-bold  '>
          Please consider making a donation
        </div>

        <div className='flex flex-row items-center rounded-xl w-[15rem] p-4 bg-zinc-100 text-zinc-500'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <input
            placeholder="donation amount"
            onChange={(e) => setAmount(+e.target.value)}
            type="number"
            className='bg-zinc-100 ml-2 rounded-lg p-2 text-zinc-900'
            value={amount || undefined}
          />
        </div>


      </div>
      <button
        className='bg-blue-500 px-14 py-2 text-white rounded-xl hover:bg-blue-600'
        onClick={() => {
          if (amount >= 0) {
            dispatch(setDonation(amount));
          }
          onNext();
        }}
      >
        Continue
      </button>
    </div>
  );
}
