import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useState } from "react";

const RECORDS_PER_PAGE = 10;

const getActionColor = (action) => {
  switch (action) {
    case "CREATE_PROJECT":
      return "bg-emerald-100 text-emerald-700";

    case "CREATE_ACTIVITY":
      return "bg-green-100 text-green-700";

    case "UPDATE_ACTIVITY":
      return "bg-blue-100 text-blue-700";

    case "UPDATE_USER":
      return "bg-cyan-100 text-cyan-700";

    case "DELETE_USER":
      return "bg-red-100 text-red-700";

    case "PHASE_CREATED":
      return "bg-violet-100 text-violet-700";

    case "MILESTONE_CREATED":
      return "bg-indigo-100 text-indigo-700";

    case "TASK_CREATED":
      return "bg-sky-100 text-sky-700";

    case "SUBTASK_CREATED":
      return "bg-teal-100 text-teal-700";

    case "Export_Excel":
      return "bg-purple-100 text-purple-700";

    case "Import_Project":
      return "bg-amber-100 text-amber-700";

    case "Upload_Activity_created":
      return "bg-lime-100 text-lime-700";

    case "Upload_Activity_Updated":
      return "bg-yellow-100 text-yellow-700";

    case "Delete_Project":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

export default function AuditTable({ logs = [], loading, onView }) {
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return (
      <div
        className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-10
        text-center
        text-slate-500
        "
      >
        Loading audit logs...
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(logs.length / RECORDS_PER_PAGE));

  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;

  const pageLogs = logs.slice(startIndex, startIndex + RECORDS_PER_PAGE);

  return (
    <div
      className="
      mt-5
      bg-white
      rounded-3xl
      border
      border-slate-200
      shadow-sm
      overflow-hidden
      "
    >
      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="
      bg-slate-50
      border-b
      border-slate-200
      "
            >
              <th
                className="
        px-6
        py-4
        text-left
        text-sm
        font-semibold
        text-slate-600
        2xl:text-base
        "
              >
                Sr. No.
              </th>

              <th
                className="
        px-6
        py-4
        text-left
        text-sm
        font-semibold
        text-slate-600
        2xl:text-base
        "
              >
                Action Type
              </th>

              <th
                className="
        px-6
        py-4
        text-left
        text-sm
        font-semibold
        text-slate-600
        2xl:text-base
        "
              >
                Entity Type
              </th>

              <th
                className="
        px-6
        py-4
        text-left
        text-sm
        font-semibold
        text-slate-600
        2xl:text-base
        "
              >
                Entity Name
              </th>

              <th
                className="
        px-6
        py-4
        text-left
        text-sm
        font-semibold
        text-slate-600
        2xl:text-base
        "
              >
                Modified By
              </th>

              <th
                className="
        px-6
        py-4
        text-left
        text-sm
        font-semibold
        text-slate-600
        2xl:text-base
        "
              >
                Modified Date
              </th>

              <th
                className="
        px-6
        py-4
        text-center
        text-sm
        font-semibold
        text-slate-600
        2xl:text-base
        "
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {pageLogs.length > 0 ? (
              pageLogs.map((log, index) => (
                <tr
                  key={log.id}
                  className="
          border-b
          border-slate-100
          hover:bg-slate-50
          transition
          "
                >
                  {/* Sr No */}

                  <td
                    className="
            px-6
            py-5
            font-medium
            text-slate-700
            2xl:text-lg
            "
                  >
                    {(currentPage - 1) * RECORDS_PER_PAGE + index + 1}
                  </td>

                  {/* Action Type */}

                  <td className="px-6 py-5">
                    <span
                      className={`
              px-3
              py-1.5
              rounded-full
              text-xs
              font-medium
              2xl:text-base
              ${getActionColor(log.actionType)}
              `}
                    >
                      {log.actionType}
                    </span>
                  </td>

                  {/* Entity Type */}

                  <td
                    className="
            px-6
            py-5
            font-medium
            text-slate-700
            2xl:text-lg
            "
                  >
                    {log.entityType}
                  </td>

                  {/* Entity Name */}

                  <td
                    className="
            px-6
            py-5
            text-slate-700
            2xl:text-lg
            "
                  >
                    {log.entityName}
                  </td>

                  {/* Modified By */}

                  <td
                    className="
            px-6
            py-5
            text-slate-700
            2xl:text-lg
            "
                  >
                    {log.modifiedBy}
                  </td>

                  {/* Modified Date */}

                  <td
                    className="
            px-6
            py-5
            text-slate-700
            2xl:text-lg
            "
                  >
                    {new Date(log.modifiedDate).toLocaleString()}
                  </td>

                  {/* View */}

                  <td
                    className="
            px-6
            py-5
            "
                  >
                    <div className="flex justify-center">
                      <button
                        onClick={() => onView?.(log)}
                        className="
                w-10
                h-10
                rounded-xl
                bg-[#EEF4FF]
                flex
                items-center
                justify-center
                hover:bg-blue-100
                transition
                cursor-pointer
                "
                      >
                        <Eye
                          size={16}
                          className="text-[#2563EB] 2xl:w-8 2xl:h-8"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="
          py-14
          text-center
          text-slate-500
          2xl:text-base
          "
                >
                  No audit logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div
        className="
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
        "
      >
        <span
          className="
          text-sm
          text-slate-500
          2xl:text-base
          "
        >
          Showing {logs.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + RECORDS_PER_PAGE, logs.length)} of{" "}
          {logs.length} logs
        </span>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="
            w-10
            h-10
            rounded-xl
            border
            border-slate-200
            flex
            items-center
            justify-center

            disabled:opacity-50
            disabled:cursor-not-allowed
            2xl:w-12 2xl:h-12
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
            onClick={() => setCurrentPage(currentPage + 1)}
            className="
            w-10
            h-10
            rounded-xl
            border
            border-slate-200
            flex
            items-center
            justify-center

            disabled:opacity-50
            disabled:cursor-not-allowed
            2xl:w-12 2xl:h-12
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
      </div>
    </div>
  );
}
