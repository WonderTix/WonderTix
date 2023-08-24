import {useFormikContext} from 'formik';
import React from 'react';

export const FormSubmitButton = () => {
  const {isSubmitting, isValid, isValidating} =
    useFormikContext();
  const disabled = isSubmitting || !isValid || isValidating;
  const getButtonText = () => {
    if (isSubmitting) {
      return 'Saving';
    }
    return 'Save';
  };
  return (
    <>
      <button
        type='submit'
        disabled={disabled}
        className={
          'border border-green-900 bg-green-700 hover:bg-green-800  disabled:bg-gray-600 text-white font-bold p-2 rounded-xl'
        }
        aria-label={'Save'}
      >
        {getButtonText()}
      </button>
    </>
  );
};
