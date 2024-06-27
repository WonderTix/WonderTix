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
    const closeCartOnResize = () => {
      if (window.innerWidth > 1279) {
        setCartPopUp(false);
      }
    };
    window.addEventListener('resize', closeCartOnResize);
    return () => window.removeEventListener('resize', closeCartOnResize);
  }, []);

  useEffect(() => {
    if (stage != 'select_items') {
      setCartPopUp(false);
    }
  }, [stage]);

  return (
    <div className='w-full grid grid-cols-12'>
      <section className='col-span-12 min-[1280px]:col-span-8 p-3'>
        <header className='flex flex-row justify-between mb-3'>
          <Tabs
            value={current}
            onChange={(_, newValue) => setCurrent(newValue)}
            variant='scrollable'
          >
            <Tab label='ORDERS' value={1} disabled={!customer} />
            <Tab label='TICKETS' value={2} />
            <Tab label='SUBSCRIPTIONS' value={3} />
          </Tabs>
          <FormButton
            onClick={() => setCartPopUp(true)}
            disabled={false}
            className='min-[1280px]:hidden h-full ml-5 text-zinc-800 hover:scale-110 transition-all ease-in'
            testID='open-cart'
          >
            <CartIcon className='h-7 w-7' />
          </FormButton>
        </header>
        {current === 1 && <Orders />}
        {current === 2 && <Events />}
        {current === 3 && <Subscriptions />}
      </section>
      <section className='hidden col-span-4 min-[1280px]:flex w-full justify-center'>
        <TicketExchangeCart onClick={() => setStage('customer_info')} />
      </section>
      <PopUpBackdrop showPopUp={cartPopUp} setShow={() => setCartPopUp(false)}>
        <div
          id='pop-up-backdrop-child-1'
          className='flex flex-row justify-end w-full h-full max-h-full'
        >
          <FormButton
            disabled={false}
            testID='close cart'
            className='p-1 mt-2 mr-4 self-start text-white border border-white rounded-full hover:border-zinc-300 hover:text-zinc-300'
            onClick={() => setCartPopUp(false)}
          >
            <XIcon className='h-6 w-6' />
          </FormButton>
          <TicketExchangeCart onClick={() => setStage('customer_info')} />
        </div>
      </PopUpBackdrop>
    </div>
  );
};
