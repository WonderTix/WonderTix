import React from 'react';
import {FieldType} from '../../Season/components/SeasonSubscriptionAndTicketTypes/FormSwitch';

interface OptionSelectProps {
  field: FieldType;
  options: any[];
  handleChange?: any;
  disabled?: boolean;
  styles?: {
    option?: string;
    select?: string;
  };
}

export const OptionSelect = (props: OptionSelectProps) => {
  const {field, handleChange, options, disabled = false, styles = {select: 'w-full'}} = props;

  return (
    <select
      id={field.name}
      name={field.name}
      onChange={handleChange ?? field.onChange}
      value={field.value}
      className={styles.select}
      disabled={disabled}
    >
      {options &&
        options.map((option, index) => (
          <option key={index} value={option.id} className={styles.option}>
            {option.description}
          </option>
        ))}
    </select>
  );
};
