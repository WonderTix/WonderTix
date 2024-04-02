import React, {useState} from 'react';
import {FormButton} from './FormButton';

interface FormDeleteButtonProps {
  className: string;
  onDelete: (event?) => void;
  disabled: boolean;
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  testID?: string;
}
export const FormDeleteButton = (props: FormDeleteButtonProps) => {
  const {onDelete, children, className, testID, disabled} = props;
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <FormButton
      testID={testID}
      title='Delete'
      disabled={isDeleting || disabled}
      className={className}
      onClick={async () => {
        setIsDeleting(true);
        if (onDelete.length === 0) {
          await onDelete();
          setIsDeleting(false);
          return;
        }
        await onDelete(setIsDeleting);
      }}
    >
      {children}
    </FormButton>
  );
};
