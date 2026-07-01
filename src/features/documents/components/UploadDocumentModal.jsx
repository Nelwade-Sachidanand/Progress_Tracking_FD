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
    if (!isOpen) {
      setSelectedFile(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ✅ FILE VALIDATION
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

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File must be <= 10MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    // // console.log("🔥 Upload Started");

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

    // console.log("📦 Payload:", payload);

    try {
      const response = await uploadDocument(selectedFile, payload);

      if (response.statusType === "S") {
        toast.success("Document uploaded successfully 🎉");

        setSelectedFile(null);
        onClose();
        await onSuccess?.();
      } else {
        toast.error(response.statusDesc || "Upload failed");
      }
    } catch (err) {
      console.error("❌ Upload failed:", err);
      toast.error(err?.response?.data?.statusDesc || "Failed to create user");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
        {/* HEADER */}
        <div className="flex justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#0B1F59]">
              Upload Document
            </h2>
            <p className="text-sm text-slate-500">{document?.activity}</p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* UPLOAD AREA */}
        <div className="p-6">
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed p-10 text-center cursor-pointer"
          >
            <Upload size={40} />
            <p>Drag & Drop or Click</p>

            <input
              ref={inputRef}
              type="file"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>

          {/* FILE PREVIEW */}
          {selectedFile && (
            <div className="mt-4 border p-3 rounded">
              <p>{selectedFile.name}</p>

              <button
                onClick={handleUpload}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
