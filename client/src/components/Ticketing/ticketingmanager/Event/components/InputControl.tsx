import React from 'react';
import {ErrorMessage} from 'formik';

interface InputControlProps {
  field: {onChange; onBlur; name; value};
  type: string;
  hidden?: boolean;
  label: string;
  id: number;
  disabled?: boolean;
  className?: {
    controlClass: string;
    labelClass: string;
    inputClass: string;
    inputGroupClass: string;
  };
  onChange?;
  currency?: boolean;
}

export const InputControl = (props: InputControlProps) => {
  const {
    id,
    field,
    className,
    type,
    hidden,
    label,
    disabled,
    onChange,
    currency,
  } = props;

  const inputProps = {
    id: id + field.name,
    type: type,
    name: field.name,
    value: field.value,
    onChange: onChange ?? field.onChange,
    onBlur: field.onBlur,
    disabled: disabled,
    className: className?.inputClass,
  };

  return (
    <div className={className?.controlClass}>
      <label
        hidden={hidden}
        htmlFor={inputProps.id}
        className={className?.labelClass}
      >
        {`${label}: `}
      </label>
      <div className={className?.inputGroupClass}>
        <span className={`${currency ? `before:content-['$'] before:ml-1` : ''} flex flex-row items-center`}>
          {type === 'textarea' ? (
            <textarea {...inputProps} />
          ) : (
            <input {...inputProps} />
          )}
        </span>
        <ErrorMessage
          name={field.name}
          render={(message) => (
            <p className={'font-medium text-center ' + 'text-red-500 text-xs'}>
              {message}
            </p>
          )}
        />
      </div>
    </div>
  );
};
