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
}) {
  if (!request) return null;

  const [projectName, setProjectName] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    const fetchProjectName = async () => {
      try {
        if (!request?.projectId) return;

        const response = await getProjectNames([request.projectId]);

        console.log(response);

        if (response?.statusType === "S") {
          const projectMap = response.details;
          console.log(projectMap);
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
        rounded-[24px]
        xl:rounded-[32px]
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

          px-5
          md:px-8
          xl:px-12

          pt-8
          xl:pt-6

          text-center

          border-b
          border-slate-100
          "
        >
          <button
            onClick={onClose}
            className="
            absolute
            top-5
            right-5

            h-10
            w-10

            rounded-xl

            hover:bg-slate-100

            flex
            items-center
            justify-center

            transition
            cursor-pointer
            "
          >
            <X size={24} />
          </button>

          <div
            className="
            2xl:h-20
            2xl:w-20

            xl:h-14
            xl:w-14

            mx-auto

            rounded-full

            bg-blue-50

            flex
            items-center
            justify-center
            "
          >
            <ShieldCheck size={36} className="text-blue-600" />
          </div>

          <h2
            className="
            mt-1

            text-xl
            sm:text-2xl
            xl:text-[34px]

            font-bold

            text-[#142850]
            "
          >
            Activity Approval Request
          </h2>

          <p
            className="
            mt-1
            mb-3

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
              bg-slate-50

              border
              border-slate-200

              rounded-2xl

              p-5
              xl:p-4
              "
            >
              <div
                className="
                grid

                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4

                gap-5
                "
              >
                <div>
                  <p
                    className="
                    text-slate-500
                    text-sm
                    "
                  >
                    Project
                  </p>

                  <p
                    className="
                    font-semibold

                    break-all

                    text-sm
                    xl:text-base
                    "
                  >
                    {projectName}
                  </p>
                </div>

                <div>
                  <p
                    className="
                    text-slate-500
                    text-sm
                    "
                  >
                    Activity
                  </p>

                  <p
                    className="
                    font-semibold
                    break-words
                    "
                  >
                    {request.activityName}
                  </p>
                </div>

                <div>
                  <p
                    className="
                    text-slate-500
                    text-sm
                    "
                  >
                    Requested By
                  </p>

                  <p className="font-semibold">{request.requestedBy}</p>
                </div>

                <div>
                  <p
                    className="
                    text-slate-500
                    text-sm
                    "
                  >
                    Requested At
                  </p>

                  <p className="font-semibold">
                    {formatDate(request.requestedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

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
                  h-12
                  w-12

                  rounded-full

                  bg-blue-50

                  flex
                  items-center
                  justify-center
                  "
                >
                  <FileText size={18} className="text-blue-600" />
                </div>

                <h3
                  className="
                  text-xl
                  xl:text-lg

                  font-bold

                  text-[#142850]
                  "
                >
                  Changes Summary
                </h3>
              </div>

              <span
                className="
                px-4
                py-2

                rounded-xl

                bg-blue-50
                text-blue-600

                text-sm
                font-semibold
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
            pb-8
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
                  h-16
                  w-16

                  mx-auto

                  rounded-2xl

                  bg-blue-50

                  flex
                  items-center
                  justify-center
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
                border-slate-200

                rounded-2xl

                overflow-hidden
                "
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr
                        className="
                        bg-slate-50
                        "
                      >
                        <th
                          className="
                          px-5
                          xl:py-2
                          2xl:py-5
                          text-left
                          font-semibold
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
                          "
                        >
                          New Value
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {changes.map((field) => (
                        <tr
                          key={field}
                          className="
                            border-t
                            border-slate-200
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
                                                            text-red-600

                                                            break-words
                                                            "
                          >
                            {formatValue(oldActivity[field])}
                          </td>

                          <td
                            className="
                                                            px-5
                                                            py-2
                                                            2xl:py-5
                                                            text-green-600

                                                            break-words
                                                            "
                          >
                            {formatValue(newActivity[field])}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
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

                    py-5
                    "
        >
          <div
            className="
                        flex

                        flex-col
                        md:flex-row

                        justify-center

                        gap-4
                        "
          >
            <button
              onClick={() => onApprove?.(request.id)}
              className="
                            w-full
                            md:w-auto

                            h-12
                            xl:h-11

                            px-8

                            rounded-xl

                            bg-green-600
                            hover:bg-green-700

                            text-white
                            font-semibold

                            flex
                            items-center
                            justify-center
                            gap-2

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
                            w-full
                            md:w-auto

                            h-12
                            xl:h-11

                            px-8

                            rounded-xl

                            bg-red-500
                            hover:bg-red-600

                            text-white
                            font-semibold

                            flex
                            items-center
                            justify-center
                            gap-2

                            transition
                            cursor-pointer
                            "
            >
              <XCircle size={20} />
              Reject Request
            </button>

            <button
              onClick={onClose}
              className="
                            w-full
                            md:w-auto

                            h-12
                            xl:h-11

                            px-8

                            rounded-xl

                            border
                            border-slate-300

                            font-semibold

                            flex
                            items-center
                            justify-center
                            gap-2
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

                        text-slate-500
                        "
          >
            All authorization actions are logged and audited for security
            compliance.
          </div>
        </div>
      </div>

      {showRejectModal && (
        <div
          className="
                    fixed
                    inset-0
                    bg-black/40
                    flex
                    items-center
                    justify-center
                    z-[10000]
                    "
        >
          <div
            className="
                        bg-white
                        rounded-2xl
                        p-6
                        w-full
                        max-w-md
                        shadow-xl
                        "
          >
            <h3
              className="
                            text-lg
                            font-semibold
                            mb-4
                            "
            >
              Reject Request
            </h3>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="
                            w-full
                            border
                            border-slate-100
                            rounded-xl
                            p-3
                            resize-none
                            outline-none
                            focus:ring-2
                            focus:ring-red-300
                            "
            />

            <div
              className="
                            flex
                            justify-end
                            gap-3
                            mt-4
                            "
            >
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                }}
                className="
                                    px-4
                                    py-2
                                    border
                                    rounded-lg
                                    cursor-pointer
                                "
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!rejectReason.trim()) {
                    toast.error("Please enter rejection reason");
                    return;
                  }

                  onReject?.(request.id, rejectReason);

                  setShowRejectModal(false);
                  setRejectReason("");
                }}
                className="
                                    px-4
                                    py-2
                                    bg-red-600
                                    text-white
                                    rounded-lg
                                    cursor-pointer
                                "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
