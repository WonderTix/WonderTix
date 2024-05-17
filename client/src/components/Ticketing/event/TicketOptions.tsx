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
  console.log(ticketTypes);

  const [totalTicketQty, setTotalTicketQty] = useState(0);

  const [ticketTypeInputs, setTicketTypeInputs] = useState<TicketTypeInput[]>(
    ticketTypes.map((type): TicketTypeInput => {
      return {
        type: type,
        qty: 0,
        payWhatCanPrice: undefined,
      };
    }),
  );

  useEffect(() => {
    setTotalTicketQty(0);
    setTicketTypeInputs(
      ticketTypes.map((type): TicketTypeInput => {
        return {
          type: type,
          qty: 0,
          payWhatCanPrice: undefined,
        };
      }),
    );
  }, [ticketTypes]);

  const handleQtyChange = (incrementValue: number, ticketType: TicketType) => {
    const editedTicketTypeInputs = ticketTypeInputs.map((typeInput) => {
      if (typeInput.type.id === ticketType.id) {
        let newIncrementValue =
          typeInput.qty + incrementValue < 0 ? -typeInput.qty : incrementValue;
        newIncrementValue =
          totalTicketQty + incrementValue < 0
            ? -totalTicketQty
            : newIncrementValue;
        newIncrementValue =
          typeInput.qty + newIncrementValue > ticketType.numAvail
            ? ticketType.numAvail - typeInput.qty
            : newIncrementValue;
        newIncrementValue =
          totalTicketQty + newIncrementValue > 20
            ? 20 - totalTicketQty
            : newIncrementValue;

        setTotalTicketQty(totalTicketQty + newIncrementValue);
        typeInput.qty += newIncrementValue;
      }
      return typeInput;
    });
    setTicketTypeInputs(editedTicketTypeInputs);
  };

  const handlePayWhatCanPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const editedTicketTypeInputs = ticketTypeInputs.map((typeInput) => {
      if (typeInput.type.name === 'Pay What You Can') {
        const payWhatNumber = parseFloat(event.currentTarget.value);
        if (isNaN(payWhatNumber)) {
          typeInput.payWhatCanPrice = undefined;
        } else {
          typeInput.payWhatCanPrice = Math.max(
            parseFloat(payWhatNumber.toFixed(2)),
            0,
          );
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
    <article className='flex flex-col gap-8 justify-center text-white max-w-[30em] w-full mx-auto'>
      {ticketTypeInputs.length ? ticketTypeInputs.map((ticketTypeInput, index) => (
        <div key={index} className='flex justify-between'>
          <span className='flex flex-col'>
            <p className='relative text-xl font-bold'>
              {ticketTypeInput.type.name}
            </p>
            {ticketTypeInput.type.name !== 'Pay What You Can' ? (
              <p className='font-medium text-md text-zinc-200'>
                {ticketTypeInput.type.price}
              </p>
            ) : (
              <input
                type='number'
                placeholder='Price'
                value={ticketTypeInput.payWhatCanPrice}
                className='rounded text-white px-2 py-1 bg-zinc-900/50 w-[10em] mt-1'
                onChange={handlePayWhatCanPriceChange}
              />
            )}
          </span>
          <span className='flex items-center gap-2'>
            <button
              className='inline-block p-0.5 rounded-full bg-transparent text-white border-2 border-white hover:text-zinc-400 hover:border-zinc-400 transition-all'
              onClick={() => handleQtyChange(1, ticketTypeInput.type)}
            >
              <PlusIcon strokeWidth={2.3} />
            </button>
            <p className='inline-block w-8 text-center font-bold text-lg'>
              {ticketTypeInput.qty}
            </p>
            <button
              className='inline-block p-0.5 rounded-full bg-transparent text-white border-2 border-white hover:text-zinc-400 hover:border-zinc-400 transition-all'
              onClick={() => handleQtyChange(-1, ticketTypeInput.type)}
            >
              <SmallMinusIcon strokeWidth={2.3} />
            </button>
          </span>
        </div>
      )) : (
        <p className='text-zinc-300 font-bold text-center mx-auto'>Select a Time</p>
      )}
    </article>
  );
};
