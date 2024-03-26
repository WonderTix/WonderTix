import {useFormikContext} from 'formik';
import {FormButton} from '../../ticketingmanager/Event/components/FormButton';
import {DecrementIcon, IncrementIcon} from '../../Icons';
import React from 'react';
import {FieldType} from '../../ticketingmanager/Season/components/SeasonSubscriptionAndTicketTypes/FormSwitch';

interface QuantityInputControl {
  field: FieldType;
  quantityAvailable: number;
}

export const QuantityInputControl = (props: QuantityInputControl) => {
  const {field, quantityAvailable} = props;
  const {setFieldValue} = useFormikContext();

  return (
    <div className='flex flex-row items-center border bg-zinc-200 rounded-lg p-1'>
      <FormButton
        onClick={() => setFieldValue(field.name, field.value - 1)}
        title='remove one'
        disabled={field.value <= 0}
        className='text-zinc-800 disabled:text-zinc-400'
        testID='remove-one-item'
      >
        <DecrementIcon className='h-5 w-5' strokeWidth={3} />
      </FormButton>
      <p className='text-lg'>{field.value}</p>
      <FormButton
        onClick={() => setFieldValue(field.name, field.value + 1)}
        title='add one'
        disabled={field.value >= quantityAvailable}
        className='text-zinc-800 disabled:text-zinc-400'
        testID='remove-one-item'
      >
        <IncrementIcon className='h-5 w-5' strokeWidth={3} />
      </FormButton>
    </div>
  );
};
