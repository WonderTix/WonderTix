import React, {ReactElement, useRef} from 'react';
import {ChevronLeft, ChevronRight} from '../Icons';

/**
 * Type for a date option to see showing times for.
 */
export interface DateOption {
  date: string;
  soldOut: boolean;
}

interface ShowingDateSelectProps {
  dateOptions: DateOption[];
  selectedDate?: DateOption;
  onSelectDate: (dateOption: DateOption) => void;
}

/**
 * The selector to choose a date to view showings for.
 *
 * @param {ShowingDateSelectProps} props
 * @param {DateOption[]} props.dateOptions
 * @param {DateOption?} props.selectedDate
 * @param {func} props.onSelectDate
 * @returns {React.ReactElement} ShowingDateSelect
 */
export const ShowingDateSelect = (
  props: ShowingDateSelectProps,
): ReactElement => {
  const {dateOptions, selectedDate, onSelectDate} = props;

  const ref = useRef(null);

  const handleScrollClick = (direction: 'left' | 'right') => {
    if (ref.current) {
      const listWidth = ref.current.getBoundingClientRect().width;
      switch (direction) {
        case 'left':
          ref.current.scrollBy({
            left: listWidth,
          });
          break;
        case 'right':
          ref.current.scrollBy({
            left: -listWidth,
          });
      }
    }
  };

  return (
    <div className='relative w-full mb-9'>
      <button
        aria-label='Scroll list of dates to left'
        className='absolute left-[-1.25em] top-[2.5em] bg-zinc-600 shadow-md text-white rounded-full h-10 w-10 hover:bg-zinc-500 transition-all'
        onClick={() => handleScrollClick('right')}
      >
        <ChevronLeft
          className='absolute left-[0.45em] top-2 h-6 w-6'
          strokeWidth={4}
        />
      </button>
      <ul
        className='flex gap-3 scroll-smooth overflow-x-auto md:overflow-hidden pb-8 pt-2 px-2'
        ref={ref}
      >
        {dateOptions.map((date, index) => (
          <li key={index}>
            <button
              data-testid='date-option'
              className={`${
                selectedDate?.date === date.date
                  ? 'bg-blue-500 text-white'
                  : date.soldOut ? 'bg-zinc-400' : 'bg-white'
              } rounded-md p-3 flex flex-col items-center w-20 shadow-md hover:shadow-lg hover:scale-105 transition-all`}
              onClick={() => onSelectDate(date)}
            >
              <span className='font-medium'>
                {date.date.slice(0, 3).toUpperCase()}
              </span>
              <span>{date.date.slice(5, 8).toUpperCase()}</span>
              <span className='text-2xl font-bold'>
                {date.date.slice(9, 11)}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button
        aria-label='Scroll list of dates to right'
        className='absolute right-[-1.25em] top-[2.5em] bg-zinc-600 shadow-md text-white rounded-full h-10 w-10 hover:bg-zinc-500 transition-all'
        onClick={() => handleScrollClick('left')}
      >
        <ChevronRight
          className='absolute left-[0.55em] top-2 h-6 w-6'
          strokeWidth={4}
        />
      </button>
    </div>
  );
};
