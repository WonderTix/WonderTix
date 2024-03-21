import React from 'react';
import {OptionRowProps} from './OptionUpdateTable';
import {Field, useFormikContext} from 'formik';
import {OptionSelect} from './OptionSelect';
import {InputControl} from './InputControl';
import {TrashCanIcon} from '../../../Icons';
import {getKeyValue} from './ShowingUtils';
import {FormButton} from './FormButton';

export const getHandleTicketTypeChange =
  (options, setOptions, parentFieldName, setFieldValue, currentValue) =>
  async (event) => {
    const value = +event.target.value;
    const {ticketlimit, ...backToOptions} = currentValue;
    await setFieldValue(`${parentFieldName}.tickettypeid_fk`, value);
    await setFieldValue(
      `${parentFieldName}.price`,
      getKeyValue(+value, 'price', options),
    );
    await setFieldValue(
      `${parentFieldName}.concessionprice`,
      getKeyValue(+value, 'concessionprice', options),
    );
    await setFieldValue(
      `${parentFieldName}.description`,
      getKeyValue(+value, 'description', options),
    );
    setOptions([
      ...options.filter((type) => type.tickettypeid_fk !== value),
      backToOptions,
    ]);
  };

export const TicketTypeTableRow = ({
  field,
  options,
  setOptions,
  removeOption,
}: OptionRowProps) => {
  const {setFieldValue} = useFormikContext();
  return (
    <tr>
      <td className='px-2 py-1'>
        <Field
          name={`${field.name}.tickettypeid_fk`}
          component={OptionSelect}
          handleChange={getHandleTicketTypeChange(
            options,
            setOptions,
            field.name,
            setFieldValue,
            field.value,
          )}
          options={options.map((option) => ({
            id: +option.tickettypeid_fk,
            description: option.description,
          }))}
          currentValue={{
            id: +field.value.tickettypeid_fk,
            description: field.value.description,
          }}
        />
      </td>
      <td
        className={`px-2 py-1 ${
          field.value.tickettypeid_fk == 0 ? 'bg-gray-100' : ''
        }`}
      >
        <Field
          name={`${field.name}.price`}
          type='number'
          component={InputControl}
          hidden={true}
          disabled={field.value.tickettypeid_fk === 0}
          label='Ticket Price'
          currency={true}
          className={{
            controlClass: '',
            inputClass: 'w-[95%] text-right',
            labelClass: '',
          }}
        />
      </td>
      <td className='px-2 py-1'>
        <Field
          name={`${field.name}.concessionprice`}
          type='number'
          component={InputControl}
          hidden={true}
          label='Concession Price'
          currency={true}
          className={{
            controlClass: '',
            inputClass: 'w-[95%] text-right',
            labelClass: '',
          }}
        />
      </td>
      {field.name.includes('instanceTicketTypes') && (
        <td className='px-2 py-1'>
          <Field
            name={`${field.name}.ticketlimit`}
            type='number'
            component={InputControl}
            hidden={true}
            label='Ticket Type Quantity'
            className={{
              controlClass: '',
              inputClass: 'w-[100%] text-right',
              labelClass: '',
            }}
          />
        </td>
      )}
      <td className='px-2 py-1'>
        <FormButton
          testID={`delete-ticket-type-${field.name}`}
          title='Remove Row'
          className='grid justify-center text-red-500 focus:text-red-800'
          onClick={() => {
            const {ticketlimit, ...current} = field.value;
            removeOption(current);
          }}
          disabled={false}
        >
          <TrashCanIcon className='w-5 h-5' />
        </FormButton>
      </td>
    </tr>
  );
};
