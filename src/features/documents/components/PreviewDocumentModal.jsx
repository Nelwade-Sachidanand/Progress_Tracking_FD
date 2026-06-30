import { X, Download } from "lucide-react";

export default function PreviewDocumentModal({
  isOpen,
  document,
  onClose,
}) {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">

          <div>
            <h2 className="text-xl font-bold text-[#0B1F59]">
              Document Details
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {document.activity}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center"
          >
            <X size={18} />
          </button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50 border-b">

              <tr>
                <th className="px-5 py-4 text-left">File Name</th>
                <th className="px-5 py-4 text-left">Uploaded By</th>
                <th className="px-5 py-4 text-left">Upload Date</th>
                {/* <th className="px-5 py-4 text-left">Version</th> */}
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>

            </thead>

            <tbody>

              <tr className="border-b hover:bg-slate-50">

                {/* File Name */}
                <td className="px-5 py-4 font-medium text-[#0F172A]">
                  {document.fileName}
                </td>

                {/* Uploaded By */}
                <td className="px-5 py-4">
                  {document.uploadedBy || "-"}
                </td>

                {/* Upload Date */}
                <td className="px-5 py-4">
                  {document.uploadedDate || "-"}
                </td>

                {/* Version */}
                {/* <td className="px-5 py-4">
                  V{document.version || 1}
                </td> */}

                {/* Actions */}
                <td className="px-5 py-4 text-center">

                  <button
                    onClick={() =>
                      window.open(document.fileUrl, "_blank")
                    }
                    disabled={!document.fileUrl}
                    className="
                      w-9 h-9
                      rounded-lg
                      bg-[#ECFDF5]
                      text-green-600
                      hover:bg-[#D1FAE5]
                      flex
                      items-center
                      justify-center
                      mx-auto
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                    "
                    title="Download"
                  >
                    <Download size={17} />
                  </button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end">

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border hover:bg-slate-100"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}