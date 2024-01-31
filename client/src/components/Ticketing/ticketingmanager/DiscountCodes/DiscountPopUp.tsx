import React, {ReactElement, useEffect, useRef} from 'react';
import {Field, Form} from 'react-final-form';
import {FormInput} from '../../FormInput';
import {DiscountCode} from './discountUtils';
import {ExclamationCircleIcon, XIcon} from '../../Icons';

export interface DiscountPopUpProps {
  errorMessage?: string;
  onCancel: (event: any) => void;
  onSubmit: (event: any) => void;
  primaryLabel?: string;
  title?: string;
  values: DiscountCode;
}

/**
 * The DiscountPopUp component handles adding or editing a discount code.
 *
 * @param {DiscountPopUpProps} props
 * @param {string} props.errorMessage - Optional error message to display
 * @param {func} props.onCancel - On cancel handler
 * @param {func} props.onSubmit - On submit handler
 * @param {string?} props.primaryLabel - Text inside primary button
 * @param {string?} props.title - Title of discount code popup
 * @param {Contact} props.values - The values to autofill the popup when it's rendered
 * @returns {ReactElement} DiscountPopUp WonderTix form modal
 */
const DiscountPopUp = (props: DiscountPopUpProps): ReactElement => {
  const {
    errorMessage,
    onCancel,
    onSubmit,
    primaryLabel = 'Submit',
    title = 'Create Discount Code',
    values,
  } = props;

  const discountCodePopUpRef = useRef(null);

  useEffect(() => {
    // Code within the useEffect traps focus within the DiscountPopUp when tabbing through
    // interactible elements. See: https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b
    const popUpElement = discountCodePopUpRef.current;
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

  const validate = (formValues: DiscountCode) => {
    const errors = {};
    if (formValues.code?.length > 32) {
      errors['code'] = 'Must be 32 characters or less';
    }
    if (formValues.amount < 0) {
      errors['amount'] = 'Must be 0 or greater';
    }
    if (formValues.percent < 0 || formValues.percent > 100) {
      errors['percent'] = 'Must be between 0 and 100';
    }
    if (formValues.minTickets < 0) {
      errors['minTickets'] = 'Must be 0 or greater';
    }
    if (formValues.minEvents < 0) {
      errors['minEvents'] = 'Must be 0 or greater';
    }

    if (!formValues.amount && !formValues.percent) {
      errors['amount'] = 'Amount or Percent must have a value';
      errors['percent'] = 'Amount or Percent must have a value';
    }

    Object.keys(values).forEach((key) => {
      if (['code'].includes(key) &&
        (!formValues[key] || formValues[key] === '')) {
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
      ref={discountCodePopUpRef}
    >
      <div className='relative z-10 bg-white rounded-lg tab:mx-auto w-full tab:max-w-lg max-h-full overflow-y-scroll shadow-xl'>
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
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={values}
          render={({handleSubmit, submitting}) => (
            <form onSubmit={handleSubmit} noValidate>
              <h3
                className='text-lg leading-6 font-medium text-gray-900 p-4 pt-5 tab:p-6'
                id='contact-popup-title'
              >
                {title}
              </h3>
              {errorMessage && (
                <p className='rounded-md bg-red-200 text-red-800 font-semibold flex items-center justify-center gap-2 px-2 py-1 mx-4 tab:mx-6 mb-4'>
                  <ExclamationCircleIcon className='h-5 w-5' strokeWidth={2.5} />
                  {errorMessage}
                </p>
              )}
              <article className='flex flex-col gap-y-3 px-4 pb-4 tab:px-6 tab:pb-6'>
                <Field
                  required
                  component={FormInput}
                  name='code'
                  label='Code'
                  placeholder='Code'
                  type='text'
                  id='code'
                  labelClassName='after:content-["*"] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ml-1'
                  inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                />
                <div className='grid gap-3 tab:grid-cols-2'>
                  <Field
                    required
                    component={FormInput}
                    name='amount'
                    label='Amount Off'
                    placeholder='Amount Off'
                    type='number'
                    id='amount'
                    labelClassName='block text-sm font-medium text-slate-700 ml-1'
                    inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                  />
                  <Field
                    required
                    component={FormInput}
                    name='percent'
                    label='Percent Off'
                    placeholder='Percent Off'
                    type='number'
                    id='percent'
                    labelClassName='block text-sm font-medium text-slate-700 ml-1'
                    inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                  />
                </div>
                <div className='grid gap-3 tab:grid-cols-2'>
                  <Field
                    component={FormInput}
                    name='minTickets'
                    label='Minimum Tickets'
                    placeholder='Minimum Tickets'
                    type='number'
                    id='minTickets'
                    labelClassName='block text-sm font-medium text-slate-700 ml-1'
                    inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                  />
                  <Field
                    component={FormInput}
                    name='minEvents'
                    label='Minimum Events'
                    placeholder='Minimum Events'
                    type='number'
                    id='minEvents'
                    labelClassName='block text-sm font-medium text-slate-700 ml-1'
                    inputClassName='w-full border border-zinc-300 p-3 rounded-lg'
                  />
                </div>
              </article>
              <footer className='bg-gray-50 px-4 py-3 tab:px-6 flex flex-col-reverse tab:flex-row tab:justify-end gap-3'>
                <button
                  data-modal-toggle='discount-popup-modal'
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
                  data-modal-toggle='discount-popup-modal'
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
      </div>
    </dialog>
  );
};

export default DiscountPopUp;
