import { X, FileText, FileSpreadsheet, FileType, Filter } from "lucide-react";

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
        <div className="px-6 py-5 space-y-5 overflow-y-auto flex-1">
          {/* Report Format */}
          {/* Report Format */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-3">
              Report Format
            </label>

            {/* Body - Scrollable */}
            <div className="px-6 py-5 space-y-5 overflow-y-auto flex-1">
              {/* Report Format */}
              {/* Report Format */}
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                  Report Format
                </label>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      type: "pdf",
                      label: "PDF",
                      ext: ".pdf",
                      icon: FileText,
                      color: "text-red-500",
                    },
                    {
                      type: "excel",
                      label: "Excel",
                      ext: ".xlsx",
                      icon: FileSpreadsheet,
                      color: "text-green-600",
                    },
                    {
                      type: "csv",
                      label: "CSV",
                      ext: ".csv",
                      icon: FileSpreadsheet,
                      color: "text-blue-600",
                    },
                    {
                      type: "word",
                      label: "Word",
                      ext: ".docx",
                      icon: FileType,
                      color: "text-indigo-600",
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

              {/* Date Range */}
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                  Date Range
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#6D4AFF] focus:ring-2 focus:ring-[#6D4AFF]/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#6D4AFF] focus:ring-2 focus:ring-[#6D4AFF]/10 outline-none transition-all"
                    />
                  </div>
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

                <div className="bg-[#F8FAFC] rounded-xl border border-slate-200 p-3 min-h-[50px]">
                  {activeFilterCount > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {/* Project */}
                      {selectedProject && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getChipColor("project")}`}>
                          <span className="opacity-60 text-[10px] uppercase tracking-wider">Project:</span>
                          <span className="font-semibold">{selectedProject}</span>
                        </div>
                      )}

                      {/* Phase */}
                      {selectedPhase && selectedPhase !== "All Phases" && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getChipColor("phase")}`}>
                          <span className="opacity-60 text-[10px] uppercase tracking-wider">Phase:</span>
                          <span className="font-semibold">{selectedPhase}</span>
                        </div>
                      )}

                      {/* Milestone - With Tooltip */}
                      {selectedMilestone && selectedMilestone.length > 0 && (
                        <div className="relative group">
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getChipColor("milestone")}`}>
                            <span className="opacity-60 text-[10px] uppercase tracking-wider">Milestone:</span>
                            <span className="font-semibold">
                              {selectedMilestone.length === 1
                                ? selectedMilestone[0]
                                : `${selectedMilestone[0]} +${selectedMilestone.length - 1} more`}
                            </span>
                          </div>
                          {/* Tooltip - Shows all milestone names */}
                          {selectedMilestone.length > 1 && (
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-60">
                              <div
                                className="
                            relative
                            bg-white
                            border
                            border-slate-200
                            rounded-lg
                            shadow-xl
                            p-2.5
                            min-w-[220px]
                            max-w-[280px]
                          "
                              >
                                <p className="text-[11px] font-semibold text-black mb-2">
                                  All Milestones ({selectedMilestone.length})
                                </p>

                                <div className="flex flex-wrap gap-1">
                                  {selectedMilestone.map((item, index) => (
                                    <span
                                      key={index}
                                      className="
                                  px-2
                                  py-0.5
                                  rounded-md
                                  bg-slate-100
                                  border
                                  border-slate-200
                                  text-black
                                  text-[11px]
                                  font-medium
                                "
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>

                                {/* Arrow */}
                                <div
                                  className="
                              absolute
                              left-4
                              -bottom-1.5
                              w-3
                              h-3
                              bg-white
                              border-r
                              border-b
                              border-slate-200
                              rotate-45
                            "
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Task */}
                      {selectedTask && selectedTask !== "All_Tasks" && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getChipColor("task")}`}>
                          <span className="opacity-60 text-[10px] uppercase tracking-wider">Task:</span>
                          <span className="font-semibold">{selectedTask}</span>
                        </div>
                      )}

                      {/* Sub Task */}
                      {selectedSubTask && selectedSubTask !== "All Subtasks" && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getChipColor("subtask")}`}>
                          <span className="opacity-60 text-[10px] uppercase tracking-wider">Sub Task:</span>
                          <span className="font-semibold">{selectedSubTask}</span>
                        </div>
                      )}

                      {/* Activity */}
                      {selectedActivity && selectedActivity !== "All Activities" && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getChipColor("activity")}`}>
                          <span className="opacity-60 text-[10px] uppercase tracking-wider">Activity:</span>
                          <span className="font-semibold">{selectedActivity}</span>
                        </div>
                      )}

                      {/* Status */}
                      {selectedStatus && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusColorClasses(selectedStatus)}`}>
                          <span className="opacity-60 text-[10px] uppercase tracking-wider">Status:</span>
                          <span className="font-semibold">{selectedStatus}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-2">
                      <Filter size={16} className="text-slate-300 mr-2" />
                      <span className="text-sm text-slate-400">No filters applied - all tasks will be included</span>
                    </div>
                  )}
                </div>
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
      </div>
    </div>
  );
}
