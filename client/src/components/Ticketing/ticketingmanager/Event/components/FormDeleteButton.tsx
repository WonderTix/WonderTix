import React, {useState} from 'react';
import {useEvent} from './EventProvider';
import {FormButton} from './FormButton';

interface FormDeleteButtonProps {
  className: string;
  onDelete: (event?) => void;
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  testID?: string;
}
export const FormDeleteButton = (props: FormDeleteButtonProps) => {
  const {onDelete, children, className, testID} = props;
  const [isDeleting, setIsDeleting] = useState(false);
  const {showPopUp, editing} = useEvent();

  return (
    <FormButton
      testID={testID}
      title='Delete'
      disabled={isDeleting || showPopUp || editing}
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
