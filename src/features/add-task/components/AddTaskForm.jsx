import {
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  } = useAddTask();

  const phaseRef = useRef(null);
  const milestoneRef = useRef(null);
  const taskRef = useRef(null);
  const subTaskRef = useRef(null);

  const [showPhaseDropdown, setShowPhaseDropdown] = useState(false);
  const [showAddPhase, setShowAddPhase] = useState(false);
  const [showMilestoneDropdown, setShowMilestoneDropdown] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showSubTaskDropdown, setShowSubTaskDropdown] = useState(false);
  const [showAddSubTask, setShowAddSubTask] = useState(false);
  const [newPhase, setNewPhase] = useState("");
  const [newMilestone, setNewMilestone] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newSubTask, setNewSubTask] = useState("");
  const { projects, setProjects } = useProjects();

  //   const handleAddPhase = () => {
  //     if (!newPhase.trim()) return;
  //     const updatedProjects = projects.map((project) => {
  //       if (project.projectName === selectedProject.projectName) {
  //         const phaseExists = project.phases?.some(
  //           (p) => p.phaseName === newPhase.trim(),
  //         );
  //         if (phaseExists) {
  //           alert("Phase already exists");
  //           return project;
  //         }
  //         return {
  //           ...project,
  //           phases: [
  //             ...(project.phases || []),
  //             {
  //               phaseName: newPhase.trim(),
  //               milestones: [],
  //             },
  //           ],
  //         };
  //       }
  //       return project;
  //     });
  //     setProjects(updatedProjects);
  //     handleChange("phaseId", "");
  // handleChange("phaseName", newPhase.trim());
  // handleChange("newPhase", true);
  //     setNewPhase("");
  //     setShowAddPhase(false);
  //   };
  const handleAddPhase = () => {
    if (!newPhase.trim()) return;

    handleChange("phaseId", "");
    handleChange("phaseName", newPhase.trim());
    handleChange("newPhase", true);

    setNewPhase("");
    setShowAddPhase(false);
    setShowPhaseDropdown(false);
  };
  //   const handleAddMilestone = () => {
  //     if (!newMilestone.trim()) return;
  //     const updatedProjects = projects.map((project) => {
  //       if (project.projectName === selectedProject.projectName) {
  //         return {
  //           ...project,
  //           phases: project.phases?.map((phase) => {
  //             if (phase.phaseName === formData.phaseName) {
  //               const milestoneExists = phase.milestones?.some(
  //                 (m) => m.milestoneName === newMilestone.trim(),
  //               );
  //               if (milestoneExists) {
  //                 alert("Milestone already exists");
  //                 return phase;
  //               }
  //               return {
  //                 ...phase,
  //                 milestones: [
  //                   ...(phase.milestones || []),
  //                   {
  //                     milestoneName: newMilestone.trim(),
  //                     tasks: [],
  //                   },
  //                 ],
  //               };
  //             }
  //             return phase;
  //           }),
  //         };
  //       }
  //       return project;
  //     });
  //     setProjects(updatedProjects);
  //     handleChange("milestoneId", "");
  // handleChange("milestoneName", newMilestone.trim());
  // handleChange("newMilestone", true);
  //     setNewMilestone("");
  //     setShowAddMilestone(false);
  //     setShowMilestoneDropdown(false);
  //   };
  const handleAddMilestone = () => {
    if (!newMilestone.trim()) return;

    handleChange("milestoneId", "");
    handleChange("milestoneName", newMilestone.trim());
    handleChange("newMilestone", true);

    setNewMilestone("");
    setShowAddMilestone(false);
    setShowMilestoneDropdown(false);
  };
  //   const handleAddTask = () => {
  //     if (!newTask.trim()) return;
  //     if (!formData.phaseName) {
  //       alert("Please select a phase first");
  //       return;
  //     }
  //     const updatedProjects = projects.map((project) => {
  //       if (project.projectName === selectedProject.projectName) {
  //         return {
  //           ...project,
  //           phases: project.phases?.map((phase) => {
  //             if (phase.phaseName === formData.phaseName) {
  //               return {
  //                 ...phase,
  //                 milestones: phase.milestones?.map((milestone) => {
  //                   if (milestone.milestoneName === formData.milestoneName) {
  //                     const taskExists = milestone.tasks?.some(
  //                       (task) => task.taskName === newTask.trim(),
  //                     );
  //                     if (taskExists) {
  //                       alert("Task already exists");
  //                       return milestone;
  //                     }
  //                     return {
  //                       ...milestone,
  //                       tasks: [
  //                         ...(milestone.tasks || []),
  //                         {
  //                           taskName: newTask.trim(),
  //                           subTasks: [],
  //                         },
  //                       ],
  //                     };
  //                   }
  //                   return milestone;
  //                 }),
  //               };
  //             }
  //             return phase;
  //           }),
  //         };
  //       }
  //       return project;
  //     });
  //     setProjects(updatedProjects);
  //     handleChange("taskId", "");
  // handleChange("taskName", newTask.trim());
  // handleChange("newTask", true);
  //     setNewTask("");
  //     setShowAddTask(false);
  //     setShowTaskDropdown(false);
  //   };
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    if (!formData.phaseName) {
      alert("Please select a phase first");
      return;
    }

    if (!formData.milestoneName) {
      alert("Please select a milestone first");
      return;
    }

    handleChange("taskId", "");
    handleChange("taskName", newTask.trim());
    handleChange("newTask", true);

    setNewTask("");
    setShowAddTask(false);
    setShowTaskDropdown(false);
  };
  //   const handleAddSubTask = () => {
  //     if (!newSubTask.trim()) return;
  //     if (!formData.phaseName) {
  //       alert("Please select a phase first");
  //       return;
  //     }
  //     if (!formData.milestoneName) {
  //       alert("Please select a milestone first");
  //       return;
  //     }
  //     if (!formData.taskName) {
  //       alert("Please select a task first");
  //       return;
  //     }
  //     const updatedProjects = projects.map((project) => {
  //       if (project.projectName === selectedProject.projectName) {
  //         return {
  //           ...project,
  //           phases: project.phases?.map((phase) => {
  //             if (phase.phaseName === formData.phaseName) {
  //               return {
  //                 ...phase,
  //                 milestones: phase.milestones?.map((milestone) => {
  //                   if (milestone.milestoneName === formData.milestoneName) {
  //                     return {
  //                       ...milestone,
  //                       tasks: milestone.tasks?.map((task) => {
  //                         if (task.taskName === formData.taskName) {
  //                           const subTaskExists = task.subTasks?.some(
  //                             (subTask) =>
  //                               subTask.subTaskName === newSubTask.trim(),
  //                           );
  //                           if (subTaskExists) {
  //                             alert("Sub Task already exists");
  //                             return task;
  //                           }
  //                           return {
  //                             ...task,
  //                             subTasks: [
  //                               ...(task.subTasks || []),
  //                               {
  //                                 subTaskName: newSubTask.trim(),
  //                                 activities: [],
  //                               },
  //                             ],
  //                           };
  //                         }
  //                         return task;
  //                       }),
  //                     };
  //                   }
  //                   return milestone;
  //                 }),
  //               };
  //             }
  //             return phase;
  //           }),
  //         };
  //       }
  //       return project;
  //     });
  //     setProjects(updatedProjects);
  //    handleChange("subTaskId", "");
  // handleChange("subTaskName", newSubTask.trim());
  // handleChange("newSubTask", true);
  //     setNewSubTask("");
  //     setShowAddSubTask(false);
  //     setShowSubTaskDropdown(false);
  //   };
  const handleAddSubTask = () => {
    if (!newSubTask.trim()) return;

    if (!formData.phaseName) {
      alert("Please select a phase first");
      return;
    }

    if (!formData.milestoneName) {
      alert("Please select a milestone first");
      return;
    }

    if (!formData.taskName) {
      alert("Please select a task first");
      return;
    }

    handleChange("subTaskId", "");
    handleChange("subTaskName", newSubTask.trim());
    handleChange("newSubTask", true);

    setNewSubTask("");
    setShowAddSubTask(false);
    setShowSubTaskDropdown(false);
  };
  const inputClass =
    "w-full h-9 px-3 text-sm bg-white border border-[#DCE3EE] rounded-lg outline-none transition-all duration-200 focus:border-blue-500";

  const inputClassLarge =
    "w-full h-11 px-4 text-sm bg-white border border-[#DCE3EE] rounded-xl outline-none transition-all duration-200 focus:border-blue-500";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (phaseRef.current && !phaseRef.current.contains(event.target)) {
        setShowPhaseDropdown(false);
        setShowAddPhase(false);
      }
      if (
        milestoneRef.current &&
        !milestoneRef.current.contains(event.target)
      ) {
        setShowMilestoneDropdown(false);
        setShowAddMilestone(false);
      }
      if (taskRef.current && !taskRef.current.contains(event.target)) {
        setShowTaskDropdown(false);
        setShowAddTask(false);
      }
      if (subTaskRef.current && !subTaskRef.current.contains(event.target)) {
        setShowSubTaskDropdown(false);
        setShowAddSubTask(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Phase <span className="text-red-500">*</span>
              </label>
              <div ref={phaseRef} className="relative w-full">
                <button
                  data-testid="phase-dropdown"
                  type="button"
                  onClick={() => setShowPhaseDropdown(!showPhaseDropdown)}
                  className="w-full h-9 px-3 bg-white border border-[#DCE3EE] rounded-lg flex items-center justify-between text-sm cursor-pointer"
                >
                  <span className="truncate text-sm">
                    {formData.phaseName || "Select Phase"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${showPhaseDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showPhaseDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[#DCE3EE] rounded-xl shadow-xl z-50">
                    <div className="max-h-52 overflow-y-auto">
                      {phases.length > 0 ? (
                        phases.map((phase) => (
                          <button
                            key={phase.id}
                            type="button"
                            onClick={() => {
                              handleChange("phaseId", phase.id);
                              handleChange("phaseName", phase.name);
                              handleChange("newPhase", false);

                              setShowPhaseDropdown(false);
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 cursor-pointer"
                          >
                            {phase.name}
                          </button>
                        ))
                      ) : (
                        <div className="p-3 text-sm text-slate-400">
                          No Phase Available
                        </div>
                      )}
                    </div>
                    <div className="border-t" />
                    <div className="p-4">
                      {!showAddPhase ? (
                        <button
                          type="button"
                          onClick={() => setShowAddPhase(true)}
                          className="text-[#6D4AFF] text-sm font-medium cursor-pointer"
                        >
                          + Add New Phase
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={newPhase}
                            onChange={(e) => setNewPhase(e.target.value)}
                            placeholder="Enter Phase Name"
                            className="w-full h-9 px-3 border border-[#DCE3EE] rounded-lg text-sm"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setShowAddPhase(false);
                                setNewPhase("");
                              }}
                              className="px-4 py-1.5 border border-[#DCE3EE] rounded-lg cursor-pointer text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleAddPhase}
                              className="px-4 py-1.5 bg-[#6D4AFF] text-white rounded-lg cursor-pointer text-sm"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Milestone */}
            <div>
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Milestone <span className="text-red-500">*</span>
              </label>
              <div ref={milestoneRef} className="relative w-full">
                <button
                  data-testid="milestone-dropdown"
                  type="button"
                  onClick={() =>
                    setShowMilestoneDropdown(!showMilestoneDropdown)
                  }
                  className="w-full h-9 px-3 border border-[#DCE3EE] rounded-lg bg-white flex items-center justify-between text-sm cursor-pointer"
                >
                  <span className="text-sm">
                    {formData.milestoneName || "Select Milestone"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${showMilestoneDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showMilestoneDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[#DCE3EE] rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="max-h-[220px] overflow-y-auto">
                      {milestones.length > 0 ? (
                        milestones.map((milestone) => (
                          <button
                            key={milestone.id}
                            onClick={() => {
                              handleChange("milestoneId", milestone.id);
                              handleChange("milestoneName", milestone.name);
                              handleChange("newMilestone", false);

                              setShowMilestoneDropdown(false);
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F8FAFC] cursor-pointer"
                          >
                            {milestone.name}
                          </button>
                        ))
                      ) : (
                        <div className="p-3 text-sm text-slate-400">
                          No Milestones Found
                        </div>
                      )}
                    </div>
                    <div className="border-t border-[#E5E7EB]" />
                    <div className="p-4">
                      <button
                        type="button"
                        onClick={() => setShowAddMilestone(!showAddMilestone)}
                        className="text-[#6D4AFF] text-sm font-medium cursor-pointer"
                      >
                        + Add New Milestone
                      </button>
                      {showAddMilestone && (
                        <div className="mt-4">
                          <input
                            value={newMilestone}
                            onChange={(e) => setNewMilestone(e.target.value)}
                            placeholder="Enter Milestone Name"
                            className="w-full h-9 px-3 border border-[#DCE3EE] rounded-lg text-sm"
                          />
                          <div className="flex justify-end gap-2 mt-4">
                            <button
                              type="button"
                              onClick={() => {
                                setShowAddMilestone(false);
                                setNewMilestone("");
                              }}
                              className="px-4 py-1.5 border border-[#DCE3EE] rounded-lg cursor-pointer text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleAddMilestone}
                              className="px-4 py-1.5 bg-[#6D4AFF] text-white rounded-lg cursor-pointer text-sm"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Task */}
            <div>
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Task <span className="text-red-500">*</span>
              </label>
              <div ref={taskRef} className="relative w-full">
                <button
                  data-testid="task-dropdown"
                  type="button"
                  onClick={() => setShowTaskDropdown(!showTaskDropdown)}
                  className="w-full h-9 px-3 border border-[#DCE3EE] rounded-lg bg-white flex items-center justify-between text-sm cursor-pointer"
                >
                  <span className="text-sm">
                    {formData.taskName || "Select Task"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${showTaskDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showTaskDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[#DCE3EE] rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="max-h-[220px] overflow-y-auto">
                      {taskOptions.length > 0 ? (
                        taskOptions.map((task) => (
                          <button
                            key={task.id}
                            onClick={() => {
                              handleChange("taskId", task.id);
                              handleChange("taskName", task.name);
                              handleChange("newTask", false);

                              setShowTaskDropdown(false);
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F8FAFC] cursor-pointer"
                          >
                            {task.name}
                          </button>
                        ))
                      ) : (
                        <div className="p-3 text-sm text-slate-400">
                          No Tasks Found
                        </div>
                      )}
                    </div>
                    <div className="border-t border-[#E5E7EB]" />
                    <div className="p-4">
                      <button
                        type="button"
                        onClick={() => setShowAddTask(!showAddTask)}
                        className="text-[#6D4AFF] text-sm font-medium cursor-pointer"
                      >
                        + Add New Task
                      </button>
                      {showAddTask && (
                        <div className="mt-4">
                          <input
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Enter Task Name"
                            className="w-full h-9 px-3 border border-[#DCE3EE] rounded-lg text-sm"
                          />
                          <div className="flex justify-end gap-2 mt-4">
                            <button
                              type="button"
                              onClick={() => {
                                setShowAddTask(false);
                                setNewTask("");
                              }}
                              className="px-4 py-1.5 border border-[#DCE3EE] rounded-lg cursor-pointer text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleAddTask}
                              className="px-4 py-1.5 bg-[#6D4AFF] text-white rounded-lg cursor-pointer text-sm"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sub Task */}
            <div>
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Sub Task <span className="text-red-500">*</span>
              </label>
              <div ref={subTaskRef} className="relative w-full">
                <button
                  data-testid="subtask-dropdown"
                  type="button"
                  onClick={() => setShowSubTaskDropdown(!showSubTaskDropdown)}
                  className="w-full h-9 px-3 border border-[#DCE3EE] rounded-lg bg-white flex items-center justify-between text-sm cursor-pointer"
                >
                  <span className="text-sm">
                    {formData.subTaskName || "Select Sub Task"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${showSubTaskDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showSubTaskDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[#DCE3EE] rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="max-h-[220px] overflow-y-auto">
                      {subTasks.length > 0 ? (
                        subTasks.map((subTask) => (
                          <button
                            key={subTask.id}
                            onClick={() => {
                              handleChange("subTaskId", subTask.id);
                              handleChange("subTaskName", subTask.name);
                              handleChange("newSubTask", false);

                              setShowSubTaskDropdown(false);
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F8FAFC] cursor-pointer"
                          >
                            {subTask.name}
                          </button>
                        ))
                      ) : (
                        <div className="p-3 text-sm text-slate-400">
                          No Sub Tasks Found
                        </div>
                      )}
                    </div>
                    <div className="border-t border-[#E5E7EB]" />
                    <div className="p-4">
                      <button
                        type="button"
                        onClick={() => setShowAddSubTask(!showAddSubTask)}
                        className="text-[#6D4AFF] text-sm font-medium cursor-pointer"
                      >
                        + Add New Sub Task
                      </button>
                      {showAddSubTask && (
                        <div className="mt-4">
                          <input
                            value={newSubTask}
                            onChange={(e) => setNewSubTask(e.target.value)}
                            placeholder="Enter Sub Task Name"
                            className="w-full h-9 px-3 border border-[#DCE3EE] rounded-lg text-sm"
                          />
                          <div className="flex justify-end gap-2 mt-4">
                            <button
                              type="button"
                              onClick={() => {
                                setShowAddSubTask(false);
                                setNewSubTask("");
                              }}
                              className="px-4 py-1.5 border border-[#DCE3EE] rounded-lg cursor-pointer text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleAddSubTask}
                              className="px-4 py-1.5 bg-[#6D4AFF] text-white rounded-lg cursor-pointer text-sm"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Activity Name & Owner - Smaller fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
              <label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                Actual Weeks
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Act. Weeks"
                className={inputClass}
                value={formData.actualPeriodWeek || ""}
                onChange={(e) =>
                  handleChange("actualPeriodWeek", e.target.value)
                }
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
        <button
          data-testid="submit-button"
          type="button"
          onClick={handleSubmit}
          className="h-11 min-w-[140px] px-6 rounded-xl bg-gradient-to-r from-[#7C5CFA] to-[#6D4AFF] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all cursor-pointer"
        >
          <Check size={15} />
          Add Activity
        </button>
      </div>
    </div>
  );
}
