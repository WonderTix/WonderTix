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
}

export const InputControl = (props: InputControlProps) => {
  const {id, field, className, type, hidden, label, disabled} = props;

  const inputProps = {
    id: id + field.name,
    type: type,
    name: field.name,
    value: field.value,
    onChange: field.onChange,
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
        {type === 'textarea' ? (
          <textarea {...inputProps} />
        ) : (
          <input {...inputProps} />
        )}
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
