import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/pagination/paginationSlice";
import "./Pagination.css";
import { useState } from "react";

const Pagination = () => {
  // Get current page and total pages from Redux state
  const currentPage = useSelector(state => state.pagination.currentPage);
  const totalPages = useSelector(state => state.pagination.totalPages);
  const dispatch = useDispatch();

  // Local state for managing active class
  const [activePage, setActivePage] = useState(currentPage);

  // Go to next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
      setActivePage(currentPage + 1);
    }
  };

  // Go to previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
      setActivePage(currentPage - 1);
    }
  };

  const handlePageClick = page => {
    dispatch(setPage(page));
    setActivePage(page);
  };

  // Render pagination buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handlePageClick(i)} className={`pagination-btn ${activePage === i ? "active" : ""}`}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <section className="pagination">
      <div className="pagination-container w-100">
        <div className="pagination-content">
          <div className="pagination-boxes">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
            </button>
            {renderPageNumbers()}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
