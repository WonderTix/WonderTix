import React from 'react';
import {DeleteButtonIcon, EditButtonIcon} from '../SVGIcons';

interface TableRowsProps {
  task: {
    id: number;
    assignedTo: string;
    email: string;
    subject: string;
    relatedTo: string;
    contact: string;
    dueDate: Date;
    priority: 'Important' | 'Normal';
    status: 'Pending' | 'Started' | 'Completed';
  };
  taskPriority: (priority: string) => JSX.Element;
  taskStatus: (status: string) => string;
  openModal: (type: 'detail' | 'update' | 'delete', task: any) => void;
}

const TableRows: React.FC<TableRowsProps> = (
  {task, taskPriority, taskStatus, openModal},
): React.ReactElement => {
  const {
    id,
    assignedTo,
    subject,
    relatedTo,
    contact,
    dueDate,
    priority,
    status,
  } = task;

  return (
    <div className='table-row hover:bg-blue-50/80'>
      <div className='table-cell text-center border-x border-gray-200 p-2.5'>{id}</div>
      <div className='table-cell p-2.5'>{assignedTo}</div>
      <div className='table-cell p-2.5'>
        <div className='flex items-center'>
          {priority === 'Important' &&
            <span className='mr-1'>{taskPriority(priority)}</span>
          }
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openModal('detail', task);
            }}
            className='text-blue-600 hover:text-indigo-900 focus:outline-none w-80'
          >
            {subject}
          </a>
        </div>
      </div>
      <div className='table-cell p-2.5'>{relatedTo}</div>
      <div className='table-cell p-2.5'>{contact}</div>
      <div className='table-cell w-24 p-2.5'>{dueDate.toLocaleDateString()}</div>
      <div className='table-cell p-2.5 text-center'>
        <span
          className={`py-1 px-1.5 whitespace-nowrap font-medium bg-opacity-80
          ${taskStatus(status)}`}
        > {status}
        </span>
      </div>
      <div className='table-cell border-x border-gray-200 text-center p-2.5 w-24'>
        <button
          title='Edit'
          aria-label='Edit'
          onClick={() => openModal('update', task)}
          className='text-gray-500 hover:bg-indigo-50 rounded mx-1.5
          hover:text-indigo-600 hover:ring-2 hover:ring-indigo-600
            hover:ring-opacity-50 transition-all duration-200 p-0.5'
        >
          <EditButtonIcon size='5'/>
        </button>
        <button
          title='Delete'
          aria-label='Delete'
          onClick={() => openModal('delete', task)}
          className='text-gray-500 hover:bg-red-50 rounded mx-1.5
          hover:text-red-600 hover:ring-2 hover:ring-red-600
            hover:ring-opacity-50 transition-all duration-200 p-0.5'
        >
          <DeleteButtonIcon size='5'/>
        </button>
      </div>
    </div>
  );
};

export default TableRows;
