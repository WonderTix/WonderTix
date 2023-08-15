import React from 'react';
import {ErrorMessage} from 'formik';

interface InputControlProps{
  field:{onChange, onBlur, name, value};
  type:string;
  hidden?:boolean;
  label:string;
  id:number;
  disabled?:boolean;
  className?: {
   controlClass:string,
   labelClass:string,
   inputClass:string,
  };
}

export const InputControl = (props: InputControlProps) => {
  const {id, field, className,
    type, hidden, label, disabled} = props;
  return (
    <div className={className?.controlClass}>
      <label
        hidden={hidden}
        htmlFor={id+field.name}
        className={className?.labelClass}
      >
        {`${label}: `}
      </label>
      <div className={'flex flex-col'}>
        <input
          id={id+field.name}
          type={type}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          disabled={disabled}
          className={className?.inputClass}
        />
        <ErrorMessage
          name={field.name}
          render ={(message )=>
            <div
              className={'flex items-center font-medium ' +
                'text-red-500 text-xs mt-1 ml-1'}
            >
              {message}
            </div>}
        />
      </div>
    </div>
  );
};

// eslint-disable-next-line max-len
export const Item = (props: { label: string, information: string | number }) => {
  const {label, information} = props;

  return (
    <div className='flex flex-row items-center gap-1'>
      <span className='text-sm text-zinc-300'>{label}: </span>
      <span className='font-semibold '>
        {information}
      </span>
    </div>
  );
};
