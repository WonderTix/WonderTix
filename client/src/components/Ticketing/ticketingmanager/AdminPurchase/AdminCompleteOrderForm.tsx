import {Form} from 'react-final-form';
import React, {ReactElement, useState} from 'react';

/**
 * Info for checkout form
 *
 * @module
 * @param {boolean} optIn
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} streetAddress
 * @param {string} postalCode
 * @param {string} country
 * @param {string} phone
 * @param {string} email
 * @param {string} visitSource
 * @param {string} seatingAcc
 * @param {string} comments
 */
export interface CheckoutFormInfo {
  optIn: boolean;
  firstName: string;
  lastName: string;
  streetAddress: string;
  postalCode: string;
  country: string;
  phone?: string;
  email: string;
  visitSource?: string;
  seatingAcc: string;
  comments?: string;
}

/**
 * Used to complete order
 *
 * @param {Function} onSubmit
 * @param {Function} onBack
 * @param {boolean} disabled
 * @param {boolean} donationForm
 */
type CompleteOrderFormProps = {
  onSubmit: (formData: CheckoutFormInfo) => any;
  onBack: () => any;
  disabled: boolean;
  donationForm?: boolean;
};
/**
 * Displays the complete order form
 *
 * @param {Function} onSubmit onSubmit callback function
 * @param {Function} onBack onBack callback function
 * @returns {ReactElement}
 */
