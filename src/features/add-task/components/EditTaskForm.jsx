import { useState } from "react";
import { useEffect, useRef } from "react";
import {
    ClipboardList,
    CalendarDays,
    BarChart3,
    Check,
    RotateCcw,
} from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Plus, X } from "lucide-react";
import useEditTask from "../hooks/useEditTask";

export default function EditTaskForm() {
    const {
        formData,
        handleChange,
        phases,
        milestones,
        taskOptions,
        subTasks,
        resetForm,
        handleUpdate,
    } = useEditTask();

    const phaseRef = useRef(null);
    const milestoneRef = useRef(null);
    const taskRef = useRef(null);
    const subTaskRef = useRef(null);







    // const inputClass =
    //     "w-full border border-[#E5E7EB] rounded-xl p-3 text-sm";

    const inputClass =
        "w-full h-11 px-4 text-sm bg-white border border-[#DCE3EE] rounded-xl outline-none transition-all duration-200 focus:border-[#6D4AFF] focus:ring-4 focus:ring-[#6D4AFF]/10";

    const dropdownButtonClass =
        "w-full h-11 px-4 bg-white border border-[#DCE3EE] rounded-xl flex items-center justify-between text-sm";

    const dropdownMenuClass =
        "absolute top-full left-0 mt-2 w-full bg-white border border-[#DCE3EE] rounded-xl shadow-xl z-50";

    const dropdownItemClass =
        "w-full px-4 py-3 text-left text-sm hover:bg-slate-50";
 

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
                    <ClipboardList
                        size={20}
                        className="text-[#6D4AFF]"
                    />

                    <h2 className="font-semibold text-lg">
                        Basic Information
                    </h2>
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
    type="text"
    placeholder="Enter Phase"
    className={inputClass}
    value={formData.phaseName}
    onChange={(e) =>
      handleChange(
        "phaseName",
        e.target.value
      )
    }
  />
</div>
                   <div>
  <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
    Milestone <span className="text-red-500">*</span>
  </label>

  <input
    type="text"
    placeholder="Enter Milestone"
    className={inputClass}
    value={formData.milestoneName}
    onChange={(e) =>
      handleChange(
        "milestoneName",
        e.target.value
      )
    }
  />
</div>
                    <div>
  <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
    Task <span className="text-red-500">*</span>
  </label>

  <input
    type="text"
    placeholder="Enter Task"
    className={inputClass}
    value={formData.taskName}
    onChange={(e) =>
      handleChange(
        "taskName",
        e.target.value
      )
    }
  />
</div>
                   <div>
  <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
    Sub Task <span className="text-red-500">*</span>
  </label>

  <input
    type="text"
    placeholder="Enter Sub Task"
    className={inputClass}
    value={formData.subTaskName}
    onChange={(e) =>
      handleChange(
        "subTaskName",
        e.target.value
      )
    }
  />
</div>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                            Activity <span className="text-red-500">*</span>
                        </label>

                        <input
                            placeholder="Enter Activity"
                            className={inputClass}
                            value={formData.activityName}
                            onChange={(e) =>
                                handleChange(
                                    "activityName",
                                    e.target.value
                                )
                            }
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
                            onChange={(e) =>
                                handleChange(
                                    "owner",
                                    e.target.value
                                )
                            }
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
                    <CalendarDays
                        size={20}
                        className="text-[#6D4AFF]"
                    />

                    <h2 className="font-semibold text-lg">
                        Dates & Estimate
                    </h2>
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
                            onChange={(e) =>
                                handleChange(
                                    "plannedStartDate",
                                    e.target.value
                                )
                            }
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
                            onChange={(e) =>
                                handleChange(
                                    "plannedEndDate",
                                    e.target.value
                                )
                            }
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
                            onChange={(e) =>
                                handleChange(
                                    "actualStartDate",
                                    e.target.value
                                )
                            }
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
                            onChange={(e) =>
                                handleChange(
                                    "actualEndDate",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    {/* Estimated Weeks */}

                    <div>
                        <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                            Estimated Weeks
                        </label>

                        <input
                            type="number"
                            placeholder="Enter Estimated Weeks"
                            className={inputClass}
                            value={formData.estimatedPeriodWeek}
                            onChange={(e) =>
                                handleChange(
                                    "estimatedPeriodWeek",
                                    e.target.value
                                )
                            }
                        />
                    </div>

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
                    <BarChart3
                        size={20}
                        className="text-[#6D4AFF]"
                    />

                    <h2 className="font-semibold text-lg">
                        Progress & Status
                    </h2>
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
                                onChange={(e) =>
                                    handleChange(
                                        "progress",
                                        e.target.value
                                    )
                                }
                                className="
          w-full
          accent-[#6D4AFF]
          "
                            />

                            <div className="flex justify-between mt-2">
                                <span className="text-xs text-slate-400">
                                    0%
                                </span>

                                <span className="font-semibold text-[#6D4AFF]">
                                    {formData.progress}%
                                </span>

                                <span className="text-xs text-slate-400">
                                    100%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Status */}

                    <div>
                        <label className="block mb-2 ml-1 text-sm font-medium text-slate-700">
                            Status
                        </label>

                        <select
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
        cursor-pointer
        "
                            value={formData.executionStatus}
                            onChange={(e) =>
                                handleChange(
                                    "executionStatus",
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                Select Status
                            </option>

                            <option value="Not Started">
                                Not Started
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="Delayed">
                                Delayed
                            </option>
                        </select>
                    </div>

                </div>
            </div>

            {/* Buttons */}

            <div className="flex justify-end items-center gap-3 mt-6">

                {/* Reset */}
                <button
                    type="button"
                    onClick={resetForm}
                    className="
      h-11
      px-6
      rounded-xl
      border
      border-orange-300
      bg-white
      text-orange-500
      text-sm
      font-medium
      flex
      items-center
      gap-2
      hover:bg-orange-50
      transition-all
      cursor-pointer
    "
                >
                    <RotateCcw size={15} />
                    Reset
                </button>

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