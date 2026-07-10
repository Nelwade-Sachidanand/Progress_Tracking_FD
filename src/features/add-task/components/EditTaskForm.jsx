import { BarChart3, CalendarDays, Check, ClipboardList, Building2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useEditTask from "../hooks/useEditTask";



export default function EditTaskForm() {
  const {
    selectedProject,
    formData,
    handleChange,
    phases,
    milestones,
    taskOptions,
    subTasks,
    handleUpdate,
  } = useEditTask();



  const phaseRef = useRef(null);
  const milestoneRef = useRef(null);
  const taskRef = useRef(null);
  const subTaskRef = useRef(null);



  const [originalDates, setOriginalDates] = useState({
    plannedStartDate: "",
    plannedEndDate: "",
  });



  const isDateChanged =
    formData.plannedStartDate !== originalDates.plannedStartDate ||
    formData.plannedEndDate !== originalDates.plannedEndDate;



  const inputClass =
    "w-full h-10 px-3.5 text-sm bg-white border border-[#DCE3EE] rounded-lg outline-none transition-all duration-200 focus:border-[#6D4AFF] focus:ring-2 focus:ring-[#6D4AFF]/10";



  const getStatus = (p) => {
    const progress = Number(p || 0);
    if (progress === 0) return "Not Started";
    if (progress === 100) return "Completed";
    if (progress > 0 && progress < 100) return "In Progress";
    return "Not Started";
  };


  const getStatus = (p) => {
    const progress = Number(p || 0);
    if (progress === 0) return "Not Started";
    if (progress === 100) return "Completed";
    if (progress > 0 && progress < 100) return "In Progress";
    return "Not Started";
  };

  useEffect(() => {
    if (formData.plannedStartDate || formData.plannedEndDate) {
      setOriginalDates({
        plannedStartDate: formData.plannedStartDate,
        plannedEndDate: formData.plannedEndDate,
      });
    }
  }, []);



  return (
    <div className="space-y-6 mx-auto w-full">
      {/* Single Professional Card */}
      <div className="w-full bg-white rounded-2xl shadow-sm border border-[#EEF2F7] overflow-hidden">
       
       



        {/* Card Body */}
        <div className="p-6 space-y-6">
          
          {/* Section 1: Basic Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Building2 size={20} className="text-[#6D4AFF]" />

              <h2 className="text-lg font-semibold text-[#0B1F59]">
                Basic Information
              </h2>
            </div>
              <span className="text-[10px] text-slate-400 ml-auto">Read-only fields</span>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Phase <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.phaseName}
                  readOnly
                  disabled
                  className={`${inputClass} bg-slate-50 cursor-not-allowed text-slate-600`}
                />
              </div>
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Milestone <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.milestoneName}
                  readOnly
                  disabled
                  className={`${inputClass} bg-slate-50 cursor-not-allowed text-slate-600`}
                />
              </div>
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Task <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.taskName}
                  readOnly
                  disabled
                  className={`${inputClass} bg-slate-50 cursor-not-allowed text-slate-600`}
                />
              </div>
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Sub Task <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.subTaskName}
                  readOnly
                  disabled
                  className={`${inputClass} bg-slate-50 cursor-not-allowed text-slate-600`}
                />
              </div>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Activity <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.activityName}
                  readOnly
                  disabled
                  className={`${inputClass} bg-slate-50 cursor-not-allowed text-slate-600`}
                />
              </div>
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Owner
                </label>
                <input
                  placeholder="Enter Owner"
                  className={inputClass}
                  value={formData.owner}
                  onChange={(e) => handleChange("owner", e.target.value)}
                />
              </div>
            </div>
          </div>



          {/* Divider */}
          <div className="border-t border-[#EEF2F7]"></div>



          {/* Section 2: Schedule & Progress */}
          <div>
          
               <div className="flex items-center gap-3 mb-4">
            <CalendarDays size={20} className="text-[#6D4AFF]" />
            <h2 className="font-semibold text-lg text-[#0B1F59]">
              Schedule & Progress
            </h2>
          </div>



            {/* Dates - 4 columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Planned Start
                </label>
                <input
                  type="date"
                  className={inputClass}
                  value={formData.plannedStartDate}
                  onChange={(e) => handleChange("plannedStartDate", e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Planned End
                </label>
                <input
                  type="date"
                  className={inputClass}
                  value={formData.plannedEndDate}
                  onChange={(e) => handleChange("plannedEndDate", e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Actual Start
                </label>
                <input
                  type="date"
                  className={inputClass}
                  value={formData.actualStartDate}
                  onChange={(e) => handleChange("actualStartDate", e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Actual End
                </label>
                <input
                  type="date"
                  className={inputClass}
                  value={formData.actualEndDate}
                  onChange={(e) => handleChange("actualEndDate", e.target.value)}
                />
              </div>
            </div>



            {/* Estimated Weeks, Progress, Status - 4 columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Estimated Weeks
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Est. Weeks"
                  className={inputClass}
                  value={formData.estimatedPeriodWeek}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) >= 0) {
                      handleChange("estimatedPeriodWeek", value);
                    }
                  }}
                />
              </div>
             <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Actual Weeks
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Act. Weeks"
                  className={inputClass}
                  value={formData.actualPeriodWeek || ""}
                  onChange={(e) => handleChange("actualPeriodWeek", e.target.value)}
                />
              </div>
             
 <div>
  <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
    Progress (%)
  </label>

  <div className="flex items-center gap-3">

    {/* Progress Input */}
    <input
      type="number"
      min="0"
      max="100"
      placeholder="0"
      className="
        h-9
        w-14
        rounded-lg
        border
        border-[#DCE3EE]
        text-center
        text-sm
        outline-none
        focus:border-[#6D4AFF]
        focus:ring-2
        focus:ring-[#6D4AFF]/10
      "
      value={formData.progress}
      onChange={(e) => {
        const value = e.target.value;

        if (
          value === "" ||
          (Number(value) >= 0 && Number(value) <= 100)
        ) {
          handleChange("progress", value);
        }
      }}
    />

    {/* Progress Slider */}
    <div className="flex-1">
      <input
        type="range"
        min="0"
        max="100"
        value={formData.progress}
        onChange={(e) =>
          handleChange("progress", e.target.value)
        }
        className="
          w-full
          h-2
          accent-[#6D4AFF]
          cursor-pointer
        "
      />
    </div>

    {/* Percentage */}
    <div
      className="
        h-9
        w-14
        rounded-lg
        border
        border-[#DCE3EE]
        bg-[#F8F7FF]
        flex
        items-center
        justify-center
        text-sm
        font-semibold
        text-[#6D4AFF]
      "
    >
      {formData.progress}%
    </div>

  </div>
</div>
              <div>
                <label className="block mb-1 ml-1 text-xs font-medium text-slate-600">
                  Status
                </label>
                <div className="w-full h-10 px-3.5 flex items-center text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
                  {getStatus(formData.progress)}
                </div>
              </div>
            </div>



            {/* Reason for Change - Shows when dates change */}
            {isDateChanged && (
              <div className="mt-3">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <label className="block mb-1 ml-1 text-xs font-medium text-amber-700">
                    Reason For Change <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.changeReason || ""}
                    onChange={(e) => handleChange("changeReason", e.target.value)}
                    placeholder="Enter reason for changing planned dates"
                    className="w-full h-10 px-3.5 text-sm bg-white border border-amber-300 rounded-lg outline-none transition-all duration-200 focus:border-[#6D4AFF] focus:ring-2 focus:ring-[#6D4AFF]/10"
                  />
                </div>
              </div>
            )}
          </div>
        </div>



        {/* Card Footer with Buttons */}
        <div className="px-6 py-4 border-t border-[#EEF2F7] bg-slate-50/50 flex justify-end items-center gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="h-10 px-5 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium flex items-center gap-2 hover:bg-slate-50 transition-all cursor-pointer"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="h-10 min-w-[130px] px-5 rounded-lg bg-gradient-to-r from-[#7C5CFA] to-[#6D4AFF] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            <Check size={15} />
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
}