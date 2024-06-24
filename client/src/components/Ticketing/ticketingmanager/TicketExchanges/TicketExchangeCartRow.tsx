import React from 'react';
import {CartItem} from '../ticketingSlice';
import {RefundCartItem} from './ticketExchangeInterfaces';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {formatUSD} from '../RefundOrders/RefundOrders';
import IconButton from '../../IconButton';
import {TrashCanIcon} from '../../Icons';
import {QuantityInputControl} from '../../mainpage/SubscriptionPurchasing/QuantityInputControl';

export const TicketExchangeCartRow: React.FC<
  (CartItem | RefundCartItem) & {
  qtyAvailable: number;
  increment?: () => void;
  decrement: () => void;
}
> = (props) => {
  const {price, qty, name, desc, qtyAvailable, increment, decrement} = props;
  const {stage} = useTicketExchangeContext();
  return (
    <li className='flex flex-col bg-gradient-to-b from-zinc-700 px-5 pt-3 pb-4 rounded-xl mb-5'>
      <p className='text-lg font-semibold'>{name}</p>
      <p className='italic'>{desc}</p>
      <div className='flex flex-row items-center justify-between'>
        <p className='font-semibold'>{formatUSD(price)}</p>
        {stage !== 'processing' &&
          (!increment ? (
            <IconButton hoverColor='grey' onClick={decrement}>
              <TrashCanIcon className='h-6 w-6 text-white' strokeWidth={2} />
            </IconButton>
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
                button: 'text-white disabled:text-gray-300',
                group: 'flex flex-row items-center p-1 ml-2',
                icon: 'h-4 w-4',
              }}
            />
          ))}
      </div>
    </li>
  );
};
