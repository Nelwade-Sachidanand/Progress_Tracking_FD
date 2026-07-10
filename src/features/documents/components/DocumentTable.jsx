import { CheckCircle2, Clock3, Eye, Upload } from "lucide-react";

export default function DocumentTable({
  documents,
  onUpload,
  onPreview,
  onHistory,
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Uploaded":
        return (
          <span
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              whitespace-nowrap
              bg-green-100
              text-green-700
            "
          >
            <CheckCircle2 size={14} className="mr-1" />
            Uploaded
          </span>
        );

      default:
        return (
          <span
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              whitespace-nowrap
              bg-orange-100
              text-orange-700
            "
          >
            <Clock3 size={14} className="mr-1" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-[#CDD7E3] bg-white shadow-sm">
      <div className="overflow-x-auto xl:overflow-visible">
        <table className="w-full min-w-[1100px] xl:min-w-full table-fixed">
          <thead>
            <tr className="border-b border-[#CDD7E3] bg-blue-100">
              {/* Sr No */}
              <th className="w-[60px] px-4 py-3 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
                Sr. No.
              </th>

              {/* Activity */}
              <th className="w-[24%] px-4 py-3 text-left text-base font-semibold text-slate-600">
                Activity
              </th>

              {/* File */}
              <th className="w-[22%] px-4 py-3 text-left text-base font-semibold text-slate-600">
                File
              </th>

              {/* Uploaded By */}
              <th className="w-[15%] px-4 py-3 text-left text-base font-semibold text-slate-600">
                Uploaded By
              </th>

              {/* Upload Date */}
              <th className="w-[16%] px-4 py-3 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
                Upload Date
              </th>

              {/* Status */}
              <th className="w-[13%] px-4 py-3 text-center text-base font-semibold text-slate-600">
                Status
              </th>

              {/* Actions */}
              <th className="w-[90px] px-4 py-3 text-center text-base font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {documents.length > 0 ? (
              documents.map((document, index) => {
                const latestDocument =
                  document.documents?.length > 0
                    ? document.documents[document.documents.length - 1]
                    : null;

                return (
                  <tr
                    key={document.id}
                    className="border-b border-[#CDD7E3]"
                  >
                    {/* Sr No */}
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-slate-700">
                        {index + 1}
                      </span>
                    </td>

                    {/* Activity */}
                    <td className="px-4 py-3">
                      <div>
                        <p
                          className="truncate text-sm font-semibold text-slate-700"
                          title={document.activity}
                        >
                          {document.activity}
                        </p>

                        {/* <p
                          className="truncate text-sm text-slate-600"
                          title={`${document.phase} → ${document.milestone}`}
                        >
                          {document.phase} → {document.milestone}
                        </p> */}
                      </div>
                    </td>

                    {/* File */}
                    <td className="px-4 py-3">
                      {latestDocument ? (
                        <p
                          className="truncate text-sm font-medium text-slate-700"
                          title={latestDocument.fileName}
                        >
                          {latestDocument.fileName}
                        </p>
                      ) : (
                        <span className="text-sm text-slate-400">
                          No File
                        </span>
                      )}
                    </td>

                    {/* Uploaded By */}
                    <td className="px-4 py-3">
                      <span
                        className="
                          block
                          truncate
                          text-sm
                          text-slate-700
                        "
                        title={latestDocument?.uploadedBy}
                      >
                        {latestDocument?.uploadedBy || "-"}
                      </span>
                    </td>

                    {/* Upload Date */}
                    <td className="px-4 py-3">
                      <span
                        className="
                          whitespace-nowrap
                          text-sm
                          text-slate-700
                        "
                      >
                        {latestDocument
                          ? new Date(
                            latestDocument.uploadedDate,
                          ).toLocaleString()
                          : "-"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 text-center">
                      {getStatusBadge(
                        latestDocument ? "Uploaded" : "Pending",
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          title="Upload"
                          onClick={() => onUpload(document)}
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-blue-50
                            text-blue-600
                            transition
                            hover:bg-blue-100
                            cursor-pointer
                          "
                        >
                          <Upload size={15} />
                        </button>

                        <button
                          title="Preview"
                          disabled={!latestDocument}
                          onClick={() => onPreview(latestDocument)}
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-green-50
                            text-green-600
                            transition
                            hover:bg-green-100
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            cursor-pointer
                          "
                        >
                          <Eye size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="
                    py-14
                    text-center
                    text-sm
                    text-slate-500
                  "
                >
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}