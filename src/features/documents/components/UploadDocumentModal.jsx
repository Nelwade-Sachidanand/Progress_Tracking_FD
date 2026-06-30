import { useEffect, useRef, useState } from "react";
import {
  Upload,
  X,
  FileText,
  FileSpreadsheet,
  File,
} from "lucide-react";

export default function UploadDocumentModal({
  isOpen,
  document,
  onClose,
  onUpload,
}) {
  const inputRef = useRef(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFile = (file) => {
    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/png",
      "image/jpeg",
    ];

    if (!allowed.includes(file.type)) {
      alert(
        "Only PDF, Word, Excel and Images are allowed."
      );
      return;
    }

    setSelectedFile(file);
  };

  const getIcon = () => {
    if (!selectedFile)
      return <Upload size={40} />;

    if (selectedFile.type.includes("pdf"))
      return (
        <FileText
          size={40}
          className="text-red-500"
        />
      );

    if (
      selectedFile.type.includes(
        "sheet"
      ) ||
      selectedFile.type.includes(
        "excel"
      )
    )
      return (
        <FileSpreadsheet
          size={40}
          className="text-green-600"
        />
      );

    return (
      <File
        size={40}
        className="text-blue-600"
      />
    );
  };

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/40
      flex
      items-center
      justify-center
      p-4
      "
    >
      <div
        className="
        bg-white
        rounded-2xl
        shadow-xl
        w-full
        max-w-xl
        overflow-hidden
        "
      >
        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between
          border-b
          px-6
          py-5
          "
        >
          <div>

            <h2
              className="
              text-xl
              font-bold
              text-[#0B1F59]
              "
            >
              Upload Document
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {document?.activity}
            </p>

          </div>

          <button
            onClick={onClose}
            className="
            w-9
            h-9
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

        <div className="p-6">

          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();

              if (e.dataTransfer.files.length > 0) {
                handleFile(e.dataTransfer.files[0]);
              }
            }}
            className="
            border-2
            border-dashed
            border-slate-300
            rounded-2xl
            p-10
            flex
            flex-col
            items-center
            justify-center
            text-center
            cursor-pointer
            hover:border-[#2563EB]
            hover:bg-slate-50
            transition
            "
          >

            <div className="mb-4">

              {getIcon()}

            </div>

            <h3
              className="
              text-lg
              font-semibold
              text-[#0B1F59]
              "
            >
              Drag & Drop your file here
            </h3>

            <p
              className="
              text-sm
              text-slate-500
              mt-2
              "
            >
              or click to browse your computer
            </p>

            <button
              type="button"
              className="
              mt-5
              px-5
              py-2.5
              rounded-xl
              bg-[#2563EB]
              text-white
              font-medium
              hover:bg-[#1D4ED8]
              "
            >
              Browse File
            </button>

            <input
              ref={inputRef}
              type="file"
              hidden
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              onChange={(e) =>
                handleFile(
                  e.target.files[0]
                )
              }
            />

          </div>

          {/* Selected File */}

          {selectedFile && (

            <div
              className="
              mt-6
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-4
              "
            >

              <div
                className="
                flex
                items-center
                justify-between
                gap-4
                "
              >

                <div
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >

                  {getIcon()}

                  <div>

                    <h4
                      className="
                      font-semibold
                      text-[#0B1F59]
                      break-all
                      "
                    >
                      {selectedFile.name}
                    </h4>

                    <p
                      className="
                      text-sm
                      text-slate-500
                      mt-1
                      "
                    >
                      {(
                        selectedFile.size /
                        1024 /
                        1024
                      ).toFixed(2)}
                      {" "}
                      MB
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedFile(null)
                  }
                  className="
                  text-red-500
                  hover:text-red-700
                  "
                >
                  <X size={20} />
                </button>

              </div>

            </div>

          )}
                  {/* Footer */}

        <div
          className="
          mt-6
          flex
          flex-col-reverse
          sm:flex-row
          justify-end
          gap-3
          border-t
          pt-6
          "
        >
          <button
            onClick={() => {
              setSelectedFile(null);
              onClose();
            }}
            className="
            px-6
            py-2.5
            rounded-xl
            border
            border-slate-300
            hover:bg-slate-100
            transition
            "
          >
            Cancel
          </button>

          <button
            disabled={!selectedFile}
            onClick={() => {
              onUpload(selectedFile);
              setSelectedFile(null);
            }}
            className="
            px-6
            py-2.5
            rounded-xl
            bg-[#2563EB]
            text-white
            font-medium
            hover:bg-[#1D4ED8]
            disabled:bg-slate-300
            disabled:cursor-not-allowed
            transition
            flex
            items-center
            justify-center
            gap-2
            "
          >
            <Upload size={18} />

            Upload Document
          </button>
        </div>

      </div>

    </div>
    </div>
  );
}