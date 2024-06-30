import {Switch} from '@mui/material';
import React from 'react';

export interface FieldType {
  onChange?: any;
  onBlur?: any;
  name?: any;
  value: any;
}

interface FormSwitchProps {
  field: FieldType;
  onChange?: (value) => void;
  label: string;
  className: {
    labelClass: string;
    controlClass: string;
  };
  color:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'default';
  size?: 'small' | 'medium';
  hidden?: boolean;
}

export const FormSwitch = (props: FormSwitchProps) => {
  const {field, onChange, size = 'small', color, label, className, hidden= false} = props;
  return (
    <div className={className.controlClass}>
      <label hidden={hidden} className={className.labelClass}>{label}</label>
        <Switch
          checked={field.value}
          onChange={onChange? () => onChange(!field.value): field.onChange}
          color={color}
          size={size}
        />
    </div>
  );
};
