import React, {useEffect, useState} from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {CartIcon, XIcon} from '../../Icons';
import {Tab, Tabs} from '@mui/material';
import Orders from './Orders';
import Events from './Events';
import Subscriptions from './Subscriptions';
import {FormButton} from '../Event/components/FormButton';
import {TicketExchangeCart} from './TicketExchangeCart';
import PopUpBackdrop from './PopUpBackdrop';

export const TicketExchangeItems: React.FC = () => {
  const {customer, stage, setStage} = useTicketExchangeContext();
  const [cartPopUp, setCartPopUp] = useState(false);
  const [current, setCurrent] = useState(2);

  useEffect(() => {
    const closeCartOnSize = () => {
      if (window.innerWidth >= 1280) {
        setCartPopUp(false);
      }
    };
    window.addEventListener('resize', closeCartOnSize);
    return () => window.removeEventListener('resize', closeCartOnSize);
  }, []);

  useEffect(() => {
    if (stage != 'select_items') {
      setCartPopUp(false);
    }
  }, [stage]);

  return (
    <div className='w-full grid grid-cols-12 overflow-hidden'>
      <section className='col-span-12 desktop:col-span-8 rounded-xl p-3'>
        <header className='flex flex-row justify-between mb-3'>
          <Tabs
            value={current}
            onChange={(_, newValue) => setCurrent(newValue)}
            variant='scrollable'
          >
            <Tab
              label={
                <span className='font-semibold text-md'>ORDERS</span>
              }
              value={1}
              disabled={!customer}
            />
            <Tab
              label={<span className='font-semibold text-md'>TICKETS</span>}
              value={2}
            />
            <Tab
              label={
                <span className='font-semibold text-md'>SUBSCRIPTIONS</span>
              }
              value={3}
            />
          </Tabs>
          <FormButton
            onClick={() => setCartPopUp(true)}
            disabled={false}
            className='desktop:hidden h-full ml-5 text-zinc-800 hover:bg-gray-300'
            testID='cart-drawer-icon'
          >
            <CartIcon className='h-7 w-7' />
          </FormButton>
        </header>
        {current === 1 && <Orders />}
        {current === 2 && <Events />}
        {current === 3 && <Subscriptions />}
      </section>
      <section className='hidden col-span-4 desktop:flex w-full justify-center'>
        <TicketExchangeCart buttonClick={() => setStage('customer_info')} />
      </section>
      <PopUpBackdrop
        showPopUp={cartPopUp}
        setShow={() => setCartPopUp(false)}
      >
        <div
          id='pop-up-backdrop-child-1'
          className='flex flex-row justify-end w-full h-full max-h-full desktop:h-fit'
        >
          <FormButton
            disabled={false}
            testID='close cart'
            title='close'
            className='p-2 mr-2 self-start tab:self-center text-white'
            onClick={() => setCartPopUp(false)}
          >
            <XIcon className='h-6 w-6' />
          </FormButton>
          <TicketExchangeCart buttonClick={() => setStage('customer_info')} />
        </div>
      </PopUpBackdrop>
    </div>
  );
};
