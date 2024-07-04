import React, {useState} from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {FormButton} from '../Event/components/FormButton';
import {TicketExchangeOrderForm} from './TicketExchangeOrderForm';
import PopUpBackdrop from './PopUpBackdrop';
import CustomerPopUp from './CustomerPopUp';
import {TicketExchangeItems} from './TicketExchangeItems';
import {CustomerDisplay} from './CustomerDisplay';
import {LoadingIcon} from '../../Icons';

export const TicketExchanges: React.FC = () => {
  const {customer, stage, events, seasons, token} = useTicketExchangeContext();
  const [customerPopUp, setCustomerPopUp] = useState(false);

  if (!events || !seasons || !token) {
    return (
      <main className='fixed inset-0 md:left-[90px] h-screen w-full flex items-center justify-center'>
        <LoadingIcon className='h-8 w-8 md:h-10 md:w-10 animate-spin text-slate-900' />
      </main>
    );
  }

  return (
    <main className='h-full w-full min-[1700px]:w-[90%] min-[2000px]:w-[70%] mx-auto'>
      <header className='w-full flex flex-col gap-2 mb-4 tab:flex-row tab:items-center tab:justify-between tab:h-[100px] tab:mb-10'>
        <h1 className='text-center tab:text-start p-1 font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-600'>
          Ticket Exchange
        </h1>
        {customer ? (
          <CustomerDisplay />
        ) : (
          <FormButton
            disabled={stage === 'checkout'}
            testID='add-customer-to-order'
            className='py-2 px-4 rounded-3xl bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white shadow-xl self-center'
            onClick={() => setCustomerPopUp(true)}
          >
            Add Customer
          </FormButton>
        )}
      </header>
      {stage === 'select_items' ? (
        <TicketExchangeItems />
      ) : (
        <TicketExchangeOrderForm />
      )}
      <PopUpBackdrop
        showPopUp={customerPopUp}
        setShow={() => setCustomerPopUp(false)}
      >
        {customerPopUp && (
          <CustomerPopUp setShow={() => setCustomerPopUp(false)} />
        )}
      </PopUpBackdrop>
    </main>
  );
};
export default TicketExchanges;
