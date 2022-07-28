/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
// import {input type='text', Checkboxes} from 'mui-rff';
import {Form} from 'react-final-form';

export interface CheckoutFormInfo {
    'opt-in': boolean,
    'first-name': string,
    'last-name': string,
    'street-address': string,
    'postal-code': string,
    country: string,
    phone?: string,
    email: string,
    'visit-source'?: string,
    'seating-accommodation': boolean,
    comments?: string
}

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
export default function CompleteOrderForm({onSubmit, onBack, disabled, donationForm}: CompleteOrderFormProps) {
  return (<>
    <div className='w-full h-full flex flex-col items-center '>
      <div className='text-2xl font-bold mb-5'>Contact</div>
      <div className='w-full h-full'>
        <Form
          onSubmit={onSubmit}
          initialValues={{'opt-in': false, 'seating-accommodation': false}}
          render={({handleSubmit, values, valid}) => (
            <form onSubmit={handleSubmit} noValidate className='w-full h-full bg-zinc-200 p-9 rounded-xl flex flex-col  justify-between'>
              <div className='flex flex-col w-full  '>
                <div className='grid grid-cols-2 gap-5'>
                  <input className="input w-full  border
            border-zinc-300 p-4 rounded-xl " type='text' required name="first-name" placeholder="First Name"/>
                  <input className="input w-full  border
            border-zinc-300 p-4 rounded-xl " type='text' required name="last-name" placeholder="Last Name"/>
                  <input className="input w-full  border
            border-zinc-300 p-4 rounded-xl " type='text' required name="street-address" placeholder="Street Address"/>
                  <input className="input w-full  border
            border-zinc-300 p-4 rounded-xl " type='text' required name="postal-code" placeholder="Postal Code"/>
                  <input className="input w-full  border
            border-zinc-300 p-4 rounded-xl " type='text' required name="country" placeholder="Country"/>
                  <input className="input w-full  border
            border-zinc-300 p-4 rounded-xl " type='text' name="phone" placeholder="Phone"/>
                  <input className="input w-full  border
            border-zinc-300 p-4 rounded-xl " type='text' required name="email" placeholder="Email"/>

                  <input className="input w-full  border
            border-zinc-300 p-4 rounded-xl " type='text' name="visit-source" placeholder="How did you hear about us?"/>

                  <input className="input w-full  border
            border-zinc-300 p-4 rounded-xl col-span-2 " type='text' name="comments" placeholder="Comments"/>
                </div>
                <div className='flex flex-col items-start gap-7 mt-10'>
                  <div className='flex flex-row items-center gap-4 text-sm text-zinc-700'>
                    <input type='checkbox' name="opt-in"/>
                    <div>I would like to recieve email info from portland playhouse</div>
                  </div>
                  <div className='flex flex-row items-center gap-4 text-sm text-zinc-700'>
                    {!donationForm && <div className='flex flex-row items-center gap-4 text-sm text-zinc-700'>
                      <input type='checkbox' name="seating-accommodation"/>
                      <div>I need seating accommodations</div>
                    </div>
                    }
                  </div>

                </div>
              </div>

              <div className='w-full flex flex-row justify-between'>
                <button className='bg-red-500 px-8 py-1 text-white rounded-xl hover:bg-red-600' onClick={onBack}>Back</button>
                <button className='bg-blue-500 px-8 py-1 text-white rounded-xl hover:bg-blue-600' disabled={disabled || !valid} type="submit">Next</button>
              </div>

            </form>
          )}
        />
      </div>
    </div>


  </>);
}
