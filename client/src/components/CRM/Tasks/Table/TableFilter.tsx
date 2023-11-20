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
    <div className='flex justify-between items-center gap-8 mb-6 px-6 text-sm'>
      <div className='flex relative bg-gray-300/50 rounded p-1'>
        <div
          className='absolute top-1 h-9 w-28 rounded-sm bg-white
            transition-transform ease-in-out duration-300'
          style={{
            transform: `translateX(${TABS.findIndex((t) => t.value === currentTab) * 100}%)`,
            boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.6)',
          }}
        />
        {TABS.map(({label, value}) => (
          <button
            key={value}
            onClick={() => onTabChange(value)}
            className='flex items-center justify-evenly rounded font-bold z-10 p-2 w-28'>
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
          className='p-2 pl-9 rounded min-w-full
          placeholder:italic placeholder-gray-400
          border border-gray-500/50 bg-gray-200/40
          focus:bg-white focus:placeholder-white focus:outline-none'
        />
        <span className='flex absolute inset-y-0 left-0 p-3 pointer-events-none items-center'>
          <MagnifyGlassIcon size='4' />
        </span>
      </div>
    </div>
  );
};

export default TableFilter;
