import { Download, X } from "lucide-react";
import { toast } from "react-toastify";
import { downloadDocument } from "../services/documentService";

export default function PreviewDocumentModal({
  isOpen,
  document: selectedDocument,
  onClose,
}) {
  if (!isOpen || !selectedDocument) return null;

  const handleDownload = async (documentId) => {
    try {
      const response = await downloadDocument(documentId);

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const url = window.URL.createObjectURL(blob);

      const link = window.document.createElement("a");

      link.href = url;

      let fileName = "document";

      const disposition = response.headers["content-disposition"];

      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);

        if (match?.[1]) {
          fileName = match[1];
        }
      }

      link.setAttribute("download", fileName);

      window.document.body.appendChild(link);

      link.click();

      window.document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download document");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3 sm:p-4">
      <div
        className="
          bg-white
          rounded-2xl
          shadow-xl
          w-full
          max-w-4xl
          overflow-hidden
          border
          border-slate-200
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-start
            sm:items-center
            justify-between
            px-4
            sm:px-6
            py-4
            border-b
            border-[#CDD7E3]
            bg-slate-50
          "
        >
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0B1F59]">
              Document Details
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {selectedDocument.activity}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-9
              h-9
              rounded-lg
              hover:bg-slate-100
              hover:text-red-600
              flex
              items-center
              justify-center
              cursor-pointer
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-[#CDD7E3] bg-blue-100">
                <th className="w-[40%] px-4 py-4 text-left text-base font-semibold text-slate-600">
                  File Name
                </th>

                <th className="w-[20%] px-4 py-4 text-left text-base font-semibold text-slate-600">
                  Uploaded By
                </th>

                <th className="w-[25%] px-4 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
                  Upload Date
                </th>

                <th className="w-[15%] px-4 py-4 text-center text-base font-semibold text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-[#CDD7E3]">
                <td className="px-4 py-3">
                  <span
                    className="block truncate text-sm font-medium text-slate-700"
                    title={selectedDocument.fileName}
                  >
                    {selectedDocument.fileName}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className="block truncate text-sm text-slate-700"
                    title={selectedDocument.uploadedBy}
                  >
                    {selectedDocument.uploadedBy || "-"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className="whitespace-nowrap text-sm text-slate-700">
                    {selectedDocument.uploadedDate || "-"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleDownload(selectedDocument.documentId)}
                      disabled={!selectedDocument.documentId}
                      title="Download"
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
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                      cursor-pointer
                    "
                    >
                      <Download size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="
              h-10
              rounded-lg
              border
              border-slate-300
              bg-white
              px-5
              text-sm
              font-medium
              text-slate-700
              transition-all
              duration-200
              hover:bg-slate-100
              cursor-pointer
              hover:text-red-700
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