export default function AdminCompleteOrderForm({
  onSubmit,
  onBack,
  disabled,
  donationForm,
}: CompleteOrderFormProps): ReactElement {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [streetAddress, setstreetAddress] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setphoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [visitSource, setvisitSource] = useState('');
  const [seatingAcc, setseatingAcc] = useState('');
  const [comments, setComments] = useState('');
  const [optIn, setOptIn] = useState(false);
  const [donation, setDonations] = useState(''); // TODO: may need to add donation to formData if going this route
  const handleSubmit = () => {
    const formData: CheckoutFormInfo = {
      firstName,
      lastName,
      streetAddress,
      postalCode,
      country,
      phone,
      email,
      visitSource,
      seatingAcc,
      comments,
      optIn,
    };
    onSubmit(formData);
  };

  return (
    <div className='w-full h-full flex flex-col items-center '>
      <div className='min-w-414 sm:w-full h-full'>
        <Form
          onSubmit={handleSubmit}
          initialValues={{'opt-in': false}}
          render={({handleSubmit}) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              className='w-full h-full bg-zinc-200 p-2 md:p-4 rounded-xl flex flex-col justify-between'
            >
              <div className='flex flex-col w-auto'>
                <div className='grid gap-5 md:max-lg:grid-cols-1 lg:grid-cols-2'>
                  <div>
                    <label
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      htmlFor='first-name'
                    >
                      First Name
                    </label>
                    <input
                      className='input w-full  border
            border-zinc-300 p-4 rounded-lg '
                      type='text'
                      required
                      name='first-name'
                      id='first-name'
                      placeholder='First Name'
                      onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                      ): void => setfirstName(ev.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      htmlFor='last-name'
                    >
                      Last Name
                    </label>
                    <input
                      className='input w-full  border
            border-zinc-300 p-4 rounded-lg '
                      type='text'
                      onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                      ): void => setlastName(ev.target.value)}
                      required
                      name='last-name'
                      id='last-name'
                      placeholder='Last Name'
                    />
                  </div>
                  <div>
                    <label
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      htmlFor='address'
                    >
                      Street Address
                    </label>
                    <input
                      className='input w-full  border
            border-zinc-300 p-4 rounded-lg '
                      type='text'
                      required
                      id='address'
                      onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                      ): void => setstreetAddress(ev.target.value)}
                      name='street-address'
                      placeholder='Street Address'
                    />
                  </div>
                  <div>
                    <label
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      htmlFor='zipcode'
                    >
                      Postal Code
                    </label>
                    <input
                      className='input w-full  border
            border-zinc-300 p-4 rounded-lg '
                      type='text'
                      required
                      id='zipcode'
                      onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                      ): void => setpostalCode(ev.target.value)}
                      name='postal-code'
                      placeholder='Postal Code'
                    />
                  </div>

                  <div>
                    <label
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      htmlFor='country'
                    >
                      Country
                    </label>
                    <input
                      className='input w-full  border
            border-zinc-300 p-4 rounded-lg '
                      type='text'
                      onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                      ): void => setCountry(ev.target.value)}
                      required
                      id='country'
                      name='country'
                      placeholder='Country'
                    />
                  </div>
                  <div>
                    <label
                      className='block text-sm font-medium text-slate-700 ml-1'
                      htmlFor='phone-number'
                    >
                      Phone Number
                    </label>
                    <input
                      className='input w-full  border
            border-zinc-300 p-4 rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 '
                      type='tel'
                      name='phone'
                      id='phone-number'
                      onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                      ): void => setphoneNumber(ev.target.value)}
                      placeholder='Phone'
                    />
                  </div>
                  <div>
                    <label
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      htmlFor='contact-email'
                    >
                      Email
                    </label>
                    <input
                      className='input w-full  border
            border-zinc-300 p-4 rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 '
                      type='email'
                      required
                      id='contact-email'
                      onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                      ): void => setEmail(ev.target.value)}
                      name='email'
                      placeholder='Email'
                    />
                  </div>
                  <div>
                    <label
                      className=' block text-sm font-medium text-slate-700 ml-1'
                      htmlFor='visit-source'
                    >
                      How did you hear about us?
                    </label>
                    <input
                      className='input w-full  border
            border-zinc-300 p-4 rounded-lg '
                      type='text'
                      name='visit-source'
                      id='visit-source'
                      onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                      ): void => setvisitSource(ev.target.value)}
                      placeholder='How did you hear about us?'
                    />
                  </div>
                  <div>
                    <label
                      className=' block text-sm font-medium text-slate-700 ml-1'
                      htmlFor='seating-acc'
                    >
                      Seating Accommodations
                    </label>
                    <select
                      className='input w-full  border
            border-zinc-300 p-4 mt-1 rounded-lg col-label-2 '
                      name='seatingAcc'
                      id='seating-acc'
                      onChange={(
                        ev: React.ChangeEvent<HTMLSelectElement>,
                      ): void => setseatingAcc(ev.target.value)}
                    >
                      <option value='None'>Not at this time</option>
                      <option value='Wheel Chair'>Wheelchair seat(s)</option>
                      <option value='Aisle Seat'>Aisle seat(s)</option>
                      <option value='First/Ground floor'>
                        Seat(s) on the ground or the first level
                      </option>
                      <option value='ASL Interpreter'>
                        Seat(s) in the ASL interpreters section
                      </option>
                      <option value='Wide Seats'>Wide seat(s)</option>
                      <option value='Other'>
                        Other (describe in comment section)
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      className=' block text-sm font-medium text-slate-700 ml-1'
                      htmlFor='comments'
                    >
                      Comments
                    </label>
                    <input
                      className='input w-full  border
            border-zinc-300 p-4 mt-1 rounded-lg col-label-2'
                      type='text'
                      name='comments'
                      id='comments'
                      onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                      ): void => setComments(ev.target.value)}
                      placeholder='Comments'
                    />
                  </div>
                  <div>
                    <label
                      className=' block text-sm font-medium text-slate-700 ml-1'
                      htmlFor='donation'
                    >
                      Donations
                    </label>
                    <input
                      className='input w-full  border
            border-zinc-300 p-4 mt-1 rounded-lg col-label-2'
                      type='number'
                      name='donation'
                      id='donation'
                      onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>,
                      ): void => setDonations(ev.target.value)}
                      placeholder='Enter donation amount'
                    />
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-wrap justify-center md:flex-row sm:justify-between mt-4'>
                <button
                  className='bg-red-500 px-8 py-1 text-white rounded-xl hover:bg-red-600 m-2'
                  onClick={onBack}
                >
                  Back
                </button>
                <button
                  className='bg-blue-500 px-8 py-1 text-white rounded-xl hover:bg-blue-600 disabled:opacity-40 m-2'
                  type='submit'
                >
                  Next
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
}
