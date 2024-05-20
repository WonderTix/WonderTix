import React, {ReactElement, useEffect, useState} from 'react';
import {TicketType} from './TicketPicker';
import {PlusIcon, SmallMinusIcon} from '../Icons';

/**
 * A TicketInput is a user-interactible ticket type for a particular showing time.
 * This type can change in qty and/or price (if it's pay what you can).
 */
export interface TicketInput {
  type: TicketType;
  qty: number;
  payWhatCanPrice?: number;
}

interface TicketOptionsProps {
  ticketTypes: TicketType[];
  onChange: (ticketTypeInputs: TicketInput[]) => void;
}

/**
 * The list of ticket inputs that the user can modify.
 *
 * @param {TicketOptionsProps} props
 * @param {TicketType[]} props.ticketTypes
 * @param {func} props.onChange
 * @returns {React.ReactElement} TicketOptions
 */
export const TicketOptions = (props: TicketOptionsProps): ReactElement => {
  const {ticketTypes, onChange} = props;

  const [totalTicketQty, setTotalTicketQty] = useState(0);
  const [ticketInputs, setTicketInputs] = useState<TicketInput[]>(
    ticketTypes.map((type): TicketInput => {
      return {
        type: type,
        qty: 0,
        payWhatCanPrice: undefined,
      };
    }),
  );

  useEffect(() => {
    // Reset ticket inputs if they are changing from the props
    setTotalTicketQty(0);
    setTicketInputs(
      ticketTypes.map((type): TicketInput => {
        return {
          type: type,
          qty: 0,
          payWhatCanPrice: undefined,
        };
      }),
    );
  }, [ticketTypes]);

  useEffect(() => {
    onChange(ticketInputs);
  }, [ticketInputs]);

  const handleQtyChange = (incrementValue: number, ticketType: TicketType) => {
    const editedTicketInputs = ticketInputs.map((ticketInput) => {
      if (ticketInput.type.id === ticketType.id) {
        // This cryptic code requires the total quantity of all tickets on screen to be
        // less than 20 total tickets, less than their respective ticket restrictions
        // available quantity, and all greater than 0, for any integer incrementValue.
        let newIncrementValue =
          ticketInput.qty + incrementValue < 0
            ? -ticketInput.qty
            : incrementValue;
        newIncrementValue =
          totalTicketQty + incrementValue < 0
            ? -totalTicketQty
            : newIncrementValue;
        newIncrementValue =
          ticketInput.qty + newIncrementValue > ticketType.numAvail
            ? ticketType.numAvail - ticketInput.qty
            : newIncrementValue;
        newIncrementValue =
          totalTicketQty + newIncrementValue > 20
            ? 20 - totalTicketQty
            : newIncrementValue;

        setTotalTicketQty(totalTicketQty + newIncrementValue);
        ticketInput.qty += newIncrementValue;
      }
      return ticketInput;
    });
    setTicketInputs(editedTicketInputs);
  };

  const handlePayWhatCanPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const editedTicketInputs = ticketInputs.map((ticketInput) => {
      if (ticketInput.type.name === 'Pay What You Can') {
        const payWhatNumber = parseFloat(event.currentTarget.value);
        if (isNaN(payWhatNumber)) {
          ticketInput.payWhatCanPrice = undefined;
        } else {
          ticketInput.payWhatCanPrice = Math.max(
            parseFloat(payWhatNumber.toFixed(2)),
            0,
          );
        }
      }
      return ticketInput;
    });
    setTicketInputs(editedTicketInputs);
  };

  return (
    <article className='flex flex-col gap-8 text-white max-w-[30em] w-full mx-auto'>
      {ticketInputs.length ? (
        ticketInputs.map((ticketInput, index) => (
          <div key={index} className='flex justify-between' data-testid='ticket-input'>
            <span className='flex flex-col'>
              <p className='relative text-xl font-bold' data-testid='ticket-type-name'>
                {ticketInput.type.name}
              </p>
              {ticketInput.type.name !== 'Pay What You Can' ? (
                <p className='font-medium text-md text-zinc-200'>
                  {ticketInput.type.price}
                </p>
              ) : (
                <input
                  aria-label='Pay what you can ticket price'
                  type='number'
                  placeholder='0.00'
                  value={ticketInput.payWhatCanPrice}
                  className='rounded text-white px-2 py-1 bg-zinc-900/50 w-[10em] mt-1'
                  onChange={handlePayWhatCanPriceChange}
                />
              )}
            </span>
            <span className='flex items-center gap-2'>
              <button
                aria-label='Add one ticket'
                className='inline-block p-0.5 rounded-full bg-transparent text-white border-2 border-white hover:text-zinc-400 hover:border-zinc-400 transition-all'
                onClick={() => handleQtyChange(1, ticketInput.type)}
              >
                <PlusIcon strokeWidth={2.3} />
              </button>
              <p
                className='inline-block w-8 text-center font-bold text-lg'
                aria-label={`${ticketInput.qty} tickets`}
              >
                {ticketInput.qty}
              </p>
              <button
                aria-label='Remove one ticket'
                className='inline-block p-0.5 rounded-full bg-transparent text-white border-2 border-white hover:text-zinc-400 hover:border-zinc-400 transition-all'
                onClick={() => handleQtyChange(-1, ticketInput.type)}
              >
                <SmallMinusIcon strokeWidth={2.3} />
              </button>
            </span>
          </div>
        ))
      ) : (
        <p className='text-zinc-300 font-bold text-center mx-auto md:mt-3'>
          Select a Time
        </p>
      )}
    </article>
  );
};
