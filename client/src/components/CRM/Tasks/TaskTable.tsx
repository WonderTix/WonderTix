import React, {useEffect, useState} from 'react';
import ModalCreateTask from './ModalCreateTask';
import ModalUpdateTask from './ModalUpdateTask';
import ModalRemoveTask from './ModalRemoveTask';
import TableHeading from './TableHeading';
import TableRows from './TableRows';
import Pagination from './Pagination';

import {
  TableRowType,
  TABLE_ROWS,
} from './TaskData';

import {
  ExclamationTriangleIcon,
  MagnifyGlassIcon,
  ReloadIcon,
  SquarePlusIcon,
} from './SVGIcons';

type TabType = {
  label: string;
  value: string;
};

const TABS: TabType[] = [
  {label: 'Due Date', value: 'date'},
  {label: 'Important', value: 'important'},
  {label: 'Most Recent', value: 'most recent'},
];

const TABLE_HEADINGS = [
  'ID',
  'Assigned',
  'Subject',
  'Relation',
  'Contact',
  'Date',
  'Status',
  'Actions',
];

const TaskTable: React.FC = (): React.ReactElement => {
  const [
    modalType,
    setModalType,
  ] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableRow, setTableRow] = useState<TableRowType[]>(TABLE_ROWS);
  const [selectedTask, setSelectedTask] = useState<TableRowType | null>(null);

  // Create Task
  const handleCreateTask = (createTask: TableRowType): void => {
    setTableRow((tableRow) => [...tableRow, createTask]);
    closeModal();
  };

  // Edit Task
  const handleUpdateTask = (updateTask: TableRowType): void => {
    setTableRow((tableRow) =>
      tableRow.map((task: TableRowType) =>
        task.id === updateTask.id ? updateTask : task));
    closeModal();
  };

  // Delete Task
  const handleDeleteTask = (): void => {
    if (selectedTask) {
      setTableRow(tableRow.filter((task) =>
        task.id !== selectedTask.id));
      closeModal();
    }
  };

  // Open Modal
  const openModal = (
      modal: 'create' | 'edit' | 'delete',
      task?: TableRowType,
  ): void => {
    setModalType(modal);
    setIsModalOpen(true);
    setSelectedTask(task);
  };

  // Close Modal
  const closeModal = (): void => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedTask(null);
  };

  // Priority Tabs
  const [currentTab, setCurrentTab] = useState<string>('date');
  const onTabChange = (value: string) => {
    setCurrentTab(value);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 25;

  // Filter Search for Tasks
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredRows, setFilteredRows] = useState<TableRowType[]>(TABLE_ROWS);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRows(tableRow);
    } else {
      const term = searchTerm.toLowerCase();
      const updatedFilteredRows = tableRow.filter((task: TableRowType) => {
        return (
          task.assignedTo.toLowerCase().includes(term) ||
          task.subject.toLowerCase().includes(term) ||
          task.relatedTo.toLowerCase() === term ||
          task.contact.toLowerCase() === term ||
          (task.status.toLowerCase() === term &&
          (term === 'done' || term === 'started' || term === 'pending'))
        );
      });
      setFilteredRows(updatedFilteredRows);
    }
  }, [searchTerm, tableRow]);

  // Filter Tasks
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const sortedRows: TableRowType[] = [...tableRow];
    switch (currentTab) {
      case 'date':
        sortedRows.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
        break;
      case 'important':
        sortedRows.sort((a, b) =>
          (a.priority === 'Important' ? -1 : 1) -
          (b.priority === 'Important' ? -1 : 1));
        break;
      case 'most recent':
        sortedRows.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
    setFilteredRows(sortedRows);
  }, [currentTab, tableRow]);

  const resetTableState = () => {
    setCurrentTab('date');
    setSearchTerm('');
    setFilteredRows(TABLE_ROWS);
    setCurrentPage(1);
  };

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const handleColumnSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prevDirection) =>
        prevDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  useEffect(() => {
    const sortedRows: TableRowType[] = [...tableRow];

    const stringComparator = (key: string) =>
      (a: TableRowType, b: TableRowType) => a[key].localeCompare(b[key]);
    const numberComparator = (key: string) =>
      (a: TableRowType, b: TableRowType) => a[key] - b[key];
    const statusComparator = (a: TableRowType, b: TableRowType) => {
      const statusOrder = {'Pending': 1, 'Started': 2, 'Done': 3};
      return statusOrder[a.status] - statusOrder[b.status];
    };

    const sorters = {
      'ID': numberComparator('id'),
      'Assigned': stringComparator('assignedTo'),
      'Subject': stringComparator('subject'),
      'Relation': stringComparator('relatedTo'),
      'Contact': stringComparator('contact'),
      'Date': numberComparator('dueDate'),
      'Status': statusComparator,
    };

    if (sortColumn && sorters[sortColumn]) {
      sortedRows.sort((a, b) => {
        const compareResult = sorters[sortColumn](a, b);
        return sortDirection === 'asc' ? compareResult : -compareResult;
      });
    }

    setFilteredRows(sortedRows);
  }, [sortColumn, sortDirection, tableRow]);


  const totalItems = filteredRows.length;
  const indexOfLastRow = Math.min(currentPage * ROWS_PER_PAGE, totalItems);
  const indexOfFirstRow = Math.max(0, indexOfLastRow - ROWS_PER_PAGE);
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  // Status Tags
  const getStatusClass = (status: 'Pending' | 'Started' | 'Done'): string => {
    switch (status) {
      case 'Pending': return 'rounded bg-gray-200 text-gray-800';
      case 'Started': return 'rounded bg-yellow-200 text-yellow-800';
      default: return 'rounded bg-green-200 text-green-800';
    }
  };

  // Task Priority
  const getPriority = (priority: 'Important' | 'Normal'): JSX.Element => {
    if (priority === 'Important') {
      return <ExclamationTriangleIcon size='4' />;
    }
  };

  return (
    <div className='w-full h-full absolute overflow-x-hidden'>
      <div className='flex flex-col lg:ml-[12rem] lg:mt-32
        md:ml-[11.35rem] md:mt-32 sm:mt-[5rem] sm:mx-[0rem]'
      >
        <div className='bg-white shadow-md rounded-md w-100
          md:mx-auto pt-5 antialiased'
        >
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
                onClick={resetTableState}
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
          <div className='flex justify-between items-center mb-8 px-6'>
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
            <div className='relative ml-auto text-gray-900'>
              <input
                name='search'
                type='search'
                value={searchTerm}
                onChange={handleFilter}
                placeholder='Search for a task...'
                className='bg-gray-200/40 focus:bg-white rounded
                border border-gray-500/50 placeholder:italic
                placeholder-gray-400 focus:placeholder-white
                focus:outline-none text-sm p-2 pr-2 pl-9 w-80'
              />
              <span className='absolute pointer-events-none
                items-center inset-y-0 left-0 flex p-3'
              >
                <MagnifyGlassIcon size='4' />
              </span>
            </div>
          </div>
          <div
            className="relative overflow-y-auto"
            style={{height: '739px', overflowY: 'auto'}}
          >
            <table className='divide-y divide-gray-200 table-auto w-full'>
              <TableHeading
                headings={TABLE_HEADINGS}
                onSort={handleColumnSort}
              />
              <tbody className='divide-y divide-gray-200 items-center text-sm
                tracking-tight md:tracking-normal font-normal'
              >
                {currentRows.length > 0 ? (
                  currentRows.map((task) => (
                    <TableRows
                      key={task.id}
                      task={task}
                      getPriority={getPriority}
                      getStatusClass={getStatusClass}
                      openModal={openModal}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={TABLE_HEADINGS.length}
                      className='flex-item p-3 text-center'
                    >
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='flex items-center justify-between px-6 py-5
            border-t border-gray-200'
          >
            <Pagination
              totalItems={totalItems}
              itemsPerPage={ROWS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
          <div className='flex justify-between'>
            {isModalOpen && modalType === 'create' && (
              <ModalCreateTask
                isVisible={isModalOpen}
                onCancel={closeModal}
                onSubmit={handleCreateTask}
              />
            )}
          </div>
          <div className='flex justify-between'>
            {isModalOpen && modalType === 'edit' && (
              <ModalUpdateTask
                task={selectedTask}
                isVisible={isModalOpen}
                onCancel={closeModal}
                onSubmit={handleUpdateTask}
              />
            )}
          </div>
          <div className='flex justify-between'>
            {isModalOpen && modalType === 'delete' && (
              <ModalRemoveTask
                isVisible={isModalOpen}
                onCancel={closeModal}
                onSubmit={handleDeleteTask}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
