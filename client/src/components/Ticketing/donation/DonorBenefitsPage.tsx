import React, {ReactElement, useState} from 'react';
import {useNavigate} from 'react-router';

/**
 * Renders the Donations page without checkout
 *
 * @returns {ReactElement}
 */
export default function DonorBenefitsPage(): ReactElement {
  const history = useNavigate();
  return (
    <div className='w-full max-w-6xl mx-auto py-[5rem] px-[1rem] tab:px-[5rem] flex flex-col items-center'>
      {/* Back button*/}
      <div className='w-full flex flex-row mb-8'>
        <button
          onClick={() => history('/donate')}
          className='bg-blue-500 mt-10 hover:bg-blue-600 px-3 py-2 rounded-xl flex flex-row items-center text-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
              clipRule='evenodd'
            />
          </svg>
          back to Donation
        </button>
      </div>
      {/* Header text */}
      <div className='w-full max-w-4xl px-8 py-4 my-5 rounded-sm text-center text-4xl text-zinc-100 bg-indigo-600 font-semibold'>
        <h1>DONOR BENEFITS</h1>
      </div>
      <div className='mb-5 py-4 text-center'>
        <div>
          <b>
            We are pleased to offer these benefits in appreciation of your
            support.
          </b>
        </div>
        <div>
          Please contact Aiyana Cunningham, Development Director with questions,
          and to redeem your benefits: aiyana@portlandplayhouse.org
        </div>
      </div>
      {/* Main Content*/}
      <div>
        <div className='mb-5 text-left font-bold text-2xl'>Giving Levels</div>
        <div className='p-5 my-3 rounded-md bg-zinc-100'>
          <div className='px-2 pb-2 font-bold'>
            Friend - $1 - $249 (Under $20/month)
          </div>
          <div>
            <p className='py-2 px-4'>
              Recognition on the website and all our love and gratitude! ♥
            </p>
          </div>
        </div>
        <div className='p-5 my-3 rounded-md bg-zinc-100'>
          <div className='px-2 pb-2 font-bold'>Cameo - $250 or $21/month</div>
          <div>
            <p className='py-2 px-4'>
              Your name is entered into a drawing to win dinner for two at a
              select Portland restaurant. (Drawn in the spring)
            </p>
          </div>
          <div>
            <p className='py-2 px-4'>
              <i>And above benefits ♥</i>
            </p>
          </div>
        </div>
        <div className='p-5 my-3 rounded-md bg-zinc-100'>
          <div className='px-2 pb-2 font-bold'>Star - $500 or $45/month</div>
          <div>
            <p className='py-2 px-4'>Special event invitations</p>
          </div>
          <div>
            <p className='py-2 px-4'>
              <i>And above benefits ♥</i>
            </p>
          </div>
        </div>
        <div className='p-5 my-3 rounded-md bg-zinc-100'>
          <div className='px-2 pb-2 font-bold'>Actor - $1,000 or $85/month</div>
          <div>
            <p className='py-2 px-4'>
              Invitation to select rehearsals and special events
            </p>
          </div>
          <div>
            <p className='py-2 px-4'>
              <i>And above benefits ♥</i>
            </p>
          </div>
        </div>
        <div className='p-5 my-3 rounded-md bg-zinc-100'>
          <div className='px-2 pb-2 font-bold'>
            Designer - $2,500 or $209/month
          </div>
          <div>
            <p className='py-2 px-4'>2 Anytime season tickets</p>
            <p className='py-2 px-4'>
              Named as co-sponsor on 1 production of your choice
            </p>
          </div>
          <div>
            <p className='py-2 px-4'>
              <i>And above benefits ♥</i>
            </p>
          </div>
        </div>
        <div className='p-5 my-3 rounded-md bg-zinc-100'>
          <div className='px-2 pb-2 font-bold'>
            Director - $5,000 or $417/month
          </div>
          <div>
            <p className='py-2 px-4'>
              Named as sponsor of 1 production of your choice
            </p>
            <p className='py-2 px-4'>
              2 complimentary tickets to your show&lsquo;s OpeningNight Dinner
              (with director, playwright, designer, or artistic director)
            </p>
            <p className='py-2 px-4'>
              Spotlight recognition in our newsletter during the run of your
              show
            </p>
            <p className='py-2 px-4'>Signed cast photo</p>
          </div>
          <div>
            <p className='py-2 px-4'>
              <i>And above benefits ♥</i>
            </p>
          </div>
        </div>
        <div className='p-5 my-3 rounded-md bg-zinc-100'>
          <div className='px-2 pb-2 font-bold'>
            Season Sponsorship: PLAYWRIGHT level - $10,000
          </div>
          <div>
            <p className='py-2 px-4'>
              2 complementary tickets to every Opening Night dinner in the
              season (with director, playwright, designer, or artistic director)
            </p>
            <p className='py-2 px-4'>
              Lunch with Co-founder / Artistic Director at your favorite
              Portland area restaurant
            </p>
            <p className='py-2 px-4'>Spotlight recognition in our newsletter</p>
          </div>
          <div>
            <p className='py-2 px-4'>
              <i>And above benefits ♥</i>
            </p>
          </div>
        </div>
        <div className='p-5 my-3 rounded-md bg-zinc-100'>
          <div className='px-2 pb-2 font-bold'>
            Season Sponsorship: PRODUCER level - $25,000
          </div>
          <div>
            <p className='py-2 px-4'>
              4 complementary tickets to every Opening Night dinner in the
              season (with director, playwright, designer, or artistic director)
            </p>
            <p className='py-2 px-4'>4 Anytime season benefits</p>
          </div>
          <div>
            <p className='py-2 px-4'>
              <i>And above benefits ♥</i>
            </p>
          </div>
        </div>
        <div>
          <div className='my-5 pt-5 text-left font-bold text-2xl'>
            Monthly Giving
          </div>
          <p>
            Please consider making your gift through scheduled monthly payments.
            It&lsquo;s an easy way to give and provides the financial stability
            we need. You make it possible for us to provide access to theatre
            for everyone — regardless of financial status — and serve hundreds
            of youth each year through our education programs. Thank you!
          </p>
        </div>
      </div>
    </div>
  );
}
