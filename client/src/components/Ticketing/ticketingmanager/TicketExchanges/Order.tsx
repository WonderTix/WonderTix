import React, {useCallback, useMemo, useState} from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {ChevronDown, ChevronUp, DecrementIcon, PlusIcon} from '../../Icons';
import {formatAccounting, getNameAndDescription} from './TicketExchangeUtils';
import {FormButton} from '../Event/components/FormButton';
import format from 'date-fns/format';
import {ProviderOrder} from './ticketExchangeTypes';
import {OrderItem} from './OrderItem';

const Order: React.FC<ProviderOrder> = (props) => {
  const {
    orderitems,
    orderdatetime,
    orderid,
  } = props;
  const [open, setOpen] = useState(false);
  const {setRefundItems, refundItems} = useTicketExchangeContext();
  const allItemsInCart = useMemo(
    () => orderitems.every((item) => refundItems.has(item.id)),
    [orderitems, refundItems],
  );
  const updateAllItems = useCallback(
    () =>
      allItemsInCart
        ? setRefundItems((prev) => {
            orderitems.forEach((item) => prev.delete(item.id));
            return new Map(prev);
          })
        : setRefundItems(
            (prev) =>
              new Map([
                ...prev.entries(),
                ...orderitems.map((item) => [
                  item.id,
                  {
                    id: item.id,
                    price: +item.price - +item.discount,
                    qty: 1,
                    fee: +item.fee,
                    product_img_url: '',
                    ...getNameAndDescription(item),
                  },
                ]),
              ]),
          ),
    [orderitems, allItemsInCart],
  );

  return (
    <li className='bg-white rounded-xl p-4 shadow-xl w-full'>
      <header className='flex flex-col sm:flex-row gap-2 text-zinc-800'>
        <h3 className='flex flex-col justify-center items-center sm:items-start'>
          <span className='text-lg font-semibold flex flex-col tab:flex-row items-center sm:items-start'>
            Order #{orderid}
            <span className='tab:before:content-["-"] italic before:mx-1 font-normal'>
              {format(new Date(orderdatetime), 'M/dd/yy, h:mm a')}
            </span>
          </span>
          {`Refundable Total: ${formatAccounting(orderitems.reduce((acc, item) => Number(item.price) + Number(item.fee) - Number(item.discount) + acc, 0))}`}
        </h3>
        <div className='flex-grow flex items-center justify-center sm:justify-end gap-1'>
          <FormButton
            onClick={updateAllItems}
            disabled={false}
            title={allItemsInCart?'remove order' :'refund order'}
            className={`p-2 ${
              allItemsInCart
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } rounded-xl text-white shadow-xl`}
            testID={`add-to-cart-${orderid}`}
          >
            {allItemsInCart ? (
              <DecrementIcon className='h-7 w-7' />
            ) : (
              <PlusIcon className='h-7 w-7' />
            )}
          </FormButton>
          <FormButton
            key={3}
            disabled={false}
            testID='open-order-accordian'
            className='bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 rounded-xl shadow-xl p-2 text-white'
            onClick={() => setOpen(!open)}
          >
            {!open ? (
              <ChevronDown className='h-7 w-7' />
            ) : (
              <ChevronUp className='h-7 w-7' />
            )}
          </FormButton>
        </div>
      </header>
      <ul
        className={`transition-all ease-in-out duration-300 ${
          open ? 'max-h-[250px] mt-4' : 'max-h-0'
        } flex flex-col gap-2 overflow-y-auto`}
      >
        {orderitems.map((orderitem, index) => (
          <OrderItem key={index} {...orderitem} />
        ))}
      </ul>
    </li>
  );
};

export default Order;

