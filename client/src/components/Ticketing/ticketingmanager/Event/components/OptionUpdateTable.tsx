import {Field, useField} from 'formik';
import React, {ReactElement, useState} from 'react';
import {FieldType} from '../../Season/FormSwitch';
import {CirclePlusIcon} from '../../../Icons';
import {FormButton} from './FormButton';

export interface OptionRowProps {
  field: FieldType;
  options: any[];
  setOptions: (value) => void;
  removeOption: any;
}

interface OptionTableProps {
  arrayHelpers;
  optionsInit: (value: any[]) => any[];
  getOption: any;
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
    arrayHelpers,
    optionsInit,
    fieldName,
    rowComponent,
    sticky,
    headings,
    getOption,
    styles,
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
                className='text-green-500 disabled:text-gray-300'
                testID='add-row-button'
                onClick={() => {
                  arrayHelpers.insert(0, getOption(options[0]));
                  setOptions(options.slice(1, options.length));
                }}
                disabled={options.length === 0}
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
              removeOption={(toRemove) => {
                setOptions([...options, toRemove]);
                arrayHelpers.remove(index);
              }}
            />
          ))}
      </tbody>
    </table>
  );
};
