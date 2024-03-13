import React from 'react';
import {FieldType} from '../../Season/components/SeasonSubscriptionAndTicketTypes/FormSwitch';

interface OptionSelectProps {
  field: FieldType;
  options: any[];
  handleChange: any;
  currentValue: any;
}

export const OptionSelect = (props: OptionSelectProps) => {
  const {field, currentValue, handleChange, options} = props;

  return (
    <select
      id={field.name}
      name={field.name}
      onChange={handleChange}
      value={field.value}
      className='w-full'
    >
      <option value={Number.parseInt(field.value)}>
        {currentValue.description}
      </option>
      {options &&
        options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.description}
          </option>
        ))}
    </select>
  );
};
