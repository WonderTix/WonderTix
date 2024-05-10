import React, {ReactElement, useEffect, useState} from 'react';

export interface DateOption {
  date: string;
  soldOut: boolean;
}

interface ShowingDateSelectProps {
  dateOptions: DateOption[];
  onSelectDate: (dateOption: DateOption) => void;
}

export const ShowingDateSelect = (props: ShowingDateSelectProps): ReactElement => {
  const {dateOptions, onSelectDate} = props;

  return (
    <ul className='flex gap-3 w-full overflow-x-auto mb-8'>
      {dateOptions.map((date, index) => (
        <li key={index}>
          <button className='bg-white rounded-md p-3 flex flex-col items-center w-20' onClick={() => onSelectDate(date)}>
            <span className='font-medium'>{date.date.slice(0, 3).toUpperCase()}</span>
            <span>{date.date.slice(5, 8).toUpperCase()}</span>
            <span className='text-2xl font-bold'>{date.date.slice(9, 11)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
