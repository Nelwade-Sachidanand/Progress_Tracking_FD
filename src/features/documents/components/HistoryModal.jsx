import {
  X,
  History,
  FileText,
  Download,
  Eye,
} from "lucide-react";

export default function HistoryModal({
  isOpen,
  document,
  onClose,
}) {
  if (!isOpen || !document) return null;

  const history =
    document.history || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5 border-b">

          <div>

            <h2 className="text-xl font-bold text-[#0B1F59]">
              Version History
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {document.activity}
            </p>

          </div>

          <button
            onClick={onClose}
            className="
            w-10
            h-10
            rounded-lg
            hover:bg-slate-100
            flex
            items-center
            justify-center
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* Body */}

        <div className="max-h-[500px] overflow-y-auto">

          {history.length === 0 ? (

            <div className="py-16 flex flex-col items-center">

              <History
                size={60}
                className="text-slate-300"
              />

              <h3 className="mt-5 text-lg font-semibold text-[#0B1F59]">
                No Version History
              </h3>

              <p className="text-slate-500 mt-2">
                This document has not been uploaded yet.
              </p>

            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-slate-50 border-b">

                <tr>

                  <th className="px-5 py-4 text-left">
                    Version
                  </th>

                  <th className="px-5 py-4 text-left">
                    File Name
                  </th>

                  <th className="px-5 py-4 text-left">
                    Uploaded By
                  </th>

                  <th className="px-5 py-4 text-left whitespace-nowrap">
                    Uploaded Date
                  </th>

                  <th className="px-5 py-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {history.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="px-5 py-4 font-semibold text-[#2563EB]">
                      v{item.version}
                    </td>

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <FileText
                          size={18}
                          className="text-red-500"
                        />

                        {item.fileName}

                      </div>

                    </td>

                    <td className="px-5 py-4">
                      {item.uploadedBy}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {item.uploadedDate}
                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            window.open(
                              item.fileUrl,
                              "_blank"
                            )
                          }
                          className="
                          w-9
                          h-9
                          rounded-lg
                          bg-[#EEF2FF]
                          text-[#2563EB]
                          hover:bg-[#DBEAFE]
                          flex
                          items-center
                          justify-center
                          "
                          title="View"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() =>
                            window.open(
                              item.fileUrl
                            )
                          }
                          className="
                          w-9
                          h-9
                          rounded-lg
                          bg-[#ECFDF5]
                          text-green-600
                          hover:bg-[#D1FAE5]
                          flex
                          items-center
                          justify-center
                          "
                          title="Download"
                        >
                          <Download size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end">

          <button
            onClick={onClose}
            className="
            px-6
            py-2.5
            rounded-xl
            bg-[#2563EB]
            text-white
            hover:bg-[#1D4ED8]
            "
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}