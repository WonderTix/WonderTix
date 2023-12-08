import React from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from '../SVGIcons';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  gotoPage: (page: number) => void;
  onItemsPerPageChange: (size: number) => void;
}

const Pagination: React.FC<Props> = (
  {totalItems, itemsPerPage, currentPage, gotoPage, onItemsPerPageChange},
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="text-sm text-gray-700">
        <span className="mr-3">
          Page <span>{currentPage}</span> of <span>{totalPages}</span>
        </span>
        <select className='rounded border border-gray-300 p-2'
          value={itemsPerPage}
          onChange={(e) => {
            const newSize = Number(e.target.value);
            onItemsPerPageChange(newSize);
            const newTotalPages = Math.ceil(totalItems / newSize);
            gotoPage(Math.min(currentPage, newTotalPages));
          }}
        >
          {[10, 15, 25, 50].map((size) => (
            <option key={size} value={size}> Show {size} </option>
          ))}
        </select>
      </div>

      <nav
        className="flex justify-end border border-gray-300 rounded" aria-label="Pagination">
        <button
          title='First page'
          aria-label='First page'
          onClick={() => gotoPage(1)}
          className={`shadow-inner rounded-l px-3 py-2 border-r border-gray-300
          ${currentPage === 1 ? 'cursor-not-allowed opacity-50 bg-white' : 'hover:bg-slate-100'}`}
          disabled={currentPage === 1}
        >
          <span className="sr-only">First</span>
          <ChevronDoubleLeftIcon size={5} />
        </button>
        <button
          title='Previous page'
          aria-label='Previous page'
          onClick={() => gotoPage(currentPage - 1)}
          className={`shadow-inner px-3 py-2 border-r border-gray-300
          ${currentPage === 1 ? 'cursor-not-allowed opacity-50 bg-white' : 'hover:bg-slate-100'}`}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon size={5} />
        </button>
        <button
          title='Next page'
          aria-label='Next page'
          onClick={() => gotoPage(currentPage + 1)}
          className={`shadow-inner px-3 py-2 border-r border-gray-300
          ${currentPage === totalPages ? 'cursor-not-allowed opacity-50 bg-white' : 'hover:bg-slate-100'}`}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon size={5} />
        </button>
        <button
          title='Last page'
          aria-label='Last page'
          onClick={() => gotoPage(totalPages)}
          className={`shadow-inner rounded-r px-3 py-2
          ${currentPage === totalPages ? 'cursor-not-allowed opacity-50 bg-white' : 'hover:bg-slate-100'}`}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Last</span>
          <ChevronDoubleRightIcon size={5} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
