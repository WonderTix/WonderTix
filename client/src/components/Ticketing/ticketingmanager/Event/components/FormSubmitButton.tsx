import {useFormikContext} from 'formik';
import React from 'react';
import {useEvent} from './EventProvider';
import {FormButton} from './FormButton';

interface FormSubmitButton {
  className: string;
  testID: string;
  children: JSX.Element | JSX.Element[] | string | (() => JSX.Element);
}
export const FormSubmitButton = (props: FormSubmitButton) => {
  const {className, children, testID} = props;
  const {isSubmitting, isValid, isValidating, submitForm} = useFormikContext();
  const {showPopUp} = useEvent();

  return (
    <FormButton
      testID={testID}
      onClick={submitForm}
      title={'Save'}
      disabled={isSubmitting || !isValid || isValidating || showPopUp}
      className={className}
      type='submit'
    >
      {children}
    </FormButton>
  );
};
