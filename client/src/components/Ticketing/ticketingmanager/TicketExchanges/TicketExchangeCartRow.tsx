import React from 'react';
import {CartItem} from '../ticketingSlice';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {TrashCanIcon} from '../../Icons';
import {QuantityInputControl} from '../../mainpage/SubscriptionPurchasing/QuantityInputControl';
import {formatAccounting} from './TicketExchangeUtils';
import {FormButton} from '../Event/components/FormButton';

interface TicketExchangeCartRowProps extends CartItem {
  qtyAvailable: number;
  increment?: () => void;
  decrement: () => void;
}

export const TicketExchangeCartRow: React.FC<TicketExchangeCartRowProps> = (props) => {
  const {price, qty, name, desc, qtyAvailable, increment, decrement} = props;
  const {stage} = useTicketExchangeContext();

  return (
    <li className='flex flex-col bg-gradient-to-b from-zinc-700 px-5 pt-3 pb-4 rounded-xl mb-5'>
      <p className='text-lg font-semibold'>{name}</p>
      <p className='italic'>{desc}</p>
      <div className='flex flex-row items-center justify-between pt-1'>
        <p className='font-semibold'>{formatAccounting(price)}</p>
        {!increment ? (
            <FormButton
              onClick={decrement}
              disabled={stage === 'checkout'}
              className='text-white hover:scale-125 disabled:scale-100 transition-all ease-in disabled:text-zinc-300'
              testID='remove-from-cart'
            >
              <TrashCanIcon className='h-6 w-6 text-white' strokeWidth={2} />
            </FormButton>
          ) : (
            <QuantityInputControl
              field={{
                value: qty,
              }}
              disabled={stage === 'checkout'}
              increment={increment}
              decrement={decrement}
              quantityAvailable={qtyAvailable + qty}
              styles={{
                quantity: 'text-lg mx-1',
                button: 'disabled:text-zinc-300 hover:scale-125 disabled:scale-100 transition-all ease-in',
                group: 'flex flex-row items-center p-1 ml-2 text-white',
                icon: 'h-4 w-4',
              }}
            />
          )}
      </div>
    </li>
  );
};
