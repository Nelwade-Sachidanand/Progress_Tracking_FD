import { X, FileText, FileSpreadsheet, FileType } from "lucide-react";

export default function GenerateReportModal({
  isOpen,
  onClose,
  reportType,
  setReportType,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  selectedProject,
  selectedPhase,
  selectedMilestone,
  selectedTask,
  selectedSubTask,
  selectedActivity,
  selectedStatus,
  onGenerate,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden">

        {/* Header */}

        <div className="px-6 py-4 border-b flex items-center justify-between">

          <h2 className="text-xl font-bold text-[#0F172A]">
            Generate Report
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center"
          >
            <X size={18} />
          </button>

        </div>

        <div className="p-6 space-y-6">

          {/* Report Format */}

          <div>

            <label className="block text-sm font-semibold text-[#0F172A] mb-3">
              Report Format
            </label>

            <div className="grid grid-cols-2 gap-3">

              <label className="border rounded-xl p-4 cursor-pointer hover:border-[#6D4AFF] flex gap-3 items-center">

                <input
                  type="radio"
                  checked={reportType === "pdf"}
                  onChange={() =>
                    setReportType("pdf")
                  }
                />

                <FileText
                  size={20}
                  className="text-red-500"
                />

                <span>PDF</span>

              </label>

              <label className="border rounded-xl p-4 cursor-pointer hover:border-[#6D4AFF] flex gap-3 items-center">

                <input
                  type="radio"
                  checked={reportType === "excel"}
                  onChange={() =>
                    setReportType("excel")
                  }
                />

                <FileSpreadsheet
                  size={20}
                  className="text-green-600"
                />

                <span>Excel (.xlsx)</span>

              </label>

              <label className="border rounded-xl p-4 cursor-pointer hover:border-[#6D4AFF] flex gap-3 items-center">

                <input
                  type="radio"
                  checked={reportType === "csv"}
                  onChange={() =>
                    setReportType("csv")
                  }
                />

                <FileSpreadsheet
                  size={20}
                  className="text-blue-600"
                />

                <span>CSV (.csv)</span>

              </label>

              <label className="border rounded-xl p-4 cursor-pointer hover:border-[#6D4AFF] flex gap-3 items-center">

                <input
                  type="radio"
                  checked={reportType === "word"}
                  onChange={() =>
                    setReportType("word")
                  }
                />

                <FileType
                  size={20}
                  className="text-indigo-600"
                />

                <span>Word (.docx)</span>

              </label>

            </div>

          </div>

          {/* Date */}

          <div>

            <label className="block text-sm font-semibold mb-3">
              Date Range (Optional)
            </label>

            <div className="grid grid-cols-2 gap-4">

              <div>

                <label className="text-xs text-slate-500">
                  From Date
                </label>

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) =>
                    setFromDate(
                      e.target.value
                    )
                  }
                  className="w-full mt-1 border rounded-lg p-2.5"
                />

              </div>

              <div>

                <label className="text-xs text-slate-500">
                  To Date
                </label>

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) =>
                    setToDate(
                      e.target.value
                    )
                  }
                  className="w-full mt-1 border rounded-lg p-2.5"
                />

              </div>

            </div>

          </div>

          {/* Current Filters */}

          <div className="border rounded-xl bg-slate-50 p-4">

            <h3 className="font-semibold text-[#0F172A] mb-3">
              Current Filters
            </h3>

            <div className="grid grid-cols-2 gap-y-3 text-sm">

              <div>
                <span className="text-slate-500">
                  Project :
                </span>{" "}
                {selectedProject}
              </div>

              <div>
                <span className="text-slate-500">
                  Status :
                </span>{" "}
                {selectedStatus}
              </div>

              <div>
                <span className="text-slate-500">
                  Phase :
                </span>{" "}
                {selectedPhase}
              </div>

              <div>
                <span className="text-slate-500">
                  Milestone :
                </span>{" "}
                {selectedMilestone}
              </div>

              <div>
                <span className="text-slate-500">
                  Task :
                </span>{" "}
                {selectedTask}
              </div>

              <div>
                <span className="text-slate-500">
                  Sub Task :
                </span>{" "}
                {selectedSubTask}
              </div>

              <div className="col-span-2">
                <span className="text-slate-500">
                  Activity :
                </span>{" "}
                {selectedActivity}
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="px-6 py-4 border-t flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={onGenerate}
            className="px-6 py-2 rounded-lg bg-[#6D4AFF] text-white"
          >
            Generate Report
          </button>

        </div>

      </div>

    </div>
  );
}