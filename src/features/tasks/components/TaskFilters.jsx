import CustomDropdown from "../../../components/common/CustomDropdown";
import MultiSelectDropdown from "../../../components/common/MultiSelectDropdown";
import SearchInput from "../../../components/common/SearchInput";

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
      mt-3
      rounded-2xl
      border
      border-[#CDD7E3]
      bg-white
      p-4
      lg:p-5
    "
    >
      {/* First Row */}

      <div
        className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2

        xl:grid-cols-4
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
          width="w-full"
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
        mt-4
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2

        xl:grid-cols-12
      "
      >
        {/* Status */}

        <div className="xl:col-span-2">
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
        </div>

        {/* Activity */}

        <div className="xl:col-span-4">
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
        </div>

        {/* Search */}

        <div className="xl:col-span-6">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Tasks..."
          />
        </div>
      </div>
    </div>
  );
}
