import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  totalItems = 0,
  pageSize = 10,
  className = "",
}) {
  useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages || 1);
  }
}, [totalPages]);
  return (
    <div className={`flex flex-col lg:flex-row items-center justify-between gap-4 mt-4 ${className}`}>
      
      {/* Left Info */}
      <p className="text-sm text-slate-600 font-medium">
        Showing{" "}
        {(currentPage - 1) * pageSize + 1} to{" "}
        {Math.min(currentPage * pageSize, totalItems)} of{" "}
        {totalItems} tasks
      </p>

      {/* Right Controls */}
      <div className="flex items-center gap-3">

        {/* Previous */}
        <button
          disabled={currentPage === 1}
         
          onClick={() => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
}}
          className="
            w-10 h-10
            rounded-xl
            border
            border-[#E2E8F0]
            flex items-center justify-center
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Info */}
        <span className="text-sm font-medium text-slate-600">
          {currentPage} / {totalPages}
        </span>

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          
          onClick={() => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
}}
          className="
            w-10 h-10
            rounded-xl
            border
            border-[#E2E8F0]
            flex items-center justify-center
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
}