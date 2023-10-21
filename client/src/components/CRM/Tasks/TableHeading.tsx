import React from 'react';
import {ChevronUpDownIcon} from './SVGIcons';

interface TableHeadProps {
  headings: string[];
  onSort: (column: string) => void;
}

const TableHeading: React.FC<TableHeadProps> = (
    {headings, onSort},
): React.ReactElement => {
  const renderTableColumn = (columnHeading: string): JSX.Element => {
    return (
      <th
        key={columnHeading}
        aria-label={`Sort by ${columnHeading}`}
        onClick={() => onSort(columnHeading)}
        className='cursor-pointer border-x border-t
        hover:bg-gray-300 border-gray-300 p-3'
      >
        <div className='flex flex-item justify-between items-center'>
          {columnHeading}
          {columnHeading !== 'Actions' && <ChevronUpDownIcon size='4'/>}
        </div>
      </th>
    );
  };

  return (
    <thead className='tracking-tight'>
      <tr className='rounded-tl-sm rounded-tr-sm border-gray-500
        bg-gradient-to-t from-gray-400/40 to-gray-100/80
        shadow-sm shadow-gray-600/50 relative'
      >
        {headings.map((heading) => renderTableColumn(heading))}
      </tr>
    </thead>
  );
};

export default TableHeading;
