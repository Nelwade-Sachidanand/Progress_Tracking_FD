import { X, FileText, FileSpreadsheet, FileType, Filter } from "lucide-react";
import { FaFilePdf, FaFileExcel, FaFileWord, FaFileCsv } from "react-icons/fa6";
//import { FaFileCsv } from "react-icons/fa6";
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

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedProject) count++;
    if (selectedPhase && selectedPhase !== "All Phases") count++;
    if (selectedMilestone && selectedMilestone.length > 0) count++;
    if (selectedTask && selectedTask !== "All_Tasks") count++;
    if (selectedSubTask && selectedSubTask !== "All Subtasks") count++;
    if (selectedActivity && selectedActivity !== "All Activities") count++;
    if (selectedStatus) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Get status color classes
  const getStatusColorClasses = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 border-green-200 text-green-700";
      case "Delayed":
        return "bg-red-50 border-red-200 text-red-700";
      case "In Progress":
        return "bg-amber-50 border-amber-200 text-amber-700";
      default:
        return "bg-slate-50 border-slate-200 text-slate-700";
    }
  };

  // Get filter chip color by type
  const getChipColor = (type) => {
    switch (type) {
      case "project":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "phase":
        return "bg-purple-50 border-purple-200 text-purple-700";
      case "milestone":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "task":
        return "bg-orange-50 border-orange-200 text-orange-700";
      case "subtask":
        return "bg-pink-50 border-pink-200 text-pink-700";
      case "activity":
        return "bg-indigo-50 border-indigo-200 text-indigo-700";
      case "status":
        return "bg-slate-50 border-slate-200 text-slate-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#6D4AFF]/10 flex items-center justify-center">
              <FileText size={18} className="text-[#6D4AFF]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0F172A]">Generate Report</h2>
              <p className="text-xs text-slate-500">Export filtered tasks data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg hover:bg-slate-100  flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X size={18} className="text-slate-500 hover:text-red-500 transition" />
          </button>
        </div>



        {/* Body - Scrollable */}
        <div className="px-6 py-5 space-y-5 overflow-y-auto overflow-x-visible flex-1 relative">
          {/* Report Format */}
          {/* Report Format */}
          <div>
            {/* <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                  Report Format
                </label> */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  type: "pdf",
                  label: "PDF",
                  ext: ".pdf",
                  icon: FaFilePdf,
                  color: "text-red-600",
                },
                {
                  type: "excel",
                  label: "Excel",
                  ext: ".xlsx",
                  icon: FaFileExcel,
                  color: "text-green-600",
                },
                {
                  type: "csv",
                  label: "CSV",
                  ext: ".csv",
                  icon: FaFileCsv,
                  color: "text-emerald-600",
                },
                {
                  type: "word",
                  label: "Word",
                  ext: ".docx",
                  icon: FaFileWord,
                  color: "text-blue-600",
                },
              ].map(({ type, label, ext, icon: Icon, color }) => (
                <label
                  key={type}
                  className={`
          
          rounded-xl
          border
          px-3
          py-3
          transition-all
          ${reportType === type
                      ? "border-[#6D4AFF] bg-[#F6F3FF] shadow-md"
                      : "border-slate-200 bg-white hover:border-[#6D4AFF]/50 hover:bg-slate-50"
                    }
        `}
                >
                  <div className="flex items-start justify-between">

                    {/* Left */}
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="reportType"
                        value={type}
                        checked={reportType === type}
                        onChange={(e) => setReportType(e.target.value)}
                        className="mt-1 accent-[#6D4AFF]"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {label}
                        </p>

                        <p className="text-[11px] text-slate-500">
                          {ext}
                        </p>
                      </div>
                    </div>

                    {/* Right Icon */}
                    <div
                      className={`
              w-8
              h-8
              rounded-lg
              flex
              items-center
              justify-center
              ${reportType === type
                          ? "bg-[#6D4AFF]/10"
                          : "bg-slate-100"
                        }
            `}
                    >
                      <Icon
                        size={18}
                        className={
                          reportType === type
                            ? "text-[#6D4AFF]"
                            : color
                        }
                      />
                    </div>

                  </div>
                </label>
              ))}
            </div>
          </div>


          {/* Applied Filters */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-[#0F172A]">
                Applied Filters
              </label>

              {activeFilterCount > 0 && (
                <span className="text-xs font-medium text-[#6D4AFF] bg-[#F5F3FF] px-2.5 py-1 rounded-full">
                  {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} applied
                </span>
              )}
            </div>

            {activeFilterCount > 0 ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 shadow-sm relative overflow-visible">

                {/* Project */}
                {selectedProject && (
<div className="flex items-center px-4 py-1.5 border-b border-slate-100 min-h-[36px]">
                    <span className="w-24 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Project
                    </span>

                    <span className="flex-1 text-sm font-medium text-slate-800 truncate">
                      {selectedProject}
                    </span>
                  </div>
                )}

                {/* Phase */}
                {selectedPhase && selectedPhase !== "All Phases" && (
                  <div className="flex items-center px-4 py-1.5 border-b border-slate-100 min-h-[36px]">
                    <span className="w-24 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Phase
                    </span>

                    <span className="flex-1 text-sm font-medium text-slate-800 truncate">
                      {selectedPhase}
                    </span>
                  </div>
                )}

                {/* Milestone */}
                {selectedMilestone?.length > 0 && (
                  <div className="flex items-center px-4 py-3 border-b border-slate-100 overflow-visible">

                    <span className="w-24 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Milestone
                    </span>

                    <div className="flex items-center gap-2 flex-1 min-w-0">

                      <span className="text-sm font-medium text-slate-800 truncate">
                        {selectedMilestone[0]}
                      </span>

                      {selectedMilestone.length > 1 && (
                        <div className="relative shrink-0">
                          <div className="group inline-block">

                            <span className="cursor-pointer rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold text-violet-700 hover:bg-violet-200">
                              +{selectedMilestone.length - 1} more
                            </span>

                            {/* Keep your tooltip here */}
                            <div
                              className="
    absolute
    right-0
    bottom-full
    mb-3
    hidden
    group-hover:block
    z-9999
  "
                            >
                              <div
                                className="
      relative
      w-[360px]
      rounded-xl
      border
      border-slate-200
      bg-white
      shadow-2xl
      overflow-hidden
    "
                              >
                                {/* Header */}
                                <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                                  <h4 className="text-xs font-semibold text-slate-800">
                                    Selected Milestones
                                  </h4>

                                  <p className="text-[10px] text-slate-500">
                                    {selectedMilestone.length} milestone(s)
                                  </p>
                                </div>

                                {/* Body */}
                                <div className="p-2.5">
                                  <div className="grid grid grid-cols-1 gap-y-1 max-h-28 overflow-y-auto">

                                    {selectedMilestone.map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-2 py-0.5"
                                      >
                                        {/* <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span> */}

                                        <span
                                          className="text-[11px] leading-4 text-slate-700 break-words"
                                          title={item}
                                        >
                                          {item}
                                        </span>
                                      </div>
                                    ))}

                                  </div>
                                </div>

                                {/* Arrow */}
                                <div
                                  className="
        absolute
        right-6
        -bottom-2
        h-4
        w-4
        rotate-45
        border-r
        border-b
        border-slate-200
        bg-white
      "
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* Task */}
                {selectedTask && selectedTask !== "All_Tasks" && (
                <div className="flex items-center px-4 py-1.5 border-b border-slate-100 min-h-[36px]">
                    <span className="w-24 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Task
                    </span>

                    <span className="flex-1 text-sm font-medium text-slate-800 truncate">
                      {selectedTask}
                    </span>
                  </div>
                )}
{/* Sub Task */}
{selectedSubTask && selectedSubTask !== "All Subtasks" && (
 <div className="flex items-center px-4 py-1.5 border-b border-slate-100 min-h-[36px]">
    <span className="w-24 text-xs font-semibold uppercase tracking-wide text-slate-500">
      Sub Task
    </span>

    <span className="flex-1 text-sm font-medium text-slate-800 truncate">
      {selectedSubTask}
    </span>
  </div>
)}
                {/* Activity */}
                {selectedActivity && selectedActivity !== "All Activities" && (
                  <div className="flex items-center px-4 py-1.5 border-b border-slate-100 min-h-[36px]">
                    <span className="w-24 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Activity
                    </span>

                    <span className="flex-1 text-sm font-medium text-slate-800 truncate">
                      {selectedActivity}
                    </span>
                  </div>
                )}

                {/* Status */}
                {selectedStatus && (
                  <div className="flex items-center px-4 py-3">
                    <span className="w-24 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </span>

                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {selectedStatus}
                    </span>
                  </div>
                )}

              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-slate-50 py-6 flex items-center justify-center">
                <span className="text-sm text-slate-400">
                  No filters applied - all tasks will be included
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3 shrink-0 bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onGenerate}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFA] to-[#6D4AFF] text-white text-sm font-medium hover:opacity-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <FileText size={16} />
            Generate Report
          </button>
        </div>
      </div>
    </div>


  );
}
