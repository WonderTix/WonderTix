import React, {
  useEffect,
  useState,
} from 'react';

import {
  TABLE_DATA,
  TableDataType,
} from './Table/TableData';

import TableHead from './Table/TableHead';
import TableRows from './Table/TableRows';
import Pagination from './Table/Pagination';
import TableFilter from './Table/TableFilter';
import TableActions from './Table/TableActions';
import ModalManager from './Modals/ModalManager';
import {ExclamationTriangleIcon} from './SVGIcons';

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

// Task Priority
export const taskPriority = (priority: 'Important' | 'Normal'): JSX.Element => {
  if (priority === 'Important') {
    return <ExclamationTriangleIcon size='4' />;
  }
};

const Tasks: React.FC = (): React.ReactElement => {
  const [tableRow, setTableRow] = useState<TableDataType[]>(TABLE_DATA);
  const [modalType, setModalType] = useState<'detail' |'create' | 'update' | 'delete' | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<string>('date');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TableDataType | null>(null);
  const [filteredRows, setFilteredRows] = useState<TableDataType[]>(TABLE_DATA);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const rowHeight = 48;
  const currentDate = new Date();
  const tableHeight = (rowsPerPage * rowHeight) + rowHeight+1;
  const totalItems = filteredRows.length;
  const indexOfLastRow = Math.min(currentPage * rowsPerPage, totalItems);
  const indexOfFirstRow = Math.max(0, indexOfLastRow - rowsPerPage);
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  // Reload Table
  const reloadTable = (): void => {
    setCurrentTab('date');
    setSearchTerm('');
    setFilteredRows(TABLE_DATA);
    setCurrentPage(1);
  };

  // Open Modal
  const openModal = (
    modal: 'detail' | 'create' | 'update' | 'delete',
    task?: TableDataType,
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

  // Create Task
  const handleCreateTask = (createTask: TableDataType): void => {
    setTableRow((tableRow) => [...tableRow, createTask]);
    closeModal();
  };

  // Update Task
  const handleUpdateTask = (updateTask: TableDataType): void => {
    setTableRow((tableRow) =>
      tableRow.map((task: TableDataType) =>
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

  const renderCurrentRows = (): React.ReactNode => {
    return (
      <tr>
        <td
          colSpan={TABLE_HEADINGS.length}
          className='table-cell p-3 text-center font-medium'
        > <p> No tasks found. </p>
        </td>
      </tr>
    );
  };

  // Status Color
  const taskStatus = (status: 'Pending' | 'Started' | 'Completed'): string => {
    switch (status) {
    case 'Pending': return 'rounded bg-gray-200 text-gray-900';
    case 'Started': return 'rounded bg-yellow-200 text-yellow-900';
    default: return 'rounded bg-green-200 text-green-900';
    }
  };

  // Sort Column headings
  const handleColumnSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prevDirection) =>
        prevDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Tab filter
  const onTabChange = (value: string) => {
    setCurrentTab(value);
  };

  // Search filter
  const handleFilter = (
    {target: {value}}: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRows(tableRow);
    } else {
      const term = searchTerm.toLowerCase();
      const updatedFilteredRows = tableRow.filter((task: TableDataType) => {
        return (
          task.assignedTo.toLowerCase().includes(term) ||
          task.subject.toLowerCase().includes(term) ||
          task.relatedTo.toLowerCase() === term ||
          task.contact.toLowerCase() === term ||
          (task.status.toLowerCase() === term &&
          (term === 'completed' || term === 'started' || term === 'pending'))
        );
      });
      setFilteredRows(updatedFilteredRows);
    }
  }, [searchTerm, tableRow]);

  useEffect(() => {
    let sortedRows: TableDataType[] = [...tableRow];
    switch (currentTab) {
    case 'date':
      sortedRows = sortedRows.filter((row) => row.status !== 'Completed');
      sortedRows.sort((a, b) =>
        Math.abs(currentDate.getTime() - a.dueDate.getTime()) -
        Math.abs(currentDate.getTime() - b.dueDate.getTime()));
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

  useEffect(() => {
    const sortedRows: TableDataType[] = [...tableRow];
    const stringComparator = (key: string) =>
      (a: TableDataType, b: TableDataType) => a[key].localeCompare(b[key]);
    const numberComparator = (key: string) =>
      (a: TableDataType, b: TableDataType) => a[key] - b[key];
    const statusComparator = (a: TableDataType, b: TableDataType) => {
      const statusOrder = {'Completed': 1, 'Pending': 2, 'Started': 3};
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

  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className='md:ml-[16rem] md:mt-32 md:mr-16 sm:mt-[4rem] sm:mx-[0rem]'>
        <div className='bg-white shadow-md rounded-md w-100 md:mx-auto pt-5 h-fit
          antialiased lg:subpixel-antialiased xl:antialiased max-w-screen-lg mb-8'
        >
          <TableActions
            openModal={openModal}
            reloadTable={reloadTable}
          />
          <TableFilter
            TABS={TABS}
            currentTab={currentTab}
            searchTerm={searchTerm}
            onTabChange={onTabChange}
            onSearchTermChange={handleFilter}
          />
          <div
            className='relative overflow-y-auto mx-0'
            style={{height: `${tableHeight}px`, overflowY: 'auto'}}
          >
            <table className='divide-y divide-gray-200 table-auto table w-full'>
              <thead className='table-header-group'>
                <TableHead
                  headings={TABLE_HEADINGS}
                  onSort={handleColumnSort}
                />
              </thead>
              <tbody className='table-row-group divide-y divide-gray-200 items-center
                text-sm tracking-tight md:tracking-normal font-normal'
              > {currentRows.length > 0 ? (
                  currentRows.map((task) => (
                    <TableRows
                      task={task}
                      key={task.id}
                      openModal={openModal}
                      taskStatus={taskStatus}
                      taskPriority={taskPriority}
                    />
                  ))
                ) : (renderCurrentRows())}
              </tbody>
            </table>
          </div>
          <div className='flex justify-between'>
            <ModalManager
              onClose={closeModal}
              modalType={modalType}
              isModalOpen={isModalOpen}
              selectedTask={selectedTask}
              onCreate={handleCreateTask}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          </div>
          <div className='flex justify-between py-5 px-6 border-t'>
            <Pagination
              totalItems={totalItems}
              currentPage={currentPage}
              itemsPerPage={rowsPerPage}
              gotoPage={(page: number) => {
                const newTotalPages = Math.ceil(totalItems / rowsPerPage);
                setCurrentPage(Math.min(page, newTotalPages));
              }}
              onItemsPerPageChange={(newSize: number) => setRowsPerPage(newSize)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
