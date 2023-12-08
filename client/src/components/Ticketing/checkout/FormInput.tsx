import React from 'react';

interface FormInputProps {
  input: {name; onChange; onBlur; onFocus; value; type};
  meta: any;
  id: string;
  label: string;
  labelClassName: string;
  inputClassName: string;
  className?: string;
  placeholder: string;
  spellCheck: 'true' | 'false';
}

export const FormInput = (props: FormInputProps) => {
  const {
    input,
    meta,
    id,
    label,
    inputClassName,
    labelClassName,
    className,
    placeholder,
    spellCheck = 'false',
  } = props;

  return (
    <div className={className}>
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <input
        className={inputClassName}
        onChange={input.onChange}
        placeholder={placeholder}
        value={input.value}
        type={input.type}
        name={input.name}
        id={id}
        style={meta.touched && meta.error ? {border: '1px solid red'} : {}}
        spellCheck={spellCheck}
      />
      {meta.error && meta.touched && (
        <span className='pl-1 text-xs text-red-600'>{meta.error}</span>
      )}
    </div>
  );
};
