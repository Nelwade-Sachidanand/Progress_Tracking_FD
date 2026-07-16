import { BarChart3, CalendarDays, Check, ClipboardList, Building2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useEditTask from "../hooks/useEditTask";
import DateInput from "../../../components/common/DateInput";


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
    isUpdating,
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
    "w-full h-9 px-3.5 text-sm bg-white border border-[#B8C4D1] rounded-lg outline-none transition-all duration-200 focus:border-blue-500 placeholder:text-slate-600";



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
    <div className="space-y-6 mx-auto w-full mt-[-10px]">
      {/* Single Professional Card */}
      <div className="w-full bg-white rounded-2xl shadow-sm border border-[#CDD7E3] overflow-hidden">
        {/* Card Body */}
        <div className="p-6 space-y-6">

          {/* Section 1: Basic Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={20} className="text-[#1D4ED8]" />

                <h2 className="text-lg font-semibold text-[#0B1F59]">
                  Basic Information
                </h2>
              </div>
              <span className="text-[10px] text-slate-400 ml-auto">Read-only fields</span>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block mb-1 ml-1 text-sm font-medium text-slate-800">
                  Phase <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.phaseName}
                  readOnly
                  disabled
                  className={`${inputClass} bg-slate-50 cursor-not-allowed text-slate-800`}
                />
              </div>
              <div>
                <label className="block mb-1 ml-1 text-sm font-medium text-slate-800">
                  Milestone <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.milestoneName}
                  readOnly
                  disabled
                  className={`${inputClass} bg-slate-50 cursor-not-allowed text-slate-800`}
                />
              </div>
              <div>
                <label className="block mb-1 ml-1 text-sm font-medium text-slate-800">
                  Task <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.taskName}
                  readOnly
                  disabled
                  className={`${inputClass} bg-slate-50 cursor-not-allowed text-slate-800`}
                />
              </div>
              <div>
                <label className="block mb-1 ml-1 text-sm font-medium text-slate-800">
                  Sub Task <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.subTaskName}
                  readOnly
                  disabled
                  className={`${inputClass} bg-slate-50 cursor-not-allowed text-slate-800`}
                />
              </div>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div>
                <label className="block mb-1 ml-1 text-sm font-medium text-slate-800">
                  Activity <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.activityName}
                  readOnly
                  disabled
                  className={`${inputClass} bg-slate-50 cursor-not-allowed text-slate-800`}
                />
              </div>
              <div>
                <label className="block mb-1 ml-1 text-sm font-medium text-slate-800">
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
              <CalendarDays size={20} className="text-[#1D4ED8]" />
              <h2 className="font-semibold text-lg text-[#0B1F59]">
                Schedule & Progress
              </h2>
            </div>



            {/* Dates - 4 columns */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput
                label="Planned Start"
                value={formData.plannedStartDate}
                onChange={(e) => handleChange("plannedStartDate", e.target.value)}
              />

              <DateInput
                label="Planned End"
                value={formData.plannedEndDate}
                onChange={(e) => handleChange("plannedEndDate", e.target.value)}
              />

              <DateInput
                label="Actual Start"
                value={formData.actualStartDate}
                onChange={(e) => handleChange("actualStartDate", e.target.value)}
              />

              <DateInput
                label="Actual End"
                value={formData.actualEndDate}
                onChange={(e) => handleChange("actualEndDate", e.target.value)}
              />
            </div>



            {/* Estimated Weeks, Progress, Status - 4 columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
              <div>
                <label className="block mb-1 ml-1 text-sm font-medium text-slate-800">
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
                <label className="block mb-1 ml-1 text-sm font-medium text-slate-800">
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
                <label className="block mb-1 ml-1 text-sm font-medium text-slate-800">
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
                    border-[#B8C4D1]
                    text-center
                    text-sm
                    outline-none
                    focus:border-blue-500
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
                      accent-blue-600
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
                    text-[#1D4ED8]
                  "
                  >
                    {formData.progress}%
                  </div>

                </div>
              </div>
              <div>
                <label className="block mb-1 ml-1 text-sm font-medium text-slate-800">
                  Status
                </label>
                <div className="w-full h-10 px-3.5 flex items-center text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
                  {getStatus(formData.progress)}
                </div>
              </div>
            </div>



            {/* Reason for Change - Shows when dates change */}
            {isDateChanged && (
              <div className="mt-4 max-w-lg">
                <label className="mb-1 ml-1 block text-sm font-medium text-slate-700">
                  Reason for Change <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={formData.changeReason || ""}
                  onChange={(e) => handleChange("changeReason", e.target.value)}
                  placeholder="Enter Reason for Changing Planned Dates"
                  className="
                  h-10
                  w-full
                  rounded-lg
                  border
                  border-[#B8C4D1]
                  bg-white
                  px-3.5
                  text-sm
                  outline-none
                  transition-all
                  focus:border-blue-500
                "
                />
              </div>
            )}
          </div>
        </div>



        {/* Card Footer with Buttons */}
        <div className="px-6 py-4 border-t border-[#EEF2F7] bg-slate-50/50 flex justify-end items-center gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="h-10 px-5 rounded-lg border border-[#B8C4D1] bg-white text-slate-700 text-sm font-medium flex items-center gap-2 hover:bg-slate-50 transition-all cursor-pointer"
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={isUpdating}
            className={`
            h-10
            min-w-[130px]
            px-5
            rounded-lg
            text-white
            text-sm
            font-medium
            flex
            items-center
            justify-center
            gap-2
            shadow-md
            transition-all

            ${isUpdating
                ? "bg-slate-400 cursor-not-allowed opacity-70"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }
          `}
          >
            <Check size={15} />
            {isUpdating ? "Updating..." : "Update Activity"}
          </button>
        </div>
      </div>
    </div>
  );
}