export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  totalItems = 0,
  pageSize = 10,
}) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between mt-4 px-2">

      {/* Left */}
      <p className="text-[13px] text-[#475569] font-medium">
        Showing{" "}
        {(currentPage - 1) * pageSize + 1}
        {" "}to{" "}
        {Math.min(currentPage * pageSize, totalItems)}
        {" "}of{" "}
        {totalItems}
        {" "}tasks
      </p>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Previous */}
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className="
            w-10 h-10
            rounded-lg
            border
            border-[#E2E8F0]
            flex
            items-center
            justify-center
            text-[#2563EB]
            disabled:opacity-40
            cursor-pointer
          "
        >
          ‹
        </button>

        {/* Page Numbers */}
        {pages.slice(0, 5).map((page) => (
          <button
            key={page}
            onClick={() =>
              setCurrentPage(page)
            }
            className={`
              w-10 h-10
              rounded-lg
              text-sm
              font-medium
              border
              cursor-pointer
              ${
                currentPage === page
                  ? "bg-[#2563EB] text-white border-[#2563EB]"
                  : "bg-white text-[#334155] border-[#E2E8F0]"
              }
            `}
          >
            {page}
          </button>
        ))}

        {totalPages > 5 && (
          <>
            <span className="px-2 text-[#64748B]">
              ...
            </span>

            <button
              onClick={() =>
                setCurrentPage(totalPages)
              }
              className="
                w-10 h-10
                rounded-lg
                border
                border-[#E2E8F0]
                text-[#334155]
                cursor-pointer
              "
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next */}
        <button
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className="
            w-10 h-10
            rounded-lg
            border
            border-[#E2E8F0]
            flex
            items-center
            justify-center
            text-[#2563EB]
            disabled:opacity-40
            cursor-pointer
          "
        >
          ›
        </button>

        {/* Page Size */}
        <select
          className="
            ml-2
            h-10
            px-3
            rounded-lg
            border
            border-[#E2E8F0]
            text-[14px]
            text-[#334155]
            outline-none
            cursor-pointer
          "
          value={pageSize}
          readOnly
        >
          <option>
            {pageSize} / page
          </option>
        </select>

      </div>
    </div>
  );
}