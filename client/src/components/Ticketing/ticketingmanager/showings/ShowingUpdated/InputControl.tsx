/* eslint-disable max-len */
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
    inputGroupClass:string
  };
}

export const InputControl = (props: InputControlProps) => {
  const {id, field, className,
    type, hidden, label, disabled} = props;

  const inputProps = {
    id: id+field.name,
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
        {
          type==='textarea'?
          <textarea {...inputProps} />:
            <input {...inputProps}/>
        }
        <ErrorMessage
          name={field.name}
          render ={(message )=>
            <p
              className={'font-medium text-center ' +
                'text-red-500 text-xs'}
            >
              {message}
            </p>}
        />
      </div>
    </div>
  );
};


interface itemProps {
  label:string;
  information:number | string;
  description?:boolean;
  event?: boolean;
}
export const LineItem = (props: itemProps) => {
  const {label, information, event, description} = props;
  const divClass = !event?
    'flex flex-row justify-between min-[768px]:grid min-[768px]:grid-cols-12 text-zinc-800':
    'grid grid-cols-12 gap-1 mb-4 text-zinc-800';
  const labelClass = !event?
    'text-sm font-semibold whitespace-nowrap  min-[768px]:col-span-6':
    `text-sm font-semibold ${description?'col-span-12':'col-span-5 min-[450px]:col-span-12'}`;
  const informationClass = !event?
    `text-sm pl-1 whitespace-nowrap min-[768px]:col-span-6`:
    `text-sm min-[450px]:text-md w-full rounded-lg ${
    description?
      'col-span-12':
      'col-span-7 min-[450px]:col-span-12'
    }`;
  return (
    <div className={divClass}>
      <p className={labelClass}>{label}: </p>
      <p className={informationClass}>
        {information}
      </p>
    </div>
  );
};
