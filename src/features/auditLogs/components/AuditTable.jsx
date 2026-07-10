import { Eye } from "lucide-react";
import { useState } from "react";
import Pagination from "../../../components/layout/Pagination";

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

    case "EXPORT_EXCEL":
      return "bg-purple-100 text-purple-700";

    case "IMPORT_PROJECT":
      return "bg-amber-100 text-amber-700";

    case "UPLOAD_CREATE_ACTIVITY":
      return "bg-lime-100 text-lime-700";

    case "UPLOAD_UPDATE_ACTIVITY":
      return "bg-yellow-100 text-yellow-700";

    case "DELETE_PROJECT":
      return "bg-orange-100 text-orange-700";

    case "REQUEST_ACTIVITY_UPDATE":
      return "bg-pink-100 text-pink-700";

    case "APPROVE_ACTIVITY_UPDATE":
      return "bg-green-100 text-green-800";

    case "REJECT_ACTIVITY_UPDATE":
      return "bg-red-100 text-red-800";

    case "APPROVE_ALL_ACTIVITY_UPDATES":
      return "bg-emerald-100 text-emerald-800";

    case "REJECTED_ALL_ACTIVITY_UPDATES":
      return "bg-rose-100 text-rose-800";

    case "ROLLBACK_ACTIVITY":
    case "ROLLBACK_ACTIVITY_UPDATE":
      return "bg-gray-200 text-gray-800";

    case "CREATE_PROJECT_INFORMATION":
      return "bg-blue-100 text-blue-800";

    case "UPDATE_PROJECT_INFORMATION":
      return "bg-cyan-100 text-cyan-800";

    case "DELETE_PROJECT_INFORMATION":
      return "bg-red-100 text-red-800";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

const formatAction = (value = "") => {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function AuditTable({ logs = [], loading, onView }) {
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return (
      <div
        className="
        bg-white
        rounded-2xl
        border
        border-[#CDD7E3]
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
    <div className="overflow-x-auto mt-5 rounded-2xl border border-[#CDD7E3] bg-white shadow-sm">
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b border-[#CDD7E3] bg-blue-100">
            <th className="w-[90px] px-4 py-4 text-left text-base font-semibold text-slate-600">
              Sr. No.
            </th>

            <th className="w-[180px] px-2 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
              Action Type
            </th>

            <th className="px-8 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
              Entity Type
            </th>

            <th className="px-0 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
              Entity Name
            </th>

            <th className="px-4 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
              Modified By
            </th>

            <th className="px-4 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
              Modified Date
            </th>

            <th className="px-4 py-4 text-center text-base font-semibold text-slate-600 whitespace-nowrap">
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
              border-[#CDD7E3]
            "
              >
                {/* Sr No */}
                <td className="w-[50px] px-6 py-2">
                  <span className="text-slate-700 text-sm xl:text-base 2xl:text-base font-medium">
                    {(currentPage - 1) * RECORDS_PER_PAGE + index + 1}
                  </span>
                </td>

                {/* Action Type */}
                <td className="w-[180px] px-0 py-2">
                  <span
                    className={`
                  inline-flex
                  items-center
                  px-3
                  py-1.5
                  rounded-full
                  text-xs
                  font-semibold
                  whitespace-nowrap
                  ${getActionColor(log.actionType)}
                `}
                  >
                    {formatAction(log.actionType)}
                  </span>
                </td>

                {/* Entity Type */}
                <td className="px-8 py-2">
                  <span
                    className="
                  block
                  truncate
                  text-slate-700
                  text-sm
                  xl:text-base
                  2xl:text-base
                "
                    title={log.entityType}
                  >
                    {formatAction(log.entityType)}
                  </span>
                </td>

                {/* Entity Name */}
                <td className="px-0 py-2">
                  <span
                    className="
                  block
                  truncate
                  text-slate-700
                  text-sm
                  xl:text-base
                  2xl:text-base
                "
                    title={log.entityName}
                  >
                    {log.entityName}
                  </span>
                </td>

                {/* Modified By */}
                <td className="px-4 py-2">
                  <span
                    className="
                  block
                  truncate
                  text-slate-700
                  text-sm
                  xl:text-base
                  2xl:text-base
                "
                    title={formatAction(log.modifiedBy)}
                  >
                    {formatAction(log.modifiedBy)}
                  </span>
                </td>

                {/* Modified Date */}
                <td className="px-4 py-2">
                  <span className="text-slate-700 text-sm xl:text-base 2xl:text-base">
                    {new Date(log.modifiedDate)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => onView?.(log)}
                      title="View Details"
                      className="
                    h-9
                    w-9
                    rounded-lg
                    bg-blue-50
                    text-blue-600
                    flex
                    items-center
                    justify-center
                    hover:bg-blue-100
                    transition-colors
                    cursor-pointer
                  "
                    >
                      <Eye size={16} />
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
              text-sm
            "
              >
                No audit logs found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={logs.length}
        recordsPerPage={10}
        label="Logs"
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
