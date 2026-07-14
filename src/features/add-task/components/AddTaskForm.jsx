import {
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  RotateCcw,
  Pencil,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EditableDropdown from "./EditableDropdown";
import useEditableDropdown from "../hooks/useEditableDropdown";
import CustomDropdown from "../../../components/common/CustomDropdown";
import { useProjects } from "../../../context/ProjectContext";
import useAddTask from "../hooks/useAddTask";

export default function AddTaskForm() {
  const {
    selectedProject,
    formData,
    handleChange,
    phases,
    milestones,
    taskOptions,
    subTasks,
    resetForm,
    handleSubmit,
     isSubmitting,
  } = useAddTask();

const phaseRef = useRef(null);
  const milestoneRef = useRef(null);
  const taskRef = useRef(null);
  const subTaskRef = useRef(null);
   const [newPhase, setNewPhase] = useState("");
  const [newMilestone, setNewMilestone] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newSubTask, setNewSubTask] = useState("");
  const { projects, setProjects } = useProjects();

 
const handleAddPhase = (phaseName) => {
  if (!phaseName.trim()) return;

  const alreadyExists = phases.some(
    (p) => p.name.toLowerCase() === phaseName.toLowerCase()
  );

  if (alreadyExists) {
    alert("Phase already exists");
    return;
  }

  const newPhaseObj = {
    id: `temp-${Date.now()}`,
    name: phaseName,
    isNew: true,
  };

  setProjects((prev) =>
    prev.map((project) => {
      if (project.id !== selectedProject.id) return project;

      return {
        ...project,
        phases: [
          ...project.phases,
          {
            phaseId: newPhaseObj.id,
            phaseName: newPhaseObj.name,
            milestones: [],
            isNew: true,
          },
        ],
      };
    })
  );

  handleChange("phaseId", newPhaseObj.id);
  handleChange("phaseName", newPhaseObj.name);
  handleChange("newPhase", true);
};
const handleSavePhaseName = (id, name) => {
  if (!name.trim()) return;

  setProjects((prev) =>
    prev.map((project) => {
      if (project.id !== selectedProject.id) return project;

      return {
        ...project,
        phases: project.phases.map((phase) =>
          phase.phaseId === id
            ? {
                ...phase,
                phaseName: name,
              }
            : phase
        ),
      };
    })
  );

  handleChange("phaseId", id);
  handleChange("phaseName", name);
};

 const phaseDropdown = useEditableDropdown({
  items: phases,

  onSelect: (phase) => {
    handleChange("phaseId", phase.id);
    handleChange("phaseName", phase.name);
    handleChange("newPhase", false);
  },

  onAdd: handleAddPhase,

  onEdit: handleSavePhaseName,
});
const handleAddMilestone = (milestoneName) => {
  if (!milestoneName.trim()) return;

  if (!formData.phaseId) {
    alert("Please select a Phase first");
    return;
  }

  const alreadyExists = milestones.some(
    (m) => m.name.toLowerCase() === milestoneName.toLowerCase()
  );

  if (alreadyExists) {
    alert("Milestone already exists");
    return;
  }

  const newMilestoneObj = {
    id: `temp-${Date.now()}`,
    name: milestoneName,
    isNew: true,
  };

  setProjects((prev) =>
    prev.map((project) => {
      if (project.id !== selectedProject.id) return project;

      return {
        ...project,
        phases: project.phases.map((phase) => {
          if (phase.phaseId !== formData.phaseId) return phase;

          return {
            ...phase,
            milestones: [
              ...(phase.milestones || []),
              {
                milestoneId: newMilestoneObj.id,
                milestoneName: newMilestoneObj.name,
                tasks: [],
                isNew: true,
              },
            ],
          };
        }),
      };
    })
  );

  handleChange("milestoneId", newMilestoneObj.id);
  handleChange("milestoneName", newMilestoneObj.name);
  handleChange("newMilestone", true);
};
const handleSaveMilestoneName = (id, name) => {
  if (!name.trim()) return;

  setProjects((prev) =>
    prev.map((project) => {
      if (project.id !== selectedProject.id) return project;

      return {
        ...project,
        phases: project.phases.map((phase) => {
          if (phase.phaseId !== formData.phaseId) return phase;

          return {
            ...phase,
            milestones: phase.milestones.map((milestone) =>
              milestone.milestoneId === id
                ? {
                    ...milestone,
                    milestoneName: name,
                  }
                : milestone
            ),
          };
        }),
      };
    })
  );

  handleChange("milestoneId", id);
  handleChange("milestoneName", name);
};

const milestoneDropdown = useEditableDropdown({
  items: milestones,

  onSelect: (milestone) => {
    handleChange("milestoneId", milestone.id);
    handleChange("milestoneName", milestone.name);
    handleChange("newMilestone", false);
  },

  onAdd: handleAddMilestone,

  onEdit: handleSaveMilestoneName,
});
  const handleAddTask = (taskName) => {
  if (!taskName.trim()) return;

  if (!formData.phaseId) {
    alert("Please select a Phase first");
    return;
  }

  if (!formData.milestoneId) {
    alert("Please select a Milestone first");
    return;
  }

  const alreadyExists = taskOptions.some(
    (t) => t.name.toLowerCase() === taskName.toLowerCase()
  );

  if (alreadyExists) {
    alert("Task already exists");
    return;
  }

  const newTaskObj = {
    id: `temp-${Date.now()}`,
    name: taskName,
    isNew: true,
  };

  setProjects((prev) =>
    prev.map((project) => {
      if (project.id !== selectedProject.id) return project;

      return {
        ...project,
        phases: project.phases.map((phase) => {
          if (phase.phaseId !== formData.phaseId) return phase;

          return {
            ...phase,
            milestones: phase.milestones.map((milestone) => {
              if (milestone.milestoneId !== formData.milestoneId)
                return milestone;

              return {
                ...milestone,
                tasks: [
                  ...(milestone.tasks || []),
                  {
                    taskId: newTaskObj.id,
                    taskName: newTaskObj.name,
                    subTasks: [],
                    isNew: true,
                  },
                ],
              };
            }),
          };
        }),
      };
    })
  );

  handleChange("taskId", newTaskObj.id);
  handleChange("taskName", newTaskObj.name);
  handleChange("newTask", true);
};
const handleSaveTaskName = (id, name) => {
  if (!name.trim()) return;

  setProjects((prev) =>
    prev.map((project) => {
      if (project.id !== selectedProject.id) return project;

      return {
        ...project,
        phases: project.phases.map((phase) => {
          if (phase.phaseId !== formData.phaseId) return phase;

          return {
            ...phase,
            milestones: phase.milestones.map((milestone) => {
              if (milestone.milestoneId !== formData.milestoneId)
                return milestone;

              return {
                ...milestone,
                tasks: milestone.tasks.map((task) =>
                  task.taskId === id
                    ? {
                        ...task,
                        taskName: name,
                      }
                    : task
                ),
              };
            }),
          };
        }),
      };
    })
  );

  handleChange("taskId", id);
  handleChange("taskName", name);
};
const taskDropdown = useEditableDropdown({
  items: taskOptions,

  onSelect: (task) => {
    handleChange("taskId", task.id);
    handleChange("taskName", task.name);
    handleChange("newTask", false);
  },

  onAdd: handleAddTask,

  onEdit: handleSaveTaskName,
});
  const handleAddSubTask = (subTaskName) => {
  if (!subTaskName.trim()) return;

  if (!formData.phaseId) {
    alert("Please select a Phase first");
    return;
  }

  if (!formData.milestoneId) {
    alert("Please select a Milestone first");
    return;
  }

  if (!formData.taskId) {
    alert("Please select a Task first");
    return;
  }

  const alreadyExists = subTasks.some(
    (s) => s.name.toLowerCase() === subTaskName.toLowerCase()
  );

  if (alreadyExists) {
    alert("Sub Task already exists");
    return;
  }

  const newSubTaskObj = {
    id: `temp-${Date.now()}`,
    name: subTaskName,
    isNew: true,
  };

  setProjects((prev) =>
    prev.map((project) => {
      if (project.id !== selectedProject.id) return project;

      return {
        ...project,
        phases: project.phases.map((phase) => {
          if (phase.phaseId !== formData.phaseId) return phase;

          return {
            ...phase,
            milestones: phase.milestones.map((milestone) => {
              if (milestone.milestoneId !== formData.milestoneId)
                return milestone;

              return {
                ...milestone,
                tasks: milestone.tasks.map((task) => {
                  if (task.taskId !== formData.taskId)
                    return task;

                  return {
                    ...task,
                    subTasks: [
                      ...(task.subTasks || []),
                      {
                        subTaskId: newSubTaskObj.id,
                        subTaskName: newSubTaskObj.name,
                        activities: [],
                        isNew: true,
                      },
                    ],
                  };
                }),
              };
            }),
          };
        }),
      };
    })
  );

  handleChange("subTaskId", newSubTaskObj.id);
  handleChange("subTaskName", newSubTaskObj.name);
  handleChange("newSubTask", true);
};
const handleSaveSubTaskName = (id, name) => {
  if (!name.trim()) return;

  setProjects((prev) =>
    prev.map((project) => {
      if (project.id !== selectedProject.id) return project;

      return {
        ...project,
        phases: project.phases.map((phase) => {
          if (phase.phaseId !== formData.phaseId) return phase;

          return {
            ...phase,
            milestones: phase.milestones.map((milestone) => {
              if (milestone.milestoneId !== formData.milestoneId)
                return milestone;

              return {
                ...milestone,
                tasks: milestone.tasks.map((task) => {
                  if (task.taskId !== formData.taskId)
                    return task;

                  return {
                    ...task,
                    subTasks: task.subTasks.map((subTask) =>
                      subTask.subTaskId === id
                        ? {
                            ...subTask,
                            subTaskName: name,
                          }
                        : subTask
                    ),
                  };
                }),
              };
            }),
          };
        }),
      };
    })
  );

  handleChange("subTaskId", id);
  handleChange("subTaskName", name);
};
const subTaskDropdown = useEditableDropdown({
  items: subTasks,

  onSelect: (subTask) => {
    handleChange("subTaskId", subTask.id);
    handleChange("subTaskName", subTask.name);
    handleChange("newSubTask", false);
  },

  onAdd: handleAddSubTask,

  onEdit: handleSaveSubTaskName,
});
  const inputClass =
    "w-full h-9 px-3 text-sm bg-white border border-[#DCE3EE] rounded-lg outline-none transition-all duration-200 focus:border-blue-500";

  const inputClassLarge =
    "w-full h-11 px-4 text-sm bg-white border border-[#DCE3EE] rounded-xl outline-none transition-all duration-200 focus:border-blue-500";

 useEffect(() => {
  const handleClickOutside = (event) => {
    if (phaseRef.current && !phaseRef.current.contains(event.target)) {
      phaseDropdown.closeDropdown();
    }

    if (
      milestoneRef.current &&
      !milestoneRef.current.contains(event.target)
    ) {
      milestoneDropdown.closeDropdown();
    }

    if (taskRef.current && !taskRef.current.contains(event.target)) {
      taskDropdown.closeDropdown();
    }

    if (
      subTaskRef.current &&
      !subTaskRef.current.contains(event.target)
    ) {
      subTaskDropdown.closeDropdown();
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [
  phaseDropdown,
  milestoneDropdown,
  taskDropdown,
  subTaskDropdown,
]);

  return (
    <div className="space-y-6 mx-auto w-full mt-[-10px]">
      {/* Single Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EEF2F7]">
        {/* Basic Information - Project Hierarchy */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Building2 size={20} className="text-[#6D4AFF]" />

              <h2 className="text-lg font-semibold text-[#0B1F59]">
                Basic Information
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Phase */}
            <div>

              <div ref={phaseRef} className="relative w-full">

               
                <EditableDropdown
    label="Phase"

    value={formData.phaseName}

    placeholder="Select Phase"

    items={phases}

    showDropdown={phaseDropdown.showDropdown}
    setShowDropdown={phaseDropdown.setShowDropdown}

    showAdd={phaseDropdown.showAdd}
    setShowAdd={phaseDropdown.setShowAdd}

    newValue={phaseDropdown.newValue}
    setNewValue={phaseDropdown.setNewValue}

    editingId={phaseDropdown.editingId}
    editingValue={phaseDropdown.editingValue}
    setEditingValue={phaseDropdown.setEditingValue}

    handleSelect={phaseDropdown.handleSelect}
    handleAdd={phaseDropdown.handleAdd}

    startEdit={phaseDropdown.startEdit}
    handleSave={phaseDropdown.handleSave}
    cancelEdit={phaseDropdown.cancelEdit}
/>
              </div>
            </div>

            {/* Milestone */}
            <div>
             
              <div ref={milestoneRef} className="relative w-full">
              <EditableDropdown
  label="Milestone"
  value={formData.milestoneName}
  placeholder="Select Milestone"
  items={milestones}

  showDropdown={milestoneDropdown.showDropdown}
  setShowDropdown={milestoneDropdown.setShowDropdown}

  showAdd={milestoneDropdown.showAdd}
  setShowAdd={milestoneDropdown.setShowAdd}

  newValue={milestoneDropdown.newValue}
  setNewValue={milestoneDropdown.setNewValue}

  editingId={milestoneDropdown.editingId}
  editingValue={milestoneDropdown.editingValue}
  setEditingValue={milestoneDropdown.setEditingValue}

  handleSelect={milestoneDropdown.handleSelect}
  handleAdd={milestoneDropdown.handleAdd}

  startEdit={milestoneDropdown.startEdit}
  handleSave={milestoneDropdown.handleSave}
  cancelEdit={milestoneDropdown.cancelEdit}
/>
              </div>
            </div>

            {/* Task */}
            <div>
             
              <div ref={taskRef} className="relative w-full">
             

               <EditableDropdown
  label="Task"
  value={formData.taskName}
  placeholder="Select Task"
  items={taskOptions}

  showDropdown={taskDropdown.showDropdown}
  setShowDropdown={taskDropdown.setShowDropdown}

  showAdd={taskDropdown.showAdd}
  setShowAdd={taskDropdown.setShowAdd}

  newValue={taskDropdown.newValue}
  setNewValue={taskDropdown.setNewValue}

  editingId={taskDropdown.editingId}
  editingValue={taskDropdown.editingValue}
  setEditingValue={taskDropdown.setEditingValue}

  handleSelect={taskDropdown.handleSelect}
  handleAdd={taskDropdown.handleAdd}

  startEdit={taskDropdown.startEdit}
  handleSave={taskDropdown.handleSave}
  cancelEdit={taskDropdown.cancelEdit}
/>
              </div>
            </div>

            {/* Sub Task */}
            <div>
             
              <div ref={subTaskRef} className="relative w-full">
                <EditableDropdown
  label="Sub Task"
  value={formData.subTaskName}
  placeholder="Select Sub Task"
  items={subTasks}

  showDropdown={subTaskDropdown.showDropdown}
  setShowDropdown={subTaskDropdown.setShowDropdown}

  showAdd={subTaskDropdown.showAdd}
  setShowAdd={subTaskDropdown.setShowAdd}

  newValue={subTaskDropdown.newValue}
  setNewValue={subTaskDropdown.setNewValue}

  editingId={subTaskDropdown.editingId}
  editingValue={subTaskDropdown.editingValue}
  setEditingValue={subTaskDropdown.setEditingValue}

  handleSelect={subTaskDropdown.handleSelect}
  handleAdd={subTaskDropdown.handleAdd}

  startEdit={subTaskDropdown.startEdit}
  handleSave={subTaskDropdown.handleSave}
  cancelEdit={subTaskDropdown.cancelEdit}
/>

               
              </div>
            </div>
          </div>

          {/* Activity Name & Owner - Smaller fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Activity Name <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Enter Activity"
                className={inputClass}
                value={formData.activityName}
                onChange={(e) => handleChange("activityName", e.target.value)}
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

        <div className="border-t border-[#EEF2F7] my-6" />

        {/* Schedule & Progress */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <CalendarDays size={20} className="text-[#6D4AFF]" />
            <h2 className="font-semibold text-lg text-[#0B1F59]">
              Schedule & Progress
            </h2>
          </div>

          {/* Dates - 4 cols */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Planned Start
              </label>
              <input
                type="date"
                className={inputClass}
                value={formData.plannedStartDate}
                onChange={(e) =>
                  handleChange("plannedStartDate", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
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
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Actual Start
              </label>
              <input
                type="date"
                className={inputClass}
                value={formData.actualStartDate}
                onChange={(e) =>
                  handleChange("actualStartDate", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
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

          {/* Estimated Weeks, Actual Weeks, Progress, Status - 4 cols */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Estimated Weeks
              </label>
              <input
  type="number"
  readOnly
  value={formData.estimatedPeriodWeek}
  placeholder="Est. Weeks"
  className={`${inputClass} bg-slate-100 cursor-not-allowed`}
/>
            </div>
            <div>
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Actual Weeks
              </label>
          
              <input
  type="number"
  readOnly
  placeholder="Act. Weeks"
  className={`${inputClass} bg-slate-100 cursor-not-allowed`}
  value={formData.actualPeriodWeek || ""}
/>
            </div>
            <div>
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Progress (%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  className={`${inputClass} w-16`}
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
                <div className="grid grid-cols-[1fr_60px] items-center gap-3">
                  {/* Progress Bar */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => handleChange("progress", e.target.value)}
                    className="w-32 accent-[#6D4AFF] h-2 cursor-pointer"
                  />

                  {/* Percentage Box */}
                  <div
                    className="
      h-9
      rounded-lg
      border
      bg-white
      flex
      items-center
      justify-center
      text-sm
      font-semibold
      text-[#6D4AFF]
      border-[#E5E7EB]
    "
                  >
                    {formData.progress}%
                  </div>
                </div>
              </div>
            </div>

            <div>
              <CustomDropdown
                label="Status"
                placeholder="Select Status"
                value={formData.executionStatus}
                onChange={(value) => handleChange("executionStatus", value)}
                options={[
                  {
                    label: "Not Started",
                    value: "Not Started",
                  },
                  {
                    label: "In Progress",
                    value: "In Progress",
                  },
                  {
                    label: "Completed",
                    value: "Completed",
                  },
                  {
                    label: "Delayed",
                    value: "Delayed",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end items-center gap-3 mt-6">
        <button
          data-testid="reset-button"
          type="button"
          onClick={resetForm}
          className="h-11 px-6 rounded-xl border border-orange-300 bg-white text-orange-500 text-sm font-medium flex items-center gap-2 hover:bg-orange-50 transition-all cursor-pointer"
        >
          <RotateCcw size={15} />
          Reset
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium flex items-center gap-2 hover:bg-slate-100 transition-all cursor-pointer"
        >
          Cancel
        </button>
        {/* <button
          data-testid="submit-button"
          type="button"
          onClick={handleSubmit}
          className="h-11 min-w-[140px] px-6 rounded-xl bg-gradient-to-r from-[#7C5CFA] to-[#6D4AFF] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all cursor-pointer"
        >
          <Check size={15} />
          Add Activity
        </button> */}
        <button
  data-testid="submit-button"
  type="button"
  onClick={handleSubmit}
  disabled={isSubmitting}
  className={`
    h-11
    min-w-[140px]
    px-6
    rounded-xl
    text-white
    text-sm
    font-medium
    flex
    items-center
    justify-center
    gap-2
    shadow-md
    transition-all

    ${
      isSubmitting
        ? "bg-slate-400 cursor-not-allowed opacity-70"
        : "bg-gradient-to-r from-[#7C5CFA] to-[#6D4AFF] hover:opacity-95 cursor-pointer"
    }
  `}
>
  <Check size={15} />

  {isSubmitting ? "Adding..." : "Add Activity"}
</button>
      </div>
    </div>
  );
}
