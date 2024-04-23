import {Field, useFormikContext} from 'formik';
import {OptionSelect} from '../../../Event/components/OptionSelect';
import {InputControl} from '../../../Event/components/InputControl';
import {getKeyValue} from '../../../Event/components/ShowingUtils';
import React from 'react';
import {OptionRowProps} from '../../../Event/components/OptionUpdateTable';
import {TrashCanIcon} from '../../../../Icons';
import {FormButton} from '../../../Event/components/FormButton';

const getHandleSubscriptionTypeChange =
  (options, setOptions, parentFieldName, setFieldValue, currentValue) =>
  async (event) => {
    const value = +event.target.value;
    await setFieldValue(`${parentFieldName}.subscriptiontypeid_fk`, value);
    await setFieldValue(
      `${parentFieldName}.price`,
      getKeyValue(+value, 'price', options, 'subscriptiontypeid_fk'),
    );
    await setFieldValue(
      `${parentFieldName}.name`,
      getKeyValue(+value, 'name', options, 'subscriptiontypeid_fk'),
    );
    setOptions([
      ...options.filter((type) => type.subscriptiontypeid_fk !== value),
      currentValue,
    ]);
  };

export const SeasonSubscriptionTypeRow = ({
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
          name={`${field.name}.subscriptiontypeid_fk`}
          component={OptionSelect}
          handleChange={getHandleSubscriptionTypeChange(
            options,
            setOptions,
            field.name,
            setFieldValue,
            field.value,
          )}
          options={options
            .map((option) => ({
              id: +option.subscriptiontypeid_fk,
              description: option.name,
            }))
            .concat({
              id: +field.value.subscriptiontypeid_fk,
              description: field.value.name,
            })}
        />
      </td>
      <td className='px-2 py-1'>
        <Field
          name={`${field.name}.price`}
          type='number'
          component={InputControl}
          hidden={true}
          label='Subscription Type Price'
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
          name={`${field.name}.ticketlimit`}
          type='number'
          component={InputControl}
          hidden={true}
          label='Tickets Included'
          className={{
            controlClass: '',
            inputClass: 'w-[100%] text-right',
            labelClass: '',
          }}
        />
      </td>
      <td className='px-2 py-1'>
        <Field
          name={`${field.name}.subscriptionlimit`}
          type='number'
          component={InputControl}
          hidden={true}
          label='Quantity'
          className={{
            controlClass: '',
            inputClass: 'w-[100%] text-right',
            labelClass: '',
          }}
        />
      </td>
      <td className='px-2 py-1'>
        <FormButton
          testID={`delete-subscription-type-${field.name}`}
          title='Remove'
          className='grid justify-center text-red-500 focus:text-red-800'
          disabled={false}
          onClick={removeOption}
        >
          <TrashCanIcon className='w-5 h-5' />
        </FormButton>
      </td>
    </tr>
  );
};
