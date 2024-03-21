import React, {ReactElement, useEffect, useRef} from 'react';
import {Field, Form} from 'react-final-form';
import {Contact, seatingAccOptions, seatingAccInOptions} from './contactUtils';
import {FormInput} from '../../Ticketing/FormInput';
import {ExclamationIcon, XIcon} from '../../Ticketing/Icons';

interface ContactPopUpProps {
  errorMessage?: string;
  onCancel: (event: any) => void;
  onSubmit: (event: any) => void;
  primaryLabel?: string;
  title?: string;
  values: Contact;
}

/**
 * The ContactPopUp component handles adding or editing a contact.
 *
 * @param {ContactPopUpProps} props
 * @param {string} props.errorMessage - Optional error message to display
 * @param {func} props.onCancel - On cancel handler
 * @param {func} props.onSubmit - On submit handler
 * @param {string?} props.primaryLabel - Text inside primary button
 * @param {string?} props.title - Title of contact popup
 * @param {Contact} props.values - The values to autofill the popup when it's rendered
 * @returns {ReactElement} ContactPopUp WonderTix form modal
 */
const ContactPopUp = (props: ContactPopUpProps): ReactElement => {
  const {
    errorMessage,
    onCancel,
    onSubmit,
    primaryLabel = 'Submit',
    title = 'Create Contact',
    values,
  } = props;

  // Assigns seatingAcc to otherSeatingAcc input if there's a custom accommodation
  const contact = {
    ...values,
    ...(!seatingAccInOptions(values.seatingAcc)
      ? {
          otherSeatingAcc: values.seatingAcc,
          seatingAcc: 'Other',
        }
      : null),
  };

  const contactPopUpRef = useRef(null);

  useEffect(() => {
    // Code within the useEffect traps focus within the ContactPopUp when tabbing through
    // interactible elements. See: https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b
    const popUpElement = contactPopUpRef.current;
    popUpElement.focus();

    const focusableElements = popUpElement.querySelectorAll(
      'button, input, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKeyPress = (event) => {
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        if (onCancel) {
          onCancel(event);
        }
      }
    };

    popUpElement.addEventListener('keydown', handleTabKeyPress);
    popUpElement.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      popUpElement.removeEventListener('keydown', handleTabKeyPress);
      popUpElement.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []);

  const validate = (formValues: Contact) => {
    const errors = {};

    if (
      formValues.seatingAcc === 'Other' &&
      (!formValues.otherSeatingAcc || formValues.otherSeatingAcc === '')
    ) {
      errors['otherSeatingAcc'] = 'Please Input Accommodation';
    }
    if (!formValues.email?.match(new RegExp('.+@.+\\..+'))) {
      errors['email'] = 'Invalid';
    }
    if (
      formValues.phone &&
      formValues.phone !== '' &&
      !formValues.phone?.match(
        new RegExp(
          '^(\\+?\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$',
        ),
      )
    ) {
      errors['phone'] = 'Invalid';
    }

    Object.keys(values).forEach((key) => {
      if (
        ['first', 'last', 'email'].includes(key) &&
        (!formValues[key] || formValues[key] === '')
      ) {
        errors[key] = 'Required';
      }
    });

    return errors;
  };

  return (
    <dialog
      className='fixed flex tab:items-center items-end bg-gray-500 bg-opacity-75 transition-opacity z-10 w-full h-full inset-0'
      aria-labelledby='contact-popup-title'
      aria-modal='true'
      ref={contactPopUpRef}
    >
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={contact}
        render={({handleSubmit, submitting, values}) => (
          <form
            onSubmit={handleSubmit}
            noValidate
            className='relative z-10 bg-white rounded-lg shadow-xl tab:mx-auto w-full tab:max-w-lg max-h-full overflow-y-auto'
          >
            <header className='sticky top-0 bg-white w-full'>
              <h3
                className='text-lg leading-6 font-medium text-center tab:text-start text-gray-900 p-4 pt-5 tab:p-6'
                id='contact-popup-title'
              >
                {title}
              </h3>
              {errorMessage && (
                <p className='rounded-md bg-red-200 text-red-800 font-semibold flex items-center justify-center gap-2 px-2 py-1 mx-4 tab:mx-6 mb-4'>
                  <ExclamationIcon className='h-6 w-6' strokeWidth={2} />
                  {errorMessage}
                </p>
              )}
              <button
                type='button'
                onClick={onCancel}
                className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200
                  hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center'
                data-modal-toggle='popup-modal'
                aria-label='Close modal'
              >
                <XIcon className='w-5 h-5' strokeWidth={2.5} />
              </button>
            </header>
            <article className='flex flex-col gap-y-3 px-4 pb-4 tab:px-6 tab:pb-6'>
              <div className='grid gap-3 tab:grid-cols-2'>
                <Field
                  required
                  component={FormInput}
                  name='first'
                  label='First Name'
                  placeholder='First Name'
                  type='text'
                  id='first'
                  labelClassName='after:content-["*"] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1'
                  inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                />
                <Field
                  required
                  component={FormInput}
                  name='last'
                  label='Last Name'
                  placeholder='Last Name'
                  type='text'
                  id='last'
                  labelClassName='after:content-["*"] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1'
                  inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                />
              </div>
              <Field
                required
                component={FormInput}
                name='email'
                label='Email'
                placeholder='Email'
                type='email'
                id='email'
                labelClassName='after:content-["*"] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1'
                inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
              />
              <Field
                component={FormInput}
                name='phone'
                label='Phone Number'
                placeholder='Phone'
                type='text'
                id='phone'
                labelClassName='block text-sm font-medium text-slate-700 ml-1'
                inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
              />
              <Field
                component={FormInput}
                name='address'
                label='Street Address'
                placeholder='Street Address'
                type='text'
                id='address'
                labelClassName='block text-sm font-medium text-slate-700 ml-1'
                inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
              />
              <div className='grid gap-3 tab:grid-cols-2'>
                <Field
                  component={FormInput}
                  name='city'
                  label='City'
                  placeholder='City'
                  type='text'
                  id='city'
                  labelClassName='block text-sm font-medium text-slate-700 ml-1'
                  inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='state'
                  label='State'
                  placeholder='State'
                  type='text'
                  id='state'
                  labelClassName='block text-sm font-medium text-slate-700 ml-1'
                  inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                />
              </div>
              <div className='grid gap-3 tab:grid-cols-2'>
                <Field
                  component={FormInput}
                  name='country'
                  label='Country'
                  placeholder='Country'
                  type='text'
                  id='country'
                  labelClassName='block text-sm font-medium text-slate-700 ml-1'
                  inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='postalCode'
                  label='Postal Code'
                  placeholder='Postal Code'
                  type='text'
                  id='zipcode'
                  labelClassName='block text-sm font-medium text-slate-700 ml-1'
                  inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                />
              </div>
              <div>
                <label
                  className='block text-sm font-medium text-slate-700 ml-1'
                  htmlFor='seating-acc'
                >
                  Seating Accommodations
                </label>
                <Field
                  component='select'
                  className='w-full border border-zinc-300 p-3 rounded-lg col-label-2 cursor-pointer'
                  name='seatingAcc'
                  id='seating-acc'
                >
                  {Object.keys(seatingAccOptions).map((value, index) => (
                    <option key={index} value={value}>
                      {seatingAccOptions[value]}
                    </option>
                  ))}
                </Field>
              </div>
              {(values.seatingAcc === 'Other' ||
                !seatingAccInOptions(values.seatingAcc)) && (
                <Field
                  component={FormInput}
                  name='otherSeatingAcc'
                  type='text'
                  placeholder='What is their accommodation?'
                  id='other-seating-acc'
                  label='Other Accommodation'
                  labelClassName='block text-sm font-medium text-slate-700 ml-1'
                  inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                />
              )}
              <Field
                component={FormInput}
                name='comments'
                type='text'
                placeholder='Comments'
                id='comments'
                label='Comments'
                labelClassName='block text-sm font-medium text-slate-700 ml-1'
                inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
              />
              <div className='grid gap-x-3 gap-y-2 tab:grid-cols-2 ml-2 mt-1'>
                <div className='flex gap-4 text-sm text-zinc-700'>
                  <Field
                    component='input'
                    type='checkbox'
                    name='newsletter'
                    id='newsletter'
                  />
                  <label htmlFor='newsletter'>Subscribe to Newsletter</label>
                </div>
                <div className='flex gap-4 text-sm text-zinc-700'>
                  <Field
                    component='input'
                    type='checkbox'
                    name='donorBadge'
                    id='donor-badge'
                  />
                  <label htmlFor='donor-badge'>Donor Badge</label>
                </div>
                <div className='flex gap-4 text-sm text-zinc-700'>
                  <Field
                    component='input'
                    type='checkbox'
                    name='vip'
                    id='vip'
                  />
                  <label htmlFor='vip'>VIP</label>
                </div>
                <div className='flex gap-4 text-sm text-zinc-700'>
                  <Field
                    component='input'
                    type='checkbox'
                    name='volunteerList'
                    id='volunteer-list'
                  />
                  <label htmlFor='volunteer-list'>Volunteer List</label>
                </div>
              </div>
            </article>
            <footer className='sticky bottom-0 bg-gray-50 w-full px-4 py-3 tab:px-6 flex flex-col-reverse tab:flex-row tab:justify-end gap-3'>
              <button
                data-modal-toggle='contact-popup-modal'
                disabled={submitting}
                type='button'
                onClick={onCancel}
                className='w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white
                  font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                  focus:ring-offset-2 focus:ring-indigo-500 tab:w-auto text-base tab:text-sm'
              >
                Cancel
              </button>
              <button
                data-modal-toggle='contact-popup-modal'
                disabled={submitting}
                type='submit'
                className='bg-green-600 hover:bg-green-800 focus:ring-green-300 cursor-pointer
                  w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
                  text-white focus:outline-none focus:ring-2 focus:ring-offset-2 tab:w-auto tab:text-sm'
              >
                {primaryLabel}
              </button>
            </footer>
          </form>
        )}
      />
    </dialog>
  );
};

export default ContactPopUp;
