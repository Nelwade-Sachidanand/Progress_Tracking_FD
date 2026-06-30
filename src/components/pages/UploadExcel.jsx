import { FileSpreadsheet, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useExcel } from "../hooks/useExcel";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { uploadExcel } = useExcel();

  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an Excel file.");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadExcel(file);

      if (response?.statusType === "S") {
        toast.success("Excel uploaded successfully.");

        setFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error(response?.message || "Failed to upload Excel.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const fileName = selectedFile.name.toLowerCase();

    if (!fileName.endsWith(".xlsx") && !fileName.endsWith(".xls")) {
      toast.error("Only Excel files (.xlsx or .xls) are allowed.");
      e.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File size should not exceed 10 MB.");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
        {/* Header */}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Upload Project Excel
          </h2>

          <p className="text-slate-500 mt-1">
            Upload project tracker Excel template (.xlsx or .xls)
          </p>
        </div>

        {/* Upload Area */}

        <label
          htmlFor="excel-upload"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-4
            border-2
            border-dashed
            border-blue-300
            rounded-2xl
            p-10
            cursor-pointer
            bg-blue-50/40
            hover:bg-blue-50
            transition-all
          "
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <UploadCloud size={30} className="text-blue-600" />
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-slate-700">
              Click to Upload Excel File
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Supported formats: XLSX, XLS (Maximum 10 MB)
            </p>
          </div>

          <input
            ref={fileInputRef}
            id="excel-upload"
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Selected File */}

        {file && (
          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              px-4
              py-3
            "
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet size={24} className="text-green-600" />

              <div>
                <p className="font-medium text-slate-700">{file.name}</p>

                <p className="text-xs text-slate-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemoveFile}
              className="
                p-2
                rounded-lg
                hover:bg-red-50
                transition
                cursor-pointer
              "
            >
              <X size={18} className="text-red-500" />
            </button>
          </div>
        )}

        {/* Upload Button */}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-blue-600
              text-white
              font-semibold
              hover:bg-blue-700
              disabled:bg-slate-300
              disabled:cursor-not-allowed
              transition
              cursor-pointer
            "
          >
            <UploadCloud size={18} />

            {loading ? "Uploading..." : "Upload Excel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadExcel;
