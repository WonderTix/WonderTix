import React from 'react';
import {DeleteButtonIcon, EditButtonIcon} from '../SVGIcons';

// ${eventID} probably needs to change
const tableInfo = fetch(process.env.REACT_APP_API_2_URL + '/events/listing');

interface TableRowsProps {
  event: {
    name: string;
    type: string;
    generalLedgerCode: string;
    totalInstances: number;
    activeInstances: number;
    sortOrder: number;
    active: boolean;
  };
}

const TableRows: React.FC<TableRowsProps> = (
  {event},
): React.ReactElement => {
  const {
    name,
    type,
    generalLedgerCode,
    totalInstances,
    activeInstances,
    sortOrder,
    active,
  } = event;
  return (
    <div className='table-row hover:bg-slate-100'>
      <div className='table-cell text-center border-x border-gray-200 p-2.5'>eventNames</div>
    </div>
  );
 
 
  /*return (
    <div className='table-row hover:bg-slate-100'>
      <div className='table-cell text-center border-x border-gray-200 p-2.5'>{tableInfo.name}</div>
      <div className='table-cell p-2.5'>{tableInfo.type}</div>
      <div className='table-cell p-2.5'>{tableInfo.generalLedgerCode}</div>
      <div className='table-cell p-2.5'>{tableInfo.totalInstances}</div>
      <div className='table-cell p-2.5'>{tableInfo.activeInstances}</div>
      <div className='table-cell p-2.5'>{tableInfo.sortOrder}</div>
      <div className='table-cell p-2.5'>{tableInfo.active}</div>
    </div>
  );*/
};

export default TableRows;
