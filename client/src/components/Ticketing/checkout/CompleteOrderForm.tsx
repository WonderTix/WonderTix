/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// import {input type='text', Checkboxes} from 'mui-rff';
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
 * @param {stirng} country
 * @param {string} phone
 * @param {string} email
 * @param {string} visitSource
 * @param {boolean} seatingAcc
 * @param {string} comments
 */
export interface CheckoutFormInfo {
    optIn: boolean,
    firstName: string,
    lastName: string,
    streetAddress: string,
    postalCode: string,
    country: string,
    phone?: string,
    email: string,
    visitSource?: string,
    seatingAcc: boolean,
    comments?: string
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
    onSubmit: (formData: CheckoutFormInfo) => any,
    onBack: () => any,
    disabled: boolean,
    donationForm?: boolean
}

// const required = (value: any) => (value ? undefined : 'Required');

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// ...don't ask (because I don't know)
/*
function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = re.test(String(email).toLowerCase());
  return valid ? undefined : 'Invalid e-mail';
}
*/
/**
 * Displays the complete order form
 *
 * @param {Function} onSubmit onSubmit callback function
 * @param {Function} onBack onBack callback function
 * @returns {ReactElement}
 */
export default function CompleteOrderForm(
    {onSubmit, onBack, disabled, donationForm}: CompleteOrderFormProps,
): ReactElement {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [streetAddress, setstreetAddress] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setphoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [visitSource, setvisitSource] = useState('');
  const [seatingAcc, setseatingAcc] = useState(false);
  const [comments, setComments] = useState('');
  const [optIn, setOptIn] = useState(false);
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

  return (<>
    <div className='w-full h-full flex flex-col items-center '>
      <div className='text-2xl font-bold mb-5'>Contact</div>
      <div className='w-full h-full'>
        <Form
          onSubmit={handleSubmit}
          initialValues={{'opt-in': false, 'seating-accommodation': false}}
          render={({handleSubmit}) => (
            <form onSubmit={handleSubmit} noValidate className='w-full h-full bg-zinc-200 p-9 rounded-xl flex flex-col  justify-between'>
              <div className='flex flex-col w-full  '>
                <div className='grid grid-cols-2 gap-5'>
                  <div>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1">
                     First Name
                    </span>
                    <input className="input w-full  border
            border-zinc-300 p-4 rounded-lg " type='text'
                    required name="first-name" placeholder="First Name" onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                      setfirstName(ev.target.value)
                    }/>
                  </div>
                  <div>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1">
                     Last Name
                    </span>
                    <input className="input w-full  border
            border-zinc-300 p-4 rounded-lg " type='text' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                      setlastName(ev.target.value)}
                    required name="last-name" placeholder="Last Name"/>
                  </div>
                  <div>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1">
                     Street Address
                    </span>
                    <input className="input w-full  border
            border-zinc-300 p-4 rounded-lg " type='text' required onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                      setstreetAddress(ev.target.value)} name="street-address" placeholder="Street Address"/>
                  </div>
                  <div>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1">
                     Postal Code
                    </span>
                    <input className="input w-full  border
            border-zinc-300 p-4 rounded-lg " type='text' required onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                      setpostalCode(ev.target.value)} name="postal-code" placeholder="Postal Code"/>
                  </div>

                  <div>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1">
                     Country
                    </span>
                    <input className="input w-full  border
            border-zinc-300 p-4 rounded-lg " type='text' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                      setCountry(ev.target.value)} required name="country" placeholder="Country"/>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-slate-700 ml-1">
                     Phone Number
                    </span>
                    <input className="input w-full  border
            border-zinc-300 p-4 rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " type='tel' name="phone" onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                      setphoneNumber(ev.target.value)} placeholder="Phone"/>
                  </div>
                  <div>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1">
                     Email
                    </span>
                    <input className="input w-full  border
            border-zinc-300 p-4 rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " type="email" required onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                      setEmail(ev.target.value)} name="email" placeholder="Email"/>
                  </div>
                  <div>
                    <span className=" block text-sm font-medium text-slate-700 ml-1">
                     How did you hear about us?
                    </span>
                    <input className="input w-full  border
            border-zinc-300 p-4 rounded-lg " type='text' name="visit-source" onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                      setvisitSource(ev.target.value)} placeholder="How did you hear about us?"/>
                  </div>


                  <input className="input w-full  border
            border-zinc-300 p-4 rounded-lg col-span-2 " type='text' name="comments" onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    setComments(ev.target.value)} placeholder="Comments"/>
                </div>
                <div className='flex flex-col items-start gap-3 mt-10'>
                  <div className='flex flex-row items-center gap-4 text-sm text-zinc-700'>
                    <input type='checkbox' onChange={(): void =>
                      setOptIn(!optIn)} name="opt-in" />
                    <div>I would like to receive email info from Portland Playhouse</div>
                  </div>
                  <div className='flex flex-row items-center gap-4 text-sm text-zinc-700'>
                    {!donationForm && <div className='flex flex-row items-center gap-4 text-sm text-zinc-700'>
                      <input type='checkbox' onChange={(): void =>
                        setseatingAcc(!seatingAcc)} name="seating-accommodation"/>
                      <div>I need seating accommodations</div>
                    </div>
                    }
                  </div>

                </div>
              </div>

              <div className='w-full flex flex-row justify-between'>
                <button className='bg-red-500 px-8 py-1 text-white rounded-xl hover:bg-red-600' onClick={onBack}>Back</button>
                <button className='bg-blue-500 px-8 py-1 text-white rounded-xl hover:bg-blue-600 disabled:opacity-40' type="submit">Next</button>
              </div>

            </form>
          )}
        />
      </div>
    </div>
  </>);
}
