import React, {
    useEffect,
    useState,
  } from 'react';
  
  import {
    TABLE_DATA,
    TableDataType,
  } from '../Table/TableData';
  
  import TableHead from './Table/TableHead';
  import TableRows from './Table/TableRows';
  import Pagination from './Table/Pagination';
  import TableFilter from './Table/TableFilter';
  import TableActions from './Table/TableActions';
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
    'Name',
    'Type',
    'General Ledger Code',
    'Total Instances (Active & Retired)',
    'Active Instances',
    'Sort Order',
    'Active',
  ];
  
  
  const EventInventory: React.FC = (): React.ReactElement => {
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
  
  
  
    const renderCurrentRows = (): React.ReactNode => {
      return (
        <tr>
          <td
            colSpan={TABLE_HEADINGS.length}
            className='table-cell p-3 text-center font-medium'
          > <p> No events found. </p>
          </td>
        </tr>
      );
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
        const updatedFilteredRows = tableRow.filter((event: TableDataType) => {
          return (
            event.name.toLowerCase().includes(term) ||
            event.type.toLowerCase().includes(term)
          );
        });
        setFilteredRows(updatedFilteredRows);
      }
    }, [searchTerm, tableRow]);
  
  
    useEffect(() => {
      const sortedRows: TableDataType[] = [...tableRow];
      const stringComparator = (key: string) =>
        (a: TableDataType, b: TableDataType) => a[key].localeCompare(b[key]);
      const numberComparator = (key: string) =>
        (a: TableDataType, b: TableDataType) => a[key] - b[key];
      const statusComparator = (a: TableDataType, b: TableDataType) => {
        const sortOrder = {'1': 1, '2': 2, '3': 3};
        return sortOrder[a.sortOrder] - sortOrder[b.sortOrder];
      };
  
      const sorters = {
        'ID': numberComparator('id'),
        'Name': stringComparator('name'),
        'Type': stringComparator('type'),
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
                    currentRows.map((event) => (
                      <TableRows
                        event={event}
                        key={event.name}
                      />
                    ))
                  ) : (renderCurrentRows())}
                </tbody>
              </table>
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
  
  export default EventInventory;
  