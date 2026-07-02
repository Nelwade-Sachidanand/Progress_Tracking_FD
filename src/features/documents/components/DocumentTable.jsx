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
            gap-2
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
            bg-green-100
            text-green-700
            "
          >
            <CheckCircle2 size={14} />
            Uploaded
          </span>
        );

      default:
        return (
          <span
            className="
            inline-flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
            bg-orange-100
            text-orange-700
            "
          >
            <Clock3 size={14} />
            Pending
          </span>
        );
    }
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      shadow-sm
      overflow-hidden
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className="
            bg-slate-50
            border-b
            "
          >
            <tr>
              <th
                className="
                px-5
                py-4
                text-center
                text-base
                font-semibold
                text-[#0B1F59]
                "
              >
                Activity
              </th>

              <th
                className="
                px-5
                py-4
                text-center
                text-base
                font-semibold
                text-[#0B1F59]
                "
              >
                File
              </th>

              <th
                className="
                px-5
                py-4
                text-center
                text-base
                font-semibold
                text-[#0B1F59]
                "
              >
                Uploaded By
              </th>

              <th
                className="
                px-5
                py-4
                text-center
                text-base
                font-semibold
                text-[#0B1F59]
                whitespace-nowrap
                "
              >
                Upload Date
              </th>

              <th
                className="
                px-5
                py-4
                text-center
                text-base
                font-semibold
                text-[#0B1F59]
                "
              >
                Status
              </th>

              <th
                className="
                px-5
                py-4
                text-center
                text-base
                font-semibold
                text-[#0B1F59]
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {documents.map((document) => {
              const latestDocument =
                document.documents?.length > 0
                  ? document.documents[document.documents.length - 1]
                  : null;

              return (
                <tr
                  key={document.id}
                  className="
        border-b
        last:border-0
        hover:bg-slate-50
        transition
      "
                >
                  {/* Activity */}
                  <td className="px-5 py-5">
                    <div>
                      <h3 className="text-base font-semibold text-[#0B1F59]">
                        {document.activity}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {document.phase} → {document.milestone}
                      </p>
                    </div>
                  </td>

                  {/* File */}
                  <td className="px-5 py-5 text-center">
                    {latestDocument ? (
                      <p className="font-medium text-[#0F172A]">
                        {latestDocument.fileName}
                      </p>
                    ) : (
                      <span className="text-slate-400">No File</span>
                    )}
                  </td>

                  {/* Uploaded By */}
                  <td className="px-5 py-5 text-center">
                    {latestDocument?.uploadedBy || "-"}
                  </td>

                  {/* Upload Date */}
                  <td className="px-5 py-5 whitespace-nowrap">
                    {latestDocument
                      ? new Date(latestDocument.uploadedDate).toLocaleString()
                      : "-"}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                    {getStatusBadge(latestDocument ? "Uploaded" : "Pending")}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onUpload(document)}
                        className="w-9 h-9 rounded-lg bg-[#EEF2FF] hover:bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center cursor-pointer"
                      >
                        <Upload size={17} />
                      </button>

                      <button
                        disabled={!latestDocument}
                        onClick={() => onPreview(latestDocument)}
                        className="w-9 h-9 rounded-lg bg-[#ECFDF5] hover:bg-[#D1FAE5] text-green-600 flex items-center justify-center disabled:opacity-40 cursor-pointer"
                      >
                        <Eye size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {documents.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="
                py-12
                text-center
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
