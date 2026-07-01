import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          w-10
          h-10
          rounded-xl
          border
          border-[#E2E8F0]
          flex
          items-center
          justify-center
          disabled:opacity-50
          disabled:cursor-not-allowed
          cursor-pointer
          2xl:w-12
          2xl:h-12
          2xl:text-lg
          2xl:font-medium
          2xl:rounded-2xl
          2xl:border-2
          2xl:border-slate-300
        "
      >
        <ChevronLeft size={16} />
      </button>

      <span
        className="
          px-4
          flex
          items-center
          text-sm
          font-medium
          2xl:text-base
        "
      >
        {currentPage} / {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          w-10
          h-10
          rounded-xl
          border
          border-[#E2E8F0]
          flex
          items-center
          justify-center
          disabled:opacity-50
          disabled:cursor-not-allowed
          cursor-pointer
          2xl:w-12
          2xl:h-12
          2xl:text-lg
          2xl:font-medium
          2xl:rounded-2xl
          2xl:border-2
          2xl:border-slate-300
        "
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
