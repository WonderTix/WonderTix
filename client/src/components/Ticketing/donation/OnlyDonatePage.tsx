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
import CompleteOrderForm, {CheckoutFormInfo} from '../checkout/CompleteOrderForm';
import {useNavigate} from 'react-router';
import {loadStripe} from '@stripe/stripe-js';
import DonationImage from '../../../assets/donation_page_image.png';

/**
 * Renders the Donations page without checkout
 *
 * @returns {ReactElement}
 */
export default function OnlyDonationPage(): ReactElement {
  const donation = useAppSelector(selectDonation);
  const [amount, setAmount] = useState(donation);
  const [anonymous, setAnonymous] = useState(false);
  const history = useNavigate();
  const amounts = [10, 25, 50, 100, 250, 500];

  // Replace this with your stripe public key
  const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_KEY);

  const doCheckout = async (formData: CheckoutFormInfo) => {
    const stripe = await stripePromise;
    if (!stripe) return;
    const response = await fetch(process.env.REACT_APP_API_1_URL + '/events/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cartItems: [], formData, donation: amount, anonymous: anonymous}),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <div className='w-full py-[5rem] px-[1rem] tab:px-[5rem] flex flex-col items-center'>
      <div className='w-full flex flex-row mb-8'>
        <button onClick={() => history('/')} className='bg-blue-500 mt-10 hover:bg-blue-600 px-3 py-2 rounded-xl flex flex-row items-center text-zinc-100'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          back to Events
        </button>
      </div>

      <div>
        <img src={DonationImage} alt="Donation Page Image" />
      </div>
      <div className="text-center text-2xl">
        <p>
        Double your impact! <br />
        Donate before June 30th and your gift will be matched 100%
        </p>
      </div>
      <div>
        <div className='py-1'>
          <p className='py-2'>Dear Friends,</p>
          <p className='py-2'>
            I am eternally grateful for my relationship with Portland Playhouse.
            As their 15th Anniversary Season comes to a close,
            <b>
              I ask that you consider deepening your support of this organization
              and the artists who create here.
            </b>
          </p>
          <p className='py-2'>
            I&lsquo;ve felt so supported by the way the Playhouse runs their
            business.  Talk is cheap, right? But when a situation comes up to
            where that talk has to be put into action,
            <b>
              Portland Playhouse lives their values and puts the individual first.
            </b>
          </p>
          <p className='py-2'>
            They&lsquo;ve created an environment where artists can show up as
            their whole selves. I don&lsquo;t have to leave pieces of my life at
            the stage door.  My husband and daughter are welcome in rehearsals,
            and I see the children of other actors around, playing or doing their
            homework. It&lsquo;s not chaotic or unprofessional. Your family&lsquo;s
            there and the work still gets done.
          </p>
          <p className='py-2'>
            <b>
              As an institution, they speak from a place of trust and they hold
              on to their word.
            </b>
            If they don&lsquo;t get it right, they ask - where did we mess up?
            How can we do better? How can we move forward? Thats what I love
            about them. Tey are forever evolving, forever growing.
          </p>
          <p className='py-2'>
            <b>
              Please help Portland Playhouse continue to grow by donating
              generously today.
            </b>
          </p>
          <p className='py-2'>
            Sincerely,
          </p>
          <p className='py-2'>
            Cycerli Ash-Barlocker
            Recently seen as Scrooge in <i>A Christmas Carol</i>, Evie in
            <i> What I Learned in Paris</i>, and as the director of
            <i> Chicken & Biscuits</i>
          </p>
          <p className='py-2'>
            *Gifts made by June 30th will be matched up to $40,000 by our
            friends at
            <b> the Raymond Family Foundation!</b>
          </p>
        </div>
      </div>
      <hr className="w-full border border-t border-zinc-300 my-4"></hr>
      <div className='w-full py-4'>
        <div className="grid grid-cols-2 grid-rows-3 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-7">
          <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-transparent active:text-indigo-600 border border-indigo-600 text-white font-bold py-4 px-4 rounded"
          onClick= {() => setAmount(amounts[0]) }>$ {amounts[0]}</button>
          <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-transparent active:text-indigo-600 border border-indigo-600 text-white font-bold py-4 px-4 rounded"
          onClick= {() => setAmount(amounts[1]) }>$ {amounts[1]}</button>
          <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-transparent active:text-indigo-600 border border-indigo-600 text-white font-bold py-4 px-4 rounded"
          onClick= {() => setAmount(amounts[2]) }>$ {amounts[2]}</button>
          <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-transparent active:text-indigo-600 border border-indigo-600 text-white font-bold py-4 px-4 rounded"
          onClick= {() => setAmount(amounts[3]) }>$ {amounts[3]}</button>
          <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-transparent active:text-indigo-600 border border-indigo-600 text-white font-bold py-4 px-4 rounded"
          onClick= {() => setAmount(amounts[4]) }>$ {amounts[4]}</button>
          <button className="bg-indigo-600 hover:bg-indigo-700 active:bg-transparent active:text-indigo-600 border border-indigo-600 text-white font-bold py-4 px-4 rounded"
          onClick= {() => setAmount(amounts[5]) }>$ {amounts[5]}</button>
        </div>
      </div>
      <div className='flex flex-col w-full items-start py-4'>
        <div className='text-md font-medium text-slate-700 ml-2 my-2 pl-4'>Donation Amount </div>
        <div className='flex '>
          <div className='pt-3 pr-3'>
            <p>$</p>
          </div>
          <input
            placeholder= {amount ? '' : 'Other Amount' }
            onChange={(e) => setAmount(+e.target.value)}
            type="number"
            // className='w-full mb-7 bg-zinc-200 text-black p-5 rounded-xl'
            // className='text-black '
            className="appearance-none block bg-white border border-2 border-gray-300 text-gray-700 rounded-md pl-3 py-2 leading-5 focus:outline-none focus:ring focus:border-indigo-600 sm:text-lg"
            value={amount || null}
          />
        </div>
      </div>
      <div className='flex flex-col w-full items-start gap-3 mt-2 mb-10'>
        <div className='flex flex-row items-center gap-4 text-md text-zinc-700 '>
          <input
            type='checkbox'
            onChange={(): void => setAnonymous(!anonymous)}
            name='anonymous'
          />
          <div>
            I would like to make my donation anonymous
          </div>
        </div>
      </div>
      <CompleteOrderForm
        onSubmit={doCheckout}
        onBack={() => history(-1)}
        disabled={amount < 1}
        donationForm
      />
      <div className='text-center text-xl py-4 '>
        <p>
        Your tax-deductible donation will make it possible to surprise,
        delight, and challenge our community with the wonder of theater
        for years to come.
        <p className='mt-2 font-semibold'>
          Thank you!
        </p>
        </p>
      </div>
      <hr className="w-full border border-t border-zinc-300 my-4"></hr>
      <div className="flex flex-col md:flex-row items-center min-w-full">
        <div className="flex-1 p-4 text-xl">
          <a className="hover:text-indigo-700 text-indigo-600 text-2xl md:px-10" href="https://portlandplayhouse.org/get-involved/giving/">
            <b>
              Other ways to donate
            </b>
          </a>
        </div>
        <div className='flex'>
          <div className="py-4 px-10 text-sm">
            <b>
              Give by phone: <br />
            </b>
            (503)-488-5822
          </div>
          <div className="py-4 px-10 text-sm min-w-lg">
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
