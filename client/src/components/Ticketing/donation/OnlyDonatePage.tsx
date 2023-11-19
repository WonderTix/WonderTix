/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {useAppSelector} from '../app/hooks';
import {selectDonation} from '../ticketingmanager/donationSlice';
import React, {ReactElement, useState} from 'react';
import CompleteOrderForm, {
  CheckoutFormInfo,
} from '../checkout/CompleteOrderForm';
import DonationImage from '../../../assets/donation_page_image.png';
import DonationButton from './DonationButton';
import DonationIntro from './DonationIntro';
import {useNavigate} from 'react-router';
import {loadStripe} from '@stripe/stripe-js';

/**
 * Renders the Donations page without checkout
 *
 * @returns {ReactElement}
 */
export default function OnlyDonationPage(): ReactElement {
  const donation = useAppSelector(selectDonation);
  const [amount, setAmount] = useState(donation);
  const [anonymous, setAnonymous] = useState(false);
  // Determines the donation period that the user chooses
  // 'onetime' | 'monthly' | 'quarterly';
  const [donationPeriod, setDonationPeriod] = useState('onetime');
  const history = useNavigate();

  // Numbers used for donation buttons' amounts and labels
  const oneTimeAmounts = [25, 50, 100, 150, 250, 500];
  const monthlyAmounts = [5, 10, 25, 50, 100, 250];
  const quarterlyAmounts = [50, 100, 150, 200, 250, 500];

  // Replace this with your stripe public key
  const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_KEY);

  const doCheckout = async (formData: CheckoutFormInfo) => {
    const stripe = await stripePromise;
    if (!stripe) return;
    const response = await fetch(process.env.REACT_APP_API_2_URL + '/events/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cartItems: [], formData, donation: amount}),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error.message);
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDonationPeriod(event.target.value);
    setAmount(0);
    console.log(amount);
  };

  const handleDonationButtonClick = (amount) => {
    setAmount(amount);
  };

  return (
    <div className='w-full py-[5rem] px-[1rem] tab:px-[5rem] flex flex-col items-center'>
      {/* Back button*/}
      <div className='w-full flex flex-row mb-8'>
        <button
          onClick={() => history('/')}
          className='bg-blue-500 mt-10 hover:bg-blue-600 px-3 py-2 rounded-xl flex flex-row items-center text-zinc-100'
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
          back to Events
        </button>
      </div>
      {/* Image */}
      <div>
        <img src={DonationImage} alt='Donation Page Image' />
      </div>
      {/* Header text */}
      <div className='text-center text-2xl'>
        <p>
          Double your impact! <br />
          Donate before June 30th and your gift will be matched 100%
        </p>
      </div>
      <DonationIntro />
      <hr className='w-full border border-t border-zinc-300 my-4'></hr>
      <div className='text-2xl font-bold mb-5'>Choose a donation amount</div>
      {/* Donation period radios*/}
      <div className='self-start'>
        <label className='mr-10'>
          <input
            type='radio'
            value='onetime'
            name='period'
            checked={donationPeriod == 'onetime'}
            onChange={handleRadioChange}
            className='mr-2'
          />
          One Time
        </label>
        <label className='mr-10'>
          <input
            type='radio'
            value='monthly'
            name='period'
            onChange={handleRadioChange}
            className='mr-2'
          />
          Monthly
        </label>
        <label className='mr-10'>
          <input
            type='radio'
            value='quarterly'
            name='period'
            onChange={handleRadioChange}
            className='mr-2'
          />
          Quarterly
        </label>
      </div>
      {/* Donation buttons */}
      <div className='w-full py-4'>
        {donationPeriod == 'onetime' && (
          <div className='grid grid-cols-2 grid-rows-3 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-7'>
            {oneTimeAmounts.map((amount, index) => (
              <DonationButton
                key={index}
                amount={amount}
                label={''}
                onClick={handleDonationButtonClick}
              />
            ))}
          </div>
        )}
        {donationPeriod == 'monthly' && (
          <div className='grid grid-cols-2 grid-rows-3 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-7'>
            {monthlyAmounts.map((amount, index) => (
              <DonationButton
                key={index}
                amount={amount}
                label={' / month'}
                onClick={handleDonationButtonClick}
              />
            ))}
          </div>
        )}
        {donationPeriod == 'quarterly' && (
          <div className='grid grid-cols-2 grid-rows-3 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-7'>
            {quarterlyAmounts.map((amount, index) => (
              <DonationButton
                key={index}
                amount={amount}
                label={' / quarter'}
                onClick={handleDonationButtonClick}
              />
            ))}
          </div>
        )}
      </div>
      {/* Other amount text box */}
      <div className='flex flex-col w-full items-start py-4'>
        <div className='text-md font-medium text-slate-700 ml-2 my-2 pl-4'>
          Donation Amount{' '}
        </div>
        <div className='flex '>
          <div className='pt-3 pr-3'>
            <p>$</p>
          </div>
            <input
              placeholder={amount === 0 ? 'Other Amount': ''}
              onChange={(e) => setAmount(+e.target.value)}
              type='number'
              className='appearance-none block bg-white border border-2 border-gray-300 text-gray-700 rounded-md pl-3 py-2 leading-5 focus:outline-none focus:ring focus:border-indigo-600 sm:text-lg'
              value={amount || ''}
            />
        </div>
      </div>
      {/* Anonymous donation checkbox*/}
      <div className='flex flex-col w-full items-start gap-3 mt-2 mb-10'>
        <div className='flex flex-row items-center gap-4 text-md text-zinc-700 '>
          <input
            type='checkbox'
            onChange={(): void => setAnonymous(!anonymous)}
            name='anonymous'
          />
          <div>I would like to make my donation anonymous</div>
        </div>
      </div>
      <CompleteOrderForm
        onSubmit={doCheckout}
        onBack={() => history(-1)}
        disabled={amount < 1}
        donationForm
      />
      {/* Outro text*/}
      <div className='text-center text-xl py-4 '>
        <p>
          Your tax-deductible donation will make it possible to surprise,
          delight, and challenge our community with the wonder of theater for
          years to come.
          <p className='mt-2 font-semibold'>Thank you!</p>
        </p>
      </div>
      <hr className='w-full border border-t border-zinc-300 my-4'></hr>
      {/* Other ways to donate */}
      <div className='flex flex-col md:flex-row items-center min-w-full'>
        <div className='flex-1 p-4 text-xl'>
          <div className='text-indigo-600 text-2xl md:px-10'>
            <b>Other ways to donate</b>
          </div>
        </div>
        <div className='flex'>
          <div className='py-4 px-10 text-sm'>
            <b>
              Give by phone: <br />
            </b>
            (503)-488-5822
          </div>
          <div className='py-4 px-10 text-sm min-w-lg'>
            <div className=''>
              <b>
                Give by mail: <br />
              </b>
              Portland Playhouse <br />
              602 NE Prescott St <br />
              Portland, OR 97211
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
