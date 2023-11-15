import React from 'react';

interface FormInputProps {
  input: { name, onChange, onBlur, onFocus, value }
  meta,
  name: string,
  type: string,
  id: string,
  label: string,
  labelClassName: string,
  inputClassName: string,
  className?: string,
  placeholder: string,
}

export const FormInput = (props: FormInputProps) => {
  const {
    id,
    name,
    type,
    input,
    inputClassName,
    labelClassName,
    className,
    label,
    placeholder,
    meta,
  } = props;

  return (
    <div className={className}>
      <label
        className={labelClassName}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={inputClassName}
        onChange={input.onChange}
        placeholder={placeholder}
        value={input.value}
        type={type}
        name={name}
        id={id}
        style={meta.touched && meta.error ? {border: '1px solid red'}:{}}
      />
      {meta.error && meta.touched && <span className={'pl-1 text-xs text-red-600'}>{meta.error}</span>}
    </div>
  );
};
