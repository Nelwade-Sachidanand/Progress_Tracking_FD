import {
  X,
  Download,
  ExternalLink,
  FileText,
  Image,
} from "lucide-react";

export default function PreviewDocumentModal({
  isOpen,
  document,
  onClose,
}) {
  if (!isOpen || !document) return null;

  const fileUrl = document.fileUrl;
  const fileName = document.fileName || "Document";

  const extension = fileName
    ?.split(".")
    ?.pop()
    ?.toLowerCase();

  const isImage = ["png", "jpg", "jpeg"].includes(extension);

  const isPdf = extension === "pdf";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>

            <h2 className="text-xl font-bold text-[#0B1F59]">
              Preview Document
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {fileName}
            </p>

          </div>

          <div className="flex items-center gap-2">

            {fileUrl && (

              <>

                <button
                  onClick={() =>
                    window.open(fileUrl, "_blank")
                  }
                  className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center"
                  title="Open"
                >
                  <ExternalLink size={18} />
                </button>

                <button
                  onClick={() =>
                    window.open(fileUrl)
                  }
                  className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center"
                  title="Download"
                >
                  <Download size={18} />
                </button>

              </>

            )}

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center"
            >
              <X size={18} />
            </button>

          </div>

        </div>

        {/* Preview */}

        <div className="flex-1 bg-slate-100 overflow-auto">

          {!fileUrl ? (

            <div className="h-full flex flex-col items-center justify-center">

              <FileText
                size={70}
                className="text-slate-400"
              />

              <h3 className="mt-5 text-lg font-semibold">

                No Document Uploaded

              </h3>

              <p className="text-slate-500 mt-2">

                Upload a document to preview it.

              </p>

            </div>

          ) : isImage ? (

            <div className="h-full flex items-center justify-center p-6">

              <img
                src={fileUrl}
                alt={fileName}
                className="max-h-full rounded-xl shadow-lg"
              />

            </div>

          ) : isPdf ? (

            <iframe
              src={fileUrl}
              title="PDF Preview"
              className="w-full h-full"
            />

          ) : (

            <div className="h-full flex flex-col items-center justify-center">

              <Image
                size={70}
                className="text-slate-400"
              />

              <h3 className="mt-5 text-lg font-semibold">

                Preview Not Available

              </h3>

              <p className="text-slate-500 mt-2">

                Click Download or Open to view this document.

              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}