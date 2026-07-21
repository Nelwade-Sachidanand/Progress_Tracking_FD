import { Eye } from "lucide-react";
import { useState } from "react";
import Pagination from "../../../components/layout/Pagination";

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

export default function AuthorizationTable({
  logs = [],
  allLogs,
  loading,
  onView,
  approveSelectedRequests,
  rejectSelectedRequests,
  currentPage, totalPages, totalRecords, onPageChange,
}) {

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

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pendingIds = allLogs
        .filter((log) => log.status === "PENDING")
        .map((log) => log.id);

      setSelectedRows(pendingIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleApprove = async () => {
    try {
      await approveSelectedRequests(selectedRows);

      setSelectedRows([]);
      setShowApproveModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectSelectedRequests(selectedRows, rejectReason);

      setSelectedRows([]);
      setRejectReason("");
      setShowRejectConfirm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const formatAction = (value = "") => {
    return value
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-[#CDD7E3]
      shadow-sm
      overflow-hidden
      mt-5
    "
    >
      {/* Bulk Actions */}

      <div
        className="
        px-4
        py-2
        border-b
        border-[#CDD7E3]

        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-3
      "
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="
            text-sm
            font-medium
            text-slate-600
            2xl:text-base
          "
          >
            {selectedRows.length} Requests Selected
          </span>

          <button
            disabled={selectedRows.length === 0}
            onClick={() => setShowApproveModal(true)}
            className="
            h-10
            px-4
            rounded-xl
            bg-green-600
            text-white
            text-sm
            font-semibold
            2xl:text-base
            hover:bg-green-700
            disabled:opacity-50
            transition-colors
            cursor-pointer
          "
          >
            Approve Selected
          </button>

          <button
            disabled={selectedRows.length === 0}
            onClick={() => setShowRejectModal(true)}
            className="
            h-10
            px-4
            rounded-xl
            bg-red-600
            text-white
            text-sm
            2xl:text-base
            font-semibold
            hover:bg-red-700
            disabled:opacity-50
            transition-colors
            cursor-pointer
          "
          >
            Reject Selected
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-[#CDD7E3] bg-blue-100">
              {/* Checkbox */}

              <th className="w-[60px] px-4 py-4 text-center">
                <input
                  type="checkbox"
                  className="h-3 w-3 cursor-pointer"
                  checked={
                    allLogs.filter((log) => log.status === "PENDING")
                      .length > 0 &&
                    allLogs
                      .filter((log) => log.status === "PENDING")
                      .every((log) => selectedRows.includes(log.id))
                  }
                  onChange={handleSelectAll}
                />
              </th>

              {/* Sr No */}

              <th className="w-[80px] px-2 py-4 text-left text-base font-semibold text-slate-700 2xl:text-base">
                Sr. No.
              </th>

              {/* Request Type */}

              <th className="w-[170px] px-4 py-4 text-left text-base font-semibold text-slate-700 whitespace-nowrap 2xl:text-base">
                Request Type
              </th>

              {/* Requested By */}

              <th className="px-4 py-4 text-left text-base font-semibold text-slate-700 whitespace-nowrap 2xl:text-base">
                Requested By
              </th>

              {/* Resource */}

              <th className="px-4 py-4 text-left text-base font-semibold text-slate-700 whitespace-nowrap 2xl:text-base">
                Resource
              </th>

              {/* Requested Date */}

              <th className="px-4 py-4 text-left text-base font-semibold text-slate-700 whitespace-nowrap 2xl:text-base">
                Requested Date
              </th>

              {/* Status */}

              <th className="px-4 py-4 text-left text-base font-semibold text-slate-700 whitespace-nowrap 2xl:text-base">
                Status
              </th>

              {/* Actions */}

              <th className="px-4 py-4 text-center text-base font-semibold text-slate-700 whitespace-nowrap 2xl:text-base">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="
          py-14
          text-center
          text-slate-500
          text-sm
          2xl:text-base
        "
                >
                  No requests found
                </td>
              </tr>
            ) : (
              logs.map((log, index) => {
                const srNo = (currentPage - 1) * RECORDS_PER_PAGE + index + 1

                return (
                  <tr
                    key={log.id || srNo}
                    className="
            border-b
            border-[#CDD7E3]
          "
                  >
                    {/* Checkbox */}

                    <td className="px-4 py-2 text-center">
                      {log.status === "PENDING" && (
                        <input
                          type="checkbox"
                          className="h-3 w-3 cursor-pointer"
                          checked={selectedRows.includes(log.id)}
                          onChange={() => handleRowSelect(log.id)}
                        />
                      )}
                    </td>

                    {/* Sr No */}

                    <td className="px-4 py-2">
                      <span className="text-slate-700 text-sm xl:text-base font-medium 2xl:text-base">
                        {srNo}
                      </span>
                    </td>

                    {/* Request Type */}

                    <td className="px-4 py-2">
                      <span
                        className={`
                inline-flex
                items-center
                px-3
                py-1.5
                rounded-full
                text-sm
                2xl:text-base
                font-semibold
                whitespace-nowrap
                ${getRequestTypeStyle(log.requestSource)}
              `}
                      >
                        {formatAction(log.requestSource)}
                      </span>
                    </td>

                    {/* Requested By */}

                    <td className="px-4 py-2">
                      <span
                        className="
                block
                truncate
                text-slate-700
                text-sm
                2xl:text-base
                xl:text-base
              "
                        title={log.requestedBy}
                      >
                        {formatAction(log.requestedBy)}
                      </span>
                    </td>

                    {/* Resource */}

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
                        title={log.newActivityName}
                      >
                        {log.newActivityName}
                      </span>
                    </td>

                    {/* Requested Date */}

                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className="text-slate-700 text-sm xl:text-base 2xl:text-base">
                        {new Date(log.requestedAt)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")}
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-4 py-2">
                      <span
                        className={`
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                text-xs
                2xl:text-sm
                font-semibold
                whitespace-nowrap
                ${getStatusStyle(log.status)}
              `}
                      >
                        ● {formatAction(log.status)}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => onView(log)}
                          title="View Request"
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
                          <Eye size={20} />
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        recordsPerPage={10}
        label="Auths"
        onPageChange={onPageChange}
      />

      {showApproveModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px]">
            <h2 className="text-lg font-semibold mb-2">Approve Requests</h2>

            <p className="text-slate-600">
              Are you sure you want to approve <b>{selectedRows.length}</b>{" "}
              request(s)?
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
      )}

      {showRejectModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[500px]">
            <h2 className="text-lg font-semibold mb-4">Reject Requests</h2>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
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
      )}

      {showRejectConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[450px]">
            <h2 className="text-lg font-semibold text-red-600">
              Confirm Rejection
            </h2>

            <p className="mt-3 text-slate-600">
              Are you sure you want to reject <b>{selectedRows.length}</b>{" "}
              request(s)?
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
      )}
    </div>
  );
}
