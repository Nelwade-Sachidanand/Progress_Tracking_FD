import { X, Download } from "lucide-react";
import { documentApi } from "../api/documentApi";
export default function PreviewDocumentModal({
  isOpen,
  document,
  onClose,
}){
if (!isOpen || !document) return null;


const handleDownload = async (id) => {
  try {
    const res = await documentApi.downloadDocument(id);

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const link = window.document.createElement("a");
    link.href = url;
    link.setAttribute("download", "document");

    window.document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed", error);
  }
};
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3 sm:p-4">

      <div className="
        bg-white
        rounded-2xl
        shadow-xl
        w-full
        max-w-4xl
        overflow-hidden
        border
        border-slate-200
      ">

        {/* Header */}
        <div className="
          flex
          items-start
          sm:items-center
          justify-between
          px-4
          sm:px-6
          py-4
          border-b
          bg-slate-50
        ">

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0B1F59]">
              Document Details
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {document.activity}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-9 h-9
              rounded-lg
              hover:bg-slate-200
              flex
              items-center
              justify-center
              transition
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-blue-50 border-b border-blue-100">
              <tr>
                <th className="px-4 sm:px-5 py-3 text-left text-sm font-semibold text-blue-700">
                  File Name
                </th>
                <th className="px-4 sm:px-5 py-3 text-left text-sm font-semibold text-blue-700">
                  Uploaded By
                </th>
                <th className="px-4 sm:px-5 py-3 text-left text-sm font-semibold text-blue-700">
                  Upload Date
                </th>
                <th className="px-4 sm:px-5 py-3 text-center text-sm font-semibold text-blue-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="
                border-b
                hover:bg-slate-50
                transition
              ">

                {/* File Name */}
                <td className="px-4 sm:px-5 py-4 font-medium text-slate-800 break-all">
                  {document.fileName}
                </td>

                {/* Uploaded By */}
                <td className="px-4 sm:px-5 py-4 text-slate-600">
                  {document.uploadedBy || "-"}
                </td>

                {/* Upload Date */}
                <td className="px-4 sm:px-5 py-4 text-slate-600 whitespace-nowrap">
                  {document.uploadedDate || "-"}
                </td>

                {/* Action */}
                <td className="px-4 sm:px-5 py-4 text-center">
                  <button
                    // onClick={() =>
                    //   window.open(document.fileUrl, "_blank")
                    // }
onClick={() => {
  console.log("DOC:", document);
  console.log("ID:", document?.id);

  if (!document?.id) {
    alert("Document ID is missing!");
    return;
  }

  handleDownload(document.id);
}}
                    disabled={!document.fileUrl}
                    className="
                      w-9 h-9
                      rounded-lg
                      bg-blue-50
                      text-blue-600
                      hover:bg-blue-100
                      flex
                      items-center
                      justify-center
                      mx-auto
                      transition
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
        <div className="
          border-t
          px-4 sm:px-6
          py-4
          flex
          justify-end
          bg-slate-50
        ">

          <button
            onClick={onClose}
            className="
              px-5 py-2
              rounded-lg
              border
              border-slate-300
              bg-white
              hover:bg-slate-100
              text-sm
              font-medium
              transition
            "
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}