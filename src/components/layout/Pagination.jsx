import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  totalRecords,
  recordsPerPage,
  onPageChange,
  label = "records",
  className = "",
}) {
  const startIndex =
    totalRecords === 0 ? 0 : (currentPage - 1) * recordsPerPage;

  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);

  return (
    <div
      className={`
        flex
        flex-col
        sm:flex-row
        items-center
        justify-between
        gap-4
        px-6
        py-4
        border-t
        border-slate-200
        ${className}
      `}
    >
      {/* Showing Records */}
      <span
        className="
          text-sm
          text-slate-500
          2xl:text-base
        "
      >
        Showing {totalRecords === 0 ? 0 : startIndex + 1} to {endIndex} of{" "}
        {totalRecords} {label}
      </span>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="
            w-10
            h-10
            rounded-xl
            border
            border-slate-200
            flex
            items-center
            justify-center
            cursor-pointer
            hover:bg-slate-100
            disabled:opacity-50
            disabled:cursor-not-allowed
            2xl:w-12
            2xl:h-12
            2xl:rounded-2xl
            2xl:border-2
          "
        >
          <ChevronLeft size={16} />
        </button>

        <span
          className="
            min-w-[70px]
            text-center
            text-sm
            font-medium
            text-slate-700
            2xl:text-base
          "
        >
          {totalPages === 0 ? 0 : currentPage} / {Math.max(totalPages, 1)}
        </span>

        <button
          type="button"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className="
            w-10
            h-10
            rounded-xl
            border
            border-slate-200
            flex
            items-center
            justify-center
            cursor-pointer
            hover:bg-slate-100
            disabled:opacity-50
            disabled:cursor-not-allowed
            2xl:w-12
            2xl:h-12
            2xl:rounded-2xl
            2xl:border-2
          "
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
