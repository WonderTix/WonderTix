import React from 'react';
import {
  ReloadIcon,
  SquarePlusIcon,
} from '../SVGIcons';

interface TableActionsProps {
  reloadTable: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const TableActions: React.FC<TableActionsProps> = ({reloadTable}) => {
  return (
    <div className='mb-3 flex justify-between items-center gap-8 px-6'>
      <div className='flex flex-col w-80'>
        <h1 className='text-4xl font-medium text-black'>
          Event Inventory
        </h1>
      </div>
    </div>
  );
};

export default TableActions;
