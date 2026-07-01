import {
  Upload,
  Eye,
  Download,
  History,
  CheckCircle2,
  Clock3,
} from "lucide-react";

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
                text-left
                text-sm
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
                text-left
                text-sm
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
                text-left
                text-sm
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
                text-left
                text-sm
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
                text-left
                text-sm
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
                text-sm
                font-semibold
                text-[#0B1F59]
                "
              >
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
                      {documents.map((document) => (

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

                  <h3
                    className="
                    text-[15px]
                    font-semibold
                    text-[#0B1F59]
                    "
                  >
                    {document.activity}
                  </h3>

                  <p
                    className="
                    mt-1
                    text-xs
                    text-slate-500
                    "
                  >
                    {document.phase} →
                    {" "}
                    {document.milestone}
                  </p>

                </div>

              </td>

              {/* File */}

              <td className="px-5 py-5">

                {document.fileName ? (

                  <div>

                    <p
                      className="
                      font-medium
                      text-[#0F172A]
                      "
                    >
                      {document.fileName}
                    </p>

                  </div>

                ) : (

                  <span className="text-slate-400">

                    No File

                  </span>

                )}

              </td>

              {/* Uploaded By */}

              <td className="px-5 py-5">

                {document.uploadedBy || "-"}

              </td>

              {/* Upload Date */}

              <td
                className="
                px-5
                py-5
                whitespace-nowrap
                "
              >

                {document.uploadedDate || "-"}

              </td>

              {/* Status */}

              <td className="px-5 py-5">

                {getStatusBadge(
                  document.uploadStatus
                )}

              </td>

              

              {/* Actions */}

<td className="px-5 py-5">

  <div
    className="
    flex
    items-center
    justify-center
    gap-2
    "
  >

<td className="px-5 py-5">
  <div className="flex items-center justify-center gap-2">

    {/* Upload */}

    <button
      onClick={() => onUpload(document)}
      className="
      w-9
      h-9
      rounded-lg
      bg-[#EEF2FF]
      hover:bg-[#DBEAFE]
      text-[#2563EB]
      flex
      items-center
      justify-center
      transition
      "
      title="Upload Document"
    >
      <Upload size={17} />
    </button>

    {/* View */}

    <button
      disabled={!document.fileUrl}
      onClick={() => onPreview(document)}
      className="
      w-9
      h-9
      rounded-lg
      bg-[#ECFDF5]
      hover:bg-[#D1FAE5]
      text-green-600
      flex
      items-center
      justify-center
      transition
      disabled:opacity-40
      disabled:cursor-not-allowed
      "
      title="View Document"
    >
      <Eye size={17} />
    </button> 

  </div>
</td>

  </div>

</td>

            </tr>

          ))}

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