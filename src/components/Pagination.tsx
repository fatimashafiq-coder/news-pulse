import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center items-center gap-2 py-6">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className={`px-3 py-1 rounded border ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
        key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 rounded border ${
            currentPage === page ? "bg-black text-white cursor-pointer" : 
            "cursor-pointer bg-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className={`px-3 py-1 rounded border ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
