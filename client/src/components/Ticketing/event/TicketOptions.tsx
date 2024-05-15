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

  const [totalTicketQty, setTotalTicketQty] = useState(0);

  const [ticketTypeInputs, setTicketTypeInputs] = useState<TicketTypeInput[]>(
    ticketTypes.map((type): TicketTypeInput => {
      return {
        type: type,
        qty: 0,
        payWhatCanPrice: null,
      };
    }),
  );

  useEffect(() => {
    setTicketTypeInputs(
      ticketTypes.map((type): TicketTypeInput => {
        return {
          type: type,
          qty: 0,
          payWhatCanPrice: null,
        };
      }),
    );
  }, [ticketTypes]);

  const handleQtyChange = (incrementValue: number, ticketType: TicketType) => {
    const editedTicketTypeInputs = ticketTypeInputs.map((typeInput) => {
      if (typeInput.type.id === ticketType.id) {
        let newIncrementValue = typeInput.qty + incrementValue < 0 ? -typeInput.qty : incrementValue;
        newIncrementValue = totalTicketQty + incrementValue < 0 ? -totalTicketQty : newIncrementValue;
        newIncrementValue = typeInput.qty + newIncrementValue > ticketType.numAvail ? ticketType.numAvail - typeInput.qty : newIncrementValue;
        newIncrementValue = totalTicketQty + newIncrementValue > 20 ? 20 - totalTicketQty : newIncrementValue;

        setTotalTicketQty(totalTicketQty + newIncrementValue);
        typeInput.qty += newIncrementValue;
      }
      return typeInput;
    });
    setTicketTypeInputs(editedTicketTypeInputs);
  };

  const handlePayWhatCanPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const editedTicketTypeInputs = ticketTypeInputs.map((typeInput) => {
      if (typeInput.type.name === 'Pay What You Can') {
        const payWhatNumber = parseFloat(event.currentTarget.value);
        if (isNaN(payWhatNumber)) {
          typeInput.payWhatCanPrice = null;
        } else {
          typeInput.payWhatCanPrice = Math.max(parseFloat(payWhatNumber.toFixed(2)), 0);
        }
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
          {ticketTypeInput.type.name !== 'Pay What You Can' ? (
            <>
              <button
                className='inline-block p-0.5 rounded-full bg-white text-zinc-900'
                onClick={() => handleQtyChange(1, ticketTypeInput.type)}
              >
                <PlusIcon strokeWidth={2} />
              </button>
              <p className='inline-block w-8 text-center'>
                {ticketTypeInput.qty}
              </p>
              <button
                className='inline-block p-0.5 rounded-full bg-white text-zinc-900'
                onClick={() => handleQtyChange(-1, ticketTypeInput.type)}
              >
                <SmallMinusIcon strokeWidth={2} />
              </button>{' '}
              @ {ticketTypeInput.type.price}
            </>
          ) : (
            <>
              <button
                className='inline-block p-0.5 rounded-full bg-white text-zinc-900'
                onClick={() => handleQtyChange(1, ticketTypeInput.type)}
              >
                <PlusIcon strokeWidth={2} />
              </button>
              <p className='inline-block w-8 text-center'>
                {ticketTypeInput.qty}
              </p>
              <button
                className='inline-block p-0.5 rounded-full bg-white text-zinc-900'
                onClick={() => handleQtyChange(-1, ticketTypeInput.type)}
              >
                <SmallMinusIcon strokeWidth={2} />
              </button>
              @{' '}
              <input
                type='number'
                value={ticketTypeInput.payWhatCanPrice}
                className='rounded text-black'
                onChange={handlePayWhatCanPriceChange}
              />
            </>
          )}
        </div>
      ))}
    </article>
  );
};
