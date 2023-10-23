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
        className={`table-cell cursor-pointer border-x border-t
        hover:bg-gray-300 border-gray-300 p-3`}
      >
        <div className={`flex ${isActionsHeading ? 'justify-center' : 'justify-between'} items-center`}>
          {columnHeading} {!isActionsHeading && <ChevronUpDownIcon size='4'/>}
        </div>
      </div>
    );
  };

  return (
    <div className='table-header-group tracking-tight'>
      <div
        className='table-row rounded-tl-sm rounded-tr-sm bg-gradient-to-t relative shadow-sm
        border-gray-500 shadow-gray-600/50 from-gray-400/40 to-gray-100/80'
      >
        {headings.map((heading) => renderTableColumn(heading))}
      </div>
    </div>
  );
};

export default TableHead;
