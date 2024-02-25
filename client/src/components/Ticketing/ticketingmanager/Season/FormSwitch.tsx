import {useFormikContext} from 'formik';
import {Switch} from '@mui/material';
import React from 'react';

export interface FieldType {
  onChange: any;
  onBlur: any;
  name: any;
  value: any;
}

interface FormSwitchProps {
  field: FieldType;
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
  const {field, size = 'small', color, label, className, hidden= false} = props;
  const {setFieldValue} = useFormikContext();
  return (
    <div className={className.controlClass}>
      <label hidden={hidden} className={className.labelClass}>{label}: </label>
        <Switch
          checked={field.value}
          onChange={() => setFieldValue(field.name, !field.value)}
          color={color}
          size={size}
        />
    </div>
  );
};
