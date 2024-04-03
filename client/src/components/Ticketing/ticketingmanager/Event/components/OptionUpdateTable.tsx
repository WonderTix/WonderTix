import {Field, useField} from 'formik';
import React, {ReactElement, useState} from 'react';
import {FieldType} from '../../Season/components/SeasonSubscriptionAndTicketTypes/FormSwitch';
import {CirclePlusIcon} from '../../../Icons';
import {FormButton} from './FormButton';

export interface OptionRowProps {
  field: FieldType;
  options: any[];
  setOptions: (value) => void;
  removeOption: any;
}

interface OptionTableProps {
  removeRow: (index: number, setOptions: (value) => void) => void;
  addRow: (options: any[], setOptions: (value) => void) => void;
  disabled: (options: any[]) => boolean;
  optionsInit: (value: any[]) => any[];
  fieldName: string;
  rowComponent: (props: OptionRowProps) => ReactElement;
  headings: string[];
  sticky: boolean;
  styles: {
    headerRow: string;
    headerItem: string;
    tableBody: string;
  };
}

export const OptionUpdateTable = (props: OptionTableProps) => {
  const {
    optionsInit,
    fieldName,
    rowComponent,
    sticky,
    headings,
    styles,
    addRow,
    removeRow,
    disabled,
  } = props;
  const [field] = useField(fieldName);
  const [options, setOptions] = useState(optionsInit(field.value));

  if (!field) return null;

  return (
    <table className='table table-fixed text-sm min-w-[100%]'>
      <thead className={`${styles.headerRow} ${sticky ? '' : 'sticky'} top-0`}>
        <tr className='rounded-xl'>
          {!!headings.length &&
            headings.map((heading, index) => (
              <th key={index} className={styles.headerItem}>
                {heading}
              </th>
            ))}
          <th className={`${styles.headerItem} grid justify-center`}>
            {options && (
              <FormButton
                title='Add Row'
                className='text-green-500 hover:text-green-600 disabled:text-gray-300'
                testID='add-row-button'
                onClick={() => addRow(options, setOptions)}
                disabled={disabled(options)}
              >
                <CirclePlusIcon className='h-[1.75rem] w-[1.75rem]' />
              </FormButton>
            )}
          </th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {!!field.value?.length &&
          field.value.map((_, index) => (
            <Field
              key={`${field.name}[${index}]`}
              name={`${field.name}[${index}]`}
              component={rowComponent}
              options={options}
              setOptions={setOptions}
              removeOption={() => removeRow(index, setOptions)}
            />
          ))}
      </tbody>
    </table>
  );
};
