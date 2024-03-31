import React from 'react';
import {FieldType} from '../../Season/components/SeasonSubscriptionAndTicketTypes/FormSwitch';

interface OptionSelectProps {
  field: FieldType;
  options: any[];
  handleChange: any;
  disabled?: boolean;
}

export const OptionSelect = (props: OptionSelectProps) => {
  const {field, handleChange, options, disabled = false} = props;

  return (
    <select
      id={field.name}
      name={field.name}
      onChange={handleChange}
      value={field.value}
      className='w-full'
      disabled={disabled}
    >
      {options &&
        options.map((option, index) => (
          <option key={`${field.name}-${option.id}-${index}`} value={option.id}>
            {option.description}
          </option>
        ))}
    </select>
  );
};
