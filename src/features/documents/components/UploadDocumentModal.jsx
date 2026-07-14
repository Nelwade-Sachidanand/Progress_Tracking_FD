import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { uploadDocument } from "../services/documentService";

export default function UploadDocumentModal({
  isOpen,
  document,
  onClose,
  onSuccess,
}) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!isOpen) setSelectedFile(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/png",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type!");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be <= 10MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const payload = {
      projectId:
        document.projectId || sessionStorage.getItem("selectedProjectId"),
      projectName: document.projectName,
      bankName: document.bankName,
      phaseName: document.phase,
      milestoneName: document.milestone,
      taskName: document.task,
      subTaskName: document.subTask,
      activityName: document.activity,
    };

    try {
      const response = await uploadDocument(selectedFile, payload);

      if (response.statusType === "S") {
        toast.success("Document uploaded successfully");
        setSelectedFile(null);
        onClose();
        await onSuccess?.();
      } else {
        toast.error(response.statusDesc || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload document");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-[#0B1F59]">
              Upload Document
            </h2>
            <p className="text-sm text-slate-500">
              {document?.activity}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200 cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">

          {/* DROP AREA */}
          <div
            onClick={() => inputRef.current?.click()}
            className="
              border-2 border-dashed border-blue-300
              rounded-xl
              p-10
              flex flex-col items-center justify-center
              cursor-pointer
              hover:bg-blue-50
              transition
              text-center
            "
          >
            <Upload size={45} className="text-blue-500" />

            <p className="mt-3 font-semibold text-gray-700">
              Drag & Drop or Click to Upload
            </p>

            <p className="text-xs text-gray-400">
              PDF, Excel, Word, Images (max 10MB)
            </p>

            <input
              ref={inputRef}
              type="file"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>

          {/* FILE PREVIEW */}
          {selectedFile && (
            <div className="mt-5 p-4 border rounded-xl bg-gray-50 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                onClick={() => setSelectedFile(null)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <X />
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-slate-50">

          <button
            onClick={() => {
              setSelectedFile(null);
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>

          <button
            disabled={!selectedFile}
            onClick={handleUpload}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 cursor-pointer"
          >
            Upload
          </button>

        </div>

      </div>
    </div>
  );
}