import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

const Pagination = ({ totalPages, goToPage }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    goToPage(page);
  };

  const getVisiblePages = () => {
    const visibleCount = 5;
    if (totalPages <= visibleCount) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const start = Math.max(1, Math.min(currentPage - 2, totalPages - (visibleCount - 1)));
    return Array.from({ length: visibleCount }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
