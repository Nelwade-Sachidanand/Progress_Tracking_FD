import { Search } from "lucide-react";
import CustomDropdown from "../../../components/layout/CustomDropdown";
import MultiSelectDropdown from "../../../components/layout/MultiSelectDropdown";

export default function TaskFilters({
  phases = [],
  milestones = [],
  tasks = [],
  subTasks = [],
  activities = [],

  selectedPhase,
  selectedMilestone,
  selectedTask,
  selectedSubTask,
  selectedActivity,
  selectedStatus,
  searchTerm,

  setSelectedPhase,
  setSelectedMilestone,
  setSelectedTask,
  setSelectedSubTask,
  setSelectedActivity,
  setSelectedStatus,
  setSearchTerm,
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-3
        mt-[10px]
      "
    >
      {/* First Row */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]
          gap-4
        "
      >
        {/* Phase */}
        <CustomDropdown
          label="Phase"
          placeholder="All Phases"
          value={selectedPhase}
          onChange={setSelectedPhase}
          options={phases.map((phase) => ({
            label: phase,
            value: phase,
          }))}
        />

        {/* Milestone */}
        <MultiSelectDropdown
          label="Milestone"
          placeholder="All Milestones"
          options={milestones}
          selected={selectedMilestone}
          onChange={setSelectedMilestone}
        />

        {/* Task */}
        <CustomDropdown
          label="Task"
          placeholder="All Tasks"
          value={selectedTask}
          onChange={setSelectedTask}
          options={tasks.map((task) => ({
            label: task,
            value: task,
          }))}
        />

        {/* Sub Task */}
        <CustomDropdown
          label="Sub Task"
          placeholder="All Sub Tasks"
          value={selectedSubTask}
          onChange={setSelectedSubTask}
          options={subTasks.map((subTask) => ({
            label: subTask,
            value: subTask,
          }))}
        />
      </div>

      {/* Second Row */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.6fr)]
          gap-4
          mt-4
        "
      >
        {/* Status */}
        <CustomDropdown
          label="Status"
          placeholder="All Status"
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={[
            {
              label: "Completed",
              value: "Completed",
            },
            {
              label: "In Progress",
              value: "In Progress",
            },
            {
              label: "Not Started",
              value: "Not Started",
            },
          ]}
        />

        {/* Activity */}
        <CustomDropdown
          label="Activity"
          placeholder="All Activities"
          value={selectedActivity}
          onChange={setSelectedActivity}
          options={activities.map((activity) => ({
            label: activity,
            value: activity,
          }))}
        />

        {/* Search */}
        <div>
          <label className="block mb-1 ml-1 text-sm font-semibold text-slate-600">
            Search
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Activity, Task, Milestone..."
              className="
                w-full
                h-9
                rounded-xl
                border
                border-slate-300
                pl-11
                pr-4
                text-sm
                outline-none
                focus:border-blue-500
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
 