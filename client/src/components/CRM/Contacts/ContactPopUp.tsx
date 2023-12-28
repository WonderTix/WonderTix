import React, {ReactElement, useEffect, useRef} from 'react';
import {Field, Form} from 'react-final-form';
import {Checkbox} from '@mui/material';
import {FormInput} from '../../Ticketing/FormInput';

export type Contact = {
  first: string,
  last: string,
  email: string,
  phone: string,
  address: string,
  comments?: string,
  seatingAcc: string,
  newsletter: boolean,
  vip: boolean,
  donorBadge: boolean,
  volunteerList: boolean,
}

/**
 * Interface for ContactPopUp Component.
 * Describes the title and the message that is sent to the component.
 * Contains call back to parent component to close the PopUp windows.
 */
interface ContactPopUpProps {
  onCancel: (event: any) => void;
  onSubmit: (event: any) => void;
  primaryLabel?: string;
  title?: string;
  values: Contact;
}

/**
 * The PopUp component, the WonderTix representation of a modal.
 *
 * @param {ContactPopUpProps} props
 * @param {func} props.onCancel - On cancel handler
 * @param {func} props.onSubmit - On submit handler
 * @param {string?} props.primaryLabel - Text inside primary button
 * @param {string?} props.title - Title of contact popup
 * @param {Contact} props.values -
 * @returns {ReactElement} PopUp WonderTix modal
 */
const ContactPopUp = (props: ContactPopUpProps): ReactElement => {
  const {
    onCancel,
    onSubmit,
    primaryLabel = 'Submit',
    title = 'Create Contact',
    values,
  } = props;

  const contactPopUpRef = useRef(null);

  useEffect(() => {
    // Code within the useEffect traps focus within the PopUp when tabbing through
    // button elements. See: https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b
    const popUpElement = contactPopUpRef.current;
    popUpElement.focus();

    // FIXME: Cannot tab to the submit button
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

    if (formValues.seatingAcc === 'Other' && (!formValues.comments || formValues.comments === '')) {
      errors['comments'] = 'Please Input Accommodation';
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
      if (!['first', 'last', 'email'].includes(key)) return;
      if (!formValues[key] || formValues[key] === '') {
        errors[key] = 'Required';
      }
    });

    return errors;
  };

  return (
    <dialog
      className='fixed flex tab:items-center items-end bg-gray-500 bg-opacity-75 transition-opacity z-10 w-full h-full max-h-screen inset-0'
      aria-labelledby='contact-popup-title'
      aria-modal='true'
      ref={contactPopUpRef}
    >
      <div
        className='relative z-10 bg-white rounded-lg overflow-hidden mx-2 tab:mx-auto my-2 tab:max-w-lg w-full shadow-xl transform transition-all'
      >
        <button
          type='button'
          onClick={onCancel}
          className='absolute top-3
            right-2.5 text-gray-400 bg-transparent hover:bg-gray-200
            hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto
            inline-flex items-center'
          data-modal-toggle='popup-modal'
          aria-label='Close modal'
        >
          <svg
            aria-hidden='true'
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414
                1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293
                4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <h3
          className='text-lg leading-6 font-medium text-gray-900 p-4 pt-5 tab:p-6 tab:pb-4'
          id='contact-popup-title'
        >
          {title}
        </h3>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={values}
          render={({handleSubmit, submitting}) => (
            <form onSubmit={handleSubmit} noValidate>
              <div className='px-4 pb-3'>
                <div className='grid gap-3 md:grid-cols-2'>
                  <Field
                    required
                    component={FormInput}
                    name='first'
                    label='First Name'
                    placeholder='First Name'
                    type='text'
                    id='first'
                    labelClassName='after:content-["*"] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1'
                    inputClassName='input w-full  border border-zinc-300 p-4 rounded-lg'
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
                    inputClassName='input w-full  border border-zinc-300 p-4 rounded-lg'
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
                  labelClassName='after:content-["*"] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1 mt-3'
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='phone'
                  label='Phone Number'
                  placeholder='Phone'
                  type='text'
                  id='phone'
                  labelClassName='block text-sm font-medium text-slate-700 ml-1 mt-3'
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <Field
                  component={FormInput}
                  name='address'
                  label='Street Address'
                  placeholder='Street Address'
                  type='text'
                  id='address'
                  labelClassName='block text-sm font-medium text-slate-700 ml-1 mt-3'
                  inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                />
                <div>
                  <label
                    className='block text-sm font-medium text-slate-700 ml-1 mt-3'
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
                {values.seatingAcc === 'Other' && (
                  <Field
                    component={FormInput}
                    name='comments'
                    type='text'
                    placeholder='What is their accommodation?'
                    id='comments'
                    label='Comments'
                    labelClassName='block text-sm font-medium text-slate-700 ml-1 mt-3'
                    inputClassName='input w-full border border-zinc-300 p-4 rounded-lg'
                  />
                )}
                <div className='grid gap-x-3 md:grid-cols-2 mt-3'>
                  <div className='flex flex-row gap-4 text-sm pt-2 text-zinc-700'>
                    <Field
                      component='input'
                      type='checkbox'
                      name='newsletter'
                      id='newsletter'
                    />
                    <label htmlFor='newsletter'>
                      Newsletter Subscribed
                    </label>
                  </div>
                  <div className='flex flex-row gap-4 text-sm pt-2 text-zinc-700'>
                    <Field
                      component='input'
                      type='checkbox'
                      name='donorBadge'
                      id='donor-badge'
                    />
                    <label htmlFor='donor-badge'>
                      Donor Badge
                    </label>
                  </div>
                  <div className='flex flex-row gap-4 text-sm pt-2 text-zinc-700'>
                    <Field
                      component='input'
                      type='checkbox'
                      name='vip'
                      id='vip'
                    />
                    <label htmlFor='vip'>
                      VIP
                    </label>
                  </div>
                  <div className='flex flex-row gap-4 text-sm pt-2 text-zinc-700'>
                    <Field
                      component='input'
                      type='checkbox'
                      name='volunteerList'
                      id='volunteer-list'
                    />
                    <label htmlFor='volunteer-list'>
                      Volunteer List
                    </label>
                  </div>
                </div>
              </div>
              <footer className='bg-gray-50 px-4 py-3 tab:px-6 flex flex-col-reverse tab:flex-row tab:justify-end'>
                <button
                  data-modal-toggle='contact-popup-modal'
                  disabled={submitting}
                  onClick={onCancel}
                  className='mt-3 w-full inline-flex
                    justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base
                    font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-indigo-500 tab:mt-0 tab:ml-3 tab:w-auto tab:text-sm'
                >
                  Cancel
                </button>
                <button
                  data-modal-toggle='contact-popup-modal'
                  disabled={submitting}
                  type='submit'
                  className='bg-green-600 hover:bg-green-800 focus:ring-green-300 cursor-pointer
                    w-full inline-flex justify-center rounded-md border border-transparent
                    shadow-sm px-4 py-2 text-base font-medium text-white
                    disabled:bg-gray-900
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    tab:ml-3 tab:w-auto tab:text-sm'
                >
                  {primaryLabel}
                </button>
              </footer>
            </form>
          )}
        />
      </div>
    </dialog>
  );
};

export default ContactPopUp;
