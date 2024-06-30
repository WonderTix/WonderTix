import React from 'react';
import {Tooltip} from '@mui/material';

interface FormButtonProps {
  onClick: () => void;
  title?: string;
  disabled: boolean;
  className: string;
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  testID: string;
  type?: 'submit' | 'button' | 'reset';
}

export const FormButton = (props: FormButtonProps) => {
  const {
    onClick,
    disabled,
    className,
    title,
    children,
    type = 'button',
    testID,
  } = props;
  return (
    <Tooltip title={title} placement='top' arrow hidden={!title}>
      <span className='flex flex-col'>
        <button
          data-testid={testID}
          className={className}
          onClick={onClick}
          disabled={disabled}
          type={type}
        >
          {children}
        </button>
      </span>
    </Tooltip>
  );
};
