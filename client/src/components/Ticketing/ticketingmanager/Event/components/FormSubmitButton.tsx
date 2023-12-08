import {useFormikContext} from 'formik';
import React from 'react';
import {useEvent} from './EventProvider';

export const FormSubmitButton = () => {
  const {isSubmitting, isValid, isValidating} = useFormikContext();
  const {showPopUp} = useEvent();
  const disabled = isSubmitting || !isValid || isValidating || showPopUp;
  const getButtonText = () => {
    if (isSubmitting) {
      return 'Saving';
    }
    return 'Save';
  };
  return (
    <button
      type='submit'
      disabled={disabled}
      className={
        'bg-green-500 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl h-fit'
      }
      aria-label={'Save'}
    >
      {getButtonText()}
    </button>
  );
};
