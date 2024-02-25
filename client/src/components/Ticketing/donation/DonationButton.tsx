import React, {ReactElement} from 'react';

interface DonationButtonProps {
  amount: number;
  label: string;
  onClick; // set the donation amount
}

/**
 * Returns an individual button for the donation amount button array
 *
 * @param DonationButtonProps
 * @param {number} DonationButtonProps.amount
 * @param {string} DonationButtonProps.label
 * @param {func} DonationButtonProps.onClick
 * @returns {ReactElement}
 */
export default function DonationButton({
  amount,
  label,
  onClick,
}: DonationButtonProps): ReactElement {
  return (
    <button
      className='bg-indigo-600 hover:bg-indigo-700 active:bg-transparent active:text-indigo-600 border border-indigo-600 text-white font-bold py-4 px-4 rounded'
      onClick={() => onClick(amount)}
    >
      $ {amount} {label}
    </button>
  );
}
