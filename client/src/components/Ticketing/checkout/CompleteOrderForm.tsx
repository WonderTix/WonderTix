import {Field, Form} from 'react-final-form';
import React, {ReactElement} from 'react';
import {FormInput} from './FormInput';
import {useAuth0} from '@auth0/auth0-react';

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
  disabled, // TODO: This prop is being used but has no functionality
  donationForm, // TODO: This prop is being used but has no functionality
}: CompleteOrderFormProps): ReactElement {
  const {isAuthenticated, user} = useAuth0();
  const baseValues = {
    firstName: isAuthenticated && user.given_name?user.given_name:'',
    lastName: isAuthenticated && user.family_name?user.family_name:'',
    streetAddress: '',
    postalCode: '',
    country: '',
    phone: '',
    email: isAuthenticated?user.email: '',
    visitSource: '',
    seatingAcc: 'None',
    comments: '',
    optIn: true,
  };

  const validate = (values) => {
    const errors = {};
    Object.keys(baseValues).forEach((key) => {
      if (['visitSource', 'comments', 'optIn'].includes(key)) return;
      if (!values[key] || values[key] === '') {
        errors[key] = 'Required';
      }
    });
    if (values.seatingAcc === 'Other' && (!values.comments || values.comments === '')) {
      errors['comments'] = 'Please Input Accommodation';
    }
    if (!values.email?.match(new RegExp('.+@.+\\..+'))) {
      errors['email'] = 'Invalid';
    }
    if (!values.phone?.match(new RegExp('^(\\+?\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'))) {
      errors['phone'] = 'Invalid';
    }
    return errors;
  };

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <h2 className='text-2xl font-bold mb-5'>
          Contact
      </h2>
      <div className='min-w-414 sm:w-full h-full'>
        <Form
          onSubmit={onSubmit}
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
                    placeholder='First Name'
                    type='text'
                    id='first-name'
                    labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                    inputClassName="input w-full  border border-zinc-300 p-4 rounded-lg"
                  />
                  <Field
                    component={FormInput}
                    name='lastName'
                    label='Last Name'
                    placeholder='Last Name'
                    type='text'
                    id='last-name'
                    labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                    inputClassName="input w-full  border border-zinc-300 p-4 rounded-lg"
                  />
                  <Field
                    component={FormInput}
                    name='streetAddress'
                    label='Street Address'
                    placeholder='Street Address'
                    type='text'
                    id='address'
                    labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                    inputClassName="input w-full border border-zinc-300 p-4 rounded-lg"
                  />
                  <Field
                    component={FormInput}
                    name='postalCode'
                    label='Postal Code'
                    placeholder='Postal Code'
                    type='text'
                    id='zipcode'
                    labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                    inputClassName="input w-full border border-zinc-300 p-4 rounded-lg"
                  />
                  <Field
                    component={FormInput}
                    name='country'
                    label='Country'
                    placeholder='Country'
                    type='text'
                    id='country'
                    labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                    inputClassName="input w-full border border-zinc-300 p-4 rounded-lg"
                  />
                  <Field
                    component={FormInput}
                    name='phone'
                    label='Phone Number'
                    placeholder='Phone'
                    type='text'
                    id='phone-number'
                    labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                    inputClassName="input w-full border border-zinc-300 p-4 rounded-lg"
                  />
                  <Field
                    component={FormInput}
                    name='email'
                    label='Email'
                    placeholder='Email'
                    type='email'
                    id='contact-email'
                    labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1"
                    inputClassName="input w-full border border-zinc-300 p-4 rounded-lg"
                  />
                  <Field
                    component={FormInput}
                    name='visitSource'
                    label='How did you hear about us?'
                    placeholder='How did you hear about us?'
                    type='text'
                    id='visit-source'
                    labelClassName="block text-sm font-medium text-slate-700 ml-1"
                    inputClassName="input w-full border border-zinc-300 p-4 rounded-lg"
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
                      <option value='None'>
                          Not at this time
                      </option>
                      <option value='Wheel Chair'>
                          Wheelchair seat(s)
                      </option>
                      <option value='Aisle Seat'>
                          Aisle seat(s)
                      </option>
                      <option value='First/Ground floor'>
                          Seat(s) on the ground or the first level
                      </option>
                      <option value='ASL Interpreter'>
                          Seat(s) in the ASL interpreters section
                      </option>
                      <option value='Wide Seats'>
                          Wide seat(s)
                      </option>
                      <option value='Other'>
                          Other (describe in comment section)
                      </option>
                    </Field>
                  </div>
                  <Field
                    component={FormInput}
                    name='comments'
                    type='text'
                    placeholder='What do you want us to know?'
                    id='comments'
                    label='Comments'
                    labelClassName='block text-sm font-medium text-slate-700 ml-1'
                    inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                  />
                </div>
                <div className='flex flex-row gap-4 text-sm pt-2 text-zinc-700'>
                  <Field
                    component='input'
                    type='checkbox'
                    name='optIn'
                    id='opt-in'
                  />
                  <label htmlFor='opt-in'>
                    I would like to receive email info from Portland Playhouse
                  </label>
                </div>
              </div>
              <div className='w-full flex flex-wrap justify-center md:flex-row md:justify-between mt-4 disabled:opacity-40'>
                <button
                  className='bg-red-500 px-8 py-1 text-white rounded-xl hover:bg-red-600 m-2'
                  onClick={onBack}
                  disabled={submitting}
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
  );
}
