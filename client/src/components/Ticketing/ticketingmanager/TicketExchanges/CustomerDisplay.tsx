import {FormButton} from '../Event/components/FormButton';
import {XIcon} from '../../Icons';
import React from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {RefundCartItem} from './ticketExchangeTypes';

export const CustomerDisplay = () => {
  const {customer, stage, setCustomer, setRefundItems} = useTicketExchangeContext();

  if (!customer) return <p>NO CUSTOMER</p>;

  return (
    <div className='p-4 grid grid-cols-4 w-fit h-fit place-self-center'>
      <p className='text-lg font-semibold col-span-3'>
        {customer.firstname} {customer.lastname}
      </p>
      <div className='col-span-1 flex justify-end'>
        <FormButton
          disabled={stage === 'checkout'}
          testID='remove-customer-from-order'
          title='remove customer-from-order'
          className='p-1 hover:bg-red-200 hover:text-red-800 disabled:bg-gray-300 rounded-full'
          onClick={() => setCustomer()}
        >
          <XIcon className='h-5 w-5' />
        </FormButton>
      </div>
      <p className='text-md italic col-span-full'>{customer.email}</p>
    </div>
  );
};
