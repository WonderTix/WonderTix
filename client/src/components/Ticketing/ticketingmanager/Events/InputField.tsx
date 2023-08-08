import React from 'react';

interface InputFieldProps
{
    type?: string,
    name: string,
    id: string,
    headerText: string,
    action(any): void,
    actionType:string,
    placeholder: string,
    value:string,
    disabled?:boolean
}
const InputFieldForEvent = (props: InputFieldProps) => {
  const {type, name, id, actionType,
    action, placeholder, headerText, value, disabled} = props;
  if (actionType =='onSubmit') {
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <>
        <label
          htmlFor={id}
          className='text-sm text-zinc-600 '
        >
          {headerText}
        </label>
        <input
          className='w-full p-2 rounded-lg border border-zinc-300 mb-4'
          id={id}
          type={type}
          name={name}
          onSubmit={action}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          maxLength={255}
        />
      </>
    );
  } else if (actionType =='onChange') {
    return (
      <>
        <label
          htmlFor={id}
          className='text-sm text-zinc-600 '
        >
          {headerText}
        </label>
        <input
          className='w-full p-2 rounded-lg border border-zinc-300 mb-4'
          id={id}
          type={type}
          name={name}
          onChange={action}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          maxLength={255}
        />
      </>
    );
  }
};

export default InputFieldForEvent;
