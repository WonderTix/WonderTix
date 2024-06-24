import React, {useState} from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {FormButton} from '../Event/components/FormButton';
import {TicketExchangeOrderForm} from './TicketExchangeOrderForm';
import PopUpBackdrop from './PopUpBackdrop';
import CustomerPopUp from './CustomerPopUp';
import {TicketExchangeItems} from './TicketExchangeItems';
import {CustomerDisplay} from './CustomerDisplay';
import {LoadingIcon} from '../../Icons';

export const TicketExchange: React.FC = () => {
  const {customer, stage, events, seasons, token} = useTicketExchangeContext();
  const [customerPopUp, setCustomerPopUp] = useState(false);

  if (!events || !seasons || !token) {
    return <main className='fixed inset-0 md:left-[90px] h-screen w-full flex justify-center items-center'>
      <LoadingIcon className='h-8 w-8 animate-spin text-slate-700'/>
    </main>;
  }

  return (
    <main className='h-full w-full min-[1700px]:w-[90%] 3xl:w-[70%] mx-auto'>
      <header className='w-full flex flex-col tab:flex-row tab:items-center tab:justify-between tab:h-[100px] tab:mb-14 gap-2 mb-4'>
        <h1 className='text-center tab:text-start p-1 font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-200'>
          Order Exchange
        </h1>
        {customer ? (
          <CustomerDisplay />
        ) : (
          <FormButton
            disabled={stage === 'checkout' || stage === 'processing'}
            testID='add-customer'
            className='py-2 px-4 rounded-3xl bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white shadow-xl w-fit self-center'
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
export default TicketExchange;
