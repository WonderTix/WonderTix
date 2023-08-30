import {useFormikContext} from 'formik';
import React from 'react';

export const FormSubmitButton = () => {
  const {isSubmitting, isValid, isValidating} = useFormikContext();
  const disabled = isSubmitting || !isValid || isValidating;
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
