import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useState } from "react";

const RECORDS_PER_PAGE = 10;

const getRequestTypeStyle = (type) => {
  switch (type) {
    case "EXCEL_UPLOAD":
      return "bg-purple-100 text-purple-700";

    case "MANUAL_UPDATE":
      return "bg-blue-100 text-blue-700";

    case "CREATE_ACTIVITY":
      return "bg-green-100 text-green-700";

    case "DELETE_ACTIVITY":
      return "bg-red-100 text-red-700";

    case "UPDATE_ACTIVITY":
      return "bg-cyan-100 text-cyan-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

const getStatusStyle = (status) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-700";

    case "REJECTED":
      return "bg-red-100 text-red-700";

    case "PENDING":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

export default function AuthorizationTable({ logs = [], loading, onView, approveSelectedRequests, rejectSelectedRequests }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRows, setSelectedRows] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [showApproveModal, setShowApproveModal] = useState(false);

  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

  const [rejectReason, setRejectReason] = useState("");

  if (loading) {
    return (
      <div
        className="
        bg-white
        rounded-3xl
        p-8
        "
      >
        Loading requests...
      </div>
    );
  }

  const totalPages = Math.ceil(logs.length / RECORDS_PER_PAGE);

  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;

  const endIndex = startIndex + RECORDS_PER_PAGE;

  const paginatedLogs = logs.slice(startIndex, endIndex);

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(
        selectedRows.filter(
          (selectedId) => selectedId !== id
        )
      );
    } else {
      setSelectedRows([
        ...selectedRows,
        id,
      ]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(
        paginatedLogs.map((log) => log.id)
      );
    } else {
      setSelectedRows([]);
    }
  };

  const handleApprove = async () => {
    try {
      await approveSelectedRequests(
        selectedRows
      );

      setSelectedRows([]);
      setShowApproveModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectSelectedRequests(
        selectedRows,
        rejectReason
      );

      setSelectedRows([]);
      setRejectReason("");
      setShowRejectConfirm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="
    bg-white
    rounded-[24px]
    overflow-hidden
    border
    border-[#E8EDF5]
    shadow-sm
    mt-5
    "
    >
      {/* Bulk Actions */}

      <div
        className="
      px-4
      xl:px-5
      py-4
      border-b
      border-[#EDF2F7]
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-3
      "
      >
        <div
          className="
        flex
        flex-wrap
        items-center
        gap-3
        md:flex-row
        md:items-center
        md:justify-between
        "
        >
          <span
            className="
          text-xs
          xl:text-sm
          font-medium
          text-slate-600
          2xl:text-[17px]
          2xl:font-medium
          2xl:tracking-wide
          "
          >
            {selectedRows.length} Requests Selected
          </span>

          <button
            disabled={selectedRows.length === 0}
            onClick={() => setShowApproveModal(true)}
            className="
          h-9
          xl:h-10
          px-4
          rounded-xl
          bg-green-600
          text-white
          text-xs
          xl:text-sm
          font-semibold
          hover:bg-green-700
          transition
          cursor-pointer
          2xl:h-11
          2xl:px-5
          2xl:text-[17px]
          "
          >
            Approve Selected
          </button>

          <button
            disabled={selectedRows.length === 0}
            onClick={() => setShowRejectModal(true)}
            className="
          h-9
          xl:h-10
          px-4
          rounded-xl
          bg-red-500
          text-white
          text-xs
          xl:text-sm
          font-semibold
          hover:bg-red-600
          transition
          cursor-pointer
          2xl:h-11
          2xl:px-5
          2xl:text-[17px]
          "
          >
            Reject Selected
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table
          className="
        w-full
        min-w-[950px]
        xl:min-w-full
        "
        >
          <thead>
            <tr
              className="
            border-b
            border-[#EDF2F7]
            bg-white
            "
            >
              <th className="w-[4%] px-3 xl:px-4 py-4">
                <input
                  className="cursor-pointer 2xl:w-5 2xl:h-5"
                  type="checkbox"
                  checked={
                    paginatedLogs.length > 0 &&
                    paginatedLogs.every((log) =>
                      selectedRows.includes(log.id)
                    )
                  }

                  onChange={handleSelectAll}
                />
              </th>

              <th className="w-[6%] px-3 xl:px-4 py-4 text-left text-sm xl:text-base 2xl:text-lg font-semibold text-[#64748B]">
                Sr No.
              </th>

              <th className="w-[14%] px-3 xl:px-4 py-4 text-left text-sm xl:text-base 2xl:text-lg font-semibold text-[#64748B]">
                Request Type
              </th>

              <th className="w-[12%] px-3 xl:px-4 py-4 text-left text-sm xl:text-base 2xl:text-lg font-semibold text-[#64748B]">
                Requested By
              </th>

              <th className="w-[28%] px-3 xl:px-4 py-4 text-left text-sm xl:text-base 2xl:text-lg font-semibold text-[#64748B]">
                Resource
              </th>

              <th className="w-[18%] px-3 xl:px-4 py-4 text-left text-sm xl:text-base 2xl:text-lg font-semibold text-[#64748B]">
                Requested At
              </th>

              <th className="w-[10%] px-3 xl:px-4 py-4 text-left text-sm xl:text-base 2xl:text-lg font-semibold text-[#64748B]">
                Status
              </th>

              <th className="w-[8%] px-3 xl:px-4 py-4 text-center text-sm xl:text-base 2xl:text-lg font-semibold text-[#64748B]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="
                  py-10
                  text-center
                  text-slate-500
                  text-sm
                  xl:text-base
                  2xl:text-lg
                "
                >
                  No requests found
                </td>
              </tr>
            ) : (
              paginatedLogs.map((log, index) => {
                const srNo = startIndex + index + 1;

                return (
                  <tr
                    key={log.id || srNo}
                    className="
                  border-b
                  border-[#EDF2F7]
                  hover:bg-slate-50
                  transition
                  "
                  >
                    <td className="px-3 xl:px-4 py-3 text-center">
                      <input
                        className="cursor-pointer 2xl:w-5 2xl:h-5"
                        type="checkbox"
                        checked={selectedRows.includes(log.id)}
                        onChange={() => handleRowSelect(log.id)}
                      />
                    </td>

                    <td className="px-3 xl:px-4 py-3 text-xs xl:text-sm font-medium text-[#0F172A] 2xl:text-lg 2xl:font-medium 2xl:tracking-wide">
                      {srNo}
                    </td>

                    <td className="px-3 xl:px-4 py-3">
                      <span
                        className={`
                      px-3
                      py-1
                      rounded-full
                      xl:text-[14px]
                      2xl:text-[16px]
                      font-medium
                      whitespace-nowrap
                      ${getRequestTypeStyle(log.requestSource)}
                      `}
                      >
                        {log.requestSource}
                      </span>
                    </td>

                    <td className="px-3 xl:px-4 py-4 text-xs xl:text-base 2xl:text-lg font-medium text-[#0F172A] 2xl:font-medium 2xl:tracking-wide">
                      {log.requestedBy}
                    </td>

                    <td className="px-3 xl:px-4 py-4">
                      <div
                        className="
                      max-w-[140px]
                      xl:max-w-[280px]
                      truncate
                      text-slate-600
                      
                      xl:text-[15px]
                      2xl:text-[18px]
                      "
                        title={log.activityName}
                      >
                        {log.activityName}
                      </div>
                    </td>

                    <td className="px-3 xl:px-4 py-4 text-sm xl:text-base 2xl:text-lg text-[#475569] 2xl:font-medium 2xl:tracking-wide">
                      {new Date(log.requestedAt).toLocaleString()}
                    </td>

                    <td className="px-3 xl:px-4 py-4">
                      <span
                        className={`
                      px-3
                      py-1
                      rounded-full
                      xl:text-[14px]
                      2xl:text-[15px]
                      font-medium
                      whitespace-nowrap
                      ${getStatusStyle(log.status)}
                      `}
                      >
                        ● {log.status}
                      </span>
                    </td>

                    <td className="px-3 xl:px-4 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => onView(log)}
                          className="
                        w-8
                        h-8
                        xl:w-9
                        xl:h-9
                        2xl:w-10
                        2xl:h-10
                        rounded-xl
                        bg-[#EEF4FF]
                        hover:bg-blue-100
                        flex
                        items-center
                        justify-center
                        transition
                        cursor-pointer
                        2xl:w-10
                        2xl:h-10
                        "
                        >
                          <Eye size={14} className="text-[#2563EB]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div
        className="
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-4
      px-4
      xl:px-5
      py-4
      border-t
      border-[#EDF2F7]
      "
      >
        <span className="text-xs xl:text-sm text-[#64748B] 2xl:text-lg">
          Showing {logs.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(endIndex, logs.length)} of {logs.length} requests
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="
          w-9
          h-9
          xl:w-10
          xl:h-10
          rounded-xl
          border
          border-[#E2E8F0]
          flex
          items-center
          justify-center
          disabled:opacity-50
          2xl:w-12
          2xl:h-12
          2xl:text-lg
          "
          >
            <ChevronLeft size={16} />
          </button>

          <button
            className="
          w-9
          h-9
          xl:w-10
          xl:h-10
          rounded-xl
          bg-gradient-to-r
          from-[#001B5E]
          via-[#1144A8]
          to-[#2B78FF]
          text-white
          text-sm
          font-semibold
          2xl:w-12
          2xl:h-12
          2xl:text-lg
          "
          >
            {currentPage}
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="
          w-9
          h-9
          xl:w-10
          xl:h-10
          rounded-xl
          border
          border-[#E2E8F0]
          flex
          items-center
          justify-center
          disabled:opacity-50
          2xl:w-12
          2xl:h-12
          2xl:text-lg
          "
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {
        showApproveModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[420px]">
              <h2 className="text-lg font-semibold mb-2">
                Approve Requests
              </h2>

              <p className="text-slate-600">
                Are you sure you want to approve{" "}
                <b>{selectedRows.length}</b> request(s)?
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="px-4 py-2 border rounded-lg cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleApprove}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )
      }

      {
        showRejectModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[500px]">
              <h2 className="text-lg font-semibold mb-4">
                Reject Requests
              </h2>

              <textarea
                value={rejectReason}
                onChange={(e) =>
                  setRejectReason(e.target.value)
                }
                rows={4}
                placeholder="Enter rejection reason..."
                className="
            w-full
            border
            rounded-lg
            p-3
            outline-none
            focus:border-blue-500
          "
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 border rounded-lg cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  disabled={!rejectReason.trim()}
                  onClick={() => {
                    setShowRejectModal(false);
                    setShowRejectConfirm(true);
                  }}
                  className="
              px-4
              py-2
              bg-red-600
              text-white
              rounded-lg
              disabled:opacity-50
              cursor-pointer
            "
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )
      }

      {
        showRejectConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[450px]">
              <h2 className="text-lg font-semibold text-red-600">
                Confirm Rejection
              </h2>

              <p className="mt-3 text-slate-600">
                Are you sure you want to reject{" "}
                <b>{selectedRows.length}</b> request(s)?
              </p>

              <div className="mt-2 p-3 bg-red-50 rounded-lg text-sm">
                <b>Reason:</b> {rejectReason}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowRejectConfirm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
