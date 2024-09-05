import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className='flex justify-center mt-8'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-4 py-2 text-yellow-400 rounded-md mr-2'
        aria-label='Previous page'
      >
        Previous
      </button>
      <span className='px-4 py-2'>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-4 py-2 text-yellow-400 rounded-md ml-2'
        aria-label='Next page'
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
