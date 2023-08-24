import {useFormikContext} from 'formik';
import {LoadingButton} from '@mui/lab';
import React from 'react';

export const FormSubmitButton = () => {
  const {
    isSubmitting, isValid,
    isValidating, dirty, status,
  } = useFormikContext();
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
        className={'bg-green-600 hover:bg-green-700  disabled:bg-gray-600 text-white font-bold p-2 rounded-xl'}
      >
        {getButtonText()}
      </button>
    </>
  );
};
