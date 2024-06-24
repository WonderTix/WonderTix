import {SearchIcon, XIcon} from '../../Icons';
import React from 'react';
import {formatUSD} from '../RefundOrders/RefundOrders';

interface DIscountInputProps {
  discountText: string;
  disabled: boolean;
  handleDiscountTextChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleApplyDiscount: () => Promise<void>;
  handleRemoveDiscount: () => void;
}

export const DiscountInput: React.FC<DIscountInputProps> = (props) => {
  const {
    disabled,
    handleDiscountTextChange,
    discountText,
    handleRemoveDiscount,
    handleApplyDiscount,
  } = props;
  return (
    <div
      className={`bg-zinc-700 flex items-center justify-center gap-1 p-1 rounded-lg shadow-md w-full
          ${disabled && 'bg-zinc-800 border-2 border-zinc-900'}`}
    >
      <input
        type='text'
        placeholder='Discount code...'
        aria-label='Discount code'
        className='p-1 px-2 w-full rounded-md text-zinc-100 bg-zinc-700 disabled:bg-zinc-800'
        value={discountText}
        onChange={handleDiscountTextChange}
        disabled={disabled}
      />
      {!disabled ? (
        <button
          className='p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300 justify-end rounded-full'
          onClick={handleApplyDiscount}
          aria-label='Apply discount code'
        >
          <SearchIcon className='h-5 w-5' strokeWidth={3} />
        </button>
      ) : (
        <button
          className='p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300 justify-end rounded-full'
          onClick={handleRemoveDiscount}
          aria-label='Remove discount code'
        >
          <XIcon className='h-5 w-5' strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

interface DiscountDisplayProps {
  discountTotal: number;
  invalidDiscount: boolean;
}

export const DiscountDisplay: React.FC<DiscountDisplayProps> = (props) => {
  const {discountTotal, invalidDiscount} = props;
  return invalidDiscount ? (
    <p className='bg-amber-400 text-sm font-medium text-zinc-900 rounded-md px-3'>
      Invalid Discount Code
    </p>
  ) : (
    <p className='flex items-center gap-2 justify-between w-full'>
      <span className='text-zinc-100 text-sm'>Discount</span>
      <span className='text-amber-300 text-lg font-bold'>
        {formatUSD(discountTotal)}
      </span>
    </p>
  );
};
