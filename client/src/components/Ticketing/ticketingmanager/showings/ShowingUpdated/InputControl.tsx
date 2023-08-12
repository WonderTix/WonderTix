import React from 'react';
import {useField} from 'formik';
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
  const {id, field,
    type, hidden, label, disabled} = props;
  const [, meta] = useField(field.name);
  return (
    <div>
      <label
        hidden={hidden}
        htmlFor={id+field.name}
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
        />
        {meta.error && meta.touched? <div>{meta.error}</div>:null}
      </div>
    </div>
  );
};

