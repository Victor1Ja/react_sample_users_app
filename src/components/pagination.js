import React from 'react';

const Pagination = ({ currentPage, setCurrentPage }) => {
  function handlePageClick(page) {
    setCurrentPage(page);
  }

  return (
    <div className="pagination">
      <button
        className="button_page"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}>
        Previous Page
      </button>
      <span>{currentPage}</span>
      <button
        className="button_page"
        onClick={() => handlePageClick(currentPage + 1)}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
