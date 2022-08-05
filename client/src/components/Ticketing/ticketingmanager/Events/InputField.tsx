
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
    value:string
}
const InputFieldForEvent =
    ({type, name, id, actionType,
      action, placeholder, headerText, value}: InputFieldProps) => {
      if (actionType =='onSubmit') {
        return (
        // eslint-disable-next-line react/react-in-jsx-scope
          <>
            <h3 className='text-sm text-zinc-600 '>{headerText}</h3>
            <input
              className='w-full p-2 rounded-lg border border-zinc-300 mb-4'
              id={id} type='input' name={name}
              onSubmit={action} placeholder={placeholder}
              defaultValue={value} value={value}
            />
          </>
        );
      } else if (actionType =='onChange') {
        return (
          <>
            <h3 className='text-sm text-zinc-600 '>{headerText}</h3>
            <input
              className='w-full p-2 rounded-lg border border-zinc-300 mb-4'
              id={id} type={type} name={name}
              onChange={action} placeholder={placeholder}
              defaultValue={value}
            />
          </>
        );
      }
    };

export default InputFieldForEvent;
