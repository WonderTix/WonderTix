/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {Form, Field} from 'react-final-form';
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
export default function CompleteOrderForm({
  onSubmit,
  onBack,
}: CompleteOrderFormProps): ReactElement {
  const baseValues = {
    firstName: '',
    lastName: '',
    streetAddress: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
    visitSource: '',
    seatingAcc: 'None',
    comments: '',
    optIn: false,
  };

  const handleSubmit = async (values, form) => {
    console.log(values);
    await onSubmit(values);
  };
  const validate = (values) => {
    const errors = {};
    Object.keys(values).forEach((key) => {
      if (['phone', 'visitSource', 'comments', 'optIn'].includes(key)) return;
      if (!values[key] || values[key] === '') {
        errors[key] = 'Required';
      }
    });
    if (values.seatingAcc === 'Other' && values.comments === '') {
      errors['comments'] = 'If other comment required';
    }
    if (!values.postalCode?.match(new RegExp('.*'))) {
      errors['postalCode'] = 'Invalid';
    }
    if (!values.email?.match(new RegExp('.*'))) {
      errors['email'] = 'Invalid';
    }
    if (values.phone !== '' && !values.phone?.match(new RegExp('.*'))) {
      errors['phone'] = 'Invalid';
    }
    return errors;
  };
  return (
    <>
      <div className='w-full h-full flex flex-col items-center '>
        <h2 className='text-2xl font-bold mb-5'>Contact</h2>
        <div className='min-w-414 sm:w-full h-full'>
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            initialValues={baseValues}
            render={({handleSubmit, submitting}) => (
              <form
                onSubmit={handleSubmit}
                noValidate
                className='w-full h-full bg-zinc-200 p-4 rounded-xl flex flex-col justify-between'
              >
                <div className='flex flex-col w-auto'>
                  <div className='grid gap-5 md:grid-cols-2'>
                    <Field
                      component={FormInput}
                      name='firstName'
                      label='First Name'
                      type='text'
                      id='first-name'
                      labelClass="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      inputClass="input w-full  border border-zinc-300 p-4 rounded-lg"
                    />
                    <Field
                      component={FormInput}
                      name='lastName'
                      label='Last Name'
                      type='text'
                      id='last-name'
                      labelClass="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      inputClass="input w-full  border border-zinc-300 p-4 rounded-lg"
                    />
                    <Field
                      component={FormInput}
                      name='streetAddress'
                      label='Street Address'
                      type='text'
                      id='address'
                      labelClass="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      inputClass="input w-full border border-zinc-300 p-4 rounded-lg"
                    />
                    <Field
                      component={FormInput}
                      name='postalCode'
                      label='Postal Code'
                      type='text'
                      id='zipcode'
                      labelClass="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      inputClass="input w-full border border-zinc-300 p-4 rounded-lg"
                    />
                    <Field
                      component={FormInput}
                      name='country'
                      label='Country'
                      type='text'
                      id='country'
                      labelClass="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      inputClass="input w-full border border-zinc-300 p-4 rounded-lg"
                    />
                    <Field
                      component={FormInput}
                      name='phone'
                      label='Phone Number'
                      type='text'
                      id='phone-number'
                      labelClass="block text-sm font-medium text-slate-700 ml-1"
                      inputClass="input w-full border border-zinc-300 p-4 rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
                    />
                    <Field
                      component={FormInput}
                      name='email'
                      label='Email'
                      type='email'
                      id='contact-email'
                      labelClass="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                      inputClass="input w-full border border-zinc-300 p-4 rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
                    />
                    <Field
                      component={FormInput}
                      name='visitSource'
                      label='How did you hear about us?'
                      type='text'
                      id='visit-source'
                      labelClass="block text-sm font-medium text-slate-700 ml-1"
                      inputClass="input w-full border border-zinc-300 p-4 rounded-lg"
                    />
                    <div>
                      <label
                        className='block text-sm font-medium text-slate-700 ml-1'
                        htmlFor='seating-acc'
                      >
                        Seating Accommodations
                      </label>
                      <Field
                        component='select'
                        className='input w-full border border-zinc-300 p-4 mt-1 rounded-lg col-label-2'
                        name='seatingAcc'
                        id='seating-acc'
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
                      </Field>
                    </div>
                    <Field
                      component={FormInput}
                      name='comments'
                      type='text'
                      id='comments'
                      label='Comments'
                      labelClass='block text-sm font-medium text-slate-700 ml-1'
                      inputClass='input w-full border border-zinc-300 p-4 rounded-lg '
                    />
                  </div>
                  <div className='flex flex-col items-start gap-3 mt-5 mb-5'>
                    <div className='flex flex-row items-center gap-4 text-sm text-zinc-700'>
                      <Field
                        component={'input'}
                        type='checkbox'
                        name='optIn'
                      />
                      <div>
                        I would like to receive email info from Portland
                        Playhouse
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full flex flex-wrap justify-center md:flex-row md:justify-between mt-4'>
                  <button
                    disabled={submitting}
                    className='bg-red-500 px-8 py-1 text-white rounded-xl hover:bg-red-600 m-2'
                    onClick={onBack}
                  >
                    Back
                  </button>
                  <button
                    className='bg-blue-500 px-8 py-1 text-white rounded-xl hover:bg-blue-600 disabled:opacity-40 m-2'
                    type='submit'
                    disabled={submitting}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </>
  );
}

interface FormInputProps {
  input: {name, onChange, onBlur, onFocus, value}
  meta,
  name: string,
  type: string,
  id: string,
  label: string,
  labelClass: string,
  inputClass: string,
  divClass?: string,

}
const FormInput = (props: FormInputProps) => {
  const {
    id,
    name,
    type,
    input,
    inputClass,
    labelClass,
    divClass,
    label,
    meta,
  } = props;

  return (
    <div className={divClass}>
      <label
        className={labelClass}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={inputClass}
        onChange={input.onChange}
        value={input.value}
        type={type}
        name={name}
        id={id}
        style={meta.touched && meta.error? {border: '1px solid red'}: {}}
      />
      {/* {meta.error && meta.touched && <span className={'text-xs text-red-700'}>{meta.error}</span>}*/}
    </div>
  );
};
