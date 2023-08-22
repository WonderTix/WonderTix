import {useFormikContext} from 'formik';
import {LoadingButton} from '@mui/lab';
import React from 'react';

export const FormSubmitButton = () => {
  const {
    isSubmitting, isValid,
    isValidating, dirty, status,
  } = useFormikContext();
  const disabled = isSubmitting && !isValid && !dirty && isValidating;
  const getButtonText = () => {
    if (isSubmitting) {
      return 'Saving';
    }
    return 'Save';
  };
  return (
    <>
      <LoadingButton
        variant={'contained'}
        color={'success'}
        loadingPosition={'start'}
        type={'submit'}
        disabled={disabled}
        loading={isSubmitting}
      >
        {getButtonText()}
      </LoadingButton>
    </>
  );
};
