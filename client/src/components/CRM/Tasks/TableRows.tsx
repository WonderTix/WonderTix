import React from 'react';
import {DeleteButtonIcon, EditButtonIcon} from './SVGIcons';

interface TableRowsProps {
  task: {
    assignedTo: string;
    email: string;
    subject: string;
    relatedTo: string;
    contact: string;
    dueDate: Date;
    priority: 'Important' | 'Normal';
    status: 'Pending' | 'Started' | 'Done';
    id: number;
  };
  getPriority: (priority: string) => JSX.Element;
  getStatusClass: (status: string) => string;
  openModal: (type: 'edit' | 'delete', task: any) => void;
}

const TableRows: React.FC<TableRowsProps> = (
    {task, getPriority, getStatusClass, openModal},
) => {
  const {
    assignedTo,
    email,
    subject,
    relatedTo,
    contact,
    dueDate,
    priority,
    status,
    id,
  } = task;

  return (
    <tr
      className='hover:bg-blue-50/80'
      key={`
        ${assignedTo}
        ${email}
        ${subject}
        ${relatedTo}
        ${contact}
        ${dueDate.toLocaleDateString()}
      `}
    >
      <td className='text-center p-2 border-x border-gray-200'>{id}</td>
      <td className='flex-item p-2'>{assignedTo}</td>
      <td className='flex-item p-2'>
        <div className='flex items-center'>
          {priority === 'Important' &&
            <span className='mr-1'>{getPriority(priority)}</span>}
          <a
            href='#'
            className='text-blue-600 hover:text-indigo-900 focus:outline-none
            w-80'
          >
            {subject}
          </a>
        </div>
      </td>
      <td className='flex-item p-2'>{relatedTo}</td>
      <td className='flex-item p-2'>{contact}</td>
      <td className='flex-item p-2'>{dueDate.toLocaleDateString()}</td>
      <td className='flex-item text-center p-2'>
        <span
          className={`px-1.5 py-1 whitespace-nowrap font-medium bg-opacity-80
          ${getStatusClass(status)}`}
        > {status}
        </span>
      </td>
      <td className='flex-item p-2 border-x border-gray-200'>
        <button
          title='Edit'
          aria-label='Edit'
          onClick={() => openModal('edit', task)}
          className='text-gray-500 hover:bg-indigo-50 rounded
          hover:text-indigo-600 hover:ring-2 hover:ring-indigo-600
            hover:ring-opacity-50 transition-all duration-200 p-1'
        >
          <EditButtonIcon size='5'/>
        </button>
        <button
          title='Delete'
          aria-label='Delete'
          onClick={() => openModal('delete', task)}
          className='text-gray-500 hover:bg-red-50 rounded ml-1
          hover:text-red-600 hover:ring-2 hover:ring-red-600
            hover:ring-opacity-50 transition-all duration-200 p-1'
        >
          <DeleteButtonIcon size='5'/>
        </button>
      </td>
    </tr>
  );
};

export default TableRows;
