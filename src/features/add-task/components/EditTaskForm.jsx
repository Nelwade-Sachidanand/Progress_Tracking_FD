import { BarChart3, CalendarDays, Check, ClipboardList } from "lucide-react";
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
    // resetForm,
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
    "w-full h-11 px-4 text-sm bg-white border border-[#DCE3EE] rounded-xl outline-none transition-all duration-200 focus:border-[#6D4AFF] focus:ring-4 focus:ring-[#6D4AFF]/10";

  const dropdownButtonClass =
    "w-full h-11 px-4 bg-white border border-[#DCE3EE] rounded-xl flex items-center justify-between text-sm";

  const dropdownMenuClass =
    "absolute top-full left-0 mt-2 w-full bg-white border border-[#DCE3EE] rounded-xl shadow-xl z-50";

  const dropdownItemClass =
    "w-full px-4 py-3 text-left text-sm hover:bg-slate-50";
 
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
    <div className="space-y-6  mx-auto w-full">
      {/* Basic Information */}

      <div
        className=" w-full
  bg-white
  rounded-3xl
  p-6
  shadow-sm
  border
  border-[#EEF2F7]
  "
      >
        <div className="flex items-center gap-3 mb-6">
          <ClipboardList size={20} className="text-[#6D4AFF]" />

          <h2 className="font-semibold text-lg">Basic Information</h2>
        </div>

        <div
          className="
  grid
  grid-cols-1
  md:grid-cols-2
  xl:grid-cols-4
  gap-4
  "
        >
          <div>
            <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
              Phase <span className="text-red-500">*</span>
            </label>

        
            <input
              value={formData.phaseName}
              readOnly
              disabled
              className={`${inputClass} bg-slate-100 cursor-not-allowed`}
            />
          </div>
          <div>
            <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
              Milestone <span className="text-red-500">*</span>
            </label>

          
            <input
              value={formData.milestoneName}
              readOnly
              disabled
              className={`${inputClass} bg-slate-100 cursor-not-allowed`}
            />
          </div>
          <div>
            <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
              Task <span className="text-red-500">*</span>
            </label>

          
            <input
              value={formData.taskName}
              readOnly
              disabled
              className={`${inputClass} bg-slate-100 cursor-not-allowed`}
            />
          </div>
          <div>
            <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
              Sub Task <span className="text-red-500">*</span>
            </label>

       
            <input
              value={formData.subTaskName}
              readOnly
              disabled
              className={`${inputClass} bg-slate-100 cursor-not-allowed`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
              Activity <span className="text-red-500">*</span>
            </label>

            
            <input
              value={formData.activityName}
              readOnly
              disabled
              className={`${inputClass} bg-slate-100 cursor-not-allowed`}
            />
          </div>
          <div>
            <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
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

      {/* Dates */}

      <div
        className="
  bg-white
  rounded-3xl
  p-6
  shadow-sm
  border
  border-[#EEF2F7]
  "
      >
        <div className="flex items-center gap-3 mb-6">
          <CalendarDays size={20} className="text-[#6D4AFF]" />

          <h2 className="font-semibold text-lg">Dates & Estimate</h2>
        </div>

        <div
          className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-4
    "
        >
          {/* Planned Start Date */}

          <div>
            <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
              Planned Start Date
            </label>

            <input
              type="date"
              className={inputClass}
              value={formData.plannedStartDate}
              onChange={(e) => handleChange("plannedStartDate", e.target.value)}
            />
          </div>

          {/* Planned End Date */}

          <div>
            <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
              Planned End Date
            </label>

            <input
              type="date"
              className={inputClass}
              value={formData.plannedEndDate}
              onChange={(e) => handleChange("plannedEndDate", e.target.value)}
            />
          </div>

          {/* Actual Start Date */}

          <div>
            <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
              Actual Start Date
            </label>

            <input
              type="date"
              className={inputClass}
              value={formData.actualStartDate}
              onChange={(e) => handleChange("actualStartDate", e.target.value)}
            />
          </div>

          {/* Actual End Date */}

          <div>
            <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
              Actual End Date
            </label>

            <input
              type="date"
              className={inputClass}
              value={formData.actualEndDate}
              onChange={(e) => handleChange("actualEndDate", e.target.value)}
            />
          </div>

          {/* Estimated Weeks */}

          <div>
            <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
              Estimated Weeks
            </label>

            <input
              type="number"
              step="0.1"
              placeholder="Enter Estimated Weeks"
              className={inputClass}
              value={formData.estimatedPeriodWeek}
              onChange={(e) =>
                handleChange("estimatedPeriodWeek", e.target.value)
              }
            />
          </div>
          {isDateChanged && (
            <div>
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Reason For Change
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={formData.changeReason || ""}
                onChange={(e) => handleChange("changeReason", e.target.value)}
                placeholder="Enter reason for changing planned dates"
                className="
        w-full
        h-11
        px-4
        text-sm
        bg-white
        border
        border-[#DCE3EE]
        rounded-xl
        outline-none
        focus:border-[#6D4AFF]
        focus:ring-4
        focus:ring-[#6D4AFF]/10
      "
              />
            </div>
          )}
        </div>
      </div>

      {/* Progress */}

      <div
        className="
  bg-white
  rounded-3xl
  p-6
  shadow-sm
  border
  border-[#EEF2F7]
  "
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 size={20} className="text-[#6D4AFF]" />

          <h2 className="font-semibold text-lg">Progress & Status</h2>
        </div>

        <div
          className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-4
    "
        >
          {/* Progress */}

          <div>
            <label className="block mb-2 ml-1 text-sm font-medium text-slate-700">
              Progress (%)
            </label>

            <div
              className="
                             border
                             border-[#DCE3EE]
                              rounded-xl
                               p-4
                                "
            >
              <input
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => handleChange("progress", e.target.value)}
               // onChange={(e) => handleChange("progress", Number(value || 0))}
                 //onChange={(e) => handleChange("progress", Number(e.target.value))}
                  
                className="
                                w-full
                                accent-[#6D4AFF]
                                 "
              />

              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-400">0%</span>

                <span className="font-semibold text-[#6D4AFF]">
                  {formData.progress}%
                </span>

                <span className="text-xs text-slate-400">100%</span>
              </div>
            </div>
          </div>

          {/* Status */}
<div>
  <label className="block mb-2 text-sm font-medium text-slate-700">
    Status
  </label>
<div className="
  w-full
  h-11
  px-4
  flex
  items-center
  text-sm
  bg-slate-50
  border
  border-slate-200
  rounded-xl
">
  {getStatus(formData.progress)}
</div>

</div>
          
        </div>
      </div>

      {/* Buttons */}

      <div className="flex justify-end items-center gap-3 mt-6">
       

        {/* Back */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="
      h-11
      px-6
      rounded-xl
      border
      border-slate-200
      bg-slate-50
      text-slate-600
      text-sm
      font-medium
      flex
      items-center
      gap-2
      hover:bg-slate-100
      transition-all
      cursor-pointer
    "
        >
          ← Back
        </button>

        {/* Update Task */}
        <button
          type="button"
          onClick={handleUpdate}
          className="
      h-11
      min-w-[140px]
      px-6
      rounded-xl
      bg-gradient-to-r
      from-[#7C5CFA]
      to-[#6D4AFF]
      text-white
      text-sm
      font-medium
      flex
      items-center
      justify-center
      gap-2
      shadow-md
      hover:opacity-95
      transition-all
      cursor-pointer
    "
        >
          <Check size={15} />
          Update Task
        </button>
      </div>
    </div>
  );
}
