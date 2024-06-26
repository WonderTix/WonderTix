import React from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import Order from './Order';

const Orders: React.FC = () => {
  const {orders} = useTicketExchangeContext();

  if (!orders || !orders.length) {
    return <p className='w-full text-center mt-4'>NO REFUNDABLE ITEMS</p>;
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
