import {
  ArrowLeft,
  Check,
  FileText,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { getProjectNames } from "../services/authService";
import RejectRequestModal from "./RejectRequestModal";
import RollbackRequestModal from "./RollbackRequestModal";

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function AuthorizationRequestModal({
  request,
  onClose,
  onApprove,
  onReject,
  onRollback,
}) {
  if (!request) return null;

  const [projectName, setProjectName] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rollbackReason, setRollbackReason] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showRollbackModal, setShowRollbackModal] = useState(false);
  const [showRollbackReason, setShowRollbackReason] = useState(false);
  const [showChangeReason, setShowChangeReason] = useState(false);
  const [showRejectionReason, setShowRejectionReason] = useState(false);
  const [showAllChanges, setShowAllChanges] = useState(false);

  useEffect(() => {
    const fetchProjectName = async () => {
      try {
        if (!request?.projectId) return;

        const response = await getProjectNames([request.projectId]);

        console.log(response);

        if (response?.statusType === "S") {
          const projectMap = response.details;
          // console.log(projectMap);
          setProjectName(projectMap[request.projectId]);
        }
      } catch (error) {
        console.error("Failed to fetch project name", error);
      }
    };

    fetchProjectName();
  }, [request]);

  const oldActivity = request.oldActivity || {};

  const newActivity = request.newActivity || {};

  const changes = Object.keys(newActivity).filter(
    (key) =>
      JSON.stringify(oldActivity[key]) !== JSON.stringify(newActivity[key]),
  );

  const visibleChanges = showAllChanges
    ? changes
    : changes.slice(0, 4);

  const formatValue = (value) => {
    if (value === null || value === undefined) return "null";

    if (typeof value === "object") return JSON.stringify(value, null, 2);

    return String(value);
  };

  return (
    <div
      className="
      fixed
      inset-0
      z-[9999]
      bg-black/40
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-3
      sm:p-4
      xl:p-6
      "
    >
      <div
        className="
        bg-white
        rounded-2xl
        xl:rounded-3xl
        shadow-2xl
        w-full
        max-w-[95vw]
        xl:max-w-[1050px]
        2xl:max-w-[1200px]
        xl:max-h-[80vh]
        flex
        flex-col

        overflow-hidden
        "
      >
        {/* Header */}

        <div
          className="
          relative

          rounded-t-2xl

          border-b
          border-[#CDD7E3]

          bg-gradient-to-r
          from-[#F8FBFF]
          to-[#FFFFFF]

          px-6
          py-3
          sm:px-8
          xl:px-10
        "
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="
            absolute
            right-5
            top-5

            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            border
            border-[#CDD7E3]

            bg-white

            text-slate-600

            transition-all
            duration-200

            hover:bg-slate-100
            hover:text-[#2563EB]
hover:text-red-500 transition
            cursor-pointer
          "
          >
            <X size={20} />
          </button>

          {/* Icon */}
          <div
            className="
            mx-auto

            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            border
            border-[#DBEAFE]

            bg-blue-50
          "
          >
            <ShieldCheck
              size={25}
              className="text-[#2563EB]"
            />
          </div>

          {/* Title */}
          <h2
            className="

            text-center

            text-xl
            sm:text-2xl
            xl:text-[28px]

            font-bold

            text-[#0B1F59]
          "
          >
            Activity Approval Request
          </h2>

          {/* Subtitle */}
          <p
            className="
            mt-1

            text-center

            text-sm
            xl:text-base

            text-slate-500
          "
          >
            Review the requested modifications before taking action
          </p>
        </div>

        {/* Scrollable Body */}

        <div
          className="
          flex-1
          overflow-y-auto
          custom-scrollbar
          "
        >
          {/* Request Details */}

          <div
            className="
            px-5
            md:px-8
            xl:px-12

            mt-3
            xl:mt-3
            "
          >
            <div
              className="
              rounded-2xl
              border
              border-[#CDD7E3]
              bg-white
              p-5
              shadow-sm
            "
            >
              <div
                className={`
                grid
                grid-cols-1
                sm:grid-cols-2
                ${request.status === "PENDING"
                    ? "xl:grid-cols-[180px_360px_180px_200px]"
                    : "xl:grid-cols-[220px_360px_220px]"
                  }
                gap-2
                mt-[-10px]
                mb-[-10px]
              `}
              >
                {/* Project */}
                <div className="min-w-0">
                  <p className="text-sm text-slate-600">Project</p>

                  <p
                    className="truncate text-sm xl:text-base font-semibold"
                    title={projectName}
                  >
                    {projectName}
                  </p>
                </div>

                {/* Activity */}
                <div className="min-w-0">
                  <p className="text-sm text-slate-600">Activity</p>

                  <p
                    className="truncate text-sm xl:text-base font-semibold"
                    title={request.newActivityName}
                  >
                    {request.newActivityName}
                  </p>
                </div>

                {/* Requested By */}
                <div className="min-w-0">
                  <p className="text-sm text-slate-600">Requested By</p>

                  <p
                    className="truncate text-sm xl:text-base font-semibold"
                    title={request.requestedBy}
                  >
                    {request.requestedBy}
                  </p>
                </div>

                {/* Requested At */}
                <div className="min-w-0">
                  <p className="text-sm text-slate-600">Requested At</p>

                  <p className="text-sm xl:text-base font-semibold">
                    {formatDate(request.requestedAt)}
                  </p>
                </div>

                {request.status !== "PENDING" &&
                  request.status !== "ROLLED_BACK" && (
                    <>
                      <div>
                        <p className="text-sm text-slate-600">
                          {request.status === "APPROVED"
                            ? "Approved By"
                            : "Rejected By"}
                        </p>

                        <p
                          className={`
                        font-semibold
                        ${request.status === "APPROVED" ? "text-green-700" : "text-red-700"}
                      `}
                        >
                          {request.approvedBy}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-600">
                          {request.status === "APPROVED"
                            ? "Approved At"
                            : "Rejected At"}
                        </p>

                        <p
                          className={`
                        font-semibold
                        ${request.status === "APPROVED" ? "text-green-700" : "text-red-700"}
                      `}
                        >
                          {formatDate(request.approvedAt)}
                        </p>
                      </div>
                    </>
                  )}

                {request.status === "ROLLED_BACK" && (
                  <>
                    <div>
                      <p className="text-sm text-slate-600">Rolled Back By</p>

                      <p className="font-semibold text-amber-700">
                        {request.rolledBackBy}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600">Rolled Back At</p>

                      <p className="font-semibold text-amber-700">
                        {formatDate(request.rolledBackAt)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {request.rollbackReason && (
            <div
              className="
              px-5
              md:px-8
              xl:px-12
              mt-3
            "
            >
              <div
                className="
                rounded-2xl
                border
                border-[#CDD7E3]
                bg-white
                p-4
                xl:p-5
              "
              >
                <div className="flex items-center justify-between">
                  <h4
                    className="
                    text-sm
                    xl:text-base
                    font-semibold
                    text-[#142850]
                  "
                  >
                    Rollback Reason
                  </h4>

                  {request.rollbackReason.length > 120 && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowRollbackReason(!showRollbackReason)
                      }
                      className="
                      text-xs
                      font-medium
                      text-[#2563EB]
                      hover:underline
                      cursor-pointer
                    "
                    >
                      {showRollbackReason ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>

                <p
                  className={`
                  mt-2
                  text-sm
                  xl:text-base
                  leading-relaxed
                  text-amber-700
                  ${showRollbackReason
                      ? "whitespace-pre-wrap break-all"
                      : "truncate"
                    }
                `}
                  title={!showRollbackReason ? request.rollbackReason : ""}
                >
                  {request.rollbackReason}
                </p>
              </div>
            </div>
          )}

          {/* Changes Header */}

          <div
            className="
            px-5
            md:px-8
            xl:px-12

            mt-4
            "
          >
            <div
              className="
              flex
              items-center
              justify-between
              flex-wrap
              gap-2
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-xl

                  border
                  border-[#DBEAFE]

                  bg-blue-50
                "
                >
                  <FileText
                    size={20}
                    className="text-[#2563EB]"
                  />
                </div>

                <h3
                  className="
                  text-xl
                  xl:text-lg

                  font-bold

                  text-[#0B1F59]
                  "
                >
                  Changes Summary
                </h3>
              </div>

              <span
                className="
                rounded-xl
                border
                border-[#DBEAFE]
                bg-blue-50
                px-4
                py-2
                text-sm
                font-semibold
                text-[#2563EB]
              "
              >
                {changes.length} Change(s)
              </span>
            </div>
          </div>

          {/* Changes Table */}

          <div
            className="
            px-5
            md:px-8
            xl:px-12

            mt-3
            pb-5
            "
          >
            {changes.length === 0 ? (
              <div
                className="
                border
                border-slate-200

                rounded-2xl

                p-10
                xl:p-16

                text-center
                "
              >
                <div
                  className="
                  rounded-xl
                  border
                  border-[#DBEAFE]
                  bg-blue-50
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  mx-auto
                "
                >
                  <FileText size={28} className="text-blue-600" />
                </div>

                <h4
                  className="
                  mt-5

                  text-lg
                  font-semibold

                  text-slate-700
                  "
                >
                  No changes have been made
                </h4>

                <p
                  className="
                  mt-2

                  text-slate-500
                  "
                >
                  There are no modifications to display.
                </p>
              </div>
            ) : (
              <div
                className="
                border
                border-[#CDD7E3]

                rounded-2xl

                overflow-hidden
                "
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr
                        className="bg-blue-50 border-b border-[#CDD7E3]"
                      >
                        <th
                          className="
                          px-5
                          xl:py-2
                          2xl:py-5
                          text-left
                          font-semibold
                          text-[#0B1F59]
                          "
                        >
                          Field
                        </th>

                        <th
                          className="
                          px-5
                          py-2
                          2xl:py-5
                          text-left
                          font-semibold
                          text-[#0B1F59]
                          "
                        >
                          Old Value
                        </th>

                        <th
                          className="
                          px-5
                          py-2
                          2xl:py-5
                          text-left
                          font-semibold
                          text-[#0B1F59]
                          "
                        >
                          New Value
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {visibleChanges.map((field) => (
                        <tr
                          key={field}
                          className="
                            border-t
                            border-[#CDD7E3]
                            "
                        >
                          <td
                            className="
                              px-5
                              py-2
                              2xl:py-5
                              font-medium
                              text-slate-700
                              "
                          >
                            {field}
                          </td>

                          <td
                            className="
                            px-5
                            py-2
                            2xl:py-5
                            text-red-700
                            break-words
                            font-semibold
                            "
                          >
                            {formatValue(oldActivity[field])}
                          </td>

                          <td
                            className="
                            px-5
                            py-2
                            2xl:py-5
                            text-green-700
                            break-words
                            font-medium
                            "
                          >
                            {formatValue(newActivity[field])}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {changes.length > 5 && (
                    <div
                      className="
                      flex
                      justify-center
                      border-t
                      border-[#CDD7E3]
                      bg-slate-50
                      py-3
                    "
                    >
                      <button
                        type="button"
                        onClick={() => setShowAllChanges((prev) => !prev)}
                        className="
                        text-sm
                        font-medium
                        text-[#2563EB]
                        hover:underline
                        cursor-pointer
                      "
                      >
                        {showAllChanges
                          ? "Show Less"
                          : `Show ${changes.length - 4} More Change${changes.length - 5 > 1 ? "s" : ""}`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {request.changeReason && (
            <div
              className="
              px-5
              md:px-8
              xl:px-12
            "
            >
              <div
                className="
                rounded-2xl
                border
                border-[#CDD7E3]
                bg-white
                p-4
                xl:p-5
              "
              >
                <div className="flex items-center justify-between">
                  <h4
                    className="
                    text-sm
                    xl:text-base
                    font-semibold
                    text-[#142850]
                  "
                  >
                    Activity Change Reason
                  </h4>

                  {request.changeReason.length > 120 && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowChangeReason(!showChangeReason)
                      }
                      className="
                      text-xs
                      font-medium
                      text-[#2563EB]
                      hover:underline
                      cursor-pointer
                    "
                    >
                      {showChangeReason ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>

                <p
                  className={`
                  mt-2
                  text-sm
                  xl:text-base
                  leading-relaxed
                  text-slate-600
                  ${showChangeReason
                      ? "whitespace-pre-wrap break-all"
                      : "truncate"
                    }
                `}
                  title={!showChangeReason ? request.changeReason : ""}
                >
                  {request.changeReason}
                </p>
              </div>
            </div>
          )}

          {request.rejectionReason && (
            <div
              className="
              px-5
              md:px-8
              xl:px-12
            "
            >
              <div
                className="
                rounded-2xl
                border
                border-[#CDD7E3]
                bg-white
                p-4
                xl:p-5
              "
              >
                <div className="flex items-center justify-between">
                  <h4
                    className="
                    text-sm
                    xl:text-base
                    font-semibold
                    text-red-600
                  "
                  >
                    Rejection Reason
                  </h4>

                  {request.rejectionReason.length > 120 && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowRejectionReason(!showRejectionReason)
                      }
                      className="
                      text-xs
                      font-medium
                      text-[#2563EB]
                      hover:underline
                      cursor-pointer
                    "
                    >
                      {showRejectionReason ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>

                <p
                  className={`
                  mt-2
                  text-sm
                  xl:text-base
                  leading-relaxed
                  text-slate-600
                  ${showRejectionReason
                      ? "whitespace-pre-wrap break-all"
                      : "truncate"
                    }
                `}
                  title={!showRejectionReason ? request.rejectionReason : ""}
                >
                  {request.rejectionReason}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}

        <div
          className="
                    sticky
                    bottom-0

                    bg-white

                    border-t
                    border-slate-200

                    px-5
                    md:px-8
                    xl:px-12

                    py-1
                    "
        >
          <div
            className="
            mt-3
            xl:mt-2
            2xl:mt-4
            flex
            flex-col
            md:flex-row
            justify-center
            gap-4
          "
          >
            {request.status === "PENDING" && (
              <>
                <button
                  onClick={() => onApprove?.(request.id)}
                  className="
                  w-full md:w-auto
                  h-11 xl:h-10
                  px-8
                  rounded-xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-semibold
                  flex items-center justify-center gap-2
                  transition
                  cursor-pointer
                "
                >
                  <Check size={20} />
                  Approve Request
                </button>

                <button
                  onClick={() => setShowRejectModal(true)}
                  className="
                  w-full md:w-auto
                  h-11 xl:h-10
                  px-8
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  font-semibold
                  flex items-center justify-center gap-2
                  transition
                  cursor-pointer
                "
                >
                  <XCircle size={20} />
                  Reject Request
                </button>
              </>
            )}

            {(request.status === "APPROVED" ||
              request.status === "REJECTED") && (
                <button
                  onClick={() => setShowRollbackModal(true)}
                  className="
                w-full md:w-auto
                h-11 xl:h-10
                px-8
                rounded-xl
                bg-orange-500
                hover:bg-orange-600
                text-white
                font-semibold
                flex items-center justify-center gap-2
                transition
                cursor-pointer
              "
                >
                  <ShieldCheck size={18} />
                  Revert Changes
                </button>
              )}

            <button
              onClick={onClose}
              className="
              w-full md:w-auto
              h-11 xl:h-10
              px-8
              rounded-xl
              border border-slate-300
              font-semibold
              flex items-center justify-center gap-2
              cursor-pointer
              "
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>

          <div
            className="
                        mt-5
                        pt-4

                        border-t

                        text-center

                        text-xs
                        xl:text-sm

                        text-slate-600
                        "
          >
            All authorization actions are logged and audited for security
            compliance.
          </div>
        </div>
      </div>

      <RejectRequestModal
        open={showRejectModal}
        reason={rejectReason}
        setReason={setRejectReason}
        onClose={() => {
          setShowRejectModal(false);
          setRejectReason("");
        }}
        onSubmit={() => {
          onReject?.(request.id, rejectReason);

          setShowRejectModal(false);
          setRejectReason("");
        }}
      />

      <RollbackRequestModal
        open={showRollbackModal}
        reason={rollbackReason}
        setReason={setRollbackReason}
        password={adminPassword}
        setPassword={setAdminPassword}
        onClose={() => {
          setShowRollbackModal(false);
          setRollbackReason("");
          setAdminPassword("");
        }}
        onSubmit={async () => {
          const success = await onRollback?.(
            request.id,
            adminPassword,
            rollbackReason
          );

          if (success) {
            setShowRollbackModal(false);
            setRollbackReason("");
            setAdminPassword("");
          }
        }}
      />
    </div>
  );
}
