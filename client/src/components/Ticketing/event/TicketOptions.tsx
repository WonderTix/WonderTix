import React, {ReactElement, useEffect, useState} from 'react';
import {TicketType} from './TicketPicker';
import {PlusIcon, SmallMinusIcon} from '../Icons';

export interface TicketTypeInput {
  type: TicketType;
  qty: number;
  payWhatCanPrice?: number;
}

interface TicketOptionsProps {
  ticketTypes: TicketType[];
  onChange: (ticketTypeInputs: TicketTypeInput[]) => void;
}

export const TicketOptions = (props: TicketOptionsProps): ReactElement => {
  const {ticketTypes, onChange} = props;

  const [ticketTypeInputs, setTicketTypeInputs] = useState<TicketTypeInput[]>(
    ticketTypes.map((type): TicketTypeInput => {
      return {
        type: type,
        qty: 0,
        payWhatCanPrice: type.name === 'Pay What You Can' ? 0 : null,
      };
    }),
  );

  useEffect(() => {
    setTicketTypeInputs(
      ticketTypes.map((type): TicketTypeInput => {
        return {
          type: type,
          qty: 0,
          payWhatCanPrice: type.name === 'Pay What You Can' ? 0 : null,
        };
      }),
    );
  }, [ticketTypes]);

  const handleQtyChange = (incrementValue: number, ticketTypeId: number) => {
    const editedTicketTypeInputs = ticketTypeInputs.map((typeInput) => {
      if (typeInput.type.id === ticketTypeId) {
        typeInput.qty = Math.max(typeInput.qty + incrementValue, 0);
      }
      return typeInput;
    });
    setTicketTypeInputs(editedTicketTypeInputs);
  };

  const handlePayWhatCanPriceChange = (price: string) => {
    const numberPrice = parseFloat(price);
    if (isNaN(numberPrice)) {
      return;
    }
    const editedTicketTypeInputs = ticketTypeInputs.map((typeInput) => {
      if (typeInput.type.name === 'Pay What You Can') {
        typeInput.payWhatCanPrice = Math.max(numberPrice, 0);
      }
      return typeInput;
    });
    setTicketTypeInputs(editedTicketTypeInputs);
  };

  useEffect(() => {
    onChange(ticketTypeInputs);
  }, [ticketTypeInputs]);

  return (
    <article className='flex flex-col gap-8 w-full overflow-x-auto justify-center text-white'>
      {ticketTypeInputs.map((ticketTypeInput, index) => (
        <div key={index}>
          <p
            className='relative mb-2
            after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-52 after:h-[1px] after:inline-block after:bg-white'
          >
            {ticketTypeInput.type.name}
          </p>
          {ticketTypeInput.payWhatCanPrice === null ? (
            <>
              <button
                className='inline-block p-0.5 rounded-full bg-white text-zinc-900'
                onClick={() => handleQtyChange(1, ticketTypeInput.type.id)}
              >
                <PlusIcon strokeWidth={2} />
              </button>
              <p className='inline-block w-8 text-center'>
                {ticketTypeInput.qty}
              </p>
              <button
                className='inline-block p-0.5 rounded-full bg-white text-zinc-900'
                onClick={() => handleQtyChange(-1, ticketTypeInput.type.id)}
              >
                <SmallMinusIcon strokeWidth={2} />
              </button>{' '}
              @ {ticketTypeInput.type.price}
            </>
          ) : (
            <>
              <button
                className='inline-block p-0.5 rounded-full bg-white text-zinc-900'
                onClick={() => handleQtyChange(1, ticketTypeInput.type.id)}
              >
                <PlusIcon strokeWidth={2} />
              </button>
              <p className='inline-block w-8 text-center'>
                {ticketTypeInput.qty}
              </p>
              <button
                className='inline-block p-0.5 rounded-full bg-white text-zinc-900'
                onClick={() => handleQtyChange(-1, ticketTypeInput.type.id)}
              >
                <SmallMinusIcon strokeWidth={2} />
              </button>
              @{' '}
              <input
                type='number'
                value={ticketTypeInput.payWhatCanPrice}
                className='rounded text-black'
                onChange={(event) => {
                  console.log('here');
                  handlePayWhatCanPriceChange(event.target.value);
                }}
              />
            </>
          )}
        </div>
      ))}
    </article>
  );
};
