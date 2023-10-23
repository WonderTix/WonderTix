import React from 'react';
import {MagnifyGlassIcon} from '../SVGIcons';

interface Props {
  currentTab: string;
  searchTerm: string;
  onTabChange: (value: string) => void;
  onSearchTermChange: ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => void;
  TABS: {
    label: string;
    value: string;
  } [];
}

const TableFilter: React.FC<Props> = ({currentTab, searchTerm, onTabChange, onSearchTermChange, TABS}) => {
  return (
    <div className='flex justify-between items-center gap-8 mb-6 px-6'>
      <div className='flex relative bg-gray-300/50 rounded border-4'>
        <div
          className='absolute top-0 h-9 w-28 rounded shadow
          border transition-transform ease-in-out duration-300
          border-gray-400/40 shadow-gray-800/50 bg-white'
          style={{transform: `translateX(${TABS
            .findIndex((t) => t.value === currentTab) * 100}%)`,
          }}
        />
        {TABS.map(({label, value}) => (
          <button
            key={value}
            onClick={() => onTabChange(value)}
            className='p-2 text-sm font-bold z-10 w-28
            flex items-center justify-evenly rounded'
          >
            {label}
          </button>
        ))}
      </div>
      <div className='relative text-gray-900 w-80'>
        <input
          name='search'
          type='search'
          value={searchTerm}
          onChange={onSearchTermChange}
          placeholder='Search for a task...'
          className='bg-gray-200/40 focus:bg-white rounded
          border border-gray-500/50 placeholder:italic
          placeholder-gray-400 focus:placeholder-white
          focus:outline-none text-sm p-2 pr-2 pl-9 min-w-full'
        />
        <span className='absolute pointer-events-none
          items-center inset-y-0 left-0 flex p-3'
        >
          <MagnifyGlassIcon size='4' />
        </span>
      </div>
    </div>
  );
};

export default TableFilter;
