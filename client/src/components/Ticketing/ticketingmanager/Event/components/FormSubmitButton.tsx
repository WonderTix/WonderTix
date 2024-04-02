import {useFormikContext} from 'formik';
import React from 'react';
import {FormButton} from './FormButton';

interface FormSubmitButton {
  className: string;
  testID: string;
  children: JSX.Element | JSX.Element[] | string | (() => JSX.Element);
  disabled?: boolean;
}
export const FormSubmitButton = (props: FormSubmitButton) => {
  const {className, children, testID, disabled= false} = props;
  const {isSubmitting, isValid, isValidating, submitForm} = useFormikContext();

  return (
    <FormButton
      testID={testID}
      onClick={submitForm}
      title='Save'
      disabled={isSubmitting || !isValid || isValidating || disabled}
      className={className}
      type='submit'
    >
      {children}
    </FormButton>
  );
};
