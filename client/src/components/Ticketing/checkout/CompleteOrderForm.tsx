import {Field, Form} from 'react-final-form';
import React, {ReactElement} from 'react';
import {FormInput} from '../FormInput';
import {CheckoutContact} from './CheckoutUtils';
import {FormSwitch} from '../ticketingmanager/Season/components/SeasonSubscriptionAndTicketTypes/FormSwitch';

/**
 * Used to complete order
 *
 * @param {Function} onSubmit
 * @param {Function} onBack
 * @param {boolean} disabled
 * @param {boolean} donationForm
 */
type CompleteOrderFormProps = {
  onSubmit: (formData: CheckoutContact) => any;
  onBack: () => any;
  validateInput: (values: any) => any;
  disabled: boolean;
  requiredFields: string[];
  baseValues: CheckoutContact;
  mode: 'customer' | 'admin';
};

/**
 * Displays the complete order form
 *
 * @param {Function} onSubmit onSubmit callback function
 * @param {Function} onBack onBack callback function
 * @param {CheckoutContact} baseValues base form information
 * @param {Function} validateInput form validation function
 * @param {String[]} requiredFields array of required fields
 * @param {Boolean} disabled boolean used to disable next button
 * @param {String} mode used to distinguish between customer or admin facing component
 * @returns {ReactElement}
 */
export default function CompleteOrderForm({
  onSubmit,
  onBack,
  requiredFields,
  validateInput,
  baseValues,
  disabled,
  mode,
}: CompleteOrderFormProps): ReactElement {
  const requiredFieldsSet = new Set(requiredFields);
  return (
    <div className='w-full h-full'>
      <div className='min-w-414 sm:w-full h-full'>
        <Form
          onSubmit={onSubmit}
          validate={validateInput}
          initialValues={baseValues}
          render={({handleSubmit, submitting, values, invalid}) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              className='w-full h-full bg-zinc-200 p-4 rounded-xl flex flex-col justify-between'
            >
              <div
                className={`grid gap-5 ${
                  mode === 'admin'
                    ? 'min-[768px]:max-md:grid-cols-2 min-[1200px]:grid-cols-2'
                    : 'tab:grid-cols-2'
                }`}
              >
                <Field
                  component={FormInput}
                  name='firstname'
                  label='First Name'
                  placeholder='First Name'
                  type='text'
                  id='first-name'
                  labelClassName={`${
                    requiredFieldsSet.has('firstname') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='lastname'
                  label='Last Name'
                  placeholder='Last Name'
                  type='text'
                  id='last-name'
                  labelClassName={`${
                    requiredFieldsSet.has('lastname') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='address'
                  label='Street Address'
                  placeholder='Street Address'
                  type='text'
                  id='address'
                  labelClassName={`${
                    requiredFieldsSet.has('address') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='postalcode'
                  label='Postal Code'
                  placeholder='Postal Code'
                  type='text'
                  id='zipcode'
                  labelClassName={`${
                    requiredFieldsSet.has('postalcode') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='city'
                  label='City'
                  placeholder='City'
                  type='text'
                  id='city'
                  labelClassName={`${
                    requiredFieldsSet.has('city') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='state'
                  label='State'
                  placeholder='State'
                  type='text'
                  id='state'
                  labelClassName={`${
                    requiredFieldsSet.has('state') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='country'
                  label='Country'
                  placeholder='Country'
                  type='text'
                  id='country'
                  labelClassName={`${
                    requiredFieldsSet.has('country') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='phone'
                  label='Phone Number'
                  placeholder='Phone'
                  type='text'
                  id='phone-number'
                  labelClassName={`${
                    requiredFieldsSet.has('phone') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='email'
                  label='Email'
                  placeholder='Email'
                  type='email'
                  id='contact-email'
                  labelClassName={`${
                    requiredFieldsSet.has('email') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='confirmEmail'
                  label='Confirm Email'
                  placeholder='Confirm Email'
                  type='confirmEmail'
                  id='confirm-email'
                  labelClassName={`${
                    requiredFieldsSet.has('email') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <div>
                  <label
                    className={`${
                      requiredFieldsSet.has('seatingaccom') &&
                      `after:content-['*'] after:ml-0.5 after:text-red-500`
                    } block text-sm font-medium text-slate-700 ml-1`}
                    htmlFor='seating-acc'
                  >
                    Seating Accommodations
                  </label>
                  <Field
                    component='select'
                    className='input w-full border border-zinc-300 p-4 mt-1 rounded-lg col-label-2'
                    name='seatingaccom'
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
                    <option value='Other'>Other</option>
                  </Field>
                </div>
                {values.seatingaccom === 'Other' && (
                  <Field
                    component={FormInput}
                    name='otherSeatingAcc'
                    type='text'
                    placeholder='What is your accommodation?'
                    id='other-seating-acc'
                    label='Other Accommodation'
                    labelClassName={`after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1`}
                    inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                  />
                )}
                {mode === 'admin' && (
                  <Field
                    component={FormInput}
                    name='donation'
                    type='number'
                    placeholder='Enter donation amount'
                    id='donation'
                    label='Donation'
                    labelClassName='block text-sm font-medium text-slate-700 ml-1'
                    inputClassName={`input w-full border border-zinc-300 p-4 rounded-lg col-label-2`}
                  />
                )}
                <Field
                  component={FormInput}
                  name='visitsource'
                  label='How did you hear about us?'
                  placeholder='How did you hear about us?'
                  type='text'
                  id='visit-source'
                  labelClassName={`${
                    requiredFieldsSet.has('visitsource') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='comments'
                  type='text'
                  placeholder='What do you want us to know?'
                  id='comments'
                  label='Comments'
                  labelClassName={`${
                    requiredFieldsSet.has('comments') &&
                    `after:content-['*'] after:ml-0.5 after:text-red-500`
                  } block text-sm font-medium text-slate-700 ml-1`}
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <div className='flex flex-row gap-4 text-sm pt-2 text-zinc-700'>
                  <Field name='newsletter'>
                    {({input}) => (
                      <FormSwitch
                        field={input}
                        onChange={input.onChange}
                        label='I would like to receive email info from Portland Playhouse'
                        color='primary'
                        size='medium'
                        className={{
                          labelClass:
                            'text-base font-medium text-slate-700 ml-1',
                          controlClass: 'flex flex-row-reverse items-center',
                        }}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <div className='w-full flex flex-wrap justify-center md:flex-row md:justify-between mt-4 disabled:opacity-40'>
                <button
                  className='bg-red-500 px-8 py-1 text-white rounded-xl hover:bg-red-600 disabled:bg-gray-300 m-2'
                  onClick={onBack}
                  disabled={submitting}
                >
                  Back
                </button>
                <button
                  className='bg-blue-500 px-8 py-1 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 m-2'
                  type='submit'
                  disabled={submitting || disabled || invalid}
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
