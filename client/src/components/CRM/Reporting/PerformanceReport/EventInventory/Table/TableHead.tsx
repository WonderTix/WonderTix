import React from 'react';
import {ChevronUpDownIcon} from '../SVGIcons';

interface TableHeadProps {
  headings: string[];
  onSort: (column: string) => void;
}

const TableHead: React.FC<TableHeadProps> = ({headings, onSort}): React.ReactElement => {
  const renderTableColumn = (columnHeading: string): JSX.Element => {
    const isActionsHeading = columnHeading === 'Actions';
    return (
      <div
        key={columnHeading}
        onClick={() => onSort(columnHeading)}
        aria-label={`Sort by ${columnHeading}`}
        className={`table-cell cursor-pointer border-l border-t border-gray-300 p-3
        ${!isActionsHeading ? 'hover:bg-gray-300 shadow-inner' : ''}`}
      >
        <div className={`flex ${isActionsHeading ? 'justify-center' : 'justify-between'} items-center`}>
          {columnHeading} {!isActionsHeading && <ChevronUpDownIcon size='4'/>}
        </div>
      </div>
    );
  };

  return (
    <div className='table-row tracking-tight bg-gradient-to-t relative shadow
      border-gray-500 shadow-gray-600/50 from-gray-400/40 to-gray-100/80'>
      {headings.map((heading) => renderTableColumn(heading))}
    </div>
  );
};

export default TableHead;