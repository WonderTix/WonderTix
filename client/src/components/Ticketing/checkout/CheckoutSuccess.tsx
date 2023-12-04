import React, {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * Displays the CheckoutSuccess page
 *
 * @returns {ReactElement} CheckoutSuccess
 */
export default function CheckoutSuccess(): ReactElement {
  const navigate = useNavigate();

  return (
    <div className='w-full h-screen flex items-center justify-center font-bold bg-zinc-200'>
      <section className='flex flex-col items-center gap-5 bg-zinc-100 p-7 rounded-lg shadow-xl mx-3'>
        <h1 className='flex flex-col items-center text-center text-2xl text-zinc-800 tab:flex-row tab:text-left gap-x-2 gap-y-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 tab:h-10 tab:w-10'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
          Thank you for your purchase!
        </h1>
        <button
          onClick={() => navigate('/')}
          className='bg-blue-500 px-5 py-3 text-white font-medium rounded-full hover:bg-blue-600'
        >
          Back to Home
        </button>
      </section>
    </div>
  );
}
