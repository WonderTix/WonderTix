import React, {MutableRefObject} from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import PurchaseOption from './PurchaseOption';
import format from 'date-fns/format';
import {formatUSD} from '../RefundOrders/RefundOrders';
import {FormikProps, FormikValues} from 'formik';
import Order from './Order';

const Orders: React.FC = () => {
  const {orders} = useTicketExchangeContext();

  if (!orders || !orders.length) {
    return <p className='w-full text-center'>NO REFUNDABLE ITEMS</p>;
  }

  return (
    <ul className='flex flex-col gap-2 w-full items-center p-3'>
      {orders.map((order, index) => (
        <Order key={index} {...order} />
      ))}
    </ul>
  );
};

export default Orders;
