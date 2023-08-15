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
    if (!isValid) {
      return 'Error';
    }
    return 'Save';
  };
  return (
    <>
      <LoadingButton
        variant={'contained'}
        color={isValid ? 'primary' : 'error'}
        size={'small'}
        loadingPosition={'start'}
        type={'submit'}
        disabled={disabled}
        loading={isSubmitting}
      >
        {getButtonText()}
      </LoadingButton>
      {status && status.error ?
        (
          <div
            className={` text-center text-danger`}
          >
            {status.message}
          </div>
        ) : null}
    </>
  );
};
