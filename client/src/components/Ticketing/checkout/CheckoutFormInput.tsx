import React from 'react';

interface FormInputProps {
  input: { name, onChange, onBlur, onFocus, value }
  meta,
  name: string,
  type: string,
  id: string,
  label: string,
  labelClass: string,
  inputClass: string,
  divClass?: string,

}

export const FormInput = (props: FormInputProps) => {
  const {
    id,
    name,
    type,
    input,
    inputClass,
    labelClass,
    divClass,
    label,
    meta,
  } = props;

  return (
    <div className={divClass}>
      <label
        className={labelClass}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={inputClass}
        onChange={input.onChange}
        value={input.value}
        type={type}
        name={name}
        id={id}
        style={meta.touched && meta.error ? {border: '1px solid red'} : {}}
      />
      {meta.error && meta.touched && <span className={'text-xs text-red-600'}>{meta.error}</span>}
    </div>
  );
};
