import React from 'react';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationButton: React.FC<{
  page: number;
  title: string;
  label: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}> = ({page, title, label, currentPage, onPageChange}) => (
  <button
    key={page}
    role='button'
    title={title}
    aria-label={label}
    onClick={() => onPageChange(page)}
    className={`px-4 py-2 rounded hover:bg-indigo-50 text-sm 
      ${currentPage === page ? 'border border-gray-300 hover:bg-white' : ''}
    `}
  >
    {page}
  </button>
);

/**
 * Generate Pagination Buttons
 *
 * @param totalPages
 * @param currentPage
 * @returns
 */
function generatePaginationButtons(totalPages: number, currentPage: number) {
  const buttons = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push({type: 'PAGE', page: i});
    }
  } else if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) {
      buttons.push({type: 'PAGE', page: i});
    }
    buttons.push({type: 'ELLIPSIS', page: 6});
    buttons.push({type: 'PAGE', page: totalPages});
  } else if (currentPage > totalPages - 4) {
    buttons.push({type: 'PAGE', page: 1});
    buttons.push({type: 'ELLIPSIS', page: 2});
    for (let i = totalPages - 4; i <= totalPages; i++) {
      buttons.push({type: 'PAGE', page: i});
    }
  } else {
    buttons.push({type: 'PAGE', page: 1});
    buttons.push({type: 'ELLIPSIS', page: 2});
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      buttons.push({type: 'PAGE', page: i});
    }
    buttons.push({type: 'ELLIPSIS', page: currentPage + 3});
    buttons.push({type: 'PAGE', page: totalPages});
  }

  return buttons;
}

const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginationButtons = generatePaginationButtons(totalPages, currentPage);

  return (
    <div className="flex justify-between w-full">
      <button
        title="Previous page"
        aria-label="Previous Page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="border border-gray-300 px-4 py-2 rounded hover:bg-indigo-50
        w-24 text-sm"
      >
        Previous
      </button>

      <div>
        {paginationButtons.map(({type, page}) => {
          if (type === 'ELLIPSIS') {
            return <span key={`ellipsis-${page}`}>...</span>;
          }
          return (
            <PaginationButton
              key={page}
              page={page}
              title={`page ${page}`}
              label={`page ${page}`}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          );
        })}
      </div>

      <button
        title="Next page"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="border border-gray-300 px-4 py-2 rounded hover:bg-indigo-50
        w-24 text-sm"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
