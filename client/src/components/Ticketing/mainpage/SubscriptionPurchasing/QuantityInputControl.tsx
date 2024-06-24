import {FormButton} from '../../ticketingmanager/Event/components/FormButton';
import {DecrementIcon, IncrementIcon} from '../../Icons';
import React from 'react';
import {FieldType} from '../../ticketingmanager/Season/components/SeasonSubscriptionAndTicketTypes/FormSwitch';

interface QuantityInputControl {
  field: FieldType;
  increment: () => void;
  decrement: () => void;
  quantityAvailable: number;
  disabled?: boolean;
  styles: {
    button: string;
    group: string;
    quantity: string;
    icon?: string;
  };
}

export const QuantityInputControl = (props: QuantityInputControl) => {
  const {field, quantityAvailable, decrement, increment, styles, disabled = false} = props;

  return (
    <div className={styles.group}>
      <FormButton
        onClick={decrement}
        title='remove one'
        disabled={field.value <= 0 || disabled}
        className={styles.button}
        testID='remove-one-item'
      >
        <DecrementIcon className={styles.icon} strokeWidth={3} />
      </FormButton>
      <p className={`${styles.quantity} ${disabled && 'text-gray-400'}`}>{field.value}</p>
      <FormButton
        onClick={increment}
        title='add one'
        disabled={field.value >= quantityAvailable || disabled}
        className={styles.button}
        testID='remove-one-item'
      >
        <IncrementIcon className={styles.icon} strokeWidth={3} />
      </FormButton>
    </div>
  );
};
