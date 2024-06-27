import React, {useCallback} from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {formatAccounting, getNameAndDescription} from './TicketExchangeUtils';
import {FormButton} from '../Event/components/FormButton';
import {DecrementIcon, PlusIcon} from '../../Icons';
import {orderitem} from './ticketExchangeTypes';

export const OrderItem: React.FC<orderitem> = (props) => {
  const {id, price, fee, discount, type} = props;
  const {refundItems, setRefundItems} = useTicketExchangeContext();
  const existingItem = refundItems.get(id);
  const refundItem = existingItem
    ? {...existingItem}
    : {
        id,
        price: +price - +discount,
        qty: 1,
        fee: +fee,
        product_img_url: '',
        ...getNameAndDescription(props),
      };

  const updateRefundItem = useCallback(
    () =>
      !existingItem
        ? setRefundItems((prev) => prev.set(id, refundItem) && new Map(prev))
        : setRefundItems((prev) => prev.delete(id) && new Map(prev)),
    [existingItem, refundItem, id],
  );

  return (
    <li className='flex flex-col tab:flex-row tab:justify-between items-center bg-zinc-800/90 rounded-xl p-3'>
      <div className='grid grid-cols-12 text-white items-center flex-grow'>
        <p className='flex flex-col col-span-12 tab:col-span-9 text-md font-semibold text-center tab:text-start'>
          {refundItem.name}
          <span className='text-sm italic'>{refundItem.desc}</span>
        </p>
        <p className='col-span-12 flex flex-row gap-1 justify-center tab:gap-0 tab:flex-col tab:justify-self-end tab:col-span-3 tab:text-end text-sm'>
          {type === 'donation' ? 'Donation' : 'Price'}:{' '}
          {formatAccounting(Number(price) - Number(discount))}
          {type !== 'donation' && <span>Fee: {formatAccounting(Number(fee))}</span>}
        </p>
      </div>
      <FormButton
        onClick={updateRefundItem}
        disabled={false}
        title={existingItem ? 'remove from cart' : 'add to cart'}
        className='p-1 tab:ml-2 bg-white rounded-full text-zinc-800/90 hover:scale-125 transition-all ease-in-out'
        testID={`update-refund-item-${id}`}
      >
        {existingItem ? (
          <DecrementIcon className='h-5 w-5' strokeWidth={3} />
        ) : (
          <PlusIcon className='h-5 w-5' strokeWidth={3} />
        )}
      </FormButton>
    </li>
  );
};
