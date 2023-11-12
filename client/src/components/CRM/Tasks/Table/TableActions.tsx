import React from 'react';
import {
  ReloadIcon,
  SquarePlusIcon,
} from '../SVGIcons';

interface TableActionsProps {
  reloadTable: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;

  openModal: (
    modalType: 'create' | 'update' | 'delete', task?: any
  ) => void;
}

const TableActions: React.FC<TableActionsProps> = (
  {reloadTable, openModal},
) => {
  return (
    <div className='mb-3 flex justify-between items-center gap-8 px-6'>
      <div className='flex flex-col w-80'>
        <h1 className='text-4xl font-medium text-gray-800'>
          Task Manager
        </h1>
        <p className='text-sm text-gray-500'>
          See information about tasks
        </p>
      </div>
      <div className='flex text-sm font-semibold gap-2 w-80'>
        <button
          title='Reload'
          onClick={reloadTable}
          className='flex justify-center items-center rounded
            border border-gray-400 shadow shadow-gray-500/50
            hover:shadow-inner bg-gradient-to-t hover:bg-gradient-to-b
            from-gray-200 to-white gap-2 w-40 px-4 py-2'
        >
          <ReloadIcon size={4} />
          Reload Table
        </button>
        <button
          title='Create Task'
          onClick={() => openModal('create')}
          className='flex justify-center items-center text-white bg-black
            rounded shadow shadow-gray-500/50 hover:shadow-inner border
            border-black bg-gradient-to-t from-black to-gray-500/50
            hover:bg-gradient-to-b active:opacity-75 gap-2 px-4 py-2 w-40'
        >
          <SquarePlusIcon size={4} />
          Create Task
        </button>
      </div>
    </div>
  );
};

export default TableActions;
